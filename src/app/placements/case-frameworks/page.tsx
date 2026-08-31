import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";

import { CaseFrameworkExplorer } from "./CaseFrameworkExplorer";

export const metadata: Metadata = {
  title: "Case Interview Frameworks, Explained Simply",
  description:
    "Six consulting case frameworks — profitability, market entry, growth, pricing, M&A/PE and abstract — each with a simple diagram, guiding questions, a worked mini example and the mistakes candidates actually make.",
  keywords: [
    "case interview frameworks",
    "profitability framework",
    "market entry framework",
    "growth framework",
    "pricing case",
    "M&A case interview",
    "consulting case prep",
    "MBA placements",
  ],
  alternates: { canonical: "/placements/case-frameworks" },
  openGraph: {
    type: "article",
    title: "Case Interview Frameworks, Explained Simply",
    description:
      "Six case frameworks, each with a simple diagram, guiding questions and a worked example.",
    url: "/placements/case-frameworks",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Case Interview Frameworks, Explained Simply",
  headline: "Six case frameworks, each with a diagram, guiding questions and a worked example",
  learningResourceType: "Framework reference",
  educationalLevel: "Postgraduate / MBA",
  publisher: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

export default function CaseFrameworksPage() {
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
              Case Frameworks
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
                  Placement readiness · Case frameworks
                </span>
                <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
                  A framework is a{" "}
                  <span className="text-brand-200 font-normal italic">starting structure</span>,
                  not the answer.
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
                  Six case types cover almost everything you will be asked in a consulting or
                  general-management interview. Each one below breaks down into a simple diagram
                  you can redraw from memory, the questions that keep you honest, and the mistakes
                  candidates actually make under pressure.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#explorer"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    Open the framework explorer
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#approach"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    Read the general approach
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur-sm">
                <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                  Six families
                </p>
                <p className="mt-3 font-serif text-lg font-semibold">
                  Profitability · Entry · Growth · Pricing · M&amp;A · Abstract
                </p>
                <div className="my-4 h-px bg-white/15" />
                <p className="text-xs leading-relaxed text-white/70">
                  One diagram, three questions and one worked example per family.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="frameworks-inquiry"
        eyebrow="Before you memorise a diagram"
        title="A framework tells you where to look. It never tells you what you'll find."
        questions={[
          "If you deleted the framework, could you still explain why this structure fits this problem?",
          "Which branch of your tree is actually driving the answer, and which is just filling space?",
        ]}
      />

      <section id="approach" aria-labelledby="approach-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / The approach behind every framework</p>
              <h2 id="approach-title" className="display text-4xl font-semibold md:text-5xl">
                Structure the problem before you structure the slide.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              Every framework below is one instance of the same three-step approach: name the
              metric or decision that matters, break it into two to four parts that are genuinely
              distinct (no overlap, nothing important left out), and use the case facts to decide
              which part deserves your time. Memorising the diagram without this habit produces a
              candidate who recites a template instead of solving the case in front of them.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "Name it",
                description:
                  "State the exact metric or decision in one sentence before drawing anything.",
              },
              {
                step: "Break it apart",
                description:
                  "Split it into parts that don't overlap and don't leave anything important out.",
              },
              {
                step: "Follow the evidence",
                description:
                  "Use the case facts, not intuition, to decide which branch is actually driving the outcome.",
              },
            ].map((item, index) => (
              <div key={item.step} className="glass-card p-6">
                <span className="bg-brand-600 flex h-8 w-8 items-center justify-center rounded-full font-mono text-[11px] text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-serif text-xl font-semibold">{item.step}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section id="explorer" aria-labelledby="explorer-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / The framework explorer</p>
            <h2 id="explorer-title" className="display text-4xl font-semibold md:text-5xl">
              Six frameworks. One structure each.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Switch between families to see the diagram, the questions worth asking, a short
              example and the mistakes candidates most often make with that specific framework.
            </p>
          </div>
          <CaseFrameworkExplorer />
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">03 / Continue practising</p>
              <h2 id="continue-title" className="display text-4xl font-semibold">
                A diagram is not a rehearsal.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-relaxed">
                Once a framework feels familiar, test it against a full case and against your own
                estimation skill.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/placements/case-examples"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Worked examples</p>
                <h3 className="font-serif text-2xl font-semibold">Case Examples</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                  Three short original cases you can run with a partner, exhibit by exhibit.
                </p>
              </Link>
              <Link
                href="/placements/guesstimates"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Estimation</p>
                <h3 className="font-serif text-2xl font-semibold">Guesstimates</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                  Define, decompose, estimate and sanity-check — with fully worked examples.
                </p>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
