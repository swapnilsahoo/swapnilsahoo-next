import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { LinkedInIcon } from "@/components/icons/SocialIcons";
import { linkedInHighlights } from "@/features/profile/data/linkedin";
import { phdColumns, phdSupervision } from "@/features/profile/data/phd";

const responsibleAiPost = linkedInHighlights[0];

export function PhdSupervision() {
  return (
    <Reveal>
      <section id="phd" className="mx-auto max-w-6xl px-6 py-24">
        <div className="glass-card relative overflow-hidden p-8 md:p-12">
          <div className="bg-brand-500/10 absolute -top-20 -right-20 h-80 w-80 rounded-full blur-3xl" />
          <div className="bg-accent-500/10 absolute -bottom-20 -left-10 h-72 w-72 rounded-full blur-3xl" />
          <div className="relative grid items-start gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">06 / PhD supervision</p>
              <h2 className="display mb-5 text-4xl font-semibold md:text-5xl">Working with me.</h2>
              <p className="text-ink-600 dark:text-ink-300 mb-6 text-sm leading-relaxed">
                {phdSupervision.description}
              </p>
              <a href={phdSupervision.ctaHref} className="btn-primary">
                {phdSupervision.ctaLabel}
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <div className="mt-8 grid gap-3">
                <Link
                  href="/teaching/ai-hackathon#lenses-title"
                  className="border-ink-200/80 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 group rounded-2xl border bg-white/35 p-4 transition dark:bg-white/[0.025]"
                >
                  <p className="eyebrow">Research extension</p>
                  <p className="mt-2 font-serif text-lg font-semibold">AI Mini Hackathon</p>
                  <p className="text-ink-600 dark:text-ink-300 mt-1 text-xs leading-5">
                    Examine a documented PGDM learning design. Doctoral students did not attend this
                    edition.
                  </p>
                  <span className="text-brand-700 dark:text-brand-300 mt-3 inline-flex items-center gap-2 text-xs font-bold">
                    Open the PhD research lens
                    <ArrowRightIcon
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
                <a
                  href={responsibleAiPost.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-ink-200/80 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 group rounded-2xl border bg-white/35 p-4 transition dark:bg-white/[0.025]"
                >
                  <p className="eyebrow inline-flex items-center gap-2">
                    <LinkedInIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    Responsible AI field note
                  </p>
                  <p className="mt-2 font-serif text-lg font-semibold">{responsibleAiPost.title}</p>
                  <span className="text-brand-700 dark:text-brand-300 mt-3 inline-flex items-center gap-2 text-xs font-bold">
                    Read on LinkedIn
                    <ArrowRightIcon
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:col-span-7">
              {phdColumns.map((column) => (
                <div key={column.title} className="glass-card p-5">
                  <p className="eyebrow mb-2">{column.title}</p>
                  <ul className="text-ink-700 dark:text-ink-200 space-y-1.5 text-sm">
                    {column.items.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="hr-fade mx-auto max-w-6xl" />
    </Reveal>
  );
}
