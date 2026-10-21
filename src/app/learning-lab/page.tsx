import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { labPublicConfig } from "@/features/learning-lab/config";
import {
  ventureExperimentPath,
  venturePositioning,
  ventureStages,
} from "@/features/learning-lab/venture-experiment";

export const metadata: Metadata = {
  title: { absolute: labPublicConfig.name },
  description: venturePositioning,
  alternates: { canonical: "/learning-lab" },
  openGraph: {
    title: "Your first customer experiment | Swapnil Sahoo Learning Lab",
    description: venturePositioning,
    url: "/learning-lab",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Your first customer experiment",
    description: venturePositioning,
    images: [],
  },
};

export default function LearningLabPage() {
  return (
    <>
      <LabHero
        eyebrow="Free 14-day venture experiment · College students aged 18+"
        title="Turn your business idea into a customer experiment."
        description={venturePositioning}
      >
        <Link href={`${ventureExperimentPath}#start`} className="lab-button">
          Start your 14-day experiment →
        </Link>
        <Link href={`${ventureExperimentPath}#plan`} className="lab-button lab-button-secondary">
          See the daily plan
        </Link>
      </LabHero>
      <LabSection
        eyebrow="One audience. One practical problem."
        title="An idea, limited money, and no clear next step."
      >
        <div className="lab-split">
          <div className="lab-prose">
            <p className="lab-lead">
              “What should I do next, what can I afford to commit, and what evidence would justify
              continuing?”
            </p>
            <p>
              Start with one reachable customer problem. Use the skills, relationships and time you
              already have to design a small test. You do not need to build an app, incorporate a
              business or buy a course.
            </p>
          </div>
          <aside className="lab-callout">
            <h3>One experiment. A better-supported decision.</h3>
            <p>
              Produce an affordable test boundary, an evidence log, results from an actual customer
              experiment, and a decision to continue, change or stop.
            </p>
            <p className="lab-small">
              A decision to stop can be a successful outcome. Fourteen days is the working plan;
              record actual time and access barriers honestly.
            </p>
          </aside>
        </div>
      </LabSection>
      <LabSection
        className="lab-band"
        eyebrow="From intention to evidence"
        title="Four stages that build on your own work."
      >
        <div className="lab-grid lab-grid-two">
          {ventureStages.map((stage) => (
            <article className="lab-card" key={stage.id}>
              <p className="lab-eyebrow">{stage.days}</p>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
              <p className="lab-small">
                <strong>Keep:</strong> {stage.output}.
              </p>
            </article>
          ))}
        </div>
      </LabSection>
      <LabSection
        eyebrow="Guidance fitted to your constraints"
        title="A small next step you can actually take."
      >
        <div className="lab-grid">
          <article>
            <h3>Your time and affordable commitment</h3>
            <p>
              Set your own ceiling, including ₹0. The next-task guide adapts to available time,
              skills and customer access. It does not spend money or contact anyone for you.
            </p>
          </article>
          <article>
            <h3>Feedback on your own work</h3>
            <p>
              The initial founder-led pilot has up to 20 active feedback places. Submit your
              boundary, questions, test and decision privately, then return to read actual human
              feedback.
            </p>
          </article>
          <article>
            <h3>Evidence before enthusiasm</h3>
            <p>
              Separate customer action from compliments, assumptions and role-play. Record refusals,
              delivery effort and costs as carefully as positive responses.
            </p>
          </article>
        </div>
        <p className="lab-small">
          The guide and worksheets are free for everyone. A feedback place is confirmed only by a
          successful registration; review timing is not guaranteed. No funding, business success or
          certificate is promised.
        </p>
        <Link href={ventureExperimentPath} className="lab-button">
          Build your first experiment →
        </Link>
      </LabSection>
      <LabSection
        className="lab-band"
        eyebrow="An approach to test"
        title="Useful work will establish the advantage."
      >
        <p className="lab-lead">
          We will assess completed experiments, evidence quality, time taken and actual mentoring
          hours. A comparison with similar learners using an existing free resource is an evaluation
          plan, not a result we have already earned.
        </p>
        <Link href={`${ventureExperimentPath}#evidence`} className="lab-text-link">
          See the completion rules and evidence rubric →
        </Link>
      </LabSection>
      <LabSection eyebrow="More open learning" title="Keep useful resources within reach.">
        <div className="lab-grid">
          <article className="lab-card">
            <h3>Short lessons and tools</h3>
            <p>
              Practise customer questions, unit economics, strategic choices and AI task briefs.
            </p>
            <Link href="/learning-lab/free-courses" className="lab-text-link">
              Explore the six free courses →
            </Link>
          </article>
          <article className="lab-card">
            <h3>Four worked examples</h3>
            <p>
              All weekly practices are open now. Use them whenever they help your next decision.
            </p>
            <Link href="/learning-lab/weekly-notes" className="lab-text-link">
              Read and practise →
            </Link>
          </article>
          <article className="lab-card">
            <h3>The wider catalogue</h3>
            <p>
              Management, career, research and entrepreneurship resources remain freely available.
            </p>
            <Link href="/learning-lab/catalogue" className="lab-text-link">
              Browse the learning catalogue →
            </Link>
          </article>
        </div>
      </LabSection>
      <LabSection
        className="lab-band"
        eyebrow="Founded by Dr. Swapnil Sahoo"
        title="A focused starting point within a wider purpose."
      >
        <div className="lab-split">
          <div>
            <p>
              The long-term ambition is freely accessible learning from school through doctoral
              study. Our immediate focus is helping first-time student entrepreneurs test one idea
              under real constraints.
            </p>
            <Link href="/learning-lab/purpose" className="lab-text-link">
              Our long-term purpose and proposed institutional structure →
            </Link>
          </div>
          <div>
            <p>
              The Lab is independently run on a not-for-profit basis. Voluntary support helps
              improve content and infrastructure; the experiment guide and feedback pilot are free.
            </p>
            <div className="lab-actions">
              <Link href="/learning-lab/founder" className="lab-text-link">
                Meet the founder →
              </Link>
              <Link href="/learning-lab/support" className="lab-text-link">
                Support free learning →
              </Link>
              <Link href="/learning-lab/for-colleges" className="lab-text-link">
                For colleges →
              </Link>
              <Link href="/learning-lab/programmes" className="lab-text-link">
                Other proposed programmes →
              </Link>
            </div>
          </div>
        </div>
      </LabSection>
    </>
  );
}
