import Link from "next/link";
import {
  QuestionChecker,
  ScriptBuilder,
} from "@/features/learning-lab/components/ConversationKitTool";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { CopyBlock } from "@/features/learning-lab/components/ToolkitCopy";
import {
  ToolkitFreeLine,
  ToolkitMore,
  ToolkitShare,
  toolkitMetadata,
} from "@/features/learning-lab/components/ToolkitParts";
import {
  badToBetterQuestions,
  conversationSignals,
  conversationTarget,
  fearLadder,
  fearTips,
  notesTemplate,
  outreachMessages,
  toolkitHref,
} from "@/features/learning-lab/founder-toolkit";

const path = toolkitHref("talk-to-customers");
const description =
  "Free customer interview kit for student founders: word-for-word messages, five questions that get honest answers, and a checker that flags leading or hypothetical questions.";

export const metadata = toolkitMetadata(
  path,
  "Customer Interview Questions and Scripts for Student Founders",
  description,
  "Talk to customers without the fear: free scripts and questions"
);

export default function TalkToCustomersPage() {
  return (
    <>
      <LabHero
        eyebrow="Free kit · Days 4–6 of the 14-day plan"
        title="Talk to customers without the fear."
        description={description}
      >
        <a href="#script" className="lab-button">
          Build my script →
        </a>
        <a href="#messages" className="lab-button lab-button-secondary">
          Copy a first message
        </a>
      </LabHero>
      <div className="lab-container">
        <ToolkitFreeLine />
      </div>

      <LabSection
        eyebrow="Feeling nervous?"
        title="You are not selling. You are asking about their life."
      >
        <div className="lab-split">
          <div>
            <p className="lab-lead">
              Most people enjoy talking about their own problems for ten minutes, especially to a
              student. You do not need confidence; you need a script and three people.
            </p>
            <ul>
              {fearTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            <p className="lab-small">
              Want the method behind this? Watch Y Combinator’s free talk{" "}
              <a
                className="lab-text-link"
                href="https://www.ycombinator.com/library/Iq-how-to-talk-to-users"
                target="_blank"
                rel="noopener noreferrer"
              >
                How to talk to users ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
              . Independent resource; no partnership is implied.
            </p>
          </div>
          <aside className="lab-callout">
            <h3>Climb the ladder</h3>
            <ol className="lab-ladder">
              {fearLadder.map((rung) => (
                <li key={rung.title}>
                  <span className="lab-ladder-rung">{rung.rung}</span>
                  <span>
                    <strong>{rung.title}.</strong> {rung.text}
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </LabSection>

      <LabSection
        id="messages"
        className="lab-band"
        eyebrow="Step 1 · Reach out"
        title="Ready-made first messages."
      >
        <p>
          Replace the [brackets], keep it short, and always make it easy to say no. Send each
          message to one person at a time.
        </p>
        <div className="lab-grid lab-grid-two">
          {outreachMessages.map((item) => (
            <CopyBlock
              key={item.id}
              id={`message-${item.id}`}
              title={item.channel}
              note={item.situation}
              text={item.message}
              whatsapp={item.id !== "in-person"}
            />
          ))}
        </div>
      </LabSection>

      <LabSection
        id="script"
        eyebrow="Step 2 · The conversation"
        title="Your word-for-word script."
      >
        <p className="lab-lead">
          Five questions about the last time the problem happened. Fill in two blanks and the script
          writes itself.
        </p>
        <ScriptBuilder />
      </LabSection>

      <LabSection
        id="checker"
        className="lab-band"
        eyebrow="Step 3 · Check yourself"
        title="Is your question helping or hurting?"
      >
        <div className="lab-split">
          <QuestionChecker />
          <div>
            <h3>Bad question → better question</h3>
            <div className="lab-table-wrap">
              <table className="lab-table">
                <thead>
                  <tr>
                    <th scope="col">Instead of…</th>
                    <th scope="col">Ask…</th>
                  </tr>
                </thead>
                <tbody>
                  {badToBetterQuestions.map((row) => (
                    <tr key={row.bad}>
                      <td>
                        {row.bad}
                        <br />
                        <span className="lab-small">{row.why}</span>
                      </td>
                      <td>{row.better}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </LabSection>

      <LabSection
        id="notes"
        eyebrow="Step 4 · Write it down"
        title="Notes template for each conversation."
      >
        <div className="lab-split">
          <CopyBlock
            text={notesTemplate}
            note="Fill one in straight after each chat, while you remember their exact words."
            downloadName="conversation-notes-template.txt"
          />
          <aside className="lab-callout">
            <h3>How many conversations?</h3>
            <p>{conversationTarget}</p>
            <h3>Signs the problem is real</h3>
            <ul>
              {conversationSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
            <h3>After three conversations</h3>
            <p>
              Look for what people <strong>did</strong>, not what they said they would do. Highlight
              anything that surprised you or proved you wrong. That is the most valuable line in
              your notes.
            </p>
            <p>
              <Link
                className="lab-text-link"
                href={toolkitHref("ai-practice-prompts", "read-notes")}
              >
                Use a free AI prompt to sort your notes →
              </Link>
            </p>
            <p className="lab-small">
              Keep notes anonymous: “Customer A”, never names, numbers or screenshots.{" "}
              <ToolkitShare text="Free scripts to talk to customers about your idea:" path={path} />
            </p>
          </aside>
        </div>
      </LabSection>

      <ToolkitMore current="talk-to-customers" />
    </>
  );
}
