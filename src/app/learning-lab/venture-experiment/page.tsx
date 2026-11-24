import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { VentureExperimentWorkspace } from "@/features/learning-lab/components/VentureExperimentWorkspace";
import { VentureProgressTracker } from "@/features/learning-lab/components/VentureProgressTracker";
import { ToolkitShare, VentureQuestion } from "@/features/learning-lab/components/ToolkitParts";
import { isLabServiceConfigured } from "@/features/learning-lab/server/capabilities";
import {
  nextStepLadder,
  toolkitHref,
  toolkitPath,
  toolkitTool,
  ventureDayHelp,
  type ToolkitSlug,
} from "@/features/learning-lab/founder-toolkit";
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

const stageTools: Record<(typeof ventureStages)[number]["id"], ToolkitSlug> = {
  constraints: "idea-filter",
  investigate: "talk-to-customers",
  test: "test-playbooks",
  decide: "ai-practice-prompts",
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
          Get your next task →
        </a>
        <a href="#plan" className="lab-button lab-button-secondary">
          Read the 14-day plan
        </a>
      </LabHero>
      <VentureQuestion />
      <LabSection eyebrow="The goal" title="One real test. One clear decision.">
        <p className="lab-lead">
          Use your own idea, a budget you can afford and customers you can actually reach. Continue,
          change and stop are all valid outcomes.
        </p>
        <div className="lab-grid lab-grid-two">
          {ventureStages.map((stage) => (
            <article className="lab-card" key={stage.id}>
              <p className="lab-eyebrow">{stage.days}</p>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
              <p>
                <strong>You leave with:</strong> {stage.output}.
              </p>
              <Link className="lab-text-link" href={toolkitHref(stageTools[stage.id])}>
                Free tool: {toolkitTool(stageTools[stage.id]).title} →
              </Link>
            </article>
          ))}
        </div>
        <p className="lab-small">
          Every stage has a free, copy-ready tool in the{" "}
          <Link className="lab-text-link" href={toolkitPath}>
            founder toolkit
          </Link>
          . Start any day. Plan on about 30 minutes a day, plus customer conversations and one small
          test. ₹0 is a valid budget. No payment, company, grades or certificate needed.
        </p>
      </LabSection>
      <LabSection id="start" className="lab-band" eyebrow="Start here" title="Get your next task.">
        <p>
          The planner and downloads are free, with no sign-up. For founder feedback, register for
          one of up to 20 active pilot places. Registration creates a private workspace. It sends no
          email and adds you to no mailing list.
        </p>
        <VentureExperimentWorkspace available={isLabServiceConfigured()} />
      </LabSection>
      <LabSection id="plan" eyebrow="Day by day" title="The 14-day plan.">
        <p>
          About 30 minutes a day. Each day has a short “do this today” list, one thing to watch out
          for and the tool to use. Keep your Day 1 page unchanged so you can compare it with your
          final decision. If a step takes longer, take longer; a test you did not run is not
          complete.
        </p>
        <VentureProgressTracker />
        {ventureStages.map((stage) => (
          <section key={stage.id} style={{ marginTop: "2.4rem" }}>
            <h3>
              {stage.days}: {stage.title}
            </h3>
            <ol className="lab-days">
              {ventureDays
                .filter((day) => day.stage === stage.id)
                .map((day) => {
                  const help = ventureDayHelp[day.day];
                  return (
                    <li className="lab-day" key={day.day} id={`venture-day-${day.day}`}>
                      <span className="lab-day-label">Day {day.day}</span>
                      <h4>{day.title}</h4>
                      <p className="lab-small" style={{ marginBottom: "0.4rem" }}>
                        <strong>Do this today</strong>
                      </p>
                      <ul className="lab-today">
                        {help.doToday.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <p className="lab-watch">
                        <strong>Watch out.</strong> {help.watchOut}
                      </p>
                      {help.tool && (
                        <Link className="lab-text-link" href={help.tool.href}>
                          Use: {help.tool.label} →
                        </Link>
                      )}
                      <details>
                        <summary>Full guidance for Day {day.day}</summary>
                        <p>{day.task}</p>
                        <p className="lab-small">
                          <strong>Keep:</strong> {day.output}.
                        </p>
                      </details>
                    </li>
                  );
                })}
            </ol>
          </section>
        ))}
        <div className="lab-actions">
          <ToolkitShare
            text="Free 14-day plan to test your business idea with real customers:"
            path={ventureExperimentPath}
          />
        </div>
      </LabSection>
      <LabSection className="lab-band" eyebrow="Worked example" title={ventureExample.title}>
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
      <LabSection id="evidence" eyebrow="What counts" title="A real test, not a positive opinion.">
        <p className="lab-lead">{ventureEvaluation.completion}</p>
        <p>
          Your Day 1 plan and Day 14 packet are scored on the same four criteria, 0–2 each, out of
          8. A person explains the scores; the planner never grades you. Write your Day 1 plan
          before reading the guide, so it shows your real starting point.
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
        <p className="lab-small">
          This is a new pilot. No completion rates, learning gains or comparisons are claimed yet.
        </p>
      </LabSection>
      <LabSection
        className="lab-band"
        eyebrow="Founder feedback"
        title="Submit, read the review, revise."
      >
        <ul className="lab-prose">
          <li>
            <strong>Reviews:</strong> Dr. Swapnil Sahoo reviews pilot work at each of the four
            stages. Return with your private access code to read the written review. There is no
            fixed turnaround, so keep working through the guide meanwhile.
          </li>
          <li>
            <strong>Access code:</strong> shown once, when you register. Save the download. It is
            not emailed, cannot be recovered by email and expires after 90 days.
          </li>
          <li>
            <strong>Your control:</strong> withdraw at any time to delete your work and free your
            place. Your work is never published or used in research without separate permission.
          </li>
          <li>
            <strong>Keep it anonymous:</strong> &ldquo;Customer A declined&rdquo; is enough. No
            names, phone numbers, messages, recordings or confidential information. See the{" "}
            <Link className="lab-text-link" href="/learning-lab/policies/privacy">
              privacy notice
            </Link>
            .
          </li>
        </ul>
      </LabSection>
      <LabSection id="next" eyebrow="After Day 14" title="Where to go next, whatever you decide.">
        <div className="lab-grid">
          {nextStepLadder.map((step) => (
            <article className="lab-card" key={step.decision}>
              <p className="lab-card-number">{step.decision}</p>
              <p style={{ color: "var(--lab-ink)" }}>{step.advice}</p>
              {step.links.length > 0 && (
                <ul>
                  {step.links.map((link) => (
                    <li key={link.url}>
                      <a
                        className="lab-text-link"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label} ↗<span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      <span className="lab-small"> {link.note}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
        <p className="lab-small" style={{ marginTop: "1.2rem" }}>
          Independent resources. No partnership is implied.
        </p>
        <div className="lab-actions">
          <Link className="lab-text-link" href={toolkitHref("test-playbooks", "experiment-record")}>
            Make your one-page experiment record →
          </Link>
          <Link className="lab-text-link" href={toolkitHref("learn-from-yc")}>
            Learn from Y Combinator, free →
          </Link>
          <Link
            href="/learning-lab/free-courses/ask-better-customer-questions"
            className="lab-text-link"
          >
            Practise a neutral customer question →
          </Link>
        </div>
      </LabSection>
    </>
  );
}
