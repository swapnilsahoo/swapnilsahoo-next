import { readFile } from "node:fs/promises";
import path from "node:path";

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
      entry.words.some((word) => !word.original)
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
      return validateEntries(slug, vishnuSahasranamaEntries, 36);
    case "lalita-sahasranama":
      return validateEntries(slug, lalitaSahasranamaEntries, 12);
    case "shiva-tandava-stotram":
      return validateEntries(slug, shivaTandavaStotramEntries, 17);
  }
}
