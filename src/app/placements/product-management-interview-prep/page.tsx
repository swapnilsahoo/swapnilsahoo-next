import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { QuizList } from "@/features/placements/components/QuizList";
import {
  productManagementQuestions,
  productManagementTopics,
} from "@/features/placements/data/product-management-quiz";

export const metadata: Metadata = {
  title: "Product Management Interview Prep: Self-Test",
  description:
    "A self-test for product management interviews across product sense, metrics, prioritisation, technical understanding and strategy — ten original questions with full explanations, plus the PM frameworks worth knowing.",
  keywords: [
    "product management interview",
    "PM interview questions",
    "product sense",
    "RICE framework",
    "product metrics",
    "MBA placements",
  ],
  alternates: { canonical: "/placements/product-management-interview-prep" },
  openGraph: {
    type: "article",
    title: "Product Management Interview Prep: Self-Test",
    description: "Ten original PM interview questions across five topic areas, with explanations.",
    url: "/placements/product-management-interview-prep",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "Product Management Interview Prep: Self-Test",
  about: "Product management interview preparation",
  educationalLevel: "Postgraduate / MBA",
  publisher: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

const pmFrameworks = [
  { name: "RICE", use: "Prioritise features by Reach, Impact, Confidence and Effort." },
  { name: "AARRR", use: "Trace the funnel: Acquisition, Activation, Retention, Referral, Revenue." },
  { name: "CIRCLES", use: "Structure a product-design answer end to end, from user need to metrics." },
  { name: "North Star Metric", use: "Pick the one metric that best captures value delivered to users." },
] as const;

export default function ProductManagementInterviewPrepPage() {
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
              Product Management Interview Prep
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
              Placement readiness · Product management
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              Test your{" "}
              <span className="text-brand-200 font-normal italic">product judgment.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Ten original questions across the five areas PM interviews actually probe. Try to
              answer before revealing — the explanation matters more than the correct letter.
            </p>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="pm-inquiry"
        eyebrow="Before you pick an option"
        title="A confident wrong answer teaches you nothing. Reason it out first."
        questions={[
          "What would have to be true for each option to be the best answer?",
          "Which option are you drawn to because it's familiar, not because it's right for this question?",
        ]}
      />

      <section aria-labelledby="frameworks-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">01 / Frameworks worth knowing</p>
            <h2 id="frameworks-title" className="display text-4xl font-semibold md:text-5xl">
              A short list, used well.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              PM interviews reward candidates who use one framework precisely, not candidates who
              can recite several. Know what each is for and reach for it deliberately.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pmFrameworks.map((framework) => (
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

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section aria-labelledby="quiz-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Self-test</p>
            <h2 id="quiz-title" className="display text-4xl font-semibold md:text-5xl">
              Ten questions, five areas.
            </h2>
          </div>
          <QuizList topics={productManagementTopics} questions={productManagementQuestions} />
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">Continue practising</p>
              <h2 id="continue-title" className="display text-4xl font-semibold">
                Structure still matters.
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
                href="/placements/strategy-entrepreneurship-interview-prep"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Related self-test</p>
                <h3 className="font-serif text-2xl font-semibold">Strategy &amp; Entrepreneurship</h3>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
