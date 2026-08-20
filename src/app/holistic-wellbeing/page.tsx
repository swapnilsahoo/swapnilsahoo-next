import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";

const title = "Holistic Wellbeing";
const description =
  "Educational resources for personal reflection and wellbeing, beginning with an eight-week guide to relationship anxiety and attachment-related distress.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "holistic wellbeing",
    "mental wellbeing",
    "relationship anxiety reflection",
    "mental wellbeing education",
  ],
  alternates: { canonical: "/holistic-wellbeing" },
  openGraph: {
    type: "article",
    title,
    description,
    url: "/holistic-wellbeing",
  },
};

export default function HolisticWellbeingPage() {
  return (
    <main id="main-content" tabIndex={-1} className="overflow-clip">
      <header className="px-4 pt-10 pb-8 sm:px-6 sm:pt-16 lg:px-8">
        <div className="from-ink-950 via-brand-950 to-ink-900 relative isolate mx-auto max-w-[92rem] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br text-white shadow-[0_40px_120px_-48px_rgba(3,7,18,0.9)] sm:rounded-[2.5rem]">
          <div
            className="bg-emerald-400/15 absolute -top-40 -left-28 -z-10 h-[30rem] w-[30rem] rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div className="px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
            <p className="inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-emerald-100 uppercase backdrop-blur-sm">
              Practical · Reflective · Self-guided
            </p>
            <h1 className="mt-8 max-w-4xl font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.92] font-semibold tracking-[-0.03em] text-balance">
              Holistic Wellbeing
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              Resources built the same way as everything else here: grounded in real research,
              stripped of jargon, and organised so you can actually use them — not just read them.
            </p>
          </div>
        </div>
      </header>

      <section aria-labelledby="pathways-title" className="py-14 sm:py-20">
        <Container className="max-w-6xl">
          <div className="mb-10">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Start here</p>
            <h2 id="pathways-title" className="display text-4xl font-semibold sm:text-5xl">
              One resource live today.
            </h2>
          </div>

          <Link
            href="/holistic-wellbeing/mental-wellbeing"
            className="focus-visible:ring-brand-500 group glass-card block p-6 transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:outline-none sm:p-8"
          >
            <p className="eyebrow mb-2">Mental Wellbeing</p>
            <h3 className="font-serif text-2xl font-semibold sm:text-3xl">
              An eight-week guide for reflection and steadier choices.
            </h3>
            <p className="text-ink-600 dark:text-ink-300 mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
              Optional exercises informed by established therapy traditions, with a private
              check-in, a daily tracker, and clear boundaries around what self-guided material can
              and cannot do.
            </p>
            <span className="text-brand-700 dark:text-brand-300 mt-5 inline-flex items-center gap-2 text-sm font-semibold">
              Open the reflection guide
              <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>

          <p className="text-ink-500 dark:text-ink-400 mt-8 text-sm leading-relaxed">
            Physical Wellbeing is next, once it&apos;s ready to meet the same bar as this one.
          </p>
        </Container>
      </section>
    </main>
  );
}
