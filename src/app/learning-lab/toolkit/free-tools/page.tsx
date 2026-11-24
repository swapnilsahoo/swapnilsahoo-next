import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import {
  ToolkitFreeLine,
  ToolkitMore,
  ToolkitShare,
  toolkitMetadata,
} from "@/features/learning-lab/components/ToolkitParts";
import { freeTools, freeToolsNote, toolkitHref } from "@/features/learning-lab/founder-toolkit";

const path = toolkitHref("free-tools");
const description =
  "A short list of genuinely free tools for testing a business idea: forms, posters, notes, calls and simple pages. No paid software needed.";

export const metadata = toolkitMetadata(
  path,
  "Free Tools for Student Startups: Forms, Posters, Notes and Calls",
  description,
  "Free tools to test your startup idea"
);

export default function FreeToolsPage() {
  return (
    <>
      <LabHero
        eyebrow="Free list · Days 7–8 of the 14-day plan"
        title="Free tools. No paid software needed."
        description={description}
      />
      <div className="lab-container">
        <ToolkitFreeLine />
      </div>

      {freeTools.map((group, index) => (
        <LabSection
          key={group.category}
          className={index % 2 === 0 ? "" : "lab-band"}
          eyebrow={`Free tools · ${String(index + 1).padStart(2, "0")}`}
          title={group.category}
        >
          <div className="lab-grid">
            {group.tools.map((tool) => (
              <article className="lab-card" key={tool.name}>
                <span className="lab-tag">{tool.free}</span>
                <h3>{tool.name}</h3>
                <p>{tool.use}</p>
                <a
                  className="lab-text-link"
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open {tool.name} ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </article>
            ))}
          </div>
        </LabSection>
      ))}

      <LabSection eyebrow="Good to know" title="Use the simplest tool that works.">
        <div className="lab-split">
          <p className="lab-lead">
            A WhatsApp message and a Google Sheet are enough for most first tests. Fancy tools make
            a test look impressive, not more truthful.
          </p>
          <div>
            <p className="lab-small">{freeToolsNote}</p>
            <ToolkitShare text="Free tools to test your startup idea:" path={path} />
          </div>
        </div>
      </LabSection>

      <ToolkitMore current="free-tools" />
    </>
  );
}
