import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { EnquiryForm } from "@/features/learning-lab/components/EnquiryForm";
import { labPublicConfig } from "@/features/learning-lab/config";
import { getPublicProgrammes } from "@/features/learning-lab/store";
import { isLabServiceConfigured } from "@/features/learning-lab/server/capabilities";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact and Register Interest",
  description:
    "Register interest in a proposed Learning Lab programme or discuss an institutional pilot. No payment, enrolment or place reservation is created.",
  alternates: { canonical: "/learning-lab/contact" },
};

export default async function ContactPage() {
  const programmes = (await getPublicProgrammes()).filter(
    (p) => p.availability.status !== "closed"
  );
  return (
    <>
      <LabHero
        eyebrow="Start a conversation"
        title="Tell us what you want to learn."
        description="Register interest in a proposed programme. Colleges and learning teams can use the institutional pilot enquiry. No payment is collected and no place is reserved."
      />
      <LabSection>
        <div className="lab-split">
          <div>
            <p className="lab-eyebrow">Learner interest</p>
            <h2>A focused enquiry is enough.</h2>
            <p className="lab-muted">
              Your name, email address and programme choice help the Lab understand your interest. A
              message and permission for marketing updates are optional.
            </p>
            <p className="lab-small">
              Do not include student records, sensitive personal information or confidential
              employer data.
            </p>
            {labPublicConfig.businessEmail ? (
              <p>
                <a href={`mailto:${labPublicConfig.businessEmail}`} className="lab-text-link">
                  {labPublicConfig.businessEmail}
                </a>
              </p>
            ) : (
              <p className="lab-small">
                A dedicated business email and operator address are being finalised before enquiries open.
                Employer contact channels are not used for the Lab.
              </p>
            )}
            <Link href="/learning-lab/for-colleges#pilot-enquiry" className="lab-text-link">
              Representing an institution? Use the pilot enquiry →
            </Link>
            <div className="lab-divider" />
            <p className="lab-small">
              Operator: {labPublicConfig.operatorName}. The initiative is founder-led and is not
              presented as an incorporated company.
            </p>
            {labPublicConfig.businessAddress && (
              <p className="lab-small">{labPublicConfig.businessAddress}</p>
            )}
          </div>
          <EnquiryForm programmes={programmes} available={isLabServiceConfigured()} />
        </div>
      </LabSection>
    </>
  );
}
