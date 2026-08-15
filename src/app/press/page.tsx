import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import {
  authoredEssays,
  bookChapters,
  journalArticles,
  linkedInArticles,
  pressMentions,
  teachingCases,
  type PressMention,
} from "@/features/profile/data/publications";
import type { Publication } from "@/features/profile/types";

const title = "Press & Media — Dr. Swapnil Sahoo";
const description =
  "Research publications, teaching cases, authored essays and media coverage from Dr. Swapnil Sahoo — entrepreneurship, strategy, personal finance and public policy.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Swapnil Sahoo press",
    "Swapnil Sahoo publications",
    "media commentary",
    "economic commentary India",
    "Great Lakes Institute of Management media",
  ],
  alternates: { canonical: "/press" },
  openGraph: {
    type: "profile",
    title,
    description,
    url: "/press",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

function parseMonthYear(date: string): number {
  return new Date(`1 ${date}`).getTime();
}

const sortedMentions = [...pressMentions].sort(
  (a, b) => parseMonthYear(b.date) - parseMonthYear(a.date)
);
const oldestDate = pressMentions.reduce(
  (oldest, m) => (parseMonthYear(m.date) < parseMonthYear(oldest) ? m.date : oldest),
  pressMentions[0].date
);
const newestDate = pressMentions.reduce(
  (newest, m) => (parseMonthYear(m.date) > parseMonthYear(newest) ? m.date : newest),
  pressMentions[0].date
);
const outletCount = new Set(pressMentions.map((m) => m.outlet)).size;

const heroStats = [
  ["Research & chapters", String(journalArticles.length + bookChapters.length)],
  ["Case studies", String(teachingCases.length)],
  ["Essays", String(authoredEssays.length + linkedInArticles.length)],
  ["Press mentions", String(pressMentions.length)],
] as const;

function PublicationRow({ publication }: { publication: Publication }) {
  const content = (
    <div className="flex flex-wrap items-start justify-between gap-4">
      {publication.image && (
        <Image
          src={publication.image}
          alt={publication.imageAlt ?? `${publication.title} — published page`}
          width={56}
          height={72}
          className="border-ink-200/80 dark:border-ink-700 h-18 w-14 shrink-0 rounded-md border object-cover"
        />
      )}
      <div className="min-w-[260px] flex-1">
        <h3 className="font-serif text-lg leading-snug font-semibold">{publication.title}</h3>
        <p className="text-ink-600 dark:text-ink-300 mt-1 text-sm italic">{publication.meta}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="tag tag-ink">{publication.year}</span>
        {publication.badge && <span className="tag tag-emerald">{publication.badge}</span>}
      </div>
    </div>
  );

  if (!publication.href) {
    return <div className="pub-item glass-card mb-3 block p-6 last:mb-0">{content}</div>;
  }

  return (
    <a
      href={publication.href}
      target="_blank"
      rel="noopener noreferrer"
      className="pub-item glass-card mb-3 block p-6 last:mb-0"
    >
      {content}
    </a>
  );
}

function MentionRow({ mention }: { mention: PressMention }) {
  const content = (
    <>
      <span className="min-w-0">
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-serif text-lg font-semibold sm:text-xl">{mention.outlet}</span>
          <span className="tag tag-ink">{mention.date}</span>
        </span>
        <span className="text-ink-600 dark:text-ink-300 mt-2 block text-sm leading-relaxed sm:text-base">
          {mention.description}
        </span>
      </span>
      {mention.href && (
        <ArrowRightIcon
          className="text-brand-700 dark:text-brand-300 h-5 w-5 shrink-0 transition group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (!mention.href) {
    return (
      <div className="pub-item glass-card flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
        {content}
      </div>
    );
  }

  return (
    <a
      href={mention.href}
      target="_blank"
      rel="noopener noreferrer"
      className="pub-item glass-card group flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6"
    >
      {content}
    </a>
  );
}

export default function PressPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <header className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="text-ink-500 mb-5 flex flex-wrap items-center gap-2 text-xs"
          >
            <Link href="/" className="transition hover:text-blue-700 dark:hover:text-blue-300">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              Press &amp; Media
            </span>
          </nav>

          <div
            data-page-hero="academic"
            className="from-ink-950 via-brand-900 to-ink-800 relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14"
          >
            <div
              className="bg-accent-400/20 absolute -top-28 -right-24 -z-10 h-80 w-80 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="bg-brand-400/20 absolute -bottom-36 -left-20 -z-10 h-96 w-96 rounded-full blur-3xl"
              aria-hidden="true"
            />

            <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.42fr]">
              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-blue-100 uppercase backdrop-blur-sm">
                  The complete record
                </span>
                <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
                  Press &amp; <span className="text-brand-200 font-normal italic">media.</span>
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
                  Everything published under my name in one place — research articles and book
                  chapters, teaching cases, essays for a general audience, and the interviews and
                  quotes national outlets have carried.
                </p>
              </div>

              <dl className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                {heroStats.map(([term, detail]) => (
                  <div key={term} className="rounded-2xl border border-white/15 bg-white/8 p-4 backdrop-blur-sm">
                    <dt className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                      {term}
                    </dt>
                    <dd className="mt-1 font-serif text-xl font-semibold text-white">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="press-inquiry"
        title="Two questions worth asking of anything published under a name."
        questions={[
          "Does this still hold up once the news cycle — or the semester — has moved on?",
          "Would the same explanation survive being read by the person it's actually about?",
        ]}
      />

      <section aria-labelledby="research-title" className="py-14 sm:py-20">
        <Container className="max-w-4xl">
          <div className="mb-8">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">01 / Research publications</p>
            <h2 id="research-title" className="display text-4xl font-semibold sm:text-5xl">
              Journal articles.
            </h2>
          </div>
          {journalArticles.map((publication) => (
            <PublicationRow key={publication.title} publication={publication} />
          ))}
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="chapters-title" className="py-14 sm:py-20">
        <Container className="max-w-4xl">
          <div className="mb-8">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Book chapters</p>
            <h2 id="chapters-title" className="display text-4xl font-semibold sm:text-5xl">
              Edited volumes.
            </h2>
          </div>
          {bookChapters.map((publication) => (
            <PublicationRow key={publication.title} publication={publication} />
          ))}
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="cases-title" className="py-14 sm:py-20">
        <Container className="max-w-4xl">
          <div className="mb-8">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">03 / Case studies</p>
            <h2 id="cases-title" className="display text-4xl font-semibold sm:text-5xl">
              Short-form strategy cases.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
              Three cases on Indian companies, published in Business Standard Smart (2026).
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {teachingCases.map((teachingCase) => (
              <div key={teachingCase.title} className="glass-card p-5">
                <p className="eyebrow mb-2">Case · {teachingCase.year}</p>
                <h3 className="font-serif text-base leading-snug font-semibold">
                  {teachingCase.title}
                </h3>
                <p className="text-ink-500 dark:text-ink-400 mt-2 text-xs">
                  {teachingCase.publication}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="essays-title" className="py-14 sm:py-20">
        <Container className="max-w-4xl">
          <div className="mb-8">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">04 / Authored essays</p>
            <h2 id="essays-title" className="display text-4xl font-semibold sm:text-5xl">
              Writing for a general audience.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {authoredEssays.map((essay) => (
              <a
                key={essay.href}
                href={essay.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pub-item glass-card block p-5"
              >
                <p className="eyebrow mb-1">
                  {essay.outlet} · {essay.date}
                </p>
                <p className="font-serif text-sm font-semibold">{essay.title}</p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="linkedin-title" className="py-14 sm:py-20">
        <Container className="max-w-4xl">
          <div className="mb-8">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">05 / LinkedIn writing</p>
            <h2 id="linkedin-title" className="display text-4xl font-semibold sm:text-5xl">
              A public record of thinking out loud.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
              {linkedInArticles.length} long-form articles published on LinkedIn since 2014 — from
              early writing on banking, telecom and enterprise mobility to a 2026 series on
              artificial intelligence and a handful of essays on language and perspective.
            </p>
          </div>
          <ol role="list" className="space-y-3">
            {linkedInArticles.map((article) => (
              <li key={article.href}>
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pub-item glass-card group flex flex-wrap items-center justify-between gap-4 p-5"
                >
                  <span className="min-w-0">
                    <span className="font-serif text-base leading-snug font-semibold sm:text-lg">
                      {article.title}
                    </span>
                    <span className="text-ink-500 dark:text-ink-400 mt-1 block text-xs">
                      {article.outlet} · {article.date}
                    </span>
                  </span>
                  <ArrowRightIcon
                    className="text-brand-700 dark:text-brand-300 h-5 w-5 shrink-0 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="mentions-title" className="py-14 sm:py-20">
        <Container className="max-w-4xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">06 / Quoted in the press</p>
              <h2 id="mentions-title" className="display text-4xl font-semibold sm:text-5xl">
                Media coverage.
              </h2>
            </div>
            <p className="text-ink-500 dark:text-ink-400 text-xs">
              {pressMentions.length} mentions · {outletCount} outlets ·{" "}
              {oldestDate === newestDate ? oldestDate : `${oldestDate} – ${newestDate}`}
            </p>
          </div>

          <ol role="list" className="space-y-3">
            {sortedMentions.map((mention) => (
              <li key={`${mention.outlet}-${mention.date}-${mention.description}`}>
                <MentionRow mention={mention} />
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="inquiries-title" className="py-14 sm:py-20">
        <Container className="max-w-4xl">
          <div className="glass-card flex flex-wrap items-center justify-between gap-6 p-6 sm:p-8">
            <div>
              <p className="eyebrow mb-2">Media enquiries</p>
              <h2 id="inquiries-title" className="font-serif text-2xl font-semibold sm:text-3xl">
                Working on a story that needs an academic or industry view?
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-3 max-w-xl text-sm leading-relaxed sm:text-base">
                I&apos;m generally available for comment on entrepreneurship, strategy, personal
                finance and economic policy, with reasonable turnaround for deadline-driven
                requests.
              </p>
            </div>
            <a href="mailto:swapnil.s@greatlakes.edu.in" className="btn-primary shrink-0">
              Email for an interview
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
