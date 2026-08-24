"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";

export type ShelfCategory = "books" | "movies" | "series" | "documentaries";

export type ShelfItem = {
  title: string;
  creator: string;
  year: string;
  why: string;
  image?: { src: string; alt: string };
};

export type ShelfGroup = {
  id: ShelfCategory;
  label: string;
  anchorId: string;
  eyebrow: string;
  title: string;
  description: string;
  items: ShelfItem[];
};

type ShelfEntry = {
  group: ShelfGroup;
  item: ShelfItem;
  index: number;
  key: string;
};

const INITIAL_PER_GROUP = 4;
const FOCUSED_PAGE_SIZE = 12;

function ShelfCard({ item, index }: { item: ShelfItem; index: number }) {
  const isSarasvathy = item.title.startsWith("Effectuation");

  return (
    <article className="glass-card group flex h-full flex-col overflow-hidden p-0 transition-shadow duration-300 hover:shadow-xl">
      <div className="bg-ink-100 dark:bg-ink-900 relative aspect-[2/3] w-full overflow-hidden">
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            unoptimized
            className="object-contain transition duration-500 ease-out group-hover:scale-105 group-hover:contrast-110 group-hover:saturate-125"
          />
        ) : (
          <div className="text-ink-400 dark:text-ink-600 flex h-full items-center justify-center p-4 text-center font-mono text-[10px] tracking-[0.1em] uppercase">
            No cover art available
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-ink-400 font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>
        <h4 className="mt-3 font-serif text-xl font-semibold">{item.title}</h4>
        <p className="text-ink-500 dark:text-ink-400 mt-1 text-xs font-semibold tracking-wide uppercase">
          {item.creator} · {item.year}
        </p>
        <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-relaxed">{item.why}</p>
        {isSarasvathy ? (
          <Link
            href="/press#linkedin-title"
            className="text-brand-700 dark:text-brand-300 link-underline mt-4 inline-flex items-center gap-1 text-xs font-semibold"
          >
            Read the AOM 2026 post
            <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export function ShelfLibrary({ groups, totalCount }: { groups: ShelfGroup[]; totalCount: number }) {
  const [category, setCategory] = useState<"all" | ShelfCategory>("all");
  const [query, setQuery] = useState("");
  const [revealStep, setRevealStep] = useState(0);

  const entries = useMemo<ShelfEntry[]>(
    () =>
      groups.flatMap((group) =>
        group.items.map((item, index) => ({
          group,
          item,
          index,
          key: `${group.id}:${item.title}`,
        }))
      ),
    [groups]
  );

  const normalizedQuery = query.trim().toLocaleLowerCase("en");
  const matchingEntries = useMemo(
    () =>
      entries.filter(({ group, item }) => {
        const matchesCategory = category === "all" || group.id === category;
        const searchable = [item.title, item.creator, item.year, item.why]
          .join(" ")
          .toLocaleLowerCase("en");

        return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
      }),
    [category, entries, normalizedQuery]
  );

  const isDefaultView = category === "all" && !normalizedQuery;
  const visibleEntries = useMemo(() => {
    if (!isDefaultView) {
      return matchingEntries.slice(0, FOCUSED_PAGE_SIZE * (revealStep + 1));
    }

    const perGroupLimit = INITIAL_PER_GROUP * (revealStep + 1);
    return groups.flatMap((group) =>
      matchingEntries.filter((entry) => entry.group.id === group.id).slice(0, perGroupLimit)
    );
  }, [groups, isDefaultView, matchingEntries, revealStep]);

  const matchingKeys = new Set(matchingEntries.map((entry) => entry.key));
  const visibleKeys = new Set(visibleEntries.map((entry) => entry.key));
  const hasActiveFilter = category !== "all" || Boolean(normalizedQuery);

  const selectCategory = (nextCategory: "all" | ShelfCategory) => {
    setCategory(nextCategory);
    setRevealStep(0);
  };

  const clearFilters = () => {
    setCategory("all");
    setQuery("");
    setRevealStep(0);
  };

  return (
    <section aria-labelledby="shelf-library-title" className="py-16 sm:py-24">
      <Container className="max-w-[87.5rem]">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div className="max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Browse the shelf</p>
            <h2 id="shelf-library-title" className="display text-4xl font-semibold md:text-5xl">
              Find the next useful argument.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Search the commentary, choose a format, or begin with four recommendations from each
              channel. Every one of the {totalCount} entries remains here when you want the complete
              shelf.
            </p>
          </div>

          <div className="glass-card p-5 sm:p-6" data-shelf-controls>
            <label htmlFor="shelf-search" className="block text-sm font-semibold">
              Search titles, creators, years, or commentary
            </label>
            <input
              id="shelf-search"
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setRevealStep(0);
              }}
              placeholder="Try effectuation, ethics, India…"
              className="border-ink-300 text-ink-900 placeholder:text-ink-400 focus:border-brand-500 dark:border-ink-700 dark:bg-ink-900 mt-2 min-h-12 w-full rounded-xl border bg-white px-4 py-3 outline-none dark:text-white"
            />

            <fieldset className="mt-5">
              <legend className="text-sm font-semibold">Filter by format</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  aria-pressed={category === "all"}
                  onClick={() => selectCategory("all")}
                  className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    category === "all"
                      ? "border-ink-900 bg-ink-900 dark:border-brand-500 dark:bg-brand-600 text-white"
                      : "border-ink-300 hover:border-brand-500 dark:border-ink-700 dark:hover:border-brand-400"
                  }`}
                >
                  All {totalCount}
                </button>
                {groups.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    aria-pressed={category === group.id}
                    onClick={() => selectCategory(group.id)}
                    className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      category === group.id
                        ? "border-ink-900 bg-ink-900 dark:border-brand-500 dark:bg-brand-600 text-white"
                        : "border-ink-300 hover:border-brand-500 dark:border-ink-700 dark:hover:border-brand-400"
                    }`}
                  >
                    {group.label} {group.items.length}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p
                className="text-ink-600 dark:text-ink-300 text-sm"
                role="status"
                aria-live="polite"
              >
                Showing <strong>{visibleEntries.length}</strong> of {matchingEntries.length}{" "}
                matching recommendations.
              </p>
              {hasActiveFilter ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-brand-700 dark:text-brand-300 min-h-11 rounded-lg px-2 text-sm font-semibold underline underline-offset-4"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {matchingEntries.length === 0 ? (
          <div className="border-ink-200 dark:border-ink-700 mt-10 rounded-2xl border border-dashed p-8 text-center">
            <p className="font-serif text-2xl font-semibold">
              No recommendation matches that search.
            </p>
            <button type="button" onClick={clearFilters} className="btn-ghost mt-4">
              Reset the shelf
            </button>
          </div>
        ) : null}

        <div className="mt-12 space-y-16">
          {groups.map((group) => {
            const groupHasMatch = matchingEntries.some((entry) => entry.group.id === group.id);
            const groupHasVisibleItem = visibleEntries.some((entry) => entry.group.id === group.id);

            return (
              <section
                key={group.id}
                id={group.anchorId}
                aria-labelledby={`${group.id}-title`}
                hidden={!groupHasMatch || !groupHasVisibleItem}
                className="scroll-mt-28"
                data-shelf-group={group.id}
              >
                <div className="mb-8 max-w-3xl">
                  <p className="eyebrow mb-3">{group.eyebrow}</p>
                  <h3
                    id={`${group.id}-title`}
                    className="display text-3xl font-semibold md:text-4xl"
                  >
                    {group.title}
                  </h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-relaxed">
                    {group.description}
                  </p>
                </div>

                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
                  {group.items.map((item, index) => {
                    const key = `${group.id}:${item.title}`;
                    return (
                      <li
                        key={item.title}
                        hidden={!matchingKeys.has(key) || !visibleKeys.has(key)}
                        className="h-full min-w-0"
                        data-shelf-item={item.title}
                        data-shelf-category={group.id}
                      >
                        <ShelfCard item={item} index={index} />
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        {visibleEntries.length < matchingEntries.length ? (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setRevealStep((step) => step + 1)}
              className="bg-ink-950 focus-visible:ring-brand-500 inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:ring-2 focus-visible:outline-none dark:bg-white dark:text-slate-950"
            >
              Show more recommendations
            </button>
          </div>
        ) : null}

        <p className="text-ink-400 dark:text-ink-500 mt-10 text-xs leading-relaxed">
          Cover art and posters are used here at thumbnail size to identify each title alongside
          original commentary — book covers via the Internet Archive&apos;s Open Library, film and
          series art via Wikipedia — and remain the property of their respective publishers and
          studios.
        </p>
      </Container>
    </section>
  );
}
