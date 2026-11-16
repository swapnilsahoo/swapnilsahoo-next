export const MIN_PAYMENT_PAISE = 100;
export const MAX_PAYMENT_PAISE = 10_000_000;
export const PAYMENT_CURRENCY = "INR";

export type CheckoutOrder = {
  order_id: string;
  amount: number;
  currency: "INR";
  key_id: string;
  order_token: string;
};

export type CheckoutCallback = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export type VerificationRequest = CheckoutCallback & { order_token: string };

export type PaymentVerification = {
  success: true;
  paid: boolean;
  status: "captured" | "authorized";
  payment_id: string;
  order_id: string;
  amount: number;
  currency: "INR";
};
