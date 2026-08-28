import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import {
  behavioralGroups,
  evidenceLadder,
} from "@/features/placements/data/behavioral-questions";

export const metadata: Metadata = {
  title: "Behavioral & Leadership Interview Questions",
  description:
    "Behavioral, leadership, conflict and ethical-judgment interview questions grouped by what they're actually probing, plus the eight-question evidence ladder for defending any number on your resume.",
  keywords: [
    "behavioral interview questions",
    "leadership interview questions MBA",
    "STAR method interview",
    "conflict interview question",
    "resume defense questions",
  ],
  alternates: { canonical: "/placements/behavioral-interview-questions" },
  openGraph: {
    type: "article",
    title: "Behavioral & Leadership Interview Questions",
    description:
      "Behavioral and leadership questions grouped by what they're actually probing, plus an eight-question evidence ladder for any resume claim.",
    url: "/placements/behavioral-interview-questions",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Behavioral & Leadership Interview Questions",
  headline: "Behavioral and leadership interview questions grouped by what they actually probe",
  learningResourceType: "Interview preparation guide",
  educationalLevel: "Postgraduate / MBA",
  publisher: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

export default function BehavioralInterviewQuestionsPage() {
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
              Behavioral &amp; Leadership Interview Questions
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
              Placement readiness · Behavioral &amp; leadership
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              &ldquo;Tell me about a time&rdquo;{" "}
              <span className="text-brand-200 font-normal italic">isn&apos;t one question.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Every behavioral prompt is testing one of a handful of specific things — how you
              handle conflict, whether you own a failure honestly, what you sacrifice under a real
              trade-off, whether a metric ever made you do the wrong thing. Prepare against the
              category, not the exact wording, because the wording changes every time.
            </p>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="behavioral-inquiry"
        eyebrow="Before you reach for a rehearsed story"
        title="If the interviewer asked a follow-up you hadn't prepared for, would the story still hold up?"
        questions={[
          "Which of your go-to stories have you actually been asked to extend past the ending — and did it survive?",
          "Is there a story you tell where you were, honestly, mostly wrong? Do you have one of those ready?",
        ]}
      />

      <section aria-labelledby="groups-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">01 / By what it&apos;s actually testing</p>
            <h2 id="groups-title" className="display text-4xl font-semibold md:text-5xl">
              Five categories, not one big list.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Prepare one honest story per category below — not a polished one. The follow-up
              question almost always asks what you&apos;d do differently, and a story with no
              real cost to you doesn&apos;t survive that.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {behavioralGroups.map((group, index) => (
              <article key={group.id} className="glass-card p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="bg-brand-600 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-xl font-semibold">{group.theme}</h3>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {group.questions.map((question) => (
                    <li
                      key={question}
                      className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed italic"
                    >
                      &ldquo;{question}&rdquo;
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="ladder-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                02 / The evidence ladder
              </p>
              <h2 id="ladder-title" className="mt-3 font-serif text-4xl font-semibold">
                Eight questions, for any number on your resume.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-blue-100">
                &ldquo;Turnaround time reduced by 30%&rdquo; is not a claim you get to state once
                and move on from. Any quantified line on your resume should survive all eight of
                these, in order, without notes.
              </p>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                {evidenceLadder.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 rounded-xl bg-white/5 p-4">
                    <span className="font-mono text-xs font-semibold text-blue-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed text-blue-50">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[87.5rem]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">Continue practising</p>
              <h2 id="continue-title" className="display text-4xl font-semibold">
                Structure the answer, not just the story.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/placements/personal-interview-preparation"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">The full rubric</p>
                <h3 className="font-serif text-2xl font-semibold">Personal Interview Prep</h3>
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
