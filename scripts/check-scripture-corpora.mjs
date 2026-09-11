import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "content", "scriptures");
const BROKEN_TEXT = /\uFFFD|à¤|à¥|â€|Â|■■|ssssssss/u;
const MANAS_METER_HEADINGS = new Set(["चौपाई", "दोहा/सोरठा", "छंद", "श्लोक"]);

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function readJson(file) {
  const text = await readFile(file, "utf8");
  return { text, value: JSON.parse(text) };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertText(value, label) {
  assert(typeof value === "string" && value.length > 0, `${label} is empty.`);
  assert(value === value.normalize("NFC"), `${label} is not Unicode NFC.`);
  assert(!BROKEN_TEXT.test(value), `${label} contains broken encoding text.`);
}

function manasSourceLines(original) {
  return original
    .split(/\r?\n/u)
    .map((line) => line.replaceAll("\u00a0", " ").trim())
    .filter((line) => line && !MANAS_METER_HEADINGS.has(line));
}

function manasSourceTokens(line) {
  return line.replace(/\p{N}+(?:\s*\([^)]*\))?/gu, "").match(/[\p{L}\p{M}\p{Cf}]+/gu) ?? [];
}

function manasStudyWord(word) {
  return Array.isArray(word) ? { original: word[0], meaning: word[1] } : word;
}

async function checkBhagavadGita() {
  const dir = path.join(ROOT, "bhagavad-gita");
  const { value: manifest } = await readJson(path.join(dir, "manifest.v1.json"));
  const entries = [];

  for (const chapter of manifest.source.chapters) {
    const { text, value: shard } = await readJson(path.join(dir, chapter.file));
    assert(sha256(text) === chapter.generatedSha256, `${chapter.file} hash mismatch.`);
    assert(shard.chapter.number === chapter.chapter, `${chapter.file} chapter mismatch.`);
    assert(
      shard.entries.length === manifest.scope.chapterCounts[chapter.chapter - 1],
      `${chapter.file} verse-count mismatch.`
    );
    entries.push(...shard.entries);
  }

  assert(entries.length === 701, `Gita has ${entries.length} entries instead of 701.`);
  assert(new Set(entries.map((entry) => entry.id)).size === 701, "Gita IDs are not unique.");
  for (const [index, entry] of entries.entries()) {
    assert(entry.sequence === index + 1, `Gita sequence breaks at ${entry.id}.`);
    assertText(entry.original, entry.id);
    assert(!entry.original.includes("अध्याय"), `${entry.id} contains a chapter heading.`);
    assert(!/वाच\s*$/mu.test(entry.original), `${entry.id} embeds a speaker rubric.`);
    if (entry.speaker) assert(/वाच\s*$/u.test(entry.speaker), `${entry.id} has a bad speaker.`);
  }

  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  assert(byId.get("gita-13-1")?.sourceVerse === null, "Gita 13.1 variant is not explicit.");
  assert(byId.get("gita-13-2")?.sourceVerse === 1, "Gita 13.2 source mapping is wrong.");
  assert(byId.get("gita-13-35")?.sourceVerse === 34, "Gita 13.35 source mapping is wrong.");
  assert(byId.get("gita-18-78")?.sequence === 701, "Gita final sequence is wrong.");
}

async function checkRamcharitmanas() {
  const dir = path.join(ROOT, "ramcharitmanas");
  const { value: manifest } = await readJson(path.join(dir, "manifest.v1.json"));
  const entries = [];
  const sourceShards = [];

  for (const shardInfo of manifest.validation.generatedShards) {
    const { text, value: shard } = await readJson(path.join(dir, shardInfo.file));
    assert(sha256(text) === shardInfo.generatedSha256, `${shardInfo.file} hash mismatch.`);
    assert(shard.entries.length === shardInfo.units, `${shardInfo.file} unit-count mismatch.`);
    sourceShards.push(shard);
    entries.push(...shard.entries);
  }

  assert(entries.length === 1_074, `Manas has ${entries.length} numbered units.`);
  assert(
    new Set(entries.map((entry) => entry.id)).size === entries.length,
    "Manas numbered-unit IDs are not unique."
  );
  for (const [index, entry] of entries.entries()) {
    assert(entry.sequence === index + 1, `Manas sequence breaks at ${entry.id}.`);
    assertText(entry.original, entry.id);
  }

  const interventionRecords = manifest.editorialInterventions?.entries;
  assert(
    manifest.editorialInterventions?.policy &&
      Array.isArray(interventionRecords) &&
      interventionRecords.length === 1,
    "Manas source-text intervention register is missing or unexpected."
  );
  const finalSourceEntry = entries.find((entry) => entry.id === "ramcharitmanas-uttara-kanda-0130");
  const finalCorrection = finalSourceEntry?.sourceTextCorrection;
  const registeredCorrection = interventionRecords[0];
  assert(finalSourceEntry?.sourceIndex === 130, "Manas final source index is wrong.");
  assert(
    finalSourceEntry?.sourceVerseNumber === "7.13",
    "Manas final upstream locator lexeme was not preserved."
  );
  assert(
    registeredCorrection.entryId === finalSourceEntry.id &&
      finalCorrection?.status === "verified-against-1925-facsimile" &&
      finalCorrection.upstreamEntryTextSha256 ===
        "5dce1b5b18b74104333940e3bc6d3ccbdc709758771cd5e156076fecb8ee8388" &&
      finalCorrection.correctedEntryTextSha256 === sha256(finalSourceEntry.original) &&
      registeredCorrection.correctedEntryTextSha256 === finalCorrection.correctedEntryTextSha256 &&
      finalCorrection.witness?.edition.includes("Belvedere Press") &&
      finalCorrection.witness?.printedPages?.join(",") === "1143,1144" &&
      finalCorrection.witness?.scanUrls?.length === 2,
    "Manas final Sanskrit correction provenance is invalid."
  );
  assert(
    finalSourceEntry.original.includes("श्रीमद्रामपदाब्जभक्तिमनिशं प्राप्तुं तु रामायणम्॥") &&
      finalSourceEntry.original.includes("श्रीमद्रामचरित्रमानसमिदं भक्त्यावगाहन्ति ये") &&
      finalSourceEntry.original.endsWith(
        "इति श्रीरामचरितमानसे सकलकलिकलुषविध्वंसने अविरलहरिभक्तिसम्पादनो नाम सप्तमः सोपानः समाप्तः।"
      ) &&
      !finalSourceEntry.original.includes("श्रॆमद्राम") &&
      !finalSourceEntry.original.includes("सन्सारपतनगघोरकिरनैर्दह्यन्ति"),
    "Manas final Sanskrit text does not match the declared facsimile correction."
  );

  const { value: openings } = await readJson(path.join(dir, "opening-invocations.v1.json"));
  const expectedByKanda = [12, 4, 3, 4, 3, 6, 7];
  assert(openings.entries.length === 39, `Manas has ${openings.entries.length} opening units.`);
  assert(
    openings.editorialPolicy?.transcriptionMode === "diplomatic-source-text",
    "Manas opening transcription policy is not explicit."
  );
  assert(
    openings.sourceWitness?.publicDomainRecord,
    "Manas opening supplement has no public-domain witness record."
  );
  assert(
    new Set(openings.entries.map((entry) => entry.id)).size === 39,
    "Manas opening IDs are not unique."
  );
  for (const [index, expected] of expectedByKanda.entries()) {
    const actual = openings.entries.filter((entry) => entry.kandaOrder === index + 1).length;
    assert(actual === expected, `Manas kāṇḍa ${index + 1} has ${actual} opening units.`);
  }
  for (const entry of openings.entries) {
    assertText(entry.original, entry.id);
    assert(entry.scanPage, `${entry.id} has no scan page.`);
    assert(entry.scanUrl, `${entry.id} has no scan URL.`);
    assert(
      entry.transcriptionStatus === "verified-against-1925-facsimile",
      `${entry.id} has not passed the declared facsimile check.`
    );
  }

  const readerById = new Map();
  let readerSequence = 0;
  for (const sourceShard of sourceShards) {
    const kandaOpenings = openings.entries
      .filter((entry) => entry.kandaOrder === sourceShard.kanda.order)
      .sort((left, right) => left.sourceIndex - right.sourceIndex);
    for (const entry of [...kandaOpenings, ...sourceShard.entries]) {
      readerSequence += 1;
      readerById.set(entry.id, {
        original: entry.original,
        sequence: readerSequence,
        kandaOrder: sourceShard.kanda.order,
        kandaSlug: sourceShard.kanda.slug,
      });
    }
  }
  assert(readerById.size === 1_113, `Manas reader topology has ${readerById.size} entries.`);

  const wordStudyDir = path.join(dir, "word-study");
  const { value: studyManifest } = await readJson(path.join(wordStudyDir, "manifest.v1.json"));
  assert(
    studyManifest.schemaVersion === "ramcharitmanas-word-study-manifest-v1",
    "Manas word-study manifest schema is invalid."
  );
  assert(studyManifest.work === "Ramcharitmanas", "Manas word-study work label is invalid.");
  assert(studyManifest.language === "en", "Manas word-study language is invalid.");
  assert(
    studyManifest.editorialStatus === "editorial-under-review",
    "Manas word-study review status is inaccurate."
  );
  assertText(studyManifest.label, "Manas word-study label");
  assertText(studyManifest.sourceRef, "Manas word-study source reference");
  if (studyManifest.note) assertText(studyManifest.note, "Manas word-study note");
  assert(
    studyManifest.coverage.totalEntries === readerById.size,
    "Manas word-study total-entry declaration is inaccurate."
  );

  const annotatedIds = new Set();
  const studyEntriesById = new Map();
  let annotatedTokenCount = 0;
  let previousLastSequence = 0;
  for (const shardInfo of studyManifest.shards) {
    assert(
      shardInfo.firstSequence > previousLastSequence &&
        shardInfo.lastSequence >= shardInfo.firstSequence &&
        shardInfo.entryCount === shardInfo.lastSequence - shardInfo.firstSequence + 1,
      `${shardInfo.file} has an invalid or overlapping range.`
    );
    previousLastSequence = shardInfo.lastSequence;

    const shardPath = path.resolve(wordStudyDir, shardInfo.file);
    const relativePath = path.relative(path.resolve(wordStudyDir), shardPath);
    assert(
      relativePath && !relativePath.startsWith("..") && !path.isAbsolute(relativePath),
      `${shardInfo.file} resolves outside the word-study directory.`
    );
    const { text: shardText, value: shard } = await readJson(shardPath);
    assert(sha256(shardText) === shardInfo.generatedSha256, `${shardInfo.file} hash mismatch.`);
    assert(
      shard.schemaVersion === "ramcharitmanas-word-study-shard-v1",
      `${shardInfo.file} has an invalid schema version.`
    );
    assert(shard.kanda.order === shardInfo.kandaOrder, `${shardInfo.file} kāṇḍa mismatch.`);
    assert(shard.entries.length === shardInfo.entryCount, `${shardInfo.file} count mismatch.`);
    assert(
      shard.entries[0]?.sequence === shardInfo.firstSequence &&
        shard.entries.at(-1)?.sequence === shardInfo.lastSequence,
      `${shardInfo.file} boundary mismatch.`
    );

    const sourceStrings = [];
    for (const [entryIndex, studyEntry] of shard.entries.entries()) {
      const sourceEntry = readerById.get(studyEntry.entryId);
      assert(sourceEntry, `${shardInfo.file} references unknown entry ${studyEntry.entryId}.`);
      assert(!annotatedIds.has(studyEntry.entryId), `${studyEntry.entryId} is annotated twice.`);
      assert(
        studyEntry.sequence === shardInfo.firstSequence + entryIndex &&
          studyEntry.sequence === sourceEntry.sequence,
        `${studyEntry.entryId} has a wrong reader sequence.`
      );
      assert(
        shard.kanda.order === sourceEntry.kandaOrder && shard.kanda.slug === sourceEntry.kandaSlug,
        `${studyEntry.entryId} is stored under the wrong kāṇḍa.`
      );
      assertText(studyEntry.meaning, `${studyEntry.entryId} close rendering`);
      assert(
        !/^(?:todo|tbd|placeholder|translation pending)$/iu.test(studyEntry.meaning.trim()),
        `${studyEntry.entryId} has a placeholder rendering.`
      );

      const expectedLines = manasSourceLines(sourceEntry.original);
      assert(
        Array.isArray(studyEntry.lines) && studyEntry.lines.length === expectedLines.length,
        `${studyEntry.entryId} source-line coverage mismatch.`
      );
      for (const [lineIndex, studyLine] of studyEntry.lines.entries()) {
        const expectedTokens = manasSourceTokens(expectedLines[lineIndex]);
        assert(studyLine.line === lineIndex + 1, `${studyEntry.entryId} line order mismatch.`);
        assert(
          Array.isArray(studyLine.words) && studyLine.words.length === expectedTokens.length,
          `${studyEntry.entryId} line ${studyLine.line} token-count mismatch.`
        );
        for (const [wordIndex, rawWord] of studyLine.words.entries()) {
          const word = manasStudyWord(rawWord);
          annotatedTokenCount += 1;
          assertText(
            word.original,
            `${studyEntry.entryId} line ${studyLine.line} token ${wordIndex + 1}`
          );
          assertText(
            word.meaning,
            `${studyEntry.entryId} line ${studyLine.line} gloss ${wordIndex + 1}`
          );
          assert(
            word.original === expectedTokens[wordIndex],
            `${studyEntry.entryId} line ${studyLine.line} token ${wordIndex + 1} does not reconstruct the source.`
          );
          assert(
            !/^(?:todo|tbd|placeholder|translation pending)$/iu.test(word.meaning.trim()),
            `${studyEntry.entryId} line ${studyLine.line} token ${wordIndex + 1} has a placeholder gloss.`
          );
          if (!Array.isArray(rawWord)) {
            if (rawWord.alternatives) {
              assert(
                Array.isArray(rawWord.alternatives) && rawWord.alternatives.length > 0,
                `${studyEntry.entryId} has an empty alternatives list.`
              );
              for (const alternative of rawWord.alternatives) {
                assertText(alternative, `${studyEntry.entryId} alternative gloss`);
              }
            }
            if (rawWord.sourceRef) {
              assertText(rawWord.sourceRef, `${studyEntry.entryId} token source reference`);
            }
          }
        }
      }

      sourceStrings.push(sourceEntry.original);
      annotatedIds.add(studyEntry.entryId);
      studyEntriesById.set(studyEntry.entryId, studyEntry);
    }

    assert(
      sha256(sourceStrings.join("\n␞\n")) === shardInfo.sourceTextSha256,
      `${shardInfo.file} source-text binding mismatch.`
    );
  }

  assert(
    annotatedIds.size === studyManifest.coverage.annotatedEntries,
    "Manas word-study annotated-entry count is inaccurate."
  );
  assert(
    studyManifest.coverage.complete === (annotatedIds.size === readerById.size),
    "Manas word-study completeness declaration is inaccurate."
  );
  assert(
    annotatedTokenCount === 107_658,
    `Manas word-study token coverage is ${annotatedTokenCount}, not 107658.`
  );

  const assertGloss = (entryId, original, meaning) => {
    const studyEntry = studyEntriesById.get(entryId);
    const found = studyEntry?.lines
      .flatMap((line) => line.words.map(manasStudyWord))
      .some((word) => word.original === original && word.meaning === meaning);
    assert(found, `${entryId} is missing the checked gloss ${original} → ${meaning}.`);
  };
  for (const [entryId, original, meaning] of [
    ["ramcharitmanas-bala-kanda-0175", "दूषन", "blame"],
    ["ramcharitmanas-bala-kanda-0175", "दाम", "rope"],
    ["ramcharitmanas-bala-kanda-0341", "जाए", "born"],
    ["ramcharitmanas-ayodhya-kanda-0157", "बर", "excellent"],
    ["ramcharitmanas-ayodhya-kanda-0162", "बर", "boons"],
    ["ramcharitmanas-ayodhya-kanda-0162", "हरि", "stole"],
    ["ramcharitmanas-aranya-kanda-0037", "संबादा", "dialogues"],
    ["ramcharitmanas-kishkindha-kanda-0009", "करसि", "you heeded"],
    ["ramcharitmanas-kishkindha-kanda-0011", "लगि", "for"],
    ["ramcharitmanas-sundara-kanda-0051", "तिन्ह", "they"],
    ["ramcharitmanas-lanka-kanda-0058", "मुनिबर", "great sage"],
    ["ramcharitmanas-lanka-kanda-0121", "बटु", "young Brahmin"],
    ["ramcharitmanas-lanka-kanda-0121", "गुहा", "Guha"],
    ["ramcharitmanas-uttara-kanda-0056", "रसाला", "mango tree"],
    ["ramcharitmanas-uttara-kanda-0058", "बँधायो", "allowed himself to be bound"],
    ["ramcharitmanas-uttara-kanda-0130", "बाना", "great vow"],
    ["ramcharitmanas-uttara-kanda-0130", "नो", "not"],
    ["ramcharitmanas-uttara-kanda-0130", "मानसम्", "the Mānas"],
  ]) {
    assertGloss(entryId, original, meaning);
  }
  assert(
    studyEntriesById.get("ramcharitmanas-uttara-kanda-0130")?.lines.length === 33,
    "Manas final colophon is absent from the word study."
  );
  if (!process.argv.includes("--allow-partial-manas")) {
    assert(
      studyManifest.coverage.complete && annotatedIds.size === readerById.size,
      `Manas word study is incomplete: ${annotatedIds.size}/${readerById.size} entries.`
    );
  }

  const { value: visualManifest } = await readJson(path.join(dir, "comics", "manifest.v1.json"));
  assert(
    visualManifest.schemaVersion === "ramcharitmanas-visual-retelling-manifest-v1" &&
      visualManifest.work === "Ramcharitmanas" &&
      visualManifest.declaredGranularity === "reader-unit",
    "Manas visual-retelling manifest metadata is invalid."
  );
  assert(
    visualManifest.coverage.totalReaderEntries === readerById.size &&
      visualManifest.coverage.illustratedEntries === visualManifest.entries.length &&
      visualManifest.coverage.complete === (visualManifest.entries.length === readerById.size),
    "Manas visual-retelling coverage declaration is inaccurate."
  );

  const visualIds = new Set();
  const visualHashes = new Set();
  for (const artwork of visualManifest.entries) {
    const sourceEntry = readerById.get(artwork.entryId);
    assert(sourceEntry, `Manas artwork references unknown entry ${artwork.entryId}.`);
    assert(!visualIds.has(artwork.entryId), `Manas artwork repeats ${artwork.entryId}.`);
    assertText(artwork.alt, `${artwork.entryId} artwork alt text`);
    assertText(artwork.caption, `${artwork.entryId} artwork caption`);
    assert(
      artwork.provenance === "ai-assisted" &&
        ["editorial-under-review", "human-reviewed"].includes(artwork.reviewStatus),
      `${artwork.entryId} artwork provenance or review status is invalid.`
    );
    assert(
      Number.isInteger(artwork.width) &&
        artwork.width > 0 &&
        Number.isInteger(artwork.height) &&
        artwork.height > 0,
      `${artwork.entryId} artwork dimensions are invalid.`
    );
    assert(
      sha256(sourceEntry.original) === artwork.sourceTextSha256,
      `${artwork.entryId} artwork source binding is stale.`
    );
    assert(
      typeof artwork.src === "string" &&
        artwork.src.startsWith("/images/spirituality/ramcharitmanas/comics/"),
      `${artwork.entryId} artwork path is outside the Manas comic directory.`
    );
    const assetPath = path.resolve(process.cwd(), "public", artwork.src.slice(1));
    const publicRoot = path.resolve(process.cwd(), "public");
    assert(assetPath.startsWith(`${publicRoot}${path.sep}`), `${artwork.entryId} path is unsafe.`);
    const assetBytes = await readFile(assetPath);
    assert(assetBytes.length > 0, `${artwork.entryId} artwork is empty.`);
    assert(
      assetBytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
      `${artwork.entryId} artwork is not a valid PNG asset.`
    );
    const assetHash = sha256(assetBytes);
    assert(assetHash === artwork.assetSha256, `${artwork.entryId} artwork hash mismatch.`);
    assert(!visualHashes.has(assetHash), `${artwork.entryId} duplicates another artwork asset.`);
    visualIds.add(artwork.entryId);
    visualHashes.add(assetHash);
  }

  return {
    entries: annotatedIds.size,
    tokens: annotatedTokenCount,
    visualRetellings: visualIds.size,
  };
}

async function checkSrimadBhagavatam() {
  const dir = path.join(ROOT, "srimad-bhagavatam");
  const { value: manifest } = await readJson(path.join(dir, "manifest.v1.json"));
  const entries = [];

  assert(manifest.scope.skandha === 1, "Bhagavatam manifest does not declare Skandha 1.");
  assert(manifest.scope.skandhaCount === 12, "Bhagavatam manifest does not declare 12 skandhas.");

  for (const chapter of manifest.source.chapters) {
    const { text, value: shard } = await readJson(path.join(dir, chapter.file));
    assert(sha256(text) === chapter.generatedSha256, `${chapter.file} hash mismatch.`);
    assert(shard.chapter.number === chapter.chapter, `${chapter.file} chapter mismatch.`);
    assert(
      shard.entries.length === manifest.scope.chapterCounts[chapter.chapter - 1],
      `${chapter.file} verse-count mismatch.`
    );
    entries.push(...shard.entries);
  }

  const expectedTotal = manifest.scope.chapterCounts.reduce((sum, count) => sum + count, 0);
  assert(
    entries.length === expectedTotal,
    `Bhagavatam Skandha 1 has ${entries.length} entries instead of ${expectedTotal}.`
  );
  assert(
    new Set(entries.map((entry) => entry.id)).size === entries.length,
    "Bhagavatam Skandha 1 IDs are not unique."
  );
  for (const [index, entry] of entries.entries()) {
    assert(entry.sequence === index + 1, `Bhagavatam sequence breaks at ${entry.id}.`);
    assertText(entry.original, entry.id);
    assert(!entry.original.startsWith("इति श्री"), `${entry.id} embeds a chapter colophon.`);
  }

  // The pinned edition's own two documented numbering quirks must survive intact.
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  const chapter3 = entries.filter((entry) => entry.chapter === 3);
  assert(
    !chapter3.some((entry) => entry.verse === 11 || entry.verse === 32),
    "Chapter 3 unexpectedly has a verse numbered 11 or 32."
  );
  const chapter13Fortieths = entries.filter((entry) => entry.chapter === 13 && entry.verse === 40);
  assert(
    chapter13Fortieths.length === 2,
    "Chapter 13's documented duplicate verse 40 pair is missing."
  );
  assert(
    byId.get("bhagavatam-1-13-39")?.verse === 40,
    "Bhagavatam 13, sourceIndex 39 mapping is wrong."
  );
  assert(
    byId.get("bhagavatam-1-13-40")?.verse === 40,
    "Bhagavatam 13, sourceIndex 40 mapping is wrong."
  );
  assert(
    byId.get("bhagavatam-1-1-1")?.original.startsWith("जन्माद्यस्य"),
    "Bhagavatam 1.1.1 is not the janmādyasya verse."
  );
}

await checkBhagavadGita();
const manasStudyCount = await checkRamcharitmanas();
await checkSrimadBhagavatam();
console.log(
  `Verified the Gita, Ramcharitmanas, and Bhagavatam Skandha-1 source corpora, topology, hashes, sentinels, ${manasStudyCount.entries} Manas word-study entries covering ${manasStudyCount.tokens} exact source tokens, and ${manasStudyCount.visualRetellings} source-bound visual retelling${manasStudyCount.visualRetellings === 1 ? "" : "s"}.`
);
