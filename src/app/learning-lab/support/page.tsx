import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { labPublicConfig } from "@/features/learning-lab/config";

export const metadata: Metadata = {
  title: "Support the Learning Lab",
  description:
    "Help improve Learning Lab infrastructure and content through voluntary assistance, expertise or donations. The Lab currently operates on a not-for-profit basis.",
  alternates: { canonical: "/learning-lab/support" },
};

const supportEmail = `mailto:${labPublicConfig.businessEmail}?subject=${encodeURIComponent("Learning Lab: voluntary support")}`;
const donationQr = "/images/learning-lab/phonepe-donation-qr.jpg";

export default function SupportLabPage() {
  return (
    <>
      <LabHero
        eyebrow="Support the Learning Lab"
        title="Help make useful learning accessible."
        description="The Learning Lab is a founder-led edtech initiative, currently run on a not-for-profit basis. Voluntary assistance and donations can help improve its infrastructure and learning content."
      >
        <a href="#donate" className="lab-button">
          Make a voluntary donation <span aria-hidden="true">→</span>
        </a>
        <a href={supportEmail} className="lab-button lab-button-secondary">
          Offer your support <span aria-hidden="true">→</span>
        </a>
      </LabHero>
      <LabSection id="donate" eyebrow="Voluntary donations" title="Support the Lab with any amount.">
        <div className="lab-split">
          <div className="lab-prose">
            <p>
              Your contribution can help improve the Lab’s infrastructure and learning content.
              Choose an amount that feels right to you; there is no minimum donation.
            </p>
            <p>
              Scan this original PhonePe QR. The name printed on the image is{" "}
              <strong>SWAPNIL SAHOO</strong>. Check the recipient shown in your payment app
              before confirming your transfer.
            </p>
            <a href={donationQr} download="Swapnil-Sahoo-PhonePe-QR.jpg" className="lab-button">
              Download the original QR
            </a>
            <p className="lab-small">
              The full image is provided unchanged. Payments happen in your payment app; this
              website does not verify a transfer or issue an automatic receipt.
            </p>
            <p>
              For a question about your contribution, email{" "}
              <a href={supportEmail}>{labPublicConfig.businessEmail}</a>. Include only the date,
              amount and transaction reference needed to identify the transfer.
            </p>
            <p>
              <Link href="/learning-lab/free-courses">All six free courses remain free →</Link>
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
              Voluntary support for Learning Lab infrastructure and content.
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
            <p className="lab-card-number">02 / Content</p>
            <h3>Develop useful learning materials</h3>
            <p className="lab-muted">
              Support original lessons, practical exercises and worksheets. Offer content review,
              editing or resources you have permission to share.
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
              “At this stage, I am building the Learning Lab as a not-for-profit edtech initiative.
              I would be grateful for voluntary assistance or donations that help improve the
              infrastructure and content.”
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
            <p>
              No contribution is required to use the six free courses. Assistance or donations do
              not purchase enrolment, assessment, a certificate or preferential treatment.
            </p>
            <p>
              Use the original PhonePe QR above to make an optional donation, or email Swapnil
              to offer your time and expertise. Donations are separate from any course fee.
            </p>
            <p className="lab-small">
              “Not-for-profit” describes the Lab’s current purpose. The Lab is independently run by
              Dr. Swapnil Sahoo and is currently unincorporated; no registered-charity status or tax
              deduction is claimed here.
            </p>
          </aside>
        </div>
      </LabSection>
    </>
  );
}
