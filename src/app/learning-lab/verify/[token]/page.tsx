import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { verifyCertificate } from "@/features/learning-lab/server/service";
import { LabUnavailable } from "@/features/learning-lab/server/database";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
export const metadata: Metadata = {
  title: "Certificate verification | Learning Lab",
  robots: { index: false, follow: false },
};
export default async function VerificationPage({ params }: { params: Promise<{ token: string }> }) {
  await connection();
  const { token } = await params;
  let record: Awaited<ReturnType<typeof verifyCertificate>>;
  try {
    record = await verifyCertificate(token);
  } catch (error) {
    if (!(error instanceof LabUnavailable)) throw error;
    return (
      <>
        <LabHero
          eyebrow="Certificate verification"
          title="Verification unavailable"
          description="The verification service is awaiting secure persistent storage. This page does not confirm a certificate."
        />
        <LabSection>
          <p>Please try again later or contact the operator with the verification link.</p>
        </LabSection>
      </>
    );
  }
  if (!record) notFound();
  return (
    <>
      <LabHero
        eyebrow={record.isDemo ? "Synthetic demonstration record" : "Public verification"}
        title="Certificate of Completion"
        description={
          record.status === "valid"
            ? "This verification record is valid."
            : "This certificate has been revoked and must not be relied upon as current."
        }
      />
      <LabSection>
        <div className="lab-callout">
          <h2>{record.programme}</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-semibold">Status</dt>
              <dd>
                {record.status === "valid" ? "Valid" : "Revoked"}
                {record.isDemo ? " · demo, not a real learner achievement" : ""}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold">Issued</dt>
              <dd>
                {new Date(record.issuedAt).toLocaleDateString("en-GB", {
                  timeZone: "Asia/Kolkata",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold">Name</dt>
              <dd>{record.displayName || "Not publicly disclosed by the learner"}</dd>
            </div>
          </dl>
          <p className="lab-small">
            This records completion of a Lab programme. It is not a degree, recognised qualification
            or claim of institutional accreditation. No email address, submission or attendance
            record is disclosed by this page.
          </p>
        </div>
      </LabSection>
    </>
  );
}
