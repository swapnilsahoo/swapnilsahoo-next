import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude, type TriggerQuestions } from "@/components/ui/InquiryPrelude";
import type { ResearchBranch } from "@/features/research/types";

import { CollaborationInvite } from "./CollaborationInvite";
import { ResearchBranchNav } from "./ResearchBranchNav";

/**
 * Each branch gets its own pair of short trigger questions, hand-grounded in
 * that branch's actual evidenceNote, methodNote and contributions, so the
 * prelude reads differently branch to branch instead of repeating one
 * template.
 *
 * Every slug in researchBranches must have a matching entry below — if a new
 * branch is ever added without one, the component falls back to a clearly
 * generic pair rather than crashing, but that fallback is a safety net, not
 * a substitute for writing the branch-specific version.
 */
const branchInquiryQuestions: Record<string, TriggerQuestions> = {
  "neurodiversity-entrepreneurial-agency": [
    "Is a founder's coping strategy proof of the 'spiky profile' idea — or just proof of good scaffolding?",
    "This branch is conceptual synthesis, not fieldwork — what's the first real-world test it needs to survive?",
  ],
  "bricolage-to-effectuation": [
    "One family's case plus one survey — is that a transition, or just a snapshot?",
    "Does legitimacy really cause the shift to effectuation, or just show up in firms already changing?",
  ],
  "family-business-resourcefulness": [
    "FBR is measured with just four items so far — is that enough to trust the construct?",
    "Where does family coordination stop being enough — what can it clearly not supply?",
  ],
  "frugal-innovation-dynamic-capabilities": [
    "The moderation evidence here is mixed — what result would have counted against the mediation story?",
    "What's the difference between 'reconfiguring' and a firm simply doing more with what it already had?",
  ],
};

/**
 * Only reached if a branch is missing from branchInquiryQuestions above —
 * every current branch has its own entry. Kept honestly generic rather than
 * pretending to be branch-specific, so a missing entry degrades gracefully
 * instead of crashing.
 */
const fallbackInquiryQuestions: TriggerQuestions = [
  "Which of this branch's claims rest on a single study — and what would a different method need to show?",
  "What's the smallest testable step in this mechanism, and what result would prove it wrong?",
];

export function ResearchBranchPage({ branch }: { branch: ResearchBranch }) {
  const inquiryQuestions = branchInquiryQuestions[branch.slug] ?? fallbackInquiryQuestions;
  return (
    <main id="main-content" tabIndex={-1}>
      <header className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-16">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-[87.5rem]">
          <nav aria-label="Breadcrumb" className="text-ink-500 mb-5 flex flex-wrap gap-2 text-xs">
            <Link href="/" className="hover:text-brand-700 dark:hover:text-brand-300 transition">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/research"
              className="hover:text-brand-700 dark:hover:text-brand-300 transition"
            >
              Research
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              {branch.shortTitle}
            </span>
          </nav>

          <div
            data-page-hero="research"
            className="overflow-hidden rounded-[32px] border border-white/15 bg-[#111827] px-6 py-11 text-white sm:px-10 sm:py-16 lg:px-14"
          >
            <div className="grid gap-9 lg:grid-cols-[1fr_0.4fr] lg:items-end">
              <div>
                <p className="font-mono text-xs tracking-[0.14em] text-blue-200 uppercase">
                  Research branch {branch.index}
                </p>
                <h1 className="display mt-5 max-w-4xl text-5xl font-semibold sm:text-7xl">
                  {branch.title}
                </h1>
                <p className="mt-7 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  {branch.summary}
                </p>
                <a
                  href="#open-questions"
                  className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
                >
                  See the open questions
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <aside className="rounded-2xl border border-white/15 bg-slate-950/50 p-6">
                <p className="font-mono text-[10px] tracking-wide text-white/50 uppercase">
                  Current status
                </p>
                <p className="mt-2 text-sm font-semibold text-blue-100">{branch.status}</p>
                <div className="my-5 h-px bg-white/15" />
                <p className="font-mono text-[10px] tracking-wide text-white/50 uppercase">
                  Central question
                </p>
                <p className="mt-3 font-serif text-lg leading-snug text-white">
                  {branch.centralQuestion}
                </p>
              </aside>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id={`${branch.slug}-inquiry`}
        title="What would make this branch's central claim wrong?"
        questions={inquiryQuestions}
      />

      <Container className="max-w-[87.5rem] pb-10">
        <ResearchBranchNav currentSlug={branch.slug} />
      </Container>

      <section aria-labelledby="framing-title" className="py-14 sm:py-20">
        <Container className="max-w-[87.5rem]">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / Research framing</p>
              <h2 id="framing-title" className="display text-4xl font-semibold sm:text-5xl">
                The problem and its doctoral foundation.
              </h2>
            </div>
            <div className="grid gap-5">
              <article className="glass-card p-6 sm:p-8">
                <p className="eyebrow">Why this context matters</p>
                <p className="text-ink-700 dark:text-ink-200 mt-4 text-base leading-relaxed">
                  {branch.context}
                </p>
              </article>
              <article className="glass-card p-6 sm:p-8">
                <p className="eyebrow">Connection to the thesis</p>
                <p className="text-ink-700 dark:text-ink-200 mt-4 text-base leading-relaxed">
                  {branch.thesisConnection}
                </p>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="mechanism-title" className="py-14 sm:py-20">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Proposed mechanism</p>
            <h2 id="mechanism-title" className="display text-4xl font-semibold sm:text-5xl">
              Follow the action, step by step.
            </h2>
          </div>
          <ol className="grid gap-4 lg:grid-cols-3">
            {branch.mechanism.map((step, index) => (
              <li key={step.label} className="glass-card p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">{step.label}</p>
                  <span className="font-mono text-xs text-brand-700 dark:text-brand-300">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold">{step.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-relaxed">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="contribution-title" className="py-14 sm:py-20">
        <Container className="max-w-[87.5rem]">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="glass-card p-6 sm:p-9">
              <p className="eyebrow">03 / What the thesis contributes</p>
              <h2 id="contribution-title" className="display mt-3 text-3xl font-semibold sm:text-4xl">
                A foundation to test, refine and challenge.
              </h2>
              <ul className="mt-7 space-y-4">
                {branch.contributions.map((contribution) => (
                  <li key={contribution} className="flex gap-3 text-sm leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs"
                    >
                      ✓
                    </span>
                    <span className="text-ink-700 dark:text-ink-200">{contribution}</span>
                  </li>
                ))}
              </ul>
            </article>

            <div className="grid gap-5">
              <article className="rounded-2xl bg-[#111827] p-6 text-white sm:p-8">
                <p className="font-mono text-xs tracking-[0.14em] text-blue-200 uppercase">
                  Evidence boundary
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {branch.evidenceNote}
                </p>
              </article>
              <article className="glass-card p-6 sm:p-8">
                <p className="eyebrow">Useful next design</p>
                <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-relaxed">
                  {branch.methodNote}
                </p>
              </article>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" aria-label="Research concepts">
            {branch.concepts.map((concept) => (
              <span key={concept} className="tag tag-ink">
                {concept}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section id="open-questions" aria-labelledby="questions-title" className="py-14 sm:py-20">
        <Container className="max-w-[87.5rem]">
          <div className="grid gap-9 lg:grid-cols-[0.72fr_1fr]">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">04 / Open research agenda</p>
              <h2 id="questions-title" className="display text-4xl font-semibold sm:text-5xl">
                Questions worth building evidence around.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
                These are invitations for research, not claims that a study is already funded or in
                the field.
              </p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {branch.openQuestions.map((question, index) => (
                <li key={question} className="glass-card p-6">
                  <span className="font-mono text-xs text-brand-700 dark:text-brand-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-serif text-lg font-semibold leading-snug">{question}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section aria-labelledby="fit-title" className="py-14 sm:py-20">
        <Container className="max-w-[87.5rem]">
          <div className="glass-card grid gap-7 p-6 sm:p-9 lg:grid-cols-[0.55fr_1fr]">
            <div>
              <p className="eyebrow">05 / Collaboration fit</p>
              <h2 id="fit-title" className="display mt-3 text-3xl font-semibold sm:text-4xl">
                Who could strengthen this branch?
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {branch.collaborationFits.map((fit) => (
                <li
                  key={fit}
                  className="bg-ink-50 text-ink-700 dark:bg-ink-800 dark:text-ink-200 rounded-xl p-5 text-sm leading-relaxed"
                >
                  {fit}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Container className="max-w-[87.5rem] py-14 sm:py-20">
        <CollaborationInvite
          subject={branch.shortTitle}
          description={`If your question, context, dataset or method intersects with ${branch.title.toLowerCase()}, I would be glad to compare ideas. A useful first note names the question, what evidence may be available and what a credible contribution could be.`}
        />
        <div className="mt-8">
          <ResearchBranchNav currentSlug={branch.slug} />
        </div>
        <p className="text-ink-500 mt-5 text-xs leading-relaxed">
          Source note: this public research summary is grounded in my submitted 2024 doctoral
          thesis. It does not distribute an unpublished paper or imply that every proposed
          extension is already an active study.
        </p>
      </Container>
    </main>
  );
}
