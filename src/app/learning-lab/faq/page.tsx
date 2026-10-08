import type { Metadata } from "next";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  alternates: { canonical: "/learning-lab/faq" },
  description:
    "Practical answers about Learning Lab availability, adult participation, proposed certificates, fees, AI usage and institutional pilots.",
};

const questions = [
  [
    "What is the Learning Lab?",
    "Swapnil Sahoo Learning Lab is a founder-led professional education initiative hosted on swapnilsahoo.com. It is not currently presented as an incorporated company.",
  ],
  [
    "Can I enrol or pay now?",
    "The programmes are proposed. Interest enquiries will open where indicated after secure service setup. Fees, dates, capacity and final delivery details are unconfirmed. Payments are disabled. An enquiry does not reserve a place or create an enrolment.",
  ],
  [
    "Who are the programmes for?",
    "The initial focus is adult management students and early-career professionals. Participants must be aged 18 or over. Each programme page describes its audience and prerequisites.",
  ],
  [
    "What does registration of interest do?",
    "It saves an enquiry so the Lab can understand your interest and respond when an approved offer is available. Marketing updates require a separate optional consent. A successful form confirmation means the enquiry was saved; it does not mean an email was sent.",
  ],
  [
    "Can I try a lesson without an account?",
    "Yes. Each proposed programme includes an original demonstration lesson with a fictional scenario, an exercise and practice feedback. These public demonstrations do not contribute to certification.",
  ],
  [
    "Does the Lab guarantee a job or business success?",
    "No. The focus is observable learning and assessed outputs. There are no guaranteed placements, salary increases, promotions or successful ventures.",
  ],
  [
    "What kind of certificate is proposed?",
    "A Certificate of Completion, subject to the approved attendance, lesson, submission and assessment requirements and an instructor’s review. It is not a degree, recognised qualification or accreditation claim.",
  ],
  [
    "Are AI tools required?",
    "The AI programme focuses on responsible managerial usage. Tool requirements will be confirmed before a pilot. Demo lessons do not call an external AI service, and sensitive personal or employer information should not be entered into exercises.",
  ],
  [
    "Is the Lab affiliated with the founder’s employer?",
    "The Lab is separate from the founder’s employment. Published founder credentials describe his background; they are not an endorsement, partnership or evidence of Lab outcomes.",
  ],
  [
    "Can a college request a pilot?",
    "Yes. An adult-audience pilot can be discussed around a learning gap, delivery scope, assessment and agreed responsibilities. An enquiry creates no institutional contract or commercial commitment.",
  ],
  [
    "Will sessions be recorded?",
    "No recording is promised or assumed. Any recording arrangement requires advance notice and a separate consent process, with a reasonable alternative for people who do not consent.",
  ],
  [
    "Are the policies final?",
    "No. The published policies are drafts for professional review. Operator contact details, approved commercial terms and other launch requirements must be settled before a public paid launch.",
  ],
];

export default function FaqPage() {
  return (
    <>
      <LabHero
        eyebrow="Practical questions"
        title="Know what you are signing up for."
        description="Clear answers about the proposed programmes, enquiry process and the current stage of the initiative."
      />
      <LabSection>
        <div className="lab-prose">
          {questions.map(([question, answer]) => (
            <details key={question} className="lab-faq">
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </LabSection>
    </>
  );
}
