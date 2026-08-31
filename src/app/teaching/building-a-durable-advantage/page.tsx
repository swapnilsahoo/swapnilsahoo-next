import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { advantageSources, durableAdvantageInquiry } from "@/features/teaching/data/durable-advantage";
import { founderPlaybookCourses } from "@/features/teaching/data/founder-playbook-courses";

const course = founderPlaybookCourses.find(
  (item) => item.slug === "building-a-durable-advantage"
)!;

export const metadata: Metadata = {
  title: "Building a Durable Competitive Advantage | The Founder's Playbook",
  description:
    "A short original course on what actually makes a business defensible over time: cost and efficiency, differentiation, switching costs and network effects, plus a simple test for whether your idea would survive a well-funded copycat.",
  keywords: [
    "competitive advantage",
    "moat",
    "differentiation strategy",
    "network effects",
    "switching costs",
    "strategic management",
    "MBA strategy course",
  ],
  alternates: { canonical: "/teaching/building-a-durable-advantage" },
  openGraph: {
    type: "article",
    title: "Building a Durable Competitive Advantage",
    description:
      "What actually makes a business defensible over time, in five short modules.",
    url: "/teaching/building-a-durable-advantage",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Building a Durable Competitive Advantage",
  description:
    "A short original course on what actually makes a business defensible over time.",
  provider: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

export default function BuildingADurableAdvantagePage() {
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
              href="/teaching/how-to-build-a-startup"
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              The Founder&apos;s Playbook
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              Building a Durable Advantage
            </span>
          </nav>

          <div
            data-page-hero="academic"
            className="relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-ink-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14"
          >
            <Image
              src="/images/gallery/founder-playbook-durable-advantage-hero.jpg"
              alt="Dr Swapnil Sahoo speaking to a full auditorium during a PGDM induction session"
              fill
              priority
              className="-z-20 object-cover"
              style={{ objectPosition: "center 42%" }}
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
              Building a{" "}
              <span className="text-brand-200 font-normal italic">durable</span> advantage.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Winning once is easy — a good product, a bit of timing luck, a clever launch. None
              of that explains why a competitor with more money and the same idea can&apos;t just
              copy you next year. This short course is about the difference: what actually makes
              an advantage hold up once everyone can see it worked.
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
                href="#modules"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                Read the five modules
              </a>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="advantage-inquiry"
        eyebrow="Before module one"
        title="An advantage that isn't getting stronger is usually getting weaker."
        questions={durableAdvantageInquiry}
      />

      <section aria-labelledby="module1-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">Module 01 / Why most advantages fade</p>
              <h2 id="module1-title" className="display text-4xl font-semibold md:text-5xl">
                Winning once is the easy part.
              </h2>
            </div>
            <div className="text-ink-600 dark:text-ink-300 self-end space-y-3 text-sm leading-relaxed lg:col-span-7">
              <p>
                A good product, a clever launch, a bit of timing luck — these can win you a first
                customer, a first year, even a first funding round. None of them, by themselves,
                explain why a competitor with more money and the same idea can&apos;t simply copy
                you next year.
              </p>
              <p>
                The real question isn&apos;t &ldquo;can this work?&rdquo; It&apos;s &ldquo;can this
                still be true in three years, once everyone can see that it worked?&rdquo; Most
                founders skip this question because it&apos;s uncomfortable. It&apos;s the one
                worth sitting with the longest.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section id="modules" aria-labelledby="sources-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Module 02 / Four sources of a real advantage</p>
            <h2 id="sources-title" className="display text-4xl font-semibold md:text-5xl">
              If it isn&apos;t one of these four, it probably isn&apos;t durable.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {advantageSources.map((source, index) => (
              <article key={source.id} className="glass-card p-6">
                <span className="text-brand-600/15 dark:text-brand-300/10 font-serif text-5xl font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-serif text-xl font-semibold">{source.name}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {source.explanation}
                </p>
                <div className="border-ink-200/80 dark:border-ink-700 mt-4 border-t pt-4">
                  <p className="text-ink-500 dark:text-ink-400 text-xs font-semibold tracking-wide uppercase">
                    What this looks like
                  </p>
                  <p className="text-ink-600 dark:text-ink-300 mt-1 text-xs leading-relaxed italic">
                    {source.example}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section aria-labelledby="test-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                Module 03 / The twelve-month copy test
              </p>
              <h2 id="test-title" className="mt-3 font-serif text-4xl font-semibold">
                Would a well-funded rival rebuild this within a year?
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-blue-100">
                Ask it honestly, about your own idea. If the answer is yes, what you have is a
                head start, not an advantage — useful, but temporary. Plan around that. If the
                answer is genuinely no, ask which of the four sources above is doing the
                protecting, and whether it&apos;s getting stronger or weaker as you grow.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section aria-labelledby="trap-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">Module 04 / The big-market trap</p>
              <h2 id="trap-title" className="display text-4xl font-semibold md:text-5xl">
                Big and contested beats small and defensible — until it doesn&apos;t.
              </h2>
            </div>
            <div className="text-ink-600 dark:text-ink-300 self-end space-y-3 text-sm leading-relaxed lg:col-span-7">
              <p>
                A huge, exciting market sounds like the safer bet for a new idea. It usually
                isn&apos;t. In a big market, well-resourced players are already fighting for the
                same customers — you&apos;re competing on their terms from day one, with none of
                the four sources of advantage yet in place.
              </p>
              <p>
                A smaller, more specific starting segment lets you build real depth — the kind
                that eventually becomes one of those four sources — before you ever face that
                fight. The market can grow later. The advantage has to be built first, somewhere
                narrow enough that you can actually win it outright.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section aria-labelledby="exercise-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="glass-card p-7 sm:p-10">
            <p className="eyebrow mb-2">Module 05 / Your turn</p>
            <h2 id="exercise-title" className="display text-3xl font-semibold sm:text-4xl">
              A one-page map of your own advantage.
            </h2>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Write your idea in one sentence: for [specific customer], we are better because [specific reason].",
                "For each of the four sources, write one honest sentence on whether it applies to you, even partially.",
                "Circle the strongest source today — that's the one worth investing in deliberately.",
                "Run the twelve-month copy test on it, out loud, with a partner who will push back.",
              ].map((step, index) => (
                <li
                  key={step}
                  className="border-ink-200/80 dark:border-ink-700 grid grid-cols-[auto_1fr] gap-4 rounded-2xl border p-5"
                >
                  <span className="bg-brand-600 flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
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
                href="/placements/case-frameworks"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Structure</p>
                <h3 className="font-serif text-2xl font-semibold">Case Frameworks</h3>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
