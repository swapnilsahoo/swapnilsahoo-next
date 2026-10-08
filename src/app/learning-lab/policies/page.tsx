import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { labPolicies } from "@/features/learning-lab/policies";

export const metadata: Metadata = {
  title: "Draft Policies",
  description:
    "Draft Learning Lab terms, privacy, cancellation, participation, recording and certificate policies, subject to review before online registration or paid enrolment open.",
  alternates: { canonical: "/learning-lab/policies" },
};

export default function PoliciesPage() {
  return (
    <>
      <LabHero
        eyebrow="Drafts for professional review"
        title="Clear expectations before participation."
        description="These policies are working drafts for the proposed service. They need professional review and confirmed operator details before online registration or paid enrolment opens."
      />
      <LabSection>
        <div className="lab-callout">
          <h3>The current position</h3>
          <p>
            Programmes remain proposed. Payments are disabled. Registration of interest does not
            create a paid contract or place reservation.
          </p>
          <p>
            Drafts must be approved for the final offer; they are not a declaration of legal
            compliance.
          </p>
        </div>
        <div className="lab-grid" style={{ marginTop: "2rem" }}>
          {labPolicies.map((policy) => (
            <article className="lab-card" key={policy.slug}>
              <span className="lab-tag">Draft · review required</span>
              <h3>{policy.title}</h3>
              <p>{policy.summary}</p>
              <Link href={`/learning-lab/policies/${policy.slug}`} className="lab-text-link">
                Read the draft →
              </Link>
            </article>
          ))}
        </div>
      </LabSection>
    </>
  );
}
