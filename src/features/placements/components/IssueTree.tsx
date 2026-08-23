import { ArrowRightIcon } from "@/components/icons/LineIcons";

export interface IssueTreeBranch {
  label: string;
  formula?: string;
  note?: string;
}

interface IssueTreeProps {
  root: string;
  rootFormula?: string;
  branches: readonly IssueTreeBranch[];
}

/**
 * A small, dependency-free "issue tree" diagram: one headline metric
 * decomposed into two or three direct drivers. Used across the
 * placements frameworks/guesstimates pages in place of a screenshot
 * or external diagramming library.
 */
export function IssueTree({ root, rootFormula, branches }: IssueTreeProps) {
  const colsClass = branches.length >= 4 ? "sm:grid-cols-4" : branches.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className="mx-auto max-w-3xl">
      <div className="border-brand-300/70 bg-brand-50 dark:border-brand-600/50 dark:bg-brand-900/20 rounded-2xl border-2 p-4 text-center">
        <p className="font-serif text-lg font-semibold">{root}</p>
        {rootFormula ? (
          <p className="text-brand-700 dark:text-brand-300 mt-1 font-mono text-xs">
            {rootFormula}
          </p>
        ) : null}
      </div>
      <div className="flex justify-center py-2" aria-hidden="true">
        <ArrowRightIcon className="text-ink-400 dark:text-ink-500 h-4 w-4 rotate-90" />
      </div>
      <div className={`grid gap-3 ${colsClass}`}>
        {branches.map((branch) => (
          <div
            key={branch.label}
            className="border-ink-200/80 dark:border-ink-700 rounded-xl border p-4 text-center"
          >
            <p className="text-sm font-semibold">{branch.label}</p>
            {branch.formula ? (
              <p className="text-ink-600 dark:text-ink-300 mt-1 font-mono text-xs">
                {branch.formula}
              </p>
            ) : null}
            {branch.note ? (
              <p className="text-ink-500 dark:text-ink-400 mt-2 text-xs leading-relaxed">
                {branch.note}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
