import type { Metadata } from "next";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { ManualPaymentInstructions } from "@/features/learning-lab/components/ManualPaymentInstructions";
import { labPublicConfig } from "@/features/learning-lab/config";
import { getVerifiedPaymentQr, manualPaymentConfig } from "@/features/learning-lab/manual-payment";

export const metadata: Metadata = {
  title: "Manual Payment Instructions",
  description:
    "Payment instructions for a separately confirmed Learning Lab arrangement. A transfer does not automatically confirm enrolment or access.",
  alternates: { canonical: "/learning-lab/payment-instructions" },
  robots: { index: false, follow: false },
};

export default function PaymentInstructionsPage() {
  return (
    <>
      <LabHero
        eyebrow="For a separately confirmed arrangement"
        title="Manual payment instructions."
        description="Use this route only after Dr. Swapnil Sahoo confirms the purpose, amount and terms with you. The free-course library remains free."
      />
      <LabSection className="lab-band">
        <ManualPaymentInstructions
          qrSource={getVerifiedPaymentQr()}
          payeeName={manualPaymentConfig.payeeName}
          contactEmail={labPublicConfig.businessEmail}
        />
      </LabSection>
    </>
  );
}
