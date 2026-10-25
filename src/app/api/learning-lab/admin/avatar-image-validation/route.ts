import { requireActor, LabHttpError } from "@/features/learning-lab/server/auth";
import { LabUnavailable } from "@/features/learning-lab/server/database";
import { validateAvatarImage } from "@/features/digital-avatar/image-validation";

export const runtime = "nodejs";
export const maxDuration = 60;

const json = (data: unknown, status = 200) =>
  Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store, private",
      Vary: "Cookie",
      "X-Content-Type-Options": "nosniff",
    },
  });

export async function POST(request: Request) {
  try {
    const actor = await requireActor(request.headers, "admin");
    return json(await validateAvatarImage(request, actor));
  } catch (error) {
    if (error instanceof LabHttpError) return json({ error: error.message }, error.status);
    if (error instanceof LabUnavailable)
      return json({ error: "The protected Lab service is unavailable." }, 503);
    return json({ error: "Image validation could not complete." }, 503);
  }
}
