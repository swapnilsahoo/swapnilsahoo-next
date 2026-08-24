import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { founderPlaybookCourses } from "@/features/teaching/data/founder-playbook-courses";
import {
  coFounderMistakes,
  earlyHireTraits,
  equityGuidance,
} from "@/features/teaching/data/hiring-first-team";

const course = founderPlaybookCourses.find((item) => item.slug === "hiring-first-team")!;

export const metadata: Metadata = {
  title: "Hiring Your First Five People | The Founder's Playbook",
  description:
    "A short original course on making your earliest hires: four traits that matter more than credentials, a simple approach to early equity, and the co-founder mistakes that quietly break companies later.",
  keywords: [
    "startup hiring",
    "early employees",
    "co-founder equity",
    "startup team building",
    "MBA entrepreneurship",
  ],
  alternates: { canonical: "/teaching/hiring-first-team" },
  openGraph: {
    type: "article",
    title: "Hiring Your First Five People",
    description: "Four traits that matter more than credentials, and a simple approach to early equity.",
    url: "/teaching/hiring-first-team",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Hiring Your First Five People",
  description: "A short original course on making your earliest hires well.",
  provider: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

export default function HiringFirstTeamPage() {
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
              href="/teaching/how-to-build-a-startup"
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              The Founder&apos;s Playbook
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              Hiring Your First Team
            </span>
          </nav>

          <div
            data-page-hero="academic"
            className="relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-ink-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14"
          >
            <Image
              src="/images/gallery/founder-playbook-classroom-group-2.jpg"
              alt="A classroom group at Great Lakes Gurgaon"
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
              The Founder&apos;s Playbook · Short course
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              Hiring your{" "}
              <span className="text-brand-200 font-normal italic">first five people.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Your first hires aren&apos;t filling roles — they&apos;re defining what the company
              becomes capable of before there&apos;s a process to fall back on. Get them right and you
              buy speed and judgment you couldn&apos;t otherwise afford. Get them wrong and every
              later hire inherits the problem.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={course.deckHref}
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                Download the slide deck
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> (PowerPoint file)</span>
              </a>
              <a
                href="#traits"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                Read the modules
              </a>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="hiring-inquiry"
        eyebrow="Before the first offer letter"
        title="A great resume tells you what someone has done. It rarely tells you what they'll do when nothing is defined yet."
        questions={[
          "If this person disagreed with your plan on their first day, would they actually say so?",
          "What specific, checkable thing has this person built, shipped or fixed?",
        ]}
      />

      <section id="traits" aria-labelledby="traits-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">Module 01 / What actually matters early</p>
              <h2 id="traits-title" className="display text-4xl font-semibold md:text-5xl">
                Four traits that beat a strong resume.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              None of these show up clearly on a CV. All four take a real conversation, and
              sometimes a reference call, to actually see.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {earlyHireTraits.map((item, index) => (
              <article key={item.id} className="glass-card p-6">
                <span className="text-brand-600/15 dark:text-brand-300/10 font-serif text-5xl font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-serif text-xl font-semibold">{item.trait}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {item.whyItMatters}
                </p>
                <div className="mt-4 flex gap-3 border-t border-ink-200/80 pt-4 dark:border-ink-700">
                  <span className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true">✕</span>
                  <p className="text-ink-500 dark:text-ink-400 text-xs leading-relaxed">{item.redFlag}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="equity-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Module 02 / A simple approach to early equity</p>
            <h2 id="equity-title" className="display text-4xl font-semibold md:text-5xl">
              Four rules that prevent most future disputes.
            </h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {equityGuidance.map((item, index) => (
              <li key={item} className="border-ink-200/80 dark:border-ink-700 grid grid-cols-[auto_1fr] gap-4 rounded-2xl border p-5">
                <span className="bg-brand-600 flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-semibold text-white">
                  {index + 1}
                </span>
                <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">{item}</p>
              </li>
            ))}
          </ol>
          <p className="text-ink-500 dark:text-ink-400 mt-6 text-xs leading-relaxed">
            Read alongside{" "}
            <Link href="/teaching/raising-money" className="link-underline font-semibold">
              Raising Money Without Losing the Company
            </Link>{" "}
            — early equity decisions and future dilution rounds affect the same cap table.
          </p>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="cofounder-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[87.5rem]">
          <div className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                Module 03 / Co-founder mistakes
              </p>
              <h2 id="cofounder-title" className="mt-3 font-serif text-4xl font-semibold">
                The conversations avoided early cost the most later.
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {coFounderMistakes.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm leading-relaxed text-blue-50">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[87.5rem]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">Continue the playbook</p>
              <h2 id="continue-title" className="display text-4xl font-semibold">
                Keep building.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/teaching/how-to-build-a-startup"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">The Founder&apos;s Playbook</p>
                <h3 className="font-serif text-2xl font-semibold">How to Build a Startup?</h3>
              </Link>
              <Link
                href="/teaching/product-market-fit"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Short course</p>
                <h3 className="font-serif text-2xl font-semibold">Finding Product-Market Fit</h3>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
