import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";

export const metadata: Metadata = {
  title: "For Professionals",
  description:
    "Practise applied AI, case thinking and entrepreneurship through original Learning Lab exercises. Proposed programmes for adults and early-career professionals.",
  alternates: { canonical: "/learning-lab/for-professionals" },
};

const routes = [
  {
    title: "I want to use AI responsibly in managerial work.",
    text: "Practise workflow design, evidence checking, privacy choices and human review through AI for Managers.",
    slug: "ai-for-managers",
  },
  {
    title: "I want to reason more clearly through cases.",
    text: "Turn a messy scenario into a defensible decision memo in Strategy and Case Thinking Lab.",
    slug: "strategy-case-thinking",
  },
  {
    title: "I want to test an idea with limited resources.",
    text: "Define an affordable experiment, use available means and review evidence in Entrepreneurship Under Constraint Bootcamp.",
    slug: "entrepreneurship-under-constraint",
  },
];

export default function ProfessionalsPage() {
  return (
    <>
      <LabHero
        eyebrow="For adult learners and early-career professionals"
        title="Choose a skill you can demonstrate."
        description="Work on decisions you can explain and outputs you can revise. The proposed programmes combine short concepts, original exercises and a capstone with human assessment."
      >
        <Link href="/learning-lab/programmes" className="lab-button">
          Compare the programmes →
        </Link>
        <Link href="/learning-lab/contact" className="lab-button lab-button-secondary">
          Register interest
        </Link>
      </LabHero>
      <LabSection eyebrow="Find your starting point" title="What do you want to get better at?">
        <div className="lab-grid">
          {routes.map((r) => (
            <article className="lab-card" key={r.slug}>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              <Link className="lab-text-link" href={`/learning-lab/programmes/${r.slug}`}>
                Try the sample lesson →
              </Link>
            </article>
          ))}
        </div>
      </LabSection>
      <LabSection className="lab-band">
        <div className="lab-split">
          <div>
            <p className="lab-eyebrow">What to expect</p>
            <h2>Practice needs your participation.</h2>
            <ul>
              <li>Read the scenario and make an initial attempt.</li>
              <li>Explain the evidence, assumptions and trade-offs behind your answer.</li>
              <li>Use feedback to improve your work.</li>
              <li>Complete the capstone against the published rubric.</li>
            </ul>
          </div>
          <aside className="lab-callout">
            <h3>Keep the promise specific.</h3>
            <p>
              The intended outputs are practical skills and assessed work. The Lab does not
              guarantee jobs, promotions, salary increases or successful businesses.
            </p>
            <p>
              Demonstration lessons are freely accessible. Registering interest is not paid
              enrolment; delivery details remain proposed.
            </p>
            <Link href="/learning-lab/faq" className="lab-text-link">
              Read FAQs →
            </Link>
          </aside>
        </div>
      </LabSection>
    </>
  );
}
