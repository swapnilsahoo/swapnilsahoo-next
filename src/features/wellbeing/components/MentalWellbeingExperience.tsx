import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { DailyTrackerClient, SelfAssessmentClient } from "@/features/wellbeing/components/ClientOnlyWidgets";
import { DeepDiveBlockView } from "@/features/wellbeing/components/DeepDiveBlockView";
import { PracticeCard } from "@/features/wellbeing/components/PracticeCard";
import {
  affirmationCategories,
  crisisResources,
  criticalRules,
  dailySchedule,
  deepDives,
  milestones,
  professionalModalities,
  quickReferenceCard,
  referenceGroups,
  seekHelpCriteria,
  weekPhases,
} from "@/features/wellbeing/data/mentalWellbeing";

export function MentalWellbeingExperience() {
  return (
    <main id="main-content" tabIndex={-1}>
      <header className="relative overflow-hidden pt-14 pb-12 sm:pt-20 sm:pb-16">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-6xl">
          <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-emerald-700 uppercase dark:text-emerald-300">
            Holistic Wellbeing · Mental Wellbeing
          </p>
          <h1 className="display mt-5 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
            An eight-week, evidence-based path out of anxious attachment.
          </h1>
          <p className="text-ink-600 dark:text-ink-300 mt-6 max-w-3xl text-base leading-relaxed sm:text-lg">
            A practical, self-guided program for the specific pain of anxious attachment and
            relationship loss — built on cognitive behavioural therapy, dialectical behaviour
            therapy, acceptance and commitment therapy, and polyvagal theory. Nothing here needs
            an app, a login, or a purchase. Just a notebook and eight weeks.
          </p>

          <div
            className="mt-8 rounded-2xl border p-5 sm:p-6"
            style={{ borderColor: "var(--line)" }}
          >
            <p className="eyebrow mb-2">Before anything else</p>
            <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed sm:text-base">
              This is an evidence-based self-help resource. It is not a substitute for
              professional mental health treatment. If you have thoughts of harming yourself or
              someone else, please reach out right now — not after finishing this page.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              {crisisResources.map((resource) => (
                <li key={resource.region} className="text-ink-800 dark:text-ink-100">
                  {resource.region}: {resource.contact}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="mental-wellbeing-inquiry"
        title="Two questions worth sitting with before you start."
        questions={[
          "If the anxiety you feel right now had a job to do, what would it be trying to protect you from?",
          "What would this week look like if you trusted that the feeling will pass, even without acting on it?",
        ]}
      />

      <section aria-labelledby="assessment-title" className="py-14 sm:py-20">
        <Container className="max-w-4xl">
          <div className="mb-8">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">01 / Baseline</p>
            <h2 id="assessment-title" className="display text-4xl font-semibold sm:text-5xl">
              A two-minute check-in.
            </h2>
          </div>
          <SelfAssessmentClient />
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="program-title" className="py-14 sm:py-20">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">02 / The eight-week program</p>
              <h2 id="program-title" className="display text-4xl font-semibold sm:text-5xl">
                Four phases, ten practices.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed sm:text-base lg:col-span-7">
              Each phase builds on the one before it — the sequence matters as much as any single
              practice. Skip ahead and the later work is harder than it needs to be. Every
              practice below is a real, step-by-step protocol, not a suggestion to “try
              mindfulness.”
            </p>
          </div>

          <div className="space-y-10">
            {weekPhases.map((phase) => (
              <div key={phase.slug}>
                <div className="mb-5 flex flex-wrap items-baseline gap-3">
                  <span className="tag tag-emerald">{phase.weeks}</span>
                  <h3 className="font-serif text-2xl font-semibold sm:text-3xl">{phase.title}</h3>
                </div>
                <p className="text-ink-600 dark:text-ink-300 mb-3 max-w-3xl text-sm leading-relaxed sm:text-base">
                  <strong className="text-ink-800 dark:text-ink-100">Goal: </strong>
                  {phase.goal}
                </p>
                <p className="text-ink-500 dark:text-ink-400 mb-5 max-w-3xl text-sm leading-relaxed">
                  {phase.rationale}
                </p>
                <ol role="list" className="space-y-3">
                  {phase.practices.map((practice) => (
                    <PracticeCard key={practice.slug} practice={practice} />
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="rules-title" className="py-14 sm:py-20">
        <Container className="max-w-6xl">
          <div className="mb-8">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">03 / Three critical rules</p>
            <h2 id="rules-title" className="display text-4xl font-semibold sm:text-5xl">
              These aren&apos;t optional, and the program doesn&apos;t work without them.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {criticalRules.map((rule, index) => (
              <article
                key={rule.title}
                className="from-ink-950 to-brand-900 rounded-3xl bg-gradient-to-br p-6 text-white sm:p-7"
              >
                <span className="font-mono text-xs font-semibold text-emerald-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-xl font-semibold sm:text-2xl">{rule.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-100/80">{rule.summary}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{rule.detail}</p>
                <ul role="list" className="mt-5 space-y-2">
                  {rule.actions.map((action) => (
                    <li key={action} className="flex gap-2 text-xs leading-relaxed text-slate-300">
                      <span aria-hidden="true" className="mt-1 h-1 w-1 shrink-0 rounded-full bg-emerald-300" />
                      {action}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="schedule-title" className="py-14 sm:py-20">
        <Container className="max-w-6xl">
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">04 / Daily rhythm</p>
              <h2 id="schedule-title" className="display text-4xl font-semibold sm:text-5xl">
                What an actual day looks like.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed sm:text-base">
              Minimum effective dose: about 30 minutes a day — the morning routine plus one
              evening entry. This is the fuller version.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b text-left" style={{ borderColor: "var(--line)" }}>
                  <th className="py-3 pr-4 font-semibold">When</th>
                  <th className="py-3 pr-4 font-semibold">Practice</th>
                  <th className="py-3 pr-4 font-semibold">Why</th>
                  <th className="py-3 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody>
                {dailySchedule.map((row) => (
                  <tr key={row.time} className="border-b" style={{ borderColor: "var(--line)" }}>
                    <td className="py-3 pr-4 align-top font-medium">{row.time}</td>
                    <td className="text-ink-700 dark:text-ink-200 py-3 pr-4 align-top">
                      {row.practice}
                    </td>
                    <td className="text-ink-500 dark:text-ink-400 py-3 pr-4 align-top">
                      {row.why}
                    </td>
                    <td className="py-3 align-top whitespace-nowrap">
                      <span className="tag tag-ink">{row.duration}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <DailyTrackerClient />
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="milestones-title" className="py-14 sm:py-20">
        <Container className="max-w-6xl">
          <div className="mb-8">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">05 / What to expect</p>
            <h2 id="milestones-title" className="display text-4xl font-semibold sm:text-5xl">
              Progress isn&apos;t a straight line, but it is real.
            </h2>
          </div>
          <ol role="list" className="grid gap-4 lg:grid-cols-5">
            {milestones.map((milestone) => (
              <li key={milestone.weeks} className="glass-card p-5">
                <p className="eyebrow mb-3">{milestone.weeks}</p>
                <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed">
                  {milestone.expectedShifts}
                </p>
                <p className="text-ink-500 dark:text-ink-400 mt-3 text-xs leading-relaxed">
                  <strong>Focus: </strong>
                  {milestone.focus}
                </p>
                <p className="text-ink-500 dark:text-ink-400 mt-2 text-xs leading-relaxed">
                  <strong>Sign you&apos;re on track: </strong>
                  {milestone.marker}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-amber-700 dark:text-amber-300">
                  <strong>Watch for: </strong>
                  {milestone.watchFor}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section
        aria-labelledby="help-title"
        className="py-14 sm:py-20"
        style={{ background: "var(--surface, transparent)" }}
      >
        <Container className="max-w-6xl">
          <div
            className="rounded-3xl border-2 p-6 sm:p-9"
            style={{ borderColor: "rgb(244 63 94 / 0.35)" }}
          >
            <p className="eyebrow mb-3">06 / When to seek professional help</p>
            <h2 id="help-title" className="font-serif text-3xl font-semibold sm:text-4xl">
              Asking for help is not a failure of this program.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-4 max-w-3xl text-sm leading-relaxed sm:text-base">
              This program is rigorous and it helps most people who do it consistently. It is not
              a substitute for a professional when any of the following is true:
            </p>
            <ul role="list" className="mt-5 grid gap-3 sm:grid-cols-2">
              {seekHelpCriteria.map((criterion) => (
                <li key={criterion} className="flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                  <span className="text-ink-700 dark:text-ink-200">{criterion}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {professionalModalities.map((modality) => (
                <div key={modality.name} className="rounded-xl border p-4" style={{ borderColor: "var(--line)" }}>
                  <p className="text-sm font-semibold">{modality.name}</p>
                  <p className="text-ink-500 dark:text-ink-400 mt-1 text-xs leading-relaxed">
                    {modality.use}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-xl border p-4" style={{ borderColor: "rgb(244 63 94 / 0.35)" }}>
              <p className="text-sm font-semibold">If you need immediate support</p>
              <ul className="mt-2 space-y-1 text-sm">
                {crisisResources.map((resource) => (
                  <li key={resource.region}>
                    <strong>{resource.region}: </strong>
                    {resource.contact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="deep-dives-title" className="py-14 sm:py-20">
        <Container className="max-w-6xl">
          <div className="mb-8">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">07 / Going deeper</p>
            <h2 id="deep-dives-title" className="display text-4xl font-semibold sm:text-5xl">
              Beyond the eight weeks.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
              Three extended modules, for anyone whose situation goes further than ordinary
              heartbreak, or who wants the fuller science underneath the practices above.
            </p>
          </div>

          <div className="space-y-4">
            {deepDives.map((section) => (
              <details key={section.slug} className="group glass-card overflow-hidden">
                <summary className="focus-visible:ring-brand-500 flex min-h-20 cursor-pointer list-none items-start justify-between gap-4 px-5 py-6 focus-visible:ring-2 focus-visible:outline-none sm:px-7">
                  <span className="min-w-0">
                    <span className="eyebrow">{section.eyebrow}</span>
                    <span className="mt-1 block font-serif text-xl font-semibold sm:text-2xl">
                      {section.title}
                    </span>
                    <span className="text-ink-600 dark:text-ink-300 mt-2 block text-sm leading-relaxed">
                      {section.summary}
                    </span>
                  </span>
                  <span
                    className="border-ink-200 dark:border-ink-700 text-brand-700 dark:text-brand-300 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xl leading-none group-open:hidden"
                    aria-hidden="true"
                  >
                    +
                  </span>
                  <span
                    className="border-ink-200 dark:border-ink-700 text-brand-700 dark:text-brand-300 mt-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xl leading-none group-open:flex"
                    aria-hidden="true"
                  >
                    −
                  </span>
                </summary>
                <div
                  className="border-ink-200/80 dark:border-ink-700 space-y-6 border-t px-5 pt-6 pb-7 sm:px-7"
                >
                  {section.body.map((block, index) => (
                    <DeepDiveBlockView key={`${section.slug}-${index}`} block={block} keyPrefix={`${section.slug}-${index}`} />
                  ))}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="affirmations-title" className="py-14 sm:py-20">
        <Container className="max-w-6xl">
          <div className="mb-8">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">08 / Daily affirmations</p>
            <h2 id="affirmations-title" className="display text-4xl font-semibold sm:text-5xl">
              Not wishful thinking — targeted cognitive practice.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
              Spoken during the calm of the morning breathing practice, these are most effective —
              your brain is measurably more receptive to new patterns in that state. Pick 3–5 that
              land, rather than reciting the full list.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {affirmationCategories.map((category) => (
              <details key={category.slug} className="group glass-card overflow-hidden">
                <summary className="focus-visible:ring-brand-500 flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 focus-visible:ring-2 focus-visible:outline-none">
                  <span>
                    <span className="block font-serif text-lg font-semibold">{category.title}</span>
                    <span className="text-ink-500 dark:text-ink-400 mt-1 block text-xs">
                      {category.useWhen}
                    </span>
                  </span>
                  <span
                    className="text-brand-700 dark:text-brand-300 text-xl leading-none group-open:hidden"
                    aria-hidden="true"
                  >
                    +
                  </span>
                  <span
                    className="text-brand-700 dark:text-brand-300 hidden text-xl leading-none group-open:inline"
                    aria-hidden="true"
                  >
                    −
                  </span>
                </summary>
                <ul role="list" className="border-ink-200/80 dark:border-ink-700 space-y-2 border-t px-5 py-5">
                  {category.affirmations.map((line) => (
                    <li key={line} className="font-serif text-sm leading-relaxed sm:text-base">
                      “{line}”
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          <div className="from-ink-950 to-brand-900 mt-6 rounded-3xl bg-gradient-to-br p-6 text-white sm:p-8">
            <p className="eyebrow mb-3 text-emerald-200">Quick-reference card</p>
            <p className="mb-5 text-sm leading-relaxed text-slate-300">
              Screenshot this. Keep it on your phone for the moments you only have a second to
              reach for something.
            </p>
            <div className="grid gap-4 sm:grid-cols-5">
              {quickReferenceCard.map((entry) => (
                <div key={entry.category} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <p className="text-xs font-semibold text-emerald-300">{entry.category}</p>
                  <p className="mt-1 text-[11px] text-slate-400">{entry.moment}</p>
                  <p className="mt-3 font-serif text-sm leading-relaxed">“{entry.line}”</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="references-title" className="py-14 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-6">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">09 / Sources</p>
            <h2 id="references-title" className="display text-3xl font-semibold sm:text-4xl">
              Where this comes from.
            </h2>
          </div>
          <details className="group glass-card overflow-hidden">
            <summary className="focus-visible:ring-brand-500 flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 focus-visible:ring-2 focus-visible:outline-none">
              <span className="text-sm font-semibold">Show the full reference list, by topic</span>
              <span className="text-brand-700 dark:text-brand-300 text-xl leading-none group-open:hidden" aria-hidden="true">
                +
              </span>
              <span className="text-brand-700 dark:text-brand-300 hidden text-xl leading-none group-open:inline" aria-hidden="true">
                −
              </span>
            </summary>
            <div className="border-ink-200/80 dark:border-ink-700 grid gap-6 border-t px-5 py-6 sm:grid-cols-2">
              {referenceGroups.map((group) => (
                <div key={group.heading}>
                  <p className="eyebrow mb-2">{group.heading}</p>
                  <ul className="space-y-1.5">
                    {group.entries.map((entry) => (
                      <li key={entry} className="text-ink-500 dark:text-ink-400 text-xs leading-relaxed">
                        {entry}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
          <p className="text-ink-500 dark:text-ink-400 mt-6 text-sm leading-relaxed italic">
            You are not broken. You are healing. Begin tomorrow morning — one breath, one day, one
            step.
          </p>
        </Container>
      </section>
    </main>
  );
}
