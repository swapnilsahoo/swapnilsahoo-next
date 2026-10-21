import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import {
  formatCampaignDate,
  getPublishedWeeklyNote,
  getPublishedWeeklyNotes,
  getWeeklyNotesNow,
  weeklyNotesPath,
} from "@/features/learning-lab/weekly-notes";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getPublishedWeeklyNote(slug);
  if (!note)
    return { title: "Learning note not available", robots: { index: false, follow: true } };
  return {
    title: note.title,
    description: note.summary,
    alternates: {
      canonical: `${weeklyNotesPath}/${note.slug}`,
      types: { "application/rss+xml": `${weeklyNotesPath}/feed.xml` },
    },
    authors: [{ name: "Dr. Swapnil Sahoo" }],
    openGraph: {
      type: "article",
      title: note.title,
      description: note.summary,
      url: `${weeklyNotesPath}/${note.slug}`,
      publishedTime: note.publishesAt,
      images: [],
    },
    twitter: { card: "summary", title: note.title, description: note.summary, images: [] },
  };
}

export default async function WeeklyNotePage({ params }: Props) {
  const { slug } = await params;
  const now = getWeeklyNotesNow();
  const note = getPublishedWeeklyNote(slug, now);
  if (!note) notFound();
  const otherNotes = getPublishedWeeklyNotes(now).filter((item) => item.slug !== note.slug);
  return (
    <>
      <LabHero
        eyebrow="Free weekly practice · Original fictional example"
        title={note.title}
        description={note.summary}
      >
        <Link href={weeklyNotesPath} className="lab-text-link">
          ← All four practices
        </Link>
      </LabHero>
      <article className="lab-container lab-prose" aria-label={note.title}>
        <p className="lab-small">
          By Dr. Swapnil Sahoo · Published{" "}
          <time dateTime={note.publishesAt}>{formatCampaignDate(note.publishesAt)}</time> · About 5
          minutes plus practice
        </p>
        {note.sections.map((section) => (
          <section key={section.heading} className="lab-section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
      <LabSection
        className="lab-band"
        eyebrow="Your turn"
        title="Make an attempt before reading your notes again."
      >
        <div className="lab-prose">
          <p>{note.task}</p>
          <Link href={`/learning-lab/free-courses/${note.lessonSlug}`} className="lab-button">
            {note.lessonLabel} →
          </Link>
          <h3 style={{ marginTop: "1.5rem" }}>Check your reasoning</h3>
          <ul>
            {note.selfCheck.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="lab-small">
            Keep your work on your own device. This reading page does not collect an answer or
            record completion.
          </p>
        </div>
      </LabSection>
      <LabSection title="Continue learning.">
        <div className="lab-prose">
          {otherNotes.map((item) => (
            <p key={item.slug}>
              <Link className="lab-text-link" href={`${weeklyNotesPath}/${item.slug}`}>
                {item.title} →
              </Link>
            </p>
          ))}
          <p>
            <Link className="lab-text-link" href={weeklyNotesPath}>
              See all four practices →
            </Link>
          </p>
          <p>
            <Link className="lab-text-link" href="/learning-lab/pilot">
              Help improve a free lesson through the voluntary pilot →
            </Link>
          </p>
        </div>
      </LabSection>
    </>
  );
}
