import type { Metadata } from "next";

import {
  ArrowRightIcon,
  BricolageIcon,
  CompassIcon,
  GraduationCapIcon,
  NetworkIcon,
  SparkIcon,
} from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";

import { CasePracticeLab } from "./CasePracticeLab";

const casebookUrl = "/1761125938034.pdf";

export const metadata: Metadata = {
  title: "Consulting Case Study Preparation",
  description:
    "A structured, practice-first consulting case preparation studio: frameworks, guesstimates, synthesis, industry fluency and interview-day judgment.",
  keywords: [
    "consulting case interview",
    "case study preparation",
    "MBA consulting preparation",
    "guesstimates",
    "profitability framework",
    "market entry framework",
    "consulting interview India",
  ],
  alternates: { canonical: "/case-study-preparation/" },
  openGraph: {
    type: "article",
    title: "Consulting Case Studio — Think Clearly Under Pressure",
    description:
      "A practice-first system for structuring, analyzing and communicating consulting cases.",
    url: "/case-study-preparation/",
  },
};

const preparationSystem = [
  {
    index: "01",
    title: "Learn the interview",
    description:
      "Understand what interviewers assess: problem structuring, analytical thinking, synthesis and persuasive communication.",
  },
  {
    index: "02",
    title: "Build reusable muscles",
    description:
      "Practice issue trees, business arithmetic, chart reading and top-down communication before adding case complexity.",
  },
  {
    index: "03",
    title: "Run deliberate cases",
    description:
      "Use live mocks, rotate industries and capture precise feedback—not just the number of cases completed.",
  },
  {
    index: "04",
    title: "Reflect and repeat",
    description:
      "Review patterns in your case log, isolate one improvement area and test it in the next interview simulation.",
  },
] as const;

const caseFamilies = [
  {
    name: "Profitability",
    question: "What changed in revenue, cost or mix?",
    accent: "tag-blue",
  },
  {
    name: "Market entry",
    question: "Is the market attractive, accessible and winnable?",
    accent: "tag-amber",
  },
  {
    name: "Growth",
    question: "Where can value expand—and what must be true?",
    accent: "tag-blue",
  },
  {
    name: "Pricing",
    question: "What is the value, willingness to pay and strategic response?",
    accent: "tag-amber",
  },
  {
    name: "M&A / PE",
    question: "Is the asset attractive, synergistic and executable?",
    accent: "tag-blue",
  },
  {
    name: "Abstract",
    question: "Can you create structure when no familiar template fits?",
    accent: "tag-amber",
  },
] as const;

const industryLenses = [
  "Consumer & retail",
  "Financial services",
  "Healthcare & pharma",
  "Technology & AI",
  "Industrial & logistics",
  "Energy & infrastructure",
] as const;

export default function CaseStudyPreparationPage() {
  return (
    <main>
      <header className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-6xl">
          <div className="from-ink-950 via-brand-900 to-ink-800 relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14">
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
                  Consulting case studio · Practice-first
                </span>
                <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
                  Think clearly{" "}
                  <span className="text-brand-200 font-normal italic">under pressure.</span>
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
                  A modern preparation system for turning ambiguous business problems into
                  structured analysis, defensible insight and executive-level recommendations.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#practice-lab"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    Enter the practice lab
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={casebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    Open the source casebook
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                    Core loop
                  </p>
                  <p className="mt-2 font-serif text-2xl font-semibold">
                    Scope → Structure → Synthesize
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                    North star
                  </p>
                  <p className="mt-2 font-serif text-2xl font-semibold">Quality over case count</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <section aria-labelledby="system-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / Preparation system</p>
              <h2 id="system-title" className="display text-4xl font-semibold md:text-5xl">
                Train the process, not the template.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              Frameworks are scaffolding. Strong candidates clarify the question, build a
              situation-specific structure, follow the evidence and communicate the implication. The
              loop below turns that behavior into a repeatable habit.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {preparationSystem.map((step) => (
              <li key={step.index} className="glass-card relative overflow-hidden p-6">
                <span className="text-brand-600/15 dark:text-brand-300/10 absolute top-2 right-4 font-serif text-6xl font-semibold">
                  {step.index}
                </span>
                <p className="eyebrow relative mb-4">Stage {step.index}</p>
                <h3 className="relative font-serif text-xl font-semibold">{step.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 relative mt-3 text-sm leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section id="practice-lab" aria-labelledby="lab-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Interactive practice lab</p>
            <h2 id="lab-title" className="display text-4xl font-semibold md:text-5xl">
              Rehearse the moments that matter.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Switch between structuring, quantitative reasoning and synthesis. After a live case,
              use the reflection checklist to convert feedback into your next practice goal.
            </p>
          </div>
          <CasePracticeLab />
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="cases-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">03 / Case architecture</p>
              <h2 id="cases-title" className="display text-4xl font-semibold md:text-5xl">
                Recognize the family. Build for the situation.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
                These common families help you orient quickly. They should guide the first question,
                never replace judgment.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {caseFamilies.map((family) => (
                <article key={family.name} className="glass-card p-6">
                  <span className={`tag ${family.accent}`}>{family.name}</span>
                  <p className="mt-4 font-serif text-xl font-semibold">{family.question}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[26px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                  Guesstimate operating system
                </p>
                <h2 className="mt-3 font-serif text-4xl font-semibold">
                  Assumptions are visible. Logic is auditable.
                </h2>
              </div>
              <ol className="grid gap-3 sm:grid-cols-2">
                {[
                  ["01", "Define", "Clarify the metric, geography and time period."],
                  ["02", "Decompose", "Choose a demand-side or supply-side equation."],
                  ["03", "Estimate", "Use explicit assumptions and rounded arithmetic."],
                  ["04", "Sanity-check", "Triangulate, interpret and state the sensitivity."],
                ].map(([number, title, description]) => (
                  <li key={number} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="font-mono text-[10px] text-blue-300">{number}</span>
                    <h3 className="mt-1 font-serif text-xl font-semibold">{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-blue-100">{description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="fluency-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">04 / Interview fluency</p>
            <h2 id="fluency-title" className="display text-4xl font-semibold md:text-5xl">
              Four capabilities. One coherent conversation.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [CompassIcon, "Problem framing", "Clarify the decision, objective and constraints."],
              [NetworkIcon, "Structured analysis", "Break the problem into answerable branches."],
              [
                BricolageIcon,
                "Evidence & insight",
                "Calculate, interpret and update the hypothesis.",
              ],
              [
                SparkIcon,
                "Executive synthesis",
                "Recommend, support, de-risk and define next steps.",
              ],
            ].map(([Icon, title, description]) => {
              const Component = Icon as typeof CompassIcon;
              return (
                <article key={title as string} className="glass-card p-6">
                  <div className="bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 mb-5 flex h-10 w-10 items-center justify-center rounded-xl">
                    <Component className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold">{title as string}</h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                    {description as string}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="bg-accent-400/10 text-accent-600 dark:text-accent-400 mb-5 flex h-11 w-11 items-center justify-center rounded-xl">
                <GraduationCapIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="eyebrow mb-3">05 / Industry fluency</p>
              <h2 className="display text-4xl font-semibold">Learn value chains, not trivia.</h2>
              <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
                For each sector, know how value is created, what drives revenue and cost, which
                metrics matter, and where disruption changes the economics.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {industryLenses.map((industry) => (
                <li
                  key={industry}
                  className="border-ink-200/80 dark:border-ink-700 flex items-center gap-3 rounded-xl border p-4"
                >
                  <span className="bg-accent-500 h-2 w-2 rounded-full" aria-hidden="true" />
                  <span className="text-ink-700 dark:text-ink-200 text-sm font-medium">
                    {industry}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="source-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div className="from-brand-50 to-accent-400/10 dark:from-brand-900/30 dark:to-accent-400/5 border-brand-200/70 dark:border-brand-700/40 rounded-[24px] border bg-gradient-to-br p-7 sm:p-10">
            <p className="eyebrow mb-3">Source &amp; further study</p>
            <h2 id="source-title" className="display text-4xl font-semibold">
              Go deeper with the original casebook.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-4 max-w-3xl text-sm leading-relaxed">
              This learning experience is an original adaptation informed by the structure of the
              ISB Consulting Club&apos;s <em>Consulting Prep Casebook 2025</em>. The source contains
              detailed frameworks, practice cases, guesstimates and industry primers. Copyright
              remains with its respective owner.
            </p>
            <a
              href={casebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink-950 focus-visible:ring-brand-500 mt-7 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:ring-2 focus-visible:outline-none dark:bg-white dark:text-slate-950 dark:hover:bg-blue-50"
            >
              Read the 2025 casebook
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
