import "server-only";
import { randomUUID } from "node:crypto";
import type { Client, Transaction } from "@libsql/client";
import { z } from "zod";
import { labPublicConfig } from "../config";
import { programmes } from "../programmes";
import { getDatabase } from "./database";

// Resend retains provider idempotency keys for 24 hours. Stop automatic retries
// earlier, including after a lost response, rather than risk a duplicate email.
export const EMAIL_RETRY_WINDOW_MS = 23 * 60 * 60 * 1000;
const MAX_ATTEMPTS = 6;
const SEND_TIMEOUT_MS = 6000;
const LEASE_MS = 30000;
const DAY_MS = 24 * 60 * 60 * 1000;
type EmailConfiguration = {
  apiKey: string;
  from: string;
  domain: string;
  replyTo: string;
  operatorTo: string;
  dailyLimit: number;
};
const mailbox = z
  .email()
  .max(254)
  .refine((value) => !/[\r\n]/.test(value));
const payloadSchema = z
  .object({
    from: mailbox,
    to: z.array(mailbox).length(1),
    reply_to: mailbox,
    subject: z
      .string()
      .max(160)
      .refine((value) => !/[\r\n]/.test(value)),
    text: z.string().max(4000),
  })
  .strict();
type EmailPayload = z.infer<typeof payloadSchema>;
type EmailReadinessReason =
  | "disabled"
  | "missing-key"
  | "unverified-domain"
  | "invalid-sender"
  | "invalid-contact"
  | "invalid-limit";

function configuration():
  { ready: true; value: EmailConfiguration } | { ready: false; reason: EmailReadinessReason } {
  if (process.env.LAB_EMAIL_ENABLED !== "true") return { ready: false, reason: "disabled" };
  const apiKey = process.env.RESEND_API_KEY || "";
  if (!/^re_[a-zA-Z0-9_-]{12,}$/.test(apiKey)) return { ready: false, reason: "missing-key" };
  const domain = (process.env.LAB_EMAIL_VERIFIED_DOMAIN || "").toLowerCase().trim();
  if (
    process.env.LAB_EMAIL_DOMAIN_VERIFIED !== "true" ||
    !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/.test(domain) ||
    domain === "resend.dev" ||
    domain.endsWith(".resend.dev")
  )
    return { ready: false, reason: "unverified-domain" };
  const from = (process.env.LAB_EMAIL_FROM || "").trim().toLowerCase();
  if (!mailbox.safeParse(from).success || from.split("@")[1] !== domain)
    return { ready: false, reason: "invalid-sender" };
  const replyTo = (process.env.LAB_EMAIL_REPLY_TO || labPublicConfig.businessEmail)
    .trim()
    .toLowerCase();
  const operatorTo = (process.env.LAB_EMAIL_OPERATOR_TO || labPublicConfig.businessEmail)
    .trim()
    .toLowerCase();
  if (!mailbox.safeParse(replyTo).success || !mailbox.safeParse(operatorTo).success)
    return { ready: false, reason: "invalid-contact" };
  const dailyLimit = Number(process.env.LAB_EMAIL_DAILY_LIMIT || 80);
  if (!Number.isInteger(dailyLimit) || dailyLimit < 1 || dailyLimit > 100)
    return { ready: false, reason: "invalid-limit" };
  return { ready: true, value: { apiKey, from, domain, replyTo, operatorTo, dailyLimit } };
}

// Configuration readiness is not proof of inbox delivery or provider approval.
// This projection deliberately contains no key, recipient, message or payload.
export function getEmailReadiness() {
  const configured = configuration();
  return {
    provider: "resend" as const,
    configured: configured.ready,
    reason: configured.ready ? ("configured" as const) : configured.reason,
    deliveryVerified: false,
    automaticRetryWindowHours: 23,
  };
}

function syntheticEmail(email: string) {
  const domain = email.toLowerCase().split("@")[1] || "";
  return (
    domain === "invalid" ||
    domain.endsWith(".invalid") ||
    domain === "test" ||
    domain.endsWith(".test") ||
    ["example.com", "example.net", "example.org"].some(
      (value) => domain === value || domain.endsWith(`.${value}`)
    )
  );
}
function payload(
  config: EmailConfiguration,
  to: string,
  subject: string,
  text: string
): EmailPayload {
  return payloadSchema.parse({
    from: config.from,
    to: [to],
    reply_to: config.replyTo,
    subject,
    text,
  });
}
async function insertEvent(
  executor: Pick<Client | Transaction, "execute">,
  enquiryId: string | null,
  event: "receipt" | "operator" | "operator-test",
  key: string,
  message: EmailPayload,
  now: number
) {
  const id = randomUUID();
  await executor.execute({
    sql: `INSERT INTO lab_email_outbox(id,enquiry_id,event_type,idempotency_key,payload,status,next_attempt_at,created_at,updated_at)
      VALUES(?,?,?,?,?,'pending',?,?,?) ON CONFLICT DO NOTHING`,
    args: [id, enquiryId, event, key, JSON.stringify(message), now, now, now],
  });
  return id;
}

// Call only inside the lead-saving transaction. Queueing is deliberately absent
// while the owner-controlled transport is disabled/unverified, and for demo leads.
export async function enqueueEnquiryEmails(
  tx: Pick<Transaction, "execute">,
  enquiry: { id: string; email: string; programmeSlug: string; kind: "learner" | "institution" },
  now = Date.now()
) {
  const configured = configuration();
  if (!configured.ready || syntheticEmail(enquiry.email)) return false;
  const lead = (
    await tx.execute({ sql: "SELECT is_demo FROM lab_enquiry WHERE id=?", args: [enquiry.id] })
  ).rows[0];
  if (!lead || lead.is_demo) return false;
  const config = configured.value;
  const programme =
    programmes.find((entry) => entry.slug === enquiry.programmeSlug)?.title ||
    "Learning Lab programme";
  await insertEvent(
    tx,
    enquiry.id,
    "receipt",
    `lab-enquiry/${enquiry.id}/receipt/v1`,
    payload(
      config,
      enquiry.email,
      "Learning Lab: enquiry received",
      `Thank you for contacting Swapnil Sahoo Learning Lab.\n\nYour ${enquiry.kind === "institution" ? "institutional" : "programme"} enquiry about ${programme} has been saved.\nReference: ${enquiry.id}\n\nThis acknowledgement does not reserve a place, confirm a date, enrol you, request a payment or award a certificate. Follow-up is handled separately. You do not need to submit the same enquiry again.\n\nReply to this email if you need to correct your enquiry.\nSwapnil Sahoo Learning Lab\nhttps://www.swapnilsahoo.com/learning-lab\n\nThis is a service acknowledgement, not a marketing subscription.`
    ),
    now
  );
  // Keep personal details and free-form learner text out of the operator email.
  await insertEvent(
    tx,
    enquiry.id,
    "operator",
    `lab-enquiry/${enquiry.id}/operator/v1`,
    payload(
      config,
      config.operatorTo,
      "Learning Lab: new enquiry to review",
      `A ${enquiry.kind === "institution" ? "new institutional" : "new programme"} enquiry has been saved.\nProgramme: ${programme}\nReference: ${enquiry.id}\n\nSign in to review the enquiry and record its next action:\nhttps://www.swapnilsahoo.com/learning-lab/admin\n\nThis alert creates no enrolment, payment or certificate.`
    ),
    now
  );
  return true;
}

type SendResult =
  | { status: "accepted"; providerId: string }
  | { status: "retry" | "failed" | "review"; code: string };
async function send(
  config: EmailConfiguration,
  serialized: string,
  key: string,
  timeout: number
): Promise<SendResult> {
  let message: EmailPayload;
  try {
    message = payloadSchema.parse(JSON.parse(serialized));
    if (message.from.split("@")[1] !== config.domain)
      return { status: "review", code: "sender-config-changed" };
  } catch {
    return { status: "review", code: "invalid-stored-payload" };
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": key,
      },
      body: serialized,
      signal: AbortSignal.timeout(timeout),
      cache: "no-store",
    });
    // Never persist/log the provider body or exception: either can contain PII.
    let result: unknown;
    try {
      result = await response.json();
    } catch {
      result = null;
    }
    if (response.ok) {
      const id = z.object({ id: z.string().min(1).max(128) }).safeParse(result);
      return id.success
        ? { status: "accepted", providerId: id.data.id }
        : { status: "retry", code: "ambiguous-provider-response" };
    }
    const errorName =
      typeof result === "object" && result !== null && "name" in result ? String(result.name) : "";
    if (response.status === 409 && errorName === "invalid_idempotent_request")
      return { status: "review", code: "idempotency-payload-conflict" };
    if ([408, 409, 425, 429].includes(response.status) || response.status >= 500)
      return { status: "retry", code: `provider-http-${response.status}` };
    return { status: "failed", code: `provider-http-${response.status}` };
  } catch {
    // A lost/aborted response can follow a successful provider send. Retry the
    // same immutable payload/key only within the provider's idempotency window.
    return { status: "retry", code: "ambiguous-network-response" };
  }
}

type DrainOptions = { limit?: number; enquiryId?: string; outboxId?: string; now?: number };
export async function drainEmailOutbox(options: DrainOptions = {}) {
  const configured = configuration();
  if (!configured.ready) return { configured: false, accepted: 0, retry: 0, failed: 0, review: 0 };
  const db = await getDatabase();
  const now = options.now ?? Date.now();
  const config = configured.value;
  const limit = Math.min(5, Math.max(1, Math.trunc(options.limit || 2)));
  const deadline = Date.now() + 15000;
  const tally = { configured: true, accepted: 0, retry: 0, failed: 0, review: 0 };
  const expired = await db.execute({
    sql: `UPDATE lab_email_outbox SET status='review',last_error_code=CASE WHEN first_attempt_at<=? THEN 'retry-window-ended' ELSE 'attempt-limit-ended' END,
      lease_token=NULL,lease_expires_at=NULL,updated_at=? WHERE status IN ('pending','processing') AND
      (first_attempt_at IS NOT NULL AND first_attempt_at<=? OR attempts>=? AND (status='pending' OR lease_expires_at<=?))`,
    args: [now - EMAIL_RETRY_WINDOW_MS, now, now - EMAIL_RETRY_WINDOW_MS, MAX_ATTEMPTS, now],
  });
  tally.review += expired.rowsAffected;
  // If a demonstration was marked after saving, suppress its unsent events.
  const suppressed = await db.execute({
    sql: `UPDATE lab_email_outbox SET status='review',last_error_code='demo-suppressed',lease_token=NULL,lease_expires_at=NULL,updated_at=?
      WHERE (status='pending' OR status='processing' AND lease_expires_at<=?) AND enquiry_id IN (SELECT id FROM lab_enquiry WHERE is_demo=1)`,
    args: [now, now],
  });
  tally.review += suppressed.rowsAffected;
  for (let index = 0; index < limit && deadline - Date.now() >= 500; index++) {
    const lease = randomUUID();
    // One atomic statement claims a due event. Two workers cannot send the same
    // active lease. Persistent first-attempt counting caps the default free tier.
    const row = (
      await db.execute({
        sql: `UPDATE lab_email_outbox SET status='processing',lease_token=?,lease_expires_at=?,attempts=attempts+1,
        first_attempt_at=COALESCE(first_attempt_at,?),last_attempt_at=?,updated_at=? WHERE id=(
          SELECT id FROM lab_email_outbox WHERE
            (status='pending' AND next_attempt_at<=? OR status='processing' AND lease_expires_at<=?)
            AND attempts<? AND (first_attempt_at IS NULL OR first_attempt_at>?)
            AND (enquiry_id IS NULL OR enquiry_id IN (SELECT id FROM lab_enquiry WHERE is_demo=0))
            AND (? IS NULL OR enquiry_id=?) AND (? IS NULL OR id=?)
            AND (first_attempt_at IS NOT NULL OR (SELECT COUNT(*) FROM lab_email_outbox WHERE first_attempt_at>=?)<?)
          ORDER BY created_at,id LIMIT 1) RETURNING id,payload,idempotency_key,attempts`,
        args: [
          lease,
          now + LEASE_MS,
          now,
          now,
          now,
          now,
          now,
          MAX_ATTEMPTS,
          now - EMAIL_RETRY_WINDOW_MS,
          options.enquiryId || null,
          options.enquiryId || null,
          options.outboxId || null,
          options.outboxId || null,
          Math.floor(now / DAY_MS) * DAY_MS,
          config.dailyLimit,
        ],
      })
    ).rows[0];
    if (!row) break;
    const sent = await send(
      config,
      String(row.payload),
      String(row.idempotency_key),
      Math.min(SEND_TIMEOUT_MS, deadline - Date.now())
    );
    const status =
      sent.status === "retry" && Number(row.attempts) >= MAX_ATTEMPTS ? "review" : sent.status;
    const retryDelay = Math.min(60 * 60 * 1000, 60000 * 2 ** (Number(row.attempts) - 1));
    await db.execute({
      sql: `UPDATE lab_email_outbox SET status=?,provider_message_id=?,last_error_code=?,next_attempt_at=?,lease_token=NULL,lease_expires_at=NULL,updated_at=?
        WHERE id=? AND lease_token=?`,
      args: [
        status === "retry" ? "pending" : status,
        sent.status === "accepted" ? sent.providerId : null,
        sent.status === "accepted" ? null : sent.code,
        now + retryDelay,
        now,
        String(row.id),
        lease,
      ],
    });
    tally[status]++;
  }
  return tally;
}

export async function enquiryEmailState(
  enquiryId: string
): Promise<"not-requested" | "queued" | "accepted" | "needs-review"> {
  const row = (
    await (
      await getDatabase()
    ).execute({
      sql: "SELECT status FROM lab_email_outbox WHERE enquiry_id=? AND event_type='receipt'",
      args: [enquiryId],
    })
  ).rows[0];
  if (!row) return "not-requested";
  if (row.status === "accepted") return "accepted";
  return row.status === "failed" || row.status === "review" ? "needs-review" : "queued";
}

// Invoke only through an authenticated, origin-checked administrator action.
// No caller-controlled recipient/content; a test is not a public delivery claim.
export async function sendOperatorEmailTest() {
  const configured = configuration();
  if (!configured.ready) return { configured: false, accepted: 0, retry: 0, failed: 0, review: 0 };
  const config = configured.value;
  const db = await getDatabase();
  const id = randomUUID();
  const event = await insertEvent(
    db,
    null,
    "operator-test",
    `lab-email-test/${id}/v1`,
    payload(
      config,
      config.operatorTo,
      "Learning Lab: controlled email delivery test",
      `This is an administrator-requested transactional email test for Swapnil Sahoo Learning Lab.\nReference: ${id}\n\nNo learner enquiry, enrolment, payment or certificate was created. Provider acceptance is not a guarantee of inbox delivery. Please check receipt privately before enabling public confirmations.`
    ),
    Date.now()
  );
  return drainEmailOutbox({ outboxId: event, limit: 1 });
}
