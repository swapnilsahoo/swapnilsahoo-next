# Razorpay Standard Checkout

**Status, 24 November 2026:** published as the Lab's voluntary contribution page at `/learning-lab/checkout`, at the founder's request. Everything the Lab offers is free (₹0), so no course, programme or feedback is sold here. Razorpay cannot create a ₹0 order (minimum 100 paise), so the page only takes contributions of ₹1 or more. Orders carry `notes.purpose = learning-lab-contribution`. Production has no Razorpay keys yet: the page shows "opening soon" until live keys (`rzp_live_…`) are added to the Vercel Production environment and the site is redeployed. Test keys are refused on Production (`VERCEL_ENV=production`). The support page shows the online-contribution link only when live keys are configured.

**Payee, 24 November 2026:** the founder decided that, for now, online contributions go to his own Razorpay account (the account whose test keys are in the local `.env`), matching the personal PhonePe QR. The site says so on the checkout, support and policy pages and names "Swapnil Sahoo" in the Razorpay window. Moving to a company account later needs new keys in Vercel and an update to `labContributionPayeeLine` in `src/features/learning-lab/config.ts`, the policies and this note.

The Next.js App Router integration provides `/learning-lab/checkout`, `POST /api/create-order` and `POST /api/verify-payment`. The supplied test credentials are in the local, Git-ignored `.env`. No secret belongs in source code, browser code, screenshots or Git. `.gitignore` already excludes `.env*` except `.env.example`.

## Actual test payment verified — 16 November 2026

A ₹1 (100 paise) transaction completed through the real Razorpay test checkout using the dashboard-supplied test card and the mock bank's **Success** action. The local verification endpoint returned HTTP 200 with `success: true`, `paid: true` and `status: captured`. No provider calls or checkout callbacks were mocked for this transaction, and no real money was charged.

- Order: `order_U0kEWulr9N8eia`
- Payment: `pay_U0kK4cKcFxdmGr`
- Bounded evidence: ignored `artifacts/learning-lab/razorpay-actual-test-success.json` and `razorpay-actual-test-success.png`.

The checkout requested contact details. This test used a fictional contact number and did not supply the owner's phone/email or save the test card.

The Razorpay dashboard's **I have done the transaction** step can now be completed for this test-key account. This verifies local test-mode checkout; it does not deploy the integration or activate live payments.

## Run and test locally

From the website repository in a PowerShell terminal:

```powershell
corepack.cmd pnpm install --frozen-lockfile
corepack.cmd pnpm dev --port 3110
```

Open <http://localhost:3110/learning-lab/checkout>. Check that the page says **Razorpay test mode**. Enter `1.00` (100 paise) and select **Pay in test mode**. Use the test payment methods offered by Razorpay, following its [current test instructions](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps#2-test-integration). Complete a simulated success, try a simulated failure, and close the modal without paying. Do not use live card details in the test flow.

The successful callback is sent to the server. Only a valid signature plus a matching, captured payment and paid order displays **Test payment verified and captured**. An authorized payment, or a captured payment whose order has not updated yet, stays pending. **Check payment status** retries verification without creating another order. Unexpected network or unreadable-response failures preserve this action. Once a payment callback has arrived, the Pay button stays disabled to prevent an accidental second payment. Keep the displayed order/payment references if confirmation cannot complete.

Run the automated checks separately:

```powershell
corepack.cmd pnpm test:payments
corepack.cmd pnpm typecheck
```

With the development server running, the browser checks use mocked Razorpay transport and synthetic responses; they do not make payments:

```powershell
$env:PAYMENT_TEST_BASE_URL = 'http://localhost:3110'
node scripts/test-razorpay-browser.mjs
```

## Configuration

Use a matching pair of Razorpay API keys:

```dotenv
RAZORPAY_KEY_ID=<your-test-key-id>
RAZORPAY_KEY_SECRET=<your-test-key-secret>
NEXT_PUBLIC_RAZORPAY_KEY_ID=<same-public-key-id>
```

Restart the development server after changing `.env`. The server returns only the public Key ID with each order, keeping runtime configuration authoritative. The `NEXT_PUBLIC_` alias is optional and contains only the public Key ID; the secret must never have that prefix.

For a Vercel deployment, set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in the intended project's environment settings and redeploy. A local `.env` is not uploaded as deployment configuration. Keep Preview and Production environments deliberate; test keys simulate payments, while live keys can charge real money. This implementation does not deploy the site or change dashboard capture settings.

## API contract

Both endpoints accept same-origin JSON POST requests. Requests are limited to 4 KiB, responses are private and not cached, and SDK error details are redacted.

Create an order with `{ "amount": 100, "currency": "INR" }`. `amount` is an integer in paise, from 100 to 10000000 (₹1 to ₹1,00,000). An optional `receipt` allows up to 40 letters, numbers, hyphens or underscores; otherwise the server generates a unique receipt. The server attaches the Learning Lab payment purpose and calls Razorpay's Orders API using the Node SDK.

HTTP 201 returns `{ order_id, amount, currency, key_id, order_token }`. The client opens Standard Checkout using this order's public key, amount, currency and order ID.

Verify by sending `razorpay_payment_id`, `razorpay_order_id`, `razorpay_signature` and the original `order_token`. The signed context preserves the original server-created order, amount, currency, receipt and key for 30 minutes across serverless instances. The server checks the token, verifies HMAC-SHA256 of the trusted original order ID plus `|` plus payment ID using a constant-time comparison, then fetches the order and payment from Razorpay. It rejects mismatched details, refunds and incomplete/failed payments. HTTP 200 returns `success: true, paid: true` only for confirmed capture; HTTP 202 returns `success: true, paid: false` while confirmation is pending. Missing fields or an invalid signature/token return 400, provider authentication failures return 401, provider failures return 500, and missing configuration returns 503.

## Scope and next steps

This is an agreed-amount payment flow, not a product purchase or automatic paid-course enrolment. It leaves the existing free courses, manual QR instructions and paid-cohort launch controls in place. It does not create database tables, issue receipts, admit learners, capture authorized payments itself or implement webhooks. Confirmation tokens are replayable until expiry, and verification remains idempotent and free of fulfilment side effects.

Before using this flow for actual purchases, connect approved server-priced products, persist payment/fulfilment state with idempotency, and reconcile asynchronous payment updates using verified webhooks or equivalent server reconciliation. Configure and check capture in Razorpay before treating an authorization as a completed payment. A closed browser or an expired confirmation token needs dashboard/server reconciliation rather than another payment.

The checkout route alone permits the required Razorpay script/frame/network origins and popup handoffs. Other routes retain their existing security policy. See the [official Standard Checkout integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps) for provider setup and test-to-live instructions.
