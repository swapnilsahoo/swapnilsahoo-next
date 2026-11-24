import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

// Run against an already running local preview configured with synthetic test
// credentials: PAYMENT_TEST_BASE_URL=http://localhost:3112 node scripts/test-razorpay-browser.mjs
// Both payment endpoints and the entire provider SDK are intercepted. No real
// provider requests, orders, payments, credentials or .env reads are involved.
const base = new URL(process.env.PAYMENT_TEST_BASE_URL || "http://localhost:3112");
assert(
  ["localhost", "127.0.0.1"].includes(base.hostname) &&
    ["http:", "https:"].includes(base.protocol) &&
    !base.username &&
    !base.password,
  "PAYMENT_TEST_BASE_URL must be an explicitly local HTTP(S) preview URL."
);
const origin = base.origin;
const checkoutPath = "/learning-lab/checkout";
const providerScript = "https://checkout.razorpay.com/v1/checkout.js";
const orderId = "order_browserSmoke";
const paymentId = "pay_browserSmoke";
const orderToken = "synthetic-browser-order-context";
const signature = "a".repeat(64);
const mockSdk = `
  window.__paymentMock = { instances: [], opens: 0 };
  window.Razorpay = function(options) {
    const instance = {
      options,
      events: {},
      open() { window.__paymentMock.opens += 1; },
      close() {},
      on(event, callback) { this.events[event] = callback; }
    };
    window.__paymentMock.instances.push(instance);
    return instance;
  };
  window.__paymentMock.success = () => {
    const instance = window.__paymentMock.instances.at(-1);
    instance.options.handler({
      razorpay_order_id: instance.options.order_id,
      razorpay_payment_id: ${JSON.stringify(paymentId)},
      razorpay_signature: ${JSON.stringify(signature)}
    });
  };
  window.__paymentMock.dismiss = () => window.__paymentMock.instances.at(-1).options.modal.ondismiss();
  window.__paymentMock.fail = () => window.__paymentMock.instances.at(-1).events["payment.failed"]();
`;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const pageErrors = [];
const unexpectedWrites = [];
let current;
let scenarios = 0;
let responsiveChecks = 0;
page.on("pageerror", (error) => pageErrors.push(error.message));

await context.route("**/*", async (route) => {
  const request = route.request();
  const url = new URL(request.url());
  if (request.url() === providerScript) {
    return route.fulfill({ contentType: "application/javascript", body: mockSdk });
  }
  // Do not allow even analytics or provider GET requests to leave this suite.
  if (url.origin !== origin) return route.abort("blockedbyclient");
  if (["/api/create-order", "/api/verify-payment"].includes(url.pathname)) {
    assert.equal(request.method(), "POST", `${url.pathname}: expected POST`);
    const payload = request.postDataJSON();
    if (url.pathname === "/api/create-order") {
      current.orders.push(payload);
      if (current.createStatus === 401) {
        return route.fulfill({
          status: 401,
          json: { error: "Your checkout session expired. Refresh the page and try again." },
        });
      }
      return route.fulfill({
        json: {
          key_id: "rzp_test_browserSmoke",
          order_id: orderId,
          order_token: orderToken,
          amount: payload.amount,
          currency: "INR",
        },
      });
    }
    current.verifications.push(payload);
    const outcome = current.outcomes.shift() || "captured";
    if (outcome === "html") {
      return route.fulfill({
        status: 502,
        contentType: "text/html",
        body: "<!doctype html><title>Temporary upstream failure</title>",
      });
    }
    return route.fulfill({
      json: {
        success: true,
        paid: outcome === "captured",
        status: outcome,
        payment_id: paymentId,
        order_id: orderId,
        amount: current.orders.at(-1).amount,
        currency: "INR",
      },
    });
  }
  if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
    unexpectedWrites.push(`${request.method()} ${url.pathname}`);
    return route.abort("blockedbyclient");
  }
  return route.continue();
});

const paymentForm = page.getByRole("form", { name: "Razorpay checkout" });
const payButton = paymentForm.locator('button[type="submit"]');
const statusButton = page.getByRole("button", { name: "Check payment status", exact: true });
const amountInput = page.getByLabel("Amount in rupees (INR)", { exact: true });

async function waitEnabled(locator) {
  await locator.waitFor();
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    if (await locator.isEnabled()) return;
    await page.waitForTimeout(50);
  }
  assert.fail(`Expected ${locator} to become enabled`);
}

async function start({ outcomes = ["captured"], createStatus = 200 } = {}) {
  current = { orders: [], verifications: [], outcomes: [...outcomes], createStatus };
  const response = await page.goto(`${origin}${checkoutPath}`, {
    waitUntil: "networkidle",
    timeout: 120000,
  });
  assert.equal(response.status(), 200, "Checkout page must return 200");
  await paymentForm.waitFor({ timeout: 15000 });
  await waitEnabled(payButton);
  return response;
}

async function openCheckout(amount = "1.00") {
  await amountInput.fill(amount);
  await payButton.click();
  await page.waitForFunction(() => window.__paymentMock?.opens === 1);
  assert.equal(await payButton.isDisabled(), true, "Pay must stay disabled during checkout");
}

async function trigger(action) {
  await page.evaluate((name) => window.__paymentMock[name](), action);
}

async function waitMessage(pattern) {
  try {
    await page.locator(".lab-status").filter({ hasText: pattern }).waitFor({ timeout: 10000 });
  } catch (cause) {
    throw new Error(
      `Expected ${pattern}; visible status: ${await page.locator(".lab-status").allTextContents()}`,
      { cause }
    );
  }
}

async function assertNoSecondPayment() {
  assert.equal(await payButton.isDisabled(), true, "A callback must block a second payment");
  // Submitting the form directly also exercises the handler's duplicate guard.
  await paymentForm.evaluate((form) =>
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }))
  );
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  );
  assert.equal(current.orders.length, 1, "Only the original order may exist");
  assert.equal(await page.evaluate(() => window.__paymentMock.opens), 1);
}

function cspDirectives(value) {
  const directives = new Map();
  for (const directive of value
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)) {
    const [name, ...sources] = directive.split(/\s+/);
    assert(!directives.has(name), `Duplicate ${name} suggests combined CSP policies`);
    directives.set(name, sources);
  }
  return directives;
}

async function inspectHeaders(response, checkout) {
  const headers = await response.headersArray();
  const matching = (name) => headers.filter((header) => header.name.toLowerCase() === name);
  const policies = matching("content-security-policy");
  assert.equal(policies.length, 1, "Each route must have exactly one CSP header");
  assert(!policies[0].value.includes(","), "Multiple CSP values must not be combined");
  const directives = cspDirectives(policies[0].value);
  const script = directives.get("script-src");
  const frame = directives.get("frame-src");
  const connect = directives.get("connect-src");
  assert(script?.includes("'self'"), "Keep script-src self restriction");
  assert.deepEqual(directives.get("default-src"), ["'self'"]);
  assert.deepEqual(directives.get("base-uri"), ["'self'"]);
  assert.deepEqual(directives.get("form-action"), ["'self'"]);
  assert.deepEqual(directives.get("object-src"), ["'none'"]);
  assert.deepEqual(directives.get("frame-ancestors"), ["'self'"]);
  assert.equal(script.includes("https://checkout.razorpay.com"), checkout);
  assert.equal(frame?.includes("https://checkout.razorpay.com"), checkout);
  assert.equal(frame?.includes("https://api.razorpay.com"), checkout);
  for (const providerOrigin of [
    "https://checkout.razorpay.com",
    "https://api.razorpay.com",
    "https://lumberjack.razorpay.com",
  ]) {
    assert.equal(connect?.includes(providerOrigin), checkout);
  }
  assert(!script.includes("*"), "Do not replace the script allowlist with a wildcard");
  const coop = matching("cross-origin-opener-policy");
  assert.equal(coop.length, 1, "COOP must be overridden, not duplicated");
  assert.equal(coop[0].value, checkout ? "same-origin-allow-popups" : "same-origin");
  const permissions = matching("permissions-policy");
  assert.equal(permissions.length, 1);
  assert.equal(permissions[0].value.includes("payment=()"), !checkout);
}

try {
  const checkoutResponse = await start();
  await inspectHeaders(checkoutResponse, true);
  await openCheckout("1234.56");
  assert.deepEqual(current.orders, [{ amount: 123456, currency: "INR" }]);
  const options = await page.evaluate(() => {
    const { key, amount, currency, order_id } = window.__paymentMock.instances[0].options;
    return { key, amount, currency, order_id };
  });
  assert.deepEqual(options, {
    key: "rzp_test_browserSmoke",
    amount: 123456,
    currency: "INR",
    order_id: orderId,
  });
  await trigger("success");
  await waitMessage(/contribution verified and captured/i);
  assert.equal(await payButton.innerText(), "Contribution received");
  assert.equal(await statusButton.count(), 0);
  assert.deepEqual(current.verifications, [
    {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      order_token: orderToken,
    },
  ]);
  await trigger("success");
  await assertNoSecondPayment();
  assert.equal(current.verifications.length, 1, "Duplicate callbacks must not reverify");
  scenarios += 1;

  // Check real narrow layouts with the long payment reference still visible.
  for (const width of [320, 360, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const overflow = await page.evaluate(
      () => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth
    );
    assert(overflow <= 1, `Checkout at ${width}px overflows by ${overflow}px`);
    responsiveChecks += 1;
  }
  if (process.env.PAYMENT_TEST_SCREENSHOT === "1") {
    await mkdir("artifacts/learning-lab", { recursive: true });
    await page.screenshot({ path: "artifacts/learning-lab/razorpay-checkout.png", fullPage: true });
  }

  await start();
  await openCheckout();
  await trigger("dismiss");
  await waitMessage(/window closed.*No payment has been confirmed/i);
  await waitEnabled(payButton);
  assert.equal(current.verifications.length, 0);
  assert.equal(await statusButton.count(), 0);
  scenarios += 1;

  await start();
  await openCheckout();
  await trigger("fail");
  await waitMessage(/attempt failed.*retry inside the payment window/i);
  assert.equal(await payButton.isDisabled(), true, "Keep the open modal locked after failure");
  await trigger("dismiss");
  await waitMessage(/attempt failed.*account shows a debit/i);
  await waitEnabled(payButton);
  assert.equal(current.verifications.length, 0);
  scenarios += 1;

  await start({ createStatus: 401 });
  // Contributors choose their own amount; the field starts empty.
  assert.equal(await amountInput.inputValue(), "");
  await amountInput.fill("500");
  await payButton.click();
  await waitMessage(/checkout session expired/i);
  await waitEnabled(payButton);
  assert.equal(current.orders.length, 1);
  assert.equal(current.verifications.length, 0);
  assert.equal(await page.evaluate(() => window.__paymentMock.instances.length), 0);
  scenarios += 1;

  await start({ outcomes: ["authorized", "captured"] });
  await openCheckout();
  await trigger("success");
  await waitMessage(/confirmation is still pending/i);
  await waitEnabled(statusButton);
  await assertNoSecondPayment();
  await statusButton.click();
  await waitMessage(/contribution verified and captured/i);
  assert.equal(current.verifications.length, 2);
  assert.deepEqual(current.verifications[0], current.verifications[1]);
  assert.equal(await statusButton.count(), 0);
  await assertNoSecondPayment();
  scenarios += 1;

  await start({ outcomes: ["html", "captured"] });
  await openCheckout();
  await trigger("success");
  await page.getByRole("alert").waitFor();
  await waitEnabled(statusButton);
  await assertNoSecondPayment();
  await statusButton.click();
  await waitMessage(/contribution verified and captured/i);
  assert.equal(current.verifications.length, 2);
  assert.deepEqual(current.verifications[0], current.verifications[1]);
  await assertNoSecondPayment();
  scenarios += 1;

  const freeResponse = await page.goto(`${origin}/learning-lab/free-courses`, {
    waitUntil: "networkidle",
    timeout: 120000,
  });
  assert.equal(freeResponse.status(), 200);
  await inspectHeaders(freeResponse, false);
  assert.equal(await paymentForm.count(), 0);
  assert.deepEqual(unexpectedWrites, [], "Unexpected writes must not escape payment mocks");
  assert.deepEqual(pageErrors, [], "Browser must not have uncaught errors");
  console.log(
    `PASS Razorpay browser: ${scenarios} payment scenarios, 2 header policies, ${responsiveChecks} responsive widths; all payment traffic mocked.`
  );
} finally {
  await browser.close();
}
