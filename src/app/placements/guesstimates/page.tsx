import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";

import { GuesstimateExplorer } from "./GuesstimateExplorer";

export const metadata: Metadata = {
  title: "Guesstimates: Define, Decompose, Estimate, Sanity-Check",
  description:
    "A simple, repeatable method for guesstimate questions in case interviews, with three fully worked examples showing every assumption and every step of the arithmetic.",
  keywords: [
    "guesstimates",
    "market sizing",
    "estimation case interview",
    "consulting case prep",
    "MBA placements",
    "demand-side estimate",
    "supply-side estimate",
  ],
  alternates: { canonical: "/placements/guesstimates" },
  openGraph: {
    type: "article",
    title: "Guesstimates: Define, Decompose, Estimate, Sanity-Check",
    description:
      "A repeatable estimation method, with three fully worked examples and every assumption shown.",
    url: "/placements/guesstimates",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Guesstimates: Define, Decompose, Estimate, Sanity-Check",
  headline: "A repeatable estimation method with three fully worked examples",
  learningResourceType: "Method guide",
  educationalLevel: "Postgraduate / MBA",
  publisher: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

const methodSteps = [
  {
    number: "01",
    title: "Define",
    description:
      "State exactly what you are estimating — the metric, the geography, the time period and what is explicitly excluded. Most guesstimates go wrong here, before any arithmetic starts.",
  },
  {
    number: "02",
    title: "Decompose",
    description:
      "Choose a demand-side route (population × behaviour × rate) or a supply-side route (capacity × utilisation), whichever the case facts support better. Say out loud which one you're choosing and why.",
  },
  {
    number: "03",
    title: "Estimate",
    description:
      "Use round numbers you can defend, state every assumption as you make it, and keep the arithmetic simple enough to do in your head or on paper without a calculator.",
  },
  {
    number: "04",
    title: "Sanity-check",
    description:
      "Ask whether the final number feels plausible against something you already know. If possible, triangulate with a second, independent route to the same answer.",
  },
] as const;

const commonMistakes = [
  "Skipping the definition step and estimating the wrong thing precisely.",
  "Hiding assumptions inside the arithmetic instead of stating them out loud.",
  "Using false precision — a guesstimate answered as '₹14,872 crore' signals you don't understand what an estimate is.",
  "Never sanity-checking the final number against something you already know.",
] as const;

export default function GuesstimatesPage() {
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
        <Container className="max-w-[100rem]">
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
              Guesstimates
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

            <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.4fr]">
              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-blue-100 uppercase backdrop-blur-sm">
                  Placement readiness · Guesstimates
                </span>
                <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
                  Nobody expects the{" "}
                  <span className="text-brand-200 font-normal italic">exact number.</span>
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
                  A guesstimate tests whether you can build a defensible number from visible
                  assumptions, not whether you happen to know the real figure. Four steps, applied
                  consistently, get you most of the way there — with three fully worked examples
                  below showing every assumption out loud.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#worked-examples"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    See the worked examples
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#method"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    Read the method
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur-sm">
                <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                  The method
                </p>
                <p className="mt-3 font-serif text-lg font-semibold">
                  Define → Decompose → Estimate → Sanity-check
                </p>
                <div className="my-4 h-px bg-white/15" />
                <p className="text-xs leading-relaxed text-white/70">
                  3 fully worked examples, every assumption shown.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="guesstimate-inquiry"
        eyebrow="Before you start multiplying"
        title="An estimate is only as strong as its weakest visible assumption."
        questions={[
          "Which single assumption, if wrong, would change your answer by 10x rather than 10%?",
          "Would a stranger be able to redo your arithmetic from what you said out loud?",
        ]}
      />

      <section id="method" aria-labelledby="method-title" className="py-16 sm:py-24">
        <Container className="max-w-[100rem]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / The method</p>
              <h2 id="method-title" className="display text-4xl font-semibold md:text-5xl">
                Four steps, applied out loud.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              The interviewer is not grading your general-knowledge recall. They are watching
              whether you can build structure under uncertainty, keep every assumption visible and
              notice when your own answer doesn&apos;t make sense.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {methodSteps.map((step) => (
              <li key={step.number} className="glass-card relative overflow-hidden p-6">
                <span className="text-brand-600/15 dark:text-brand-300/10 absolute top-2 right-4 font-serif text-6xl font-semibold">
                  {step.number}
                </span>
                <p className="eyebrow relative mb-4">Step {step.number}</p>
                <h3 className="relative font-serif text-xl font-semibold">{step.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 relative mt-3 text-sm leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-8 border-ink-200/80 dark:border-ink-700 rounded-2xl border p-6 sm:p-8">
            <p className="eyebrow mb-4">Where candidates lose marks</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {commonMistakes.map((mistake) => (
                <li key={mistake} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true">
                    ✕
                  </span>
                  <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                    {mistake}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[100rem]" />

      <section id="worked-examples" aria-labelledby="examples-title" className="py-16 sm:py-24">
        <Container className="max-w-[100rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Three fully worked examples</p>
            <h2 id="examples-title" className="display text-4xl font-semibold md:text-5xl">
              Watch the method run end to end.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              The numbers below are illustrative — built to show the method clearly, not asserted
              as verified market data. Try the question yourself before revealing each step.
            </p>
          </div>
          <GuesstimateExplorer />
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[100rem]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">03 / Continue practising</p>
              <h2 id="continue-title" className="display text-4xl font-semibold">
                Now try one live.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-relaxed">
                Estimation improves fastest with a partner and a timer, inside a full case.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/placements/case-frameworks"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Structure</p>
                <h3 className="font-serif text-2xl font-semibold">Case Frameworks</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                  The six structures behind almost every case interview question.
                </p>
              </Link>
              <Link
                href="/placements/case-study-preparation"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Practice</p>
                <h3 className="font-serif text-2xl font-semibold">Case Study Studio</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                  Practise structuring, quantitative reasoning and synthesis together.
                </p>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
