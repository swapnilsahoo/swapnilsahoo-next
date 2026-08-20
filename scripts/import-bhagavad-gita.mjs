import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const API = "https://sa.wikisource.org/w/api.php";
const OUTPUT_DIR = path.join(process.cwd(), "content", "scriptures", "bhagavad-gita");
const MANIFEST_FILE = path.join(OUTPUT_DIR, "manifest.v1.json");
const EXPECTED_700 = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 34, 27, 20, 24, 28, 78];
const EXPECTED_701 = EXPECTED_700.map((count, index) => count + (index === 12 ? 1 : 0));
const mode = process.argv.includes("--check") ? "check" : "write";

const chapters = [
  ["अर्जुनविषादयोगः", "Arjuna's Despondency"],
  ["साङ्ख्ययोगः", "The Yoga of Knowledge"],
  ["कर्मयोगः", "The Yoga of Action"],
  ["ज्ञानकर्मसंन्यासयोगः", "The Yoga of Knowledge and Renunciation of Action"],
  ["कर्मसंन्यासयोगः", "The Yoga of Renunciation of Action"],
  ["आत्मसंयमयोगः", "The Yoga of Meditation"],
  ["ज्ञानविज्ञानयोगः", "The Yoga of Knowledge and Realization"],
  ["अक्षरब्रह्मयोगः", "The Yoga of the Imperishable Brahman"],
  ["राजविद्याराजगुह्ययोगः", "The Yoga of Sovereign Knowledge and Sovereign Secret"],
  ["विभूतियोगः", "The Yoga of Divine Glories"],
  ["विश्वरूपदर्शनयोगः", "The Vision of the Universal Form"],
  ["भक्तियोगः", "The Yoga of Devotion"],
  ["क्षेत्रक्षेत्रज्ञविभागयोगः", "The Yoga of the Field and Its Knower"],
  ["गुणत्रयविभागयोगः", "The Yoga of the Division of the Three Gunas"],
  ["पुरुषोत्तमयोगः", "The Yoga of the Supreme Person"],
  ["दैवासुरसंपद्विभागयोगः", "The Yoga of the Division between the Divine and the Demonic"],
  ["श्रद्धात्रयविभागयोगः", "The Yoga of the Threefold Faith"],
  ["मोक्षसंन्यासयोगः", "The Yoga of Liberation through Renunciation"],
].map(([page, english], index) => ({
  chapter: index + 1,
  page: `भगवद्गीता/${page}`,
  english,
}));

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

function parseChapter(content, chapter) {
  const poemBlocks = [...content.matchAll(/<poem>([\s\S]*?)<\/poem>/gi)].map((match) => match[1]);
  const entries = [];

  for (const block of poemBlocks) {
    const marker = block.match(/॥\s*([०-९0-9]+)\s*[-–—.]\s*([०-९0-9]+)\s*॥/u);
    if (!marker) continue;

    const markerChapter = devanagariNumber(marker[1]);
    const sourceVerse = devanagariNumber(marker[2]);
    if (markerChapter !== chapter) continue;

    const prefix = cleanWikiText(block.slice(0, marker.index));
    const lines = prefix
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => line !== "ॐ" && line !== "श्रीपरमात्मने नमः")
      .filter((line) => !line.includes("अध्याय"))
      .filter((line) => !line.includes("भगवद्गीता"));
    const speakerIndex = lines.findIndex((line) => /वाच\s*$/u.test(line));
    const speaker = speakerIndex >= 0 ? lines.splice(speakerIndex, 1)[0] : undefined;
    const original = lines.join("\n").normalize("NFC");

    if (!original || !/[\u0900-\u097f]/u.test(original)) {
      throw new Error(`Chapter ${chapter}.${sourceVerse} has no valid Devanagari source text.`);
    }
    entries.push({ sourceVerse, original, ...(speaker ? { speaker } : {}) });
  }

  entries.sort((left, right) => left.sourceVerse - right.sourceVerse);
  const expected = EXPECTED_700[chapter - 1];
  if (
    entries.length !== expected ||
    entries.some((entry, index) => entry.sourceVerse !== index + 1)
  ) {
    throw new Error(
      `Chapter ${chapter} parsed ${entries.length} verses; expected ${expected} contiguous verses.`
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

  for (const chapter of chapters) {
    const revision = revisions[chapter.chapter - 1];
    const parsed = parseChapter(revision.content, chapter.chapter);
    const displayEntries = [];

    if (chapter.chapter === 13) {
      displayEntries.push({
        sourceVerse: null,
        original:
          "प्रकृतिं पुरुषं चैव क्षेत्रं क्षेत्रज्ञमेव च ।\nएतद्वेदितुमिच्छामि ज्ञानं ज्ञेयं च केशव",
        speaker: "अर्जुन उवाच",
        variantSource:
          "Attested 701-verse opening variant; absent from the Wikisource 700-verse Śaṅkara-aligned chapter.",
      });
    }
    displayEntries.push(...parsed);

    const entries = displayEntries.map((entry, index) => {
      const verse = index + 1;
      globalSequence += 1;
      return {
        id: `gita-${chapter.chapter}-${verse}`,
        sequence: globalSequence,
        chapter: chapter.chapter,
        verse,
        sourceVerse: entry.sourceVerse,
        section: `Chapter ${String(chapter.chapter).padStart(2, "0")} · ${chapter.english}`,
        label: `${chapter.chapter}.${verse}`,
        original: entry.original,
        ...(entry.speaker ? { speaker: entry.speaker } : {}),
        ...(entry.variantSource ? { variantSource: entry.variantSource } : {}),
      };
    });

    if (entries.length !== EXPECTED_701[chapter.chapter - 1]) {
      throw new Error(`Chapter ${chapter.chapter} has an invalid display count.`);
    }

    const payload = {
      schemaVersion: 1,
      corpusVersion: "1.0.0",
      work: "Śrīmadbhagavadgītā",
      chapter: {
        number: chapter.chapter,
        titleEnglish: chapter.english,
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
      sourceVerses: parsed.length,
      displayVerses: entries.length,
      file,
      generatedSha256: sha256(serialized),
    });
  }

  if (globalSequence !== 701) throw new Error(`Generated ${globalSequence} verses instead of 701.`);

  const manifest = {
    schemaVersion: 1,
    corpusVersion: "1.0.0",
    work: {
      titleDevanagari: "श्रीमद्भगवद्गीता",
      titleLatin: "Śrīmadbhagavadgītā",
      representation: "Selected 701-verse presentation",
    },
    scope: {
      completeSourceText: true,
      chapterCount: 18,
      verseCount: 701,
      chapterCounts: EXPECTED_701,
      studyLayersIncluded: false,
    },
    source: {
      project: "Sanskrit Wikisource",
      index: "https://sa.wikisource.org/wiki/भगवद्गीता",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      adaptationLicense: "CC BY-SA 4.0",
      attribution:
        "Sanskrit source chapters are adapted from Sanskrit Wikisource at the exact revisions recorded below.",
      chapters: sourceChapters,
    },
    variant: {
      location: "13.1",
      description:
        "The selected presentation adds Arjuna's question before the 34-verse Wikisource Chapter 13. The source chapter follows the 700-verse Śaṅkara-aligned numbering; the addition yields 701 verses and shifts its Chapter 13 verses by one.",
      comparison:
        "https://www.gitasupersite.iitk.ac.in/srimad?choose=1&ecsiva=1&etassa=1&etgb=1&etsiva=1&field_chapter_value=13&field_nsutra_value=1&language=dv&setgb=1",
    },
    transformations: [
      "Extract only the metrical text and separately tagged speaker rubric from each numbered Wikisource poem block.",
      "Remove MediaWiki markup, invocation boilerplate, verse-number markers, and chapter headings.",
      "Normalize source strings to Unicode NFC; preserve pāda line breaks.",
      "Add the explicitly documented 13.1 variant and renumber the source chapter's 34 verses as 13.2–13.35.",
    ],
    limitations: [
      "This is a reproducible reading text, not a critical edition or manuscript collation.",
      "Completeness applies to the selected Sanskrit source layer only. Translation, grammar, pronunciation, commentary, and audio are separate review layers.",
      "The 13.1 addition is an attested textual variant and is not present in the pinned Sanskrit Wikisource Chapter 13 revision.",
    ],
  };
  const manifestSerialized = `${JSON.stringify(manifest, null, 2)}\n`;

  if (mode === "write") {
    await mkdir(OUTPUT_DIR, { recursive: true });
    await Promise.all(
      generated.map(({ file, serialized }) =>
        writeFile(path.join(OUTPUT_DIR, file), serialized, "utf8")
      )
    );
    await writeFile(MANIFEST_FILE, manifestSerialized, "utf8");
    console.log(`Wrote 701 Gita verses in ${generated.length} pinned chapter shards.`);
    return;
  }

  for (const { file, serialized } of generated) {
    const existing = await readFile(path.join(OUTPUT_DIR, file), "utf8");
    if (existing !== serialized) throw new Error(`${file} does not reproduce byte for byte.`);
  }
  const existingManifestText = await readFile(MANIFEST_FILE, "utf8");
  if (existingManifestText !== manifestSerialized) {
    throw new Error("The Gita manifest does not reproduce byte for byte.");
  }
  console.log("Verified 701 Gita verses and all pinned source revisions byte for byte.");
}

await run();
