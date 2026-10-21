import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { VentureExperimentWorkspace } from "@/features/learning-lab/components/VentureExperimentWorkspace";
import { isLabServiceConfigured } from "@/features/learning-lab/server/capabilities";
import {
  ventureDays,
  ventureEvidenceRubric,
  ventureEvaluation,
  ventureExample,
  ventureExperimentPath,
  venturePositioning,
  ventureStages,
} from "@/features/learning-lab/venture-experiment";

export const metadata: Metadata = {
  title: "Free 14-Day Venture Experiment for Student Entrepreneurs",
  description: venturePositioning,
  alternates: { canonical: ventureExperimentPath },
  openGraph: {
    title: "Your first customer experiment in 14 days",
    description: venturePositioning,
    url: ventureExperimentPath,
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Free 14-day venture experiment",
    description: venturePositioning,
    images: [],
  },
};

export default function VentureExperimentPage() {
  return (
    <>
      <LabHero
        eyebrow="Free · For first-time college entrepreneurs aged 18+"
        title="Your first customer experiment. Fourteen days to learn."
        description={venturePositioning}
      >
        <a href="#start" className="lab-button">
          Set your experiment boundary →
        </a>
        <a href="#plan" className="lab-button lab-button-secondary">
          Read the 14-day plan
        </a>
      </LabHero>
      <LabSection
        eyebrow="The question you are here to answer"
        title="What should I do next, and what evidence would justify continuing?"
      >
        <p className="lab-lead">
          Work on your own idea, with a commitment you can afford and a customer group you can
          actually reach. The target is one completed experiment and a defensible decision.
          Continuing, changing and stopping are all legitimate outcomes.
        </p>
        <div className="lab-grid lab-grid-two">
          {ventureStages.map((stage) => (
            <article className="lab-card" key={stage.id}>
              <p className="lab-eyebrow">{stage.days}</p>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
              <p>
                <strong>Your output:</strong> {stage.output}.
              </p>
            </article>
          ))}
        </div>
        <p className="lab-small">
          Start any day. Aim for about 30 minutes a day plus agreed customer conversations and a
          small test; your actual time depends on access and the idea. ₹0 is a valid spending limit.
          No subscription, payment, incorporation, grades or certificate are required.
        </p>
      </LabSection>
      <LabSection
        id="start"
        className="lab-band"
        eyebrow="Your idea, your constraints"
        title="Start with the next affordable step."
      >
        <p>
          The public planner and downloads are free without registration. An optional
          founder-feedback pilot has up to 20 active places. A successful registration creates a
          private workspace for your submissions and reviews; it sends no email and creates no
          general mailing-list subscription.
        </p>
        <VentureExperimentWorkspace available={isLabServiceConfigured()} />
      </LabSection>
      <LabSection
        id="plan"
        eyebrow="Read it all before you commit"
        title="The 14-day working plan."
      >
        <p>
          Keep the first plan unchanged so you can compare it with the final decision. If time,
          access or feedback takes longer, record the actual days; do not label an unrun test
          complete.
        </p>
        {ventureStages.map((stage) => (
          <section key={stage.id} style={{ marginTop: "2rem" }}>
            <h3>
              {stage.days}: {stage.title}
            </h3>
            <ol
              start={ventureDays.find((day) => day.stage === stage.id)!.day}
              className="lab-prose"
            >
              {ventureDays
                .filter((day) => day.stage === stage.id)
                .map((day) => (
                  <li
                    key={day.day}
                    id={`venture-day-${day.day}`}
                    style={{ marginBottom: "1.4rem" }}
                  >
                    <strong>
                      Day {day.day}: {day.title}
                    </strong>
                    <p>{day.task}</p>
                    <p className="lab-small">
                      <strong>Keep:</strong> {day.output}.
                    </p>
                  </li>
                ))}
            </ol>
          </section>
        ))}
      </LabSection>
      <LabSection className="lab-band" eyebrow="A worked illustration" title={ventureExample.title}>
        <p className="lab-small">{ventureExample.note}</p>
        <p className="lab-lead">{ventureExample.context}</p>
        <div className="lab-grid lab-grid-two">
          {ventureExample.stages.map((example) => (
            <article className="lab-card" key={example.stage}>
              <h3>{ventureStages.find((stage) => stage.id === example.stage)!.title}</h3>
              <p>{example.story}</p>
            </article>
          ))}
        </div>
      </LabSection>
      <LabSection
        id="evidence"
        eyebrow="What counts as useful learning"
        title="A completed test is more than a positive opinion."
      >
        <p className="lab-lead">{ventureEvaluation.completion}</p>
        <p>
          The same four criteria score the starting plan and final packet from 0–2 each, for a total
          out of 8. A human reviewer explains the scores; the next-task tool does not grade your
          work.
        </p>
        <div className="lab-grid lab-grid-two">
          {ventureEvidenceRubric.map((criterion) => (
            <article className="lab-card" key={criterion.id}>
              <h3>{criterion.criterion}</h3>
              <ul>
                {criterion.scores.map((score) => (
                  <li key={score}>{score}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p>{ventureEvaluation.baseline}</p>
        <p className="lab-small">
          Call a starting plan unaided only if it was collected before the learner saw this guide or
          received feedback. Otherwise mark it as aided and report that limitation.
        </p>
        <p>{ventureEvaluation.final}</p>
        <p className="lab-small">
          The first pilot is a learning and delivery test. There are no claimed completion rates,
          learning gains or superiority results yet. Comparable learners, consistent tasks and
          transparent missing outcomes are needed before drawing comparative conclusions.
        </p>
      </LabSection>
      <LabSection
        className="lab-band"
        eyebrow="Founder-led feedback"
        title="Review your own work, then revise it."
      >
        <p>
          Dr. Swapnil Sahoo reviews work in the initial feedback pilot. Submit at the four stage
          checkpoints and return with your private access code to read the actual written review.
          Until a review is saved, the workspace shows that it is awaiting review. No immediate
          reply or fixed turnaround is guaranteed; continue with the guide and allow time to revise.
        </p>
        <p>
          Your access code is shown only when registration succeeds. Keep its private download safe.
          It is not emailed, cannot be looked up by email, and expires 90 days after registration.
          Use the withdrawal control to delete your pilot work and release your place, or contact
          the operator for a privacy request. Publication and use in comparative research require
          separate permission.
        </p>
        <p>
          Submit anonymised observations: “Customer A declined” is enough. Do not upload names,
          phone numbers, private messages, recordings or confidential business information. The
          existing{" "}
          <Link className="lab-text-link" href="/learning-lab/policies/privacy">
            privacy notice
          </Link>{" "}
          explains storage and access.
        </p>
      </LabSection>
      <LabSection
        eyebrow="Other ways to learn"
        title="Free access alone does not establish an advantage."
      >
        <p>
          These independent resources provide useful alternatives. The Lab’s approach to test is
          guidance fitted to your constraints and feedback on your own small experiment. No
          partnership or superiority is implied.
        </p>
        <ul className="lab-prose">
          <li>
            <a className="lab-text-link" href="https://www.startupschool.org/">
              YC Startup School
            </a>
            : a free online startup course and weekly progress support.
          </li>
          <li>
            <a
              className="lab-text-link"
              href="https://www.startupindia.gov.in/santhali/content/sih/en/learning-and-development_v2.html"
            >
              Startup India Learning Program
            </a>
            : free entrepreneurship learning with English and Hindi options.
          </li>
          <li>
            <a className="lab-text-link" href="https://www.nsf.gov/funding/initiatives/i-corps">
              NSF I-Corps
            </a>
            : an established experiential customer-discovery model for research commercialisation;
            its audience and programme scope differ from this student pilot.
          </li>
        </ul>
        <p className="lab-small">
          For the Lab pilot’s comparison plan, define allocation and comparable starting constraints
          before recruitment, use the same completion rules and rubric, and record every starter and
          actual mentoring minute. The pilot service does not itself obtain research or publication
          consent.
        </p>
        <Link
          href="/learning-lab/free-courses/ask-better-customer-questions"
          className="lab-text-link"
        >
          Practise a neutral customer question first →
        </Link>
      </LabSection>
    </>
  );
}
