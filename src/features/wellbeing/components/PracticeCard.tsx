import type { Practice } from "@/features/wellbeing/types";

export function PracticeCard({ practice }: { practice: Practice }) {
  return (
    <li>
      <details className="group glass-card overflow-hidden">
        <summary className="focus-visible:ring-brand-500 flex min-h-20 cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 focus-visible:ring-2 focus-visible:outline-none sm:px-7">
          <span className="flex min-w-0 gap-4">
            <span
              className="text-brand-700 dark:text-brand-300 shrink-0 pt-1 font-mono text-xs whitespace-nowrap"
              aria-hidden="true"
            >
              {practice.number}
            </span>
            <span className="min-w-0">
              <span className="block font-serif text-lg font-semibold sm:text-xl">
                {practice.title}
              </span>
              <span className="text-ink-500 dark:text-ink-400 mt-1 block text-xs">
                {practice.framework}
              </span>
            </span>
          </span>
          <span
            className="border-ink-200 dark:border-ink-700 text-brand-700 dark:text-brand-300 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg leading-none group-open:hidden"
            aria-hidden="true"
          >
            +
          </span>
          <span
            className="border-ink-200 dark:border-ink-700 text-brand-700 dark:text-brand-300 mt-0.5 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg leading-none group-open:flex"
            aria-hidden="true"
          >
            −
          </span>
        </summary>

        <div className="border-ink-200/80 dark:border-ink-700 border-t px-5 pt-6 pb-7 sm:px-7">
          <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed sm:text-base">
            {practice.why}
          </p>
          {practice.evidence ? (
            <p className="text-ink-500 dark:text-ink-400 mt-3 text-xs leading-relaxed italic">
              {practice.evidence}
            </p>
          ) : null}

          <div className="mt-6 space-y-3">
            {practice.steps.map((step, index) => (
              <div
                key={`${practice.slug}-step-${index}`}
                className="grid gap-2 rounded-xl border p-4 sm:grid-cols-[3rem_1fr_auto] sm:items-start sm:gap-4"
                style={{ borderColor: "var(--line)" }}
              >
                <span className="text-brand-700 dark:text-brand-300 font-mono text-xs font-semibold">
                  {step.step}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{step.action}</span>
                  <span className="text-ink-600 dark:text-ink-300 mt-1 block text-sm leading-relaxed">
                    {step.detail}
                  </span>
                </span>
                <span className="tag tag-ink sm:justify-self-end">{step.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </details>
    </li>
  );
}
