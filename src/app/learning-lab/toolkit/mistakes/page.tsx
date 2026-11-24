import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import {
  ToolkitFreeLine,
  ToolkitMore,
  ToolkitShare,
  toolkitMetadata,
} from "@/features/learning-lab/components/ToolkitParts";
import {
  beginnerMistakes,
  toolkitHref,
  toolkitTool,
} from "@/features/learning-lab/founder-toolkit";

const path = toolkitHref("mistakes");
const description =
  "Twelve mistakes first-time student founders make, from building the app first to asking friends for feedback, and exactly what to do instead.";

export const metadata = toolkitMetadata(
  path,
  "12 Startup Mistakes Students Make (and What to Do Instead)",
  description,
  "12 mistakes first-time student founders make"
);

export default function MistakesPage() {
  return (
    <>
      <LabHero
        eyebrow="Free guide · 8 minutes"
        title="Twelve beginner mistakes, and what to do instead."
        description={description}
      >
        <a href="#mistakes" className="lab-button">
          Read the list →
        </a>
      </LabHero>
      <div className="lab-container">
        <ToolkitFreeLine />
      </div>

      <LabSection
        id="mistakes"
        eyebrow="Check yourself"
        title="Which of these are you doing right now?"
      >
        <p className="lab-lead">
          Every founder makes some of these. Spotting them early saves weeks of effort and money you
          may need for something else.
        </p>
        <ol className="lab-grid lab-grid-two" style={{ listStyle: "none", padding: 0 }}>
          {beginnerMistakes.map((item, index) => (
            <li className="lab-card" id={item.id} key={item.id}>
              <div className="lab-kit-meta">
                <span className="lab-tag">{String(index + 1).padStart(2, "0")}</span>
                <span className="lab-tag">Usually: {item.when}</span>
              </div>
              <h3>{item.mistake}</h3>
              <p>
                <strong>Why it hurts:</strong> {item.why}
              </p>
              <p>
                <strong>Do this instead:</strong> {item.instead}
              </p>
              <Link className="lab-text-link" href={toolkitHref(item.tool)}>
                Use: {toolkitTool(item.tool).title} →
              </Link>
            </li>
          ))}
        </ol>
        <div className="lab-actions">
          <ToolkitShare text="12 mistakes first-time student founders make:" path={path} />
        </div>
      </LabSection>

      <ToolkitMore current="mistakes" />
    </>
  );
}
