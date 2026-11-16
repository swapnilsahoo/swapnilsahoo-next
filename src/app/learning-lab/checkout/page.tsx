import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { labPublicConfig } from "@/features/learning-lab/config";
import { RazorpayCheckout } from "@/features/payments/RazorpayCheckout";
import { getCheckoutAvailability } from "@/features/payments/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Online Checkout",
  description: "Secure Learning Lab payment checkout.",
  alternates: { canonical: "/learning-lab/checkout" },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  const availability = getCheckoutAvailability();
  return (
    <>
      <LabHero
        eyebrow="Learning Lab payments"
        title="Online checkout."
        description="A secure payment window for a separately confirmed arrangement."
      />
      <LabSection className="lab-band">
        <RazorpayCheckout {...availability} />
        <p className="lab-small mt-6">
          Questions or an uncertain payment status? Email{" "}
          <a href={`mailto:${labPublicConfig.businessEmail}`} className="lab-text-link">
            {labPublicConfig.businessEmail}
          </a>{" "}
          with your order and payment references.
        </p>
        <Link href="/learning-lab/free-courses" className="lab-text-link">
          Explore the free courses →
        </Link>
      </LabSection>
    </>
  );
}
