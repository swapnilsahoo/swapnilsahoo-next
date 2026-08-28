import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { caseBank } from "@/features/placements/data/case-interview-bank";

export const metadata: Metadata = {
  title: "Case Interview Bank: Ten More Cases to Practise",
  description:
    "Ten original practice cases spanning product, growth strategy, pricing, competitive response, profitability diagnosis, pre-sales ethics, causal reasoning and PE/VC diligence — each with the questions a strong answer should raise and what it should demonstrate.",
  keywords: [
    "case interview practice",
    "MBA case interview bank",
    "product case interview",
    "profitability case interview",
    "market entry case",
    "consulting case practice",
  ],
  alternates: { canonical: "/placements/case-interview-bank" },
  openGraph: {
    type: "article",
    title: "Case Interview Bank: Ten More Cases to Practise",
    description:
      "Ten original practice cases across product, strategy, pricing and diligence, each with what a strong answer should demonstrate.",
    url: "/placements/case-interview-bank",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Case Interview Bank: Ten More Cases to Practise",
  headline: "Ten original practice cases across product, strategy, pricing, and diligence",
  learningResourceType: "Interview preparation guide",
  educationalLevel: "Postgraduate / MBA",
  publisher: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

export default function CaseInterviewBankPage() {
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
              Case Interview Bank
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
              Placement readiness · Case practice
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              Ten cases,{" "}
              <span className="text-brand-200 font-normal italic">ten different traps.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Case Frameworks teaches the six families. Case Examples walks three fully worked
              cases end to end. This is what comes after both: ten shorter, varied prompts — a
              product retention problem, a PE due-diligence call, an experiment you shouldn&apos;t
              trust yet — each with the questions a strong answer raises and, underneath, what
              that answer actually needs to demonstrate.
            </p>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="case-bank-inquiry"
        eyebrow="Before you open the first one"
        title="A case interview isn't scored on the final number. It's scored on how you got there when the data didn't cooperate."
        questions={[
          "When a case gives you a number that contradicts your first hypothesis, do you defend the hypothesis or update it out loud?",
          "Could you tell the difference between a case that needs a framework and one that needs you to just do the arithmetic?",
        ]}
      />

      <section aria-labelledby="bank-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">01 / The bank</p>
            <h2 id="bank-title" className="display text-4xl font-semibold md:text-5xl">
              Read the prompt. Structure it yourself before you expand the rest.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Each case opens with just the prompt. Work it on paper first — the questions inside
              are the path an interviewer would actually walk you down, not the only correct one.
            </p>
          </div>

          <div className="space-y-4">
            {caseBank.map((item) => (
              <details key={item.id} className="glass-card group p-2">
                <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none flex-wrap items-center gap-3 rounded-xl px-4 py-4 marker:hidden focus-visible:ring-2 focus-visible:outline-none sm:px-5">
                  <span className="bg-brand-600 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold text-white">
                    {item.number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow mb-1 block">{item.theme}</span>
                    <span className="font-serif text-lg leading-snug font-semibold sm:text-xl">
                      {item.title}
                    </span>
                  </span>
                  <span className="text-brand-700 dark:text-brand-300 shrink-0 font-sans text-sm group-open:hidden">
                    Open
                  </span>
                  <span className="text-brand-700 dark:text-brand-300 hidden shrink-0 font-sans text-sm group-open:inline">
                    Close
                  </span>
                </summary>
                <div className="border-ink-200/80 dark:border-ink-700 border-t px-4 pt-5 pb-5 sm:px-5">
                  <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed italic">
                    {item.prompt}
                  </p>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    {item.steps.map((step) => (
                      <div key={step.label}>
                        <p className="text-ink-500 dark:text-ink-400 text-xs font-semibold tracking-wide uppercase">
                          {step.label}
                        </p>
                        <ul className="mt-2 space-y-2">
                          {step.items.map((line) => (
                            <li
                              key={line}
                              className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed"
                            >
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="border-ink-200/80 dark:border-ink-700 mt-5 border-t pt-4">
                    <p className="text-ink-500 dark:text-ink-400 mb-2 text-xs font-semibold tracking-wide uppercase">
                      What a strong answer demonstrates
                    </p>
                    <ul className="space-y-1.5">
                      {item.strongAnswer.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span
                            className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0 text-xs"
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                          <p className="text-ink-600 dark:text-ink-300 text-xs leading-relaxed">
                            {line}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[87.5rem]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">Continue practising</p>
              <h2 id="continue-title" className="display text-4xl font-semibold">
                Structure first, bank second.
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
                href="/placements/case-examples"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Fully worked</p>
                <h3 className="font-serif text-2xl font-semibold">Case Examples</h3>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
