import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const publicRoot = path.resolve(process.cwd(), "public");
const lessonFiles = [
  "teaching/1-year-mba/session1.html",
  "teaching/1-year-mba/session3.html",
  "teaching/1-year-mba/session4.html",
  "teaching/1-year-mba/Session6_Business Strategy_Differentiation, CostLeadership_BlueOceans_v0.8.html",
  "teaching/1-year-mba/Session_7_Business_Strategy_Innovation_Entrepreneurship_Platforms_V0.003.html",
  "teaching/1-year-mba/Session8_Corporate Strategy_v0.8.html",
  "teaching/1-year-mba/Session_10_Global_Strategy_v0.84.html",
  "teaching/2-year-mba/session-01-what-is-strategy.html",
  "teaching/2-year-mba/session-04-purpose-values-strategy-tesla.html",
  "teaching/2-year-mba/session-05-external-analysis-porter-five-forces.html",
  "teaching/2-year-mba/session-09-internal-analysis.html",
  "teaching/2-year-mba/session-12-generic-strategies-and-blue-ocean-strategy.html",
  "teaching/2-year-mba/session-13-business-strategy-innovation-entrepreneurship-platforms.html",
  "teaching/2-year-mba/session-14-corporate-strategy-vertical-integration-and-diversification.html",
  "teaching/2-year-mba/session-15-corporate-strategy-strategic-alliances-mergers-acquisitions.html",
  "teaching/2-year-mba/session-16-global-strategy-competing-around-the-world.html",
  "teaching/2-year-mba/session-17-organizational-design-structure-culture-control.html",
];

async function existsWithExactCase(absolutePath) {
  const relativePath = path.relative(publicRoot, absolutePath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) return false;

  let cursor = publicRoot;
  for (const segment of relativePath.split(path.sep).filter(Boolean)) {
    let children;
    try {
      children = await readdir(cursor);
    } catch {
      return false;
    }
    if (!children.includes(segment)) return false;
    cursor = path.join(cursor, segment);
  }
  return true;
}

function resolveLocalAsset(htmlFile, source) {
  const cleanSource = decodeURIComponent(source.split(/[?#]/, 1)[0]);
  if (cleanSource.startsWith("/")) {
    return path.resolve(publicRoot, cleanSource.replace(/^[/\\]+/, ""));
  }
  return path.resolve(path.dirname(htmlFile), cleanSource);
}

const failures = [];
let imageCount = 0;

for (const relativeFile of lessonFiles) {
  const htmlFile = path.resolve(publicRoot, relativeFile);
  const html = await readFile(htmlFile, "utf8");

  for (const [index, match] of Array.from(html.matchAll(/<img\b[^>]*>/giu)).entries()) {
    imageCount += 1;
    const tag = match[0];
    const sourceMatch = tag.match(/\bsrc\s*=\s*(["'])(.*?)\1/iu);
    const source = sourceMatch?.[2].trim() ?? "";

    if (!source) {
      failures.push(`${relativeFile}: image ${index + 1} has no usable src`);
      continue;
    }
    if (/^(?:data:|https?:|blob:)/iu.test(source) || source.includes("${")) continue;

    let absoluteAsset;
    try {
      absoluteAsset = resolveLocalAsset(htmlFile, source);
    } catch {
      failures.push(`${relativeFile}: image ${index + 1} has an invalid src: ${source}`);
      continue;
    }

    if (!(await existsWithExactCase(absoluteAsset))) {
      failures.push(`${relativeFile}: missing local image: ${source}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Teaching lesson asset check failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Teaching lesson asset check passed: ${lessonFiles.length} linked lessons and ${imageCount} image references.`
  );
}
