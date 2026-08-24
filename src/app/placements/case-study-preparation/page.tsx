import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowRightIcon,
  BricolageIcon,
  CompassIcon,
  GraduationCapIcon,
  NetworkIcon,
  SparkIcon,
} from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";

import { CasePracticeLab } from "./CasePracticeLab";

export const metadata: Metadata = {
  title: "Great Lakes Consulting Club | Case Study Preparation",
  description:
    "Great Lakes Consulting Club case practice: structure unfamiliar problems, work with numbers, make a recommendation and learn from each mock interview.",
  keywords: [
    "consulting case interview",
    "case study preparation",
    "MBA consulting preparation",
    "guesstimates",
    "profitability framework",
    "market entry framework",
    "consulting interview India",
  ],
  alternates: { canonical: "/placements/case-study-preparation" },
  openGraph: {
    type: "article",
    title: "Great Lakes Consulting Club — Case Study Studio",
    description:
      "Practice for structuring an unfamiliar business problem, analysing it and explaining what you would do.",
    url: "/placements/case-study-preparation",
    images: ["/images/profile_pic.jpg"],
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
    title: "Practise the building blocks",
    description:
      "Practise issue trees, business arithmetic, chart reading and top-down communication before adding case complexity.",
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
    accent: "",
  },
  {
    name: "Market entry",
    question: "Is the market attractive, accessible and winnable?",
    accent: "tag-amber",
  },
  {
    name: "Growth",
    question: "Where can value expand—and what must be true?",
    accent: "",
  },
  {
    name: "Pricing",
    question:
      "What value does the offer create, what will customers pay and how might competitors respond?",
    accent: "tag-amber",
  },
  {
    name: "M&A / PE",
    question: "Will the asset create value, and can the deal be completed and integrated?",
    accent: "",
  },
  {
    name: "Abstract",
    question: "Can you create structure when no familiar template fits?",
    accent: "tag-amber",
  },
] as const;

const industryLenses = [
  "E-commerce, retail & FMCG",
  "Banking, NBFCs & insurance",
  "Healthcare & pharmaceuticals",
  "Technology, AI & IT services",
  "Automobile, airlines & logistics",
  "Energy, infrastructure & real estate",
] as const;

const casebookPath = [
  {
    number: "01",
    title: "Consulting prep 101",
    description:
      "Know the interview process, evaluation criteria and how to use a case group well.",
    href: undefined,
  },
  {
    number: "02",
    title: "Case frameworks",
    description:
      "Build adaptable starting structures for common case families and unusual prompts.",
    href: "/placements/case-frameworks",
  },
  {
    number: "03",
    title: "Case examples",
    description:
      "Move from candidate brief to analysis, exhibits, synthesis and interviewer feedback.",
    href: "/placements/case-examples",
  },
  {
    number: "04",
    title: "Guesstimates",
    description: "Define, decompose, estimate and sanity-check with visible assumptions and units.",
    href: "/placements/guesstimates",
  },
  {
    number: "05",
    title: "Industry primers",
    description:
      "Learn business models, value chains, economics, KPIs, competition and emerging trends.",
    href: "/placements/industry-analysis",
  },
] as const;

const workedCaseMetrics = [
  ["Orders per month", "100,000", "120,000"],
  ["Average revenue per order", "₹250", "₹240"],
  ["Food cost", "40% of revenue", "44% of revenue"],
  ["Delivery cost per order", "₹40", "₹50"],
  ["Fixed cost per month", "₹80 lakh", "₹84 lakh"],
] as const;

const recoveryOptions = [
  {
    lever: "Improve route density",
    assumption: "Reduce delivery cost by ₹6 per order without lowering on-time performance.",
    contribution: "+₹7.2 lakh per month",
  },
  {
    lever: "Reduce food waste",
    assumption: "Bring food cost from 44% to 43% of current revenue while protecting quality.",
    contribution: "+₹2.88 lakh per month",
  },
  {
    lever: "Recover value in price and packaging",
    assumption: "Improve net revenue by ₹4 per order after any demand response.",
    contribution: "+₹4.8 lakh per month",
  },
] as const;

export default function CaseStudyPreparationPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <header className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-[87.5rem]">
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
              Case Study Preparation
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
                  Great Lakes Consulting Club · Practice-first
                </span>
                <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
                  Think clearly{" "}
                  <span className="text-brand-200 font-normal italic">under pressure.</span>
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
                  Case interviews rarely fail because someone forgot a framework. They fail when the
                  candidate stops listening, hides an assumption or reaches a recommendation the
                  analysis does not support. This page helps you practise those moments.
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
                    href="#casebook-path"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    Explore the preparation path
                  </a>
                </div>
                <p className="mt-5 text-sm text-blue-100">
                  Want the reasoning behind this approach, written out in full?{" "}
                  <Link href="/teaching/consulting-interviews" className="link-underline font-semibold text-white">
                    Read Cracking Consulting Interviews →
                  </Link>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                    Core loop
                  </p>
                  <p className="mt-2 font-serif text-2xl font-semibold">
                    Scope → Structure → Synthesise
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

      <InquiryPrelude
        id="case-questions"
        title="Define the decision before you reach for a framework."
        questions={[
          "Are you listening to the case, or running your framework on autopilot?",
          "Which assumption in your structure would break the whole recommendation if it's wrong?",
          "Could the arithmetic be correct while you've misread the business?",
        ]}
      />

      <section aria-labelledby="system-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / Preparation system</p>
              <h2 id="system-title" className="display text-4xl font-semibold md:text-5xl">
                Train the process, not the template.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              A framework can help you begin, but it cannot listen for you. Clarify the question,
              build a structure for this particular situation, follow the evidence and say what it
              means. Then review the attempt while it is still fresh.
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

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section id="practice-lab" aria-labelledby="lab-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Interactive practice lab</p>
            <h2 id="lab-title" className="display text-4xl font-semibold md:text-5xl">
              Rehearse the moments that matter.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Practise structuring, quantitative reasoning and synthesis separately before combining
              them in a full case. After each mock, turn one piece of feedback into the next
              session&apos;s goal.
            </p>
          </div>
          <CasePracticeLab />
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="worked-case-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">03 / Complete original practice case</p>
              <h2 id="worked-case-title" className="display text-4xl font-semibold md:text-5xl">
                Nadi Kitchens: growth without profit.
              </h2>
            </div>
            <div className="text-ink-600 dark:text-ink-300 space-y-3 self-end text-sm leading-relaxed lg:col-span-7">
              <p>
                This fictional case is written for this site. Work through it with a partner: the
                candidate should see only the brief at first, while the interviewer opens each
                exhibit when the analysis earns it.
              </p>
              <p>
                The arithmetic is intentionally manageable. The harder work is deciding what the
                numbers mean, naming the assumptions behind a recovery plan and giving a
                recommendation that can survive a follow-up question.
              </p>
            </div>
          </div>

          <article className="from-ink-950 to-brand-900 rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
              Candidate brief · Read aloud
            </p>
            <h3 className="mt-3 max-w-3xl font-serif text-3xl font-semibold">
              The client is growing, but the economics are moving backward.
            </h3>
            <p className="mt-5 max-w-4xl text-sm leading-relaxed text-blue-50 sm:text-base">
              Nadi Kitchens is a fictional subscription lunch-delivery business. Monthly orders have
              grown by 20% over the past year, yet monthly operating profit has fallen. The CEO
              wants to restore last year&rsquo;s profit within three months without worsening
              on-time delivery or meal quality. Diagnose the decline and recommend what management
              should do first.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ["Clarify", "Define profit, time horizon and non-negotiable service constraints."],
                ["Structure", "Separate price, volume, variable cost, fixed cost and mix."],
                ["Decide", "Recommend a sequenced plan, not a list of every possible lever."],
              ].map(([title, description]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h4 className="font-serif text-lg font-semibold">{title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-blue-100">{description}</p>
                </div>
              ))}
            </div>
          </article>

          <div className="mt-5 space-y-4">
            <details className="glass-card group p-2">
              <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-serif text-lg font-semibold focus-visible:ring-2 focus-visible:outline-none">
                Exhibit 1 · Monthly economics
                <span className="text-brand-700 dark:text-brand-300 font-sans text-sm group-open:hidden">
                  Reveal
                </span>
                <span className="text-brand-700 dark:text-brand-300 hidden font-sans text-sm group-open:inline">
                  Hide
                </span>
              </summary>
              <div className="border-ink-200/80 dark:border-ink-700 border-t px-4 pt-5 pb-4">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                    <caption className="sr-only">
                      Nadi Kitchens monthly economics last year and currently
                    </caption>
                    <thead>
                      <tr className="border-ink-200 dark:border-ink-700 border-b">
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Metric
                        </th>
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Last year
                        </th>
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Current
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {workedCaseMetrics.map(([metric, previous, current]) => (
                        <tr
                          key={metric}
                          className="border-ink-200/70 dark:border-ink-800 border-b last:border-0"
                        >
                          <th scope="row" className="px-3 py-3 font-medium">
                            {metric}
                          </th>
                          <td className="text-ink-600 dark:text-ink-300 px-3 py-3">{previous}</td>
                          <td className="text-ink-600 dark:text-ink-300 px-3 py-3">{current}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-ink-500 dark:text-ink-400 mt-4 text-xs leading-relaxed">
                  Candidate task: calculate operating profit in both periods, quantify the gap and
                  identify which movements deserve investigation first.
                </p>
              </div>
            </details>

            <details className="glass-card group p-2">
              <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-serif text-lg font-semibold focus-visible:ring-2 focus-visible:outline-none">
                Exhibit 2 · Calculation and diagnosis
                <span className="text-brand-700 dark:text-brand-300 font-sans text-sm group-open:hidden">
                  Reveal
                </span>
                <span className="text-brand-700 dark:text-brand-300 hidden font-sans text-sm group-open:inline">
                  Hide
                </span>
              </summary>
              <div className="border-ink-200/80 dark:border-ink-700 grid gap-4 border-t px-4 pt-5 pb-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  [
                    "Last-year profit",
                    "₹30 lakh",
                    "₹2.5 crore revenue minus food, delivery and fixed cost.",
                  ],
                  [
                    "Current profit",
                    "₹17.28 lakh",
                    "₹2.88 crore revenue minus ₹1.2672 crore food, ₹60 lakh delivery and ₹84 lakh fixed cost.",
                  ],
                  [
                    "Profit gap",
                    "₹12.72 lakh",
                    "The amount the three-month plan must recover each month.",
                  ],
                  [
                    "Diagnosis",
                    "Unit economics weakened",
                    "Volume grew, but lower revenue per order and higher food and delivery cost absorbed the gain.",
                  ],
                ].map(([label, value, explanation]) => (
                  <div
                    key={label}
                    className="border-ink-200/80 dark:border-ink-700 rounded-2xl border p-5"
                  >
                    <p className="eyebrow">{label}</p>
                    <p className="mt-2 font-serif text-2xl font-semibold">{value}</p>
                    <p className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-relaxed">
                      {explanation}
                    </p>
                  </div>
                ))}
              </div>
            </details>

            <details className="glass-card group p-2">
              <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-serif text-lg font-semibold focus-visible:ring-2 focus-visible:outline-none">
                Exhibit 3 · Management&rsquo;s three proposed levers
                <span className="text-brand-700 dark:text-brand-300 font-sans text-sm group-open:hidden">
                  Reveal
                </span>
                <span className="text-brand-700 dark:text-brand-300 hidden font-sans text-sm group-open:inline">
                  Hide
                </span>
              </summary>
              <div className="border-ink-200/80 dark:border-ink-700 grid gap-4 border-t px-4 pt-5 pb-4 lg:grid-cols-3">
                {recoveryOptions.map((option) => (
                  <article
                    key={option.lever}
                    className="border-ink-200/80 dark:border-ink-700 rounded-2xl border p-5"
                  >
                    <h4 className="font-serif text-xl font-semibold">{option.lever}</h4>
                    <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                      {option.assumption}
                    </p>
                    <p className="text-brand-700 dark:text-brand-300 mt-4 text-sm font-semibold">
                      Illustrative contribution: {option.contribution}
                    </p>
                  </article>
                ))}
              </div>
            </details>

            <details className="glass-card group p-2">
              <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-serif text-lg font-semibold focus-visible:ring-2 focus-visible:outline-none">
                Interviewer guide · What a strong synthesis contains
                <span className="text-brand-700 dark:text-brand-300 font-sans text-sm group-open:hidden">
                  Reveal
                </span>
                <span className="text-brand-700 dark:text-brand-300 hidden font-sans text-sm group-open:inline">
                  Hide
                </span>
              </summary>
              <div className="border-ink-200/80 dark:border-ink-700 border-t px-4 pt-5 pb-4">
                <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed">
                      Nadi should pursue a sequenced recovery plan centred first on delivery route
                      density, because that is the largest proposed lever and directly addresses the
                      sharpest unit-cost deterioration. In parallel, it should run a controlled
                      food- waste intervention and test the ₹4 net revenue recovery on a limited
                      customer segment. Together, the illustrative contributions total ₹14.88 lakh
                      per month, above the ₹12.72 lakh gap, but that is not yet a forecast.
                    </p>
                    <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-relaxed">
                      Management should track on-time delivery, complaints, repeat orders, food
                      waste and realised net revenue. If service or retention weakens, the plan must
                      be revised even if the spreadsheet still appears to close.
                    </p>
                  </div>
                  <div className="border-ink-200/80 dark:border-ink-700 rounded-2xl border p-5">
                    <h4 className="font-serif text-lg font-semibold">Probe the candidate</h4>
                    <ul className="text-ink-600 dark:text-ink-300 mt-3 space-y-2 text-xs leading-relaxed">
                      <li>Which assumption is most likely to fail?</li>
                      <li>How would you test price response before a full rollout?</li>
                      <li>What implementation cost is missing?</li>
                      <li>What would make you stop the route-density change?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="cases-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">04 / Case architecture</p>
              <h2 id="cases-title" className="display text-4xl font-semibold md:text-5xl">
                Recognise the pattern; do not force the template.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
                These case families can help you find a sensible first question. After that, the
                facts of the case should determine the structure.
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
        <Container className="max-w-[87.5rem]">
          <div className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[26px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                  A disciplined guesstimate
                </p>
                <h2 className="mt-3 font-serif text-4xl font-semibold">
                  Keep assumptions visible and logic easy to check.
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

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="fluency-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">05 / Interview fluency</p>
            <h2 id="fluency-title" className="display text-4xl font-semibold md:text-5xl">
              What the interviewer needs to hear.
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
                "State the recommendation, support it, address the main risk and define the next step.",
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
        <Container className="max-w-[87.5rem]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="bg-accent-400/10 text-accent-600 dark:text-accent-400 mb-5 flex h-11 w-11 items-center justify-center rounded-xl">
                <GraduationCapIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="eyebrow mb-3">06 / Industry fluency</p>
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
                  className="border-ink-200/80 dark:border-ink-700 text-ink-700 dark:text-ink-200 rounded-xl border p-4 text-sm font-medium"
                >
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section id="casebook-path" aria-labelledby="source-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[87.5rem]">
          <div className="from-brand-50 to-accent-400/10 dark:from-brand-900/30 dark:to-accent-400/5 border-brand-200/70 dark:border-brand-700/40 rounded-[24px] border bg-gradient-to-br p-7 sm:p-10">
            <p className="eyebrow mb-3">Great Lakes Consulting Club learning path</p>
            <h2 id="source-title" className="display text-4xl font-semibold">
              Build readiness in five connected layers.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-4 max-w-3xl text-sm leading-relaxed">
              Use this sequence as a curriculum rather than a reading list. Learn how the interview
              works, practise the building blocks, solve full cases, sharpen estimation and then add
              the industry context needed to make commercially grounded recommendations.
            </p>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {casebookPath.map((item) => {
                const cardContent = (
                  <>
                    <span className="text-brand-700 dark:text-brand-300 font-mono text-[11px] font-semibold">
                      {item.number}
                    </span>
                    <h3 className="mt-2 font-serif text-lg font-semibold">{item.title}</h3>
                    <p className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-relaxed">
                      {item.description}
                    </p>
                    {item.href ? (
                      <span className="text-brand-700 dark:text-brand-400 mt-3 inline-flex items-center gap-1 text-xs font-semibold">
                        Open
                        <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                );

                return (
                  <li key={item.number}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="border-brand-200/70 dark:border-brand-700/40 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 block h-full rounded-2xl border bg-white/60 p-5 transition focus-visible:ring-2 focus-visible:outline-none dark:bg-white/5"
                      >
                        {cardContent}
                      </Link>
                    ) : (
                      <div className="border-brand-200/70 dark:border-brand-700/40 h-full rounded-2xl border bg-white/60 p-5 dark:bg-white/5">
                        {cardContent}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
            <p className="text-ink-600 dark:text-ink-300 mt-7 max-w-4xl text-sm leading-relaxed">
              A practical cadence is to form a diverse group of four to six people 45–60 days before
              interviews, run realistic 20–25 minute cases in pairs, keep a feedback log and revisit
              recurring mistakes every four or five days. Rotate interviewers and industries, and
              finish with random mocks and back-to-back simulations. The goal is progress, not case
              count.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
