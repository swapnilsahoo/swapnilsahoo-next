import { isScriptureSlug } from "@/features/spirituality/data/catalog";
import { queryScriptureEntries } from "@/features/spirituality/data/load-entries";

/**
 * Only GET is exported, so Next answers every other method with 405 — the reader
 * is a read-only view over static corpora and nothing here mutates state.
 */

/** Longest query string we will even parse, before touching the corpus. */
const MAX_URL_LENGTH = 2048;

/** Parses a bounded integer, returning undefined for anything malformed. */
function readInt(value: string | null, max: number) {
  if (value === null || value.length > 12) return undefined;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > max) return undefined;
  return parsed;
}

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!isScriptureSlug(slug)) {
    return Response.json({ error: "Unknown scripture." }, { status: 404 });
  }

  if (request.url.length > MAX_URL_LENGTH) {
    return Response.json({ error: "Request too long." }, { status: 414 });
  }

  const url = new URL(request.url);

  try {
    const result = await queryScriptureEntries(slug, {
      entryId: url.searchParams.get("entryId") ?? undefined,
      limit: readInt(url.searchParams.get("limit"), 1_000),
      offset: readInt(url.searchParams.get("offset"), 1_000_000),
      query: url.searchParams.get("query") ?? undefined,
      section: url.searchParams.get("section") ?? undefined,
      sequence: readInt(url.searchParams.get("sequence"), 1_000_000),
    });

    return Response.json(result, {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    // Corpus loading touches the filesystem; keep the reason in the server log
    // and hand the client a message with nothing internal in it.
    console.error(`[spirituality] entries query failed for "${slug}"`, error);
    return Response.json({ error: "That selection could not be loaded." }, { status: 500 });
  }
}
