import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { EnquiryForm } from "@/features/learning-lab/components/EnquiryForm";
import { getPublicProgrammes } from "@/features/learning-lab/store";
import { isLabServiceConfigured } from "@/features/learning-lab/server/capabilities";
import { labPublicConfig } from "@/features/learning-lab/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "For Colleges",
  description:
    "Explore a scoped Learning Lab pilot for adult management students, with original exercises, clear responsibilities and observable assessment.",
  alternates: { canonical: "/learning-lab/for-colleges" },
};

export default async function CollegesPage() {
  const programmes = await getPublicProgrammes();
  return (
    <>
      <LabHero
        eyebrow="For colleges and learning teams"
        title="A small pilot with a clear learning question."
        description="Explore a proposed institution-integrated programme in applied AI, strategy or entrepreneurship. Start with an adult audience, a practical learning gap and an agreed assessment approach."
      >
        <a href="#pilot-enquiry" className="lab-button">
          Request a pilot discussion →
        </a>
        <Link href="/learning-lab/programmes" className="lab-button lab-button-secondary">
          Review the curriculum
        </Link>
      </LabHero>
      <LabSection
        eyebrow="What a pilot can include"
        title="A useful extension to your learning programme."
      >
        <div className="lab-grid">
          <article className="lab-card">
            <h3>Applied decisions</h3>
            <p>
              Original scenarios, structured discussions and learner outputs aligned to a specific
              programme’s intended outcomes.
            </p>
          </article>
          <article className="lab-card">
            <h3>Visible assessment</h3>
            <p>
              A published rubric, a capstone and instructor-reviewed feedback. Agree what
              improvement can reasonably be measured.
            </p>
          </article>
          <article className="lab-card">
            <h3>A manageable workflow</h3>
            <p>
              A small learner area for assigned lessons and submissions, plus cohort progress
              reporting with appropriate permissions.
            </p>
          </article>
        </div>
      </LabSection>
      <LabSection className="lab-band">
        <div className="lab-split">
          <div>
            <p className="lab-eyebrow">Before a pilot is agreed</p>
            <h2>Define the scope together.</h2>
            <ol className="lab-flow">
              <li>
                <div>
                  <h3>Identify the learning gap</h3>
                  <p>
                    Agree the adult audience, prerequisites and decisions learners should be able to
                    handle.
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <h3>Agree responsibilities</h3>
                  <p>
                    Confirm timetable, learner support, accessibility requirements, instructor time,
                    assessment and authorised data sharing.
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <h3>Review a written proposal</h3>
                  <p>
                    Approve the final programme, commercial terms, policies and success measures
                    before enrolment or delivery.
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <h3>Deliver, measure and revise</h3>
                  <p>
                    Use attendance, assessed work and feedback to decide what to improve and whether
                    a further cohort is justified.
                  </p>
                </div>
              </li>
            </ol>
          </div>
          <aside className="lab-callout">
            <h3>Measure learning, with appropriate limits.</h3>
            <p>
              Proposed measures include attendance, completion, pre/post rubric scores, capstone
              quality and learner satisfaction. Small samples and different starting points limit
              causal claims.
            </p>
            <p>
              There are no institutional partnerships, completed Lab pilots or achieved outcomes to
              report yet.
            </p>
            <p className="lab-small">
              The Lab is separate from the founder’s employment. No institutional endorsement or use
              of employer resources is implied.
            </p>
          </aside>
        </div>
      </LabSection>
      <LabSection id="pilot-enquiry">
        <div className="lab-split">
          <div>
            <p className="lab-eyebrow">Institutional enquiry</p>
            <h2>What would a useful pilot change?</h2>
            <p className="lab-muted">
              Tell us the programme you are interested in and, optionally, the learning challenge.
              Please do not upload learner lists or share student records in the enquiry.
            </p>
            <p className="lab-small">
              An enquiry does not create a contract, reserve dates or commit your institution to a
              purchase.
            </p>
          </div>
          <EnquiryForm
            available={isLabServiceConfigured()}
            contactEmail={labPublicConfig.businessEmail}
            kind="institution"
            programmes={programmes.filter((p) => p.availability.status !== "closed")}
          />
        </div>
      </LabSection>
    </>
  );
}
