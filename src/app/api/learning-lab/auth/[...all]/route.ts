import { toNextJsHandler } from "better-auth/next-js";
import { getLabAuth } from "@/features/learning-lab/server/auth";
import { LabUnavailable } from "@/features/learning-lab/server/database";
export const runtime = "nodejs";
const allowed = new Set(["sign-in/email", "sign-out", "get-session"]);
async function handle(request: Request) {
  const action = new URL(request.url).pathname.split("/auth/")[1] || "";
  if (!allowed.has(action))
    return Response.json(
      {
        error: "Public account creation and recovery are not enabled. Contact the pilot organiser.",
      },
      { status: 404 }
    );
  try {
    const handlers = toNextJsHandler(await getLabAuth());
    const response = await (request.method === "GET"
      ? handlers.GET(request)
      : handlers.POST(request));
    response.headers.set("Cache-Control", "no-store");
    response.headers.append("Vary", "Cookie");
    return response;
  } catch (error) {
    if (error instanceof LabUnavailable)
      return Response.json(
        { error: "Learner access is awaiting secure service configuration." },
        { status: 503 }
      );
    return Response.json(
      { error: "Sign-in is temporarily unavailable. Please try again." },
      { status: 503 }
    );
  }
}
export const GET = handle;
export const POST = handle;
