import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import type { ResearchBranch } from "@/features/research/types";

import { CollaborationInvite } from "./CollaborationInvite";
import { ResearchBranchNav } from "./ResearchBranchNav";

/**
 * Three of the four questions in each InquiryPrelude list are hand-grounded here
 * in that branch's actual evidenceNote, methodNote, mechanism and contributions,
 * so the prelude reads differently branch to branch instead of repeating one
 * template. The remaining (first) question in each list is already derived
 * directly from branch.shortTitle / branch.centralQuestion below and doesn't
 * need an entry here.
 *
 * Every slug in researchBranches must have a matching entry below — if a new
 * branch is ever added without one, renderInquiryCopy() falls back to a
 * clearly-generic set rather than crashing, but that fallback is a safety net,
 * not a substitute for writing the branch-specific version.
 */
const branchInquiryCopy: Record<
  string,
  {
    socraticSecond: string;
    socraticThird: string;
    socraticFourth: string;
    firstPrinciplesSecond: string;
    firstPrinciplesThird: string;
    firstPrinciplesFourth: string;
  }
> = {
  "neurodiversity-entrepreneurial-agency": {
    socraticSecond:
      "This branch is a conceptual synthesis rather than fieldwork — whose account would most test it: a founder describing their own coping practices, an outside observer coding the same events, or a comparison founder without a spiky profile?",
    socraticThird:
      "The other three branches treat resources, legitimacy or family coordination as the scarce input; this one treats cognitive profile as the variable that matters — where does that framing blur once scaffolding and support enter the picture?",
    socraticFourth:
      "This branch is explicitly a conceptual synthesis, not fieldwork — if a coping strategy that helps one founder turns out to depend entirely on that founder's specific support network, what would still be worth knowing?",
    firstPrinciplesSecond:
      "The spiky-profile framework and its coping typology are conceptual contributions here, not measured results — which of the three listed contributions could be tested with existing methods, and which would need a new instrument first?",
    firstPrinciplesThird:
      "If scaffolding — tools, routines, relationships — really does convert cognitive strengths into opportunity action, what is the smallest observable step in that conversion, and what would show the scaffolding did nothing?",
    firstPrinciplesFourth:
      "The next step described here is a longitudinal, person-centred study following founders across venture stages — who is better placed to run it: an incubator with continuing access to founders, or an independent research team?",
  },
  "bricolage-to-effectuation": {
    socraticSecond:
      "The transition claim rests on one retrospective case plus a cross-sectional survey — whose account would most change it: the family's own retelling, a comparison firm that never transitioned, or a longitudinal replication?",
    socraticThird:
      "The other three branches ask what activates a founder's agency or a family's institutional workaround; this one asks whether one entrepreneurial logic converts into another — does legitimacy actually explain that conversion, or just correlate with firms that were already changing?",
    socraticFourth:
      "If the transition from bricolage to effectuation described here turned out to hold only for the family enterprise studied in depth, what would still be worth knowing about how legitimacy and access operate elsewhere?",
    firstPrinciplesSecond:
      "The retrospective case and the survey are both consistent with a transition pathway — which of this branch's three contributions is actually established by that evidence, and which is a proposition still waiting on a longitudinal study?",
    firstPrinciplesThird:
      "If legitimacy really is what opens access to conventional resources and expands a venture's action set, what is the smallest change in a firm's affordable-loss commitments that would count as evidence, and what result would falsify it?",
    firstPrinciplesFourth:
      "The clearest next design triangulates repeated observation with resource, partnership and performance records — who is positioned to gather that: the family enterprises themselves, or an outside research team with continuing access to their records?",
  },
  "family-business-resourcefulness": {
    socraticSecond:
      "FBR currently rests on an initial four-item measure — whose evidence would most change this branch's conclusions: a family firm's own account of how it mobilised resources, a matched non-family comparison, or an independent replication of the measure in another country?",
    socraticThird:
      "The other three branches ask how individual cognition or entrepreneurial logic responds to scarcity; this one asks whether family coordination itself is the resource — where does that assumption break down once a firm needs something family ties cannot supply?",
    socraticFourth:
      "If family coordination turns out to mobilise resources well in one institutional void but not another, what would that still tell us about where the FBR construct applies?",
    firstPrinciplesSecond:
      "FBR is introduced here as a construct with an initial four-item measure — which of its four listed contributions is established by that measure, and which remain propositions until an independent sample tests them?",
    firstPrinciplesThird:
      "If family effort genuinely substitutes for missing market intermediaries, what is the smallest observable instance of that substitution, and what result — a firm that mobilises just as well without family coordination — would undercut the claim?",
    firstPrinciplesFourth:
      "FBR is measured with an initial four-item scale still awaiting independent validation — who is positioned to run that test, and what result would count as it failing?",
  },
  "frugal-innovation-dynamic-capabilities": {
    socraticSecond:
      "The mediation evidence here is survey-based and some of the moderation results are mixed — whose account would most change this branch's conclusions: a firm's own report of its innovation process, an objective measure of the resulting product, or a replication in a resource-rich setting?",
    socraticThird:
      "The sibling branches treat resourcefulness as the outcome to explain; this one treats it as the input to a capability process — does that reframing still hold once sensing and seizing are measured with the same kind of survey items as resourcefulness itself?",
    socraticFourth:
      "If dynamic capabilities turn out to mediate resourcefulness only for the family firms surveyed here, what would still be worth knowing about how sensing, seizing and reconfiguring operate elsewhere?",
    firstPrinciplesSecond:
      "This branch's three contributions rest on relationships consistent with mediation, not a confirmed causal chain — which would survive an objective, longitudinal test, and which depend on the mixed moderation evidence noted here?",
    firstPrinciplesThird:
      'The mediation evidence here is survey-based and the moderation results are mixed — what is the smallest observable action that would count as "reconfiguring" rather than firms simply doing more with resources they already had?',
    firstPrinciplesFourth:
      "The clearest next design pairs survey data with objective innovation and performance records — who is best positioned to supply those records: the firms themselves, or an independent auditor of their outcomes?",
  },
};

/**
 * Only reached if a branch is missing from branchInquiryCopy above — every
 * current branch has its own entry. Kept honestly generic rather than
 * pretending to be branch-specific, so a missing entry degrades gracefully
 * instead of crashing on `undefined.socraticSecond`.
 */
const fallbackInquiryCopy = {
  socraticSecond:
    "Whose evidence would most change this branch's conclusions: a founder's own account, a comparison group, or a replication in a different setting?",
  socraticThird:
    "Which of this branch's claims rest on a single study design, and what would a different method have to show to leave the claim standing?",
  socraticFourth:
    "If a finding here turned out to apply only to the specific context it was studied in, what would still be worth knowing?",
  firstPrinciplesSecond:
    "Which of the listed contributions are established by the evidence on this page, and which are propositions still awaiting a study?",
  firstPrinciplesThird:
    "What is this mechanism's smallest testable step, and what result would falsify it?",
  firstPrinciplesFourth:
    "Who is best positioned to supply the evidence this branch is still missing?",
};

export function ResearchBranchPage({ branch }: { branch: ResearchBranch }) {
  const inquiryCopy = branchInquiryCopy[branch.slug] ?? fallbackInquiryCopy;
  return (
    <main id="main-content" tabIndex={-1}>
      <header className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-16">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-6xl">
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
        introduction={`This branch's central question — “${branch.centralQuestion}” — is a genuine open question, not a settled result. These are worth returning to before treating any single study, including a future one on this branch, as the final word.`}
        socraticQuestions={[
          `Is ${branch.shortTitle.toLowerCase()} describing a real mechanism, or a label applied after the outcome was already known?`,
          inquiryCopy.socraticSecond,
          inquiryCopy.socraticThird,
          inquiryCopy.socraticFourth,
        ]}
        firstPrinciplesQuestions={[
          `What must be true for "${branch.centralQuestion}" to even be answerable with the evidence described on this page?`,
          inquiryCopy.firstPrinciplesSecond,
          inquiryCopy.firstPrinciplesThird,
          inquiryCopy.firstPrinciplesFourth,
        ]}
      />

      <Container className="max-w-6xl pb-10">
        <ResearchBranchNav currentSlug={branch.slug} />
      </Container>

      <section aria-labelledby="framing-title" className="py-14 sm:py-20">
        <Container className="max-w-6xl">
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
        <Container className="max-w-6xl">
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
        <Container className="max-w-6xl">
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
        <Container className="max-w-6xl">
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
        <Container className="max-w-6xl">
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

      <Container className="max-w-6xl py-14 sm:py-20">
        <CollaborationInvite
          subject={branch.shortTitle}
          description={`If your question, context, dataset or method intersects with ${branch.title.toLowerCase()}, I would be glad to compare ideas. A useful first note names the question, what evidence may be available and what a credible contribution could be.`}
        />
        <div className="mt-8">
          <ResearchBranchNav currentSlug={branch.slug} />
        </div>
        <p className="text-ink-500 mt-5 text-xs leading-relaxed">
          Source note: this public research summary is grounded in Swapnil Sahoo’s submitted 2024
          doctoral thesis. It does not distribute an unpublished paper or imply that every proposed
          extension is already an active study.
        </p>
      </Container>
    </main>
  );
}
