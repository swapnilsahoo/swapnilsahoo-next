import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { EnquiryForm } from "@/features/learning-lab/components/EnquiryForm";
import { DemoLesson } from "@/features/learning-lab/components/DemoLesson";
import { getPublicProgramme, getPublicProgrammes } from "@/features/learning-lab/store";
import { isLabServiceConfigured } from "@/features/learning-lab/server/capabilities";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const programme = await getPublicProgramme(slug);
  if (!programme) return { title: "Programme not found" };
  return {
    title: programme.title,
    description: programme.tagline,
    alternates: { canonical: `/learning-lab/programmes/${slug}` },
    openGraph: {
      title: programme.title,
      description: programme.tagline,
      url: `/learning-lab/programmes/${slug}`,
      images: [],
    },
  };
}

export default async function ProgrammePage({ params }: Props) {
  const { slug } = await params;
  const programme = await getPublicProgramme(slug);
  if (!programme) notFound();
  const programmes = await getPublicProgrammes();
  const closed = programme.availability.status === "closed";
  const pilotOpen = programme.availability.status === "pilot-open";
  const confirmedDetails = [
    programme.availability.startsAt
      ? `Start: ${new Date(programme.availability.startsAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" })}`
      : null,
    programme.availability.feeInr !== null
      ? `Approved fee: ₹${programme.availability.feeInr.toLocaleString("en-IN")}`
      : null,
    programme.availability.capacity !== null
      ? `Approved capacity: ${programme.availability.capacity}`
      : null,
  ].filter(Boolean);
  return (
    <>
      <LabHero
        eyebrow="Proposed programme · Adults 18+"
        title={programme.title}
        description={programme.tagline}
      >
        <a href="#demo" className="lab-button">
          Try the demonstration lesson →
        </a>
        <a href="#interest" className="lab-button lab-button-secondary">
          {closed ? "View availability" : "Register interest"}
        </a>
      </LabHero>
      <div className="lab-container">
        <div className="lab-stat-row">
          <div>
            <span>Proposed duration</span>
            <strong>{programme.duration}</strong>
          </div>
          <div>
            <span>Proposed delivery</span>
            <strong>{programme.format}</strong>
          </div>
          <div>
            <span>Availability</span>
            <strong>
              {closed
                ? "Registration of interest closed"
                : pilotOpen
                  ? "Approved pilot · enquire about joining"
                  : "Register interest · details unconfirmed"}
            </strong>
            {confirmedDetails.length > 0 && (
              <p className="lab-small">{confirmedDetails.join(" · ")}</p>
            )}
          </div>
        </div>
        <nav className="lab-anchor-links" aria-label="Programme sections">
          <a href="#audience">Who it is for</a>
          <a href="#outcomes">Learning outcomes</a>
          <a href="#syllabus">Session outline</a>
          <a href="#demo">Sample lesson</a>
          <a href="#assessment">Assessment</a>
          <a href="#certificate">Certificate criteria</a>
          <a href="#interest">Register interest</a>
        </nav>
      </div>
      <LabSection id="audience">
        <div className="lab-split">
          <div>
            <p className="lab-eyebrow">Who it is for</p>
            <h2>A focused starting point.</h2>
            <ul>
              {programme.audience.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </div>
          <div className="lab-callout">
            <h3>Before you start</h3>
            <ul>
              {programme.prerequisites.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
            <p className="lab-small">
              The proposed programme is for adults aged 18 or over. Do not submit minors’
              information.
            </p>
          </div>
        </div>
      </LabSection>
      <LabSection
        id="outcomes"
        className="lab-band"
        eyebrow="Observable learning outcomes"
        title="What you will practise producing."
      >
        <ul className="lab-prose">
          {programme.outcomes.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
        <p className="lab-small" style={{ marginTop: "1.5rem" }}>
          These are intended learning outcomes, assessed through work. They are not promises of
          employment, salary growth or business success.
        </p>
      </LabSection>
      <LabSection
        id="syllabus"
        eyebrow="Proposed syllabus"
        title="A sequence of decisions and outputs."
      >
        <ol className="lab-flow">
          {programme.sessions.map((s) => (
            <li key={s.title}>
              <div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <p>
                  <strong>Learner output:</strong> {s.output}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </LabSection>
      <LabSection
        id="demo"
        className="lab-band"
        eyebrow="Try it before registering interest"
        title="An original demonstration lesson."
      >
        <p className="lab-muted">
          A fictional learning scenario created for the Lab. You can use it without an account; it
          does not contribute to a certificate.
        </p>
        <DemoLesson programme={programme} />
      </LabSection>
      <LabSection
        id="assessment"
        eyebrow="Capstone and assessment"
        title="Work that makes your reasoning visible."
      >
        <div className="lab-callout">
          <h3>The capstone</h3>
          <p>{programme.capstone}</p>
          <p className="lab-small">
            Human instructors review assessed work. Automated lesson checks are practice feedback,
            not a final certification decision.
          </p>
        </div>
        <div className="lab-table-wrap">
          <table className="lab-table">
            <caption className="sr-only">Proposed assessment rubric</caption>
            <thead>
              <tr>
                <th scope="col">Criterion</th>
                <th scope="col">Weight</th>
                <th scope="col">What the reviewer looks for</th>
              </tr>
            </thead>
            <tbody>
              {programme.rubric.map((r) => (
                <tr key={r.criterion}>
                  <th scope="row">{r.criterion}</th>
                  <td>{r.weight}%</td>
                  <td>{r.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LabSection>
      <LabSection id="certificate" className="lab-band">
        <div className="lab-split">
          <div>
            <p className="lab-eyebrow">Proposed certificate criteria</p>
            <h2>Completion must be earned.</h2>
            <p className="lab-muted">
              A Certificate of Completion may be issued only after the approved requirements and
              instructor assessment have been met.
            </p>
            <ul>
              {programme.certificate.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <aside className="lab-callout">
            <h3>The minimum requirements</h3>
            <p>
              Attendance: {programme.certificate.attendancePercent}% or above.
              <br />
              Assessment score: {programme.certificate.minScore}% or above.
              <br />
              Required lessons: {programme.certificate.requiredLessons}.
            </p>
            <p className="lab-small">
              A Lab certificate is not a degree, recognised qualification or claim of accreditation.{" "}
              <Link href="/learning-lab/policies/certificates">
                Read the draft certificate policy.
              </Link>
            </p>
          </aside>
        </div>
      </LabSection>
      <LabSection eyebrow="The instructor" title="Founder-led, with human responsibility.">
        <div className="lab-prose">
          <p>
            Dr. Swapnil Sahoo is the founder of the Learning Lab. His background and supporting
            sources are described on the founder page. His academic appointments and prior work are
            separate from the Lab’s track record.
          </p>
          <Link href="/learning-lab/founder" className="lab-text-link">
            Read the founder profile →
          </Link>
        </div>
      </LabSection>
      <LabSection eyebrow="Ideas behind the programme" title="Read further.">
        <ul className="lab-prose">
          {programme.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.title}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </LabSection>
      <LabSection id="interest" className="lab-band">
        <div className="lab-split">
          <div>
            <p className="lab-eyebrow">Availability</p>
            <h2>
              {closed ? "Registration of interest is closed." : "Tell us you are interested."}
            </h2>
            <p className="lab-muted">
              {pilotOpen
                ? "Review the approved pilot details above and enquire about joining. Submitting an enquiry is free and does not reserve a place or create a paid enrolment."
                : "Dates, fees and capacity are not confirmed. Registering interest is free, does not reserve a place and does not create a paid enrolment."}
            </p>
            <p className="lab-small">
              Final delivery details and approved policies must be shared before any paid offer.
            </p>
            <Link href="/learning-lab/faq" className="lab-text-link">
              Practical questions →
            </Link>
          </div>
          {closed ? (
            <aside className="lab-callout">
              <h3>This programme is not accepting new enquiries.</h3>
              <p>
                Explore the other proposed programmes or use the contact page for a general
                question.
              </p>
              <Link href="/learning-lab/contact" className="lab-text-link">
                Contact the Lab →
              </Link>
            </aside>
          ) : (
            <EnquiryForm
              available={isLabServiceConfigured()}
              programmes={programmes.filter((p) => p.availability.status !== "closed")}
              programmeSlug={slug}
            />
          )}
        </div>
      </LabSection>
    </>
  );
}
