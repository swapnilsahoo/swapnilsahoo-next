import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import {
  labContributionPayeeLine,
  labPublicConfig,
  labSupportLine,
} from "@/features/learning-lab/config";
import { RazorpayCheckout } from "@/features/payments/RazorpayCheckout";
import { getCheckoutAvailability } from "@/features/payments/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Contribute Online",
  description:
    "Everything the Learning Lab offers is free. Make an optional voluntary contribution by UPI, card or netbanking through Razorpay.",
  alternates: { canonical: "/learning-lab/checkout" },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  const availability = getCheckoutAvailability();
  return (
    <>
      <LabHero
        eyebrow="Support the Learning Lab"
        title="Contribute online."
        description={`Everything the Lab offers is free. ${labSupportLine}`}
      />
      <LabSection className="lab-band">
        <p className="lab-lead" style={{ marginTop: 0 }}>
          {labContributionPayeeLine}
        </p>
        <RazorpayCheckout {...availability} />
        <p className="lab-small mt-6">
          Questions, an uncertain payment status or a contribution made by mistake? Email{" "}
          <a href={`mailto:${labPublicConfig.businessEmail}`} className="lab-text-link">
            {labPublicConfig.businessEmail}
          </a>{" "}
          with your order and payment references. A mistaken contribution is refunded through
          Razorpay to the method you used.
        </p>
        <Link href="/learning-lab/support" className="lab-text-link">
          Other ways to support the Lab →
        </Link>
      </LabSection>
    </>
  );
}
