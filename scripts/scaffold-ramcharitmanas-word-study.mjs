import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "content", "scriptures", "ramcharitmanas");
const SHARDS = [
  "01-bala-kanda.v1.json",
  "02-ayodhya-kanda.v1.json",
  "03-aranya-kanda.v1.json",
  "04-kishkindha-kanda.v1.json",
  "05-sundara-kanda.v1.json",
  "06-lanka-kanda.v1.json",
  "07-uttara-kanda.v1.json",
];
const METER_HEADINGS = new Set(["चौपाई", "दोहा/सोरठा", "छंद", "श्लोक"]);
const WORD_STUDY_ROOT = path.join(ROOT, "word-study");

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
}

function sourceLines(original) {
  return original
    .split(/\r?\n/u)
    .map((line) => line.replaceAll("\u00a0", " ").trim())
    .filter((line) => line && !METER_HEADINGS.has(line));
}

function sourceTokens(line) {
  const withoutVerseNumber = line.replace(/\p{N}+(?:\s*\([^)]*\))?/gu, "");
  return withoutVerseNumber.match(/[\p{L}\p{M}\p{Cf}]+/gu) ?? [];
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

const kandaSlug = argument("--kanda");
const start = Number.parseInt(argument("--start") ?? "", 10);
const end = Number.parseInt(argument("--end") ?? "", 10);
const openingsOnly = process.argv.includes("--openings");
const output = argument("--output");

if (!kandaSlug || !Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start) {
  fail(
    "Usage: node scripts/scaffold-ramcharitmanas-word-study.mjs --kanda bala-kanda --start 1 --end 50 [--openings] [--output bala-kanda/0001-0050.v1.json]"
  );
} else {
  const [openingDocument, ...numberedShards] = await Promise.all([
    readFile(path.join(ROOT, "opening-invocations.v1.json"), "utf8").then(JSON.parse),
    ...SHARDS.map((file) => readFile(path.join(ROOT, file), "utf8").then(JSON.parse)),
  ]);
  const readerEntries = [];

  for (const shard of numberedShards) {
    const openings = openingDocument.entries
      .filter((entry) => entry.kandaOrder === shard.kanda.order)
      .sort((left, right) => left.sourceIndex - right.sourceIndex);
    for (const opening of openings) {
      readerEntries.push({
        entryId: opening.id,
        sequence: readerEntries.length + 1,
        kandaOrder: shard.kanda.order,
        kandaSlug: shard.kanda.slug,
        sourceIndex: opening.sourceIndex,
        kind: "opening",
        original: opening.original,
      });
    }
    for (const entry of shard.entries) {
      readerEntries.push({
        entryId: entry.id,
        sequence: readerEntries.length + 1,
        kandaOrder: shard.kanda.order,
        kandaSlug: shard.kanda.slug,
        sourceIndex: entry.sourceIndex,
        kind: "numbered",
        original: entry.original,
      });
    }
  }

  const selection = readerEntries.filter(
    (entry) =>
      entry.kandaSlug === kandaSlug &&
      entry.kind === (openingsOnly ? "opening" : "numbered") &&
      entry.sourceIndex >= start &&
      entry.sourceIndex <= end
  );
  if (selection.length === 0) {
    fail(`No ${openingsOnly ? "opening" : "numbered"} entries match ${kandaSlug} ${start}-${end}.`);
  } else {
    const shard = {
      schemaVersion: "ramcharitmanas-word-study-shard-v1",
      kanda: {
        order: selection[0].kandaOrder,
        slug: selection[0].kandaSlug,
      },
      entries: selection.map((entry) => ({
        entryId: entry.entryId,
        sequence: entry.sequence,
        meaning: "",
        lines: sourceLines(entry.original).map((line, lineIndex) => ({
          line: lineIndex + 1,
          words: sourceTokens(line).map((token) => [token, ""]),
        })),
      })),
    };
    const sourceTextSha256 = sha256(selection.map((entry) => entry.original).join("\n\u241e\n"));

    const shardJson = `${JSON.stringify(shard, null, 2)}\n`;
    if (output) {
      const outputRoot = path.resolve(WORD_STUDY_ROOT);
      const outputPath = path.resolve(outputRoot, output);
      const relative = path.relative(outputRoot, outputPath);
      if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
        fail(`Output must be a relative file below ${WORD_STUDY_ROOT}.`);
      } else {
        await mkdir(path.dirname(outputPath), { recursive: true });
        await writeFile(outputPath, shardJson, { encoding: "utf8", flag: "wx" });
        process.stderr.write(`Created ${path.relative(process.cwd(), outputPath)}\n`);
      }
    } else {
      process.stdout.write(shardJson);
    }
    process.stderr.write(
      `${JSON.stringify(
        {
          manifestShard: {
            kandaOrder: selection[0].kandaOrder,
            firstSequence: selection[0].sequence,
            lastSequence: selection.at(-1).sequence,
            entryCount: selection.length,
            sourceTextSha256,
          },
        },
        null,
        2
      )}\n`
    );
  }
}
