import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { labPublicConfig, labSupportLine } from "@/features/learning-lab/config";
import { educationPathways, labMission, labPurpose } from "@/features/learning-lab/mission";
import { labServicesPath } from "@/features/learning-lab/services";

const description =
  "Why Swapnil Sahoo Learning Lab Private Limited exists: to make learning freely accessible to everyone and to help people act on it. Our mission, vision, values and learning pathways.";
export const metadata: Metadata = {
  title: "Our Purpose, Mission and Vision",
  description,
  alternates: { canonical: "/learning-lab/purpose" },
  openGraph: {
    title: labPurpose.headline,
    description,
    url: "/learning-lab/purpose",
    images: [],
  },
  twitter: { card: "summary", title: labPurpose.headline, description, images: [] },
};

export default function PurposePage() {
  return (
    <>
      <LabHero
        eyebrow={`Our purpose · ${labPublicConfig.legalName}`}
        title={labPurpose.headline}
        description={labPurpose.statement}
      >
        <Link href={labServicesPath} className="lab-button">
          See what we offer →
        </Link>
        <Link href="/learning-lab/venture-experiment" className="lab-text-link">
          Start the free 14-day venture experiment →
        </Link>
      </LabHero>
      <LabSection id="purpose" title="Purpose, mission and vision.">
        <p className="lab-lead">{labPurpose.why}</p>
        <div className="lab-grid">
          {labPurpose.pillars.map((pillar) => (
            <article className="lab-card" key={pillar.label}>
              <p className="lab-eyebrow">{pillar.label}</p>
              <h3>{pillar.question}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </LabSection>
      <LabSection className="lab-band" title="Understand. Apply. Question. Act.">
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
      <LabSection id="values" eyebrow="Our values" title="How we work.">
        <div className="lab-grid">
          {labPurpose.values.map((value) => (
            <article key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
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
            <Link href={labServicesPath} className="lab-text-link">
              See our services →
            </Link>
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
