import "server-only";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import Razorpay from "razorpay";
import { z } from "zod";
import { MAX_PAYMENT_PAISE, MIN_PAYMENT_PAISE, PAYMENT_CURRENCY } from "./contracts";

const PURPOSE = "learning-lab-contribution";
const CONTEXT_TTL_SECONDS = 30 * 60;
const MAX_BODY_BYTES = 4096;
const orderId = z.string().regex(/^order_[A-Za-z0-9]{1,64}$/);
const paymentId = z.string().regex(/^pay_[A-Za-z0-9]{1,64}$/);
const amount = z.number().int().min(MIN_PAYMENT_PAISE).max(MAX_PAYMENT_PAISE);
const currency = z.literal(PAYMENT_CURRENCY);
const receipt = z.string().regex(/^[A-Za-z0-9_-]{1,40}$/);
const orderRequest = z.object({ amount, currency, receipt: receipt.optional() }).strict();
const verificationRequest = z
  .object({
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: z.string().regex(/^[a-fA-F0-9]{64}$/),
    order_token: z.string().min(1).max(2048),
  })
  .strict();
const contextSchema = z
  .object({
    v: z.literal(1),
    orderId,
    amount,
    currency,
    receipt,
    purpose: z.literal(PURPOSE),
    keyId: z.string().max(100),
    expiresAt: z.number().int().positive(),
  })
  .strict();
const providerOrder = z.object({
  id: orderId,
  amount,
  currency,
  receipt,
  status: z.enum(["created", "attempted", "paid"]),
  amount_paid: z.number().int().nonnegative(),
  amount_due: z.number().int().nonnegative(),
  notes: z.object({ purpose: z.literal(PURPOSE) }),
});
const providerPayment = z.object({
  id: paymentId,
  order_id: orderId,
  amount,
  currency,
  status: z.string(),
  captured: z.boolean(),
  amount_refunded: z.number().int().nonnegative(),
});

type OrderInput = z.infer<typeof orderRequest> & { receipt: string; notes: { purpose: string } };
// The small boundary allows isolated tests without sending requests or touching the Lab database.
export type PaymentGateway = {
  createOrder(input: OrderInput): Promise<unknown>;
  fetchOrder(id: string): Promise<unknown>;
  fetchPayment(id: string): Promise<unknown>;
};

class PaymentHttpError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

function configuration() {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim();
  const secret = process.env.RAZORPAY_KEY_SECRET?.trim();
  // Test keys only simulate payments, so they are never offered to real visitors on production.
  const testKeyOnProduction =
    process.env.VERCEL_ENV === "production" && Boolean(keyId?.startsWith("rzp_test_"));
  if (!keyId || !/^rzp_(test|live)_[A-Za-z0-9]+$/.test(keyId) || !secret || testKeyOnProduction) {
    throw new PaymentHttpError(
      503,
      "Online contributions are not open yet. Please use the QR on the support page or contact the Learning Lab."
    );
  }
  return { keyId, secret };
}

export function getCheckoutAvailability() {
  try {
    const { keyId } = configuration();
    return { available: true, testMode: keyId.startsWith("rzp_test_") };
  } catch {
    return { available: false, testMode: false };
  }
}

function gatewayFor(config: ReturnType<typeof configuration>): PaymentGateway {
  const client = new Razorpay({ key_id: config.keyId, key_secret: config.secret });
  return {
    createOrder: (input) => client.orders.create(input),
    fetchOrder: (id) => client.orders.fetch(id),
    fetchPayment: (id) => client.payments.fetch(id),
  };
}

async function providerCall<T>(operation: () => Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    // No automatic retry: a timed-out create may still have created an unpaid order.
    return await Promise.race([
      operation(),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("Payment provider timeout")), 12_000);
      }),
    ]);
  } catch (error) {
    const status =
      error && typeof error === "object" && "statusCode" in error ? Number(error.statusCode) : 0;
    if (status === 401) {
      throw new PaymentHttpError(
        401,
        "The payment provider could not authenticate checkout. Please contact the Learning Lab."
      );
    }
    // Never return/log SDK errors: they can include credentials, customer data or request details.
    throw new PaymentHttpError(500, "The payment provider is unavailable. Please try again later.");
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function mac(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}

function equalHex(expected: string, actual: string) {
  return (
    /^[a-fA-F0-9]{64}$/.test(actual) &&
    timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(actual, "hex"))
  );
}

function signContext(context: z.infer<typeof contextSchema>, secret: string) {
  const payload = Buffer.from(JSON.stringify(context)).toString("base64url");
  return `${payload}.${mac(`checkout-context:v1:${payload}`, secret)}`;
}

function readContext(token: string, config: ReturnType<typeof configuration>) {
  const [payload, signature, extra] = token.split(".");
  if (
    !payload ||
    !signature ||
    extra !== undefined ||
    !/^[A-Za-z0-9_-]+$/.test(payload) ||
    !equalHex(mac(`checkout-context:v1:${payload}`, config.secret), signature)
  ) {
    throw new PaymentHttpError(400, "The payment order could not be verified.");
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    throw new PaymentHttpError(400, "The payment order could not be verified.");
  }
  const result = contextSchema.safeParse(parsed);
  if (
    !result.success ||
    result.data.keyId !== config.keyId ||
    result.data.expiresAt <= Math.floor(Date.now() / 1000) ||
    result.data.expiresAt > Math.floor(Date.now() / 1000) + CONTEXT_TTL_SECONDS
  ) {
    throw new PaymentHttpError(
      400,
      "This payment confirmation has expired or is invalid. Contact the Learning Lab with your payment reference; do not pay again."
    );
  }
  return result.data;
}

async function readBody(request: Request): Promise<unknown> {
  if (
    request.headers.get("origin") !== new URL(request.url).origin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  ) {
    throw new PaymentHttpError(403, "Open checkout on this website to continue.");
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    throw new PaymentHttpError(415, "Send a JSON request.");
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    throw new PaymentHttpError(413, "The payment request is too large.");
  }
  const reader = request.body?.getReader();
  if (!reader) throw new PaymentHttpError(400, "The payment request is missing.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new PaymentHttpError(413, "The payment request is too large.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new PaymentHttpError(400, "The payment request is not valid JSON.");
  }
}

function reply(body: unknown, status: number) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, private",
      Vary: "Origin",
      "Referrer-Policy": "no-referrer",
    },
  });
}

function failure(error: unknown) {
  return error instanceof PaymentHttpError
    ? reply({ success: false, paid: false, error: error.message }, error.status)
    : reply(
        {
          success: false,
          paid: false,
          error: "Checkout could not complete. Please contact the Learning Lab.",
        },
        500
      );
}

export async function createCheckoutOrder(request: Request, gateway?: PaymentGateway) {
  try {
    const parsed = orderRequest.safeParse(await readBody(request));
    if (!parsed.success)
      throw new PaymentHttpError(
        400,
        "Enter a whole-number amount from 100 to 10000000 paise, currency INR, and an optional receipt of up to 40 letters, numbers, hyphens or underscores."
      );
    const config = configuration();
    const input = {
      ...parsed.data,
      receipt: parsed.data.receipt || `lab_${randomUUID().replaceAll("-", "")}`,
      notes: { purpose: PURPOSE },
    };
    const result = await providerCall(() => (gateway || gatewayFor(config)).createOrder(input));
    const order = providerOrder.safeParse(result);
    if (
      !order.success ||
      order.data.amount !== input.amount ||
      order.data.currency !== input.currency ||
      order.data.receipt !== input.receipt ||
      order.data.status !== "created" ||
      order.data.amount_paid !== 0 ||
      order.data.amount_due !== input.amount
    ) {
      throw new PaymentHttpError(
        500,
        "The payment provider returned an invalid order. Please contact the Learning Lab."
      );
    }
    return reply(
      {
        order_id: order.data.id,
        amount: input.amount,
        currency: input.currency,
        key_id: config.keyId,
        order_token: signContext(
          {
            v: 1,
            orderId: order.data.id,
            amount: input.amount,
            currency: input.currency,
            receipt: input.receipt,
            purpose: PURPOSE,
            keyId: config.keyId,
            expiresAt: Math.floor(Date.now() / 1000) + CONTEXT_TTL_SECONDS,
          },
          config.secret
        ),
      },
      201
    );
  } catch (error) {
    return failure(error);
  }
}

export async function verifyCheckoutPayment(request: Request, gateway?: PaymentGateway) {
  try {
    const parsed = verificationRequest.safeParse(await readBody(request));
    if (!parsed.success)
      throw new PaymentHttpError(
        400,
        "The payment ID, order ID, signature and original order token are required."
      );
    const config = configuration();
    const data = parsed.data;
    const context = readContext(data.order_token, config);
    // The signed context preserves our original order across serverless instances.
    // Never use the callback's untrusted order ID as the HMAC's source of truth.
    if (
      context.orderId !== data.razorpay_order_id ||
      !equalHex(
        mac(`${context.orderId}|${data.razorpay_payment_id}`, config.secret),
        data.razorpay_signature
      )
    ) {
      throw new PaymentHttpError(
        400,
        "Payment signature verification failed. The payment has not been confirmed."
      );
    }
    const provider = gateway || gatewayFor(config);
    const [rawOrder, rawPayment] = await providerCall(() =>
      Promise.all([
        provider.fetchOrder(context.orderId),
        provider.fetchPayment(data.razorpay_payment_id),
      ])
    );
    const order = providerOrder.safeParse(rawOrder);
    const payment = providerPayment.safeParse(rawPayment);
    if (
      !order.success ||
      !payment.success ||
      order.data.id !== context.orderId ||
      order.data.receipt !== context.receipt ||
      order.data.amount !== context.amount ||
      order.data.currency !== context.currency ||
      payment.data.id !== data.razorpay_payment_id ||
      payment.data.order_id !== context.orderId ||
      payment.data.amount !== context.amount ||
      payment.data.currency !== context.currency ||
      payment.data.amount_refunded !== 0
    ) {
      throw new PaymentHttpError(
        400,
        "The payment details do not match the original order. Contact the Learning Lab with your payment reference."
      );
    }
    const paid =
      payment.data.status === "captured" &&
      payment.data.captured &&
      order.data.status === "paid" &&
      order.data.amount_paid === context.amount &&
      order.data.amount_due === 0;
    const awaitingCapture = payment.data.status === "authorized" && !payment.data.captured;
    const awaitingOrder = payment.data.status === "captured" && payment.data.captured && !paid;
    if (!paid && !awaitingCapture && !awaitingOrder) {
      throw new PaymentHttpError(
        400,
        "This payment is not complete. Please check its status with the Learning Lab."
      );
    }
    // Verification is idempotent and creates no enrolment, receipt or access entitlement.
    return reply(
      {
        success: true,
        paid,
        status: payment.data.status,
        payment_id: payment.data.id,
        order_id: context.orderId,
        amount: context.amount,
        currency: context.currency,
      },
      paid ? 200 : 202
    );
  } catch (error) {
    return failure(error);
  }
}
