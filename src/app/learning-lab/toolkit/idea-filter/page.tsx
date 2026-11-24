import Link from "next/link";
import { IdeaFilterTool } from "@/features/learning-lab/components/IdeaFilterTool";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import {
  ToolkitFreeLine,
  ToolkitMore,
  ToolkitShare,
  toolkitMetadata,
} from "@/features/learning-lab/components/ToolkitParts";
import { problemSpottingPrompts, toolkitHref } from "@/features/learning-lab/founder-toolkit";

const path = toolkitHref("idea-filter");
const description =
  "A free 15-minute idea filter for student founders: turn a vague business idea into one person, one problem and one thing to test this week.";

export const metadata = toolkitMetadata(
  path,
  "One-Page Idea Filter: Check Your Business Idea in 15 Minutes",
  description,
  "Check your business idea in 15 minutes"
);

export default function IdeaFilterPage() {
  return (
    <>
      <LabHero
        eyebrow="Free tool · 15 minutes · Day 3 of the 14-day plan"
        title="One person. One problem. One thing to test."
        description={description}
      >
        <a href="#filter" className="lab-button">
          Fill in the filter →
        </a>
        <a href="#no-idea" className="lab-button lab-button-secondary">
          No idea yet? Start here
        </a>
      </LabHero>
      <div className="lab-container">
        <ToolkitFreeLine />
      </div>

      <LabSection
        eyebrow="Why this works"
        title="Big ideas stall. Small, specific ones get tested."
      >
        <div className="lab-split">
          <div>
            <p className="lab-lead">
              “An app for students” is impossible to test. “First-year hostel students who can’t
              find a cheap snack after the mess closes” can be tested by Friday.
            </p>
            <p>
              The filter makes you name a real person, a real moment and what they do today. Most
              students discover their idea is either sharper than they thought, or needs one more
              conversation before it is worth testing. Both are progress.
            </p>
          </div>
          <aside className="lab-callout">
            <h3>Tie-breaker for two ideas</h3>
            <p>
              Pick the one you can test with real people this week. You can always come back to the
              other.
            </p>
          </aside>
        </div>
      </LabSection>

      <LabSection
        id="filter"
        className="lab-band"
        eyebrow="Fill it in"
        title="Your one-page idea filter."
      >
        <IdeaFilterTool />
      </LabSection>

      <LabSection id="no-idea" eyebrow="No idea yet?" title="Spot a problem worth solving.">
        <p className="lab-lead">
          The best first ideas usually come from problems you or people around you already have.
          Spend ten minutes on these prompts and write down every answer.
        </p>
        <ol className="lab-grid lab-grid-two" style={{ listStyle: "none", padding: 0 }}>
          {problemSpottingPrompts.map((prompt, index) => (
            <li className="lab-card" key={prompt}>
              <p className="lab-card-number">{String(index + 1).padStart(2, "0")}</p>
              <p style={{ margin: 0, color: "var(--lab-ink)", fontSize: "1rem" }}>{prompt}</p>
            </li>
          ))}
        </ol>
        <div className="lab-actions">
          <Link className="lab-text-link" href={toolkitHref("learn-from-yc")}>
            Read: free YC advice on finding ideas →
          </Link>
          <ToolkitShare text="Check your business idea in 15 minutes, free:" path={path} />
        </div>
      </LabSection>

      <ToolkitMore current="idea-filter" />
    </>
  );
}
