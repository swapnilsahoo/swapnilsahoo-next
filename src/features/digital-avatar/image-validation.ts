import "server-only";
import { createHash } from "node:crypto";
import { z } from "zod";
import { LabHttpError, type LabActor } from "@/features/learning-lab/server/errors";

const maximumImageBytes = 3 * 1024 * 1024;
// Exact native owner photograph already reviewed privately for dimensions and
// metadata. A different file requires a fresh review, not a caller-supplied URL.
const approvedImageSha256 = "47abc08ab172bab03f439da38f9c93d1a32db92c1c52c135fc56e33b29f929a3";
const validationSchema = z
  .object({
    passed: z.boolean(),
    checks: z
      .array(z.object({ id: z.string().regex(/^[a-z][a-z0-9_]{0,79}$/), passed: z.boolean() }))
      .min(1)
      .max(30),
  })
  .refine(
    ({ passed, checks }) =>
      passed === checks.every((check) => check.passed) &&
      new Set(checks.map((check) => check.id)).size === checks.length
  );
const knownChecks = new Set([
  "image_quality_acceptable",
  "human_like_subject",
  "appears_under_18",
  "only_one_person_visible",
  "person_centered",
  "head_fully_in_frame",
  "looking_straight_at_camera",
  "pose_suitable_for_replica",
  "pose_suitable_for_face",
  "face_substantially_obscured",
  "chest_up_framing_acceptable",
  "no_nudity",
  "celebrity_or_copyright_character",
]);
let inFlight = false;

async function boundedBytes(
  body: ReadableStream<Uint8Array> | null,
  limit: number,
  timeout: number
) {
  if (!body) throw new LabHttpError(400, "An image body is required.");
  const reader = body.getReader();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    void reader.cancel().catch(() => {});
  }, timeout);
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (timedOut) throw new LabHttpError(408, "Image validation timed out.");
      if (part.done) break;
      size += part.value.byteLength;
      if (size > limit) {
        void reader.cancel().catch(() => {});
        throw new LabHttpError(413, "The image or validation response is too large.");
      }
      chunks.push(part.value);
    }
    return Buffer.concat(chunks, size);
  } finally {
    clearTimeout(timer);
    reader.releaseLock();
  }
}

// One fixed validation request only: no URLs supplied by callers, no training,
// conversation creation, retries, file storage or raw provider diagnostics.
export async function validateAvatarImage(
  request: Request,
  actor: LabActor,
  env: Record<string, string | undefined> = process.env,
  fetcher: typeof fetch = globalThis.fetch,
  expectedImageSha256 = approvedImageSha256
) {
  if (actor.role !== "admin" || actor.isDemo || actor.mustChangePassword)
    throw new LabHttpError(403, "A permanent operator account is required.");
  const url = new URL(request.url);
  if (request.method !== "POST") throw new LabHttpError(405, "Use POST for image validation.");
  if (url.search) throw new LabHttpError(400, "Image validation does not accept query parameters.");
  if (
    request.headers.get("origin") !== url.origin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  )
    throw new LabHttpError(403, "Open image validation from the Lab operator workspace.");
  if (request.headers.get("x-avatar-validation-consent") !== "tavus-image-validation")
    throw new LabHttpError(422, "Confirm that this image may be sent to Tavus for validation.");
  if (
    request.headers.get("content-type") !== "image/png" ||
    request.headers.has("content-encoding")
  )
    throw new LabHttpError(415, "Send a metadata-free PNG image.");
  const length = request.headers.get("content-length");
  if (length && (!/^\d+$/.test(length) || Number(length) > maximumImageBytes))
    throw new LabHttpError(413, "Use a PNG no larger than 3 MiB.");
  const apiKey = env.TAVUS_API_KEY?.trim();
  if (!apiKey) throw new LabHttpError(503, "The Tavus API key is not configured.");
  if (inFlight)
    throw new LabHttpError(429, "An image validation is already running. Wait for its result.");
  inFlight = true;
  try {
    const image = await boundedBytes(request.body, maximumImageBytes, 10000);
    if (createHash("sha256").update(image).digest("hex") !== expectedImageSha256)
      throw new LabHttpError(
        422,
        "Only the exact privately reviewed owner photograph can be validated."
      );
    try {
      const response = await fetcher("https://tavusapi.com/v2/faces/image-validation", {
        method: "POST",
        headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: image.toString("base64"),
          mimeType: "image/png",
          model: "phoenix-4.5",
        }),
        redirect: "error",
        cache: "no-store",
        signal: AbortSignal.timeout(40000),
      });
      if (!response.ok) {
        void response.body?.cancel().catch(() => {});
        if ([401, 403].includes(response.status))
          throw new LabHttpError(503, "The configured Tavus key cannot perform image validation.");
        if (response.status === 422)
          throw new LabHttpError(422, "Tavus did not accept this image for validation.");
        if (response.status === 429)
          throw new LabHttpError(
            429,
            "Tavus image validation is rate limited. No automatic retry was made."
          );
        throw new Error("Validation unavailable");
      }
      const data = validationSchema.safeParse(
        JSON.parse((await boundedBytes(response.body, 65536, 5000)).toString("utf8"))
      );
      if (!data.success) throw new Error("Invalid validation result");
      return {
        provider: "tavus",
        model: "phoenix-4.5",
        completed: true,
        passed: data.data.passed,
        checks: data.data.checks.map((check, index) => ({
          id: knownChecks.has(check.id) ? check.id : `other_check_${index + 1}`,
          passed: check.passed,
        })),
        checkedAt: new Date().toISOString(),
        trainingStarted: false,
        faceCreated: false,
      };
    } catch (error) {
      if (error instanceof LabHttpError && [422, 429, 503].includes(error.status)) throw error;
      throw new LabHttpError(
        502,
        "Tavus image validation did not complete. No automatic retry or training was started."
      );
    }
  } finally {
    inFlight = false;
  }
}
