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
        title: policy.status === "current" ? policy.title : `${policy.title} — Draft`,
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
        eyebrow={
          policy.status === "current"
            ? "Current policy · updated 24 November 2026"
            : "Draft policy · for future programmes"
        }
        title={policy.title}
        description={policy.summary}
      />
      <LabSection>
        <div className="lab-prose">
          <aside className="lab-callout">
            <h3>
              {slug === "privacy"
                ? "How the current workflow handles information."
                : policy.status === "current"
                  ? "Everything is free."
                  : "A draft for future programmes."}
            </h3>
            <p>
              {slug === "privacy"
                ? "The contact page shows online-enquiry availability. This notice describes the implemented workflow; it does not certify legal compliance. Everything is free, and the website has no checkout."
                : policy.status === "current"
                  ? "The Lab charges no fees and the website has no checkout. Voluntary financial assistance and support for its infrastructure and services are welcome and never required."
                  : "Programmes are still being planned and will be free. This policy will be finalised before a programme opens; it is not a compliance declaration."}
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
            ← Privacy and programme policies
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
