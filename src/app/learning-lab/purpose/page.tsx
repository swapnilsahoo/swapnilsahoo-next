import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { educationPathways, labMission } from "@/features/learning-lab/mission";

const description =
  "Free learning across school, engineering, management, research and entrepreneurship: explore what is available today and what is planned. Entity names and the group structure remain proposed.";
export const metadata: Metadata = {
  title: "Our Purpose and Learning Pathways",
  description,
  alternates: { canonical: "/learning-lab/purpose" },
  openGraph: { title: labMission.purpose, description, url: "/learning-lab/purpose", images: [] },
  twitter: { card: "summary", title: labMission.purpose, description, images: [] },
};

export default function PurposePage() {
  return (
    <>
      <LabHero
        eyebrow="Our purpose"
        title={labMission.purpose}
        description="Swapnil Sahoo Learning Lab is a not-for-profit education initiative founded by Dr. Swapnil Sahoo. School-to-doctoral learning is our long-term ambition. Our immediate focus is a free 14-day customer experiment for first-time student entrepreneurs."
      >
        <Link href="/learning-lab/venture-experiment" className="lab-button">
          Start the free 14-day venture experiment →
        </Link>
        <Link href="/learning-lab/catalogue" className="lab-text-link">
          Explore other open resources →
        </Link>
      </LabHero>
      <LabSection title="Understand. Apply. Question. Act.">
        <p className="lab-lead">
          We want learners to understand ideas, apply them, question assumptions and develop the
          confidence to act.
        </p>
        <div className="lab-grid lab-grid-two">
          <article>
            <h3>Build responsible enterprises</h3>
            <p>
              Entrepreneurship is a central aspiration: recognise opportunities, work resourcefully,
              test ideas and build responsibly.
            </p>
          </article>
          <article>
            <h3>Contribute within organisations</h3>
            <p>
              Employment is equally valuable. Strengthen your capabilities, prepare for professional
              roles and contribute meaningfully within existing organisations.
            </p>
          </article>
        </div>
        <p>
          Our commitment is to provide learning resources free of charge and progressively build
          clear, accessible pathways through them.
        </p>
      </LabSection>
      <LabSection
        className="lab-band"
        eyebrow="The full learning journey"
        title="Four pathways. Clear availability."
      >
        <div className="lab-grid lab-grid-two">
          {educationPathways.map((path) => (
            <article className="lab-card" id={path.id} key={path.id}>
              <p className="lab-eyebrow">{path.status}</p>
              <h3>{path.title}</h3>
              <p>{path.scope}</p>
              <p className="lab-small">
                <strong>Today:</strong> {path.today}
              </p>
              {path.status !== "Planned" && (
                <Link className="lab-text-link" href={path.href}>
                  {path.action} →
                </Link>
              )}
            </article>
          ))}
        </div>
        <p className="lab-small">
          Degree levels describe the learning ambition, not an award or accreditation. Existing
          resources do not confer school qualifications, a B.Tech, an MBA or a doctorate. Current
          interactive courses, enquiries and the volunteer pilot are for adults aged 18 and over.
        </p>
        <Link
          href="/learning-lab/paths/entrepreneurship-under-constraint"
          className="lab-text-link"
        >
          Try practical entrepreneurship learning →
        </Link>
      </LabSection>
      <LabSection
        eyebrow="Proposed institutional structure"
        title="Names selected. Incorporation and structure unconfirmed."
      >
        <div className="lab-grid">
          <article className="lab-card">
            <p className="lab-eyebrow">Current public learning platform</p>
            <h3>Swapnil Sahoo Learning Lab</h3>
            <p>
              Independently operated by Dr. Swapnil Sahoo as a not-for-profit education initiative.
            </p>
          </article>
          <article className="lab-card">
            <p className="lab-eyebrow">Proposed not-for-profit entity</p>
            <h3>{labMission.proposedFoundation}</h3>
            <p>
              The proposed institutional home for the Learning Lab, subject to incorporation and
              confirmation.
            </p>
          </article>
          <article className="lab-card">
            <p className="lab-eyebrow">Proposed holding company</p>
            <h3>{labMission.proposedCompany}</h3>
            <p>
              The foundation is envisaged within this wider proposed group. The holding arrangement
              and legal structure remain unconfirmed.
            </p>
          </article>
        </div>
        <p>
          The proposed names and arrangement do not change the Lab’s current operator or establish
          an incorporated foundation, company, subsidiary relationship or approved governance
          structure.
        </p>
        <p className="lab-lead">
          <strong>{labMission.promise}</strong>
        </p>
      </LabSection>
    </>
  );
}
