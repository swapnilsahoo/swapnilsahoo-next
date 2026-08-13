import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { pressMentions } from "@/features/profile/data/publications";

const title = "Press & Media — Dr. Swapnil Sahoo";
const description =
  "Media coverage and public commentary from Dr. Swapnil Sahoo on entrepreneurship, personal finance, policy and economic affairs — plus contact details for media enquiries.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Swapnil Sahoo press",
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

const outletCount = new Set(pressMentions.map((mention) => mention.outlet)).size;

function parseMentionDate(date: string): number {
  return new Date(`1 ${date}`).getTime();
}

const sortedMentions = [...pressMentions].sort(
  (a, b) => parseMentionDate(b.date) - parseMentionDate(a.date)
);

const oldestDate = pressMentions.reduce(
  (oldest, mention) => (parseMentionDate(mention.date) < parseMentionDate(oldest) ? mention.date : oldest),
  pressMentions[0].date
);
const newestDate = pressMentions.reduce(
  (newest, mention) => (parseMentionDate(mention.date) > parseMentionDate(newest) ? mention.date : newest),
  pressMentions[0].date
);

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
                  In the media
                </span>
                <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
                  Press &amp; <span className="text-brand-200 font-normal italic">media.</span>
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
                  Commentary and interviews for national outlets on entrepreneurship, personal
                  finance, economic policy and public affairs — the questions I get asked when the
                  audience is the general public, not a classroom.
                </p>
              </div>

              <dl className="grid gap-3">
                {[
                  ["Mentions", String(pressMentions.length)],
                  ["Outlets", String(outletCount)],
                  ["Coverage", oldestDate === newestDate ? oldestDate : `${oldestDate} – ${newestDate}`],
                ].map(([term, detail]) => (
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
        title="Two questions worth asking of any expert quote in the news."
        questions={[
          "Does this quote survive being read a year later, once the news cycle has moved on?",
          "Would the same explanation hold up in a classroom, not just a thirty-second clip?",
        ]}
      />

      <section aria-labelledby="mentions-title" className="py-14 sm:py-20">
        <Container className="max-w-4xl">
          <div className="mb-10">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Selected coverage</p>
            <h2 id="mentions-title" className="display text-4xl font-semibold sm:text-5xl">
              Quoted in the press.
            </h2>
          </div>

          <ol role="list" className="space-y-3">
            {sortedMentions.map((mention) => (
              <li key={mention.href}>
                <a
                  href={mention.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pub-item glass-card group flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6"
                >
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-serif text-lg font-semibold sm:text-xl">
                        {mention.outlet}
                      </span>
                      <span className="tag tag-ink">{mention.date}</span>
                    </span>
                    <span className="text-ink-600 dark:text-ink-300 mt-2 block text-sm leading-relaxed sm:text-base">
                      {mention.description}
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
            <a href="mailto:swapnil.sahoo@greatlakes.edu.in" className="btn-primary shrink-0">
              Email for an interview
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
