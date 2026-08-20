import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { bhagavadGitaEntries } from "@/features/spirituality/data/bhagavad-gita";
import { chandogyaUpanishadEntries } from "@/features/spirituality/data/chandogya-upanishad";
import { lalitaSahasranamaEntries } from "@/features/spirituality/data/lalita-sahasranama";
import { ramcharitmanasEntries } from "@/features/spirituality/data/ramcharitmanas";
import { shivaTandavaStotramEntries } from "@/features/spirituality/data/shiva-tandava-stotram";
import { vishnuSahasranamaEntries } from "@/features/spirituality/data/vishnu-sahasranama";
import type { ReaderEntry, ScriptureSlug, WordGloss } from "@/features/spirituality/types";

function decodeHtml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&nbsp;", " ")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function alignHanumanWords(
  originalLine: string,
  rawWords: WordGloss[],
  sequence: number
): WordGloss[] {
  const sourceWords = originalLine
    .replace(/[।॥,;:!?]+/gu, " ")
    .trim()
    .split(/\s+/);
  let words = rawWords;

  if (sequence === 1) {
    const [honorific, teacher, ...remainingWords] = rawWords;
    words = [
      {
        transliteration: `${honorific.transliteration} · ${teacher.transliteration}`,
        meaning: `${honorific.meaning}; ${teacher.meaning}`,
      },
      ...remainingWords,
    ];
  }

  const spans = words.map((word) => {
    const preferredReading = word.transliteration.split(" / ")[0].trim();
    return preferredReading.split(/\s+/).length;
  });

  if (sequence === 1) spans[0] = 1;
  if (sequence === 85) spans[1] = 2;
  if (sequence === 86) spans[spans.length - 1] = 2;

  let sourceCursor = 0;
  const alignedWords = words.map((word, index) => {
    const span = spans[index];
    const source = sourceWords.slice(sourceCursor, sourceCursor + span).join(" ");
    sourceCursor += span;

    return {
      ...word,
      original: sequence === 1 && index === 0 ? "श्री + गुरु" : source,
    };
  });

  if (sourceCursor !== sourceWords.length || alignedWords.some((word) => !word.original)) {
    throw new Error(`Unable to align the Hanuman Chalisa source words on line ${sequence}.`);
  }

  return alignedWords;
}

async function loadHanumanChalisaEntries(): Promise<ReaderEntry[]> {
  const sourcePath = path.join(process.cwd(), "public", "spirituality", "hanuman-chalisa.html");
  const source = await readFile(sourcePath, "utf8");
  const tokens =
    source.match(
      /<h2 class="section-heading">[\s\S]*?<\/h2>|<div class="verse-number">[\s\S]*?<\/div>|<div class="doha-line">[\s\S]*?<\/div>|<div class="word-row">[\s\S]*?<\/div>|<div class="literal">[\s\S]*?<\/div>/g
    ) ?? [];

  const entries: ReaderEntry[] = [];
  let section = "Opening doha";
  let verseNumber: number | null = null;
  let currentOriginal = "";
  let currentWords: WordGloss[] = [];
  let sectionLine = 0;

  for (const token of tokens) {
    if (token.startsWith('<h2 class="section-heading">')) {
      const heading = decodeHtml(token);
      if (heading === "Opening Doha") section = "Opening dohās";
      if (heading === "Forty Verses") section = "Forty caupāīs";
      if (heading === "Closing Doha") section = "Closing dohā";
      sectionLine = 0;
      continue;
    }

    if (token.startsWith('<div class="verse-number">')) {
      verseNumber = Number.parseInt(decodeHtml(token), 10);
      sectionLine = 0;
      continue;
    }

    if (token.startsWith('<div class="doha-line">')) {
      currentOriginal = decodeHtml(token);
      currentWords = [];
      continue;
    }

    if (token.startsWith('<div class="word-row">')) {
      const match = token.match(/<strong>([\s\S]*?)<\/strong>\s*-\s*([\s\S]*?)<\/div>/);
      if (match) {
        currentWords.push({
          transliteration: decodeHtml(match[1]),
          meaning: decodeHtml(match[2]),
        });
      }
      continue;
    }

    if (token.startsWith('<div class="literal">') && currentOriginal) {
      sectionLine += 1;
      const rawMeaning = decodeHtml(token)
        .replace(/^Literal:\s*/i, "")
        .replace(/^["“]/, "")
        .replace(/["”]$/, "");
      const sequence = entries.length + 1;
      const alignedWords = alignHanumanWords(currentOriginal, currentWords, sequence);
      const lineWithinVerse =
        section === "Forty caupāīs" ? ((sectionLine - 1) % 2) + 1 : sectionLine;
      const label =
        section === "Forty caupāīs" && verseNumber
          ? `Caupāī ${verseNumber} · line ${lineWithinVerse}`
          : `${section.replace(/s$/, "")} · line ${sectionLine}`;

      entries.push({
        id: `hanuman-${sequence}`,
        sequence,
        section,
        label,
        original: currentOriginal,
        transliteration: alignedWords.map((word) => word.transliteration).join(" · "),
        meaning: rawMeaning,
        words: alignedWords,
      });
      currentOriginal = "";
      currentWords = [];
    }
  }

  return entries;
}

function validateEntries(
  slug: ScriptureSlug,
  entries: ReaderEntry[],
  expectedCount: number
): ReaderEntry[] {
  const ids = new Set(entries.map((entry) => entry.id));
  const hasIncompleteEntry = entries.some(
    (entry, index) =>
      !entry.original ||
      !entry.transliteration ||
      !entry.meaning ||
      entry.sequence !== index + 1 ||
      entry.words.length === 0 ||
      entry.words.some(
        (word) => !word.original || !word.transliteration.trim() || !word.meaning.trim()
      )
  );

  if (entries.length !== expectedCount || ids.size !== entries.length || hasIncompleteEntry) {
    throw new Error(
      `The ${slug} study data failed validation: expected ${expectedCount} complete, uniquely identified entries.`
    );
  }

  return entries;
}

export async function loadScriptureEntries(slug: ScriptureSlug): Promise<ReaderEntry[]> {
  switch (slug) {
    case "hanuman-chalisa":
      return validateEntries(slug, await loadHanumanChalisaEntries(), 86);
    case "vishnu-sahasranama":
      return validateEntries(slug, vishnuSahasranamaEntries, 1000);
    case "lalita-sahasranama":
      return validateEntries(slug, lalitaSahasranamaEntries, 1000);
    case "shiva-tandava-stotram":
      return validateEntries(slug, shivaTandavaStotramEntries, 17);
    case "bhagavad-gita":
      return validateEntries(slug, bhagavadGitaEntries, 701);
    case "ramcharitmanas":
      return validateEntries(slug, ramcharitmanasEntries, 369);
    case "chandogya-upanishad":
      return validateEntries(slug, chandogyaUpanishadEntries, 10);
  }
}

const ALL_SECTIONS = "All sections";
const DEFAULT_PAGE_SIZE = 12;
const SAHASRANAMA_PAGE_SIZE = 50;

function hasDistinctStudyRows(entry: ReaderEntry) {
  if (entry.words.length !== 1) return entry.words.length > 0;

  const [word] = entry.words;
  return (
    (word.original ?? "") !== entry.original ||
    word.transliteration.trim() !== entry.transliteration.trim() ||
    word.meaning.trim() !== entry.meaning.trim()
  );
}

export type ScriptureReaderBootstrap = {
  initialEntries: ReaderEntry[];
  initialResultTotal: number;
  initialSection: string;
  pageSize: number;
  sections: string[];
  supportsStudyLayer: boolean;
  totalEntries: number;
};

export function createScriptureReaderBootstrap(
  slug: ScriptureSlug,
  entries: ReaderEntry[]
): ScriptureReaderBootstrap {
  const sections = Array.from(new Set(entries.map((entry) => entry.section)));
  const isSahasranama = slug === "vishnu-sahasranama" || slug === "lalita-sahasranama";
  const initialSection = isSahasranama ? (sections[0] ?? ALL_SECTIONS) : ALL_SECTIONS;
  const pageSize = isSahasranama ? SAHASRANAMA_PAGE_SIZE : DEFAULT_PAGE_SIZE;
  const initialPool =
    initialSection === ALL_SECTIONS
      ? entries
      : entries.filter((entry) => entry.section === initialSection);

  return {
    initialEntries: initialPool.slice(0, pageSize),
    initialResultTotal: initialPool.length,
    initialSection,
    pageSize,
    sections,
    supportsStudyLayer: entries.some(hasDistinctStudyRows),
    totalEntries: entries.length,
  };
}

export type ScriptureEntryQuery = {
  entryId?: string;
  limit?: number;
  query?: string;
  section?: string;
  sequence?: number;
};

export type ScriptureEntryQueryResult = {
  entries: ReaderEntry[];
  focusId?: string;
  total: number;
};

export async function queryScriptureEntries(
  slug: ScriptureSlug,
  {
    entryId,
    limit = DEFAULT_PAGE_SIZE,
    query = "",
    section = ALL_SECTIONS,
    sequence,
  }: ScriptureEntryQuery
): Promise<ScriptureEntryQueryResult> {
  const entries = await loadScriptureEntries(slug);
  const requestedEntry = entryId
    ? entries.find((entry) => entry.id === entryId)
    : Number.isInteger(sequence)
      ? entries.find((entry) => entry.sequence === sequence)
      : undefined;

  if (entryId || Number.isInteger(sequence)) {
    return requestedEntry
      ? { entries: [requestedEntry], focusId: requestedEntry.id, total: 1 }
      : { entries: [], total: 0 };
  }

  const normalizedQuery = query.trim().toLocaleLowerCase().slice(0, 120);
  const safeLimit = Math.min(Math.max(Math.trunc(limit), 1), 100);
  const filteredEntries = entries.filter((entry) => {
    if (section !== ALL_SECTIONS && entry.section !== section) return false;
    if (!normalizedQuery) return true;

    return [
      entry.original,
      entry.transliteration,
      entry.meaning,
      entry.label,
      ...entry.words.flatMap((word) => [word.original ?? "", word.transliteration, word.meaning]),
    ].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));
  });

  return {
    entries: filteredEntries.slice(0, safeLimit),
    total: filteredEntries.length,
  };
}
