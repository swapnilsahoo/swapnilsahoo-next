import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import {
  formatCampaignDate,
  getWeeklyNotesNow,
  learningCampaign,
  weeklyNotes,
  weeklyNotesPath,
} from "@/features/learning-lab/weekly-notes";

// Pilot availability uses each request's server clock, not a build date.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "30 Days of Free Learning Practice",
  description:
    "All four free worked examples are available now: pricing, AI task briefs, customer questions and strategic trade-offs. Learn at your own pace.",
  alternates: {
    canonical: weeklyNotesPath,
    types: { "application/rss+xml": `${weeklyNotesPath}/feed.xml` },
  },
  openGraph: {
    title: "30 days of practical learning",
    description:
      "All four free worked examples are open: try a decision, explain your reasoning and learn at your own pace.",
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
        title="Four practical decisions. Start anywhere."
        description="All four worked examples are available now. Work through a small business problem, explain your reasoning and test one assumption. Choose your own pace; no account or paid software is required."
      >
        <a href="#calendar" className="lab-button">
          Choose a practice
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
            Use the open calculator, keep a short recommendation in your own notes and compare it
            with the worked example. These figures are invented for practice.
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
        eyebrow="All four available now"
        title="Choose a question. Make something useful."
      >
        <div className="lab-grid">
          {weeklyNotes.map((note, index) => (
            <article className="lab-card" key={note.slug}>
              <p className="lab-eyebrow">Practice {index + 1} · Available now</p>
              <h3>{note.title}</h3>
              <p>
                Published{" "}
                <time dateTime={note.publishesAt}>{formatCampaignDate(note.publishesAt)}</time>
              </p>
              <p>{note.summary}</p>
              <Link href={`${weeklyNotesPath}/${note.slug}`} className="lab-text-link">
                Read and practise →
              </Link>
              <p className="lab-small">
                <Link
                  href={`/learning-lab/free-courses/${note.lessonSlug}`}
                  className="lab-text-link"
                >
                  {note.lessonLabel} →
                </Link>
              </p>
            </article>
          ))}
        </div>
      </LabSection>
      <LabSection eyebrow="Keep the habit" title="A suggested 30-day learning rhythm.">
        <p>
          Every example is open now. Follow this optional weekly rhythm or work at your own pace.
        </p>
        <ol className="lab-prose">
          <li>
            <strong>20–26 October:</strong> try the calculator and write a pricing decision. The
            first worked example helps you check contribution, break-even and capacity together.
          </li>
          <li>
            <strong>27 October–2 November:</strong> draft an AI task brief, test an awkward request
            and revise one instruction using the second worked example.
          </li>
          <li>
            <strong>3–9 November:</strong> create five neutral customer questions. Separate evidence
            from interpretation using the third worked example.
          </li>
          <li>
            <strong>10–18 November:</strong> practise a strategic trade-off and compare your
            reasoning with your first attempt using the fourth worked example. The voluntary pilot
            closes on 18 November.
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
            Bookmark this page, or add the RSS feed to your preferred feed reader. It lists each of
            the four published notes. RSS is a feed subscription, not an email signup.
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
