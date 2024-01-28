import fs from "fs";
import { promisify } from "util";
import { generateCircuitInputs } from "@zk-email/helpers/dist/input-helpers";
const emailWalletUtils = require("../../utils");


export async function genEmailSenderInput(emailFilePath: string, accountKey: string,):
  Promise<{
    in_padded: string[],
    pubkey: string[],
    signature: string[],
    in_padded_len: string,
    sender_account_key: string,
    sender_email_idx: number,
    subject_idx: number,
    recipient_email_idx: number,
    domain_idx: number,
    timestamp_idx: number
  }> {
  const emailRaw = await promisify(fs.readFile)(emailFilePath, "utf8");
  const parsedEmail = await emailWalletUtils.parseEmail(emailRaw);
  const emailCircuitInputs = generateCircuitInputs({
    body: Buffer.from(""),
    message: Buffer.from(parsedEmail.canonicalizedHeader),
    bodyHash: "",
    rsaSignature: BigInt(parsedEmail.signature),
    rsaPublicKey: BigInt(parsedEmail.publicKey),
    maxMessageLength: 1024,
    maxBodyLength: 64,
    ignoreBodyHashCheck: true
  });
  const senderEmailIdxes = emailWalletUtils.extractFromAddrIdxes(parsedEmail.canonicalizedHeader)[0];
  const fromEmailAddrPart = parsedEmail.canonicalizedHeader.slice(senderEmailIdxes[0], senderEmailIdxes[1]);
  const domainIdx = emailWalletUtils.extractEmailDomainIdxes(fromEmailAddrPart)[0][0];
  const subjectEmailIdxes = emailWalletUtils.extractSubjectAllIdxes(parsedEmail.canonicalizedHeader)[0];
  const subject = parsedEmail.canonicalizedHeader.slice(subjectEmailIdxes[0], subjectEmailIdxes[1]);
  let recipientEmailIdx = 0;
  try {
    recipientEmailIdx = emailWalletUtils.extractEmailAddrIdxes(subject)[0][0];
  } catch (e) {
    console.log("No email address in subject");
    recipientEmailIdx = 0;
  }
  // const recipientEmailIdx = emailWalletUtils.extractEmailAddrIdxes(subject)[0][0];
  const timestampIdx = emailWalletUtils.extractTimestampIdxes(parsedEmail.canonicalizedHeader)[0][0];
  return {
    in_padded: emailCircuitInputs.in_padded,
    pubkey: emailCircuitInputs.pubkey,
    signature: emailCircuitInputs.signature,
    in_padded_len: emailCircuitInputs.in_len_padded_bytes,
    sender_account_key: accountKey,
    sender_email_idx: senderEmailIdxes[0],
    subject_idx: subjectEmailIdxes[0],
    recipient_email_idx: recipientEmailIdx,
    domain_idx: domainIdx,
    timestamp_idx: timestampIdx
  };
}
