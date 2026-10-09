import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { isLabServiceConfigured } from "@/features/learning-lab/server/capabilities";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  alternates: { canonical: "/learning-lab/faq" },
  description:
    "Practical answers about free learning, voluntary support, Learning Lab availability, adult participation, proposed certificates and institutional pilots.",
};

function getQuestions(enquiriesAvailable: boolean) {
  return [
    [
      "What is the Learning Lab?",
      "Swapnil Sahoo Learning Lab is a founder-led education initiative hosted on swapnilsahoo.com, currently run on a not-for-profit basis. Its focus is accessible learning in applied AI, strategy and entrepreneurship.",
    ],
    [
      "How can I support the Lab?",
      "Voluntary assistance and donations are welcome to help improve learning content and infrastructure. You can offer content feedback, subject expertise, accessibility help or technical assistance, or choose any amount using the original PhonePe QR on the Support the Lab page. The image prints the payee name SWAPNIL SAHOO; check the recipient in your payment app before sending. All six free courses remain ₹0. Support does not purchase enrolment, assessment or a certificate, and this website does not verify transfers or issue an automatic confirmation.",
    ],
    [
      "Can I enrol or pay now?",
      enquiriesAvailable
        ? "The full programmes are proposed. You can register interest using the online form on the contact page, or email a programme question. Fees, dates, capacity and delivery details are unconfirmed, and paid course checkout remains closed. Optional QR donations are separate from course fees. An enquiry or donation does not reserve a place or create an enrolment."
        : "The full programmes are proposed. You can email a programme question using the approved contact on the contact page. Online interest forms will open after secure service setup. Fees, dates, capacity and delivery details are unconfirmed, and paid course checkout remains closed. Optional QR donations are separate from course fees. An enquiry or donation does not reserve a place or create an enrolment.",
    ],
    [
      "Who are the programmes for?",
      "The initial focus is adult management students and early-career professionals. Participants must be aged 18 or over. Each programme page describes its audience and prerequisites.",
    ],
    [
      "What does registration of interest do?",
      enquiriesAvailable
        ? "It saves an enquiry so the Lab can understand your interest and respond when an approved offer is available. Marketing updates require a separate optional consent. A successful form confirmation means the enquiry was saved; it does not mean an email was sent."
        : "Online registration of interest is not available yet. You can email a programme question using the contact page. Opening an email link does not send the message or save an enquiry automatically. When online forms become available, a successful form confirmation will mean the enquiry was saved; it will not mean an email was sent.",
    ],
    [
      "Can I try a lesson without an account?",
      "Yes. The Free courses library offers six self-paced mini-courses with readings, fictional scenarios, interactive decisions, checkpoints and downloadable worksheets. No account, payment or paid software is needed. Each proposed full programme also includes an original demonstration. This public self-practice does not include live teaching, individual assessment or certification.",
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
}

export default function FaqPage() {
  const questions = getQuestions(isLabServiceConfigured());
  return (
    <>
      <LabHero
        eyebrow="Practical questions"
        title="Know what you are signing up for."
        description="Clear answers about free learning, voluntary support, proposed programmes and the current stage of the initiative."
      />
      <LabSection>
        <div className="lab-prose">
          {questions.map(([question, answer]) => (
            <details key={question} className="lab-faq">
              <summary>{question}</summary>
              <p>{answer}</p>
              {question === "How can I support the Lab?" && (
                <p>
                  <Link href="/learning-lab/support">Support the Lab →</Link>
                </p>
              )}
              {question === "Can I enrol or pay now?" && (
                <p>
                  <Link href="/learning-lab/contact">Contact and register interest →</Link>
                </p>
              )}
            </details>
          ))}
        </div>
      </LabSection>
    </>
  );
}
