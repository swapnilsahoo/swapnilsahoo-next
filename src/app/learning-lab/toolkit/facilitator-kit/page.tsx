import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { CopyBlock } from "@/features/learning-lab/components/ToolkitCopy";
import {
  ToolkitFreeLine,
  ToolkitMore,
  ToolkitShare,
  toolkitMetadata,
} from "@/features/learning-lab/components/ToolkitParts";
import { toolkitHref } from "@/features/learning-lab/founder-toolkit";
import {
  facilitatorFollowUps,
  facilitatorGradingGuidance,
  facilitatorOutcomes,
  facilitatorReportTemplate,
  facilitatorSessionPlan,
  facilitatorSlides,
  facilitatorUseNote,
} from "@/features/learning-lab/founder-toolkit-extras";
import { ventureEvidenceRubric } from "@/features/learning-lab/venture-experiment";

const path = toolkitHref("facilitator-kit");
const description =
  "A free, ready-to-run 75-minute customer-test workshop for college E-Cells, innovation councils and faculty: session plan, slide outline, report template and grading rubric.";

export const metadata = toolkitMetadata(
  path,
  "Free Idea-Validation Workshop Kit for E-Cells and Faculty",
  description,
  "Run a free customer-test workshop at your college"
);

export default function FacilitatorKitPage() {
  return (
    <>
      <LabHero
        eyebrow="Free kit · For E-Cells, innovation councils, clubs and faculty"
        title="Run a 75-minute customer-test workshop at your college."
        description={description}
      >
        <a href="#plan" className="lab-button">
          See the session plan →
        </a>
        <a href="#report" className="lab-button lab-button-secondary">
          Report template
        </a>
      </LabHero>
      <div className="lab-container">
        <ToolkitFreeLine />
      </div>

      <LabSection eyebrow="Why run it" title="Students leave with a real test, not just a lecture.">
        <div className="lab-split">
          <div>
            <p className="lab-lead">
              Most entrepreneurship sessions end with inspiration. This one ends with every student
              holding a sharpened idea, five better questions, a rehearsed conversation and a
              committed ₹0 test with a pass mark.
            </p>
            <h3>Learning outcomes</h3>
            <ol>
              {facilitatorOutcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ol>
          </div>
          <aside className="lab-callout">
            <h3>What you need</h3>
            <ul>
              <li>A room or video call, and 75 minutes</li>
              <li>Students with phones or laptops (printouts work too)</li>
              <li>The toolkit links below; no sign-up, no cost</li>
            </ul>
            <p className="lab-small">{facilitatorUseNote}</p>
          </aside>
        </div>
      </LabSection>

      <LabSection
        id="plan"
        className="lab-band"
        eyebrow="Session plan"
        title="Six blocks, 75 minutes."
      >
        <ol className="lab-flow">
          {facilitatorSessionPlan.map((block) => (
            <li key={block.minutes}>
              <div>
                <h3 style={{ fontSize: "1.25rem", margin: 0 }}>
                  {block.minutes} min · {block.title}
                </h3>
                <p style={{ margin: "0.4rem 0" }}>{block.activity}</p>
                <Link className="lab-text-link" href={toolkitHref(block.tool, block.anchor)}>
                  Open the tool →
                </Link>
              </div>
            </li>
          ))}
        </ol>
        <h3 style={{ marginTop: "2rem" }}>Follow-ups that make it stick</h3>
        <div className="lab-grid lab-grid-two">
          {facilitatorFollowUps.map((item) => (
            <article className="lab-card" key={item.when}>
              <p className="lab-card-number">{item.when}</p>
              <p style={{ color: "var(--lab-ink)" }}>{item.what}</p>
            </article>
          ))}
        </div>
      </LabSection>

      <LabSection
        id="materials"
        eyebrow="Copy and adapt"
        title="Slide outline and activity report."
      >
        <div className="lab-grid lab-grid-two">
          <CopyBlock
            title="Slide outline (8 slides)"
            text={facilitatorSlides}
            downloadName="customer-test-workshop-slides.txt"
          />
          <CopyBlock
            id="report"
            title="Activity report template"
            note="Adapt it to your E-Cell or innovation council's own format."
            text={facilitatorReportTemplate}
            downloadName="customer-test-workshop-report.txt"
          />
        </div>
      </LabSection>

      <LabSection
        id="rubric"
        className="lab-band"
        eyebrow="For faculty"
        title="Assign it in a course and grade it fairly."
      >
        <div className="lab-split">
          <div>
            <p className="lab-lead">
              Students submit the one-page experiment record and anonymous notes. Score four
              criteria from 0 to 2, out of 8.
            </p>
            <ul>
              {facilitatorGradingGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link
              className="lab-text-link"
              href={toolkitHref("test-playbooks", "experiment-record")}
            >
              See the one-page record students fill in →
            </Link>
          </div>
          <div className="space-y-4">
            {ventureEvidenceRubric.map((criterion) => (
              <article className="lab-card" key={criterion.id}>
                <h3 style={{ fontSize: "1.2rem" }}>{criterion.criterion}</h3>
                <ul className="lab-small">
                  {criterion.scores.map((score) => (
                    <li key={score}>{score}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
        <div className="lab-actions">
          <ToolkitShare
            text="Free 75-minute customer-test workshop kit for E-Cells and faculty:"
            path={path}
          />
        </div>
      </LabSection>

      <ToolkitMore current="facilitator-kit" />
    </>
  );
}
