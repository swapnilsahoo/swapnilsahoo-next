import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Reveal } from "@/components/ui/Reveal";
import {
  authoredEssays,
  bookChapters,
  journalArticles,
  pressMentions,
  teachingCases,
} from "@/features/profile/data/publications";
import type { Publication } from "@/features/profile/types";

function PublicationRow({ publication }: { publication: Publication }) {
  return (
    <a
      href={publication.href}
      target="_blank"
      rel="noopener noreferrer"
      className="pub-item glass-card block p-6"
    >
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
    </a>
  );
}

const stats = [
  ["Research & chapters", journalArticles.length + bookChapters.length],
  ["Case studies", teachingCases.length],
  ["Essays", authoredEssays.length],
  ["Press mentions", pressMentions.length],
] as const;

const latestMention = pressMentions[0];

export function Publications() {
  return (
    <Reveal>
      <section id="publications" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">03 / Selected publications</p>
            <h2 className="display text-4xl font-semibold md:text-5xl">
              Research, cases and public questions.
            </h2>
          </div>
          <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed md:col-span-8">
            My writing moves from research on organisations under constraint to teaching cases and
            public essays about decisions facing businesses, students and policy readers, plus the
            interviews national outlets have carried. The complete record — every article, case,
            essay and press mention — lives on the Press &amp; Media page.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(([label, count]) => (
            <div key={label} className="glass-card p-4 text-center">
              <p className="display text-3xl font-semibold">{count}</p>
              <p className="text-ink-500 dark:text-ink-400 mt-1 text-xs">{label}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <PublicationRow publication={journalArticles[0]} />
          <a
            href={latestMention.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pub-item glass-card block p-6"
          >
            <p className="eyebrow mb-1">
              {latestMention.outlet} · {latestMention.date}
            </p>
            <p className="font-serif text-lg leading-snug font-semibold">
              {latestMention.description}
            </p>
            <p className="text-ink-500 dark:text-ink-400 mt-2 text-xs">Most recent press mention</p>
          </a>
        </div>

        <Link
          href="/press"
          className="focus-visible:ring-brand-500 group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 focus-visible:ring-2 focus-visible:outline-none dark:text-brand-300"
        >
          See every publication, case, essay and press mention
          <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </section>
      <div className="hr-fade mx-auto max-w-6xl" />
    </Reveal>
  );
}
