import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { labPublicConfig, labSupportLine } from "@/features/learning-lab/config";
import { educationPathways, labMission } from "@/features/learning-lab/mission";

const description =
  "Free learning across school, engineering, management, research and entrepreneurship: explore what is available today and what is planned. Everything is free.";
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
        description="Swapnil Sahoo Learning Lab makes learning free for everyone. It was founded by Dr. Swapnil Sahoo. School-to-doctoral learning is our long-term ambition. Our immediate focus is a free 14-day customer experiment for first-time student entrepreneurs."
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
        <Link href="/learning-lab/entrepreneurship" className="lab-text-link">
          Follow the free seven-module entrepreneurship journey →
        </Link>
      </LabSection>
      <LabSection
        id="who-runs-the-lab"
        eyebrow="Who runs the Lab"
        title="An incorporated company. Free for every learner."
      >
        <div className="lab-grid">
          <article className="lab-card">
            <p className="lab-eyebrow">The learning platform</p>
            <h3>{labPublicConfig.name}</h3>
            <p>
              Free courses, the 14-day venture experiment, the founder toolkit and open resources at
              swapnilsahoo.com/learning-lab.
            </p>
          </article>
          <article className="lab-card">
            <p className="lab-eyebrow">The company</p>
            <h3>{labPublicConfig.legalName}</h3>
            <p>Runs the Lab. Founded by Dr. Swapnil Sahoo.</p>
          </article>
          <article className="lab-card">
            <p className="lab-eyebrow">How it is sustained</p>
            <h3>Voluntary support</h3>
            <p>Everything is free. {labSupportLine}</p>
            <Link href="/learning-lab/support" className="lab-text-link">
              Support the Lab →
            </Link>
          </article>
        </div>
        <p className="lab-lead">
          <strong>{labMission.promise}</strong>
        </p>
      </LabSection>
    </>
  );
}
