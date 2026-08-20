import { isScriptureSlug } from "@/features/spirituality/data/catalog";
import { queryScriptureEntries } from "@/features/spirituality/data/load-entries";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!isScriptureSlug(slug)) {
    return Response.json({ error: "Unknown scripture." }, { status: 404 });
  }

  const url = new URL(request.url);
  const sequenceParam = url.searchParams.get("sequence");
  const limitParam = url.searchParams.get("limit");
  const offsetParam = url.searchParams.get("offset");
  const sequence = sequenceParam ? Number.parseInt(sequenceParam, 10) : undefined;
  const limit = limitParam ? Number.parseInt(limitParam, 10) : undefined;
  const offset = offsetParam ? Number.parseInt(offsetParam, 10) : undefined;
  const result = await queryScriptureEntries(slug, {
    entryId: url.searchParams.get("entryId") ?? undefined,
    limit: Number.isFinite(limit) ? limit : undefined,
    offset: Number.isFinite(offset) ? offset : undefined,
    query: url.searchParams.get("query") ?? undefined,
    section: url.searchParams.get("section") ?? undefined,
    sequence: Number.isFinite(sequence) ? sequence : undefined,
  });

  return Response.json(result, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
