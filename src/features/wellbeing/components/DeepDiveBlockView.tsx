import type { DeepDiveBlock } from "@/features/wellbeing/types";

export function DeepDiveBlockView({ block, keyPrefix }: { block: DeepDiveBlock; keyPrefix: string }) {
  if (block.kind === "text") {
    return (
      <div>
        {block.heading ? <h4 className="font-serif text-lg font-semibold">{block.heading}</h4> : null}
        <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed sm:text-base">
          {block.text}
        </p>
      </div>
    );
  }

  if (block.kind === "list") {
    return (
      <div>
        {block.heading ? <h4 className="font-serif text-lg font-semibold">{block.heading}</h4> : null}
        <ul role="list" className="mt-3 space-y-2">
          {block.items.map((item, index) => (
            <li key={`${keyPrefix}-${index}`} className="flex gap-3 text-sm leading-relaxed sm:text-base">
              <span aria-hidden="true" className="text-brand-700 dark:text-brand-300 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
              <span className="text-ink-700 dark:text-ink-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (block.kind === "steps") {
    return (
      <div>
        {block.heading ? <h4 className="font-serif text-lg font-semibold">{block.heading}</h4> : null}
        {block.framework ? (
          <p className="text-ink-500 dark:text-ink-400 mt-1 text-xs">{block.framework}</p>
        ) : null}
        <div className="mt-4 space-y-3">
          {block.steps.map((step, index) => (
            <div
              key={`${keyPrefix}-${index}`}
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
    );
  }

  if (block.kind === "callout") {
    const toneClass =
      block.tone === "warning"
        ? "border-rose-400/40 bg-rose-50 dark:bg-rose-950/20"
        : block.tone === "quote"
          ? "border-brand-400/40 bg-brand-50 dark:bg-brand-950/20"
          : "border-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/10";

    return (
      <div className={`rounded-2xl border p-5 ${toneClass}`}>
        <p className="text-ink-800 dark:text-ink-100 text-sm leading-relaxed sm:text-base">
          {block.tone === "quote" ? `“${block.text}”` : block.text}
        </p>
        {block.attribution ? (
          <p className="text-ink-500 dark:text-ink-400 mt-2 text-xs">— {block.attribution}</p>
        ) : null}
      </div>
    );
  }

  return null;
}
