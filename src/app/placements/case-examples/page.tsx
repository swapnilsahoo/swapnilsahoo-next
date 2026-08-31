import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";

export const metadata: Metadata = {
  title: "Three Worked Case Examples: Entry, Growth, Pricing",
  description:
    "Three short original consulting case examples — market entry, growth strategy and pricing — each with a candidate brief, exhibits to reveal one at a time, and an interviewer's synthesis guide.",
  keywords: [
    "case interview examples",
    "market entry case",
    "growth case interview",
    "pricing case",
    "consulting case prep",
    "MBA placements",
  ],
  alternates: { canonical: "/placements/case-examples" },
  openGraph: {
    type: "article",
    title: "Three Worked Case Examples: Entry, Growth, Pricing",
    description: "Three short original cases, each with exhibits and a synthesis guide.",
    url: "/placements/case-examples",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Three Worked Case Examples: Entry, Growth, Pricing",
  headline: "Three original case interview examples with exhibits and a synthesis guide",
  learningResourceType: "Worked example",
  educationalLevel: "Postgraduate / MBA",
  publisher: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

const rideMarketData = [
  ["City A", "18 lakh", "3.2 km", "Weak — one small local player", "Lower-middle"],
  ["City B", "22 lakh", "4.1 km", "None", "Middle"],
  ["City C", "14 lakh", "2.8 km", "Strong — an established local app", "Lower-middle"],
] as const;

const rideEconomics = [
  ["Average fare per trip", "₹35"],
  ["Platform take rate", "20%"],
  ["Driver net earning per trip", "₹28"],
  ["Trips per driver per day needed to break even on onboarding cost", "≈ 12"],
] as const;

const bookstoreComparison = [
  ["Upfront investment", "₹45 lakh per store", "₹3 crore platform build (one-time)"],
  ["Payback period", "≈ 30 months per store", "≈ 20 months, if scale is reached"],
  ["Gross margin", "38%", "44% (no store rent or staff)"],
  ["Customer reach", "Local catchment only", "National, but crowded and discount-driven"],
] as const;

const usageSegments = [
  ["Light users", "55% of customers", "12% of revenue", "Low — mostly cost-sensitive"],
  ["Medium users", "30% of customers", "33% of revenue", "Moderate"],
  ["Heavy users", "15% of customers", "55% of revenue", "High — usage far exceeds flat fee value"],
] as const;

export default function CaseExamplesPage() {
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
              href="/placements"
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              Placement Assistance
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              Case Examples
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
              Placement readiness · Case examples
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              Three cases.{" "}
              <span className="text-brand-200 font-normal italic">Three families.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Run these with a partner: one plays candidate and sees only the brief; the other
              plays interviewer and reveals each exhibit only once the candidate&apos;s structure
              earns it. All three companies are fictional, written for this site.
            </p>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="examples-inquiry"
        eyebrow="Before you open the first exhibit"
        title="State your structure before you see a single number."
        questions={[
          "What decision is actually being asked for, and by when?",
          "Which two or three branches of your structure would you check first, and why those?",
        ]}
      />

      <section aria-labelledby="entry-case-title" className="py-16 sm:py-24">
        <Container className="max-w-[100rem]">
          <div className="mb-8 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">01 / Market entry</p>
            <h2 id="entry-case-title" className="display text-4xl font-semibold md:text-5xl">
              QuickRide: should it launch two-wheeler taxis in Tier-2 cities?
            </h2>
          </div>

          <article className="from-ink-950 to-brand-900 rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
              Candidate brief · Read aloud
            </p>
            <p className="mt-5 max-w-4xl text-sm leading-relaxed text-blue-50 sm:text-base">
              QuickRide is a fictional ride-hailing app operating four-wheeler cabs in six metro
              cities. Short, congested trips in several Tier-2 cities make a low-cost two-wheeler
              taxi service look attractive, and leadership is considering launching in three of
              five candidate cities. Should QuickRide enter, and if so, where and how?
            </p>
          </article>

          <div className="mt-5 space-y-4">
            <details className="glass-card group p-2">
              <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-serif text-lg font-semibold focus-visible:ring-2 focus-visible:outline-none">
                Exhibit 1 · Candidate city data
                <span className="text-brand-700 dark:text-brand-300 font-sans text-sm group-open:hidden">
                  Reveal
                </span>
                <span className="text-brand-700 dark:text-brand-300 hidden font-sans text-sm group-open:inline">
                  Hide
                </span>
              </summary>
              <div className="border-ink-200/80 dark:border-ink-700 border-t px-4 pt-5 pb-4">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-ink-200 dark:border-ink-700 border-b">
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          City
                        </th>
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Population
                        </th>
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Avg trip length
                        </th>
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Local competitor
                        </th>
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Income level
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rideMarketData.map(([city, population, tripLength, competitor, income]) => (
                        <tr
                          key={city}
                          className="border-ink-200/70 dark:border-ink-800 border-b last:border-0"
                        >
                          <th scope="row" className="px-3 py-3 font-medium">
                            {city}
                          </th>
                          <td className="text-ink-600 dark:text-ink-300 px-3 py-3">{population}</td>
                          <td className="text-ink-600 dark:text-ink-300 px-3 py-3">{tripLength}</td>
                          <td className="text-ink-600 dark:text-ink-300 px-3 py-3">{competitor}</td>
                          <td className="text-ink-600 dark:text-ink-300 px-3 py-3">{income}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-ink-500 dark:text-ink-400 mt-4 text-xs leading-relaxed">
                  Candidate task: use this to judge attractiveness and accessibility across the
                  three cities — which looks winnable, and which looks like a hard fight for
                  second place?
                </p>
              </div>
            </details>

            <details className="glass-card group p-2">
              <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-serif text-lg font-semibold focus-visible:ring-2 focus-visible:outline-none">
                Exhibit 2 · Unit economics
                <span className="text-brand-700 dark:text-brand-300 font-sans text-sm group-open:hidden">
                  Reveal
                </span>
                <span className="text-brand-700 dark:text-brand-300 hidden font-sans text-sm group-open:inline">
                  Hide
                </span>
              </summary>
              <div className="border-ink-200/80 dark:border-ink-700 grid gap-4 border-t px-4 pt-5 pb-4 sm:grid-cols-2">
                {rideEconomics.map(([label, value]) => (
                  <div key={label} className="border-ink-200/80 dark:border-ink-700 rounded-2xl border p-5">
                    <p className="eyebrow">{label}</p>
                    <p className="mt-2 font-serif text-xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </details>

            <details className="glass-card group p-2">
              <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-serif text-lg font-semibold focus-visible:ring-2 focus-visible:outline-none">
                Interviewer guide · What a strong synthesis contains
                <span className="text-brand-700 dark:text-brand-300 font-sans text-sm group-open:hidden">
                  Reveal
                </span>
                <span className="text-brand-700 dark:text-brand-300 hidden font-sans text-sm group-open:inline">
                  Hide
                </span>
              </summary>
              <div className="border-ink-200/80 dark:border-ink-700 border-t px-4 pt-5 pb-4">
                <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed">
                  City B is the strongest first move — no incumbent, the largest population and a
                  favourable income profile — even though City A and City C have shorter trips
                  that suit two-wheelers slightly better. Entering an uncontested city first lets
                  QuickRide learn the operating model before it has to fight an entrenched local
                  player in City C. A recommendation that leads with City C because it &ldquo;looks
                  most like a two-wheeler market&rdquo; without weighing the competitive response
                  is missing the accessible/winnable half of the framework.
                </p>
                <ul className="text-ink-600 dark:text-ink-300 mt-4 space-y-2 text-xs leading-relaxed">
                  <li>Probe: what would make you enter City C anyway, and on what terms?</li>
                  <li>Probe: how many drivers does the break-even trip count actually require?</li>
                  <li>Probe: what is the biggest assumption behind the fare and take-rate numbers?</li>
                </ul>
              </div>
            </details>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[100rem]" />

      <section aria-labelledby="growth-case-title" className="py-16 sm:py-24">
        <Container className="max-w-[100rem]">
          <div className="mb-8 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Growth</p>
            <h2 id="growth-case-title" className="display text-4xl font-semibold md:text-5xl">
              PagesFirst: new physical stores, or go online-first?
            </h2>
          </div>

          <article className="from-ink-950 to-brand-900 rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
              Candidate brief · Read aloud
            </p>
            <p className="mt-5 max-w-4xl text-sm leading-relaxed text-blue-50 sm:text-base">
              PagesFirst is a fictional 40-store regional bookstore chain with flat same-store
              growth. Management has ₹3 crore to invest and is deciding between opening roughly
              seven new physical stores or building an online/omnichannel platform. Recommend a
              path.
            </p>
          </article>

          <div className="mt-5 space-y-4">
            <details className="glass-card group p-2">
              <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-serif text-lg font-semibold focus-visible:ring-2 focus-visible:outline-none">
                Exhibit 1 · Store vs. online economics
                <span className="text-brand-700 dark:text-brand-300 font-sans text-sm group-open:hidden">
                  Reveal
                </span>
                <span className="text-brand-700 dark:text-brand-300 hidden font-sans text-sm group-open:inline">
                  Hide
                </span>
              </summary>
              <div className="border-ink-200/80 dark:border-ink-700 border-t px-4 pt-5 pb-4">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-ink-200 dark:border-ink-700 border-b">
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Metric
                        </th>
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          New physical store
                        </th>
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Online platform
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookstoreComparison.map(([metric, storeValue, onlineValue]) => (
                        <tr
                          key={metric}
                          className="border-ink-200/70 dark:border-ink-800 border-b last:border-0"
                        >
                          <th scope="row" className="px-3 py-3 font-medium">
                            {metric}
                          </th>
                          <td className="text-ink-600 dark:text-ink-300 px-3 py-3">{storeValue}</td>
                          <td className="text-ink-600 dark:text-ink-300 px-3 py-3">{onlineValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </details>

            <details className="glass-card group p-2">
              <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-serif text-lg font-semibold focus-visible:ring-2 focus-visible:outline-none">
                Exhibit 2 · How existing customers discover new titles
                <span className="text-brand-700 dark:text-brand-300 font-sans text-sm group-open:hidden">
                  Reveal
                </span>
                <span className="text-brand-700 dark:text-brand-300 hidden font-sans text-sm group-open:inline">
                  Hide
                </span>
              </summary>
              <div className="border-ink-200/80 dark:border-ink-700 border-t px-4 pt-5 pb-4">
                <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                  A recent customer survey: 58% discover new titles by browsing in-store, 27%
                  through staff recommendations (also in-store), and only 15% through any online
                  channel today. PagesFirst&apos;s core customer relationship is currently built
                  almost entirely around the physical browsing experience.
                </p>
              </div>
            </details>

            <details className="glass-card group p-2">
              <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-serif text-lg font-semibold focus-visible:ring-2 focus-visible:outline-none">
                Interviewer guide · What a strong synthesis contains
                <span className="text-brand-700 dark:text-brand-300 font-sans text-sm group-open:hidden">
                  Reveal
                </span>
                <span className="text-brand-700 dark:text-brand-300 hidden font-sans text-sm group-open:inline">
                  Hide
                </span>
              </summary>
              <div className="border-ink-200/80 dark:border-ink-700 border-t px-4 pt-5 pb-4">
                <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed">
                  The faster payback on the online platform is real, but Exhibit 2 shows why a
                  pure online-first bet is risky: 85% of demand today is generated by the in-store
                  experience the company would be de-emphasising. A stronger recommendation phases
                  the investment — three or four new stores in proven catchments, funding a
                  smaller online pilot alongside them, and using that pilot&apos;s actual
                  conversion data (not the case exhibit&apos;s assumptions) before committing the
                  full ₹3 crore either way.
                </p>
                <ul className="text-ink-600 dark:text-ink-300 mt-4 space-y-2 text-xs leading-relaxed">
                  <li>Probe: what capability does PagesFirst lack to run online well?</li>
                  <li>Probe: how would you measure the pilot before scaling it?</li>
                  <li>Probe: does going all-in on stores also carry a real risk? Which one?</li>
                </ul>
              </div>
            </details>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[100rem]" />

      <section aria-labelledby="pricing-case-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[100rem]">
          <div className="mb-8 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">03 / Pricing</p>
            <h2 id="pricing-case-title" className="display text-4xl font-semibold md:text-5xl">
              MetricLens: flat fee, or usage-based pricing?
            </h2>
          </div>

          <article className="from-ink-950 to-brand-900 rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
              Candidate brief · Read aloud
            </p>
            <p className="mt-5 max-w-4xl text-sm leading-relaxed text-blue-50 sm:text-base">
              MetricLens is a fictional B2B analytics tool charging every customer the same flat
              monthly fee. Some customers use it constantly; others barely log in. Leadership is
              considering a usage-based, tiered model. Should they change, and how?
            </p>
          </article>

          <div className="mt-5 space-y-4">
            <details className="glass-card group p-2">
              <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-serif text-lg font-semibold focus-visible:ring-2 focus-visible:outline-none">
                Exhibit 1 · Customer usage segments
                <span className="text-brand-700 dark:text-brand-300 font-sans text-sm group-open:hidden">
                  Reveal
                </span>
                <span className="text-brand-700 dark:text-brand-300 hidden font-sans text-sm group-open:inline">
                  Hide
                </span>
              </summary>
              <div className="border-ink-200/80 dark:border-ink-700 border-t px-4 pt-5 pb-4">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-ink-200 dark:border-ink-700 border-b">
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Segment
                        </th>
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Share of customers
                        </th>
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Share of revenue
                        </th>
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Willingness to pay more
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {usageSegments.map(([segment, customerShare, revenueShare, willingness]) => (
                        <tr
                          key={segment}
                          className="border-ink-200/70 dark:border-ink-800 border-b last:border-0"
                        >
                          <th scope="row" className="px-3 py-3 font-medium">
                            {segment}
                          </th>
                          <td className="text-ink-600 dark:text-ink-300 px-3 py-3">{customerShare}</td>
                          <td className="text-ink-600 dark:text-ink-300 px-3 py-3">{revenueShare}</td>
                          <td className="text-ink-600 dark:text-ink-300 px-3 py-3">{willingness}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </details>

            <details className="glass-card group p-2">
              <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-serif text-lg font-semibold focus-visible:ring-2 focus-visible:outline-none">
                Interviewer guide · What a strong synthesis contains
                <span className="text-brand-700 dark:text-brand-300 font-sans text-sm group-open:hidden">
                  Reveal
                </span>
                <span className="text-brand-700 dark:text-brand-300 hidden font-sans text-sm group-open:inline">
                  Hide
                </span>
              </summary>
              <div className="border-ink-200/80 dark:border-ink-700 border-t px-4 pt-5 pb-4">
                <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed">
                  The heavy-user segment is only 15% of customers but 55% of revenue and clearly
                  under-priced relative to the value they extract — that is where a usage-based
                  tier should be introduced first. Light users are the majority of customers by
                  count and price-sensitive; moving them to usage-based pricing risks churn for
                  little revenue gain. The stronger recommendation keeps a flat, predictable entry
                  tier for light and medium users, and introduces a usage-based premium tier
                  targeted at the heavy segment, with existing heavy users grandfathered onto a
                  transition price for a defined period to manage the change.
                </p>
                <ul className="text-ink-600 dark:text-ink-300 mt-4 space-y-2 text-xs leading-relaxed">
                  <li>Probe: what would you measure to confirm heavy users won&apos;t simply leave?</li>
                  <li>Probe: how would you communicate the change to avoid feeling punitive?</li>
                  <li>Probe: does this pricing change affect the sales motion, not just revenue?</li>
                </ul>
              </div>
            </details>
          </div>
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[100rem]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">Continue practising</p>
              <h2 id="continue-title" className="display text-4xl font-semibold">
                Turn structure into a habit.
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
                href="/placements/case-study-preparation"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Full practice system</p>
                <h3 className="font-serif text-2xl font-semibold">Case Study Studio</h3>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
