// Config strings
pub const ZK_EMAIL_PATH_KEY: &str = "LOCAL_ZK_EMAIL_CIRCOM_PATH";
pub const INCOMING_EML_PATH: &str = "MODAL_INCOMING_EML_PATH";
pub const IMAP_DOMAIN_NAME_KEY: &str = "IMAP_DOMAIN_NAME";
pub const IMAP_PORT_KEY: &str = "IMAP_PORT";
pub const IMAP_AUTH_TYPE_KEY: &str = "AUTH_TYPE";
pub const IMAP_CLIENT_ID_KEY: &str = "IMAP_CLIENT_ID";
pub const IMAP_CLIENT_SECRET_KEY: &str = "IMAP_CLIENT_SECRET";
pub const IMAP_AUTH_URL_KEY: &str = "IMAP_AUTH_URL";
pub const IMAP_TOKEN_URL_KEY: &str = "IMAP_TOKEN_URL";
pub const IMAP_REDIRECT_URL_KEY: &str = "http://127.0.0.1:8000/";
pub const SMTP_DOMAIN_NAME_KEY: &str = "SMTP_DOMAIN_NAME";
pub const SMTP_PORT_KEY: &str = "SMTP_PORT";
pub const LOGIN_ID_KEY: &str = "LOGIN_ID";
pub const LOGIN_PASSWORD_KEY: &str = "LOGIN_PASSWORD";
pub const DATABASE_PATH_KEY: &str = "DATABASE_PATH";
pub const RELAYER_RANDOMNESS_KEY: &str = "RELAYER_RANDOMNESS";
pub const WEB_SERVER_ADDRESS_KEY: &str = "WEB_SERVER_ADDRESS";
pub const CIRCUITS_DIR_PATH_KEY: &str = "CIRCUITS_DIR_PATH";
pub const PROVER_ADDRESS_KEY: &str = "PROVER_ADDRESS";
pub const CHAIN_RPC_PROVIDER_KEY: &str = "CHAIN_RPC_PROVIDER";
pub const PRIVATE_KEY_KEY: &str = "PRIVATE_KEY";
pub const CHAIN_ID_KEY: &str = "CHAIN_ID";
pub const CORE_CONTRACT_ADDRESS_KEY: &str = "CORE_CONTRACT_ADDRESS";
pub const FEE_PER_GAS_KEY: &str = "FEE_PER_GAS";
pub const RELAYER_EMAIL_ADDR_KEY: &str = "RELAYER_EMAIL_ADDR";
pub const RELAYER_HOSTNAME_KEY: &str = "RELAYER_HOSTNAME";

// Error strings
pub const WRONG_AUTH_METHOD: &str = "Not supported auth type";
pub const IMAP_RECONNECT_ERROR: &str = "Failed to reconnect";
pub const SMTP_RECONNECT_ERROR: &str = "Failed to reconnect";
pub const CANNOT_GET_EMAIL_FROM_QUEUE: &str = "Cannot get email from mpsc in handle email task";
pub const NOT_MY_SENDER: &str = "NOT_MY_SENDER";
pub const WRONG_SUBJECT_FORMAT: &str = "Wrong subject format";
pub const INSUFFICIENT_BALANCE: &str = "Insufficient balance";
