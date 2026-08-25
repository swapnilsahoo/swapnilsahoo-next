import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRightIcon, SparkIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { sideQuests } from "@/features/profile/data/side-quests";

export const metadata: Metadata = {
  title: "Side Quests: Prototypes Outside the Classroom | Swapnil Sahoo",
  description:
    "Personal AI prototypes I build outside the syllabus, starting with AI Viva Bot — a live beta oral-exam simulator open for public testing.",
  keywords: [
    "AI Viva Bot",
    "side projects",
    "AI prototypes",
    "beta testing",
    "Great Lakes Gurgaon",
    "AI Mini Hackathon",
  ],
  alternates: {
    canonical: "/ai-initiatives/ai-hackathon/side-quests",
  },
  openGraph: {
    type: "article",
    title: "Side Quests: Prototypes Outside the Classroom",
    description:
      "Personal AI prototypes built outside the syllabus, starting with a live beta open for public testing.",
    url: "/ai-initiatives/ai-hackathon/side-quests",
  },
};

export default function SideQuestsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <header className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-[87.5rem]">
          <Link
            href="/ai-initiatives/ai-hackathon"
            className="text-ink-500 dark:text-ink-400 hover:text-brand-700 dark:hover:text-brand-400 mb-6 inline-flex items-center gap-2 text-xs font-medium"
          >
            <ArrowRightIcon className="h-3 w-3 rotate-180" aria-hidden="true" />
            Back to AI Mini Hackathon
          </Link>

          <span className="accent-rule" />
          <p className="eyebrow mb-3">Side Quests</p>
          <h1 className="display text-4xl font-semibold text-balance sm:text-6xl">
            Prototypes I build for the same reason I ask students to build.
          </h1>
          <p className="text-ink-600 dark:text-ink-300 mt-6 max-w-3xl text-base leading-relaxed sm:text-lg">
            Running the AI Mini Hackathon left me with the same itch I hand to students every
            term: stop talking about what GenAI could do, and ship something that has to work when
            a real person opens it. This is where those personal, off-syllabus builds live — each
            one a live beta, not a finished product, each one needing people willing to try to
            break it.
          </p>
        </Container>
      </header>

      <section aria-label="Side quests" className="pb-20 sm:pb-28">
        <Container className="max-w-[87.5rem]">
          <div className="grid gap-8">
            {sideQuests.map((quest) => (
              <article
                key={quest.slug}
                id={quest.slug}
                className="from-brand-50 to-accent-400/10 dark:from-brand-900/30 dark:to-accent-400/5 border-brand-200/60 dark:border-brand-700/40 relative overflow-hidden rounded-[24px] border bg-gradient-to-br p-7 sm:p-10"
              >
                <div
                  className="bg-brand-500/10 absolute -top-24 -right-16 h-72 w-72 rounded-full blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <div className="bg-brand-600 flex h-11 w-11 items-center justify-center rounded-xl text-white">
                      <SparkIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="tag tag-amber">{quest.status}</span>
                  </div>

                  <p className="eyebrow">{quest.eyebrow}</p>
                  <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                    {quest.title}
                  </h2>
                  <p className="text-ink-800 dark:text-ink-100 mt-2 text-sm font-medium sm:text-base">
                    {quest.tagline}
                  </p>
                  <p className="text-ink-700 dark:text-ink-200 mt-4 max-w-3xl text-sm leading-relaxed sm:text-base">
                    {quest.description}
                  </p>

                  <ul className="text-ink-700 dark:text-ink-200 mt-6 grid gap-3 text-sm sm:grid-cols-2">
                    {quest.features.map((feature) => (
                      <li
                        key={feature}
                        className="border-brand-200/50 dark:border-brand-700/40 flex items-start gap-3 rounded-xl border bg-white/50 p-3 dark:bg-white/[0.03]"
                      >
                        <span
                          className="bg-accent-500 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <p className="eyebrow mb-4">How to actually help</p>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {quest.testAsks.map((ask, index) => (
                        <div key={ask.title} className="glass-card p-5">
                          <p className="text-brand-600 dark:text-brand-300 font-mono text-sm">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-3 font-serif text-base font-semibold">{ask.title}</p>
                          <p className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-relaxed">
                            {ask.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                      href={quest.href}
                      target={quest.external ? "_blank" : undefined}
                      rel={quest.external ? "noopener noreferrer" : undefined}
                      className="bg-brand-600 hover:bg-brand-700 focus-visible:ring-brand-500 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      Try the beta
                      <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                      {quest.external ? (
                        <span className="sr-only"> (opens in a new tab)</span>
                      ) : null}
                    </a>
                    <Link
                      href="/#contact"
                      className="text-brand-700 dark:text-brand-400 link-underline inline-flex items-center gap-1 text-sm font-medium"
                    >
                      Send feedback my way
                      <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                  <p className="text-ink-500 dark:text-ink-400 mt-4 text-xs leading-relaxed">
                    Beta software: expect rough edges, and please don&apos;t submit anything
                    sensitive or confidential while it&apos;s at this stage.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
