"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

import { CopyIcon, SearchIcon } from "@/components/icons/LineIcons";
import type { ReaderEntry, ScriptureSlug } from "@/features/spirituality/types";

type ReadingLayer = "word" | "line";
type ReaderMode = "filtered" | "exact";

const ALL_SECTIONS = "All sections";

type ReaderResponse = {
  entries: ReaderEntry[];
  focusId?: string;
  nextOffset?: number;
  total: number;
};

function hasDistinctStudyRows(entry: ReaderEntry) {
  if (entry.words.length !== 1) return entry.words.length > 0;

  const [word] = entry.words;
  return (
    (word.original ?? "") !== entry.original ||
    word.transliteration.trim() !== entry.transliteration.trim() ||
    word.meaning.trim() !== (entry.meaning?.trim() ?? "")
  );
}

export function ScriptureReader({
  initialEntries,
  initialResultTotal,
  initialSection,
  language,
  pageSize,
  sections,
  slug,
  supportsStudyLayer,
  totalEntries,
}: {
  initialEntries: ReaderEntry[];
  initialResultTotal: number;
  initialSection: string;
  language: string;
  pageSize: number;
  sections: string[];
  slug: ScriptureSlug;
  supportsStudyLayer: boolean;
  totalEntries: number;
}) {
  const isSahasranama = slug === "vishnu-sahasranama" || slug === "lalita-sahasranama";
  const searchId = useId();
  const sectionId = useId();
  const jumpId = useId();
  const [entries, setEntries] = useState(initialEntries);
  const [resultTotal, setResultTotal] = useState(initialResultTotal);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [section, setSection] = useState(initialSection);
  const [readingLayer, setReadingLayer] = useState<ReadingLayer>("word");
  const [nextOffset, setNextOffset] = useState<number | undefined>(
    initialEntries.length < initialResultTotal ? initialEntries.length : undefined
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [jumpValue, setJumpValue] = useState("1");
  const [pendingEntryId, setPendingEntryId] = useState<string | null>(null);
  const [navigationMessage, setNavigationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [readerMode, setReaderMode] = useState<ReaderMode>("filtered");
  const hasMounted = useRef(false);
  const romanizationLabel =
    slug === "hanuman-chalisa" || slug === "ramcharitmanas" ? "orthographic romanization" : "IAST";
  const studyLayerLabel =
    slug === "shiva-tandava-stotram" ? "Pāda study" : isSahasranama ? "Name study" : "Word study";
  const studyGuideLabel =
    slug === "shiva-tandava-stotram"
      ? "Pāda-level reading guide"
      : isSahasranama
        ? "Received name & close gloss"
        : "Word & compound study";

  const sectionOptions = useMemo(() => [ALL_SECTIONS, ...sections], [sections]);
  const ranges = sections;
  const activeRangeIndex = ranges.indexOf(section);
  const resultLabel = `${resultTotal} ${resultTotal === 1 ? "entry" : "entries"}`;

  const resetPagination = () => {
    setNextOffset(undefined);
  };

  const chooseSection = (nextSection: string) => {
    setIsLoading(true);
    setLoadError("");
    setReaderMode("filtered");
    setQuery("");
    setDebouncedQuery("");
    setSection(nextSection);
    resetPagination();
    setNavigationMessage(
      nextSection === ALL_SECTIONS ? "Showing all sections." : `Showing ${nextSection}.`
    );
  };

  const moveRange = (direction: -1 | 1) => {
    const nextIndex = activeRangeIndex + direction;
    const nextRange = ranges[nextIndex];
    if (nextRange) chooseSection(nextRange);
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query.trim()), 250);
    return () => window.clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (readerMode === "exact") return;

    const controller = new AbortController();
    const params = new URLSearchParams({
      limit: String(pageSize),
      offset: "0",
      query: debouncedQuery,
      section,
    });

    fetch(`/api/spirituality/${slug}/entries?${params.toString()}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("The reader could not load this selection.");
        return (await response.json()) as ReaderResponse;
      })
      .then((result) => {
        setEntries(result.entries);
        setNextOffset(result.nextOffset);
        setResultTotal(result.total);
        setNavigationMessage(
          result.total === 0
            ? "No matching entry."
            : `Showing ${result.entries.length} of ${result.total} entries.`
        );
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoadError(error instanceof Error ? error.message : "The reader could not load.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [debouncedQuery, pageSize, readerMode, section, slug]);

  const loadExactEntry = useCallback(
    async ({ entryId, sequence }: { entryId?: string; sequence?: number }, updateHash = true) => {
      const params = new URLSearchParams();
      if (entryId) params.set("entryId", entryId);
      if (sequence) params.set("sequence", String(sequence));

      setIsLoading(true);
      setLoadError("");
      try {
        const response = await fetch(`/api/spirituality/${slug}/entries?${params.toString()}`);
        if (!response.ok) throw new Error("That entry could not be loaded.");
        const result = (await response.json()) as ReaderResponse;
        const entry = result.entries[0];
        if (!entry) {
          setNavigationMessage(`Choose a number from 1 to ${totalEntries}.`);
          return;
        }

        setReaderMode("exact");
        setQuery("");
        setDebouncedQuery("");
        setSection(entry.section);
        setNextOffset(undefined);
        setEntries([entry]);
        setResultTotal(1);
        setJumpValue(String(entry.sequence));
        setPendingEntryId(entry.id);
        setNavigationMessage(`${entry.label} is ready.`);

        if (updateHash) window.history.pushState(null, "", `#${entry.id}`);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : "That entry could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    },
    [slug, totalEntries]
  );

  const loadMore = async () => {
    if (nextOffset === undefined) return;

    const params = new URLSearchParams({
      limit: String(pageSize),
      offset: String(nextOffset),
      query: debouncedQuery,
      section,
    });
    setIsLoading(true);
    setLoadError("");

    try {
      const response = await fetch(`/api/spirituality/${slug}/entries?${params.toString()}`);
      if (!response.ok) throw new Error("The reader could not load more entries.");
      const result = (await response.json()) as ReaderResponse;
      setEntries((currentEntries) => [...currentEntries, ...result.entries]);
      setNextOffset(result.nextOffset);
      setResultTotal(result.total);
      setNavigationMessage(
        `Showing ${Math.min(nextOffset + result.entries.length, result.total)} of ${result.total} entries.`
      );
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "The reader could not load more.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitJump = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sequence = Number.parseInt(jumpValue, 10);
    if (!Number.isInteger(sequence) || sequence < 1 || sequence > totalEntries) {
      setNavigationMessage(`Choose a number from 1 to ${totalEntries}.`);
      return;
    }
    void loadExactEntry({ sequence });
  };

  useEffect(() => {
    const showHashEntry = () => {
      let entryId = "";
      try {
        entryId = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }

      if (!entryId) return;
      void loadExactEntry({ entryId }, false);
    };

    showHashEntry();
    window.addEventListener("hashchange", showHashEntry);
    window.addEventListener("popstate", showHashEntry);
    return () => {
      window.removeEventListener("hashchange", showHashEntry);
      window.removeEventListener("popstate", showHashEntry);
    };
  }, [loadExactEntry]);

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
    const entryUrl = `${window.location.origin}${window.location.pathname}#${entry.id}`;
    const studyText = [
      `${entry.label} · ${entry.section}`,
      entry.original,
      entry.transliteration,
      entry.meaning ?? "",
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
            {isLoading ? "Loading selection…" : `Showing ${entries.length} of ${resultLabel}`}
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.55fr_auto]">
          <div>
            <label htmlFor={searchId} className="mb-2 block text-xs font-semibold">
              Search the reader
            </label>
            <div className="relative">
              <SearchIcon
                aria-hidden="true"
                className="text-ink-400 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2"
              />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(event) => {
                  setIsLoading(true);
                  setLoadError("");
                  setReaderMode("filtered");
                  setQuery(event.target.value);
                  resetPagination();
                }}
                placeholder={
                  slug === "ramcharitmanas"
                    ? `Devanagari, ${romanizationLabel}, or source label`
                    : `Devanagari, ${romanizationLabel}, or meaning`
                }
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
              {sectionOptions.map((option) => (
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
                {slug === "ramcharitmanas"
                  ? "Source text with deterministic romanization"
                  : slug === "bhagavad-gita"
                    ? "Source text with deterministic IAST"
                    : "Numbered name with close gloss"}
              </p>
            </div>
          )}
        </div>

        {totalEntries > pageSize ? (
          <nav
            aria-label={`${slug.replaceAll("-", " ")} reader navigation`}
            className="border-ink-200/80 dark:border-ink-700 mt-5 grid gap-4 border-t pt-5 lg:grid-cols-[1fr_auto] lg:items-end"
          >
            {isSahasranama ? (
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
            ) : (
              <div>
                <p className="mb-2 text-xs font-semibold">Direct navigation</p>
                <p className="text-ink-600 dark:text-ink-300 text-xs leading-relaxed">
                  Open any numbered entry without loading the whole work into the page.
                </p>
              </div>
            )}

            <form onSubmit={submitJump}>
              <label htmlFor={jumpId} className="mb-2 block text-xs font-semibold">
                {isSahasranama ? "Jump to name" : "Jump to numbered entry"}
              </label>
              <div className="flex gap-2">
                <input
                  id={jumpId}
                  type="number"
                  min={1}
                  max={totalEntries}
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

      <div className="p-4 sm:p-7" aria-busy={isLoading}>
        {loadError ? (
          <p
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200"
          >
            {loadError} Please try again.
          </p>
        ) : null}
        <div className="grid gap-5">
          {entries.map((entry) => (
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
                  <a
                    href={`#${entry.id}`}
                    className="focus-visible:ring-brand-500 inline-flex min-h-11 items-center rounded-full bg-amber-100 px-3 font-mono text-[10px] font-semibold tracking-wider text-amber-950 uppercase focus-visible:ring-2 focus-visible:outline-none dark:bg-amber-400/15 dark:text-amber-200"
                  >
                    {entry.label}
                    <span className="sr-only"> permalink</span>
                  </a>
                  <span className="text-ink-400 font-mono text-[10px]">{entry.section}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyEntry(entry)}
                  className="text-ink-500 hover:text-brand-700 focus-visible:ring-brand-500 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition focus-visible:ring-2 focus-visible:outline-none dark:hover:text-blue-300"
                >
                  <CopyIcon aria-hidden="true" className="h-3.5 w-3.5" />
                  {copiedId === entry.id ? "Copied" : "Copy study note"}
                </button>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
                <div>
                  {entry.speaker ? (
                    <p
                      lang={entry.language ?? language}
                      className="mb-3 font-mono text-[10px] font-semibold tracking-wider text-amber-800 uppercase dark:text-amber-300"
                    >
                      {entry.speaker}
                    </p>
                  ) : null}
                  <p
                    lang={entry.language ?? language}
                    className="font-serif text-2xl leading-relaxed font-semibold [overflow-wrap:anywhere] whitespace-pre-line sm:text-3xl"
                  >
                    {entry.original}
                  </p>
                  <p
                    lang={(entry.language ?? language) === "awa" ? "awa-Latn" : "sa-Latn"}
                    className="mt-3 text-sm leading-relaxed font-medium [overflow-wrap:anywhere] whitespace-pre-line text-amber-800 italic dark:text-amber-300"
                  >
                    {entry.transliteration}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-white/[0.045]">
                  <p className="eyebrow mb-2">
                    {entry.meaning ? "Close meaning" : "Translation status"}
                  </p>
                  <p className="text-ink-700 dark:text-ink-100 text-sm leading-relaxed sm:text-base">
                    {entry.meaning ??
                      "No English or Hindi translation is published for this unit yet. The source text is shown without an invented or unreviewed substitute."}
                  </p>
                  {entry.note ? (
                    <p className="text-ink-500 mt-3 text-xs leading-relaxed">{entry.note}</p>
                  ) : null}
                  {entry.sourceRef ? (
                    <p className="text-ink-400 mt-3 font-mono text-[10px] leading-relaxed">
                      Source reference: {entry.sourceRef}
                    </p>
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
                              lang={entry.language ?? language}
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

        {!isLoading && entries.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-serif text-2xl font-semibold">No matching entry</p>
            <p className="text-ink-500 mt-2 text-sm">Try another word or reset the filters.</p>
            <button
              type="button"
              onClick={() => {
                setIsLoading(true);
                setLoadError("");
                setQuery("");
                setDebouncedQuery("");
                setReaderMode("filtered");
                setSection(initialSection);
                resetPagination();
              }}
              className="btn-ghost mt-5 min-h-11"
            >
              Reset reader
            </button>
          </div>
        ) : null}

        {readerMode === "filtered" && nextOffset !== undefined ? (
          <div className="mt-8 text-center">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => void loadMore()}
              className="bg-ink-950 focus-visible:ring-brand-500 inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:ring-2 focus-visible:outline-none dark:bg-white dark:text-slate-950"
            >
              Load {Math.min(pageSize, resultTotal - entries.length)} more
            </button>
          </div>
        ) : null}

        <p className="text-ink-400 mt-7 text-center font-mono text-[10px] tracking-wider uppercase">
          {slug.replaceAll("-", " ")} ·{" "}
          {slug === "ramcharitmanas" ? "source-text reading edition" : "editorial study edition"}
        </p>
      </div>
    </div>
  );
}
