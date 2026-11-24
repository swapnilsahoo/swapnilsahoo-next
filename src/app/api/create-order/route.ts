import { createCheckoutOrder } from "@/features/payments/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return createCheckoutOrder(request);
}
