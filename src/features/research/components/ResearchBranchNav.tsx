import Link from "next/link";

import { researchBranches } from "@/features/research/data/researchAgenda";

export function ResearchBranchNav({ currentSlug }: { currentSlug?: string }) {
  return (
    <nav aria-label="Research branches" className="glass-card p-3 sm:p-4">
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        <li>
          <Link
            href="/research"
            aria-current={currentSlug ? undefined : "page"}
            className={`flex min-h-14 items-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
              currentSlug
                ? "hover:bg-brand-50 dark:hover:bg-brand-900/20"
                : "bg-ink-900 text-white dark:bg-brand-600"
            }`}
          >
            Research overview
          </Link>
        </li>
        {researchBranches.map((branch) => {
          const current = branch.slug === currentSlug;

          return (
            <li key={branch.slug}>
              <Link
                href={`/research/${branch.slug}`}
                aria-current={current ? "page" : undefined}
                className={`flex min-h-14 items-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  current
                    ? "bg-ink-900 text-white dark:bg-brand-600"
                    : "hover:bg-brand-50 dark:hover:bg-brand-900/20"
                }`}
              >
                <span>
                  <span className={`mr-2 font-mono text-[10px] ${current ? "text-white/60" : "text-ink-400"}`}>
                    {branch.index}
                  </span>
                  {branch.shortTitle}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
