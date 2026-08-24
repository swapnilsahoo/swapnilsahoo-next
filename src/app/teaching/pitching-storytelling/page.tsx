import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { Reveal } from "@/components/ui/Reveal";
import { founderPlaybookCourses } from "@/features/teaching/data/founder-playbook-courses";
import {
  pitchAudiences,
  pitchMistakes,
  pitchStructure,
} from "@/features/teaching/data/pitching-storytelling";

const course = founderPlaybookCourses.find((item) => item.slug === "pitching-storytelling")!;

export const metadata: Metadata = {
  title: "Pitching and Storytelling | The Founder's Playbook",
  description:
    "A short original course on explaining your startup to three different audiences — an investor, a customer and a prospective hire — plus a six-step pitch structure and the mistakes that make pitches forgettable.",
  keywords: [
    "startup pitch",
    "investor pitch",
    "elevator pitch",
    "storytelling for founders",
    "MBA entrepreneurship",
  ],
  alternates: { canonical: "/teaching/pitching-storytelling" },
  openGraph: {
    type: "article",
    title: "Pitching and Storytelling",
    description: "Three different pitches for three different audiences, and a six-step structure for each.",
    url: "/teaching/pitching-storytelling",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Pitching and Storytelling",
  description: "A short original course on explaining a startup to three different audiences.",
  provider: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

export default function PitchingStorytellingPage() {
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
              Pitching &amp; Storytelling
            </span>
          </nav>

          <div
            data-page-hero="academic"
            className="relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-ink-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14"
          >
            <Image
              src="/images/gallery/founder-playbook-award-moment.jpg"
              alt="A student team celebrating with a trophy after a pitch competition at Great Lakes Gurgaon"
              fill
              priority
              className="-z-20 object-cover"
              style={{ objectPosition: "center 32%" }}
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
              One idea.{" "}
              <span className="text-brand-200 font-normal italic">Three different pitches.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              The same startup needs three genuinely different two-minute explanations — one for
              an investor, one for a customer, one for a person deciding whether to join you. Use
              the same pitch for all three and you&apos;ll sound generic to everyone.
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
                href="#audiences"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                Read the modules
              </a>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="pitch-inquiry"
        eyebrow="Before you write a single slide"
        title="A pitch that impresses everyone usually convinces no one in particular."
        questions={[
          "If a stranger heard your pitch once, could they repeat the core idea back to a friend correctly?",
          "Does your pitch end with a specific ask, or does it just... end?",
        ]}
      />

      <section id="audiences" aria-labelledby="audiences-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Module 01 / Three audiences, three pitches</p>
            <h2 id="audiences-title" className="display text-4xl font-semibold md:text-5xl">
              Each one is listening for something different.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {pitchAudiences.map((item) => (
              <article key={item.id} className="glass-card p-6">
                <h3 className="font-serif text-xl font-semibold">{item.audience}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {item.whatTheyActuallyWant}
                </p>
                <div className="border-ink-200/80 dark:border-ink-700 mt-4 rounded-xl border bg-amber-50/70 p-4 dark:bg-amber-400/[0.06]">
                  <p className="text-ink-500 dark:text-ink-400 text-xs font-semibold tracking-wide uppercase">
                    A strong opening line
                  </p>
                  <p className="text-ink-700 dark:text-ink-200 mt-1 text-xs leading-relaxed italic">
                    {item.openingLine}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="room-title" className="pb-16 sm:pb-24">
        <Container className="max-w-[87.5rem]">
          <Reveal variant="image">
            <figure className="glass-card grid overflow-hidden lg:grid-cols-[0.82fr_1.18fr]">
              <figcaption className="order-2 flex flex-col justify-center p-7 sm:p-10 lg:order-1 lg:p-12">
                <p className="eyebrow">In the room</p>
                <h2
                  id="room-title"
                  className="mt-4 font-serif text-3xl leading-tight font-semibold text-balance sm:text-4xl"
                >
                  A good pitch survives the moment after it ends.
                </h2>
                <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-7">
                  A student team after a pitch competition at Great Lakes Gurgaon — the real test
                  of a pitch isn&apos;t the applause, it&apos;s whether the judges can still explain the idea
                  correctly five minutes later.
                </p>
              </figcaption>
              <div className="relative order-1 min-h-[320px] lg:order-2 lg:min-h-[440px]">
                <Image
                  src="/images/gallery/founder-playbook-award-moment.jpg"
                  alt="A student team celebrating with a trophy after a pitch competition at Great Lakes Gurgaon"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 35%" }}
                  sizes="(min-width: 1024px) 700px, 100vw"
                />
              </div>
            </figure>
          </Reveal>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="structure-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Module 02 / A six-step structure</p>
            <h2 id="structure-title" className="display text-4xl font-semibold md:text-5xl">
              The same skeleton works for any two-minute pitch.
            </h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pitchStructure.map((item, index) => (
              <li key={item.step} className="glass-card relative overflow-hidden p-6">
                <span className="text-brand-600/15 dark:text-brand-300/10 absolute top-2 right-4 font-serif text-6xl font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="eyebrow relative mb-3">Step {index + 1}</p>
                <h3 className="relative font-serif text-xl font-semibold">{item.step}</h3>
                <p className="text-ink-600 dark:text-ink-300 relative mt-3 text-sm leading-relaxed">
                  {item.question}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="mistakes-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[87.5rem]">
          <div className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                Module 03 / What makes a pitch forgettable
              </p>
              <h2 id="mistakes-title" className="mt-3 font-serif text-4xl font-semibold">
                Four mistakes, in almost every weak pitch.
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {pitchMistakes.map((item) => (
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
                href="/teaching/hiring-first-team"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Short course</p>
                <h3 className="font-serif text-2xl font-semibold">Hiring Your First Five People</h3>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
