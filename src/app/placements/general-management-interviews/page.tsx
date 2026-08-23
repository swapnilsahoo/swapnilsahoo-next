import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { functionTracks } from "@/features/placements/data/general-management";

export const metadata: Metadata = {
  title: "General Management Interviews: The Manager's Lens",
  description:
    "How general management interviews differ from pure consulting case interviews, a four-step manager's lens, what each function actually assesses, and a worked cross-functional scenario.",
  keywords: [
    "general management interview",
    "GM interview MBA",
    "functional interview rounds",
    "sales interview MBA",
    "operations interview",
    "MBA placements",
  ],
  alternates: { canonical: "/placements/general-management-interviews" },
  openGraph: {
    type: "article",
    title: "General Management Interviews: The Manager's Lens",
    description:
      "A four-step lens for general management interviews, plus what each function actually assesses.",
    url: "/placements/general-management-interviews",
    images: ["/images/profile_pic.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "General Management Interviews: The Manager's Lens",
  headline: "A manager's lens for general management interviews, function by function",
  learningResourceType: "Interview preparation guide",
  educationalLevel: "Postgraduate / MBA",
  publisher: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

const managerLens = [
  {
    step: "Priorities",
    description:
      "Name what matters most right now, explicitly. A manager who tries to fix everything at once usually fixes nothing.",
  },
  {
    step: "Trade-offs",
    description:
      "State what you are giving up by choosing this priority. If there's no trade-off, you probably haven't found the real decision yet.",
  },
  {
    step: "Stakeholders",
    description:
      "Identify who is affected and whose agreement you actually need — not everyone who has an opinion needs a vote.",
  },
  {
    step: "Execution",
    description:
      "Explain concretely how the decision gets implemented this week, not just what the decision is in principle.",
  },
] as const;

const returnReasons = [
  ["Product defect", "34%", "Stable versus last quarter"],
  ["Not as described / expectation mismatch", "41%", "Up from 22% last quarter"],
  ["Changed mind / no longer needed", "18%", "Roughly stable"],
  ["Other / unspecified", "7%", "Stable"],
] as const;

export default function GeneralManagementInterviewsPage() {
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
              href="/placements"
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              Placement Assistance
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              General Management Interviews
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
              Placement readiness · General management
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              Not every offer is a{" "}
              <span className="text-brand-200 font-normal italic">consulting case.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Sales, marketing, operations, finance and HR generalist roles ask a different
              question than a strategy case does: not &ldquo;can you structure an unfamiliar
              problem,&rdquo; but &ldquo;can you think like the manager who owns this decision on
              Monday morning.&rdquo; Here is the lens that answers that question.
            </p>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="gm-inquiry"
        eyebrow="Before you answer a functional question"
        title="A manager is judged on the decision made with incomplete information, not the ideal one made with complete data."
        questions={[
          "If you could only fix one thing this week, what would you fix — and what would you deliberately leave alone?",
          "Whose buy-in do you actually need, versus whose opinion you're tempted to seek just to feel thorough?",
        ]}
      />

      <section aria-labelledby="lens-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / The manager&apos;s lens</p>
              <h2 id="lens-title" className="display text-4xl font-semibold md:text-5xl">
                Four steps, in this order.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              This is not a case-cracking framework — it&apos;s the sequence a working manager
              actually runs when a problem lands on their desk. Use it for any functional or
              situational question that doesn&apos;t reduce cleanly to a number.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {managerLens.map((item, index) => (
              <li key={item.step} className="glass-card relative overflow-hidden p-6">
                <span className="text-brand-600/15 dark:text-brand-300/10 absolute top-2 right-4 font-serif text-6xl font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="eyebrow relative mb-4">Step {index + 1}</p>
                <h3 className="relative font-serif text-xl font-semibold">{item.step}</h3>
                <p className="text-ink-600 dark:text-ink-300 relative mt-3 text-sm leading-relaxed">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="functions-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / What each function actually assesses</p>
            <h2 id="functions-title" className="display text-4xl font-semibold md:text-5xl">
              The same lens, five different rooms.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Every functional interview is testing the same underlying judgment, but through a
              different typical prompt — and each has its own characteristic red flag.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {functionTracks.map((track) => (
              <article key={track.id} className="glass-card p-6">
                <p className="eyebrow mb-2">{track.function}</p>
                <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed">
                  {track.whatIsAssessed}
                </p>
                <div className="border-ink-200/80 dark:border-ink-700 mt-4 border-t pt-4">
                  <p className="text-ink-500 dark:text-ink-400 text-xs font-semibold uppercase tracking-wide">
                    Typical prompt
                  </p>
                  <p className="text-ink-600 dark:text-ink-300 mt-1 text-xs leading-relaxed italic">
                    &ldquo;{track.typicalPrompt}&rdquo;
                  </p>
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true">
                    ✕
                  </span>
                  <p className="text-ink-500 dark:text-ink-400 text-xs leading-relaxed">
                    {track.redFlag}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="scenario-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">03 / A worked cross-functional scenario</p>
            <h2 id="scenario-title" className="display text-4xl font-semibold md:text-5xl">
              VoltHome: why did returns double?
            </h2>
          </div>

          <article className="from-ink-950 to-brand-900 rounded-[24px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
              Scenario · Read aloud
            </p>
            <p className="mt-5 max-w-4xl text-sm leading-relaxed text-blue-50 sm:text-base">
              VoltHome is a fictional consumer-electronics brand. Its best-selling smart
              plug&apos;s return rate doubled this quarter. You are the product manager. Diagnose
              the likely cause and recommend what you do this week.
            </p>
          </article>

          <div className="mt-5 space-y-4">
            <details className="glass-card group p-2">
              <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-serif text-lg font-semibold focus-visible:ring-2 focus-visible:outline-none">
                Exhibit · Return reasons
                <span className="text-brand-700 dark:text-brand-300 font-sans text-sm group-open:hidden">
                  Reveal
                </span>
                <span className="text-brand-700 dark:text-brand-300 hidden font-sans text-sm group-open:inline">
                  Hide
                </span>
              </summary>
              <div className="border-ink-200/80 dark:border-ink-700 border-t px-4 pt-5 pb-4">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-ink-200 dark:border-ink-700 border-b">
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Reason
                        </th>
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Share of returns
                        </th>
                        <th scope="col" className="px-3 py-3 font-serif text-base">
                          Trend
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {returnReasons.map(([reason, share, trend]) => (
                        <tr
                          key={reason}
                          className="border-ink-200/70 dark:border-ink-800 border-b last:border-0"
                        >
                          <th scope="row" className="px-3 py-3 font-medium">
                            {reason}
                          </th>
                          <td className="text-ink-600 dark:text-ink-300 px-3 py-3">{share}</td>
                          <td className="text-ink-600 dark:text-ink-300 px-3 py-3">{trend}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-ink-500 dark:text-ink-400 mt-4 text-xs leading-relaxed">
                  Additional fact: marketing recently updated the product listing copy to
                  emphasise a new &ldquo;works with any outlet&rdquo; claim.
                </p>
              </div>
            </details>

            <details className="glass-card group p-2">
              <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-serif text-lg font-semibold focus-visible:ring-2 focus-visible:outline-none">
                Interviewer guide · What a strong answer contains
                <span className="text-brand-700 dark:text-brand-300 font-sans text-sm group-open:hidden">
                  Reveal
                </span>
                <span className="text-brand-700 dark:text-brand-300 hidden font-sans text-sm group-open:inline">
                  Hide
                </span>
              </summary>
              <div className="border-ink-200/80 dark:border-ink-700 border-t px-4 pt-5 pb-4">
                <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed">
                  The defect rate is flat — this is not primarily a quality problem. The sharp rise
                  is in &ldquo;not as described,&rdquo; which lines up with the new listing-copy
                  claim. The manager&apos;s move this week is narrow and fast: work with marketing
                  to soften or clarify the claim immediately (a low-cost, reversible action), while
                  opening a slower quality-team check to rule out a genuine compatibility issue.
                  Recommending a product redesign or a blanket compatibility warning before
                  confirming the copy is the cause would be solving the wrong problem at high cost.
                </p>
                <ul className="text-ink-600 dark:text-ink-300 mt-4 space-y-2 text-xs leading-relaxed">
                  <li>Probe: who do you need to convince to change the listing copy today?</li>
                  <li>Probe: what would make you conclude it isn&apos;t the copy after all?</li>
                  <li>Probe: how do you know this fix worked, and by when?</li>
                </ul>
              </div>
            </details>
          </div>
        </Container>
      </section>

      <section aria-labelledby="continue-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">Continue practising</p>
              <h2 id="continue-title" className="display text-4xl font-semibold">
                Build range across roles.
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
                href="/placements"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Placement readiness</p>
                <h3 className="font-serif text-2xl font-semibold">Back to the readiness studio</h3>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
