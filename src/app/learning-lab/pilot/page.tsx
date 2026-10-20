import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { PilotFeedbackForm } from "@/features/learning-lab/components/PilotFeedbackForm";
import { labPublicConfig } from "@/features/learning-lab/config";
import { pilotLessons, getPilotIntakeStatus } from "@/features/learning-lab/pilot";
import { isLabServiceConfigured } from "@/features/learning-lab/server/capabilities";

export const dynamic = "force-dynamic";
const title = "Try a Free Lesson: Volunteer Pilot";
const description =
  "Try one 20–30-minute free Learning Lab task and share private, voluntary feedback. Adults only; no fee or academic assessment. Practice-note emails are a separate optional choice.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/learning-lab/pilot" },
  openGraph: { title, description, url: "/learning-lab/pilot" },
  twitter: { card: "summary", title, description },
};

export default function PilotPage() {
  const { open: intakeOpen, started: intakeStarted, notesAvailable } = getPilotIntakeStatus();
  return (
    <>
      <LabHero
        eyebrow="Help improve a free lesson"
        title="Try one task. Tell us what needs work."
        description={
          intakeOpen
            ? "Choose a short lesson, make one decision and share where the instructions or result were unclear. This voluntary adult pilot takes about 20–30 minutes. No payment or account is needed."
            : "Free lessons and worksheets remain available. The voluntary feedback window is 20 October–18 November 2026, India time; new pilot feedback is not being collected now."
        }
      >
        <a className="lab-button" href="#pilot-tasks">
          Choose a task →
        </a>
        <a className="lab-text-link" href="#pilot-feedback">
          {intakeOpen ? "Already tried one? Share feedback →" : "Check pilot availability →"}
        </a>
      </LabHero>
      <LabSection
        id="pilot-tasks"
        eyebrow="1. Choose · 2. Try · 3. Reflect"
        title="One useful attempt is enough."
      >
        <p className="lab-muted">
          Read the lesson and try its task before looking for help. Use its fictional examples. Keep
          your worksheet; send only the brief response you want the Lab to review. You can stop at
          any point and still explain what blocked you.
        </p>
        <div className="lab-grid lab-grid-3">
          {pilotLessons.map((lesson) => (
            <article className="lab-card" key={lesson.slug}>
              <h3>{lesson.title}</h3>
              <p>{lesson.task}</p>
              <p className="lab-small">
                <strong>Bring back:</strong> {lesson.output}
              </p>
              <Link
                className="lab-text-link"
                href={`/learning-lab/free-courses/${lesson.slug}#course-tool`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open lesson in a new tab ↗
              </Link>
            </article>
          ))}
        </div>
        <aside className="lab-callout" style={{ marginTop: "1.5rem" }}>
          <h3>A trial, with room to be honest</h3>
          <p>
            You can decline or stop without affecting grades, admission, references or free access.
            There is no reward, grade, certificate or promised personal coaching. Your response is
            private; names, work and comments will not be published without separate permission.
          </p>
          <p className="lab-small">
            The first review window is 20 October–18 November 2026. A submitted completion is
            self-reported. This form does not establish observed completion, learning improvement or
            a representative sample of learners.
          </p>
        </aside>
      </LabSection>
      <LabSection
        id="pilot-feedback"
        eyebrow="Private feedback"
        title={intakeOpen ? "What happened when you tried it?" : "Pilot feedback availability"}
      >
        <div className="lab-split">
          <div>
            <p className="lab-muted">
              {intakeOpen
                ? "Share the reasoning you used and a concrete point of confusion. “The capacity limit changed my decision” is more useful than a general rating alone."
                : "The feedback form is closed outside the collection window. You can still work through the free lessons, keep your worksheet and contact the Lab about an existing response."}
            </p>
            <p>
              Feedback is stored with the selected lesson in the Lab’s restricted enquiry workspace.
              Repeat submissions for the same email and lesson update that response. Different
              lessons and programme enquiries stay separate.
            </p>
            <p className="lab-small">
              An alias is welcome. Your email helps match a correction or deletion request; pilot
              follow-up and, while available, the four pilot practice notes are separate optional
              choices. No general newsletter signup, recording or publication permission is
              inferred. Practice notes use Google Mail from swapnil.s@greatlakes.edu.in; reply STOP
              to withdraw. Your most recent pilot response controls the optional email choices
              across all pilot lessons, even if you select a different lesson. A STOP reply
              overrides form choices. To restart these pilot notes after STOP, reply RESUBSCRIBE
              from the same email.
            </p>
            <p className="lab-small">
              For a correction or withdrawal, keep the saved reference and email{" "}
              <a className="lab-text-link" href={`mailto:${labPublicConfig.businessEmail}`}>
                {labPublicConfig.businessEmail}
              </a>
              . The existing privacy notice explains manual handling and retention; no automatic
              deletion is promised.
            </p>
          </div>
          {intakeOpen ? (
            <PilotFeedbackForm
              available={isLabServiceConfigured()}
              contactEmail={labPublicConfig.businessEmail}
              learningNotesAvailable={notesAvailable}
            />
          ) : (
            <aside className="lab-callout" aria-label="Volunteer feedback availability">
              <h3>
                {!intakeStarted
                  ? "Feedback collection opens on 20 October 2026."
                  : "Feedback collection is closed."}
              </h3>
              <p>
                The collection window is 20 October–18 November 2026, India time. Free lessons
                remain open; no new pilot response can be submitted outside this window.
              </p>
              <p className="lab-small">
                For a correction or withdrawal of an existing response,{" "}
                <a className="lab-text-link" href={`mailto:${labPublicConfig.businessEmail}`}>
                  email the Lab
                </a>
                . You may also reply STOP to a pilot email to withdraw email permission.
              </p>
            </aside>
          )}
        </div>
      </LabSection>
    </>
  );
}
