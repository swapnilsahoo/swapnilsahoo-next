import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import Sanscript from "@indic-transliteration/sanscript";

import { chandogyaUpanishadEntries } from "@/features/spirituality/data/chandogya-upanishad";
import { lalitaSahasranamaEntries } from "@/features/spirituality/data/lalita-sahasranama";
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

const RAMCHARITMANAS_DIR = path.join(process.cwd(), "content", "scriptures", "ramcharitmanas");
const RAMCHARITMANAS_SHARDS = [
  "01-bala-kanda.v1.json",
  "02-ayodhya-kanda.v1.json",
  "03-aranya-kanda.v1.json",
  "04-kishkindha-kanda.v1.json",
  "05-sundara-kanda.v1.json",
  "06-lanka-kanda.v1.json",
  "07-uttara-kanda.v1.json",
] as const;
const RAMCHARITMANAS_NUMBERED_UNITS = 1_074;
const RAMCHARITMANAS_OPENING_UNITS = 39;
const RAMCHARITMANAS_TOTAL_UNITS = RAMCHARITMANAS_NUMBERED_UNITS + RAMCHARITMANAS_OPENING_UNITS;

type RamcharitmanasShard = {
  kanda: {
    order: number;
    slug: string;
    nameLatin: string;
  };
  entries: Array<{
    id: string;
    label: string;
    original: string;
    sourceIndex: number;
    sourceLocatorLabel: string;
  }>;
};

type RamcharitmanasOpening = {
  id: string;
  kanda: string;
  kandaOrder: number;
  label: string;
  language: "Awadhi" | "Sanskrit";
  original: string;
  scanPage: number | string;
  scanUrl: string;
  sourceIndex: number;
  transcriptionStatus: string;
};

function romanizeDevanagari(original: string) {
  return Sanscript.t(original, "devanagari", "iast").normalize("NFC");
}

const BHAGAVAD_GITA_DIR = path.join(process.cwd(), "content", "scriptures", "bhagavad-gita");
const BHAGAVAD_GITA_SHARDS = Array.from(
  { length: 18 },
  (_, index) => `${String(index + 1).padStart(2, "0")}-chapter.v1.json`
);
const BHAGAVAD_GITA_CHAPTER_COUNTS = [
  47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78,
];

type BhagavadGitaShard = {
  chapter: { number: number };
  source: { url: string };
  entries: Array<{
    id: string;
    sequence: number;
    section: string;
    label: string;
    original: string;
    sourceVerse: number | null;
    speaker?: string;
    variantSource?: string;
  }>;
};

let bhagavadGitaEntriesPromise: Promise<ReaderEntry[]> | undefined;

async function loadBhagavadGitaEntries(): Promise<ReaderEntry[]> {
  bhagavadGitaEntriesPromise ??= (async () => {
    const shards = (await Promise.all(
      BHAGAVAD_GITA_SHARDS.map(async (file) =>
        JSON.parse(await readFile(path.join(BHAGAVAD_GITA_DIR, file), "utf8"))
      )
    )) as BhagavadGitaShard[];
    const entries = shards.flatMap((shard) =>
      shard.entries.map<ReaderEntry>((entry) => ({
        id: entry.id,
        sequence: entry.sequence,
        section: entry.section,
        label: entry.label,
        original: entry.original,
        transliteration: romanizeDevanagari(entry.original),
        meaning: undefined,
        words: [],
        language: "sa",
        speaker: entry.speaker,
        note: entry.variantSource
          ? `${entry.variantSource} Translation and grammatical annotation are not published without independent human review.`
          : "Sanskrit source text from the pinned Wikisource witness. Translation and grammatical annotation are not published without independent human review.",
        sourceRef: entry.variantSource
          ? "Gita Supersite witness comparison for the additional 13.1 reading"
          : `${shard.source.url} · source verse ${entry.sourceVerse}`,
        textStatus: "source-verified",
        translationStatus: "not-published",
      }))
    );
    const validChapterCounts = shards.every(
      (shard, index) =>
        shard.chapter.number === index + 1 &&
        shard.entries.length === BHAGAVAD_GITA_CHAPTER_COUNTS[index]
    );
    const ids = new Set(entries.map((entry) => entry.id));
    const validEntries = entries.every(
      (entry, index) =>
        entry.sequence === index + 1 &&
        entry.original.normalize("NFC") === entry.original &&
        entry.transliteration.length > 0
    );

    if (
      entries.length !== 701 ||
      ids.size !== entries.length ||
      !validChapterCounts ||
      !validEntries
    ) {
      throw new Error("The Bhagavad Gita source corpus failed its completeness checks.");
    }
    return entries;
  })();

  return bhagavadGitaEntriesPromise;
}

const SRIMAD_BHAGAVATAM_DIR = path.join(process.cwd(), "content", "scriptures", "srimad-bhagavatam");
const SRIMAD_BHAGAVATAM_SHARDS = Array.from(
  { length: 19 },
  (_, index) => `${String(index + 1).padStart(2, "0")}-chapter.v1.json`
);
const SRIMAD_BHAGAVATAM_CHAPTER_COUNTS = [
  23, 34, 43, 33, 40, 39, 57, 52, 49, 36, 39, 36, 59, 44, 50, 38, 45, 50, 40,
];

type SrimadBhagavatamShard = {
  chapter: { number: number };
  source: { url: string };
  entries: Array<{
    id: string;
    sequence: number;
    section: string;
    label: string;
    original: string;
    verse: number;
    sourceIndex: number;
    meter?: string;
  }>;
};

let srimadBhagavatamEntriesPromise: Promise<ReaderEntry[]> | undefined;

async function loadSrimadBhagavatamEntries(): Promise<ReaderEntry[]> {
  srimadBhagavatamEntriesPromise ??= (async () => {
    const shards = (await Promise.all(
      SRIMAD_BHAGAVATAM_SHARDS.map(async (file) =>
        JSON.parse(await readFile(path.join(SRIMAD_BHAGAVATAM_DIR, file), "utf8"))
      )
    )) as SrimadBhagavatamShard[];
    const entries = shards.flatMap((shard) =>
      shard.entries.map<ReaderEntry>((entry) => ({
        id: entry.id,
        sequence: entry.sequence,
        section: entry.section,
        label: entry.label,
        original: entry.original,
        transliteration: romanizeDevanagari(entry.original),
        meaning: undefined,
        words: [],
        language: "sa",
        note: entry.meter
          ? `Meter: ${entry.meter}. Sanskrit source text from the pinned Wikisource witness (Skandha 1 only). Translation and grammatical annotation are not published without independent human review.`
          : "Sanskrit source text from the pinned Wikisource witness (Skandha 1 only). Translation and grammatical annotation are not published without independent human review.",
        sourceRef: `${shard.source.url} · source verse ${entry.verse}`,
        textStatus: "source-verified",
        translationStatus: "not-published",
      }))
    );
    const validChapterCounts = shards.every(
      (shard, index) =>
        shard.chapter.number === index + 1 &&
        shard.entries.length === SRIMAD_BHAGAVATAM_CHAPTER_COUNTS[index]
    );
    const ids = new Set(entries.map((entry) => entry.id));
    const validEntries = entries.every(
      (entry, index) =>
        entry.sequence === index + 1 &&
        entry.original.normalize("NFC") === entry.original &&
        entry.transliteration.length > 0
    );
    const expectedTotal = SRIMAD_BHAGAVATAM_CHAPTER_COUNTS.reduce((sum, count) => sum + count, 0);

    if (
      entries.length !== expectedTotal ||
      ids.size !== entries.length ||
      !validChapterCounts ||
      !validEntries
    ) {
      throw new Error("The Śrīmad Bhāgavatam source corpus failed its completeness checks.");
    }
    return entries;
  })();

  return srimadBhagavatamEntriesPromise;
}

let ramcharitmanasEntriesPromise: Promise<ReaderEntry[]> | undefined;

async function loadRamcharitmanasEntries(): Promise<ReaderEntry[]> {
  ramcharitmanasEntriesPromise ??= (async () => {
    const [openingSource, ...shardSources] = await Promise.all([
      readFile(path.join(RAMCHARITMANAS_DIR, "opening-invocations.v1.json"), "utf8"),
      ...RAMCHARITMANAS_SHARDS.map((file) => readFile(path.join(RAMCHARITMANAS_DIR, file), "utf8")),
    ]);
    const openings = (JSON.parse(openingSource) as { entries: RamcharitmanasOpening[] }).entries;
    const shards = shardSources.map((source) => JSON.parse(source) as RamcharitmanasShard);
    const entries: ReaderEntry[] = [];

    for (const shard of shards) {
      const section = shard.kanda.nameLatin;
      const kandaOpenings = openings
        .filter((entry) => entry.kandaOrder === shard.kanda.order)
        .sort((left, right) => left.sourceIndex - right.sourceIndex);

      for (const opening of kandaOpenings) {
        entries.push({
          id: opening.id,
          sequence: entries.length + 1,
          section,
          label: opening.label,
          original: opening.original,
          transliteration: romanizeDevanagari(opening.original),
          meaning: undefined,
          words: [],
          language: opening.language === "Sanskrit" ? "sa" : "awa",
          note: "Opening invocation transcribed diplomatically from the public-domain 1925 Belvedere Press edition. Edition-specific readings are preserved rather than silently harmonized; translation and grammatical annotation are withheld until independent human review.",
          sourceRef: `${opening.scanUrl} · scan page ${opening.scanPage}`,
          textStatus: opening.transcriptionStatus.startsWith("verified")
            ? "source-verified"
            : "scan-check-pending",
          translationStatus: "not-published",
        });
      }

      for (const sourceEntry of shard.entries) {
        entries.push({
          id: sourceEntry.id,
          sequence: entries.length + 1,
          section,
          label: sourceEntry.label.replace(" · unit ", " · numbered unit "),
          original: sourceEntry.original,
          transliteration: romanizeDevanagari(sourceEntry.original),
          meaning: undefined,
          words: [],
          language: "awa",
          note: "Numbered source unit from the commit-pinned seven-kāṇḍa transcription. Translation and grammatical annotation are withheld until independent human review.",
          sourceRef: sourceEntry.sourceLocatorLabel,
          textStatus: "source-verified",
          translationStatus: "not-published",
        });
      }
    }

    const openingCounts = new Map<number, number>();
    for (const opening of openings) {
      openingCounts.set(opening.kandaOrder, (openingCounts.get(opening.kandaOrder) ?? 0) + 1);
    }
    const expectedOpeningCounts = [12, 4, 3, 4, 3, 6, 7];
    const validOpeningTopology = expectedOpeningCounts.every(
      (count, index) => openingCounts.get(index + 1) === count
    );
    const ids = new Set(entries.map((entry) => entry.id));
    const validEntries = entries.every(
      (entry, index) =>
        entry.sequence === index + 1 &&
        entry.original.normalize("NFC") === entry.original &&
        entry.transliteration.length > 0
    );

    if (
      openings.length !== RAMCHARITMANAS_OPENING_UNITS ||
      shards.reduce((sum, shard) => sum + shard.entries.length, 0) !==
        RAMCHARITMANAS_NUMBERED_UNITS ||
      entries.length !== RAMCHARITMANAS_TOTAL_UNITS ||
      ids.size !== entries.length ||
      !validOpeningTopology ||
      !validEntries
    ) {
      throw new Error("The Ramcharitmanas source corpus failed its completeness checks.");
    }

    return entries;
  })();

  return ramcharitmanasEntriesPromise;
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
      return loadBhagavadGitaEntries();
    case "ramcharitmanas":
      return loadRamcharitmanasEntries();
    case "chandogya-upanishad":
      return validateEntries(slug, chandogyaUpanishadEntries, 10);
    case "srimad-bhagavatam":
      return loadSrimadBhagavatamEntries();
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
    word.meaning.trim() !== (entry.meaning?.trim() ?? "")
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

export async function loadScriptureReaderBootstrap(
  slug: ScriptureSlug
): Promise<ScriptureReaderBootstrap> {
  return createScriptureReaderBootstrap(slug, await loadScriptureEntries(slug));
}

export type ScriptureEntryQuery = {
  entryId?: string;
  limit?: number;
  offset?: number;
  query?: string;
  section?: string;
  sequence?: number;
};

export type ScriptureEntryQueryResult = {
  entries: ReaderEntry[];
  focusId?: string;
  nextOffset?: number;
  total: number;
};

export async function queryScriptureEntries(
  slug: ScriptureSlug,
  {
    entryId,
    limit = DEFAULT_PAGE_SIZE,
    offset = 0,
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
  const safeOffset = Math.max(Math.trunc(offset), 0);
  const filteredEntries = entries.filter((entry) => {
    if (section !== ALL_SECTIONS && entry.section !== section) return false;
    if (!normalizedQuery) return true;

    return [
      entry.original,
      entry.transliteration,
      entry.meaning ?? "",
      entry.label,
      entry.sourceRef ?? "",
      ...entry.words.flatMap((word) => [word.original ?? "", word.transliteration, word.meaning]),
    ].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));
  });

  return {
    entries: filteredEntries.slice(safeOffset, safeOffset + safeLimit),
    nextOffset:
      safeOffset + safeLimit < filteredEntries.length ? safeOffset + safeLimit : undefined,
    total: filteredEntries.length,
  };
}
