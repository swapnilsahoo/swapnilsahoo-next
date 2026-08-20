import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "content", "scriptures");
const BROKEN_TEXT = /\uFFFD|à¤|à¥|â€|Â|■■|ssssssss/u;

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

  for (const shardInfo of manifest.validation.generatedShards) {
    const { text, value: shard } = await readJson(path.join(dir, shardInfo.file));
    assert(sha256(text) === shardInfo.generatedSha256, `${shardInfo.file} hash mismatch.`);
    assert(shard.entries.length === shardInfo.units, `${shardInfo.file} unit-count mismatch.`);
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
}

await checkBhagavadGita();
await checkRamcharitmanas();
console.log(
  "Verified the Gita and Ramcharitmanas source corpora, topology, hashes, and sentinels."
);
