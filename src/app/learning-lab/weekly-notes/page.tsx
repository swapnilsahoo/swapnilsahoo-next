import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import {
  formatCampaignDate,
  getWeeklyNotesNow,
  isWeeklyNotePublished,
  learningCampaign,
  weeklyNotes,
  weeklyNotesPath,
} from "@/features/learning-lab/weekly-notes";

// The release calendar must use each request's server clock, not a build date.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "30 Days of Free Learning Practice",
  description:
    "A free 20 October–18 November 2026 practice series: four weekly worked examples, open lesson tools and a voluntary adult learning pilot.",
  alternates: {
    canonical: weeklyNotesPath,
    types: { "application/rss+xml": `${weeklyNotesPath}/feed.xml` },
  },
  openGraph: {
    title: "30 days of practical learning",
    description:
      "Try one decision, explain your reasoning and return for the next free worked example.",
    url: weeklyNotesPath,
    images: [],
  },
  twitter: {
    card: "summary",
    title: "30 days of practical learning",
    description: "Four free weekly worked examples in strategy, applied AI and entrepreneurship.",
    images: [],
  },
};

export default function WeeklyNotesPage() {
  const now = getWeeklyNotesNow();
  const pilotOpen =
    now >= Date.parse(learningCampaign.startsAt) && now <= Date.parse(learningCampaign.endsAt);
  return (
    <>
      <LabHero
        eyebrow="20 October–18 November 2026 · Free · For adults"
        title="One practical decision each week."
        description="Work through a small business problem, explain your reasoning and test one assumption. Four original worked examples arrive here on Fridays at 9 am IST. No account or paid software is required."
      >
        <a href="#start" className="lab-button">
          Start the first challenge
        </a>
        <Link href="/learning-lab/pilot" className="lab-button lab-button-secondary">
          {pilotOpen ? "Try the voluntary pilot" : "Pilot information"}
        </Link>
      </LabHero>
      <LabSection
        id="start"
        eyebrow="Start now"
        title="Can a discount make a busy business lose money?"
      >
        <div className="lab-prose">
          <p>
            A fictional lunch business charges ₹150, spends ₹90 per lunch and has ₹12,000 monthly
            fixed costs. It can make 300 lunches. Try a ₹120 price: how many lunches would cover the
            listed costs, and can the kitchen make that many?
          </p>
          <p>
            Use the open calculator, keep a short recommendation in your own notes and return for
            the worked example. These figures are invented for practice.
          </p>
          <Link
            href="/learning-lab/free-courses/read-your-unit-economics#course-tool"
            className="lab-text-link"
          >
            Try the break-even calculator →
          </Link>
        </div>
      </LabSection>
      <LabSection
        id="calendar"
        className="lab-band"
        eyebrow="Your four-week route"
        title="A short example. A useful output. A reason to return."
      >
        <div className="lab-grid">
          {weeklyNotes.map((note, index) => {
            const published = isWeeklyNotePublished(note, now);
            return (
              <article className="lab-card" key={note.slug}>
                <p className="lab-eyebrow">
                  Week {index + 1} · {published ? "Available" : "Scheduled"}
                </p>
                <h3>{note.title}</h3>
                <p>
                  <time dateTime={note.publishesAt}>{formatCampaignDate(note.publishesAt)}</time> ·
                  9 am IST
                </p>
                <p>{note.summary}</p>
                {published ? (
                  <Link href={`${weeklyNotesPath}/${note.slug}`} className="lab-text-link">
                    Read and practise →
                  </Link>
                ) : (
                  <p className="lab-small">
                    The worked example opens here at the time shown. You can use the free lesson
                    now.
                  </p>
                )}
                <p className="lab-small">
                  <Link
                    href={`/learning-lab/free-courses/${note.lessonSlug}`}
                    className="lab-text-link"
                  >
                    {note.lessonLabel} →
                  </Link>
                </p>
              </article>
            );
          })}
        </div>
      </LabSection>
      <LabSection eyebrow="Keep the habit" title="A simple 30-day timeline.">
        <ol className="lab-prose">
          <li>
            <strong>20–26 October:</strong> try the calculator and write a pricing decision. The
            first worked example opens on 23 October.
          </li>
          <li>
            <strong>27 October–2 November:</strong> draft an AI task brief, test an awkward request
            and revise one instruction. The second example opens on 30 October.
          </li>
          <li>
            <strong>3–9 November:</strong> create five neutral customer questions. Separate evidence
            from interpretation. The third example opens on 6 November.
          </li>
          <li>
            <strong>10–18 November:</strong> practise a strategic trade-off and compare your
            reasoning with your first attempt. The fourth example opens on 13 November. The
            voluntary pilot closes on 18 November.
          </li>
        </ol>
        <p className="lab-small">
          The lessons and published notes remain available after the series. This is a self-paced
          learning route; it does not include a scheduled live class, assessment service or
          certificate.
        </p>
      </LabSection>
      <LabSection
        className="lab-band"
        eyebrow="Return when it suits you"
        title="Follow the series without an account."
      >
        <div className="lab-prose">
          <p>
            Bookmark this page, or add the RSS feed to your preferred feed reader. It lists each
            note when it is released. RSS is a feed subscription, not an email signup.
          </p>
          <a href={`${weeklyNotesPath}/feed.xml`} className="lab-text-link">
            Open the RSS feed →
          </a>
          <p>
            {pilotOpen
              ? "If you would like to help improve the instructions, the adult volunteer pilot takes about 20–30 minutes. Participation and follow-up are optional."
              : "The dated pilot participation window ends on 18 November 2026. The free lessons and published worked examples remain available afterwards."}
          </p>
          <Link href="/learning-lab/pilot" className="lab-text-link">
            See the volunteer pilot →
          </Link>
        </div>
      </LabSection>
    </>
  );
}
