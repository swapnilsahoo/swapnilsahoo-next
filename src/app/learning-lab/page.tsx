import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { getPublicProgrammes } from "@/features/learning-lab/store";
import { labPublicConfig } from "@/features/learning-lab/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: labPublicConfig.name },
  alternates: { canonical: "/learning-lab" },
  description:
    "A founder-led professional education initiative hosted on swapnilsahoo.com. Practise applied AI, strategy and entrepreneurship through decisions, exercises and feedback.",
};

export default async function LearningLabPage() {
  const programmes = await getPublicProgrammes();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: labPublicConfig.name,
            description:
              "A founder-led professional education initiative hosted on swapnilsahoo.com.",
            url: "https://www.swapnilsahoo.com/learning-lab",
            hasPart: programmes.map((programme) => ({
              "@type": "WebPage",
              name: programme.title,
              url: `https://www.swapnilsahoo.com/learning-lab/programmes/${programme.slug}`,
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
      <LabHero
        eyebrow="Think clearly. Practise deliberately."
        title={labPublicConfig.name}
        description={`${labPublicConfig.description} Practise applied AI, strategy and entrepreneurship through proposed programmes for adult management students and early-career professionals.`}
      >
        <Link href="/learning-lab/programmes" className="lab-button">
          Explore the programmes <span aria-hidden="true">→</span>
        </Link>
        <Link href="/learning-lab/for-colleges" className="lab-button lab-button-secondary">
          Discuss a college pilot
        </Link>
      </LabHero>
      <LabSection eyebrow="The first offer" title="Three ways to put judgement to work.">
        <p className="lab-lead">
          Explore an original demonstration lesson before registering interest. Each proposed
          programme is built around something you can explain, test and improve.
        </p>
        <div className="lab-grid">
          {programmes.map((p, i) => (
            <article className="lab-card" key={p.slug}>
              <span className="lab-card-number">0{i + 1} / Programme</span>
              <span className="lab-tag">
                {p.availability.status === "closed" ? "Interest closed" : "Register interest"}
              </span>
              <h3>{p.title}</h3>
              <p>{p.tagline}</p>
              <p className="lab-small">{p.duration}</p>
              <Link className="lab-text-link" href={`/learning-lab/programmes/${p.slug}`}>
                Explore + try a lesson <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
        <p className="lab-small" style={{ marginTop: "1.4rem" }}>
          Programmes are in preparation. Fees, dates and places are unconfirmed; payments are
          disabled.
        </p>
      </LabSection>
      <LabSection
        className="lab-band"
        eyebrow="How learning works"
        title="A decision. A first attempt. A better second attempt."
      >
        <div className="lab-grid">
          <article>
            <p className="lab-card-number">01 / Frame</p>
            <h3>Understand the problem</h3>
            <p className="lab-muted">
              Separate the decision from the noise. State what you know, what you assume and what
              evidence would change your mind.
            </p>
          </article>
          <article>
            <p className="lab-card-number">02 / Make</p>
            <h3>Produce useful work</h3>
            <p className="lab-muted">
              Build a decision memo, an AI workflow or a small venture experiment. Use original
              scenarios with explicit constraints.
            </p>
          </article>
          <article>
            <p className="lab-card-number">03 / Review</p>
            <h3>Defend and revise</h3>
            <p className="lab-muted">
              Test your reasoning against a rubric. Human feedback and a revised capstone support
              assessment; tool usage alone does not demonstrate learning.
            </p>
          </article>
        </div>
      </LabSection>
      <LabSection>
        <div className="lab-split">
          <div>
            <p className="lab-eyebrow">Choose your route</p>
            <h2>Build your practice, or bring a pilot to your institution.</h2>
            <p className="lab-muted">
              The initial focus is adults in management education and the early years of
              professional work. Institutions can explore a small, scoped pilot with measurable
              learning goals.
            </p>
          </div>
          <div className="lab-grid lab-grid-two">
            <article className="lab-card">
              <h3>For professionals</h3>
              <p>
                Compare the proposed programmes, try an exercise and tell us the decision skills you
                want to strengthen.
              </p>
              <Link href="/learning-lab/for-professionals" className="lab-text-link">
                Find your starting point →
              </Link>
            </article>
            <article className="lab-card">
              <h3>For colleges</h3>
              <p>
                Discuss audience, timetable, assessment and responsibilities before agreeing to a
                pilot.
              </p>
              <Link href="/learning-lab/for-colleges" className="lab-text-link">
                Shape a pilot →
              </Link>
            </article>
          </div>
        </div>
      </LabSection>
      <LabSection className="lab-band">
        <div className="lab-split">
          <div>
            <p className="lab-eyebrow">The founder</p>
            <h2>Founded by Dr. Swapnil Sahoo.</h2>
            <p className="lab-muted">
              The Lab grows from a founder’s interest in strategy, entrepreneurship, applied AI and
              managerial judgement. Read about his background and the distinction between his prior
              work and this new initiative.
            </p>
            <Link href="/learning-lab/founder" className="lab-text-link">
              Meet the founder →
            </Link>
          </div>
          <aside className="lab-callout">
            <h3>A new initiative, clearly described.</h3>
            <p>
              No Lab cohorts or outcomes are claimed here. Proposed formats and certificate criteria
              are available for review; participation will depend on approved programme details.
            </p>
            <Link href="/learning-lab/faq" className="lab-text-link">
              Read the practical FAQs →
            </Link>
          </aside>
        </div>
      </LabSection>
    </>
  );
}
