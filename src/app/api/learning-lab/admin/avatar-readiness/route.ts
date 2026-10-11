import { requireActor, LabHttpError } from "@/features/learning-lab/server/auth";
import { LabUnavailable } from "@/features/learning-lab/server/database";
import { getAvatarReadiness } from "@/features/digital-avatar/readiness";

export const runtime = "nodejs";

const json = (data: unknown, status = 200) =>
  Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store, private",
      Vary: "Cookie",
      "X-Content-Type-Options": "nosniff",
    },
  });

export async function GET(request: Request) {
  try {
    const actor = await requireActor(request.headers, "admin");
    if (actor.isDemo) throw new LabHttpError(403, "A permanent operator account is required.");
    const url = new URL(request.url);
    if (url.search) throw new LabHttpError(400, "This check does not accept query parameters.");
    const origin = request.headers.get("origin");
    if (request.headers.get("sec-fetch-site") === "cross-site" || (origin && origin !== url.origin))
      throw new LabHttpError(403, "Open this check from the Lab operator workspace.");
    return json(await getAvatarReadiness());
  } catch (error) {
    if (error instanceof LabHttpError) return json({ error: error.message }, error.status);
    if (error instanceof LabUnavailable)
      return json({ error: "The protected Lab service is unavailable." }, 503);
    return json({ error: "The read-only avatar check could not complete." }, 503);
  }
}
