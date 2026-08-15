import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const imageRoot = path.join(process.cwd(), "public", "images");
const rasterExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const openAiMarkers = [
  Buffer.from("OpenAI Media Service"),
  Buffer.from("OpenAI OpCo, LLC"),
  Buffer.from("DALL-E"),
  Buffer.from("DALL·E"),
];
// aom-2026-with-jp-eggers.png (previously approved here) was re-encoded to
// .jpg for performance — see docs/gallery-asset-provenance.md. Re-encoding
// strips embedded metadata, so the OpenAI marker this entry was approving
// no longer exists in the file; no replacement entry is needed.
const approvedOpenAiAssets = new Map([]);

async function listRasterAssets(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const assets = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) return listRasterAssets(entryPath);
      if (!rasterExtensions.has(path.extname(entry.name).toLowerCase())) return [];

      return [entryPath];
    })
  );

  return assets.flat();
}

const assets = await listRasterAssets(imageRoot);
const flaggedAssets = [];
const verifiedApprovedAssets = new Set();

for (const asset of assets) {
  const bytes = await readFile(asset);
  const relativeAsset = path.relative(process.cwd(), asset).split(path.sep).join("/");

  if (openAiMarkers.some((marker) => bytes.includes(marker))) {
    const actualHash = createHash("sha256").update(bytes).digest("hex");

    if (approvedOpenAiAssets.get(relativeAsset) === actualHash) {
      verifiedApprovedAssets.add(relativeAsset);
      continue;
    }

    flaggedAssets.push(relativeAsset);
  }
}

const unverifiedApprovedAssets = [...approvedOpenAiAssets.keys()].filter(
  (asset) => !verifiedApprovedAssets.has(asset)
);

if (flaggedAssets.length > 0 || unverifiedApprovedAssets.length > 0) {
  const failures = [];

  if (flaggedAssets.length > 0) {
    failures.push(
      `Unapproved OpenAI provenance metadata found in public raster assets:\n${flaggedAssets
        .map((asset) => `- ${asset}`)
        .join("\n")}`
    );
  }

  if (unverifiedApprovedAssets.length > 0) {
    failures.push(
      `Approved OpenAI assets are missing, no longer carry provenance, or do not match their registered SHA-256:\n${unverifiedApprovedAssets
        .map((asset) => `- ${asset}`)
        .join("\n")}`
    );
  }

  throw new Error(failures.join("\n\n"));
}

console.log(
  `Media provenance check passed for ${assets.length} public raster assets (${verifiedApprovedAssets.size} checksum-approved OpenAI asset).`
);
