import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { labPolicies } from "@/features/learning-lab/policies";

export const metadata: Metadata = {
  title: "Privacy and Participation Policies",
  description:
    "Everything the Learning Lab offers is free. Read the current terms, privacy notice and refund note, and the draft participation, recording and certificate policies for future programmes.",
  alternates: { canonical: "/learning-lab/policies" },
};

export default function PoliciesPage() {
  return (
    <>
      <LabHero
        eyebrow="Current terms and privacy · draft programme policies"
        title="Clear expectations before participation."
        description="Everything the Lab offers is free. The terms, privacy notice and refund note apply today; the participation, recording and certificate policies are drafts for future programmes."
      />
      <LabSection>
        <div className="lab-callout">
          <h3>The current position</h3>
          <p>
            Everything is free and the website has no checkout. Voluntary contributions are welcome
            and never required. Registering interest does not reserve a place.
          </p>
          <p>
            Draft programme policies will be finalised before a programme opens. They are not a
            declaration of legal compliance.
          </p>
        </div>
        <div className="lab-grid" style={{ marginTop: "2rem" }}>
          {labPolicies.map((policy) => (
            <article className="lab-card" key={policy.slug}>
              <span className="lab-tag">
                {policy.status === "current" ? "Current" : "Draft · future programmes"}
              </span>
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
