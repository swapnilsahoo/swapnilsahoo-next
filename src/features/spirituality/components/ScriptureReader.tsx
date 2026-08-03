"use client";

import type { FormEvent } from "react";
import { useEffect, useId, useMemo, useState } from "react";

import type { ReaderEntry, ScriptureSlug } from "@/features/spirituality/types";

type ReadingLayer = "word" | "line";

const ALL_SECTIONS = "All sections";
const PAGE_SIZE = 12;
const SAHASRANAMA_RANGE_SIZE = 50;

function hasDistinctStudyRows(entry: ReaderEntry) {
  if (entry.words.length !== 1) return entry.words.length > 0;

  const [word] = entry.words;
  return (
    (word.original ?? "") !== entry.original ||
    word.transliteration.trim() !== entry.transliteration.trim() ||
    word.meaning.trim() !== entry.meaning.trim()
  );
}

export function ScriptureReader({
  entries,
  slug,
  language,
}: {
  entries: ReaderEntry[];
  slug: ScriptureSlug;
  language: string;
}) {
  const isSahasranama = slug === "vishnu-sahasranama" || slug === "lalita-sahasranama";
  const initialSection = isSahasranama ? (entries[0]?.section ?? ALL_SECTIONS) : ALL_SECTIONS;
  const searchId = useId();
  const sectionId = useId();
  const jumpId = useId();
  const [query, setQuery] = useState("");
  const [section, setSection] = useState(initialSection);
  const [readingLayer, setReadingLayer] = useState<ReadingLayer>("word");
  const [visibleCount, setVisibleCount] = useState(
    isSahasranama ? SAHASRANAMA_RANGE_SIZE : PAGE_SIZE
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [jumpValue, setJumpValue] = useState("1");
  const [pendingEntryId, setPendingEntryId] = useState<string | null>(null);
  const [navigationMessage, setNavigationMessage] = useState("");
  const romanizationLabel = slug === "hanuman-chalisa" ? "romanization" : "IAST";
  const studyLayerLabel =
    slug === "shiva-tandava-stotram" ? "Pāda study" : isSahasranama ? "Name study" : "Word study";
  const studyGuideLabel =
    slug === "shiva-tandava-stotram"
      ? "Pāda-level reading guide"
      : isSahasranama
        ? "Received name & close gloss"
        : "Word & compound study";

  const sections = useMemo(
    () => [ALL_SECTIONS, ...Array.from(new Set(entries.map((entry) => entry.section)))],
    [entries]
  );
  const ranges = useMemo(() => sections.filter((option) => option !== ALL_SECTIONS), [sections]);
  const activeRangeIndex = ranges.indexOf(section);
  const supportsStudyLayer = useMemo(() => entries.some(hasDistinctStudyRows), [entries]);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return entries.filter((entry) => {
      const inSection = section === ALL_SECTIONS || entry.section === section;
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

  const resetVisibleCount = (nextSection = section) => {
    setVisibleCount(
      isSahasranama && nextSection !== ALL_SECTIONS ? SAHASRANAMA_RANGE_SIZE : PAGE_SIZE
    );
  };

  const chooseSection = (nextSection: string) => {
    setQuery("");
    setSection(nextSection);
    resetVisibleCount(nextSection);
    setNavigationMessage(
      nextSection === ALL_SECTIONS ? "Showing all sections." : `Showing ${nextSection}.`
    );
  };

  const moveRange = (direction: -1 | 1) => {
    const nextIndex = activeRangeIndex + direction;
    const nextRange = ranges[nextIndex];
    if (nextRange) chooseSection(nextRange);
  };

  const showEntry = (sequence: number, updateHash = true) => {
    const entry = entries.find((candidate) => candidate.sequence === sequence);
    if (!entry) {
      setNavigationMessage(`Choose a number from 1 to ${entries.length}.`);
      return;
    }

    setQuery("");
    setSection(entry.section);
    setVisibleCount(SAHASRANAMA_RANGE_SIZE);
    setJumpValue(String(entry.sequence));
    setPendingEntryId(entry.id);
    setNavigationMessage(`${entry.label} is ready.`);

    if (updateHash) {
      window.history.pushState(null, "", `#${entry.id}`);
    }
  };

  const submitJump = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    showEntry(Number.parseInt(jumpValue, 10));
  };

  useEffect(() => {
    if (!isSahasranama) return;

    const showHashEntry = () => {
      let entryId = "";
      try {
        entryId = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }

      const entry = entries.find((candidate) => candidate.id === entryId);
      if (!entry) return;

      setQuery("");
      setSection(entry.section);
      setVisibleCount(SAHASRANAMA_RANGE_SIZE);
      setJumpValue(String(entry.sequence));
      setPendingEntryId(entry.id);
      setNavigationMessage(`${entry.label} is ready.`);
    };

    showHashEntry();
    window.addEventListener("hashchange", showHashEntry);
    window.addEventListener("popstate", showHashEntry);
    return () => {
      window.removeEventListener("hashchange", showHashEntry);
      window.removeEventListener("popstate", showHashEntry);
    };
  }, [entries, isSahasranama]);

  useEffect(() => {
    if (!pendingEntryId) return;

    const animationFrame = window.requestAnimationFrame(() => {
      const target = document.getElementById(pendingEntryId);
      if (!target) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      setPendingEntryId(null);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [pendingEntryId]);

  const copyEntry = async (entry: ReaderEntry) => {
    const distinctStudyRows = hasDistinctStudyRows(entry)
      ? entry.words
          .map(
            (word) =>
              `${word.original ? `${word.original} · ` : ""}${word.transliteration} — ${word.meaning}`
          )
          .join("\n")
      : "";
    const entryUrl = isSahasranama
      ? `${window.location.origin}${window.location.pathname}#${entry.id}`
      : "";
    const studyText = [
      `${entry.label} · ${entry.section}`,
      entry.original,
      entry.transliteration,
      entry.meaning,
      distinctStudyRows,
      entryUrl,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard.writeText(studyText);
      setCopiedId(entry.id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-amber-900/10 bg-white dark:border-amber-100/10 dark:bg-slate-950">
      <div className="border-b border-amber-900/10 bg-amber-50/55 p-5 sm:p-7 dark:border-amber-100/10 dark:bg-slate-900">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.55fr]">
          <div>
            <p className="eyebrow mb-2">Reader controls</p>
            <h3 className="font-serif text-2xl font-semibold sm:text-3xl">
              Move between script, sound, and sense.
            </h3>
            <p className="text-ink-600 dark:text-ink-300 mt-2 max-w-2xl text-sm leading-relaxed">
              {isSahasranama
                ? "Search every layer, move through fifty-name ranges, or jump directly to any numbered name. Each range stays quick to scan on phones as well as larger screens."
                : "Search every layer, narrow the list by section, or switch to the uncluttered line view. Only a small set is rendered at once, so the reader stays quick on phones as well as larger screens."}
            </p>
          </div>
          <p
            className="self-end rounded-lg border border-amber-900/10 bg-white px-4 py-3 font-mono text-xs text-amber-950 dark:border-amber-100/10 dark:bg-white/5 dark:text-amber-100"
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
                className="border-ink-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-ink-700 min-h-11 w-full rounded-lg border bg-white py-3 pr-4 pl-11 text-sm outline-none focus:ring-4 dark:bg-white/5"
              />
            </div>
          </div>

          <div>
            <label htmlFor={sectionId} className="mb-2 block text-xs font-semibold">
              {isSahasranama ? "Name range" : "Section"}
            </label>
            <select
              id={sectionId}
              value={section}
              onChange={(event) => chooseSection(event.target.value)}
              className="border-ink-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-ink-700 min-h-11 w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none focus:ring-4 dark:bg-slate-950"
            >
              {sections.map((option) => (
                <option key={option} value={option}>
                  {isSahasranama && option === ALL_SECTIONS ? "All 1,000 names" : option}
                </option>
              ))}
            </select>
          </div>

          {supportsStudyLayer ? (
            <fieldset>
              <legend className="mb-2 text-xs font-semibold">Reading layer</legend>
              <div className="border-ink-200 dark:border-ink-700 flex rounded-lg border bg-white p-1 dark:bg-white/5">
                {(
                  [
                    ["word", studyLayerLabel],
                    ["line", "Line view"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={readingLayer === value}
                    onClick={() => setReadingLayer(value)}
                    className={`focus-visible:ring-brand-500 min-h-11 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap transition focus-visible:ring-2 focus-visible:outline-none ${
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
          ) : (
            <div>
              <p className="mb-2 text-xs font-semibold">Study unit</p>
              <p className="border-ink-200 text-ink-600 dark:border-ink-700 dark:text-ink-300 flex min-h-11 items-center rounded-lg border bg-white px-3 text-xs dark:bg-white/5">
                Numbered name with close gloss
              </p>
            </div>
          )}
        </div>

        {isSahasranama ? (
          <nav
            aria-label="Thousand-name reader navigation"
            className="border-ink-200/80 dark:border-ink-700 mt-5 grid gap-4 border-t pt-5 lg:grid-cols-[1fr_auto] lg:items-end"
          >
            <div>
              <p className="mb-2 text-xs font-semibold">Move by range</p>
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2">
                <button
                  type="button"
                  onClick={() => moveRange(-1)}
                  disabled={activeRangeIndex <= 0}
                  className="border-ink-200 text-ink-700 focus-visible:ring-brand-500 dark:border-ink-700 dark:text-ink-100 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border bg-white px-3 text-xs font-semibold transition hover:border-amber-400 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/5"
                >
                  <span aria-hidden="true">←</span>
                  <span className="ml-1 hidden sm:inline">Previous range</span>
                  <span className="sr-only sm:hidden">Previous range</span>
                </button>
                <p className="text-ink-600 dark:text-ink-300 min-w-0 text-center text-xs font-semibold">
                  {section === ALL_SECTIONS ? "All 1,000 names" : section}
                </p>
                <button
                  type="button"
                  onClick={() => moveRange(1)}
                  disabled={activeRangeIndex < 0 || activeRangeIndex >= ranges.length - 1}
                  className="border-ink-200 text-ink-700 focus-visible:ring-brand-500 dark:border-ink-700 dark:text-ink-100 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border bg-white px-3 text-xs font-semibold transition hover:border-amber-400 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/5"
                >
                  <span className="mr-1 hidden sm:inline">Next range</span>
                  <span className="sr-only sm:hidden">Next range</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            <form onSubmit={submitJump}>
              <label htmlFor={jumpId} className="mb-2 block text-xs font-semibold">
                Jump to name
              </label>
              <div className="flex gap-2">
                <input
                  id={jumpId}
                  type="number"
                  min={1}
                  max={entries.length}
                  step={1}
                  required
                  inputMode="numeric"
                  value={jumpValue}
                  onChange={(event) => setJumpValue(event.target.value)}
                  className="border-ink-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-ink-700 min-h-11 w-28 rounded-lg border bg-white px-3 text-sm outline-none focus:ring-4 dark:bg-slate-950"
                />
                <button
                  type="submit"
                  className="bg-ink-950 focus-visible:ring-brand-500 inline-flex min-h-11 items-center justify-center rounded-lg px-4 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:ring-2 focus-visible:outline-none dark:bg-white dark:text-slate-950"
                >
                  Go
                </button>
              </div>
            </form>
            <p className="sr-only" aria-live="polite">
              {navigationMessage}
            </p>
          </nav>
        ) : null}
      </div>

      <div className="p-4 sm:p-7">
        <div className="grid gap-5">
          {visibleEntries.map((entry) => (
            <article
              key={entry.id}
              id={entry.id}
              aria-labelledby={`${entry.id}-title`}
              className="group border-ink-200/80 dark:border-ink-700 relative scroll-mt-28 overflow-hidden rounded-xl border bg-white p-5 sm:p-7 dark:bg-white/[0.035]"
            >
              <div className="absolute inset-y-0 left-0 w-px bg-amber-500" aria-hidden="true" />
              <h4 id={`${entry.id}-title`} className="sr-only">
                {entry.label}: {entry.transliteration}
              </h4>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {isSahasranama ? (
                    <a
                      href={`#${entry.id}`}
                      className="focus-visible:ring-brand-500 inline-flex min-h-11 items-center rounded-full bg-amber-100 px-3 font-mono text-[10px] font-semibold tracking-wider text-amber-950 uppercase focus-visible:ring-2 focus-visible:outline-none dark:bg-amber-400/15 dark:text-amber-200"
                    >
                      {entry.label}
                      <span className="sr-only"> permalink</span>
                    </a>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-amber-950 uppercase dark:bg-amber-400/15 dark:text-amber-200">
                      {entry.label}
                    </span>
                  )}
                  <span className="text-ink-400 font-mono text-[10px]">{entry.section}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyEntry(entry)}
                  className="text-ink-500 hover:text-brand-700 focus-visible:ring-brand-500 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition focus-visible:ring-2 focus-visible:outline-none dark:hover:text-blue-300"
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
                    className="font-serif text-2xl leading-relaxed font-semibold [overflow-wrap:anywhere] whitespace-pre-line sm:text-3xl"
                  >
                    {entry.original}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed font-medium [overflow-wrap:anywhere] whitespace-pre-line text-amber-800 italic dark:text-amber-300">
                    {entry.transliteration}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-white/[0.045]">
                  <p className="eyebrow mb-2">Close meaning</p>
                  <p className="text-ink-700 dark:text-ink-100 text-sm leading-relaxed sm:text-base">
                    {entry.meaning}
                  </p>
                  {entry.note ? (
                    <p className="text-ink-500 mt-3 text-xs leading-relaxed">{entry.note}</p>
                  ) : null}
                </div>
              </div>

              {readingLayer === "word" && hasDistinctStudyRows(entry) ? (
                <div className="mt-6 border-t border-dashed border-amber-900/15 pt-5 dark:border-amber-100/15">
                  <p className="eyebrow mb-3">{studyGuideLabel}</p>
                  <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                    {entry.words.map((word, wordIndex) => (
                      <div
                        key={`${entry.id}-${word.transliteration}-${wordIndex}`}
                        className="rounded-lg border border-amber-900/10 bg-amber-50/65 p-3 dark:border-amber-100/10 dark:bg-amber-400/[0.045]"
                      >
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          {word.original ? (
                            <span
                              lang={language}
                              className="font-serif text-lg font-semibold [overflow-wrap:anywhere]"
                            >
                              {word.original}
                            </span>
                          ) : null}
                          <span className="text-xs font-semibold [overflow-wrap:anywhere] text-amber-800 italic dark:text-amber-300">
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
                setSection(initialSection);
                resetVisibleCount(initialSection);
              }}
              className="btn-ghost mt-5 min-h-11"
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
              className="bg-ink-950 focus-visible:ring-brand-500 inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:ring-2 focus-visible:outline-none dark:bg-white dark:text-slate-950"
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
