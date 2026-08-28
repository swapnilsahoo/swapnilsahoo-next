import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { piRubric } from "@/features/placements/data/personal-interview";

export const metadata: Metadata = {
  title: "Personal Interview Preparation: What the Panel Is Actually Scoring",
  description:
    "The ten dimensions a placement panel scores in a personal interview — grooming and body language, communication, resume defense, structured answers, industry knowledge, functional depth, caselets and current affairs — with sample questions and how to prepare for each.",
  keywords: [
    "personal interview preparation",
    "PI interview MBA",
    "placement interview rubric",
    "tell me about yourself answer",
    "resume defense interview",
    "MBA placements",
  ],
  alternates: { canonical: "/placements/personal-interview-preparation" },
  openGraph: {
    type: "article",
    title: "Personal Interview Preparation: What the Panel Is Actually Scoring",
    description:
      "Ten things a PI panel scores, with sample questions and how to prepare for each.",
    url: "/placements/personal-interview-preparation",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Personal Interview Preparation: What the Panel Is Actually Scoring",
  headline: "Ten things a personal-interview panel is quietly scoring",
  learningResourceType: "Interview preparation guide",
  educationalLevel: "Postgraduate / MBA",
  publisher: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

export default function PersonalInterviewPreparationPage() {
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
              href="/placements"
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              Placement Assistance
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              Personal Interview Preparation
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
              Placement readiness · Personal interview
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              Ten things the panel is{" "}
              <span className="text-brand-200 font-normal italic">quietly scoring.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              A personal interview isn&apos;t one test — it&apos;s ten, running at the same time.
              Grooming and body language in the first thirty seconds. Whether your resume
              survives being questioned three levels deep. Whether you have an actual opinion on
              the news. Most candidates prepare for the questions they expect and get caught by
              the ones they didn&apos;t know were being scored at all. This is what&apos;s on the
              rubric, line by line.
            </p>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="pi-inquiry"
        eyebrow="Before you walk in"
        title="If the panel only remembered one thing about you afterward, which of these ten would you want it to be?"
        questions={[
          "Which of the ten below would you score yourself lowest on, honestly — and when did you last practise it out loud?",
          "Could you defend every line on your resume three questions deep, right now, without notes?",
        ]}
      />

      <section aria-labelledby="rubric-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">01 / The rubric</p>
            <h2 id="rubric-title" className="display text-4xl font-semibold md:text-5xl">
              What&apos;s actually being scored, and what it sounds like in the room.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Each of these is a real line on a personal-interview scorecard. For the two that
              aren&apos;t asked as spoken questions — grooming and communication — what follows is
              what the panel actually watches and listens for instead.
            </p>
          </div>

          <ol className="grid gap-5 lg:grid-cols-2">
            {piRubric.map((item, index) => (
              <li key={item.id} className="glass-card p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="bg-brand-600 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-xl leading-snug font-semibold">
                    {item.category}
                  </h3>
                </div>
                <p className="text-ink-700 dark:text-ink-200 mt-4 text-sm leading-relaxed">
                  {item.whatIsScored}
                </p>
                <div className="border-ink-200/80 dark:border-ink-700 mt-5 border-t pt-4">
                  <p className="text-ink-500 dark:text-ink-400 text-xs font-semibold tracking-wide uppercase">
                    In the room
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {item.inTheRoom.map((line) => (
                      <li
                        key={line}
                        className="text-ink-600 dark:text-ink-300 text-xs leading-relaxed italic"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex gap-2">
                  <span
                    className="text-brand-700 dark:text-brand-400 mt-0.5 shrink-0 text-xs font-bold"
                    aria-hidden="true"
                  >
                    →
                  </span>
                  <p className="text-ink-500 dark:text-ink-400 text-xs leading-relaxed">
                    <span className="text-ink-700 dark:text-ink-200 font-semibold">Prepare: </span>
                    {item.prepTip}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[87.5rem]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">Continue practising</p>
              <h2 id="continue-title" className="display text-4xl font-semibold">
                The rubric points back to the rest of the studio.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/placements/industry-analysis"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">For line 07</p>
                <h3 className="font-serif text-2xl font-semibold">Rigorous Industry Analysis</h3>
              </Link>
              <Link
                href="/placements/guesstimates"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">For line 09</p>
                <h3 className="font-serif text-2xl font-semibold">Guesstimates</h3>
              </Link>
              <Link
                href="/placements/case-frameworks"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">For line 09</p>
                <h3 className="font-serif text-2xl font-semibold">Case Frameworks</h3>
              </Link>
              <Link
                href="/placements/general-management-interviews"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">For line 08</p>
                <h3 className="font-serif text-2xl font-semibold">General Management</h3>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
