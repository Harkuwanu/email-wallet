#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unreachable_code)]

pub(crate) mod abis;
pub(crate) mod account_creator;
pub(crate) mod chain;
pub(crate) mod claimer;
pub(crate) mod config;
pub(crate) mod core;
pub(crate) mod database;
pub(crate) mod imap_client;
pub(crate) mod smtp_client;
pub(crate) mod strings;
pub(crate) mod subject_templates;
pub(crate) mod voider;
pub(crate) mod web_server;

pub(crate) use crate::core::*;
pub(crate) use abis::*;
pub(crate) use account_creator::*;
pub(crate) use chain::*;
pub(crate) use claimer::*;
pub use config::*;
pub(crate) use database::*;
use futures::TryFutureExt;
pub(crate) use imap_client::*;
use rand::rngs::OsRng;
pub(crate) use smtp_client::*;
pub(crate) use strings::*;
pub(crate) use subject_templates::*;
pub(crate) use voider::*;
pub(crate) use web_server::*;

use anyhow::{anyhow, bail, Result};
use dotenv::dotenv;
use email_wallet_utils::{converters::*, cryptos::*, parse_email::ParsedEmail, Fr};
use ethers::prelude::*;
use log::{debug, error, info, trace, warn};
use simple_logger::SimpleLogger;
use std::env;
use std::path::PathBuf;
use std::sync::{Arc, OnceLock};
use tokio::time::{sleep, Duration};

static CIRCUITS_DIR_PATH: OnceLock<PathBuf> = OnceLock::new();
static WEB_SERVER_ADDRESS: OnceLock<String> = OnceLock::new();
static RELAYER_RAND: OnceLock<String> = OnceLock::new();
static PROVER_ADDRESS: OnceLock<String> = OnceLock::new();
static PRIVATE_KEY: OnceLock<String> = OnceLock::new();
static CHAIN_ID: OnceLock<u32> = OnceLock::new();
static CHAIN_RPC_PROVIDER: OnceLock<String> = OnceLock::new();
static CORE_CONTRACT_ADDRESS: OnceLock<String> = OnceLock::new();
static FEE_PER_GAS: OnceLock<U256> = OnceLock::new();

pub async fn setup() -> Result<()> {
    dotenv().ok();
    PRIVATE_KEY.set(env::var(PRIVATE_KEY_KEY).unwrap()).unwrap();
    CHAIN_ID
        .set(env::var(CHAIN_ID_KEY).unwrap().parse().unwrap())
        .unwrap();
    CHAIN_RPC_PROVIDER
        .set(env::var(CHAIN_RPC_PROVIDER_KEY).unwrap())
        .unwrap();
    CORE_CONTRACT_ADDRESS
        .set(env::var(CORE_CONTRACT_ADDRESS_KEY).unwrap())
        .unwrap();

    let rng = OsRng;
    let relayer_rand = RelayerRand::new(rng);
    println!("Your relayer rand: {}", field2hex(&relayer_rand.0));
    let client = ChainClient::setup().await?;
    let tx_hash = client
        .register_relayer(
            relayer_rand.hash()?,
            env::var(RELAYER_EMAIL_ADDR_KEY).unwrap(),
            env::var(RELAYER_HOSTNAME_KEY).unwrap(),
        )
        .await?;
    println!("Register relayer in {}", tx_hash);
    Ok(())
}

pub async fn run(config: RelayerConfig) -> Result<()> {
    simple_logger::init().unwrap();
    CIRCUITS_DIR_PATH.set(config.circuits_dir_path).unwrap();
    WEB_SERVER_ADDRESS.set(config.web_server_address).unwrap();
    RELAYER_RAND.set(config.relayer_randomness).unwrap();
    PROVER_ADDRESS.set(config.prover_address).unwrap();
    PRIVATE_KEY.set(config.private_key).unwrap();
    CHAIN_ID.set(config.chain_id).unwrap();
    CHAIN_RPC_PROVIDER.set(config.chain_rpc_provider).unwrap();
    CORE_CONTRACT_ADDRESS
        .set(config.core_contract_address)
        .unwrap();
    FEE_PER_GAS.set(config.fee_per_gas).unwrap();

    let (tx_handler, mut rx_handler) = tokio::sync::mpsc::unbounded_channel();
    let (tx_sender, mut rx_sender) = tokio::sync::mpsc::unbounded_channel::<EmailMessage>();
    let (tx_creator, mut rx_creator) = tokio::sync::mpsc::unbounded_channel::<String>();
    let (tx_claimer, mut rx_claimer) = tokio::sync::mpsc::unbounded_channel::<Claim>();

    let db = Arc::new(Database::open(&config.db_path).await?);
    let client = Arc::new(ChainClient::setup().await?);
    for email in db.get_unhandled_emails().await? {
        tx_handler.send(email)?;
    }

    let db_clone_receiver = Arc::clone(&db);
    let mut email_receiver = ImapClient::new(config.imap_config).await?;
    let email_receiver_task = tokio::task::spawn(async move {
        loop {
            let (new_email_receiver, fetches) = email_receiver.retrieve_new_emails().await?;
            info!("Fetched {} emails", fetches.len());
            for fetch in fetches {
                for email in fetch.iter() {
                    if let Some(body) = email.body() {
                        let body = String::from_utf8(body.to_vec())?;
                        if !db_clone_receiver.contains_email(&body).await? {
                            db_clone_receiver.insert_email(&body).await?;
                            tx_handler.send(body)?;
                        }
                    }
                }
            }
            email_receiver = new_email_receiver;
        }

        Ok::<(), anyhow::Error>(())
    });

    let tx_sender_for_email_task = tx_sender.clone();
    let tx_claimer_for_email_task = tx_claimer.clone();
    let db_clone = Arc::clone(&db);
    let client_clone = Arc::clone(&client);
    let email_handler_task = tokio::task::spawn(async move {
        loop {
            let email = rx_handler
                .recv()
                .await
                .ok_or(anyhow!(CANNOT_GET_EMAIL_FROM_QUEUE))?;
            info!("Handled email {}", email);
            tokio::task::spawn(
                handle_email(
                    email,
                    Arc::clone(&db_clone),
                    Arc::clone(&client_clone),
                    tx_sender_for_email_task.clone(),
                    tx_claimer_for_email_task.clone(),
                )
                .map_err(|err| error!("Error handling email: {}", err)),
            );
        }

        Ok::<(), anyhow::Error>(())
    });

    let tx_sender_for_creator_task = tx_sender.clone();
    let db_clone = Arc::clone(&db);
    let client_clone = Arc::clone(&client);
    let account_creation_task = tokio::task::spawn(async move {
        loop {
            let email_address = rx_creator
                .recv()
                .await
                .ok_or(anyhow!(CANNOT_GET_EMAIL_FROM_QUEUE))?;
            info!("Creating account for email: {}", email_address);
            tokio::task::spawn(
                create_account(
                    email_address,
                    Arc::clone(&db_clone),
                    Arc::clone(&client_clone),
                    tx_sender_for_creator_task.clone(),
                )
                .map_err(|err| error!("Error creating account: {}", err)),
            );
        }

        Ok::<(), anyhow::Error>(())
    });

    let tx_sender_for_claimer_task = tx_sender.clone();
    let tx_creator_for_claimer_task = tx_creator.clone();
    let db_clone = Arc::clone(&db);
    let client_clone = Arc::clone(&client);
    let claimer_task = tokio::task::spawn(async move {
        loop {
            let claim = rx_claimer
                .recv()
                .await
                .ok_or(anyhow!(CANNOT_GET_EMAIL_FROM_QUEUE))?;
            info!("Claiming unclaim for {:?}", claim.email_address);
            tokio::task::spawn(
                claim_unclaims(
                    claim,
                    Arc::clone(&db_clone),
                    Arc::clone(&client_clone),
                    tx_creator_for_claimer_task.clone(),
                    tx_sender_for_claimer_task.clone(),
                )
                .map_err(|err| error!("Error claiming unclaim: {}", err)),
            );
        }

        Ok::<(), anyhow::Error>(())
    });

    let tx_sender_for_server_task = tx_sender.clone();
    let tx_creator_for_server_task = tx_creator.clone();
    let api_server_task = tokio::task::spawn(run_server(
        WEB_SERVER_ADDRESS.get().unwrap(),
        Arc::clone(&db),
        Arc::clone(&client),
        tx_sender_for_server_task,
        tx_creator_for_server_task,
    ));

    let email_sender = SmtpClient::new(config.smtp_config)?;
    let email_sender_task = tokio::task::spawn(async move {
        loop {
            let email = rx_sender
                .recv()
                .await
                .ok_or(anyhow!(CANNOT_GET_EMAIL_FROM_QUEUE))?;
            info!("Sending email to: {:?}", email.to);
            info!("Sending email subject: {:?}", email.subject);
            email_sender.send_new_email(email).await?;
        }

        Ok::<(), anyhow::Error>(())
    });

    let tx_claimer_for_listener_task = tx_claimer.clone();
    let client_clone = Arc::clone(&client);
    let event_listener_task = tokio::task::spawn(async move {
        let mut from_block_fund = U64::from(0);
        let mut from_block_state = U64::from(0);
        let fund_f = |event: UnclaimedFundRegisteredFilter, meta: LogMeta| {
            if event.email_addr.len() == 0 {
                return Ok(());
            }
            let random =
                field2hex(&Fr::from_bytes(&u256_to_bytes32(event.commitment_randomness)).unwrap());
            let commit = field2hex(&Fr::from_bytes(&event.email_addr_commit).unwrap());
            let claim = Claim {
                email_address: event.email_addr,
                random,
                commit,
                expire_time: event.expiry_time.as_u64() as i64,
                is_fund: true,
                is_announced: true,
            };
            tx_claimer_for_listener_task.send(claim)?;
            Ok(())
        };
        let state_f = |event: UnclaimedStateRegisteredFilter, meta: LogMeta| {
            if event.email_addr.len() == 0 {
                return Ok(());
            }
            let random =
                field2hex(&Fr::from_bytes(&u256_to_bytes32(event.commitment_randomness)).unwrap());
            let commit = field2hex(&Fr::from_bytes(&event.email_addr_commit).unwrap());
            let claim = Claim {
                email_address: event.email_addr,
                random,
                commit,
                expire_time: event.expiry_time.as_u64() as i64,
                is_fund: false,
                is_announced: true,
            };
            tx_claimer_for_listener_task.send(claim)?;
            Ok(())
        };
        loop {
            let last_block = client_clone
                .stream_unclaim_fund_registration(from_block_fund, fund_f)
                .await?;
            from_block_fund = last_block + 1;
            let last_block = client_clone
                .stream_unclaim_state_registration(from_block_state, state_f)
                .await?;
            from_block_state = last_block + 1;
            sleep(Duration::from_secs(10)).await;
        }
        Ok::<(), anyhow::Error>(())
    });

    let tx_sender_for_voider_task = tx_sender.clone();
    let db_clone = Arc::clone(&db);
    let client_clone = Arc::clone(&client);
    let voider_task = tokio::task::spawn(async move {
        loop {
            let now = now();
            let claims = db_clone.get_claims_expired(now).await?;
            for claim in claims {
                info!("Voiding claim for : {}", claim.email_address);
                tokio::task::spawn(void_unclaims(
                    claim,
                    Arc::clone(&db_clone),
                    Arc::clone(&client_clone),
                    tx_sender_for_voider_task.clone(),
                ));
            }
            sleep(Duration::from_secs(10)).await;
        }
        Ok::<(), anyhow::Error>(())
    });

    let _ = tokio::join!(
        email_receiver_task,
        email_handler_task,
        account_creation_task,
        claimer_task,
        api_server_task,
        email_sender_task,
        event_listener_task,
        voider_task
    );

    Ok(())
}
