import Image from "next/image";
import Link from "next/link";

type ManualPaymentInstructionsProps = {
  qrSource: string | null;
  payeeName: string;
  contactEmail: string;
};

// Supply qrSource only after the original image and its payee have been verified.
// Rendering instructions does not create a payment, receipt or enrolment record.
export function ManualPaymentInstructions({
  qrSource,
  payeeName,
  contactEmail,
}: ManualPaymentInstructionsProps) {
  const enquiryHref = `mailto:${contactEmail}?subject=${encodeURIComponent("Learning Lab: payment enquiry")}`;
  const referenceHref = `mailto:${contactEmail}?subject=${encodeURIComponent("Learning Lab: manual payment reference")}&body=${encodeURIComponent("Confirmed purpose:\nAmount paid:\nPayment date:\nTransaction reference:\n")}`;

  if (!qrSource) {
    return (
      <aside className="lab-callout" aria-label="Payment QR availability">
        <p className="lab-eyebrow">Manual payment</p>
        <h2>Payment QR awaiting verification</h2>
        <p>
          Contact the Lab to confirm the offer, amount and terms before making a payment. A verified
          payment QR will be shared here when it is ready.
        </p>
        <p>
          <a href={enquiryHref} className="lab-text-link">
            Email {contactEmail}
          </a>
        </p>
        <p className="lab-small">
          Free courses cost ₹0 and do not require a payment. Paid cohort availability is announced
          separately.
        </p>
        <Link href="/learning-lab/free-courses" className="lab-text-link">
          Explore the free courses →
        </Link>
      </aside>
    );
  }

  return (
    <section className="lab-card" aria-label="Manual payment instructions">
      <p className="lab-eyebrow">Manual payment by QR</p>
      <h2>Pay only for a confirmed offer</h2>
      <p>
        Use this QR only after the Lab has confirmed in writing the purpose of your payment, the
        exact amount and the applicable terms. This page does not open enrolment for a paid cohort.
      </p>
      <p>
        Expected payee: <strong>{payeeName}</strong>
      </p>
      <figure className="my-6">
        <Image
          src={qrSource}
          alt={`Original payment QR for ${payeeName}`}
          width={887}
          height={1600}
          unoptimized
          style={{ width: "100%", maxWidth: 320, height: "auto" }}
        />
        <figcaption className="lab-small mt-3">
          Check the payee name and confirmed amount in your payment app before proceeding.
        </figcaption>
      </figure>
      <div className="lab-actions">
        <a href={qrSource} target="_blank" rel="noopener noreferrer" className="lab-text-link">
          Open the original QR to scan ↗
        </a>
        <a href={qrSource} download className="lab-text-link">
          Download the original QR ↓
        </a>
      </div>
      <ol className="my-6 list-decimal space-y-3 pl-5">
        <li>Read the confirmed offer, amount and terms supplied by the Lab.</li>
        <li>Scan the original QR and check the payee name and amount in your payment app.</li>
        <li>
          After payment, email only the confirmed purpose, amount, payment date and transaction
          reference. Do not include PINs, OTPs, account details or screenshots.
        </li>
      </ol>
      <p>
        <a href={referenceHref} className="lab-text-link">
          Email a transaction reference to {contactEmail} →
        </a>
      </p>
      <p className="lab-small">
        This opens your email app. The Lab will check the actual receipt manually and confirm the
        next steps separately. An email or payment alone does not confirm enrolment, access or a
        certificate.
      </p>
      <p className="lab-small">
        Free courses remain ₹0. No payment is needed to read them or use their exercises.
      </p>
      <Link href="/learning-lab/free-courses" className="lab-text-link">
        Explore the free courses →
      </Link>
    </section>
  );
}
