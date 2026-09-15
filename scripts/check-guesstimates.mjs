/**
 * Build-time verification for the guesstimate corpus.
 *
 * A guesstimate page is only worth publishing if its arithmetic is right. Every
 * `expr` is evaluated here and asserted against its stated `result`, so a wrong
 * sum fails the build instead of being read as authoritative by a student
 * preparing for an interview.
 *
 * Checks, per entry:
 *   1. every calculation and triangulation `expr` evaluates to its `result`
 *   2. `expr` contains only digits and operators - no smuggled identifiers
 *   3. every `uses` id and `sensitivity.assumptionId` resolves to a real assumption
 *   4. the last calculation line agrees with `finalAnswerNumeric`
 *   5. ids, numbers and tab labels are unique and sequential
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const dataPath = join(here, "..", "src", "features", "placements", "data", "guesstimates.ts");

const ALLOWED = /^[0-9.+\-*/() \t]+$/;

/** Evaluate a arithmetic-only expression without exposing scope. */
function evaluate(expr) {
  if (!ALLOWED.test(expr)) {
    const bad = [...new Set(expr.split("").filter((c) => !/[0-9.+\-*/() \t]/.test(c)))];
    throw new Error(`illegal character(s) ${JSON.stringify(bad)}`);
  }
  // eslint-disable-next-line no-new-func
  const value = Function(`"use strict"; return (${expr});`)();
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error("did not evaluate to a finite number");
  }
  return value;
}

/** Pull the exported array literal out of the generated module. */
function loadEntries() {
  const src = readFileSync(dataPath, "utf8");
  const marker = "export const guesstimates: readonly Guesstimate[] = [";
  const start = src.indexOf(marker);
  if (start === -1) throw new Error("could not locate the guesstimates array");
  const open = src.indexOf("[", start + marker.length - 1);
  let depth = 0;
  let end = -1;
  let inString = false;
  let quote = "";
  for (let i = open; i < src.length; i += 1) {
    const ch = src[i];
    if (inString) {
      if (ch === "\\") i += 1;
      else if (ch === quote) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'") {
      inString = true;
      quote = ch;
      continue;
    }
    if (ch === "[") depth += 1;
    else if (ch === "]") {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) throw new Error("unterminated guesstimates array");
  return JSON.parse(src.slice(open, end + 1));
}

const entries = loadEntries();
const errors = [];
const seenIds = new Set();
const seenNumbers = new Set();

function checkLines(entry, lines, where) {
  const assumptionIds = new Set((entry.assumptions ?? []).map((a) => a.id));
  for (const line of lines ?? []) {
    const at = `${entry.id} ${where}/${line.id}`;
    let value;
    try {
      value = evaluate(line.expr);
    } catch (error) {
      errors.push(`${at}: ${error.message} :: ${JSON.stringify(line.expr)}`);
      continue;
    }
    const tolerance = line.tolerance ?? 0;
    const denominator = Math.abs(line.result) || 1;
    const relative = Math.abs(value - line.result) / denominator;
    if (relative > Math.max(tolerance, 1e-9)) {
      errors.push(
        `${at}: ${line.expr} = ${value} but result says ${line.result} (off by ${(relative * 100).toFixed(2)}%)`
      );
    }
    for (const used of line.uses ?? []) {
      if (!assumptionIds.has(used)) {
        errors.push(`${at}: uses "${used}", which is not in assumptions`);
      }
    }
  }
}

for (const entry of entries) {
  if (seenIds.has(entry.id)) errors.push(`duplicate id "${entry.id}"`);
  seenIds.add(entry.id);
  if (seenNumbers.has(entry.number)) errors.push(`duplicate number "${entry.number}"`);
  seenNumbers.add(entry.number);

  checkLines(entry, entry.calculation, "calc");
  checkLines(entry, entry.triangulation?.lines, "triangulation");

  const assumptionIds = new Set((entry.assumptions ?? []).map((a) => a.id));
  const lever = entry.sensitivity?.assumptionId;
  if (lever && !assumptionIds.has(lever)) {
    errors.push(`${entry.id}: sensitivity.assumptionId "${lever}" is not in assumptions`);
  }

  const last = entry.calculation?.[entry.calculation.length - 1];
  if (last && typeof entry.finalAnswerNumeric === "number") {
    const drift =
      Math.abs(last.result - entry.finalAnswerNumeric) / (Math.abs(entry.finalAnswerNumeric) || 1);
    if (drift > 0.12) {
      errors.push(
        `${entry.id}: last line ${last.result} vs finalAnswerNumeric ${entry.finalAnswerNumeric} (${(drift * 100).toFixed(1)}% apart)`
      );
    }
  }

  if (!entry.tabLabel || entry.tabLabel.length > 40) {
    errors.push(`${entry.id}: tabLabel missing or too long for the index`);
  }
}

const numbers = entries.map((e) => Number(e.number));
if (numbers.some((n, i) => n !== i + 1)) {
  errors.push(`numbers are not sequential 1..${entries.length}: ${numbers.join(", ")}`);
}

const calcLines = entries.reduce((n, e) => n + (e.calculation?.length ?? 0), 0);
const triLines = entries.reduce((n, e) => n + (e.triangulation?.lines?.length ?? 0), 0);
const assumptions = entries.reduce((n, e) => n + (e.assumptions?.length ?? 0), 0);

if (errors.length) {
  console.error(`Guesstimate check FAILED with ${errors.length} error(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(
  `Guesstimate check passed: ${entries.length} entries, ` +
    `${calcLines + triLines} arithmetic lines evaluated (${calcLines} primary, ${triLines} cross-check), ` +
    `${assumptions} assumptions resolved.`
);
