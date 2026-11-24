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
  campusExamples,
  campusExamplesNote,
  experimentRecordTemplate,
  learningCardTemplate,
  playbookHonestyNote,
  signalLadder,
  testCardTemplate,
  testPlaybooks,
  toolkitHref,
  whoCountsRule,
} from "@/features/learning-lab/founder-toolkit";

const path = toolkitHref("test-playbooks");
const description =
  "Six free ways to test a business idea for ₹0–₹500 in a few days: WhatsApp reservations, sign-up slots, posters, samples, doing it by hand and DM-to-reserve.";

export const metadata = toolkitMetadata(
  path,
  "How to Test a Business Idea for ₹0–₹500: Six Playbooks",
  description,
  "Test your business idea for ₹0–₹500 this week"
);

export default function TestPlaybooksPage() {
  return (
    <>
      <LabHero
        eyebrow="Free playbooks · Days 7–11 of the 14-day plan"
        title="Run a real test this week, for ₹0–₹500."
        description={description}
      >
        <a href="#playbooks" className="lab-button">
          Pick a playbook →
        </a>
        <a href="#signals" className="lab-button lab-button-secondary">
          What counts as demand?
        </a>
      </LabHero>
      <div className="lab-container">
        <ToolkitFreeLine />
      </div>

      <LabSection eyebrow="The rule" title="Count what people do, not what they say.">
        <div className="lab-split">
          <div>
            <p className="lab-lead">
              Every playbook has the same shape: a clear offer, a deadline, a pass mark you write
              down before you start, and a count of real actions out of the number of people asked.
            </p>
            <p>
              Not sure which to pick? Use the <strong>idea filter</strong>: its “Choose your path”
              step suggests the best first test for your kind of idea.
            </p>
            <Link className="lab-text-link" href={toolkitHref("idea-filter")}>
              Open the idea filter →
            </Link>
          </div>
          <aside className="lab-callout">
            <h3>About money</h3>
            <p>{playbookHonestyNote}</p>
          </aside>
        </div>
      </LabSection>

      <LabSection
        id="playbooks"
        className="lab-band"
        eyebrow="Six playbooks"
        title="Choose one. Run it. Count."
      >
        <nav aria-label="Playbooks" className="lab-anchor-links">
          {testPlaybooks.map((playbook) => (
            <a key={playbook.id} href={`#${playbook.id}`} className="lab-text-link">
              {playbook.title}
            </a>
          ))}
        </nav>
        <div className="lab-grid lab-grid-two" style={{ marginTop: "1.2rem" }}>
          {testPlaybooks.map((playbook) => (
            <article className="lab-card lab-playbook" id={playbook.id} key={playbook.id}>
              <div className="lab-kit-meta">
                <span className="lab-tag">{playbook.cost}</span>
                <span className="lab-tag">{playbook.time}</span>
              </div>
              <h3>{playbook.title}</h3>
              <p>
                <strong>Best for:</strong> {playbook.bestFor}
              </p>
              <ol>
                {playbook.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <dl>
                <dt>Count</dt>
                <dd>{playbook.count}</dd>
                <dt>Example pass mark</dt>
                <dd>{playbook.passMark}</dd>
              </dl>
              <p className="lab-watch">
                <strong>Watch out.</strong> {playbook.watchOut}
              </p>
            </article>
          ))}
        </div>
      </LabSection>

      <LabSection id="signals" eyebrow="What counts" title="From weak signals to strong ones.">
        <div className="lab-split">
          <div className="lab-table-wrap">
            <table className="lab-table">
              <thead>
                <tr>
                  <th scope="col">What people do</th>
                  <th scope="col">Strength</th>
                  <th scope="col">What it costs them</th>
                  <th scope="col">Why</th>
                </tr>
              </thead>
              <tbody>
                {signalLadder.map((row) => (
                  <tr key={row.signal}>
                    <td>{row.signal}</td>
                    <td>
                      <strong>{row.strength}</strong>
                    </td>
                    <td>{row.costs}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <aside className="lab-callout">
            <h3>Set your pass mark first</h3>
            <p>
              Write it before you share the offer, for example:{" "}
              <em>“At least 5 of 25 people reserve by Friday.”</em> Afterwards, compare honestly.
              Below the mark? That is a real answer: change the offer or stop.
            </p>
            <p>
              <strong>Who counts:</strong> {whoCountsRule}
            </p>
            <p className="lab-small">A zero is a result. A test you never ran is not.</p>
          </aside>
        </div>
      </LabSection>

      <LabSection
        id="cards"
        className="lab-band"
        eyebrow="Before, after and at the end"
        title="Three cards that keep you honest."
      >
        <p className="lab-lead">
          Fill in the test card before you share your offer and the learning card when the deadline
          passes. Writing your bet down first is what stops you moving the goalposts later. On Day
          14, the one-page record sums up your experiment for your CV, your E-Cell or a mentor.
        </p>
        <div className="lab-grid">
          <CopyBlock
            id="test-card"
            title="Test card (Day 7)"
            text={testCardTemplate}
            downloadName="my-test-card.txt"
          />
          <CopyBlock
            id="learning-card"
            title="Learning card (Day 11)"
            text={learningCardTemplate}
            downloadName="my-learning-card.txt"
          />
          <CopyBlock
            id="experiment-record"
            title="One-page record (Day 14)"
            note="Self-reported. It is your own record, not a certificate."
            text={experimentRecordTemplate}
            downloadName="my-experiment-record.txt"
          />
        </div>
      </LabSection>

      <LabSection
        id="examples"
        eyebrow="Illustrative examples"
        title="What this looks like on a campus."
      >
        <p className="lab-small">{campusExamplesNote}</p>
        <div className="lab-grid">
          {campusExamples.map((example) => (
            <article className="lab-card" key={example.id}>
              <span className="lab-tag">{example.path} · invented example</span>
              <h3>{example.title}</h3>
              <p>
                <strong>Test:</strong> {example.test}
              </p>
              <p>
                <strong>Numbers:</strong> {example.numbers}
              </p>
              <p>
                <strong>Decision:</strong> {example.decision}
              </p>
            </article>
          ))}
        </div>
        <div className="lab-actions">
          <ToolkitShare text="Six ways to test a business idea for ₹0–₹500:" path={path} />
        </div>
      </LabSection>

      <ToolkitMore current="test-playbooks" />
    </>
  );
}
