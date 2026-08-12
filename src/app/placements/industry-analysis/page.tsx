import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRightIcon, CompassIcon, SparkIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import {
  claimEvidenceRule,
  closingPrinciple,
  confidenceTags,
  eightWeekSprint,
  evidenceRule,
  evidenceTiers,
  finalTest,
  formulaSheet,
  qualityGates,
  references,
  rubric,
  workedExample,
} from "@/features/placements/data/industry-analysis";

import { FrameworkExplorer } from "./FrameworkExplorer";

export const metadata: Metadata = {
  title: "How to Do Rigorous Industry Analysis",
  description:
    "A consulting-grade, six-question framework for rigorous industry analysis: market sizing, demand drivers, profit pools, Five Forces, disruption and scenario-based strategy — with an eight-week workflow, rubric and worked example.",
  keywords: [
    "industry analysis framework",
    "market sizing",
    "profit pools",
    "Porter's Five Forces",
    "PESTEL analysis",
    "scenario planning",
    "MBA consulting preparation",
    "industry attractiveness",
    "strategic fit",
  ],
  alternates: { canonical: "/placements/industry-analysis" },
  openGraph: {
    type: "article",
    title: "How to Do Rigorous Industry Analysis",
    description:
      "A six-question, evidence-first framework for decision-grade industry analysis, from market sizing to strategic choice.",
    url: "/placements/industry-analysis",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "How to Do Rigorous Industry Analysis",
  headline: "A six-question, evidence-first framework for decision-grade industry analysis",
  description:
    "A consulting-grade framework for rigorous industry analysis: market sizing, demand drivers, profit pools, competitive structure, disruption and scenario-based strategic choice.",
  learningResourceType: "Framework and workflow guide",
  educationalLevel: "Postgraduate / MBA",
  publisher: {
    "@type": "Person",
    name: "Dr. Swapnil Sahoo",
  },
};

export default function IndustryAnalysisPage() {
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
        <Container className="max-w-6xl">
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
              Industry Analysis
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
                  Placement readiness · Industry analysis
                </span>
                <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
                  How to do{" "}
                  <span className="text-brand-200 font-normal italic">rigorous</span> industry
                  analysis.
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
                  A good industry report does not end with description. It explains how an
                  industry works, where economic value is created and captured, what is changing,
                  who is advantaged, and what strategic choices follow. This is the six-question
                  framework, evidence discipline, and workflow behind that standard.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#framework"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    Open the six-question framework
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#worked-example"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    See the worked example
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur-sm">
                <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                  The spine
                </p>
                <p className="mt-3 font-serif text-lg font-semibold">
                  WHAT · WHO · HOW · WHO WINS · WHAT CHANGES · WHAT NEXT
                </p>
                <div className="my-4 h-px bg-white/15" />
                <p className="text-xs leading-relaxed text-white/70">
                  6 questions · 18 analytical modules · 8-week workflow
                </p>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="industry-analysis-inquiry"
        eyebrow="Before opening a template"
        title="A framework is a discipline, not a checklist to fill in."
        introduction="Most student reports fail not from missing frameworks but from missing decisions: pages of PESTEL and Five Forces that do not change the conclusion. These questions are meant to be asked before, during and after the analysis — not answered once and filed away."
        socraticQuestions={[
          "If a senior reader removed every framework page from this report, would the recommendation actually change — or were the frameworks decorative?",
          "Which of my numbers are facts with a stated source, which are estimates with a stated method, and which are simply assumptions I have not labelled as such?",
          "Whose incentive would be served if my central conclusion turned out to be wrong — and have I sought out that person's view?",
          "Am I segmenting, scoring and mapping because it reveals something new, or because the framework expects a slide in that shape?",
        ]}
        firstPrinciplesQuestions={[
          "What decision, for whom, over what time horizon, is this analysis actually meant to support?",
          "Where in the value chain is revenue actually generated, and — a separate question — where is profit actually captured?",
          "What would have to be true for each force in Five Forces to be strengthening rather than weakening, and what evidence would show which is happening?",
          "What is the smallest set of assumptions my recommendation depends on, and what observable evidence would prove any one of them wrong?",
        ]}
      />

      <section id="framework" aria-labelledby="framework-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / The six-question framework</p>
              <h2 id="framework-title" className="display text-4xl font-semibold md:text-5xl">
                Six questions. Eighteen modules. One decision.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
              The familiar 5W1H structure is retained as a memorable device, but strengthened with
              profit-pool analysis, ecosystem mapping, customer economics, capability analysis,
              scenario planning and evidence triangulation. Open each question to see what it
              requires.
            </p>
          </div>
          <FrameworkExplorer />
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="evidence-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">02 / Evidence discipline</p>
              <h2 id="evidence-title" className="display text-4xl font-semibold md:text-5xl">
                An analysis is only as strong as its weakest number.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              Maintain a source log from day one: source, date, metric definition, geographic
              scope, period, unit and caveat, for every number that matters to the conclusion.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {evidenceTiers.map((item) => (
              <article key={item.tier} className="glass-card p-5">
                <h3 className="font-serif text-lg font-semibold">{item.tier}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-relaxed">
                  {item.use}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="border-ink-200/80 dark:border-ink-700 rounded-2xl border p-6">
              <p className="eyebrow mb-4">Confidence tags</p>
              <dl className="grid gap-3">
                {confidenceTags.map((item) => (
                  <div key={item.tag} className="flex gap-3">
                    <dt className="text-brand-700 dark:text-brand-300 shrink-0 font-mono text-xs font-semibold">
                      {item.tag}
                    </dt>
                    <dd className="text-ink-600 dark:text-ink-300 text-xs leading-relaxed">
                      {item.meaning}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="text-ink-500 border-ink-200/80 dark:border-ink-700 mt-4 border-t pt-4 text-xs leading-relaxed">
                {evidenceRule}
              </p>
            </div>

            <div className="from-ink-950 to-brand-900 rounded-2xl bg-gradient-to-br p-6 text-white">
              <p className="font-mono text-[10px] tracking-[0.16em] text-blue-300 uppercase">
                The student rule
              </p>
              <p className="mt-2 font-serif text-xl font-semibold">
                Claim → Evidence → Mechanism → Implication
              </p>
              <div className="mt-5 grid gap-3">
                <p className="rounded-lg border border-red-400/20 bg-red-400/5 p-4 text-sm leading-relaxed text-red-200">
                  <span className="font-semibold">Weak: </span>
                  {claimEvidenceRule.weak}
                </p>
                <p className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-4 text-sm leading-relaxed text-emerald-200">
                  <span className="font-semibold">Strong: </span>
                  {claimEvidenceRule.strong}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section
        id="worked-example"
        aria-labelledby="worked-example-title"
        className="py-16 sm:py-24"
      >
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">03 / Worked example</p>
            <h2 id="worked-example-title" className="display text-4xl font-semibold md:text-5xl">
              India&rsquo;s electric two-wheeler industry.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              A compact walkthrough showing how the six questions read in sequence — not a
              substitute for a full current-market study. Dates and definitions are stated
              explicitly, because mixing calendar-year and financial-year data is a common
              analytical error.
            </p>
          </div>

          <div className="glass-card mb-6 p-6 sm:p-8">
            <p className="eyebrow mb-2">Decision question</p>
            <p className="font-serif text-xl leading-relaxed font-semibold sm:text-2xl">
              {workedExample.decisionQuestion}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {workedExample.sections.map((section) => (
              <article
                key={section.q}
                className="border-ink-200/80 dark:border-ink-700 rounded-2xl border p-6"
              >
                <span className="tag font-mono text-[10px] tracking-wide uppercase">
                  {section.q}
                </span>
                <h3 className="mt-3 font-serif text-lg font-semibold">{section.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                  {section.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#15113d] via-[#312e81] to-[#7c2d12] p-7 text-white shadow-xl shadow-indigo-950/15 sm:p-10">
            <p className="font-mono text-[10px] tracking-[0.16em] text-amber-200 uppercase">
              Illustrative recommendation
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
              {workedExample.recommendation}
            </p>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="workflow-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">04 / Eight-week sprint</p>
              <h2 id="workflow-title" className="display text-4xl font-semibold md:text-5xl">
                Give each week a job.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              The sequence moves from framing to evidence, from evidence to synthesis, ending in a
              recommendation the team has actively tried to disprove.
            </p>
          </div>

          <div className="border-ink-200/80 dark:border-ink-700 overflow-x-auto rounded-2xl border">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-ink-50 dark:bg-white/5">
                  <th scope="col" className="p-4 font-semibold">
                    Week
                  </th>
                  <th scope="col" className="p-4 font-semibold">
                    Focus
                  </th>
                  <th scope="col" className="p-4 font-semibold">
                    Activities
                  </th>
                  <th scope="col" className="p-4 font-semibold">
                    Deliverable
                  </th>
                </tr>
              </thead>
              <tbody className="divide-ink-200/80 dark:divide-ink-700 divide-y">
                {eightWeekSprint.map((row) => (
                  <tr key={row.week}>
                    <td className="text-ink-700 dark:text-ink-200 p-4 font-mono text-xs whitespace-nowrap">
                      {row.week}
                    </td>
                    <td className="p-4 font-semibold whitespace-nowrap">{row.focus}</td>
                    <td className="text-ink-600 dark:text-ink-300 p-4">{row.activities}</td>
                    <td className="text-ink-600 dark:text-ink-300 p-4">{row.deliverable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="rubric-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">05 / Rubric &amp; quality gates</p>
              <h2 id="rubric-title" className="display text-4xl font-semibold md:text-5xl">
                Know what &ldquo;excellent&rdquo; is worth before you submit.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
              A hundred-mark rubric weighted toward economics and competition, plus eleven pass/fail
              gates to run before submission.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border-ink-200/80 dark:border-ink-700 overflow-x-auto rounded-2xl border">
              <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-ink-50 dark:bg-white/5">
                    <th scope="col" className="p-4 font-semibold">
                      Dimension
                    </th>
                    <th scope="col" className="p-4 text-right font-semibold">
                      Marks
                    </th>
                    <th scope="col" className="p-4 font-semibold">
                      What excellence looks like
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-ink-200/80 dark:divide-ink-700 divide-y">
                  {rubric.map((row) => (
                    <tr key={row.dimension}>
                      <td className="p-4 font-semibold whitespace-nowrap">{row.dimension}</td>
                      <td className="text-ink-700 dark:text-ink-200 p-4 text-right font-mono">
                        {row.marks}
                      </td>
                      <td className="text-ink-600 dark:text-ink-300 p-4">{row.excellence}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-ink-50 font-semibold dark:bg-white/5">
                    <td className="p-4">Total</td>
                    <td className="p-4 text-right font-mono">100</td>
                    <td className="p-4" />
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="border-ink-200/80 dark:border-ink-700 rounded-2xl border p-6">
              <p className="eyebrow mb-4">Quality gates before submission</p>
              <ul className="grid gap-3">
                {qualityGates.map((item) => (
                  <li key={item.gate} className="flex gap-3">
                    <span className="mt-0.5 text-emerald-600 dark:text-emerald-400">✓</span>
                    <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                      <span className="text-ink-800 dark:text-ink-100 font-semibold">
                        {item.gate}.{" "}
                      </span>
                      {item.test}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="formula-title" className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">06 / Formula sheet</p>
            <h2 id="formula-title" className="display text-4xl font-semibold md:text-5xl">
              The arithmetic every report leans on.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {formulaSheet.map((item) => (
              <div
                key={item.measure}
                className="border-ink-200/80 dark:border-ink-700 rounded-xl border p-4"
              >
                <p className="text-sm font-semibold">{item.measure}</p>
                <p className="text-ink-600 dark:text-ink-300 mt-1.5 font-mono text-xs leading-relaxed">
                  {item.formula}
                </p>
              </div>
            ))}
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
            <div className="relative grid gap-6 lg:grid-cols-2">
              <div>
                <SparkIcon className="h-7 w-7 text-amber-300" aria-hidden="true" />
                <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                  The final test
                </p>
                <p className="mt-2 text-sm leading-relaxed text-blue-50 sm:text-base">
                  {finalTest}
                </p>
              </div>
              <div>
                <CompassIcon className="h-7 w-7 text-amber-300" aria-hidden="true" />
                <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                  Closing principle
                </p>
                <p className="mt-2 text-sm leading-relaxed text-blue-50 sm:text-base">
                  {closingPrinciple}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="sources-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="eyebrow mb-3">07 / Foundations &amp; continue practising</p>
              <h2 id="sources-title" className="display text-4xl font-semibold">
                Built on established strategy research.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-relaxed">
                This framework draws on profit-pool analysis, Five Forces, dynamic capabilities,
                ecosystem strategy and scenario planning as taught in the classroom, adapted into a
                single decision-led workflow for student use.
              </p>
              <div className="mt-6 grid gap-3">
                <Link
                  href="/placements/case-study-preparation"
                  className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-5 transition focus-visible:ring-2 focus-visible:outline-none"
                >
                  <p className="eyebrow mb-1">Consulting practice</p>
                  <p className="font-serif text-lg font-semibold">Case Study Studio</p>
                </Link>
                <Link
                  href="/placements"
                  className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-5 transition focus-visible:ring-2 focus-visible:outline-none"
                >
                  <p className="eyebrow mb-1">Placement readiness</p>
                  <p className="font-serif text-lg font-semibold">Back to the readiness studio</p>
                </Link>
              </div>
            </div>
            <div>
              <p className="eyebrow mb-4">References</p>
              <ol className="text-ink-600 dark:text-ink-300 grid gap-2.5 text-xs leading-relaxed">
                {references.map((reference) => (
                  <li key={reference} className="border-ink-200/60 dark:border-ink-800 border-b pb-2.5">
                    {reference}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
