import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { Reveal } from "@/components/ui/Reveal";
import { founderPlaybookCourses } from "@/features/teaching/data/founder-playbook-courses";
import {
  beforeYouHaveIt,
  pmfSignals,
  retentionPatterns,
} from "@/features/teaching/data/product-market-fit";

const course = founderPlaybookCourses.find((item) => item.slug === "product-market-fit")!;

export const metadata: Metadata = {
  title: "Finding Product-Market Fit | The Founder's Playbook",
  description:
    "A short original course on knowing whether people actually want what you built: reading retention curves, three honest signals of real demand, and what to do before you have fit.",
  keywords: [
    "product-market fit",
    "retention curve",
    "startup metrics",
    "customer retention",
    "MBA entrepreneurship",
  ],
  alternates: { canonical: "/teaching/product-market-fit" },
  openGraph: {
    type: "article",
    title: "Finding Product-Market Fit",
    description: "How to know if people actually want what you built, and what to do before you have fit.",
    url: "/teaching/product-market-fit",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Finding Product-Market Fit",
  description: "A short original course on reading real demand signals before scaling.",
  provider: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

export default function ProductMarketFitPage() {
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
              Product-Market Fit
            </span>
          </nav>

          <div
            data-page-hero="academic"
            className="relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-ink-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14"
          >
            <Image
              src="/images/gallery/founder-playbook-classroom-group-1.jpg"
              alt="A classroom group discussion at Great Lakes Gurgaon"
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
              Finding{" "}
              <span className="text-brand-200 font-normal italic">product-market fit.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              &ldquo;People seem to like it&rdquo; is a feeling. Product-market fit is a fact you
              can see in a chart — whether the people who try your product keep coming back, on
              their own, without you chasing them. This course is about reading that chart
              honestly, before you spend real money scaling something that isn&apos;t there yet.
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
                href="#curves"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                Read the five modules
              </a>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="pmf-inquiry"
        eyebrow="Before you check your metrics"
        title="A vanity metric goes up. A real one keeps people coming back without being asked."
        questions={[
          "If you stopped all marketing tomorrow, would anyone still be using this a month from now?",
          "Is your retention curve flattening, or still falling toward zero?",
        ]}
      />

      <section aria-labelledby="module1-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">Module 01 / What PMF actually means</p>
              <h2 id="module1-title" className="display text-4xl font-semibold md:text-5xl">
                Not a vibe. A retention fact.
              </h2>
            </div>
            <div className="text-ink-600 dark:text-ink-300 self-end space-y-3 text-sm leading-relaxed lg:col-span-7">
              <p>
                Product-market fit isn&apos;t a launch, a press mention or a founder&apos;s
                confidence. It&apos;s the simple, checkable fact that a specific group of people
                keep using what you built, of their own accord, because it solves something real
                for them.
              </p>
              <p>
                You don&apos;t need a survey or a gut feeling to know if you have it. You need a
                chart of how many of your users are still active, week by week, after they first
                try the product. That chart tells the truth even when your instincts don&apos;t.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section id="curves" aria-labelledby="curves-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Module 02 / Three retention curves</p>
            <h2 id="curves-title" className="display text-4xl font-semibold md:text-5xl">
              The shape of the line matters more than any single number.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {retentionPatterns.map((pattern) => (
              <article key={pattern.id} className="glass-card p-6">
                <h3 className="font-serif text-xl font-semibold">{pattern.name}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {pattern.whatItLooksLike}
                </p>
                <div className="border-ink-200/80 dark:border-ink-700 mt-4 border-t pt-4">
                  <p className="text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-wide uppercase">
                    What it means
                  </p>
                  <p className="text-ink-600 dark:text-ink-300 mt-1 text-xs leading-relaxed">
                    {pattern.whatItMeans}
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
                  Honest feedback rarely arrives politely.
                </h2>
                <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-7">
                  A classroom discussion at Great Lakes Gurgaon — the same room where students
                  learn that the most useful feedback on an idea is usually the least comfortable
                  to hear.
                </p>
              </figcaption>
              <div className="relative order-1 min-h-[320px] lg:order-2 lg:min-h-[440px]">
                <Image
                  src="/images/gallery/founder-playbook-classroom-group-1.jpg"
                  alt="A classroom group discussion at Great Lakes Gurgaon"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 42%" }}
                  sizes="(min-width: 1024px) 700px, 100vw"
                />
              </div>
            </figure>
          </Reveal>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="signals-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Module 03 / Three honest signals</p>
            <h2 id="signals-title" className="display text-4xl font-semibold md:text-5xl">
              Ask these questions before you trust your dashboard.
            </h2>
          </div>
          <div className="border-ink-200/80 dark:border-ink-700 overflow-x-auto rounded-2xl border">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-ink-50 dark:bg-white/5">
                  <th scope="col" className="p-4 font-semibold">Question</th>
                  <th scope="col" className="p-4 font-semibold">Weak signal</th>
                  <th scope="col" className="p-4 font-semibold">Strong signal</th>
                </tr>
              </thead>
              <tbody className="divide-ink-200/80 dark:divide-ink-700 divide-y">
                {pmfSignals.map((signal) => (
                  <tr key={signal.question}>
                    <td className="p-4 font-semibold">{signal.question}</td>
                    <td className="text-ink-600 dark:text-ink-300 p-4">{signal.weakAnswer}</td>
                    <td className="text-ink-700 dark:text-ink-200 p-4 font-medium">{signal.strongAnswer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="before-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[87.5rem]">
          <div className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                Module 04 / Before you have it
              </p>
              <h2 id="before-title" className="mt-3 font-serif text-4xl font-semibold">
                What to do while the curve still looks weak.
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {beforeYouHaveIt.map((item) => (
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
                href="/teaching/raising-money"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Short course</p>
                <h3 className="font-serif text-2xl font-semibold">Raising Money</h3>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
