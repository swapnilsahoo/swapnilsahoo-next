import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import {
  ToolkitFreeLine,
  ToolkitMore,
  ToolkitShare,
  VentureQuestion,
  toolkitMetadata,
} from "@/features/learning-lab/components/ToolkitParts";
import {
  beginnerMistakes,
  playFairRules,
  toolkitHref,
  toolkitPath,
  toolkitStartSteps,
  toolkitSummary,
} from "@/features/learning-lab/founder-toolkit";
import { ventureExperimentPath } from "@/features/learning-lab/venture-experiment";

export const metadata = toolkitMetadata(
  toolkitPath,
  "Free Founder Toolkit for Student Entrepreneurs",
  toolkitSummary,
  "Free founder toolkit: test your business idea this week"
);

export default function ToolkitPage() {
  return (
    <>
      <LabHero
        eyebrow="Free founder toolkit · For first-time student entrepreneurs"
        title="Stop overthinking. Start testing your idea this week."
        description={toolkitSummary}
      >
        <Link href={toolkitHref("idea-filter")} className="lab-button">
          Start with the idea filter →
        </Link>
        <Link href={`${ventureExperimentPath}#plan`} className="lab-button lab-button-secondary">
          See the 14-day plan
        </Link>
      </LabHero>
      <div className="lab-container">
        <ToolkitFreeLine />
      </div>
      <div style={{ marginTop: "2rem" }}>
        <VentureQuestion />
      </div>

      <LabSection eyebrow="Start here" title="Three steps. One week. Real answers.">
        <div className="lab-grid">
          {toolkitStartSteps.map((step) => (
            <article className="lab-card" key={step.step}>
              <p className="lab-card-number">{step.step}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <Link className="lab-text-link" href={toolkitHref(step.slug)}>
                {step.cta} →
              </Link>
            </article>
          ))}
        </div>
        <p className="lab-small" style={{ marginTop: "1.2rem" }}>
          Stuck before step one? The idea filter has eight prompts for spotting problems around you.
        </p>
      </LabSection>

      <LabSection
        className="lab-band"
        eyebrow="Watch out"
        title="Six mistakes almost every first-timer makes."
      >
        <div className="lab-grid">
          {beginnerMistakes.slice(0, 6).map((item) => (
            <article className="lab-card" key={item.id}>
              <h3>{item.mistake}</h3>
              <p>{item.why}</p>
              <p className="lab-small">
                <strong>Instead:</strong> {item.instead}
              </p>
            </article>
          ))}
        </div>
        <div className="lab-actions">
          <Link className="lab-text-link" href={toolkitHref("mistakes")}>
            See all twelve mistakes →
          </Link>
        </div>
      </LabSection>

      <LabSection eyebrow="Play fair" title="Five rules that keep your test honest and safe.">
        <div className="lab-split">
          <ol className="lab-flow">
            {playFairRules.map((rule) => (
              <li key={rule}>
                <p style={{ margin: 0 }}>{rule}</p>
              </li>
            ))}
          </ol>
          <aside className="lab-callout">
            <h3>What “done” looks like</h3>
            <p>
              One real offer made to real people, a pass mark set beforehand, a count of what people
              actually did, and a decision: continue, change or stop.
            </p>
            <p>
              <strong>Stopping is a valid result. So is zero.</strong> Both teach you something
              real.
            </p>
            <p className="lab-small">
              Nothing here promises sales, funding or a certificate.{" "}
              <ToolkitShare
                text="Free toolkit to test your business idea this week (no sign-up):"
                path={toolkitPath}
              />
            </p>
          </aside>
        </div>
      </LabSection>

      <ToolkitMore />
    </>
  );
}
