import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { labPolicies } from "@/features/learning-lab/policies";

export const metadata: Metadata = {
  title: "Privacy and Participation Policies",
  description:
    "Current enquiry privacy information and draft Learning Lab participation, cancellation, recording and certificate terms for future programmes.",
  alternates: { canonical: "/learning-lab/policies" },
};

export default function PoliciesPage() {
  return (
    <>
      <LabHero
        eyebrow="Current privacy information · draft programme terms"
        title="Clear expectations before participation."
        description="The privacy notice describes current website and enquiry handling. Programme terms remain working drafts that need review and actual offer details before paid enrolment opens."
      />
      <LabSection>
        <div className="lab-callout">
          <h3>The current position</h3>
          <p>
            Programmes remain proposed and paid course checkout is disabled. Free courses stay
            free; optional donations are separate. Registration of interest does not create a
            paid contract or place reservation.
          </p>
          <p>
            Drafts must be approved for the final offer; they are not a declaration of legal
            compliance.
          </p>
        </div>
        <div className="lab-grid" style={{ marginTop: "2rem" }}>
          {labPolicies.map((policy) => (
            <article className="lab-card" key={policy.slug}>
              <span className="lab-tag">{policy.slug === "privacy" ? "Current enquiry handling" : "Draft · review required"}</span>
              <h3>{policy.title}</h3>
              <p>{policy.summary}</p>
              <Link href={`/learning-lab/policies/${policy.slug}`} className="lab-text-link">
                {policy.slug === "privacy" ? "Read the privacy notice →" : "Read the draft →"}
              </Link>
            </article>
          ))}
        </div>
      </LabSection>
    </>
  );
}
