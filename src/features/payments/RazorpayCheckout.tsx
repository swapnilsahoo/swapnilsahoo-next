"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  MAX_PAYMENT_PAISE,
  MIN_PAYMENT_PAISE,
  type CheckoutCallback,
  type CheckoutOrder,
  type PaymentVerification,
  type VerificationRequest,
} from "./contracts";

type CheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler(response: CheckoutCallback): void;
  modal: { ondismiss(): void };
  theme: { color: string };
};
type CheckoutInstance = {
  open(): void;
  close(): void;
  on(event: "payment.failed", handler: () => void): void;
};
declare global {
  interface Window {
    Razorpay?: new (options: CheckoutOptions) => CheckoutInstance;
  }
}

export function RazorpayCheckout({
  available,
  testMode,
}: {
  available: boolean;
  testMode: boolean;
}) {
  const [ready, setReady] = useState(false);
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState<VerificationRequest | null>(null);
  const [reference, setReference] = useState("");
  const [captured, setCaptured] = useState(false);
  const locked = useRef(false);
  const checkout = useRef<CheckoutInstance | null>(null);

  useEffect(() => () => checkout.current?.close(), []);

  async function verify(payload: VerificationRequest) {
    // Preserve the callback before any network/JSON failure. Never invite a
    // second payment while the first payment's confirmation is uncertain.
    setRetry(payload);
    setBusy(true);
    setMessage("Confirming your payment securely…");
    setError(false);
    setReference(`Order: ${payload.razorpay_order_id} · Payment: ${payload.razorpay_payment_id}`);
    try {
      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20_000),
      });
      const result = (await response.json().catch(() => {
        throw new Error(
          "Payment confirmation returned an unreadable response. Check the status again or contact the Learning Lab with your payment reference; do not pay again."
        );
      })) as PaymentVerification & { error?: string };
      if (!response.ok || !result.success) {
        setRetry(response.status >= 500 || response.status === 401 ? payload : null);
        throw new Error(
          result.error ||
            "Payment confirmation is unavailable. Keep your payment reference and contact the Learning Lab before paying again."
        );
      }
      if (result.paid) {
        setCaptured(true);
        setRetry(null);
        setMessage(
          testMode
            ? "Test contribution verified and captured. No real money was charged."
            : "Thank you. Your contribution is confirmed. Keep the reference below for your records."
        );
      } else {
        setRetry(payload);
        setMessage(
          "Payment received but confirmation is still pending. Check the status again; do not pay again."
        );
      }
    } catch (cause) {
      if (
        cause instanceof Error &&
        ["TimeoutError", "TypeError", "AbortError"].includes(cause.name)
      ) {
        setRetry(payload);
        setMessage(
          "Payment confirmation could not be reached. Check the status again or contact the Learning Lab with the reference below; do not pay again."
        );
      } else {
        setMessage(
          cause instanceof Error
            ? cause.message
            : "Payment could not be confirmed. Contact the Learning Lab before paying again."
        );
      }
      setError(true);
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }

  async function pay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked.current || retry || reference) return;
    const paise = Math.round(Number(amount) * 100);
    if (
      !/^\d+(\.\d{1,2})?$/.test(amount) ||
      !Number.isSafeInteger(paise) ||
      paise < MIN_PAYMENT_PAISE ||
      paise > MAX_PAYMENT_PAISE
    ) {
      setError(true);
      setMessage("Enter an amount from ₹1 to ₹1,00,000, with up to two decimal places.");
      return;
    }
    if (!window.Razorpay) {
      setError(true);
      setMessage("The payment window has not loaded. Refresh the page and try again.");
      return;
    }
    locked.current = true;
    setBusy(true);
    setError(false);
    setReference("");
    setMessage("Preparing your payment…");
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: paise, currency: "INR" }),
        signal: AbortSignal.timeout(20_000),
      });
      const order = (await response.json()) as CheckoutOrder & { error?: string };
      if (!response.ok) throw new Error(order.error || "The payment order could not be created.");
      if (order.key_id.startsWith("rzp_test_") !== testMode) {
        throw new Error("Checkout settings have changed. Refresh the page before continuing.");
      }
      let confirming = false;
      let failed = false;
      const modal = new window.Razorpay({
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,
        // The payee is the founder personally for now, so the window names him.
        name: "Swapnil Sahoo",
        description: testMode
          ? "Test contribution"
          : "Voluntary contribution for Swapnil Sahoo Learning Lab",
        theme: { color: "#194c45" },
        handler: (result) => {
          if (confirming) return;
          confirming = true;
          void verify({ ...result, order_token: order.order_token });
        },
        modal: {
          ondismiss: () => {
            if (confirming) return;
            locked.current = false;
            setBusy(false);
            setError(failed);
            setMessage(
              failed
                ? "The payment attempt failed. If your account shows a debit, contact the Learning Lab before trying again."
                : "Payment window closed. No payment has been confirmed."
            );
          },
        },
      });
      modal.on("payment.failed", () => {
        failed = true;
        setError(true);
        setMessage(
          "The payment attempt failed. You can retry inside the payment window or close it."
        );
      });
      checkout.current = modal;
      setMessage("Complete the payment in the secure payment window.");
      modal.open();
    } catch (cause) {
      locked.current = false;
      setBusy(false);
      setError(true);
      setMessage(
        cause instanceof Error && cause.name !== "TimeoutError" && cause.name !== "TypeError"
          ? cause.message
          : "Checkout could not be reached. Please try again later."
      );
    }
  }

  return (
    <section className="lab-card" aria-label="Online contribution">
      <p className="lab-eyebrow">{testMode ? "Razorpay test mode" : "Razorpay secure checkout"}</p>
      <h2>{testMode ? "Try a test contribution" : "Contribute online"}</h2>
      <p>
        {testMode
          ? "Use Razorpay test payment details. This simulates a payment without charging real money."
          : "Choose any amount. Pay by UPI, card, netbanking or wallet in Razorpay’s secure window; the Lab never sees your card or bank details."}
      </p>
      {!available ? (
        <p role="status">
          Online contributions are opening soon. Until then, you can use the{" "}
          <Link href="/learning-lab/support#donate" className="lab-text-link">
            PhonePe QR on the support page
          </Link>
          .
        </p>
      ) : (
        <>
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="afterInteractive"
            onReady={() => setReady(true)}
            onError={() => {
              setReady(false);
              setError(true);
              setMessage(
                "The payment window could not load. Check your connection and refresh the page."
              );
            }}
          />
          <form onSubmit={pay} className="lab-form" aria-label="Razorpay checkout">
            <div className="lab-field">
              <label htmlFor="checkout-amount">Amount in rupees (INR)</label>
              <input
                id="checkout-amount"
                name="amount"
                type="number"
                inputMode="decimal"
                min="1"
                max="100000"
                step="0.01"
                required
                placeholder="Any amount, for example 500"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                disabled={busy || Boolean(retry) || Boolean(reference)}
                aria-describedby="checkout-amount-help"
              />
              <p id="checkout-amount-help" className="lab-small">
                Minimum ₹1. Maximum ₹1,00,000.
              </p>
            </div>
            <div className="lab-actions">
              <button
                type="submit"
                className="lab-button"
                disabled={!ready || busy || Boolean(retry) || Boolean(reference)}
              >
                {captured
                  ? "Contribution received"
                  : reference && !busy
                    ? "Contribution submitted"
                    : busy
                      ? "Please wait…"
                      : !ready
                        ? "Loading checkout…"
                        : testMode
                          ? "Contribute in test mode"
                          : "Contribute with Razorpay"}
              </button>
              {retry && (
                <button
                  type="button"
                  className="lab-button lab-button-secondary"
                  disabled={busy}
                  onClick={() => {
                    if (locked.current) return;
                    locked.current = true;
                    void verify(retry);
                  }}
                >
                  Check payment status
                </button>
              )}
            </div>
          </form>
        </>
      )}
      {message && (
        <div
          className={error ? "lab-status lab-status-error" : "lab-status"}
          role={error ? "alert" : "status"}
          aria-live="polite"
        >
          <p>{message}</p>
        </div>
      )}
      {reference && <p className="lab-small break-all">{reference}</p>}
      <p className="lab-small">
        Everything the Lab offers stays free. A contribution does not buy a place, feedback,
        assessment, a certificate or preferential treatment. No registered-charity status or tax
        deduction is claimed.
      </p>
    </section>
  );
}
