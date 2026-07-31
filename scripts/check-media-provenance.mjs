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

for (const asset of assets) {
  const bytes = await readFile(asset);

  if (openAiMarkers.some((marker) => bytes.includes(marker))) {
    flaggedAssets.push(path.relative(process.cwd(), asset));
  }
}

if (flaggedAssets.length > 0) {
  throw new Error(
    `OpenAI provenance metadata found in public raster assets:\n${flaggedAssets
      .map((asset) => `- ${asset}`)
      .join("\n")}`
  );
}

console.log(`Media provenance check passed for ${assets.length} public raster assets.`);
