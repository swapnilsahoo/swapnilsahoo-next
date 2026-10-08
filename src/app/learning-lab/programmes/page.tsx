import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { getPublicProgrammes } from "@/features/learning-lab/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Compare three proposed Learning Lab programmes: AI for Managers, Strategy and Case Thinking Lab, and Entrepreneurship Under Constraint Bootcamp.",
  alternates: { canonical: "/learning-lab/programmes" },
};

export default async function ProgrammesPage() {
  const programmes = await getPublicProgrammes();
  return (
    <>
      <LabHero
        eyebrow="The proposed programme catalogue"
        title="Start with the work you want to do."
        description="Three proposed programmes. Each includes an original demonstration lesson, a capstone and a published assessment rubric. Explore the curriculum before registering interest."
      />
      <LabSection>
        <div className="lab-grid">
          {programmes.map((p, i) => (
            <article className="lab-card" key={p.slug}>
              <p className="lab-card-number">0{i + 1}</p>
              <span className="lab-tag">
                {p.availability.status === "closed" ? "Interest closed" : "Register interest"}
              </span>
              <h2 style={{ fontSize: "1.9rem" }}>{p.title}</h2>
              <p>{p.tagline}</p>
              <div className="lab-divider" />
              <p>
                <strong>For</strong>
                <br />
                {p.audience.join("; ")}
              </p>
              <p>
                <strong>Proposed duration</strong>
                <br />
                {p.duration}
              </p>
              <p>
                <strong>Your capstone</strong>
                <br />
                {p.capstone}
              </p>
              <Link href={`/learning-lab/programmes/${p.slug}`} className="lab-text-link">
                Explore this programme →
              </Link>
            </article>
          ))}
        </div>
      </LabSection>
      <LabSection className="lab-band">
        <div className="lab-callout">
          <h3>Interest first. Programme approval before enrolment.</h3>
          <p>
            Proposed formats may be revised after pilot conversations. Dates, fees, places and the
            final delivery arrangement will be confirmed before any paid offer. No payment is
            collected on this site.
          </p>
          <Link href="/learning-lab/contact" className="lab-text-link">
            Ask about your learning goals →
          </Link>
        </div>
      </LabSection>
    </>
  );
}
