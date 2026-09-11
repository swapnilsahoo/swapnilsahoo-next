import "server-only";

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import Sanscript from "@indic-transliteration/sanscript";

import { chandogyaUpanishadEntries } from "@/features/spirituality/data/chandogya-upanishad";
import { lalitaSahasranamaEntries } from "@/features/spirituality/data/lalita-sahasranama";
import { shivaTandavaStotramEntries } from "@/features/spirituality/data/shiva-tandava-stotram";
import { vishnuSahasranamaEntries } from "@/features/spirituality/data/vishnu-sahasranama";
import type {
  ReaderEntry,
  ScriptureSlug,
  StudyAttribution,
  WordGloss,
} from "@/features/spirituality/types";

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
const RAMCHARITMANAS_WORD_STUDY_DIR = path.join(RAMCHARITMANAS_DIR, "word-study");
const RAMCHARITMANAS_VISUAL_RETELLING_MANIFEST = path.join(
  RAMCHARITMANAS_DIR,
  "comics",
  "manifest.v1.json"
);
const RAMCHARITMANAS_METER_HEADINGS = new Set(["चौपाई", "दोहा/सोरठा", "छंद", "श्लोक"]);

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
    sourceTextCorrection?: {
      status: "verified-against-1925-facsimile";
      scope: string;
      upstreamEntryTextSha256: string;
      correctedEntryTextSha256: string;
      witness: {
        edition: string;
        printedPages: number[];
        scanUrls: string[];
      };
      variantNote: string;
    };
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

type RamcharitmanasStudyWord =
  | [original: string, meaning: string]
  | {
      original: string;
      meaning: string;
      language?: "awa" | "sa";
      lemma?: string;
      grammar?: string;
      confidence?: "high" | "medium" | "low";
      alternatives?: string[];
      sourceRef?: string;
      reviewStatus?: "editorial-under-review" | "source-compared";
    };

type RamcharitmanasStudyEntry = {
  entryId: string;
  sequence: number;
  meaning: string;
  sourceRef?: string;
  sourceUrl?: string;
  note?: string;
  lines: Array<{
    line: number;
    words: RamcharitmanasStudyWord[];
  }>;
};

type RamcharitmanasStudyShard = {
  schemaVersion: "ramcharitmanas-word-study-shard-v1";
  kanda: { order: number; slug: string };
  entries: RamcharitmanasStudyEntry[];
};

type RamcharitmanasStudyManifest = {
  schemaVersion: "ramcharitmanas-word-study-manifest-v1";
  work: "Ramcharitmanas";
  language: "en";
  editorialStatus: "editorial-under-review";
  label: string;
  sourceRef: string;
  sourceUrl?: string;
  note?: string;
  coverage: {
    totalEntries: number;
    annotatedEntries: number;
    complete: boolean;
  };
  shards: Array<{
    file: string;
    kandaOrder: number;
    firstSequence: number;
    lastSequence: number;
    entryCount: number;
    sourceTextSha256: string;
    generatedSha256: string;
  }>;
};

type RamcharitmanasVisualRetellingManifest = {
  schemaVersion: "ramcharitmanas-visual-retelling-manifest-v1";
  work: "Ramcharitmanas";
  declaredGranularity: "reader-unit";
  coverage: {
    totalReaderEntries: number;
    illustratedEntries: number;
    complete: boolean;
  };
  entries: Array<{
    entryId: string;
    src: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
    sourceTextSha256: string;
    assetSha256: string;
    provenance: "ai-assisted";
    reviewStatus: "editorial-under-review" | "human-reviewed";
  }>;
};

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function ramcharitmanasSourceLines(original: string) {
  return original
    .split(/\r?\n/u)
    .map((line) => line.replaceAll("\u00a0", " ").trim())
    .filter((line) => line && !RAMCHARITMANAS_METER_HEADINGS.has(line));
}

function ramcharitmanasSourceTokens(line: string) {
  const withoutVerseNumber = line.replace(/\p{N}+(?:\s*\([^)]*\))?/gu, "");
  return withoutVerseNumber.match(/[\p{L}\p{M}\p{Cf}]+/gu) ?? [];
}

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

const SRIMAD_BHAGAVATAM_DIR = path.join(
  process.cwd(),
  "content",
  "scriptures",
  "srimad-bhagavatam"
);
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

function studyWordParts(word: RamcharitmanasStudyWord) {
  return Array.isArray(word) ? { original: word[0], meaning: word[1] } : { ...word };
}

function assertStudyText(value: unknown, label: string): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0 || value !== value.normalize("NFC")) {
    throw new Error(`Invalid Ramcharitmanas word-study text: ${label}.`);
  }
}

async function applyRamcharitmanasWordStudy(entries: ReaderEntry[]) {
  const manifestSource = await readFile(
    path.join(RAMCHARITMANAS_WORD_STUDY_DIR, "manifest.v1.json"),
    "utf8"
  );
  const manifest = JSON.parse(manifestSource) as RamcharitmanasStudyManifest;

  if (
    manifest.schemaVersion !== "ramcharitmanas-word-study-manifest-v1" ||
    manifest.work !== "Ramcharitmanas" ||
    manifest.language !== "en" ||
    manifest.editorialStatus !== "editorial-under-review" ||
    manifest.coverage.totalEntries !== entries.length ||
    !Array.isArray(manifest.shards)
  ) {
    throw new Error("The Ramcharitmanas word-study manifest is invalid.");
  }

  assertStudyText(manifest.label, "manifest label");
  assertStudyText(manifest.sourceRef, "manifest source reference");
  if (manifest.note) assertStudyText(manifest.note, "manifest note");

  const entriesById = new Map(entries.map((entry, index) => [entry.id, { entry, index }] as const));
  const annotatedIds = new Set<string>();
  const wordStudyRoot = path.resolve(RAMCHARITMANAS_WORD_STUDY_DIR);
  let previousLastSequence = 0;

  for (const shardInfo of manifest.shards) {
    if (
      shardInfo.firstSequence <= previousLastSequence ||
      shardInfo.lastSequence < shardInfo.firstSequence ||
      shardInfo.entryCount !== shardInfo.lastSequence - shardInfo.firstSequence + 1
    ) {
      throw new Error(`Invalid Ramcharitmanas word-study range: ${shardInfo.file}.`);
    }
    previousLastSequence = shardInfo.lastSequence;

    const shardPath = path.resolve(wordStudyRoot, shardInfo.file);
    if (!shardPath.startsWith(`${wordStudyRoot}${path.sep}`)) {
      throw new Error(`Unsafe Ramcharitmanas word-study path: ${shardInfo.file}.`);
    }
    const shardSource = await readFile(shardPath, "utf8");
    if (sha256(shardSource) !== shardInfo.generatedSha256) {
      throw new Error(`Ramcharitmanas word-study hash mismatch: ${shardInfo.file}.`);
    }
    const shard = JSON.parse(shardSource) as RamcharitmanasStudyShard;
    if (
      shard.schemaVersion !== "ramcharitmanas-word-study-shard-v1" ||
      shard.kanda.order !== shardInfo.kandaOrder ||
      shard.entries.length !== shardInfo.entryCount ||
      shard.entries[0]?.sequence !== shardInfo.firstSequence ||
      shard.entries.at(-1)?.sequence !== shardInfo.lastSequence
    ) {
      throw new Error(`Ramcharitmanas word-study metadata mismatch: ${shardInfo.file}.`);
    }

    const sourceStrings: string[] = [];
    for (const [entryIndex, studyEntry] of shard.entries.entries()) {
      const sourceRecord = entriesById.get(studyEntry.entryId);
      if (
        !sourceRecord ||
        annotatedIds.has(studyEntry.entryId) ||
        studyEntry.sequence !== shardInfo.firstSequence + entryIndex ||
        studyEntry.sequence !== sourceRecord.entry.sequence ||
        ![
          `ramcharitmanas-${shard.kanda.slug}-`,
          `ramcharitmanas-opening-${shard.kanda.slug}-`,
        ].some((prefix) => studyEntry.entryId.startsWith(prefix))
      ) {
        throw new Error(
          `Unknown, duplicate, or misordered Ramcharitmanas study entry: ${studyEntry.entryId}.`
        );
      }

      assertStudyText(studyEntry.meaning, `${studyEntry.entryId} close rendering`);
      if (studyEntry.note) assertStudyText(studyEntry.note, `${studyEntry.entryId} note`);
      if (studyEntry.sourceRef) {
        assertStudyText(studyEntry.sourceRef, `${studyEntry.entryId} source reference`);
      }

      const expectedLines = ramcharitmanasSourceLines(sourceRecord.entry.original);
      if (studyEntry.lines.length !== expectedLines.length) {
        throw new Error(`Ramcharitmanas study line mismatch: ${studyEntry.entryId}.`);
      }

      const words: WordGloss[] = [];
      for (const [lineIndex, studyLine] of studyEntry.lines.entries()) {
        const expectedTokens = ramcharitmanasSourceTokens(expectedLines[lineIndex]);
        if (studyLine.line !== lineIndex + 1 || studyLine.words.length !== expectedTokens.length) {
          throw new Error(`Ramcharitmanas study token count mismatch: ${studyEntry.entryId}.`);
        }

        for (const [wordIndex, rawWord] of studyLine.words.entries()) {
          const word = studyWordParts(rawWord);
          assertStudyText(
            word.original,
            `${studyEntry.entryId} line ${studyLine.line} token ${wordIndex + 1}`
          );
          assertStudyText(
            word.meaning,
            `${studyEntry.entryId} line ${studyLine.line} gloss ${wordIndex + 1}`
          );
          if (word.original !== expectedTokens[wordIndex]) {
            throw new Error(
              `Ramcharitmanas study token boundary mismatch: ${studyEntry.entryId}, line ${studyLine.line}, token ${wordIndex + 1}.`
            );
          }

          words.push({
            original: word.original,
            transliteration: romanizeDevanagari(word.original),
            meaning: word.meaning,
            line: studyLine.line,
            ...(Array.isArray(rawWord)
              ? {}
              : {
                  language: rawWord.language,
                  lemma: rawWord.lemma,
                  grammar: rawWord.grammar,
                  confidence: rawWord.confidence,
                  alternatives: rawWord.alternatives,
                  sourceRef: rawWord.sourceRef,
                  reviewStatus: rawWord.reviewStatus,
                }),
          });
        }
      }

      sourceStrings.push(sourceRecord.entry.original);
      annotatedIds.add(studyEntry.entryId);
      const attribution: StudyAttribution = {
        label: manifest.label,
        sourceRef: studyEntry.sourceRef
          ? `${manifest.sourceRef} · ${studyEntry.sourceRef}`
          : manifest.sourceRef,
        sourceUrl: studyEntry.sourceUrl ?? manifest.sourceUrl,
        note: [manifest.note, studyEntry.note].filter(Boolean).join(" ") || undefined,
        status: manifest.editorialStatus,
      };
      entries[sourceRecord.index] = {
        ...sourceRecord.entry,
        meaning: studyEntry.meaning,
        words,
        translationStatus: "editorial-under-review",
        studyAttribution: attribution,
      };
    }

    if (sha256(sourceStrings.join("\n␞\n")) !== shardInfo.sourceTextSha256) {
      throw new Error(`Ramcharitmanas source binding mismatch: ${shardInfo.file}.`);
    }
  }

  if (
    annotatedIds.size !== manifest.coverage.annotatedEntries ||
    manifest.coverage.complete !== (annotatedIds.size === entries.length) ||
    (manifest.coverage.complete && annotatedIds.size !== entriesById.size)
  ) {
    throw new Error("The Ramcharitmanas word-study coverage declaration is inaccurate.");
  }

  return entries;
}

async function applyRamcharitmanasVisualRetellings(entries: ReaderEntry[]) {
  const manifest = JSON.parse(
    await readFile(RAMCHARITMANAS_VISUAL_RETELLING_MANIFEST, "utf8")
  ) as RamcharitmanasVisualRetellingManifest;

  if (
    manifest.schemaVersion !== "ramcharitmanas-visual-retelling-manifest-v1" ||
    manifest.work !== "Ramcharitmanas" ||
    manifest.declaredGranularity !== "reader-unit" ||
    manifest.coverage.totalReaderEntries !== entries.length ||
    manifest.coverage.illustratedEntries !== manifest.entries.length ||
    manifest.coverage.complete !== (manifest.entries.length === entries.length)
  ) {
    throw new Error("The Ramcharitmanas visual-retelling manifest is invalid.");
  }

  const entriesById = new Map(entries.map((entry, index) => [entry.id, { entry, index }] as const));
  const illustratedIds = new Set<string>();

  for (const artwork of manifest.entries) {
    const sourceRecord = entriesById.get(artwork.entryId);
    if (
      !sourceRecord ||
      illustratedIds.has(artwork.entryId) ||
      !artwork.src.startsWith("/images/spirituality/ramcharitmanas/comics/") ||
      artwork.width <= 0 ||
      artwork.height <= 0 ||
      !artwork.alt.trim() ||
      !artwork.caption.trim() ||
      artwork.provenance !== "ai-assisted" ||
      !["editorial-under-review", "human-reviewed"].includes(artwork.reviewStatus) ||
      sha256(sourceRecord.entry.original) !== artwork.sourceTextSha256
    ) {
      throw new Error(`Invalid Ramcharitmanas visual retelling: ${artwork.entryId}.`);
    }

    illustratedIds.add(artwork.entryId);
    entries[sourceRecord.index] = {
      ...sourceRecord.entry,
      visualRetelling: {
        src: artwork.src,
        width: artwork.width,
        height: artwork.height,
        alt: artwork.alt,
        caption: artwork.caption,
        provenance: artwork.provenance,
        reviewStatus: artwork.reviewStatus,
      },
    };
  }

  return entries;
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
          note: "Opening invocation transcribed diplomatically from the public-domain 1925 Belvedere Press edition. Edition-specific readings are preserved rather than silently harmonized. The close English rendering and token glosses are an independently prepared editorial layer whose review status is disclosed separately.",
          sourceRef: `${opening.scanUrl} · scan page ${opening.scanPage}`,
          textStatus: opening.transcriptionStatus.startsWith("verified")
            ? "source-verified"
            : "scan-check-pending",
          translationStatus: "not-published",
        });
      }

      for (const sourceEntry of shard.entries) {
        const correction = sourceEntry.sourceTextCorrection;
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
          note: correction
            ? `Numbered source unit from the commit-pinned seven-kāṇḍa transcription. Its ${correction.scope.toLowerCase()} were corrected against ${correction.witness.edition}, printed pages ${correction.witness.printedPages.join("–")}; the upstream and corrected entry hashes remain recorded. ${correction.variantNote} The close English rendering and token glosses are an independently prepared editorial layer whose review status is disclosed separately.`
            : "Numbered source unit from the commit-pinned seven-kāṇḍa transcription. The close English rendering and token glosses are an independently prepared editorial layer whose review status is disclosed separately.",
          sourceRef: correction
            ? `${sourceEntry.sourceLocatorLabel} · ${correction.witness.edition}, printed pages ${correction.witness.printedPages.join("–")}`
            : sourceEntry.sourceLocatorLabel,
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

    const studiedEntries = await applyRamcharitmanasWordStudy(entries);
    return applyRamcharitmanasVisualRetellings(studiedEntries);
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
