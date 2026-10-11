# Transactional enquiry email operations

Prepared on 11 October 2026. This is an optional implementation, not an email-activation or delivery claim. The production environment inventory at the time of preparation contained no email-provider key. No email account was created, DNS record changed, paid service purchased or real message sent by this work.

## Transport and private configuration

The implementation uses Resend's HTTPS API from server-only code. The current [free transactional tier](https://resend.com/pricing) allows 3,000 emails per month and 100 per day. One new genuine enquiry requests a visitor acknowledgement and a separate operator alert, so two emails count toward those limits. The application's default cap is 80 first attempts per UTC day; it does not buy additional capacity.

Before enabling it, the operator needs an owner-controlled provider account, account verification/any provider production approval, a verified sending domain, a privately configured sending API key and a controlled receipt test. Resend requires [a domain you own](https://resend.com/docs/dashboard/domains/introduction); `onboarding@resend.dev` is [restricted to the account owner's test address](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain). That sender cannot serve arbitrary website visitors.

An owner-controlled subdomain of `swapnilsahoo.com` is a suitable proposed sender. Its required DNS records have not been added by this implementation. The approved `swapnil.s@greatlakes.edu.in` remains the default reply-to and operator destination; publishing that contact does not grant authority to verify its institutional sending domain. A Microsoft mail connector may support an owner's manual reply, but it is not automatically a production website transport. A Graph transport would separately require [authorized Mail.Send access](https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0).

Configure these server-only settings privately; never use `NEXT_PUBLIC_*`:

| Setting                     | Required value                                                                                                                |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `LAB_EMAIL_ENABLED`         | `true` only when ready to request real transactional messages; default false                                                  |
| `RESEND_API_KEY`            | A private provider-issued sending key; prefer domain-scoped permissions                                                       |
| `LAB_EMAIL_FROM`            | A plain mailbox on the verified sending domain                                                                                |
| `LAB_EMAIL_VERIFIED_DOMAIN` | The exact verified domain matching that mailbox                                                                               |
| `LAB_EMAIL_DOMAIN_VERIFIED` | `true` only after checking actual provider domain status; configuration is an operator assertion, not a live API verification |
| `LAB_EMAIL_REPLY_TO`        | Optional; defaults to the approved public contact                                                                             |
| `LAB_EMAIL_OPERATOR_TO`     | Optional; defaults to the approved public contact; controls the fixed test destination too                                    |
| `LAB_EMAIL_DAILY_LIMIT`     | Optional integer 1–100; default 80 first attempts per UTC day                                                                 |

The readiness projection reports configuration status and a safe reason only. It never returns a key, recipient or stored message, and always distinguishes configuration from delivery verification. Disabled, incomplete or unverified configuration preserves the original no-email confirmation and creates no queued events. It never backfills historical enquiries.

## What happens on an enquiry

After normal origin, schema, anti-spam and rate-limit checks, the database transaction saves the deduplicated enquiry and, only for a ready transport, creates one immutable `receipt` and one `operator` outbox event. Their unique `(enquiry_id,event_type)` constraint prevents duplicate messages for the same enquiry. Both are plain text. The acknowledgement contains a programme name and reference; the operator alert contains a reference and sign-in link, without the visitor's email or free-form message. Optional marketing permission is not used to create a marketing subscription.

After that transaction commits, the server makes a bounded immediate send attempt. A provider outage cannot roll back the saved enquiry. The API response states one of: no confirmation requested, queued, provider accepted with inbox delivery unguaranteed, or confirmation status unverified. It creates no enrolment, booking, payment or certificate. Inbox receipt must be checked independently before public copy claims operational delivery.

Known synthetic `.invalid`/`.test` and example.com/net/org addresses, and enquiries already marked as demonstrations, receive neither email. The initial controlled tests use local synthetic records and a mocked provider only.

## Retry and restore safety

`lab_email_outbox` stores immutable payloads, stable provider keys, status, attempts, leases, timestamps and provider IDs. Its states are `pending`, `processing`, `accepted`, `failed` and `review`. Atomic claims stop concurrent workers from sending the same active lease. Explicitly accepted events are never resent by a drain.

Resend's [idempotency retention is 24 hours](https://resend.com/docs/dashboard/emails/idempotency-keys). Network timeouts, lost responses, rate limits, server errors and a concurrent-key response may be retried with the identical payload and key. Automatic retries stop 23 hours after the first attempt, or after six attempts, to avoid duplicate sends after provider key expiry. A lost status write recovers by the same key within that window. Permanent request/credential failures stop; conflicting payloads or changed sender configuration require review. An expired uncertain message is not silently retried with a new key. This is duplicate risk control, not a mathematical exactly-once guarantee across systems.

No cron or paid scheduler is required by this release. A protected administrator retry or the [owner-controlled Windows runner](../../scripts/process-learning-lab-emails.ps1) can drain due events. The runner authenticates using the permanent administrator's private Windows DPAPI recovery credential, checks readiness, skips disabled transport without sending, drains a bounded batch and signs out. It is prepared for an interactive-owner schedule every 30 minutes; the actual registration and run evidence belong in the operations handover. It depends on the owner computer and signed-in Windows session, so it does not provide continuous cloud availability. Do not expose an unauthenticated drain or a caller-supplied recipient/content. Failed/review events require the operator to establish what happened before any new logical send is authorized.

Backups may contain enquiry email addresses and outbox text. Treat them as private learner data. Preserve keys/provider IDs/accepted states; on restore convert pending/processing to review and clear leases, then inspect before sending. Legacy snapshots may omit the new table. Never replay restored events automatically.

## Integration and checks

The Lab API now provides `GET /api/learning-lab/admin/email` for safe readiness metadata, `POST /api/learning-lab/admin/email/retry` for a drain of up to five due events, and `POST /api/learning-lab/admin/email/test` for a controlled owner-only test. POST actions require an empty JSON object. These endpoints require a permanent, non-demo administrator who has changed the temporary password; they check origin, reject extra request fields and share a limit of two sending actions per ten minutes. Disabled sending returns an honest 503 without a provider request or new event. Responses contain safe status/counts only. The test helper chooses the configured owner address internally and accepts no recipient or content.

Before real activation, verify the actual account/domain metadata, sending-key scope, DNS authentication, provider quota, fixed owner receipt and reply destination, and at least one authorized controlled visitor receipt. Update the enquiry/privacy notice with the actual processor and acknowledgement behavior; do not describe an accepted API request as delivery. If delivery webhooks are added later, [verify the raw body and provider signature](https://resend.com/docs/webhooks/verify-webhooks-requests), deduplicate event IDs and distinguish acceptance, delivery, bounce and complaint. The current implementation does not assert webhook delivery tracking or inbox placement.

Run the isolated checks with:

```powershell
node --conditions=react-server --import tsx scripts/test-learning-lab-email.mts
```

They override configuration with fixture values, use an independent local SQLite database, and mock every fetch. They cover disabled/unverified configuration, atomic queueing/rollback, enquiry deduplication, concurrency, ambiguous retries and their expiry, permanent/rate-limit/malformed responses, demo suppression, quotas, changed sender, fixed owner test destination and honest enquiry-save behavior during provider failure. In-process route checks use real Better Auth and local session/role records to reject anonymous, learner, temporary-admin and demo-admin requests, cross-origin writes and arbitrary recipients. Unused Next page-navigation APIs are stubbed only for this standalone harness. Passing these checks does not establish real email receipt.
