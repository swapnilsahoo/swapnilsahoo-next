import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { founderPlaybookCourses } from "@/features/teaching/data/founder-playbook-courses";
import {
  commonFailureModes,
  founderMetrics,
  founderMyths,
  starterChecklist,
} from "@/features/teaching/data/startup-building";

import { StartupPrincipleExplorer } from "./StartupPrincipleExplorer";

export const metadata: Metadata = {
  title: "How to Build a Startup? A Simple, Honest Guide",
  description:
    "A plain-language guide to starting up, grounded in effectuation research: five ways of thinking for early founders, how to talk to your first customers, what an MVP actually is, the numbers to track early, and a first-two-weeks checklist.",
  keywords: [
    "how to build a startup",
    "startup for students",
    "effectuation",
    "MVP",
    "customer discovery",
    "entrepreneurship",
    "MBA entrepreneurship",
  ],
  alternates: { canonical: "/teaching/how-to-build-a-startup" },
  openGraph: {
    type: "article",
    title: "How to Build a Startup? A Simple, Honest Guide",
    description:
      "Five ways of thinking for early founders, grounded in effectuation research, written in plain language for students.",
    url: "/teaching/how-to-build-a-startup",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "How to Build a Startup? A Simple, Honest Guide",
  headline: "Five ways of thinking for early founders, grounded in effectuation research",
  learningResourceType: "Guide",
  educationalLevel: "Postgraduate / MBA",
  publisher: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

export default function HowToBuildAStartupPage() {
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
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              How to Build a Startup?
            </span>
          </nav>

          <div
            data-page-hero="academic"
            className="relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-ink-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14"
          >
            <Image
              src="/images/gallery/founder-playbook-hub-hero.jpg"
              alt="Dr Swapnil Sahoo speaking energetically to a full auditorium during a PGDM induction session"
              fill
              priority
              className="-z-20 object-cover"
              style={{ objectPosition: "center 38%" }}
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
              Entrepreneurship · The Founder&apos;s Playbook
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              How to build{" "}
              <span className="text-brand-200 font-normal italic">a startup?</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              You don&apos;t need a perfect plan, funding, or a world-changing idea to start. You
              need to look honestly at what you already have, take one small real action this
              week, and let real people — not a business plan — tell you what to build next. This
              page is my own attempt to say that plainly, drawn from the effectuation research I
              study and teach.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#principles"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                See the five ways of thinking
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#checklist"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                Jump to the two-week checklist
              </a>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="startup-inquiry"
        eyebrow="Before you write a business plan"
        title="A business plan predicts a future you can't yet see. A first customer is a fact."
        questions={[
          "What is the smallest, realest thing you could do this week to learn if anyone actually wants this?",
          "If you had to start with only what's in your bag right now, what would you build?",
        ]}
      />

      <section aria-labelledby="means-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / Start where you are</p>
              <h2 id="means-title" className="display text-4xl font-semibold md:text-5xl">
                Most founders don&apos;t start with a plan. They start with a means.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              Research on how experienced entrepreneurs actually think — a field called
              effectuation — found something counter-intuitive: they rarely start by predicting a
              market and working backward to a plan. They start by looking at who they are, what
              they know and who they know, and asking what they could create right now with just
              that. The five ideas below are that logic, explained without jargon.
            </p>
          </div>
        </Container>
      </section>

      <section id="principles" aria-labelledby="principles-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Five moves in the playbook</p>
            <h2 id="principles-title" className="display text-4xl font-semibold md:text-5xl">
              What separates builders from planners.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Switch between the five below. Each has a plain-English explanation, what it looks
              like in a real (if illustrative) example, and one small thing to try this week.
            </p>
          </div>
          <StartupPrincipleExplorer />
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section aria-labelledby="talk-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">03 / Before you build anything</p>
              <h2 id="talk-title" className="display text-4xl font-semibold md:text-5xl">
                Talk to five real people before you write one line of code.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              Not a survey — a conversation. The goal isn&apos;t to pitch your idea and hope for
              encouragement. It&apos;s to understand their life well enough that your idea becomes
              obvious, or falls apart, before you&apos;ve spent a rupee building it.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "Find the right five",
                description: "People who actually have the problem today, not people who might one day.",
              },
              {
                step: "Ask about today, not tomorrow",
                description: "What do they currently do about it? Don't ask if they'd use your idea — ask what they already do.",
              },
              {
                step: "Listen for money and workarounds",
                description: "Anything they already pay for or have hacked together is the strongest signal of real pain.",
              },
              {
                step: "Resist pitching",
                description: "If you spend the conversation explaining your idea instead of listening, you learned nothing.",
              },
            ].map((item, index) => (
              <div key={item.step} className="glass-card p-6">
                <span className="bg-brand-600 flex h-8 w-8 items-center justify-center rounded-full font-mono text-[11px] text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-serif text-lg font-semibold">{item.step}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section aria-labelledby="mvp-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">04 / What an MVP actually is</p>
            <h2 id="mvp-title" className="display text-4xl font-semibold md:text-5xl">
              Not a smaller product. An answer to your biggest doubt.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              A minimum viable product isn&apos;t a stripped-down app. It&apos;s the smallest,
              fastest thing you can build or fake to answer the one question that would kill your
              idea if the answer were no. Often that means doing the work by hand before you
              automate any of it.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="glass-card p-7">
              <p className="eyebrow mb-2">What people often build first</p>
              <p className="font-serif text-xl font-semibold">A polished app, website or brand</p>
              <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                Weeks of work go into something that looks professional before a single stranger
                has used it — and the riskiest assumption in the whole idea is still untested.
              </p>
            </div>
            <div className="from-brand-50 to-accent-400/10 dark:from-brand-900/30 dark:to-accent-400/5 border-brand-200/60 dark:border-brand-700/40 rounded-2xl border bg-gradient-to-br p-7">
              <p className="eyebrow mb-2">What actually answers the question</p>
              <p className="font-serif text-xl font-semibold">
                A phone number, a spreadsheet, and you doing the work by hand
              </p>
              <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                Take five real orders manually, deliver them yourself, and see if anyone pays a
                second time. That single fact is worth more than a finished app nobody has opened.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section aria-labelledby="metrics-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">05 / Numbers to know early</p>
              <h2 id="metrics-title" className="display text-4xl font-semibold md:text-5xl">
                You don&apos;t need a finance degree. You need four numbers.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              These won&apos;t make or break your idea by themselves, but not knowing them is how
              founders run out of money while still feeling optimistic.
            </p>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {founderMetrics.map((metric) => (
              <div key={metric.term} className="border-ink-200/80 dark:border-ink-700 rounded-2xl border p-5">
                <dt className="font-serif text-lg font-semibold">{metric.term}</dt>
                <dd className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-relaxed">
                  {metric.meaning}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-ink-500 dark:text-ink-400 mt-6 text-xs leading-relaxed">
            Want the fuller toolkit? The{" "}
            <Link href="/placements/guesstimates" className="link-underline font-semibold">
              Guesstimates
            </Link>{" "}
            and{" "}
            <Link href="/placements/case-frameworks" className="link-underline font-semibold">
              Case Frameworks
            </Link>{" "}
            pages walk through how to build numbers like these from scratch.
          </p>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section aria-labelledby="failure-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">06 / How early startups actually die</p>
            <h2 id="failure-title" className="display text-4xl font-semibold md:text-5xl">
              Not usually one big mistake. Six small, avoidable ones.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {commonFailureModes.map((mode) => (
              <article key={mode.title} className="glass-card p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true">
                    ✕
                  </span>
                  <h3 className="font-serif text-lg font-semibold">{mode.title}</h3>
                </div>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {mode.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section aria-labelledby="myths-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">07 / Founder myths, busted</p>
            <h2 id="myths-title" className="display text-4xl font-semibold md:text-5xl">
              The five sentences that stop students before they start.
            </h2>
          </div>
          <div className="grid gap-4">
            {founderMyths.map((item) => (
              <article
                key={item.myth}
                className="border-ink-200/80 dark:border-ink-700 grid gap-4 rounded-2xl border p-6 sm:grid-cols-[0.85fr_1.15fr] sm:items-start"
              >
                <div>
                  <p className="text-ink-500 dark:text-ink-400 text-xs font-semibold tracking-wide uppercase">
                    The myth
                  </p>
                  <p className="text-ink-800 dark:text-ink-100 mt-2 font-serif text-lg font-semibold italic">
                    {item.myth}
                  </p>
                </div>
                <div className="border-ink-200/80 dark:border-ink-700 border-t pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
                  <p className="text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-wide uppercase">
                    The reality
                  </p>
                  <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                    {item.reality}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="checklist" aria-labelledby="checklist-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                08 / Your first two weeks
              </p>
              <h2 id="checklist-title" className="mt-3 font-serif text-4xl font-semibold">
                Stop reading. Start with this.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-blue-100">
                Six steps, in order. None of them require funding, a co-founder or permission from
                anyone.
              </p>
              <ol className="mt-8 grid gap-3">
                {starterChecklist.map((item, index) => (
                  <li
                    key={item}
                    className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <span className="bg-white/10 flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-semibold">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-blue-50">{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="courses-title" className="pb-16 sm:pb-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">09 / More in the playbook</p>
            <h2 id="courses-title" className="display text-4xl font-semibold md:text-5xl">
              Short courses, each with a slide deck.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              The Founder&apos;s Playbook is a growing set of short, original courses — each one
              readable here and downloadable as a slide deck for your own use.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {founderPlaybookCourses.map((course) => (
              <article
                key={course.slug}
                className="from-brand-50 to-accent-400/10 dark:from-brand-900/30 dark:to-accent-400/5 border-brand-200/60 dark:border-brand-700/40 rounded-2xl border bg-gradient-to-br p-6"
              >
                <p className="eyebrow mb-2">{course.tagline}</p>
                <h3 className="font-serif text-2xl font-semibold">{course.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {course.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Link
                    href={course.href}
                    className="text-brand-700 dark:text-brand-400 link-underline inline-flex items-center gap-1 text-sm font-semibold"
                  >
                    Start the course
                    <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <a
                    href={course.deckHref}
                    className="text-ink-600 dark:text-ink-300 link-underline inline-flex items-center gap-1 text-sm font-medium"
                  >
                    Download the deck
                    <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">Keep building</p>
              <h2 id="continue-title" className="display text-4xl font-semibold">
                Ideas are cheap. Shipped things aren&apos;t.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-relaxed">
                One of my own Side Quests — a live beta app I built and put in front of real
                users — is exactly this philosophy applied to my own work, not just taught to
                students.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/ai-initiatives/ai-hackathon/side-quests"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Built, not just taught</p>
                <h3 className="font-serif text-2xl font-semibold">Side Quests</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                  My own live-beta builds, open for testing.
                </p>
              </Link>
              <Link
                href="/placements/strategy-entrepreneurship-interview-prep"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Self-test</p>
                <h3 className="font-serif text-2xl font-semibold">Strategy &amp; Entrepreneurship</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                  Test your grasp of the frameworks behind the ideas above.
                </p>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
