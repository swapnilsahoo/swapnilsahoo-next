import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { labPublicConfig, labSupportLimits } from "@/features/learning-lab/config";
import { getCheckoutAvailability } from "@/features/payments/server";

export const metadata: Metadata = {
  title: "Support the Learning Lab",
  description:
    "Everything the Learning Lab offers is free. Voluntary financial assistance and support for its infrastructure and services are welcome and appreciated.",
  alternates: { canonical: "/learning-lab/support" },
};

const supportEmail = `mailto:${labPublicConfig.businessEmail}?subject=${encodeURIComponent("Learning Lab: voluntary support")}`;
const donationQr = "/images/learning-lab/phonepe-donation-qr.jpg";

export default function SupportLabPage() {
  const online = getCheckoutAvailability();
  return (
    <>
      <LabHero
        eyebrow="Support the Learning Lab"
        title="Help keep useful learning free."
        description="Everything the Learning Lab offers is free. Voluntary financial assistance and support for our infrastructure and services are welcome and appreciated."
      >
        <a href="#donate" className="lab-button">
          Make a voluntary contribution <span aria-hidden="true">→</span>
        </a>
        <a href={supportEmail} className="lab-button lab-button-secondary">
          Offer your support <span aria-hidden="true">→</span>
        </a>
      </LabHero>
      <LabSection
        id="donate"
        eyebrow="Voluntary contributions"
        title="Support the Lab with any amount."
      >
        <div className="lab-split">
          <div className="lab-prose">
            <p>
              Your contribution helps pay for the Lab’s infrastructure and services: hosting, tools,
              learning content and feedback for students. Choose any amount; there is no minimum.
            </p>
            <p>
              Scan this original PhonePe QR. The name printed on the image is{" "}
              <strong>SWAPNIL SAHOO</strong>. Check the recipient shown in your payment app before
              confirming your transfer.
            </p>
            <a href={donationQr} download="Swapnil-Sahoo-PhonePe-QR.jpg" className="lab-button">
              Download the original QR
            </a>
            <p className="lab-small">
              The full image is provided unchanged. Payments happen in your payment app; this
              website does not verify a transfer or issue an automatic receipt.
            </p>
            {online.available && !online.testMode && (
              <p>
                <Link href="/learning-lab/checkout" className="lab-button lab-button-secondary">
                  Or contribute online by UPI, card or netbanking →
                </Link>
              </p>
            )}
            {online.available && !online.testMode && (
              <p className="lab-small">
                Online contributions also go to Dr. Swapnil Sahoo’s own account for now.
              </p>
            )}
            <p>
              For a question about your contribution, email{" "}
              <a href={supportEmail}>{labPublicConfig.businessEmail}</a>. Include only the date,
              amount and transaction reference needed to identify the transfer.
            </p>
            <p>
              <Link href="/learning-lab/free-courses">
                Everything stays free: see the free courses →
              </Link>
            </p>
          </div>
          <figure className="lab-donation-qr">
            <Image
              src={donationQr}
              alt="Original PhonePe payment QR for Swapnil Sahoo"
              width={887}
              height={1600}
              unoptimized
            />
            <figcaption className="lab-small">
              Voluntary support for Learning Lab infrastructure and services.
            </figcaption>
          </figure>
        </div>
      </LabSection>
      <LabSection
        className="lab-band"
        eyebrow="Where your help can make a difference"
        title="Better infrastructure. Better learning."
      >
        <div className="lab-grid">
          <article className="lab-card">
            <p className="lab-card-number">01 / Infrastructure</p>
            <h3>Keep the learning experience dependable</h3>
            <p className="lab-muted">
              Help with website hosting, maintenance, performance and accessibility so the resources
              are easier to reach and use.
            </p>
          </article>
          <article className="lab-card">
            <p className="lab-card-number">02 / Services</p>
            <h3>Keep feedback and materials free</h3>
            <p className="lab-muted">
              Support founder feedback for students, college workshops, original lessons and
              worksheets. Offer content review, editing or resources you have permission to share.
            </p>
          </article>
          <article className="lab-card">
            <p className="lab-card-number">03 / Expertise</p>
            <h3>Contribute your time and skills</h3>
            <p className="lab-muted">
              Suggest an improvement, review an exercise or offer technical and accessibility help.
              A useful contribution does not have to be financial.
            </p>
          </article>
        </div>
      </LabSection>
      <LabSection eyebrow="A personal invitation" title="Every offer of help is appreciated.">
        <div className="lab-split">
          <div className="lab-prose">
            <p>
              “Everything the Learning Lab offers is free. Voluntary financial assistance and
              support for our infrastructure and services are welcome and deeply appreciated.”
            </p>
            <p className="lab-small">— Dr. Swapnil Sahoo</p>
            <p>
              Email to discuss how you would like to help. You can describe a skill, suggest a
              resource or ask about making a voluntary financial contribution.
            </p>
            <a href={supportEmail} className="lab-text-link">
              {labPublicConfig.businessEmail}
            </a>
            <p className="lab-small">
              This opens your email app. Review and send the message yourself; nothing is submitted
              by clicking the link.
            </p>
          </div>
          <aside className="lab-callout">
            <h3>Entirely voluntary.</h3>
            <p>{labSupportLimits}</p>
            <p>
              Use the original PhonePe QR above to contribute, or email Swapnil to offer your time
              and expertise.
            </p>
            <p className="lab-small">
              {labPublicConfig.legalName} runs the Lab. If you sent a contribution by mistake, email
              the date, amount and transaction reference and it will be returned.
            </p>
          </aside>
        </div>
      </LabSection>
    </>
  );
}
