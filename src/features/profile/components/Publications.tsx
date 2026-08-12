import Image from "next/image";

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
      className="pub-item glass-card mb-3 block p-6 last:mb-0"
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
            public essays about decisions facing businesses, students and policy readers. Where a
            source record is available, the item links to it.
          </p>
        </div>

        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="tag">Journal articles</span>
            <span className="hr-fade flex-1" />
          </div>
          {journalArticles.map((publication) => (
            <PublicationRow key={publication.title} publication={publication} />
          ))}
        </div>

        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="tag">Book chapters</span>
            <span className="hr-fade flex-1" />
          </div>
          {bookChapters.map((publication) => (
            <PublicationRow key={publication.title} publication={publication} />
          ))}
        </div>

        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="tag">Teaching cases</span>
            <span className="hr-fade flex-1" />
          </div>
          <p className="text-ink-500 dark:text-ink-400 mb-4 text-xs">
            Three short-form strategy cases on Indian companies, published in Business Standard
            Smart (2026).
          </p>
          <div className="grid gap-3 md:grid-cols-3">
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
        </div>

        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="tag">Authored essays</span>
            <span className="hr-fade flex-1" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
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
        </div>

        <div id="press">
          <div className="mb-4 flex items-center gap-3">
            <span className="tag">Quoted in the press</span>
            <span className="hr-fade flex-1" />
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {pressMentions.map((mention) => (
              <a
                key={mention.href}
                href={mention.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pub-item glass-card block p-5"
              >
                <p className="eyebrow mb-1">
                  {mention.outlet} · {mention.date}
                </p>
                <p className="text-sm">{mention.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <div className="hr-fade mx-auto max-w-6xl" />
    </Reveal>
  );
}
