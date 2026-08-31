import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { QuizList } from "@/features/placements/components/QuizList";
import {
  strategyEntrepreneurshipQuestions,
  strategyEntrepreneurshipTopics,
} from "@/features/placements/data/strategy-entrepreneurship-quiz";

export const metadata: Metadata = {
  title: "Strategy & Entrepreneurship Interview Prep: Self-Test",
  description:
    "A self-test for strategy and entrepreneurship interviews across competitive strategy, corporate strategy, unit economics, business model design and growth — ten original questions with full explanations.",
  keywords: [
    "strategy interview questions",
    "entrepreneurship interview",
    "unit economics",
    "business model canvas",
    "Ansoff matrix",
    "Porter's Five Forces",
    "MBA placements",
  ],
  alternates: { canonical: "/placements/strategy-entrepreneurship-interview-prep" },
  openGraph: {
    type: "article",
    title: "Strategy & Entrepreneurship Interview Prep: Self-Test",
    description:
      "Ten original strategy and entrepreneurship interview questions, with explanations.",
    url: "/placements/strategy-entrepreneurship-interview-prep",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "Strategy & Entrepreneurship Interview Prep: Self-Test",
  about: "Strategy and entrepreneurship interview preparation",
  educationalLevel: "Postgraduate / MBA",
  publisher: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

const strategyFrameworks = [
  { name: "Porter's Five Forces", use: "Assess industry structure and where profit is likely to be squeezed." },
  { name: "Ansoff Matrix", use: "Map growth options across existing/new products and markets." },
  { name: "Business Model Canvas", use: "Lay out how a business creates, delivers and captures value." },
  { name: "LTV : CAC", use: "Judge whether a customer relationship is economically worth acquiring." },
] as const;

export default function StrategyEntrepreneurshipInterviewPrepPage() {
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
              Strategy &amp; Entrepreneurship Interview Prep
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
              Placement readiness · Strategy &amp; entrepreneurship
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              Frameworks are easy.{" "}
              <span className="text-brand-200 font-normal italic">Applying them isn&apos;t.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Ten original questions across competitive strategy, corporate strategy, startup unit
              economics, business model design and growth. Reason through each before revealing
              the answer.
            </p>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="se-inquiry"
        eyebrow="Before you pick an option"
        title="Naming a framework is not the same as knowing when it applies."
        questions={[
          "Could you explain, in one sentence, why this framework fits this specific question?",
          "What evidence would make you abandon your first answer?",
        ]}
      />

      <section aria-labelledby="frameworks-title" className="py-16 sm:py-24">
        <Container className="max-w-[100rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">01 / Frameworks worth knowing</p>
            <h2 id="frameworks-title" className="display text-4xl font-semibold md:text-5xl">
              Four tools, used precisely.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {strategyFrameworks.map((framework) => (
              <div key={framework.name} className="glass-card p-5">
                <p className="font-serif text-lg font-semibold">{framework.name}</p>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-relaxed">
                  {framework.use}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[100rem]" />

      <section aria-labelledby="quiz-title" className="py-16 sm:py-24">
        <Container className="max-w-[100rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Self-test</p>
            <h2 id="quiz-title" className="display text-4xl font-semibold md:text-5xl">
              Ten questions, five areas.
            </h2>
          </div>
          <QuizList
            topics={strategyEntrepreneurshipTopics}
            questions={strategyEntrepreneurshipQuestions}
          />
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[100rem]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">Continue practising</p>
              <h2 id="continue-title" className="display text-4xl font-semibold">
                Take the framework into a real case.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/placements/case-frameworks"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Structure</p>
                <h3 className="font-serif text-2xl font-semibold">Case Frameworks</h3>
              </Link>
              <Link
                href="/placements/product-management-interview-prep"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Related self-test</p>
                <h3 className="font-serif text-2xl font-semibold">Product Management</h3>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
