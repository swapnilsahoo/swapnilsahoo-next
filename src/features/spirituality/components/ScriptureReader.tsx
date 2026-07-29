"use client";

import { useId, useMemo, useState } from "react";

import type { ReaderEntry, ScriptureSlug } from "@/features/spirituality/types";

type ReadingLayer = "word" | "line";

const PAGE_SIZE = 12;

export function ScriptureReader({
  entries,
  slug,
  language,
}: {
  entries: ReaderEntry[];
  slug: ScriptureSlug;
  language: string;
}) {
  const searchId = useId();
  const sectionId = useId();
  const [query, setQuery] = useState("");
  const [section, setSection] = useState("All sections");
  const [readingLayer, setReadingLayer] = useState<ReadingLayer>("word");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const romanizationLabel = slug === "hanuman-chalisa" ? "romanization" : "IAST";

  const sections = useMemo(
    () => ["All sections", ...Array.from(new Set(entries.map((entry) => entry.section)))],
    [entries]
  );

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return entries.filter((entry) => {
      const inSection = section === "All sections" || entry.section === section;
      if (!inSection) return false;
      if (!normalizedQuery) return true;

      return [
        entry.original,
        entry.transliteration,
        entry.meaning,
        entry.label,
        ...entry.words.flatMap((word) => [word.original ?? "", word.transliteration, word.meaning]),
      ].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));
    });
  }, [entries, query, section]);

  const visibleEntries = filteredEntries.slice(0, visibleCount);
  const resultLabel = `${filteredEntries.length} ${
    filteredEntries.length === 1 ? "entry" : "entries"
  }`;

  const resetVisibleCount = () => setVisibleCount(PAGE_SIZE);

  const copyEntry = async (entry: ReaderEntry) => {
    const studyText = [
      entry.original,
      entry.transliteration,
      entry.meaning,
      entry.words
        .map(
          (word) =>
            `${word.original ? `${word.original} · ` : ""}${word.transliteration} — ${word.meaning}`
        )
        .join("\n"),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(studyText);
      setCopiedId(entry.id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-amber-900/10 bg-white/75 shadow-2xl shadow-amber-950/8 backdrop-blur-xl dark:border-amber-100/10 dark:bg-slate-950/65">
      <div className="border-b border-amber-900/10 bg-gradient-to-br from-amber-50/90 via-white to-rose-50/70 p-5 sm:p-7 dark:border-amber-100/10 dark:from-amber-950/30 dark:via-slate-950 dark:to-rose-950/20">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.55fr]">
          <div>
            <p className="eyebrow mb-2">Reader controls</p>
            <h3 className="font-serif text-2xl font-semibold sm:text-3xl">
              Move between script, sound, and sense.
            </h3>
            <p className="text-ink-600 dark:text-ink-300 mt-2 max-w-2xl text-sm leading-relaxed">
              Search every layer, narrow by section, or switch to the uncluttered line view. Word
              study is the default.
            </p>
          </div>
          <p
            className="self-end rounded-2xl border border-amber-900/10 bg-white/70 px-4 py-3 font-mono text-xs text-amber-950 dark:border-amber-100/10 dark:bg-white/5 dark:text-amber-100"
            aria-live="polite"
          >
            Showing {Math.min(visibleCount, filteredEntries.length)} of {resultLabel}
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.55fr_auto]">
          <div>
            <label htmlFor={searchId} className="mb-2 block text-xs font-semibold">
              Search the reader
            </label>
            <div className="relative">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-ink-400 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.4-3.4" />
              </svg>
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  resetVisibleCount();
                }}
                placeholder={`Devanagari, ${romanizationLabel}, or meaning`}
                className="border-ink-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-ink-700 w-full rounded-xl border bg-white/80 py-3 pr-4 pl-11 text-sm outline-none focus:ring-4 dark:bg-white/5"
              />
            </div>
          </div>

          <div>
            <label htmlFor={sectionId} className="mb-2 block text-xs font-semibold">
              Section
            </label>
            <select
              id={sectionId}
              value={section}
              onChange={(event) => {
                setSection(event.target.value);
                resetVisibleCount();
              }}
              className="border-ink-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-ink-700 w-full rounded-xl border bg-white/80 px-4 py-3 text-sm outline-none focus:ring-4 dark:bg-slate-950"
            >
              {sections.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend className="mb-2 text-xs font-semibold">Reading layer</legend>
            <div className="border-ink-200 dark:border-ink-700 flex rounded-xl border bg-white/80 p-1 dark:bg-white/5">
              {(
                [
                  ["word", "Word study"],
                  ["line", "Line view"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={readingLayer === value}
                  onClick={() => setReadingLayer(value)}
                  className={`focus-visible:ring-brand-500 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap transition focus-visible:ring-2 focus-visible:outline-none ${
                    readingLayer === value
                      ? "bg-slate-950 text-white shadow-sm dark:bg-amber-100 dark:text-amber-950"
                      : "text-ink-600 dark:text-ink-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="p-4 sm:p-7">
        <div className="grid gap-5">
          {visibleEntries.map((entry) => (
            <article
              key={entry.id}
              id={entry.id}
              className="group border-ink-200/80 dark:border-ink-700 relative overflow-hidden rounded-3xl border bg-white/80 p-5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-950/8 sm:p-7 dark:bg-white/[0.035]"
            >
              <div
                className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-400 via-orange-500 to-rose-500 opacity-65"
                aria-hidden="true"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-amber-950 uppercase dark:bg-amber-400/15 dark:text-amber-200">
                    {entry.label}
                  </span>
                  <span className="text-ink-400 font-mono text-[10px]">{entry.section}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyEntry(entry)}
                  className="text-ink-500 hover:text-brand-700 focus-visible:ring-brand-500 inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition focus-visible:ring-2 focus-visible:outline-none dark:hover:text-blue-300"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-3.5 w-3.5"
                  >
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
                  </svg>
                  {copiedId === entry.id ? "Copied" : "Copy study note"}
                </button>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
                <div>
                  <p
                    lang={language}
                    className="font-serif text-2xl leading-relaxed font-semibold text-balance sm:text-3xl"
                  >
                    {entry.original}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed font-medium text-amber-800 italic dark:text-amber-300">
                    {entry.transliteration}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.045]">
                  <p className="eyebrow mb-2">Close meaning</p>
                  <p className="text-ink-700 dark:text-ink-100 text-sm leading-relaxed sm:text-base">
                    {entry.meaning}
                  </p>
                  {entry.note ? (
                    <p className="text-ink-500 mt-3 text-xs leading-relaxed">{entry.note}</p>
                  ) : null}
                </div>
              </div>

              {readingLayer === "word" ? (
                <div className="mt-6 border-t border-dashed border-amber-900/15 pt-5 dark:border-amber-100/15">
                  <p className="eyebrow mb-3">Word-by-word</p>
                  <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                    {entry.words.map((word, wordIndex) => (
                      <div
                        key={`${entry.id}-${word.transliteration}-${wordIndex}`}
                        className="rounded-xl border border-amber-900/10 bg-amber-50/65 p-3 dark:border-amber-100/10 dark:bg-amber-400/[0.045]"
                      >
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          {word.original ? (
                            <span lang={language} className="font-serif text-lg font-semibold">
                              {word.original}
                            </span>
                          ) : null}
                          <span className="text-xs font-semibold text-amber-800 italic dark:text-amber-300">
                            {word.transliteration}
                          </span>
                        </div>
                        <p className="text-ink-600 dark:text-ink-300 mt-1 text-xs leading-relaxed">
                          {word.meaning}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>

        {visibleEntries.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-serif text-2xl font-semibold">No matching entry</p>
            <p className="text-ink-500 mt-2 text-sm">Try another word or reset the filters.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSection("All sections");
                resetVisibleCount();
              }}
              className="btn-ghost mt-5"
            >
              Reset reader
            </button>
          </div>
        ) : null}

        {visibleEntries.length < filteredEntries.length ? (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              className="bg-ink-950 focus-visible:ring-brand-500 inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:ring-2 focus-visible:outline-none dark:bg-white dark:text-slate-950"
            >
              Load {Math.min(PAGE_SIZE, filteredEntries.length - visibleEntries.length)} more
            </button>
          </div>
        ) : null}

        <p className="text-ink-400 mt-7 text-center font-mono text-[10px] tracking-wider uppercase">
          {slug.replaceAll("-", " ")} · editorial study edition
        </p>
      </div>
    </div>
  );
}
