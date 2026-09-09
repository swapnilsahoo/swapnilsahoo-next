import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "content", "scriptures", "ramcharitmanas");
const WORD_STUDY_ROOT = path.join(ROOT, "word-study");
const MANIFEST_PATH = path.join(WORD_STUDY_ROOT, "manifest.v1.json");
const SOURCE_SHARDS = [
  "01-bala-kanda.v1.json",
  "02-ayodhya-kanda.v1.json",
  "03-aranya-kanda.v1.json",
  "04-kishkindha-kanda.v1.json",
  "05-sundara-kanda.v1.json",
  "06-lanka-kanda.v1.json",
  "07-uttara-kanda.v1.json",
];

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function glossValue(word) {
  return Array.isArray(word) ? word[1] : word?.meaning;
}

function isCompleteEntry(entry) {
  return (
    typeof entry?.meaning === "string" &&
    entry.meaning.trim().length > 0 &&
    Array.isArray(entry.lines) &&
    entry.lines.length > 0 &&
    entry.lines.every(
      (line) =>
        Array.isArray(line.words) &&
        line.words.length > 0 &&
        line.words.every((word) => {
          const value = glossValue(word);
          return typeof value === "string" && value.trim().length > 0;
        })
    )
  );
}

async function listJsonFiles(directory) {
  const files = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, item.name);
    if (item.isDirectory()) {
      files.push(...(await listJsonFiles(absolute)));
    } else if (
      item.name.endsWith(".v1.json") &&
      item.name !== "manifest.v1.json" &&
      !item.name.includes("schema")
    ) {
      files.push(absolute);
    }
  }
  return files;
}

const [openingDocument, ...sourceDocuments] = await Promise.all([
  readFile(path.join(ROOT, "opening-invocations.v1.json"), "utf8").then(JSON.parse),
  ...SOURCE_SHARDS.map((file) => readFile(path.join(ROOT, file), "utf8").then(JSON.parse)),
]);

const sourceById = new Map();
let readerSequence = 0;
for (const sourceDocument of sourceDocuments) {
  const openings = openingDocument.entries
    .filter((entry) => entry.kandaOrder === sourceDocument.kanda.order)
    .sort((left, right) => left.sourceIndex - right.sourceIndex);
  for (const entry of [...openings, ...sourceDocument.entries]) {
    readerSequence += 1;
    sourceById.set(entry.id, {
      sequence: readerSequence,
      original: entry.original,
      kandaOrder: sourceDocument.kanda.order,
      kandaSlug: sourceDocument.kanda.slug,
    });
  }
}

const manifestShards = [];
const annotatedIds = new Set();
const skipped = [];

for (const absolute of await listJsonFiles(WORD_STUDY_ROOT)) {
  const source = await readFile(absolute, "utf8");
  const shard = JSON.parse(source);
  const relative = path.relative(WORD_STUDY_ROOT, absolute).replaceAll(path.sep, "/");

  if (!Array.isArray(shard.entries) || shard.entries.length === 0) {
    throw new Error(`Word-study shard has no entries: ${relative}`);
  }
  if (!shard.entries.every(isCompleteEntry)) {
    skipped.push(relative);
    continue;
  }

  const originals = [];
  let previousSequence = 0;
  for (const entry of shard.entries) {
    const sourceEntry = sourceById.get(entry.entryId);
    if (
      !sourceEntry ||
      annotatedIds.has(entry.entryId) ||
      entry.sequence !== sourceEntry.sequence ||
      entry.sequence <= previousSequence ||
      shard.kanda?.order !== sourceEntry.kandaOrder ||
      shard.kanda?.slug !== sourceEntry.kandaSlug
    ) {
      throw new Error(`Invalid or duplicate word-study entry ${entry.entryId} in ${relative}.`);
    }
    previousSequence = entry.sequence;
    annotatedIds.add(entry.entryId);
    originals.push(sourceEntry.original);
  }

  manifestShards.push({
    file: relative,
    kandaOrder: shard.kanda.order,
    firstSequence: shard.entries[0].sequence,
    lastSequence: shard.entries.at(-1).sequence,
    entryCount: shard.entries.length,
    sourceTextSha256: sha256(originals.join("\n\u241e\n")),
    generatedSha256: sha256(source),
  });
}

manifestShards.sort((left, right) => left.firstSequence - right.firstSequence);
for (let index = 1; index < manifestShards.length; index += 1) {
  if (manifestShards[index].firstSequence <= manifestShards[index - 1].lastSequence) {
    throw new Error(`Overlapping word-study shards around ${manifestShards[index].file}.`);
  }
}

const complete = annotatedIds.size === sourceById.size;
if (process.argv.includes("--require-complete") && !complete) {
  throw new Error(
    `Word study is incomplete: ${annotatedIds.size}/${sourceById.size} entries; ${skipped.length} unfinished shard(s).`
  );
}

const manifest = {
  schemaVersion: "ramcharitmanas-word-study-manifest-v1",
  work: "Ramcharitmanas",
  language: "en",
  editorialStatus: "editorial-under-review",
  label: "Independent close English word study",
  sourceRef:
    "Pinned open source text and the public-domain 1925 Belvedere Press opening invocations; IITK Manas Supersite used only as a comparison witness",
  sourceUrl: "https://manas.gitasupersite.in/",
  note:
    "These contextual glosses and close renderings were prepared specifically for this edition. They are working editorial translations awaiting independent Awadhi and Sanskrit review, not quotations from IITK or a modern published translation.",
  coverage: {
    totalEntries: sourceById.size,
    annotatedEntries: annotatedIds.size,
    complete,
  },
  shards: manifestShards,
};

const output = `${JSON.stringify(manifest, null, 2)}\n`;
if (process.argv.includes("--write")) {
  await writeFile(MANIFEST_PATH, output, "utf8");
  process.stderr.write(`Updated ${path.relative(process.cwd(), MANIFEST_PATH)}\n`);
} else {
  process.stdout.write(output);
}
process.stderr.write(
  `Included ${annotatedIds.size}/${sourceById.size} entries across ${manifestShards.length} shards; skipped ${skipped.length} unfinished shards.\n`
);
