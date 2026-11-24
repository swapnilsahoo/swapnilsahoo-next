import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { CopyBlock } from "@/features/learning-lab/components/ToolkitCopy";
import {
  ToolkitFreeLine,
  ToolkitMore,
  ToolkitShare,
  toolkitMetadata,
} from "@/features/learning-lab/components/ToolkitParts";
import {
  aiNotEvidence,
  aiPromptRules,
  aiPrompts,
  toolkitHref,
} from "@/features/learning-lab/founder-toolkit";

const path = toolkitHref("ai-practice-prompts");
const description =
  "Six copy-paste prompts for any free AI assistant: rehearse a customer conversation, check your interview questions, poke holes in your idea and challenge your decision.";

export const metadata = toolkitMetadata(
  path,
  "Free AI Prompts to Practise Customer Interviews and Test Ideas",
  description,
  "Free AI prompts to practise talking to customers"
);

export default function AiPracticePromptsPage() {
  return (
    <>
      <LabHero
        eyebrow="Free prompts · Use any time, day or night"
        title="Use a free AI assistant as your sparring partner."
        description={description}
      >
        <a href="#prompts" className="lab-button">
          Copy a prompt →
        </a>
      </LabHero>
      <div className="lab-container">
        <ToolkitFreeLine />
        <p className="lab-watch" style={{ marginTop: "1rem" }}>
          <strong>Read this first.</strong> {aiNotEvidence}
        </p>
      </div>

      <LabSection eyebrow="Before you paste" title="Four rules for using AI well.">
        <div className="lab-split">
          <ol className="lab-flow">
            {aiPromptRules.map((rule) => (
              <li key={rule}>
                <p style={{ margin: 0 }}>{rule}</p>
              </li>
            ))}
          </ol>
          <aside className="lab-callout">
            <h3>Best use: beat the nerves</h3>
            <p>
              The “Rehearse a conversation” prompt lets you practise with a pretend customer before
              you talk to a real one. Then go and talk to a real one: only real people&rsquo;s
              actions count as evidence.
            </p>
            <p className="lab-small">
              These prompts work in any AI chat you choose. The Lab does not run, pay for or endorse
              any AI provider, and nothing you type there reaches the Lab.
            </p>
          </aside>
        </div>
      </LabSection>

      <LabSection
        id="prompts"
        className="lab-band"
        eyebrow="Six prompts"
        title="Copy, fill the [brackets], paste."
      >
        <div className="lab-grid lab-grid-two">
          {aiPrompts.map((item) => (
            <CopyBlock
              key={item.id}
              id={item.id}
              title={item.title}
              note={`Use: ${item.useWhen}`}
              text={item.prompt}
            />
          ))}
        </div>
        <div className="lab-actions">
          <Link className="lab-text-link" href={toolkitHref("talk-to-customers", "checker")}>
            Prefer no AI? Use the instant question checker →
          </Link>
          <ToolkitShare text="Free AI prompts to practise talking to customers:" path={path} />
        </div>
      </LabSection>

      <ToolkitMore current="ai-practice-prompts" />
    </>
  );
}
