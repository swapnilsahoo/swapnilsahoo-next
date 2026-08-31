import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import {
  interrogationQuestions,
  legitimateAccessMethods,
  newFieldTip,
  paperLogFields,
  practiceNote,
  readingMistakes,
  readingOrder,
  readingPasses,
  triageQuestions,
} from "@/features/research/data/how-to-read-a-research-paper";

export const metadata: Metadata = {
  title: "How to Read a Research Paper | PhD Mandatory Coursework",
  description:
    "A practical, elaborated guide: what to check before you commit to a full read, the three-pass method, a reading order that isn't the printed order, five questions to interrogate every claim with, how to get a paper legitimately, and the habit that turns scattered reading into an actual literature review.",
  keywords: [
    "how to read a research paper",
    "three pass method",
    "literature review method",
    "PhD reading strategy",
    "reading academic papers efficiently",
    "how to find research papers",
  ],
  alternates: { canonical: "/research/phd-coursework/how-to-read-a-research-paper" },
  openGraph: {
    type: "article",
    title: "How to Read a Research Paper",
    description:
      "Read in passes, in an order that isn't the printed order — and log it or you'll re-read it in six months.",
    url: "/research/phd-coursework/how-to-read-a-research-paper",
    images: ["/images/gallery/aom-2026-entrepreneurship-under-constraint.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Read a Research Paper",
  description:
    "A three-pass method for reading research papers efficiently, and a system for retaining what you read.",
  author: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

export default function HowToReadAResearchPaperPage() {
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
              href="/research/phd-coursework"
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              PhD Mandatory Coursework
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              How to Read a Research Paper
            </span>
          </nav>

          <div
            data-page-hero="academic"
            className="relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-ink-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14"
          >
            <Image
              src="/images/gallery/aom-2026-entrepreneurship-under-constraint.jpg"
              alt="Dr Swapnil Sahoo presenting his paper, Reconstructing Entrepreneurship Under Constraint, at the Academy of Management annual meeting, AOM 2026"
              fill
              priority
              className="-z-20 object-cover"
              style={{ objectPosition: "center 35%" }}
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
              How to read a{" "}
              <span className="text-brand-200 font-normal italic">research paper.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              No seminar teaches this explicitly, but every seminar assumes you can already do it.
              Reading a paper start to finish, once, at the same pace throughout, is the slowest
              and least useful way to read it — read in deliberate passes instead, in an order
              that isn&apos;t the order it was printed in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#three-pass"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                See the three-pass method
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
        id="reading-inquiry"
        eyebrow="Worth asking before you open the next PDF"
        title="If you had to summarise the last paper you read in one honest sentence, could you — or would you have to reopen it?"
        questions={[
          "Are you finishing papers because they earned it, or because you feel obligated to finish what you start?",
          "Could you name this paper's single weakest claim right now, without looking?",
        ]}
      />

      <section id="before-you-open" aria-labelledby="before-you-open-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">01 / Before you open the PDF</p>
            <h2 id="before-you-open-title" className="display text-4xl font-semibold md:text-5xl">
              Most papers you sample shouldn&apos;t get a full read at all.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <article className="glass-card p-6 sm:p-7">
              <h3 className="font-serif text-xl font-semibold">{newFieldTip.title}</h3>
              <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                {newFieldTip.description}
              </p>
            </article>

            <div>
              <p className="text-ink-500 dark:text-ink-400 mb-3 text-xs leading-relaxed">
                Once you&apos;re oriented, ask these before spending a first pass on any specific paper:
              </p>
              <ol className="grid gap-3 sm:grid-cols-2">
                {triageQuestions.map((item, index) => (
                  <li
                    key={item}
                    className="border-ink-200/80 dark:border-ink-700 grid grid-cols-[auto_1fr] gap-3 rounded-2xl border p-4"
                  >
                    <span className="bg-brand-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section id="three-pass" aria-labelledby="three-pass-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">02 / Read in passes, not once</p>
              <h2 id="three-pass-title" className="display text-4xl font-semibold md:text-5xl">
                Three passes, each with a different job.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              This structure — deliberate passes instead of one linear read — is a well-known,
              named technique in research-methods pedagogy: S. Keshav&apos;s{" "}
              <span className="italic">&ldquo;How to Read a Paper&rdquo;</span> (ACM SIGCOMM
              Computer Communication Review, 2007). What follows is how I actually use it, in my
              own words.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {readingPasses.map((item, index) => (
              <article key={item.pass} className="glass-card p-6">
                <span className="text-brand-600/15 dark:text-brand-300/10 font-serif text-5xl font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-serif text-xl font-semibold">{item.pass}</h3>
                <p className="text-brand-700 dark:text-brand-400 mt-1 font-mono text-[11px] tracking-[0.08em] uppercase">
                  {item.time}
                </p>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {item.whatYouDo}
                </p>
                <div className="mt-4 flex gap-3 border-t border-ink-200/80 pt-4 dark:border-ink-700">
                  <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                    →
                  </span>
                  <p className="text-ink-500 dark:text-ink-400 text-xs leading-relaxed">
                    <span className="font-semibold">Goal: </span>
                    {item.goal}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section aria-labelledby="order-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">03 / A reading order that isn&apos;t the printed order</p>
            <h2 id="order-title" className="display text-4xl font-semibold md:text-5xl">
              Read the conclusion before the introduction.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              A paper is written to be persuasive, front to back. It doesn&apos;t have to be read that
              way. This order gets you the evidence before the framing built around it, so you can
              judge whether the framing earned its confidence.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {readingOrder.map((item, index) => (
              <li key={item.step} className="glass-card relative overflow-hidden p-6">
                <span className="text-brand-600/15 dark:text-brand-300/10 absolute top-2 right-4 font-serif text-6xl font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="eyebrow relative mb-3">Step {index + 1}</p>
                <h3 className="relative font-serif text-xl font-semibold">{item.step}</h3>
                <p className="text-ink-600 dark:text-ink-300 relative mt-3 text-sm leading-relaxed">
                  {item.why}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section aria-labelledby="questions-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">04 / Interrogate the paper, don&apos;t just absorb it</p>
            <h2 id="questions-title" className="display text-4xl font-semibold md:text-5xl">
              Five questions for every claim that matters to you.
            </h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {interrogationQuestions.map((item, index) => (
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
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section aria-labelledby="log-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                05 / The habit that makes it compound
              </p>
              <h2 id="log-title" className="mt-3 font-serif text-4xl font-semibold">
                Log every paper the moment you open it.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-blue-100">
                A reference manager without a habit attached to it is just a folder of PDFs. Five
                fields, logged consistently, are what actually turn months of reading into a
                literature review you can write from later instead of re-reading everything from
                scratch.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {paperLogFields.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm leading-relaxed text-blue-50">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="mistakes-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">06 / What slows most doctoral readers down</p>
            <h2 id="mistakes-title" className="display text-4xl font-semibold md:text-5xl">
              Four habits worth dropping early.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {readingMistakes.map((item, index) => (
              <article key={item} className="glass-card p-6">
                <span className="text-brand-600/15 dark:text-brand-300/10 font-serif text-5xl font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section aria-labelledby="access-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">07 / Getting the paper, and getting better at this</p>
            <h2 id="access-title" className="display text-4xl font-semibold md:text-5xl">
              A paywall is a speed bump, not a wall.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {legitimateAccessMethods.map((item, index) => (
              <article key={item} className="glass-card p-6">
                <span className="text-brand-600/15 dark:text-brand-300/10 font-serif text-5xl font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {item}
                </p>
              </article>
            ))}
          </div>

          <div className="from-ink-950 to-brand-900 relative mt-6 overflow-hidden rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <h3 className="font-serif text-2xl font-semibold">{practiceNote.title}</h3>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-blue-100">
                {practiceNote.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">Back to coursework</p>
              <h2 id="continue-title" className="display text-4xl font-semibold">
                This is one skill among four components.
              </h2>
            </div>
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
          </div>
        </Container>
      </section>
    </main>
  );
}
