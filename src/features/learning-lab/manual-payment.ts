// Keep the original QR unchanged. Set qrSource only after the founder's supplied
// file has been inspected and decoded; a printed name alone does not verify it.
export const manualPaymentConfig: {
  qrSource: string | null;
  payeeName: string;
  verified: boolean;
} = {
  qrSource: null,
  payeeName: "SWAPNIL SAHOO",
  verified: false,
};

export function getVerifiedPaymentQr() {
  return manualPaymentConfig.verified ? manualPaymentConfig.qrSource : null;
}
