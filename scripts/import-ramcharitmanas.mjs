import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE_REPOSITORY = "https://github.com/WirelessAlien/Ramcharitmanas";
const SOURCE_COMMIT = "a8734282b3f95648032a53447f08ad77acb2ecd4";
const RAW_ROOT = `https://raw.githubusercontent.com/WirelessAlien/Ramcharitmanas/${SOURCE_COMMIT}`;
const CORPUS_VERSION = "1.0.0";
const SCHEMA_VERSION = 1;
const EXPECTED_TOTAL_UNITS = 1_074;

const SCRIPT_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = resolve(SCRIPT_DIRECTORY, "..");
const OUTPUT_DIRECTORY = resolve(REPOSITORY_ROOT, "content", "scriptures", "ramcharitmanas");

const KANDAS = [
  {
    order: 1,
    slug: "bala-kanda",
    nameDevanagari: "बालकाण्ड",
    nameLatin: "Bālakāṇḍa",
    sourceFile: "balkanda.json",
    expectedUnits: 361,
    expectedBytes: 545_898,
    expectedSha256: "0e1253afa6816501bc5f0433b9d6ccad68513d27a84c7462fdf8974a250ec768",
  },
  {
    order: 2,
    slug: "ayodhya-kanda",
    nameDevanagari: "अयोध्याकाण्ड",
    nameLatin: "Ayodhyākāṇḍa",
    sourceFile: "ayodhyakanda.json",
    expectedUnits: 326,
    expectedBytes: 478_009,
    expectedSha256: "67bddebb204ab0e7039634e8f517f9fec7bb8da3076a0404400f63c7968c28f8",
  },
  {
    order: 3,
    slug: "aranya-kanda",
    nameDevanagari: "अरण्यकाण्ड",
    nameLatin: "Araṇyakāṇḍa",
    sourceFile: "aranyakanda.json",
    expectedUnits: 46,
    expectedBytes: 94_808,
    expectedSha256: "ece69b631cea2d842285156f144c8e1b545df2fc494f70c92dafc8ce0686d702",
  },
  {
    order: 4,
    slug: "kishkindha-kanda",
    nameDevanagari: "किष्किन्धाकाण्ड",
    nameLatin: "Kiṣkindhākāṇḍa",
    sourceFile: "kishkindhakanda.json",
    expectedUnits: 30,
    expectedBytes: 53_280,
    expectedSha256: "f407d99b6d621f68abb5a6d7677793ffeede4fcb5a0dd06cf021057ec9ad77c9",
  },
  {
    order: 5,
    slug: "sundara-kanda",
    nameDevanagari: "सुन्दरकाण्ड",
    nameLatin: "Sundarakāṇḍa",
    sourceFile: "sundarkanda.json",
    expectedUnits: 60,
    expectedBytes: 98_311,
    expectedSha256: "ec64dd5359fd1e070c0d203398db30916e12af7821d5c04957dfda61c0320cdb",
  },
  {
    order: 6,
    slug: "lanka-kanda",
    nameDevanagari: "लंकाकाण्ड",
    nameLatin: "Laṅkākāṇḍa",
    sourceFile: "lankakanda.json",
    expectedUnits: 121,
    expectedBytes: 202_491,
    expectedSha256: "ba38b97a7d036d120f8272fc9885c5e6de79019cacbbc0299d61b6547a61de65",
  },
  {
    order: 7,
    slug: "uttara-kanda",
    nameDevanagari: "उत्तरकाण्ड",
    nameLatin: "Uttarakāṇḍa",
    sourceFile: "uttarakanda.json",
    expectedUnits: 130,
    expectedBytes: 198_969,
    expectedSha256: "454baae0153780ba735f2a2291dfe71962ed092ce7b6aabd31e561dc6d044fa7",
  },
];

const LICENSE_SOURCE = {
  path: "LICENSE",
  expectedBytes: 1_211,
  expectedSha256: "6b0382b16279f26ff69014300541967a356a666eb0b91b422f6862f6b7dad17e",
  outputFile: "UPSTREAM-LICENSE.txt",
};

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function serializeJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function sourcePathFor(sourceFile) {
  return `main/data/verses/${sourceFile}`;
}

function outputFileFor(kanda) {
  return `${String(kanda.order).padStart(2, "0")}-${kanda.slug}.v${SCHEMA_VERSION}.json`;
}

async function downloadPinnedFile(path, expectedSha256, expectedBytes) {
  const url = `${RAW_ROOT}/${path}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/octet-stream",
      "User-Agent": "swapnilsahoo-next-scripture-import",
    },
  });

  if (!response.ok) {
    throw new Error(`Could not download ${url}: HTTP ${response.status}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha256 = sha256(bytes);

  if (bytes.length !== expectedBytes) {
    throw new Error(
      `${path}: expected ${expectedBytes} bytes, received ${bytes.length}. Refusing to import changed source data.`
    );
  }

  if (actualSha256 !== expectedSha256) {
    throw new Error(
      `${path}: SHA-256 mismatch. Expected ${expectedSha256}; received ${actualSha256}. Refusing to import changed source data.`
    );
  }

  return { url, bytes, sha256: actualSha256 };
}

function decodeUtf8(bytes, path) {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch (error) {
    throw new Error(`${path}: source is not valid UTF-8`, { cause: error });
  }
}

function extractVerseNumberLexemes(sourceText) {
  const pattern = /"verse-number"\s*:\s*(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;
  return Array.from(sourceText.matchAll(pattern), (match) => match[1]);
}

function normalizeSacredText(value) {
  // These are the only transformations applied to the source wording.
  return value.replace(/\r\n?/g, "\n").normalize("NFC");
}

function countLocatorCollisions(locators) {
  const frequencies = new Map();
  for (const locator of locators) {
    frequencies.set(locator, (frequencies.get(locator) ?? 0) + 1);
  }

  const collisions = Array.from(frequencies.entries()).filter(([, count]) => count > 1);
  return {
    distinctValues: frequencies.size,
    collisionValues: collisions.length,
    entriesSharingCollisionValues: collisions.reduce((total, [, count]) => total + count, 0),
  };
}

function parseKanda(kanda, sourceText, globalSequenceStart) {
  const path = sourcePathFor(kanda.sourceFile);
  let parsed;

  try {
    parsed = JSON.parse(sourceText);
  } catch (error) {
    throw new Error(`${path}: invalid JSON`, { cause: error });
  }

  if (!Array.isArray(parsed)) {
    throw new Error(`${path}: expected a top-level JSON array`);
  }

  if (parsed.length !== kanda.expectedUnits) {
    throw new Error(`${path}: expected ${kanda.expectedUnits} units; received ${parsed.length}`);
  }

  const locatorLexemes = extractVerseNumberLexemes(sourceText);
  if (locatorLexemes.length !== parsed.length) {
    throw new Error(
      `${path}: found ${locatorLexemes.length} verse-number tokens for ${parsed.length} units`
    );
  }

  const entries = parsed.map((unit, zeroBasedIndex) => {
    const sourceIndex = zeroBasedIndex + 1;
    const sourceVerseNumber = locatorLexemes[zeroBasedIndex];
    const keys = unit && typeof unit === "object" ? Object.keys(unit).sort() : [];

    if (
      !unit ||
      typeof unit !== "object" ||
      Array.isArray(unit) ||
      keys.join(",") !== "content,verse-number"
    ) {
      throw new Error(
        `${path} unit ${sourceIndex}: expected exactly the content and verse-number fields`
      );
    }

    if (
      typeof unit["verse-number"] !== "number" ||
      !Number.isFinite(unit["verse-number"]) ||
      Number(sourceVerseNumber) !== unit["verse-number"]
    ) {
      throw new Error(
        `${path} unit ${sourceIndex}: verse-number token does not match parsed value`
      );
    }

    if (!sourceVerseNumber.startsWith(`${kanda.order}.`)) {
      throw new Error(
        `${path} unit ${sourceIndex}: source locator ${sourceVerseNumber} does not begin with ${kanda.order}.`
      );
    }

    if (typeof unit.content !== "string" || unit.content.length === 0) {
      throw new Error(`${path} unit ${sourceIndex}: content must be a non-empty string`);
    }

    return {
      id: `ramcharitmanas-${kanda.slug}-${String(sourceIndex).padStart(4, "0")}`,
      sequence: globalSequenceStart + zeroBasedIndex,
      kanda: kanda.slug,
      label: `${kanda.nameLatin} · unit ${sourceIndex}`,
      sourceLocatorLabel: `${kanda.nameLatin} · source locator ${sourceVerseNumber}`,
      sourceIndex,
      sourceVerseNumber,
      original: normalizeSacredText(unit.content),
    };
  });

  return {
    entries,
    locatorValidation: countLocatorCollisions(locatorLexemes),
  };
}

function validateCombinedEntries(entries) {
  if (entries.length !== EXPECTED_TOTAL_UNITS) {
    throw new Error(`Expected ${EXPECTED_TOTAL_UNITS} total units; generated ${entries.length}`);
  }

  const ids = new Set();
  for (const [zeroBasedIndex, entry] of entries.entries()) {
    const expectedSequence = zeroBasedIndex + 1;
    if (entry.sequence !== expectedSequence) {
      throw new Error(
        `Non-contiguous global sequence at ${entry.id}: expected ${expectedSequence}, received ${entry.sequence}`
      );
    }
    if (ids.has(entry.id)) {
      throw new Error(`Duplicate stable ID: ${entry.id}`);
    }
    ids.add(entry.id);
  }
}

async function buildOutputs() {
  const [licenseDownload, ...kandaDownloads] = await Promise.all([
    downloadPinnedFile(
      LICENSE_SOURCE.path,
      LICENSE_SOURCE.expectedSha256,
      LICENSE_SOURCE.expectedBytes
    ),
    ...KANDAS.map((kanda) =>
      downloadPinnedFile(sourcePathFor(kanda.sourceFile), kanda.expectedSha256, kanda.expectedBytes)
    ),
  ]);

  const shards = [];
  const allEntries = [];
  let nextGlobalSequence = 1;

  for (const [index, kanda] of KANDAS.entries()) {
    const download = kandaDownloads[index];
    const path = sourcePathFor(kanda.sourceFile);
    const sourceText = decodeUtf8(download.bytes, path);
    const { entries, locatorValidation } = parseKanda(kanda, sourceText, nextGlobalSequence);
    const firstSequence = entries[0].sequence;
    const lastSequence = entries.at(-1).sequence;
    nextGlobalSequence = lastSequence + 1;
    allEntries.push(...entries);

    const shard = {
      schemaVersion: SCHEMA_VERSION,
      corpusVersion: CORPUS_VERSION,
      work: "रामचरितमानस",
      workLatin: "Rāmacaritamānasa",
      contentType: "source-text-only",
      kanda: {
        order: kanda.order,
        slug: kanda.slug,
        nameDevanagari: kanda.nameDevanagari,
        nameLatin: kanda.nameLatin,
      },
      source: {
        repository: SOURCE_REPOSITORY,
        commit: SOURCE_COMMIT,
        path,
        url: download.url,
        rawBytes: download.bytes.length,
        rawSha256: download.sha256,
        license: "The Unlicense",
      },
      unitCount: entries.length,
      globalSequence: {
        first: firstSequence,
        last: lastSequence,
      },
      sourceLocatorValidation: locatorValidation,
      entries,
    };

    const file = outputFileFor(kanda);
    const bytes = Buffer.from(serializeJson(shard), "utf8");
    shards.push({
      kanda,
      file,
      bytes,
      generatedSha256: sha256(bytes),
      firstSequence,
      lastSequence,
      locatorValidation,
    });
  }

  validateCombinedEntries(allEntries);

  const manifest = {
    schemaVersion: SCHEMA_VERSION,
    corpusVersion: CORPUS_VERSION,
    work: {
      titleDevanagari: "रामचरितमानस",
      titleLatin: "Rāmacaritamānasa",
      traditionalAuthor: "Gosvāmī Tulasīdāsa",
      representation: "Devanagari source text as transcribed in the pinned dataset",
    },
    scope: {
      sourceTextOnly: true,
      completePinnedDataset: true,
      completeWork: false,
      kandaCount: KANDAS.length,
      expectedTotalUnits: EXPECTED_TOTAL_UNITS,
      actualTotalUnits: allEntries.length,
      unitDefinition:
        "One JSON array element in the upstream dataset, preserved without splitting or interpreting its internal headings and verse groupings.",
      knownOmissions: {
        count: 39,
        location: "Opening invocations before numbered unit 1 in all seven kāṇḍas",
        byKanda: {
          "bala-kanda": 12,
          "ayodhya-kanda": 4,
          "aranya-kanda": 3,
          "kishkindha-kanda": 4,
          "sundara-kanda": 3,
          "lanka-kanda": 6,
          "uttara-kanda": 7,
        },
        description:
          "The numbered dataset omits 23 Sanskrit and 16 Awadhi opening invocations. They are not reconstructed inside these shards; the website supplies them as separately sourced records in opening-invocations.v1.json.",
      },
    },
    source: {
      dataset: "WirelessAlien/Ramcharitmanas",
      repository: SOURCE_REPOSITORY,
      commit: SOURCE_COMMIT,
      commitUrl: `${SOURCE_REPOSITORY}/tree/${SOURCE_COMMIT}`,
      attribution:
        "WirelessAlien/Ramcharitmanas provides the Ramcharitmanas in Devanagari JSON and attributes its data source to the IIT Kanpur Ramcharitmanas site.",
      upstreamAcknowledgedSource: {
        name: "IIT Kanpur Ramcharitmanas",
        url: "https://www.ramcharitmanas.iitk.ac.in/",
      },
      license: {
        name: "The Unlicense",
        spdx: "Unlicense",
        upstreamPath: LICENSE_SOURCE.path,
        upstreamUrl: licenseDownload.url,
        rawBytes: licenseDownload.bytes.length,
        rawSha256: licenseDownload.sha256,
        localCopy: LICENSE_SOURCE.outputFile,
        notice:
          "The upstream dataset is dedicated to the public domain under The Unlicense and is provided without warranty. See the bundled verbatim license copy.",
      },
    },
    normalization: {
      encoding: "UTF-8",
      lineEndings: "CRLF and lone CR converted to LF inside source-text strings",
      unicode: "Unicode NFC applied to each source-text string",
      otherTextTransformations: "none",
      sourceOrderPreserved: true,
    },
    identifiers: {
      stableId:
        "ramcharitmanas-<kanda-slug>-<one-based upstream array position padded to four digits>",
      globalSequence:
        "One-based and contiguous across the seven kāṇḍas in canonical source-file order",
      sourceIndex: "One-based position inside the pinned upstream JSON array",
      sourceVerseNumber:
        "The exact JSON numeric token lexeme captured before JSON.parse; it is retained only as an upstream locator.",
    },
    validation: {
      hashAlgorithm: "SHA-256",
      expectedTotalUnits: EXPECTED_TOTAL_UNITS,
      expectedCountsByKanda: Object.fromEntries(
        KANDAS.map((kanda) => [kanda.slug, kanda.expectedUnits])
      ),
      sourceFiles: shards.map((shard) => ({
        order: shard.kanda.order,
        kanda: shard.kanda.slug,
        sourcePath: sourcePathFor(shard.kanda.sourceFile),
        rawBytes: shard.kanda.expectedBytes,
        rawSha256: shard.kanda.expectedSha256,
        expectedUnits: shard.kanda.expectedUnits,
        sourceLocatorDistinctValues: shard.locatorValidation.distinctValues,
        sourceLocatorCollisionValues: shard.locatorValidation.collisionValues,
      })),
      generatedShards: shards.map((shard) => ({
        order: shard.kanda.order,
        kanda: shard.kanda.slug,
        file: shard.file,
        units: shard.kanda.expectedUnits,
        firstSequence: shard.firstSequence,
        lastSequence: shard.lastSequence,
        generatedBytes: shard.bytes.length,
        generatedSha256: shard.generatedSha256,
      })),
    },
    limitations: [
      "Completeness means all 1,074 array units from all seven JSON files at the pinned dataset commit; it is not a claim that this is a critical or diplomatic edition.",
      "The pinned dataset omits 39 opening invocations across the seven kāṇḍas: 23 Sanskrit and 16 Awadhi records. This 1,074-unit numbered corpus is therefore not, by itself, the complete selected work; the reader interleaves a separately sourced opening-invocations.v1.json supplement.",
      "The upstream verse-number field is a JSON number. Trailing zeroes were lost before ingestion, so values such as 1.1 can represent both source units 1 and 10 and are not unique.",
      "Stable IDs, labels, and global sequences therefore use source array position, while sourceVerseNumber is preserved only as a non-unique locator.",
      "The source dataset contains Devanagari text only. These files do not add translations, transliteration, pronunciation guidance, word study, grammar, or commentary.",
      "Internal headings such as चौपाई and दोहा/सोरठा remain embedded exactly within each normalized source-text string; the importer does not split or classify them.",
    ],
  };

  const outputs = new Map();
  for (const shard of shards) {
    outputs.set(shard.file, shard.bytes);
  }
  outputs.set("manifest.v1.json", Buffer.from(serializeJson(manifest), "utf8"));
  outputs.set(LICENSE_SOURCE.outputFile, licenseDownload.bytes);

  return { outputs, manifest };
}

async function writeOutputs(outputs) {
  await mkdir(OUTPUT_DIRECTORY, { recursive: true });
  for (const [file, bytes] of outputs) {
    await writeFile(resolve(OUTPUT_DIRECTORY, file), bytes);
  }
}

async function checkOutputs(outputs) {
  const mismatches = [];

  for (const [file, expectedBytes] of outputs) {
    let actualBytes;
    try {
      actualBytes = await readFile(resolve(OUTPUT_DIRECTORY, file));
    } catch (error) {
      if (error && error.code === "ENOENT") {
        mismatches.push(`${file}: missing`);
        continue;
      }
      throw error;
    }

    if (!actualBytes.equals(expectedBytes)) {
      mismatches.push(
        `${file}: differs (expected SHA-256 ${sha256(expectedBytes)}, found ${sha256(actualBytes)})`
      );
    }
  }

  if (mismatches.length > 0) {
    throw new Error(
      `Generated Ramcharitmanas corpus is stale or incomplete:\n- ${mismatches.join("\n- ")}\nRun this script with --write.`
    );
  }
}

function printSummary(manifest, verb) {
  console.log(
    `${verb} Ramcharitmanas corpus v${manifest.corpusVersion}: ${manifest.scope.actualTotalUnits} units across ${manifest.scope.kandaCount} kāṇḍas`
  );
  console.log(`Pinned source commit: ${manifest.source.commit}`);
  for (const shard of manifest.validation.generatedShards) {
    const source = manifest.validation.sourceFiles.find(
      (candidate) => candidate.kanda === shard.kanda
    );
    console.log(
      `${String(shard.order).padStart(2, "0")} ${shard.kanda}: ${shard.units} units, source ${source.rawSha256}, generated ${shard.generatedSha256}`
    );
  }
}

async function main() {
  const mode = process.argv[2];
  if (mode !== "--write" && mode !== "--check") {
    console.error("Usage: node scripts/import-ramcharitmanas.mjs --write|--check");
    process.exitCode = 2;
    return;
  }

  const { outputs, manifest } = await buildOutputs();
  if (mode === "--write") {
    await writeOutputs(outputs);
    await checkOutputs(outputs);
    printSummary(manifest, "Wrote and verified");
    return;
  }

  await checkOutputs(outputs);
  printSummary(manifest, "Verified");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
