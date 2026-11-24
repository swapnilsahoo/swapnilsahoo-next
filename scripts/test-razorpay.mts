import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { test } from "node:test";
import type { PaymentGateway } from "../src/features/payments/server";
import type { CheckoutOrder, VerificationRequest } from "../src/features/payments/contracts";

// All credentials, orders and payments are synthetic. Every provider operation is injected;
// this suite neither loads .env files nor contacts Razorpay or the Learning Lab database.
const KEY_ID = "rzp_test_OfflineChecks";
const SECRET = "offline-checkout-test-secret-only";
const ORIGIN = "https://checkout.example.invalid";
const ORDER_ID = "order_Offline123";
const PAYMENT_ID = "pay_Offline123";
const RECEIPT = "offline_receipt";
const AMOUNT = 500;
process.env.RAZORPAY_KEY_ID = KEY_ID;
process.env.RAZORPAY_KEY_SECRET = SECRET;

const { createCheckoutOrder, verifyCheckoutPayment, getCheckoutAvailability } =
  await import("../src/features/payments/server");

type Json = Record<string, unknown>;
type CreateInput = Parameters<PaymentGateway["createOrder"]>[0];
type Calls = { create: CreateInput[]; order: string[]; payment: string[] };

const paidOrder = {
  id: ORDER_ID,
  amount: AMOUNT,
  currency: "INR",
  receipt: RECEIPT,
  notes: { purpose: "learning-lab-contribution" },
  status: "paid",
  amount_paid: AMOUNT,
  amount_due: 0,
};
const capturedPayment = {
  id: PAYMENT_ID,
  order_id: ORDER_ID,
  amount: AMOUNT,
  currency: "INR",
  status: "captured",
  captured: true,
  amount_refunded: 0,
};

function mockGateway(overrides: Partial<PaymentGateway> = {}) {
  const calls: Calls = { create: [], order: [], payment: [] };
  const gateway: PaymentGateway = {
    async createOrder(input) {
      calls.create.push(input);
      return overrides.createOrder
        ? overrides.createOrder(input)
        : {
            id: ORDER_ID,
            ...input,
            status: "created",
            amount_paid: 0,
            amount_due: input.amount,
          };
    },
    async fetchOrder(id) {
      calls.order.push(id);
      return overrides.fetchOrder ? overrides.fetchOrder(id) : { ...paidOrder };
    },
    async fetchPayment(id) {
      calls.payment.push(id);
      return overrides.fetchPayment ? overrides.fetchPayment(id) : { ...capturedPayment };
    },
  };
  return { gateway, calls };
}

function request(body: unknown, init: RequestInit = {}) {
  return new Request(`${ORIGIN}/api/razorpay/test`, {
    method: "POST",
    body: JSON.stringify(body),
    ...init,
    headers: {
      origin: ORIGIN,
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(init.headers)),
    },
  });
}

async function result(response: Response, status: number) {
  const body: Json = await response.json();
  assert.equal(response.status, status, JSON.stringify(body));
  assert.equal(response.headers.get("cache-control"), "no-store, private");
  assert.equal(response.headers.get("vary"), "Origin");
  assert.equal(response.headers.get("referrer-policy"), "no-referrer");
  assert.ok(!JSON.stringify(body).includes(SECRET), "the secret must never reach the client");
  return body;
}

async function failure(response: Response, status: number) {
  const body = await result(response, status);
  assert.equal(body.success, false);
  assert.equal(body.paid, false);
  assert.equal(typeof body.error, "string");
  assert.equal(body.order_token, undefined);
  return body;
}

function noCalls(calls: Calls) {
  assert.deepEqual(calls, { create: [], order: [], payment: [] });
}

function mac(value: string) {
  return createHmac("sha256", SECRET).update(value).digest("hex");
}

function signPayload(payload: string) {
  return `${payload}.${mac(`checkout-context:v1:${payload}`)}`;
}

function updateContext(token: string, changes: Json) {
  const context: Json = JSON.parse(Buffer.from(token.split(".")[0], "base64url").toString());
  return signPayload(Buffer.from(JSON.stringify({ ...context, ...changes })).toString("base64url"));
}

async function fixture(overrides: Partial<PaymentGateway> = {}) {
  const mock = mockGateway(overrides);
  const order = (await result(
    await createCheckoutOrder(
      request({ amount: AMOUNT, currency: "INR", receipt: RECEIPT }),
      mock.gateway
    ),
    201
  )) as CheckoutOrder;
  mock.calls.create.length = 0;
  const callback: VerificationRequest = {
    razorpay_order_id: order.order_id,
    razorpay_payment_id: PAYMENT_ID,
    razorpay_signature: mac(`${order.order_id}|${PAYMENT_ID}`),
    order_token: order.order_token,
  };
  return { ...mock, order, callback };
}

await test("creates bounded INR orders and returns only public checkout data", async () => {
  for (const amount of [100, 10_000_000]) {
    const { gateway, calls } = mockGateway();
    const before = Math.floor(Date.now() / 1000);
    const body = await result(
      await createCheckoutOrder(request({ amount, currency: "INR" }), gateway),
      201
    );
    assert.deepEqual(Object.keys(body).sort(), [
      "amount",
      "currency",
      "key_id",
      "order_id",
      "order_token",
    ]);
    assert.equal(body.amount, amount);
    assert.equal(body.currency, "INR");
    assert.equal(body.key_id, KEY_ID);
    assert.equal(body.order_id, ORDER_ID);
    assert.equal(calls.create.length, 1);
    assert.match(calls.create[0].receipt, /^[A-Za-z0-9_-]{1,40}$/);
    assert.deepEqual(calls.create[0].notes, { purpose: "learning-lab-contribution" });
    const token = String(body.order_token);
    const [payload, signature] = token.split(".");
    assert.equal(signature, mac(`checkout-context:v1:${payload}`));
    const context: Json = JSON.parse(Buffer.from(payload, "base64url").toString());
    assert.equal(context.orderId, ORDER_ID);
    assert.equal(context.amount, amount);
    assert.equal(context.receipt, calls.create[0].receipt);
    assert.ok(Number(context.expiresAt) >= before + 1800);
    assert.ok(Number(context.expiresAt) <= Math.floor(Date.now() / 1000) + 1800);
    assert.deepEqual(calls.order, []);
    assert.deepEqual(calls.payment, []);
  }
});

await test("invalid amounts, currency, receipts and unknown fields never create an order", async () => {
  const invalid = [
    { amount: 99, currency: "INR" },
    { amount: 100.5, currency: "INR" },
    { amount: 10_000_001, currency: "INR" },
    { amount: "500", currency: "INR" },
    { currency: "INR" },
    { amount: AMOUNT },
    { amount: AMOUNT, currency: "USD" },
    { amount: AMOUNT, currency: "INR", receipt: "x".repeat(41) },
    { amount: AMOUNT, currency: "INR", receipt: "not a receipt" },
    { amount: AMOUNT, currency: "INR", notes: { purpose: "other" } },
  ];
  for (const body of invalid) {
    const { gateway, calls } = mockGateway();
    await failure(await createCheckoutOrder(request(body), gateway), 400);
    noCalls(calls);
  }
});

await test("both endpoints enforce origin, JSON and byte limits before provider calls", async () => {
  const base = await fixture();
  const cases: { status: number; init: RequestInit }[] = [
    { status: 403, init: { headers: { origin: "https://other.example.invalid" } } },
    { status: 403, init: { headers: { "sec-fetch-site": "cross-site" } } },
    { status: 415, init: { headers: { "content-type": "text/plain" } } },
    { status: 413, init: { headers: { "content-length": "4097" } } },
    { status: 413, init: { body: "€".repeat(1400) } },
    { status: 413, init: { body: "x".repeat(4097), headers: { "content-length": "1" } } },
    { status: 400, init: { body: "{" } },
    { status: 400, init: { body: null } },
  ];
  for (const handler of [createCheckoutOrder, verifyCheckoutPayment]) {
    for (const { status, init } of cases) {
      const { gateway, calls } = mockGateway();
      await failure(await handler(request(base.callback, init), gateway), status);
      noCalls(calls);
    }
    for (const missingHeader of ["origin", "content-type"]) {
      const { gateway, calls } = mockGateway();
      const req = request(base.callback);
      req.headers.delete(missingHeader);
      await failure(await handler(req, gateway), missingHeader === "origin" ? 403 : 415);
      noCalls(calls);
    }
  }
});

await test("streamed oversize bodies are cancelled without contacting the provider", async () => {
  for (const handler of [createCheckoutOrder, verifyCheckoutPayment]) {
    let cancelled = false;
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new Uint8Array(4097));
      },
      cancel() {
        cancelled = true;
      },
    });
    const { gateway, calls } = mockGateway();
    const req = request({}, { body: stream, duplex: "half" } as RequestInit);
    await failure(await handler(req, gateway), 413);
    assert.equal(cancelled, true);
    noCalls(calls);
  }
});

await test("provider authentication and server errors are sanitized on both endpoints", async () => {
  for (const statusCode of [401, 500]) {
    const sensitive = `provider-private-detail ${SECRET} customer@example.invalid`;
    const upstream = Object.assign(new Error(sensitive), {
      statusCode,
      error: { description: sensitive },
    });
    const create = mockGateway({
      createOrder: async () => {
        throw upstream;
      },
    });
    const created = await failure(
      await createCheckoutOrder(request({ amount: AMOUNT, currency: "INR" }), create.gateway),
      statusCode
    );
    const verify = await fixture({
      fetchPayment: async () => {
        throw upstream;
      },
    });
    const verified = await failure(
      await verifyCheckoutPayment(request(verify.callback), verify.gateway),
      statusCode
    );
    for (const body of [created, verified]) {
      assert.equal(
        body.error,
        statusCode === 401
          ? "The payment provider could not authenticate checkout. Please contact the Learning Lab."
          : "The payment provider is unavailable. Please try again later."
      );
      assert.ok(!JSON.stringify(body).includes("provider-private-detail"));
      assert.ok(!JSON.stringify(body).includes("customer@example.invalid"));
    }
    assert.equal(create.calls.create.length, 1);
    assert.deepEqual(verify.calls.order, [ORDER_ID]);
    assert.deepEqual(verify.calls.payment, [PAYMENT_ID]);
    assert.deepEqual(verify.calls.create, []);
  }
});

await test("invalid or mismatched provider orders never receive a signed token", async () => {
  const changes = [
    { id: "invalid" },
    { amount: AMOUNT + 1 },
    { receipt: "another_receipt" },
    { currency: "USD" },
    { status: "paid" },
    { amount_paid: 1 },
    { amount_due: AMOUNT - 1 },
    { notes: { purpose: "other" } },
  ];
  for (const change of changes) {
    const { gateway, calls } = mockGateway({
      createOrder: async (input) => ({
        ...paidOrder,
        ...input,
        status: "created",
        amount_paid: 0,
        amount_due: input.amount,
        ...change,
      }),
    });
    await failure(
      await createCheckoutOrder(
        request({ amount: AMOUNT, currency: "INR", receipt: RECEIPT }),
        gateway
      ),
      500
    );
    assert.equal(calls.create.length, 1);
  }
});

await test("verification requires complete, strictly validated callback fields", async () => {
  const { callback } = await fixture();
  const invalid: Json[] = [];
  for (const field of Object.keys(callback)) {
    const missing: Json = { ...callback };
    delete missing[field];
    invalid.push(missing);
  }
  invalid.push(
    { ...callback, razorpay_order_id: "not_an_order" },
    { ...callback, razorpay_payment_id: "not_a_payment" },
    { ...callback, razorpay_signature: "short" },
    { ...callback, razorpay_signature: "z".repeat(64) },
    { ...callback, order_token: "x".repeat(2049) },
    { ...callback, amount: AMOUNT }
  );
  for (const body of invalid) {
    const { gateway, calls } = mockGateway();
    await failure(await verifyCheckoutPayment(request(body), gateway), 400);
    noCalls(calls);
  }
});

await test("tampered, expired, foreign and malformed contexts fail before provider calls", async () => {
  const { callback } = await fixture();
  const [payload, signature] = callback.order_token.split(".");
  const now = Math.floor(Date.now() / 1000);
  const invalidTokens = [
    `${payload}.${signature[0] === "0" ? "1" : "0"}${signature.slice(1)}`,
    `${payload}.${signature}.extra`,
    `${payload}=.${signature}`,
    signPayload(Buffer.from("not JSON").toString("base64url")),
    updateContext(callback.order_token, { expiresAt: now - 1 }),
    updateContext(callback.order_token, { expiresAt: now }),
    updateContext(callback.order_token, { expiresAt: now + 3600 }),
    updateContext(callback.order_token, { keyId: "rzp_test_OtherAccount" }),
    updateContext(callback.order_token, { purpose: "other-purpose" }),
  ];
  // Editing a valid payload while keeping its original MAC must also fail.
  const changedPayload = updateContext(callback.order_token, { amount: AMOUNT + 100 }).split(
    "."
  )[0];
  invalidTokens.push(`${changedPayload}.${signature}`);
  for (const order_token of invalidTokens) {
    const { gateway, calls } = mockGateway();
    await failure(await verifyCheckoutPayment(request({ ...callback, order_token }), gateway), 400);
    noCalls(calls);
  }
});

await test("signature and callback order mismatch fail before provider lookups", async () => {
  const { callback } = await fixture();
  for (const change of [
    { razorpay_signature: "0".repeat(64) },
    { razorpay_payment_id: "pay_Another123" },
    {
      razorpay_order_id: "order_Another123",
      razorpay_signature: mac(`order_Another123|${PAYMENT_ID}`),
    },
  ]) {
    const { gateway, calls } = mockGateway();
    await failure(await verifyCheckoutPayment(request({ ...callback, ...change }), gateway), 400);
    noCalls(calls);
  }
});

await test("captured, fully paid payments verify repeatedly without creating new orders", async () => {
  const { gateway, calls, callback } = await fixture();
  const first = await result(await verifyCheckoutPayment(request(callback), gateway), 200);
  const repeated = await result(await verifyCheckoutPayment(request(callback), gateway), 200);
  assert.deepEqual(first, {
    success: true,
    paid: true,
    status: "captured",
    payment_id: PAYMENT_ID,
    order_id: ORDER_ID,
    amount: AMOUNT,
    currency: "INR",
  });
  assert.deepEqual(repeated, first);
  assert.deepEqual(calls.create, []);
  assert.deepEqual(calls.order, [ORDER_ID, ORDER_ID]);
  assert.deepEqual(calls.payment, [PAYMENT_ID, PAYMENT_ID]);
});

await test("authorization and captured payments awaiting order reconciliation stay unpaid", async () => {
  const pending: Partial<PaymentGateway>[] = [
    {
      fetchOrder: async () => ({
        ...paidOrder,
        status: "attempted",
        amount_paid: 0,
        amount_due: AMOUNT,
      }),
      fetchPayment: async () => ({ ...capturedPayment, status: "authorized", captured: false }),
    },
    {
      fetchOrder: async () => ({
        ...paidOrder,
        status: "attempted",
        amount_paid: 0,
        amount_due: AMOUNT,
      }),
    },
    {
      fetchOrder: async () => ({
        ...paidOrder,
        status: "paid",
        amount_paid: AMOUNT - 1,
        amount_due: 1,
      }),
    },
  ];
  for (const overrides of pending) {
    const { gateway, calls, callback } = await fixture(overrides);
    const body = await result(await verifyCheckoutPayment(request(callback), gateway), 202);
    assert.equal(body.success, true);
    assert.equal(body.paid, false);
    assert.deepEqual(calls.create, []);
    assert.deepEqual(calls.order, [ORDER_ID]);
    assert.deepEqual(calls.payment, [PAYMENT_ID]);
  }
});

await test("refunds, failed payments and mismatched provider details cannot confirm payment", async () => {
  const invalid: Partial<PaymentGateway>[] = [
    ...[
      { status: "failed", captured: false },
      { status: "created", captured: false },
      { status: "captured", captured: false },
      { status: "authorized", captured: true },
      { status: "refunded", amount_refunded: AMOUNT },
      { amount_refunded: 1 },
      { id: "pay_Another123" },
      { order_id: "order_Another123" },
      { amount: AMOUNT + 1 },
      { currency: "USD" },
    ].map((change) => ({ fetchPayment: async () => ({ ...capturedPayment, ...change }) })),
    ...[
      { id: "order_Another123" },
      { receipt: "another_receipt" },
      { amount: AMOUNT + 1 },
      { currency: "USD" },
      { notes: { purpose: "other-purpose" } },
    ].map((change) => ({ fetchOrder: async () => ({ ...paidOrder, ...change }) })),
    { fetchPayment: async () => null },
    { fetchOrder: async () => ({}) },
  ];
  for (const overrides of invalid) {
    const { gateway, calls, callback } = await fixture(overrides);
    await failure(await verifyCheckoutPayment(request(callback), gateway), 400);
    assert.deepEqual(calls.create, []);
    assert.deepEqual(calls.order, [ORDER_ID]);
    assert.deepEqual(calls.payment, [PAYMENT_ID]);
  }
});

await test("missing or malformed configuration disables checkout before provider calls", async () => {
  const { callback } = await fixture();
  try {
    for (const [key, secret] of [
      ["", SECRET],
      [KEY_ID, ""],
      ["invalid-key", SECRET],
    ]) {
      process.env.RAZORPAY_KEY_ID = key;
      process.env.RAZORPAY_KEY_SECRET = secret;
      assert.deepEqual(getCheckoutAvailability(), { available: false, testMode: false });
      for (const handler of [createCheckoutOrder, verifyCheckoutPayment]) {
        const { gateway, calls } = mockGateway();
        const body =
          handler === createCheckoutOrder ? { amount: AMOUNT, currency: "INR" } : callback;
        await failure(await handler(request(body), gateway), 503);
        noCalls(calls);
      }
    }
  } finally {
    process.env.RAZORPAY_KEY_ID = KEY_ID;
    process.env.RAZORPAY_KEY_SECRET = SECRET;
  }
  assert.deepEqual(getCheckoutAvailability(), { available: true, testMode: true });
});
