import type { TreeNode } from "@/features/placements/data/case-primitives";

/**
 * A decomposition tree whose nodes carry figures, so the diagram doubles as a
 * ledger. The existing IssueTree renders one flat row of unvalued branches and
 * caps out at four columns; guesstimate trees need a second tier and need the
 * number visible at every node, which is the whole point of the exercise.
 *
 * Deliberately CSS-grid rather than SVG so it reflows to one column on a phone
 * and stays readable at 200% zoom.
 */
function Node({ node, depth }: { node: TreeNode; depth: number }) {
  const critical = node.isCriticalPath;
  return (
    <li className="min-w-0">
      <div
        className={[
          "rounded-xl border p-3 transition",
          critical
            ? "border-brand-400 bg-brand-50/80 dark:border-brand-500/60 dark:bg-brand-900/25"
            : "border-ink-200/80 bg-white/60 dark:border-ink-700 dark:bg-white/[0.03]",
        ].join(" ")}
      >
        <p className="text-ink-800 dark:text-ink-100 text-sm leading-snug font-semibold">
          {node.label}
        </p>
        {node.formula ? (
          <p className="text-brand-700 dark:text-brand-300 mt-1 font-mono text-[11px] break-words">
            {node.formula}
          </p>
        ) : null}
        {node.value ? (
          <p className="text-ink-900 dark:text-ink-50 mt-1.5 font-serif text-base font-semibold">
            {node.value}
          </p>
        ) : null}
        {node.note ? (
          <p className="text-ink-500 dark:text-ink-400 mt-1.5 text-xs leading-relaxed">
            {node.note}
          </p>
        ) : null}
      </div>

      {node.children?.length ? (
        <ul
          className={[
            "mt-2 grid gap-2 border-l pl-3",
            "border-ink-200/70 dark:border-ink-700",
            node.children.length >= 3 ? "sm:grid-cols-3" : node.children.length === 2 ? "sm:grid-cols-2" : "",
          ].join(" ")}
        >
          {node.children.map((child, i) => (
            <Node key={`${child.label}-${i}`} node={child} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function ValuedTree({
  root,
  rootFormula,
  value,
  branches,
}: {
  root: string;
  rootFormula?: string;
  value?: string;
  branches: readonly TreeNode[];
}) {
  // Column counts are written out literally: Tailwind scans source text, so an
  // interpolated `sm:grid-cols-${n}` would emit no class at all.
  const cols =
    branches.length >= 4
      ? "lg:grid-cols-4"
      : branches.length === 3
        ? "lg:grid-cols-3"
        : branches.length === 2
          ? "lg:grid-cols-2"
          : "";

  return (
    <div>
      <div className="border-brand-300/70 bg-brand-50 dark:border-brand-600/50 dark:bg-brand-900/20 rounded-2xl border-2 p-4 text-center">
        <p className="font-serif text-lg font-semibold">{root}</p>
        {rootFormula ? (
          <p className="text-brand-700 dark:text-brand-300 mt-1 font-mono text-xs break-words">
            {rootFormula}
          </p>
        ) : null}
        {value ? <p className="mt-2 font-serif text-xl font-semibold">{value}</p> : null}
      </div>

      <div className="flex justify-center py-2" aria-hidden="true">
        <span className="text-ink-400 dark:text-ink-500 text-lg leading-none">&#8595;</span>
      </div>

      <ul className={`grid gap-3 sm:grid-cols-2 ${cols}`}>
        {branches.map((b, i) => (
          <Node key={`${b.label}-${i}`} node={b} depth={0} />
        ))}
      </ul>
    </div>
  );
}
