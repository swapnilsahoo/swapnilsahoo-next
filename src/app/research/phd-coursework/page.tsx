import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { phdColumns, phdSupervision } from "@/features/profile/data/phd";
import {
  beforeCourseworkChecklist,
  courseworkComponents,
  courseworkToSupervisionBridge,
} from "@/features/research/data/phd-coursework";

export const metadata: Metadata = {
  title: "PhD Mandatory Coursework | What It's Actually For",
  description:
    "What the mandatory coursework phase of a research doctorate should accomplish before you propose a dissertation — research methodology, statistical range, theory immersion and the qualifying checkpoint — plus how I use it in supervision.",
  keywords: [
    "PhD mandatory coursework",
    "doctoral coursework",
    "PhD qualifying exam",
    "research methodology course",
    "PhD supervision",
  ],
  alternates: { canonical: "/research/phd-coursework" },
  openGraph: {
    type: "article",
    title: "PhD Mandatory Coursework | What It's Actually For",
    description:
      "Coursework is not a formality before the dissertation — it's where the dissertation gets easier or harder.",
    url: "/research/phd-coursework",
    images: ["/images/gallery/aom-2026-philadelphia-convention-center.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "PhD Mandatory Coursework",
  description:
    "What the mandatory coursework phase of a research doctorate is actually for, and how to use it well.",
  provider: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

export default function PhdCourseworkPage() {
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
              href="/research"
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              Research
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              PhD Mandatory Coursework
            </span>
          </nav>

          <div
            data-page-hero="academic"
            className="relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-ink-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14"
          >
            <Image
              src="/images/gallery/aom-2026-philadelphia-convention-center.webp"
              alt="Swapnil Sahoo with fellow doctoral researchers and scholars at the Academy of Management annual meeting, AOM 2026, Philadelphia"
              fill
              priority
              className="-z-20 object-cover"
              style={{ objectPosition: "center 55%" }}
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
              PhD supervision
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              PhD mandatory{" "}
              <span className="text-brand-200 font-normal italic">coursework.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Coursework is not a formality standing between you and your dissertation — it&apos;s
              where the dissertation gets easier or harder, months before you&apos;ve written a single
              chapter of it. Here&apos;s what each mandatory component is actually for, and how I use
              it once supervision begins.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#components"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                See the four components
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/research/phd-coursework/research-design-primer"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                Research design primer
              </Link>
              <Link
                href="/research/phd-coursework/how-to-read-a-research-paper"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                How to read a research paper
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="coursework-inquiry"
        eyebrow="Before you treat it as a checklist"
        title="If you can already describe your topic fluently, can you also name the specific gap in the literature it fills?"
        questions={[
          "Which methodological camp are you weaker in — and are you actually spending coursework closing that gap, or avoiding it?",
          "Could you place a paper you've never seen onto your field's live debates within five minutes of reading its abstract?",
        ]}
      />

      <section id="components" aria-labelledby="components-title" className="py-16 sm:py-24">
        <Container className="max-w-[100rem]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / What each component is for</p>
              <h2 id="components-title" className="display text-4xl font-semibold md:text-5xl">
                Four components, one purpose each.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              The exact course list varies by programme and changes over time, so rather than
              naming specific courses, here is what each mandatory component should leave you
              able to do — and how to tell whether it actually did.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {courseworkComponents.map((item, index) => (
              <article key={item.id} className="glass-card p-6">
                <span className="bg-brand-600 flex h-8 w-8 items-center justify-center rounded-full font-mono text-[11px] text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-serif text-xl font-semibold">{item.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {item.purpose}
                </p>
                <div className="mt-4 flex gap-3 border-t border-ink-200/80 pt-4 dark:border-ink-700">
                  <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                    ✓
                  </span>
                  <p className="text-ink-500 dark:text-ink-400 text-xs leading-relaxed">
                    <span className="font-semibold">Done well: </span>
                    {item.doneWell}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[100rem]" />

      <section aria-labelledby="bridge-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[100rem]">
          <div className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                {courseworkToSupervisionBridge.eyebrow}
              </p>
              <h2 id="bridge-title" className="mt-3 font-serif text-4xl font-semibold">
                {courseworkToSupervisionBridge.title}
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-blue-50">
                {courseworkToSupervisionBridge.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="checklist-title" className="pb-16 sm:pb-24">
        <Container className="max-w-[100rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Before your first term of coursework</p>
            <h2 id="checklist-title" className="display text-4xl font-semibold md:text-5xl">
              Four things worth doing before term one.
            </h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {beforeCourseworkChecklist.map((item, index) => (
              <li
                key={item}
                className="border-ink-200/80 dark:border-ink-700 grid grid-cols-[auto_1fr] gap-4 rounded-2xl border p-5"
              >
                <span className="bg-brand-600 flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-semibold text-white">
                  {index + 1}
                </span>
                <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">{item}</p>
              </li>
            ))}
          </ol>
          <p className="text-ink-500 dark:text-ink-400 mt-6 text-xs leading-relaxed">
            The single highest-leverage habit on this list is the reference manager — see{" "}
            <Link
              href="/research/phd-coursework/how-to-read-a-research-paper"
              className="link-underline font-semibold"
            >
              How to Read a Research Paper
            </Link>{" "}
            for the reading system that makes it pay off.
          </p>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[100rem]" />

      <section aria-labelledby="supervision-title" className="py-16 sm:py-24">
        <Container className="max-w-[100rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">03 / How this connects to supervision</p>
            <h2 id="supervision-title" className="display text-4xl font-semibold md:text-5xl">
              Coursework is where I start looking for who to supervise.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              {phdSupervision.description}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {phdColumns.map((column) => (
              <div key={column.title} className="glass-card p-6">
                <h3 className="font-serif text-lg font-semibold">{column.title}</h3>
                <ul className="text-ink-600 dark:text-ink-300 mt-3 space-y-2 text-sm leading-relaxed">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" aria-hidden="true">
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="glass-card mt-6 flex flex-wrap items-center justify-between gap-4 p-6">
            <p className="text-ink-600 dark:text-ink-300 max-w-xl text-sm leading-relaxed">
              {phdSupervision.proposalPrompt}
            </p>
            <a
              href={phdSupervision.ctaHref}
              className="focus-visible:ring-brand-500 inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:-translate-y-0.5 hover:bg-brand-700 focus-visible:ring-2 focus-visible:outline-none"
            >
              {phdSupervision.ctaLabel}
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[100rem]">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow mb-3">Continue reading</p>
            <h2 id="continue-title" className="display text-4xl font-semibold">
              Two skills coursework assumes you already have.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <Link
              href="/research/phd-coursework/research-design-primer"
              className="glass-card group flex flex-col justify-center p-6 transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none sm:p-7"
            >
              <p className="eyebrow mb-2">Guide</p>
              <h3 className="font-serif text-2xl font-semibold">Research Design Primer</h3>
              <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                The four kinds of validity in plain language, the construct-measurement gap, four
                threats to any causal claim, and how to match a design to a question.
              </p>
              <span className="text-brand-700 dark:text-brand-400 mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                Read the guide
                <ArrowRightIcon
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
            <Link
              href="/research/phd-coursework/how-to-read-a-research-paper"
              className="glass-card group flex flex-col justify-center p-6 transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none sm:p-7"
            >
              <p className="eyebrow mb-2">Guide</p>
              <h3 className="font-serif text-2xl font-semibold">
                How to Read a Research Paper
              </h3>
              <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                No seminar teaches this explicitly, but every seminar assumes you can already do
                it. The three-pass method, a reading order that isn&apos;t the printed order, and the
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
