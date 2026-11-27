// Shared link checks for Learning Lab content tests (journey, services).
// Static: every internal href resolves to a real route file, and dynamic routes to a real slug.
// Optional: with LAB_BASE_URL set to a local server, each page is fetched and every #fragment
// must exist in the rendered HTML.
import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import path from "node:path";
import { freeCourses } from "../src/features/learning-lab/free-courses.ts";
import { learningPaths } from "../src/features/learning-lab/catalogue.ts";
import { weeklyNotes } from "../src/features/learning-lab/weekly-notes.ts";
import { programmes } from "../src/features/learning-lab/programmes.ts";
import { toolkitTools } from "../src/features/learning-lab/founder-toolkit.ts";
import { researchBranches } from "../src/features/research/data/researchAgenda.ts";

const dynamicRoutes = [
  ["/learning-lab/free-courses/", freeCourses, "src/app/learning-lab/free-courses/[slug]/page.tsx"],
  ["/learning-lab/paths/", learningPaths, "src/app/learning-lab/paths/[slug]/page.tsx"],
  ["/learning-lab/weekly-notes/", weeklyNotes, "src/app/learning-lab/weekly-notes/[slug]/page.tsx"],
  ["/learning-lab/programmes/", programmes, "src/app/learning-lab/programmes/[slug]/page.tsx"],
];

export function routeSource(root, pathname) {
  const slug = pathname.split("/").filter(Boolean).at(-1);
  if (pathname.endsWith(".html")) return path.join(root, "public", pathname);
  for (const [prefix, items, file] of dynamicRoutes)
    if (pathname.startsWith(prefix)) {
      assert.ok(items.some((item) => item.slug === slug), `${pathname}: "${slug}" exists`);
      return path.join(root, file);
    }
  if (pathname.startsWith("/learning-lab/toolkit/"))
    assert.ok(toolkitTools.some((tool) => tool.slug === slug), `Toolkit tool exists: ${slug}`);
  if (/^\/research\/[^/]+$/.test(pathname) && slug !== "phd-coursework") {
    assert.ok(researchBranches.some((branch) => branch.slug === slug), `Research branch exists: ${slug}`);
    return path.join(root, "src/app/research/[slug]/page.tsx");
  }
  return path.join(root, "src/app", pathname, "page.tsx");
}

/**
 * Checks internal links. Returns the fetched HTML by pathname (empty without LAB_BASE_URL)
 * and a sentence describing what was checked.
 */
export async function checkLabLinks(links, { root = process.cwd(), extraPages = [] } = {}) {
  for (const href of links) {
    assert.ok(href.startsWith("/") && !href.startsWith("//"), `Internal link: ${href}`);
    await access(routeSource(root, href.split("#")[0]));
  }
  const pages = new Map();
  const base = process.env.LAB_BASE_URL;
  if (!base)
    return { pages, note: "fragments not checked (set LAB_BASE_URL to a local server to check them)" };
  const url = new URL(base);
  assert.ok(["localhost", "127.0.0.1", "[::1]"].includes(url.hostname), "LAB_BASE_URL must be a local server");
  for (const href of [...links, ...extraPages]) {
    const [pathname, fragment] = href.split("#");
    if (!pages.has(pathname)) {
      const response = await fetch(new URL(pathname, url), { redirect: "manual" });
      assert.equal(response.status, 200, `${pathname} returns 200`);
      pages.set(pathname, await response.text());
    }
    if (fragment)
      assert.ok(pages.get(pathname).includes(`id="${fragment}"`), `${href}: #${fragment} exists on the rendered page`);
  }
  return { pages, note: `${pages.size} rendered pages and every #fragment checked at ${url.origin}` };
}
