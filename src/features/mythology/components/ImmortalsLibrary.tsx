"use client";

import { useEffect, useMemo, useState } from "react";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import {
  immortalityFamilies,
  immortalityProfiles,
  immortalitySourceMap,
} from "@/features/mythology/data/immortalityTraditions";
import type {
  ImmortalityEvidenceLevel,
  ImmortalityProfile,
  ImmortalitySource,
  ImmortalityTerm,
  ImmortalityTraditionFamily,
} from "@/features/mythology/types";

type FamilyFilter = "all" | ImmortalityTraditionFamily;

const evidenceStyles: Record<ImmortalityEvidenceLevel, string> = {
  "historically-attested": "border-emerald-600/30 text-emerald-800 dark:text-emerald-300",
  "tradition-led": "border-amber-600/30 text-amber-800 dark:text-amber-300",
  "source-limited": "border-rose-600/30 text-rose-800 dark:text-rose-300",
  "historical-legend": "border-violet-600/30 text-violet-800 dark:text-violet-300",
};

function getProfileSources(profile: ImmortalityProfile): ImmortalitySource[] {
  return profile.sourceIds
    .map((sourceId) => immortalitySourceMap.get(sourceId))
    .filter((source): source is ImmortalitySource => Boolean(source));
}

function getTransliterationLanguage(term: ImmortalityTerm): string {
  if (term.lang === "zh-Hant") return "zh-Latn-pinyin";
  if (term.lang.endsWith("-Latn") || term.lang === "en") return term.lang;

  return `${term.lang.split("-")[0]}-Latn`;
}

function ProfileEntry({ profile, visible }: { profile: ImmortalityProfile; visible: boolean }) {
  const sources = getProfileSources(profile);

  return (
    <li hidden={!visible} data-immortal-profile={profile.slug}>
      <details
        id={profile.slug}
        className="group glass-card scroll-mt-28 overflow-hidden"
      >
        <summary className="focus-visible:ring-brand-500 flex min-h-24 cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 focus-visible:ring-2 focus-visible:outline-none sm:px-7 sm:py-6">
          <span className="flex min-w-0 gap-4 sm:gap-5">
            <span
              className="text-brand-700 dark:text-brand-300 pt-1 font-mono text-xs"
              aria-hidden="true"
            >
              {profile.index}
            </span>
            <span className="min-w-0">
              <span
                role="heading"
                aria-level={3}
                className="block font-serif text-xl font-semibold sm:text-2xl"
              >
                {profile.name}
              </span>
              {profile.originalNames ? (
                <span className="text-ink-600 dark:text-ink-300 mt-1 block text-base leading-relaxed text-balance">
                  {profile.originalNames.map((nativeName, index) => (
                    <span key={`${profile.slug}-${nativeName.lang}`}>
                      {index > 0 ? <span aria-hidden="true"> · </span> : null}
                      <span lang={nativeName.lang} className={nativeName.scriptClass}>
                        {nativeName.text}
                      </span>
                    </span>
                  ))}
                </span>
              ) : profile.originalName ? (
                <span
                  lang={profile.originalNameLang}
                  className={`mt-1 block text-base leading-relaxed text-balance text-ink-600 dark:text-ink-300 ${profile.originalNameClass ?? ""}`}
                >
                  {profile.originalName}
                </span>
              ) : null}
              <span className="text-ink-600 dark:text-ink-300 mt-2 block text-sm leading-relaxed">
                {profile.proposition}
              </span>
              <span
                className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${evidenceStyles[profile.evidenceLevel]}`}
              >
                {profile.evidenceLabel}
              </span>
            </span>
          </span>
          <span
            className="border-ink-200 dark:border-ink-700 text-brand-700 dark:text-brand-300 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xl leading-none group-open:hidden"
            aria-hidden="true"
          >
            +
          </span>
          <span
            className="border-ink-200 dark:border-ink-700 text-brand-700 dark:text-brand-300 mt-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xl leading-none group-open:flex"
            aria-hidden="true"
          >
            −
          </span>
        </summary>

        <div className="border-ink-200/80 dark:border-ink-700 border-t px-5 pt-6 pb-7 sm:px-7 sm:pt-7">
          <dl className="grid gap-4 sm:grid-cols-3">
            {[
              ["Period", profile.period],
              ["Place", profile.place],
              ["Tradition", profile.tradition],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="eyebrow">{label}</dt>
                <dd className="mt-2 text-sm font-semibold leading-relaxed">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <section aria-labelledby={`${profile.slug}-record`} className="bg-ink-50 dark:bg-ink-900/45 rounded-2xl p-5">
              <p className="text-emerald-700 dark:text-emerald-300 font-mono text-xs font-semibold tracking-wide uppercase">
                Sources establish
              </p>
              <h4 id={`${profile.slug}-record`} className="mt-2 font-serif text-xl font-semibold">
                Historical record
              </h4>
              <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                {profile.historicalRecord}
              </p>
            </section>

            <section aria-labelledby={`${profile.slug}-tradition`} className="bg-ink-50 dark:bg-ink-900/45 rounded-2xl p-5">
              <p className="text-amber-700 dark:text-amber-300 font-mono text-xs font-semibold tracking-wide uppercase">
                Tradition records
              </p>
              <h4 id={`${profile.slug}-tradition`} className="mt-2 font-serif text-xl font-semibold">
                Sacred account
              </h4>
              <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                {profile.traditionAccount}
              </p>
            </section>

            <section aria-labelledby={`${profile.slug}-boundary`} className="bg-ink-900 rounded-2xl p-5 text-white dark:bg-black/35">
              <p className="font-mono text-xs font-semibold tracking-wide text-rose-200 uppercase">
                Independent evidence does not establish
              </p>
              <h4 id={`${profile.slug}-boundary`} className="mt-2 font-serif text-xl font-semibold">
                Evidence boundary
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {profile.evidenceBoundary}
              </p>
            </section>
          </div>

          <section aria-labelledby={`${profile.slug}-language`} className="mt-8">
            <p className="eyebrow">Language ledger</p>
            <h4 id={`${profile.slug}-language`} className="mt-2 font-serif text-2xl font-semibold">
              Terms in their own linguistic setting
            </h4>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {profile.terms.map((term) => (
                <div
                  key={`${profile.slug}-${term.original}`}
                  className="border-ink-200/80 dark:border-ink-700 rounded-2xl border p-4"
                >
                  <dt>
                    <span
                      lang={term.lang}
                      className={`block text-xl leading-relaxed font-semibold ${term.scriptClass ?? ""}`}
                    >
                      {term.original}
                    </span>
                    <span
                      lang={getTransliterationLanguage(term)}
                      className="text-brand-700 dark:text-brand-300 mt-1 block text-sm font-semibold"
                    >
                      {term.transliteration}
                    </span>
                  </dt>
                  <dd className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                    {term.meaning}
                    <span className="text-ink-400 ml-1">· {term.language}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby={`${profile.slug}-sources`} className="mt-8">
            <p className="eyebrow">Trace the record</p>
            <h4 id={`${profile.slug}-sources`} className="mt-2 font-serif text-2xl font-semibold">
              Sources used for this profile
            </h4>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {sources.map((source) => (
                <li key={source.id}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-ink-200/80 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 flex h-full items-start justify-between gap-4 rounded-2xl border p-4 transition"
                  >
                    <span>
                      <span className="text-brand-700 dark:text-brand-300 font-mono text-xs font-semibold tracking-wide uppercase">
                        {source.kind}
                      </span>
                      <span className="mt-2 block text-sm font-semibold">{source.title}</span>
                      <span className="text-ink-500 dark:text-ink-400 mt-1 block text-xs leading-relaxed">
                        {source.citation}
                      </span>
                    </span>
                    <ArrowRightIcon className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </details>
    </li>
  );
}

export function ImmortalsLibrary() {
  const [family, setFamily] = useState<FamilyFilter>("all");
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleProfiles = useMemo(
    () =>
      immortalityProfiles.filter((profile) => {
        const matchesFamily = family === "all" || profile.family === family;
        const searchable = [
          profile.name,
          profile.alternateNames,
          profile.originalName,
          ...(profile.originalNames?.map((nativeName) => nativeName.text) ?? []),
          profile.place,
          profile.tradition,
          profile.proposition,
          ...profile.terms.flatMap((term) => [term.original, term.transliteration, term.meaning]),
        ]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase();

        return matchesFamily && (!normalizedQuery || searchable.includes(normalizedQuery));
      }),
    [family, normalizedQuery],
  );

  const visibleSlugs = new Set(visibleProfiles.map((profile) => profile.slug));

  useEffect(() => {
    const openHashTarget = () => {
      let slug = "";
      try {
        slug = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (!slug) return;

      const target = document.getElementById(slug);
      if (!(target instanceof HTMLDetailsElement)) return;

      setFamily("all");
      setQuery("");
      target.open = true;
      window.requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    };

    openHashTarget();
    window.addEventListener("hashchange", openHashTarget);
    return () => window.removeEventListener("hashchange", openHashTarget);
  }, []);

  return (
    <div data-immortals-library>
      <div className="glass-card p-5 sm:p-6">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:items-end">
          <div className="min-w-0">
            <label htmlFor="immortals-search" className="block text-sm font-semibold">
              Search names, places, traditions, or terms
            </label>
            <input
              id="immortals-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try Vallalar, Tibet, kāyakalpa…"
              className="border-ink-300 bg-white text-ink-900 placeholder:text-ink-400 focus:border-brand-500 dark:border-ink-700 dark:bg-ink-900 dark:text-white mt-2 min-h-12 w-full rounded-xl border px-4 py-3 outline-none"
            />
          </div>

          <div>
            <p id="tradition-filter-label" className="text-sm font-semibold">
              Filter by tradition family
            </p>
            <div
              role="group"
              aria-labelledby="tradition-filter-label"
              className="mt-2 flex flex-wrap gap-2"
            >
              {immortalityFamilies.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={family === option.id}
                  onClick={() => setFamily(option.id)}
                  className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    family === option.id
                      ? "border-ink-900 bg-ink-900 text-white dark:border-brand-500 dark:bg-brand-600"
                      : "border-ink-300 hover:border-brand-500 dark:border-ink-700 dark:hover:border-brand-400"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm" role="status" aria-live="polite">
          Showing <strong>{visibleProfiles.length}</strong> of {immortalityProfiles.length} profiles.
        </p>
      </div>

      {visibleProfiles.length === 0 ? (
        <div className="border-ink-200 dark:border-ink-700 mt-5 rounded-2xl border border-dashed p-8 text-center">
          <p className="font-serif text-2xl font-semibold">No profile matches that search.</p>
          <button
            type="button"
            onClick={() => {
              setFamily("all");
              setQuery("");
            }}
            className="btn-ghost mt-4"
          >
            Reset the atlas
          </button>
        </div>
      ) : null}

      <ol className="mt-5 space-y-3">
        {immortalityProfiles.map((profile) => (
          <ProfileEntry key={profile.slug} profile={profile} visible={visibleSlugs.has(profile.slug)} />
        ))}
      </ol>
    </div>
  );
}
