import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import {
  causalThreats,
  constructMeasurementGap,
  designMistakes,
  designOptions,
  designPracticeNote,
  validityTypes,
} from "@/features/research/data/research-design-primer";

export const metadata: Metadata = {
  title: "Research Design Primer | PhD Mandatory Coursework",
  description:
    "A practical primer on research design for doctoral coursework: the four kinds of validity in plain language, the construct-measurement gap, four threats to causal claims, how to match a design to a question, and the mistakes that surface in proposal defenses.",
  keywords: [
    "research design primer",
    "validity types PhD",
    "causal identification research design",
    "construct validity vs measurement",
    "PhD research methodology",
    "quasi-experimental design",
  ],
  alternates: { canonical: "/research/phd-coursework/research-design-primer" },
  openGraph: {
    type: "article",
    title: "Research Design Primer",
    description:
      "The vocabulary you need to defend a research design, explained by the mistake each term prevents.",
    url: "/research/phd-coursework/research-design-primer",
    images: ["/images/gallery/aom-2026-global-scholar-development.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Research Design Primer",
  description:
    "The four kinds of validity, the construct-measurement gap, four threats to causal claims, and how to match a research design to a question.",
  author: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

export default function ResearchDesignPrimerPage() {
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
              href="/research/phd-coursework"
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              PhD Mandatory Coursework
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              Research Design Primer
            </span>
          </nav>

          <div
            data-page-hero="academic"
            className="relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-ink-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14"
          >
            <Image
              src="/images/gallery/aom-2026-global-scholar-development.webp"
              alt="AOM 2026 participants gathered around a conference table after the Global Scholar Development session"
              fill
              priority
              className="-z-20 object-cover"
              style={{ objectPosition: "center 45%" }}
              sizes="100vw"
            />
            <div
              className="absolute inset-0 -z-10"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, rgba(5,10,24,0.82), rgba(30,58,138,0.74), rgba(22,32,51,0.70))",
              }}
            />
            <div
              className="bg-accent-400/20 absolute -top-28 -right-24 -z-10 h-80 w-80 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="bg-brand-400/20 absolute -bottom-36 -left-20 -z-10 h-96 w-96 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-blue-100 uppercase backdrop-blur-sm">
              PhD mandatory coursework
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              Research design,{" "}
              <span className="text-brand-200 font-normal italic">in plain language.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Every methods seminar assumes a vocabulary you either arrive with or pick up fast:
              validity, reliability, causal identification, and the difference between a construct
              and how you&apos;re actually measuring it. Here&apos;s that vocabulary, explained by the
              mistake each term exists to prevent.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#validity"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                See the four validity types
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/research/phd-coursework"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                Back to PhD coursework
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="design-inquiry"
        eyebrow="Worth asking before your next design defense"
        title="If a committee member asked which validity threat worries you most about your own design, could you answer without reaching for the textbook definition?"
        questions={[
          "Are you defending your design, or defending the design you already know how to code?",
          "If your data is a single snapshot in time, what actually tells you which variable moved first?",
        ]}
      />

      <section id="validity" aria-labelledby="validity-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / The vocabulary reviewers test first</p>
              <h2 id="validity-title" className="display text-4xl font-semibold md:text-5xl">
                Four kinds of validity, each asking a different question.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              The textbook definitions are easy to recite and hard to apply under questioning. What
              actually matters is the single question each one is really asking — and what it looks
              like when a design fails to answer it.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {validityTypes.map((item, index) => (
              <article key={item.id} className="glass-card p-6">
                <span className="bg-brand-600 flex h-8 w-8 items-center justify-center rounded-full font-mono text-[11px] text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-serif text-xl font-semibold">{item.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {item.question}
                </p>
                <div className="mt-4 flex gap-3 border-t border-ink-200/80 pt-4 dark:border-ink-700">
                  <span className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true">
                    ⚠
                  </span>
                  <p className="text-ink-500 dark:text-ink-400 text-xs leading-relaxed">
                    <span className="font-semibold">Failure looks like: </span>
                    {item.failureLooksLike}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="gap-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[87.5rem]">
          <div className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                02 / The gap that trips up first-years
              </p>
              <h2 id="gap-title" className="mt-3 font-serif text-4xl font-semibold">
                {constructMeasurementGap.title}
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-blue-50">
                {constructMeasurementGap.description}
              </p>
              <p className="mt-6 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-blue-100">
                {constructMeasurementGap.checkQuestion}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="causal-title" className="pb-16 sm:pb-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">03 / Causal identification, in plain language</p>
            <h2 id="causal-title" className="display text-4xl font-semibold md:text-5xl">
              Four threats to any causal claim.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              A correlation is not, by itself, a causal claim. These are the four reasons why — and
              the one question to ask of any design, including your own, before trusting it.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {causalThreats.map((item, index) => (
              <article key={item.id} className="glass-card p-6">
                <span className="text-brand-600/15 dark:text-brand-300/10 font-serif text-5xl font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-serif text-xl font-semibold">{item.name}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {item.definition}
                </p>
                <div className="mt-4 flex gap-3 border-t border-ink-200/80 pt-4 dark:border-ink-700">
                  <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                    ?
                  </span>
                  <p className="text-ink-500 dark:text-ink-400 text-xs leading-relaxed">
                    <span className="font-semibold">Ask: </span>
                    {item.diagnosticQuestion}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="design-options-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">04 / Matching design to question</p>
            <h2 id="design-options-title" className="display text-4xl font-semibold md:text-5xl">
              No design answers every question well.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Pick the design your question needs, then live with what it can&apos;t tell you — every
              option below trades one kind of confidence for another.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {designOptions.map((item) => (
              <article key={item.id} className="glass-card p-6">
                <h3 className="font-serif text-xl font-semibold">{item.name}</h3>
                <div className="mt-4 flex gap-3 border-t border-ink-200/80 pt-4 dark:border-ink-700">
                  <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                    ✓
                  </span>
                  <p className="text-ink-500 dark:text-ink-400 text-xs leading-relaxed">
                    <span className="font-semibold">Answers best: </span>
                    {item.answersBest}
                  </p>
                </div>
                <div className="mt-3 flex gap-3">
                  <span className="mt-0.5 shrink-0 text-rose-600 dark:text-rose-400" aria-hidden="true">
                    ✕
                  </span>
                  <p className="text-ink-500 dark:text-ink-400 text-xs leading-relaxed">
                    <span className="font-semibold">Cannot tell you: </span>
                    {item.cannotTellYou}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="mistakes-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">05 / What surfaces in proposal defenses</p>
            <h2 id="mistakes-title" className="display text-4xl font-semibold md:text-5xl">
              Four design mistakes worth catching early.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {designMistakes.map((item, index) => (
              <article key={item} className="glass-card p-6">
                <span className="text-brand-600/15 dark:text-brand-300/10 font-serif text-5xl font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">{item}</p>
              </article>
            ))}
          </div>

          <div className="from-ink-950 to-brand-900 relative mt-6 overflow-hidden rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <h3 className="font-serif text-2xl font-semibold">{designPracticeNote.title}</h3>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-blue-100">
                {designPracticeNote.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[87.5rem]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-2">
            <Link
              href="/research/phd-coursework"
              className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 group flex flex-col justify-center rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
            >
              <p className="eyebrow mb-2">Guide</p>
              <h3 className="font-serif text-2xl font-semibold">PhD Mandatory Coursework</h3>
              <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                What each mandatory component is for, what to do before your first term, and how
                coursework connects to how I supervise once it&apos;s done.
              </p>
              <span className="text-brand-700 dark:text-brand-400 mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                See the full guide
                <ArrowRightIcon
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
            <Link
              href="/research/phd-coursework/how-to-read-a-research-paper"
              className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 group flex flex-col justify-center rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
            >
              <p className="eyebrow mb-2">Guide</p>
              <h3 className="font-serif text-2xl font-semibold">How to Read a Research Paper</h3>
              <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                The three-pass method, a reading order that isn&apos;t the printed order, and the
                habit that turns scattered reading into an actual literature review.
              </p>
              <span className="text-brand-700 dark:text-brand-400 mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                Read the guide
                <ArrowRightIcon
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
