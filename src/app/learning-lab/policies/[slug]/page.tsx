import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { labPolicies } from "@/features/learning-lab/policies";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = labPolicies.find((p) => p.slug === slug);
  return policy
    ? {
        title: `${policy.title} — Draft`,
        description: policy.summary,
        alternates: { canonical: `/learning-lab/policies/${slug}` },
      }
    : { title: "Policy not found" };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = labPolicies.find((p) => p.slug === slug);
  if (!policy) notFound();
  return (
    <>
      <LabHero
        eyebrow="Draft policy · Professional review required"
        title={policy.title}
        description={policy.summary}
      />
      <LabSection>
        <div className="lab-prose">
          <aside className="lab-callout">
            <h3>A working draft, not a compliance declaration.</h3>
            <p>
              This document needs professional review, confirmed operator details and approval for
              the final service. Programmes remain proposed and payments are disabled.
            </p>
          </aside>
          {policy.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}
          <div className="lab-divider" />
          <Link href="/learning-lab/policies" className="lab-text-link">
            ← All draft policies
          </Link>
          <br />
          <Link href="/learning-lab/contact" className="lab-text-link">
            Contact and enquiries →
          </Link>
        </div>
      </LabSection>
    </>
  );
}
