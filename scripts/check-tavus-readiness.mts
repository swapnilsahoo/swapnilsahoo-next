import { pathToFileURL } from "node:url";

const baseUrl = "https://tavusapi.com/v2/";
const resourceId = /^[a-zA-Z0-9_-]{3,100}$/;
type Environment = Record<string, string | undefined>;
type JsonObject = Record<string, unknown>;
type Check = { name: string; status: "pass" | "warning"; message: string; blocking: boolean };
export type TavusReadinessReport = {
  apiReady: boolean;
  ownerReviewRequired: true;
  launchApproved: false;
  exitCode: 0 | 1 | 2;
  checks: Check[];
};

function object(value: unknown): JsonObject | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonObject)
    : undefined;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

// Only fixed endpoint paths and privately configured IDs are accepted. The
// response stays in memory; raw provider objects and error text never escape.
async function readResource(endpoint: string, apiKey: string, fetcher: typeof fetch) {
  try {
    const response = await fetcher(`${baseUrl}${endpoint}`, {
      method: "GET",
      headers: { "x-api-key": apiKey },
      redirect: "error",
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      await response.body?.cancel();
      const reason = [401, 403].includes(response.status)
        ? "The private credential cannot read this resource; verify account access."
        : response.status === 404
          ? "The configured resource was not found in this account."
          : "The provider did not return this resource successfully. Try a read-only check later.";
      return { data: undefined, reason };
    }
    const data = object(await response.json());
    return { data, reason: data ? "" : "The provider returned an invalid resource object." };
  } catch {
    return {
      data: undefined,
      reason: "The read-only provider check could not complete. No conversation was started.",
    };
  }
}

export async function checkTavusReadiness(
  env: Environment = process.env,
  fetcher: typeof fetch = globalThis.fetch
): Promise<TavusReadinessReport> {
  const checks: Check[] = [];
  const pass = (name: string, message: string) =>
    checks.push({ name, status: "pass", message, blocking: false });
  const warn = (name: string, message: string, blocking = false) =>
    checks.push({ name, status: "warning", message, blocking });
  const apiKey = text(env.TAVUS_API_KEY);
  const faceId = text(env.TAVUS_FACE_ID);
  const palId = text(env.TAVUS_PAL_ID);
  const missing = !apiKey || !resourceId.test(faceId) || !resourceId.test(palId);
  if (missing) {
    warn(
      "Private configuration",
      "Set private TAVUS_API_KEY, TAVUS_FACE_ID and TAVUS_PAL_ID with valid resource IDs. Values are not printed; no provider request was made.",
      true
    );
  } else {
    const [faceRead, palRead] = await Promise.all([
      readResource(`faces/${encodeURIComponent(faceId)}?verbose=true`, apiKey, fetcher),
      readResource(`pals/${encodeURIComponent(palId)}`, apiKey, fetcher),
    ]);
    const face = faceRead.data;
    const pal = palRead.data;
    const validFace = face?.face_id === faceId;
    const validPal = pal?.pal_id === palId;
    if (!validFace) {
      warn(
        "Face access",
        face
          ? "The Face response did not match the configured resource. Verify the private Face ID."
          : faceRead.reason,
        true
      );
    } else {
      if (face.status === "completed") {
        pass(
          "Face usability",
          "The configured Face reports completed and is usable according to the API."
        );
      } else {
        warn(
          "Face usability",
          face.status === "started"
            ? "The Face is still being created; do not enable the personal avatar yet."
            : "The Face does not report completed. Inspect training errors or status privately.",
          true
        );
      }
      if (face.model_name === "phoenix-4.5") {
        if (face.finetune_status === "completed") {
          pass("Face tuning", "Phoenix-4.5 background tuning reports completed.");
        } else {
          warn(
            "Face tuning",
            "Phoenix-4.5 completed usability means preview ready, not fully tuned. Background tuning is not confirmed complete; an owner-approved preview must be labelled accurately."
          );
        }
      } else if (["phoenix-4", "phoenix-3"].includes(text(face.model_name))) {
        pass(
          "Face model",
          "This earlier Phoenix model does not use the Phoenix-4.5 background-tuning field."
        );
      } else {
        warn(
          "Face model",
          "The model could not be matched to the checked Phoenix status rules. Review its current provider requirements privately."
        );
      }
      if (face.face_type === "user") {
        pass(
          "Face resource",
          "The Face is account-created. This field does not prove that it depicts the owner or that consent verification is complete."
        );
      } else if (["system", "stock"].includes(text(face.face_type))) {
        warn(
          "Owner likeness",
          "A stock Face is selected. It may support a provider test, but it is not the requested personal owner avatar.",
          true
        );
      } else {
        warn(
          "Owner likeness",
          "The API did not establish an account-created Face type. Inspect the selected likeness and rights privately."
        );
      }
    }
    if (!validPal) {
      warn(
        "PAL access",
        pal
          ? "The PAL response did not match the configured resource. Verify the private PAL ID."
          : palRead.reason,
        true
      );
    } else {
      pass(
        "Live PAL access",
        "The live PAL was read successfully. Maker drafts are not included in this API response."
      );
      if (text(pal.system_prompt)) {
        pass(
          "PAL instructions",
          "A system prompt is present. Its teaching boundaries, approved sources and tools still need private owner review; its contents are not printed."
        );
      } else {
        warn(
          "PAL instructions",
          "No usable teaching system prompt was found. Review the live PAL before public activation.",
          true
        );
      }
      const layers = object(pal.layers);
      const perception = object(layers?.perception);
      if (perception?.perception_model === "off") {
        pass(
          "Perception boundary",
          "Perception is explicitly off, matching the first mentor's no emotion-inference boundary."
        );
      } else if (perception?.emotion_recognition === "limited") {
        pass(
          "Perception boundary",
          "Biometric-derived emotion recognition is explicitly limited. Review any remaining awareness queries and tools privately."
        );
      } else {
        warn(
          "Perception boundary",
          "Set perception_model to off or emotion_recognition to limited in the approved live PAL. Camera blocking alone does not disable Tavus audio emotion analysis; auto is insufficient for this mentor.",
          true
        );
      }
      const verbal = text(pal.verbal_disclosure);
      const visual = text(pal.visual_disclosure);
      const identifiesAi = (value: string) =>
        !value || /\bAI\b|artificial intelligence|synthetic|AI[- ]generated/i.test(value);
      if (pal.disclosure_type === "always" && identifiesAi(verbal) && identifiesAi(visual)) {
        pass(
          "AI disclosure",
          "AI disclosure is always enabled with AI-labelled text or Tavus's default disclosure. Owner review must confirm it remains visible and distinguishes the avatar from a live human call."
        );
      } else {
        warn(
          "AI disclosure",
          "Use disclosure_type always with clear spoken and on-screen AI identity. Review custom disclosure text privately; auto or off does not establish the required always-on identity.",
          true
        );
      }
      const tts = object(layers?.tts);
      const palVoice = text(tts?.voice_id);
      const externalVoice = text(tts?.external_voice_id);
      if (palVoice && externalVoice) {
        warn(
          "Effective voice",
          "Both PAL voice fields are populated, although the current API treats them as mutually exclusive. Resolve the live voice configuration privately.",
          true
        );
      } else if (externalVoice) {
        warn(
          "Effective voice",
          "The PAL selects an external provider voice, overriding the Face default. Its availability, rights and personal-versus-stock identity require private review in that provider; this helper does not contact it.",
          true
        );
      } else {
        const voiceId = palVoice || (validFace ? text(face?.default_voice_id) : "");
        if (!resourceId.test(voiceId)) {
          warn(
            "Effective voice",
            "No valid effective Tavus Voice ID was established from the PAL or Face. Configure and approve the intended voice before activation.",
            true
          );
        } else {
          pass(
            "Effective voice selection",
            palVoice
              ? "The PAL's Tavus voice takes precedence over the Face default. IDs and credentials are not printed."
              : "The Face default supplies the Tavus voice because the PAL has no voice override. IDs and credentials are not printed."
          );
          const voiceRead = await readResource(
            `voices/${encodeURIComponent(voiceId)}`,
            apiKey,
            fetcher
          );
          const voice = voiceRead.data;
          if (voice?.voice_id !== voiceId || voice.status !== "completed") {
            warn(
              "Voice usability",
              voice
                ? "The effective voice is not confirmed as the matching completed resource. Inspect its status privately."
                : voiceRead.reason,
              true
            );
          } else {
            pass("Voice usability", "The effective Tavus Voice reports completed.");
            warn(
              "Voice identity",
              voice.voice_type === "system"
                ? "The effective voice is from the Tavus catalogue. Keep the stock/synthetic voice disclosure; it is not the owner's recorded voice."
                : "A completed voice resource does not prove the owner's voice. Confirm authorised source audio, provider verification and a private listening preview before describing it as personal."
            );
          }
        }
      }
      warn(
        "PAL scope review",
        "Review live instructions, document attachments/tags, tools, skills, language, retention and recording settings privately. A present prompt is not a security or teaching-quality certification."
      );
    }
  }
  warn(
    "Owner audiovisual review",
    "Owner likeness/voice consent and an approved audiovisual preview are still required. This helper performs no training, purchase, test conversation, database write or automatic activation."
  );
  warn(
    "Production activation",
    "Review actual quota and approved spending, private website configuration, persistent storage and end-to-end microphone/session cleanup before public activation. Readiness output does not enable the avatar."
  );
  const apiReady = !checks.some((check) => check.blocking);
  return {
    apiReady,
    ownerReviewRequired: true,
    launchApproved: false,
    exitCode: missing ? 2 : apiReady ? 0 : 1,
    checks,
  };
}

export function formatTavusReadiness(report: TavusReadinessReport): string {
  return [
    "Tavus readiness: read-only resource checks; no conversations or training.",
    ...report.checks.map(
      (check) =>
        `${check.status.toUpperCase()} ${check.name}${check.blocking ? " [blocks readiness]" : ""}: ${check.message}`
    ),
    report.apiReady
      ? "PASS Read-only resource checks found no blocking issue. Owner review and website launch readiness remain outstanding."
      : "WARNING API/resource readiness is not established. Keep public live video disabled.",
  ].join("\n");
}

// Imports are inert for mocked tests. No dotenv loading or configuration writes.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const report = await checkTavusReadiness();
    console.log(formatTavusReadiness(report));
    process.exitCode = report.exitCode;
  } catch {
    console.log(
      "WARNING Readiness checks could not complete. No account data or raw error was printed; keep public live video disabled."
    );
    process.exitCode = 1;
  }
}
