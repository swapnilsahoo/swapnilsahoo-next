import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const API = "https://sa.wikisource.org/w/api.php";
const OUTPUT_DIR = path.join(process.cwd(), "content", "scriptures", "srimad-bhagavatam");
const MANIFEST_FILE = path.join(OUTPUT_DIR, "manifest.v1.json");
const ROOT_PAGE = "श्रीमद्भागवतपुराणम्/स्कन्धः १";
const CHAPTER_COUNT = 19;
// Derived empirically from the pinned revisions on first --write run; --check then
// reproduces these byte for byte, exactly like the Gita and Ramcharitmanas importers.
const EXPECTED_COUNTS = [
  23, 34, 43, 33, 40, 39, 57, 52, 49, 36, 39, 36, 59, 44, 50, 38, 45, 50, 40,
];
const mode = process.argv.includes("--check")
  ? "check"
  : process.argv.includes("--discover")
    ? "discover"
    : "write";

const chapters = Array.from({ length: CHAPTER_COUNT }, (_, index) => ({
  chapter: index + 1,
  page: `${ROOT_PAGE}/अध्यायः ${toDevanagariNumeral(index + 1)}`,
}));

function toDevanagariNumeral(value) {
  return String(value).replace(/[0-9]/g, (digit) => "०१२३४५६७८९"[Number(digit)]);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function devanagariNumber(value) {
  return Number.parseInt(
    value.replace(/[०-९]/g, (digit) => String("०१२३४५६७८९".indexOf(digit))),
    10
  );
}

function cleanWikiText(value) {
  return value
    .replace(/<ref\b[^>]*>[\s\S]*?<\/ref>/gi, "")
    .replace(/<ref\b[^>]*\/>/gi, "")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/'''?/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\{\{[^{}]*\}\}/g, "")
    .replace(/[ \t]+$/gm, "")
    .trim();
}

/** Segment a chapter's <poem> block into verse-text chunks, splitting at every
 * trailing "। N ॥" / "॥ N ॥" marker (both dandas are attested at the join). */
function segmentVerses(poemText) {
  const markerRe = /[।॥]\s*([०-९]+)\s*॥/g;
  const segments = [];
  let cursor = 0;
  let match;
  while ((match = markerRe.exec(poemText))) {
    segments.push({
      text: poemText.slice(cursor, match.index),
      markerNumber: devanagariNumber(match[1]),
    });
    cursor = markerRe.lastIndex;
  }
  return segments;
}

function parseChapter(content, chapter) {
  const poemMatch = content.match(/<poem>([\s\S]*?)<\/poem>/i);
  if (!poemMatch) throw new Error(`Chapter ${chapter} has no <poem> block.`);
  const segments = segmentVerses(poemMatch[1]);

  const entries = [];
  for (const segment of segments) {
    const cleaned = cleanWikiText(segment.text);
    let lines = cleaned
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    // A chapter colophon ("इति श्रीमद्भागवते ... प्रथमोऽध्यायः ॥ N ॥") restates the
    // chapter number, not a verse number -- it is not part of the verse sequence.
    if (lines.some((line) => line.startsWith("इति श्री"))) continue;

    let meter;
    const meterLineIndex = lines.findIndex((line) => /^\([^()]+\)$/u.test(line));
    if (meterLineIndex >= 0) {
      meter = lines[meterLineIndex].replace(/^\(|\)$/g, "").trim();
      lines = lines.filter((_, index) => index !== meterLineIndex);
    }

    const original = lines.join("\n").normalize("NFC");
    if (!original || !/[ऀ-ॿ]/u.test(original)) {
      throw new Error(`Chapter ${chapter} has a segment with no valid Devanagari source text.`);
    }
    entries.push({
      sourceIndex: entries.length + 1,
      sourceVerse: segment.markerNumber,
      original,
      ...(meter ? { meter } : {}),
    });
  }

  const expected = EXPECTED_COUNTS[chapter - 1];
  // Source verse numbers are preserved exactly as printed, in the source's own reading
  // order (never re-sorted). They are not always contiguous or unique: this edition's
  // Chapter 3 has no verses numbered 11 or 32 (evidently merged into a neighbour at some
  // point in its transmission), and Chapter 13 prints two consecutive, textually distinct
  // verses both numbered 40. sourceIndex -- each verse's 1-based position within the
  // chapter -- is the stable, always-unique key; sourceVerse is kept as transparent,
  // unaltered citation metadata rather than silently renumbered or deduplicated away.
  if (
    mode !== "discover" &&
    entries.some((entry, index) => index > 0 && entry.sourceVerse < entries[index - 1].sourceVerse)
  ) {
    throw new Error(`Chapter ${chapter} verse numbers move backwards somewhere.`);
  }
  if (mode !== "discover" && expected !== undefined && entries.length !== expected) {
    throw new Error(
      `Chapter ${chapter} parsed ${entries.length} verses; expected ${expected}.`
    );
  }

  return entries;
}

async function fetchRevision(title, revid) {
  const url = new URL(API);
  url.search = new URLSearchParams({
    action: "query",
    prop: "revisions",
    ...(revid ? { revids: String(revid) } : { titles: title, redirects: "1" }),
    rvprop: "ids|timestamp|sha1|content",
    rvslots: "main",
    format: "json",
    formatversion: "2",
  });
  const response = await fetch(url, {
    headers: {
      "User-Agent": "swapnilsahoo-scripture-import/1.0 (https://www.swapnilsahoo.com)",
    },
  });
  if (!response.ok) throw new Error(`Wikisource returned ${response.status} for ${title}.`);
  const payload = await response.json();
  const page = payload.query?.pages?.[0];
  const revision = page?.revisions?.[0];
  if (!page || !revision?.slots?.main?.content) {
    throw new Error(`No source revision was returned for ${title}.`);
  }
  return {
    title: page.title,
    pageid: page.pageid,
    revid: revision.revid,
    parentid: revision.parentid,
    timestamp: revision.timestamp,
    sha1: revision.sha1,
    content: revision.slots.main.content,
  };
}

async function run() {
  const existingManifest =
    mode === "check" ? JSON.parse(await readFile(MANIFEST_FILE, "utf8")) : undefined;
  const revisions = [];
  for (const chapter of chapters) {
    const pinned = existingManifest?.source?.chapters?.find(
      (item) => item.chapter === chapter.chapter
    );
    revisions.push(await fetchRevision(chapter.page, pinned?.revid));
  }

  let globalSequence = 0;
  const generated = [];
  const sourceChapters = [];
  const actualCounts = [];

  for (const chapter of chapters) {
    const revision = revisions[chapter.chapter - 1];
    const parsed = parseChapter(revision.content, chapter.chapter);
    actualCounts.push(parsed.length);

    const entries = parsed.map((entry) => {
      globalSequence += 1;
      return {
        id: `bhagavatam-1-${chapter.chapter}-${entry.sourceIndex}`,
        sequence: globalSequence,
        chapter: chapter.chapter,
        sourceIndex: entry.sourceIndex,
        verse: entry.sourceVerse,
        section: `Skandha 1, Chapter ${String(chapter.chapter).padStart(2, "0")}`,
        label: `1.${chapter.chapter}.${entry.sourceVerse}`,
        original: entry.original,
        ...(entry.meter ? { meter: entry.meter } : {}),
      };
    });

    const payload = {
      schemaVersion: 1,
      corpusVersion: "1.0.0",
      work: "Śrīmadbhāgavatapurāṇam · Skandha 1",
      chapter: {
        number: chapter.chapter,
        sourcePage: revision.title,
      },
      source: {
        project: "Sanskrit Wikisource",
        pageid: revision.pageid,
        revid: revision.revid,
        parentid: revision.parentid,
        timestamp: revision.timestamp,
        sha1: revision.sha1,
        url: `https://sa.wikisource.org/w/index.php?title=${encodeURIComponent(revision.title)}&oldid=${revision.revid}`,
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      },
      entries,
    };
    const serialized = `${JSON.stringify(payload, null, 2)}\n`;
    const file = `${String(chapter.chapter).padStart(2, "0")}-chapter.v1.json`;
    generated.push({ file, serialized, count: entries.length, sha256: sha256(serialized) });
    sourceChapters.push({
      chapter: chapter.chapter,
      title: revision.title,
      revid: revision.revid,
      parentid: revision.parentid,
      timestamp: revision.timestamp,
      sha1: revision.sha1,
      rawSha256: sha256(revision.content),
      verseCount: entries.length,
      file,
      generatedSha256: sha256(serialized),
    });
  }

  const manifest = {
    schemaVersion: 1,
    corpusVersion: "1.0.0",
    work: {
      titleDevanagari: "श्रीमद्भागवतपुराणम्",
      titleLatin: "Śrīmadbhāgavatapurāṇam",
      representation: "Skandha 1 (of 12) · complete pinned Sanskrit source text",
    },
    scope: {
      completeSourceText: true,
      skandha: 1,
      skandhaCount: 12,
      chapterCount: CHAPTER_COUNT,
      verseCount: globalSequence,
      chapterCounts: actualCounts,
      studyLayersIncluded: false,
    },
    source: {
      project: "Sanskrit Wikisource",
      index: "https://sa.wikisource.org/wiki/श्रीमद्भागवतपुराणम्",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      adaptationLicense: "CC BY-SA 4.0",
      attribution:
        "Sanskrit source chapters are adapted from Sanskrit Wikisource at the exact revisions recorded below.",
      chapters: sourceChapters,
    },
    transformations: [
      "Extract only the metrical text from each numbered <poem> block in Skandha 1's nineteen chapter pages.",
      "Remove MediaWiki markup, verse-number markers, and the closing chapter colophon (\"iti śrīmadbhāgavate ... adhyāyaḥ\"), which restates the chapter number rather than a verse.",
      "Capture a bracketed meter label (e.g. Druta-vilambita, Anuṣṭubh) as separate metadata when a segment opens with one, instead of leaving it embedded in the verse text.",
      "Normalize source strings to Unicode NFC; preserve pāda line breaks.",
    ],
    limitations: [
      "This corpus is Skandha 1 of the Bhāgavata Purāṇa's twelve skandhas only. It is a complete, reproducible reading text for that skandha, not the whole Purāṇa.",
      "This is a reproducible reading text, not a critical edition or manuscript collation.",
      "Completeness applies to the selected Sanskrit source layer only. Translation, grammar, pronunciation, commentary, and audio are separate review layers and are not bundled here.",
    ],
  };
  const manifestSerialized = `${JSON.stringify(manifest, null, 2)}\n`;

  if (mode === "discover") {
    console.log(`Parsed ${globalSequence} verses across ${chapters.length} chapters.`);
    console.log(`EXPECTED_COUNTS = [${actualCounts.join(", ")}];`);
    return;
  }

  if (mode === "write") {
    await mkdir(OUTPUT_DIR, { recursive: true });
    await Promise.all(
      generated.map(({ file, serialized }) =>
        writeFile(path.join(OUTPUT_DIR, file), serialized, "utf8")
      )
    );
    await writeFile(MANIFEST_FILE, manifestSerialized, "utf8");
    console.log(
      `Wrote ${globalSequence} Bhagavatam Skandha-1 verses in ${generated.length} pinned chapter shards.`
    );
    console.log(`Chapter counts: ${actualCounts.join(", ")}`);
    return;
  }

  for (const { file, serialized } of generated) {
    const existing = await readFile(path.join(OUTPUT_DIR, file), "utf8");
    if (existing !== serialized) throw new Error(`${file} does not reproduce byte for byte.`);
  }
  const existingManifestText = await readFile(MANIFEST_FILE, "utf8");
  if (existingManifestText !== manifestSerialized) {
    throw new Error("The Bhagavatam Skandha-1 manifest does not reproduce byte for byte.");
  }
  console.log(
    `Verified ${globalSequence} Bhagavatam Skandha-1 verses and all pinned source revisions byte for byte.`
  );
}

await run();
