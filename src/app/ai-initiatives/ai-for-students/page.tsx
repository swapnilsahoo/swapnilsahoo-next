import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import {
  studentAiModules,
  studentGoldenRule,
  studentResponsiblePrinciples,
} from "@/features/ai-initiatives/data/ai-for-students";

export const metadata: Metadata = {
  title: "AI for Students | AI Initiatives",
  description:
    "Practical AI guidance for PGDM and MBA students: using AI well for case prep and class participation, placement prep, research and assignments, and building — plus one rule that doesn't move: AI accelerates the draft, the judgment stays yours.",
  keywords: [
    "AI for students",
    "AI in case prep",
    "AI for placement prep",
    "responsible AI use for students",
    "AI academic integrity",
  ],
  alternates: { canonical: "/ai-initiatives/ai-for-students" },
  openGraph: {
    type: "article",
    title: "AI for Students",
    description:
      "Four modules on using AI well as a student — case prep, placements, assignments, and building. AI accelerates the draft; the judgment stays yours.",
    url: "/ai-initiatives/ai-for-students",
    images: ["/images/gallery/2-year-mba-strategic-management-closure-2.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI for Students",
  description:
    "Practical AI guidance for PGDM and MBA students, covering case prep, placement prep, research and assignments, and building with AI.",
  provider: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

export default function AiForStudentsPage() {
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
              href="/ai-initiatives"
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              AI Initiatives
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              AI for Students
            </span>
          </nav>

          <div
            data-page-hero="academic"
            className="relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-ink-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14"
          >
            <Image
              src="/images/gallery/2-year-mba-strategic-management-closure-2.jpg"
              alt="A PGDM classroom group at Great Lakes Institute of Management, Gurgaon"
              fill
              priority
              className="-z-20 object-cover"
              style={{ objectPosition: "center 40%" }}
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
              AI Initiatives
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              AI for{" "}
              <span className="text-brand-200 font-normal italic">students.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Not a rule against using AI — a guide to using it well. Four places it actually
              shows up in your PGDM life: case prep, placements, assignments and building. In each
              one, there&apos;s a real time-saving use and an easy way to quietly hollow out the point
              of the exercise. This page is about telling those apart.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#modules"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                See the four modules
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/ai-initiatives/ai-hackathon"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                See the AI Mini Hackathon
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="ai-students-inquiry"
        eyebrow="Before you open the assistant"
        title="If you couldn't use AI for the next hour, would your answer actually change?"
        questions={[
          "Are you using it to save time on the part that was never the point, or to skip the part that was?",
          "Could you defend this out loud, right now, without looking at what the assistant gave you?",
        ]}
      />

      <section id="modules" aria-labelledby="modules-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">01 / Where this actually comes up</p>
            <h2 id="modules-title" className="display text-4xl font-semibold md:text-5xl">
              Four situations, one question each time.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              In each situation: what&apos;s the real, defensible use — and what&apos;s the version that
              quietly hollows out the exercise?
            </p>
          </div>

          <div className="grid gap-5">
            {studentAiModules.map((module, index) => (
              <article key={module.id} className="glass-card p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="bg-brand-600 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-2xl font-semibold">{module.title}</h3>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="border-ink-200/80 dark:border-ink-700 rounded-2xl border p-5">
                    <p className="text-emerald-700 dark:text-emerald-400 mb-2 font-mono text-[11px] font-semibold tracking-[0.08em] uppercase">
                      Do this
                    </p>
                    <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                      {module.doThis}
                    </p>
                  </div>
                  <div className="border-ink-200/80 dark:border-ink-700 rounded-2xl border p-5">
                    <p className="mb-2 font-mono text-[11px] font-semibold tracking-[0.08em] text-red-600 uppercase dark:text-red-400">
                      Not this
                    </p>
                    <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                      {module.notThis}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="text-ink-500 dark:text-ink-400 mt-6 text-xs leading-relaxed">
            For the fuller placement process beyond the AI-specific piece above, see{" "}
            <Link href="/placements" className="link-underline font-semibold">
              Placement Assistance
            </Link>
            .
          </p>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="rule-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                02 / The rule that doesn&apos;t move
              </p>
              <h2 id="rule-title" className="mt-3 font-serif text-4xl font-semibold">
                {studentGoldenRule.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-blue-100">
                {studentGoldenRule.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="responsible-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">03 / Before you submit anything</p>
            <h2 id="responsible-title" className="display text-4xl font-semibold md:text-5xl">
              Three checks, every time.
            </h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {studentResponsiblePrinciples.map((item, index) => (
              <li
                key={item}
                className="border-ink-200/80 dark:border-ink-700 grid grid-cols-[auto_1fr] gap-4 rounded-2xl border p-5"
              >
                <span className="bg-brand-600 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold text-white">
                  {index + 1}
                </span>
                <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">{item}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[87.5rem]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">More AI initiatives</p>
              <h2 id="continue-title" className="display text-4xl font-semibold">
                Reading about it is step one. Building is step two.
              </h2>
            </div>
            <Link
              href="/ai-initiatives/ai-hackathon"
              className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 group flex flex-col justify-center rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
            >
              <p className="eyebrow mb-2">Student build programme</p>
              <h3 className="font-serif text-2xl font-semibold">AI Mini Hackathon</h3>
              <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                How an incoming PGDM cohort turned student problems into testable GenAI
                prototypes — plus Side Quests, a page of my own beta builds, open for testing.
              </p>
              <span className="text-brand-700 dark:text-brand-400 mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                See the hackathon
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
