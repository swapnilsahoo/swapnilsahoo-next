import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { logicPuzzles } from "@/features/placements/data/logic-puzzles";

export const metadata: Metadata = {
  title: "Logic & Puzzle Interview Questions",
  description:
    "Ten classic logic and lateral-thinking puzzles used in placement interviews, with what each one is actually scoring beyond the final answer — decomposition, information preservation, and the ability to explain your reasoning out loud.",
  keywords: [
    "logic puzzles interview",
    "brain teaser interview questions MBA",
    "lateral thinking interview",
    "12 coins puzzle",
    "manhole cover interview question",
  ],
  alternates: { canonical: "/placements/logic-and-puzzles" },
  openGraph: {
    type: "article",
    title: "Logic & Puzzle Interview Questions",
    description:
      "Ten classic interview puzzles, with what each is actually scoring beyond the final answer.",
    url: "/placements/logic-and-puzzles",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Logic & Puzzle Interview Questions",
  headline: "Ten classic interview puzzles and what each is actually scoring",
  learningResourceType: "Interview preparation guide",
  educationalLevel: "Postgraduate / MBA",
  publisher: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

export default function LogicAndPuzzlesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <header className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-20">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-[min(100%,120rem)]">
          <nav
            aria-label="Breadcrumb"
            className="text-ink-500 mb-5 flex flex-wrap items-center gap-2 text-xs"
          >
            <Link href="/" className="transition hover:text-blue-700 dark:hover:text-blue-300">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/placements"
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              Placement Assistance
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              Logic &amp; Puzzles
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
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-blue-100 uppercase backdrop-blur-sm">
              Placement readiness · Logic &amp; puzzles
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              The answer is{" "}
              <span className="text-brand-200 font-normal italic">not the point.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Nobody is scoring whether you happen to already know the twelve-coins answer. They
              are watching how you decompose a problem you&apos;ve never seen, what you do when
              your first idea doesn&apos;t work, and whether you can explain your reasoning
              clearly enough for someone else to follow it.
            </p>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="puzzle-inquiry"
        eyebrow="Before you start"
        title="If you got stuck halfway through, would you say so out loud — or go quiet and hope the interviewer waits?"
        questions={[
          "When your first approach to a puzzle turns out wrong, do you narrate the correction or start over silently?",
          "Could you explain your solution to someone who hasn't seen the puzzle before, in a way they'd actually follow?",
        ]}
      />

      <section aria-labelledby="puzzles-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">01 / Ten puzzles</p>
            <h2 id="puzzles-title" className="display text-4xl font-semibold md:text-5xl">
              Work each one before reading what it&apos;s scoring.
            </h2>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2">
            {logicPuzzles.map((puzzle, index) => (
              <li key={puzzle.id} className="glass-card p-6">
                <div className="flex items-start gap-3">
                  <span className="bg-brand-600 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed">
                    {puzzle.prompt}
                  </p>
                </div>
                <div className="border-ink-200/80 dark:border-ink-700 mt-4 border-t pt-3">
                  <p className="text-ink-500 dark:text-ink-400 text-xs font-semibold tracking-wide uppercase">
                    What it&apos;s scoring
                  </p>
                  <p className="text-ink-600 dark:text-ink-300 mt-1.5 text-xs leading-relaxed">
                    {puzzle.scoreOn}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">Continue practising</p>
              <h2 id="continue-title" className="display text-4xl font-semibold">
                Same muscle, different exercise.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/placements/guesstimates"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Estimation</p>
                <h3 className="font-serif text-2xl font-semibold">Guesstimates</h3>
              </Link>
              <Link
                href="/placements/case-interview-bank"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Case practice</p>
                <h3 className="font-serif text-2xl font-semibold">Case Interview Bank</h3>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
