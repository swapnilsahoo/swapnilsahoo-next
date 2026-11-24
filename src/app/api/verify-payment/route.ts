import { verifyCheckoutPayment } from "@/features/payments/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return verifyCheckoutPayment(request);
}
