import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { Reveal } from "@/components/ui/Reveal";
import { founderPlaybookCourses } from "@/features/teaching/data/founder-playbook-courses";
import {
  dilutionExample,
  fundingRoutes,
  investorLenses,
  whenNotToRaise,
} from "@/features/teaching/data/raising-money";

const course = founderPlaybookCourses.find((item) => item.slug === "raising-money")!;

export const metadata: Metadata = {
  title: "Raising Money Without Losing the Company | The Founder's Playbook",
  description:
    "A short original course on startup fundraising: bootstrapping vs. debt vs. equity, what investors actually evaluate, a worked dilution example, and when not to raise at all.",
  keywords: [
    "startup fundraising",
    "equity dilution",
    "venture capital basics",
    "bootstrapping",
    "cap table",
    "MBA entrepreneurship",
  ],
  alternates: { canonical: "/teaching/raising-money" },
  openGraph: {
    type: "article",
    title: "Raising Money Without Losing the Company",
    description: "Bootstrapping vs. debt vs. equity, what investors evaluate, and a worked dilution example.",
    url: "/teaching/raising-money",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Raising Money Without Losing the Company",
  description: "A short original course on startup fundraising fundamentals.",
  provider: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

export default function RaisingMoneyPage() {
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
        <Container className="max-w-6xl">
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
              Raising Money
            </span>
          </nav>

          <div
            data-page-hero="academic"
            className="relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-ink-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14"
          >
            <Image
              src="/images/gallery/founder-playbook-panel-session.jpg"
              alt="A panel seated at a table on stage at Great Lakes Gurgaon"
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
              Raising money{" "}
              <span className="text-brand-200 font-normal italic">without losing the company.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Every rupee of outside money changes who you answer to. This course is about
              deciding deliberately — bootstrapping, debt or equity, what investors are actually
              evaluating when they say no, and the maths of dilution that most founders only learn
              after they&apos;ve already given too much away.
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
                href="#routes"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                Read the five modules
              </a>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="raising-inquiry"
        eyebrow="Before you open a term sheet"
        title="Money bought too early doesn't fix a broken business. It just funds a bigger failure."
        questions={[
          "What specific milestone would this money let you reach that you can't reach without it?",
          "If you couldn't raise a single rupee, what's the smallest version of this you could still build?",
        ]}
      />

      <section aria-labelledby="module1-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">Module 01 / A decision, not a milestone</p>
              <h2 id="module1-title" className="display text-4xl font-semibold md:text-5xl">
                Raising money is not the goal. It&apos;s a tool.
              </h2>
            </div>
            <div className="text-ink-600 dark:text-ink-300 self-end space-y-3 text-sm leading-relaxed lg:col-span-7">
              <p>
                It&apos;s easy to treat a funding round as proof the idea works. It isn&apos;t —
                it&apos;s proof that someone believes it might, enough to bet on it. The business
                still has to prove itself afterward, usually under more pressure, not less, because
                now there&apos;s a clock and other people&apos;s money on it.
              </p>
              <p>
                Before you raise anything, be able to finish this sentence honestly: &ldquo;this
                money lets me reach ______, which I could not reach otherwise.&rdquo; If you
                can&apos;t fill in the blank specifically, you&apos;re not ready to raise yet
                — you&apos;re ready to want to have raised.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="room-title" className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <Reveal variant="image">
            <figure className="glass-card grid overflow-hidden lg:grid-cols-[0.82fr_1.18fr]">
              <figcaption className="order-2 flex flex-col justify-center p-7 sm:p-10 lg:order-1 lg:p-12">
                <p className="eyebrow">In the room</p>
                <h2
                  id="room-title"
                  className="mt-4 font-serif text-3xl leading-tight font-semibold text-balance sm:text-4xl"
                >
                  The questions don&apos;t get softer once you&apos;re at the table.
                </h2>
                <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-7">
                  A panel session at Great Lakes Gurgaon — the same directness I ask students to
                  bring when someone across the table is deciding whether to back their idea.
                </p>
              </figcaption>
              <div className="relative order-1 min-h-[320px] lg:order-2 lg:min-h-[440px]">
                <Image
                  src="/images/gallery/founder-playbook-panel-session.jpg"
                  alt="A panel seated at a table on stage at Great Lakes Gurgaon, evaluating student presentations"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 40%" }}
                  sizes="(min-width: 1024px) 700px, 100vw"
                />
              </div>
            </figure>
          </Reveal>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section id="routes" aria-labelledby="routes-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Module 02 / Three ways to fund a business</p>
            <h2 id="routes-title" className="display text-4xl font-semibold md:text-5xl">
              Each route trades something specific for something else.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {fundingRoutes.map((route) => (
              <article key={route.id} className="glass-card p-6">
                <h3 className="font-serif text-xl font-semibold">{route.name}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {route.howItWorks}
                </p>
                <div className="border-ink-200/80 dark:border-ink-700 mt-4 border-t pt-4">
                  <p className="text-ink-500 dark:text-ink-400 text-xs font-semibold tracking-wide uppercase">
                    What you give up
                  </p>
                  <p className="text-ink-600 dark:text-ink-300 mt-1 text-xs leading-relaxed">
                    {route.whatYouGive}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-wide uppercase">
                    Best when
                  </p>
                  <p className="text-ink-600 dark:text-ink-300 mt-1 text-xs leading-relaxed">
                    {route.bestWhen}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="lens-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Module 03 / What investors actually evaluate</p>
            <h2 id="lens-title" className="display text-4xl font-semibold md:text-5xl">
              Four questions behind every yes or no.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {investorLenses.map((lens, index) => (
              <div key={lens.title} className="border-ink-200/80 dark:border-ink-700 rounded-2xl border p-6">
                <span className="bg-brand-600 flex h-8 w-8 items-center justify-center rounded-full font-mono text-[11px] text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-serif text-lg font-semibold">{lens.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                  {lens.question}
                </p>
              </div>
            ))}
          </div>
          <p className="text-ink-500 dark:text-ink-400 mt-6 text-xs leading-relaxed">
            That fourth question is the same one this series covers in{" "}
            <Link href="/teaching/building-a-durable-advantage" className="link-underline font-semibold">
              Building a Durable Competitive Advantage
            </Link>{" "}
            — worth reading before you pitch anyone.
          </p>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="dilution-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Module 04 / The dilution maths</p>
            <h2 id="dilution-title" className="display text-4xl font-semibold md:text-5xl">
              A worked example, start to finish.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Two founders start with 100% of the company. Here&apos;s exactly what two funding rounds
              do to that number — the arithmetic is simple, but almost nobody walks through it
              before signing the first term sheet.
            </p>
          </div>
          <div className="border-ink-200/80 dark:border-ink-700 overflow-x-auto rounded-2xl border">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-ink-50 dark:bg-white/5">
                  <th scope="col" className="p-4 font-semibold">Stage</th>
                  <th scope="col" className="p-4 font-semibold">Pre-money value</th>
                  <th scope="col" className="p-4 font-semibold">Raised</th>
                  <th scope="col" className="p-4 font-semibold">Post-money value</th>
                  <th scope="col" className="p-4 font-semibold">New investor gets</th>
                  <th scope="col" className="p-4 font-semibold">Founders now own</th>
                </tr>
              </thead>
              <tbody className="divide-ink-200/80 dark:divide-ink-700 divide-y">
                {dilutionExample.map((row) => (
                  <tr key={row.round}>
                    <td className="p-4 font-semibold whitespace-nowrap">{row.round}</td>
                    <td className="text-ink-600 dark:text-ink-300 p-4">{row.preMoney}</td>
                    <td className="text-ink-600 dark:text-ink-300 p-4">{row.raised}</td>
                    <td className="text-ink-600 dark:text-ink-300 p-4">{row.postMoney}</td>
                    <td className="text-ink-600 dark:text-ink-300 p-4">{row.newInvestorStake}</td>
                    <td className="text-ink-700 dark:text-ink-200 p-4 font-semibold">{row.founderStakeAfter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-ink-500 dark:text-ink-400 mt-4 text-xs leading-relaxed">
            After two rounds, the founders own 76.5% instead of 100% — and gave up roughly
            one-quarter of the company for ₹2 crore of total capital. Neither round was a mistake;
            the point is that the number is knowable in advance, not a surprise at the cap table.
          </p>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="skip-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                Module 05 / When not to raise
              </p>
              <h2 id="skip-title" className="mt-3 font-serif text-4xl font-semibold">
                Sometimes the right answer is: not yet.
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {whenNotToRaise.map((reason) => (
                  <li key={reason} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm leading-relaxed text-blue-50">{reason}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
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
                href="/teaching/building-a-durable-advantage"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Short course</p>
                <h3 className="font-serif text-2xl font-semibold">Building a Durable Advantage</h3>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
