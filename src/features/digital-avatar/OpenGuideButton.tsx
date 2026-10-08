"use client";

export function OpenGuideButton({
  question,
  children,
}: {
  question?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new CustomEvent("open-digital-guide", { detail: { question } }))
      }
      className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-indigo-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-900 dark:bg-indigo-400 dark:text-slate-950 dark:hover:bg-indigo-300"
    >
      {children}
      <span aria-hidden="true">↗</span>
    </button>
  );
}
