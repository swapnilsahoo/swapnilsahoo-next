import "server-only";
import { z } from "zod";

const resourceId = z
  .string()
  .regex(/^[A-Za-z0-9_-]{3,100}$/)
  .refine((value) => value.trim() === value);
const resourceStatus = z.enum(["started", "completed", "error"]);
const faceSchema = z.object({
  face_id: resourceId,
  status: resourceStatus,
  face_type: z.enum(["user", "system", "stock"]).optional(),
  model_name: z.enum(["phoenix-4.5", "phoenix-4", "phoenix-3"]).optional(),
  finetune_status: z.enum(["started", "completed", "errored", "error"]).nullable().optional(),
  default_voice_id: resourceId.nullable().optional(),
  original_voice_id: resourceId.nullable().optional(),
});
const voiceSchema = z.object({
  voice_id: resourceId,
  status: resourceStatus,
  voice_type: z.enum(["user", "system"]).optional(),
});
const palSchema = z.object({
  pal_id: resourceId,
  pal_type: z.enum(["user", "system"]).optional(),
  default_face_id: resourceId.nullable().optional(),
  system_prompt: z.string().max(100000).optional(),
  disclosure_type: z.enum(["always", "auto", "off"]).optional(),
  verbal_disclosure: z.string().max(10000).nullable().optional(),
  visual_disclosure: z.string().max(10000).nullable().optional(),
  layers: z
    .object({
      perception: z
        .object({
          perception_model: z.string().max(100).optional(),
          emotion_recognition: z.string().max(100).optional(),
        })
        .optional(),
      tts: z
        .object({
          voice_id: resourceId.nullable().optional(),
          external_voice_id: z.string().max(100).nullable().optional(),
        })
        .optional(),
    })
    .optional(),
});

type Environment = Record<string, string | undefined>;
type ReadStatus = "verified" | "unauthorized" | "not-found" | "unavailable" | "invalid-response";
type ReadResult<T> = { status: ReadStatus; resource: T | null };
const maximumBytes = 512 * 1024;
const pageSize = 10;

// Raw provider JSON can contain private signed URLs, prompts and external
// service credentials. It is bounded in memory, schema-checked, projected and
// discarded; it is never returned, persisted or logged.
async function readJson(endpoint: string, apiKey: string, fetcher: typeof fetch) {
  try {
    const response = await fetcher(`https://tavusapi.com/v2/${endpoint}`, {
      method: "GET",
      headers: { "x-api-key": apiKey, Accept: "application/json" },
      redirect: "error",
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      await response.body?.cancel();
      const status: ReadStatus = [401, 403].includes(response.status)
        ? "unauthorized"
        : response.status === 404
          ? "not-found"
          : "unavailable";
      return { status, data: null };
    }
    const length = response.headers.get("content-length");
    if (length && (!/^\d+$/.test(length) || Number(length) > maximumBytes)) {
      await response.body?.cancel();
      return { status: "invalid-response" as const, data: null };
    }
    const reader = response.body?.getReader();
    if (!reader) return { status: "invalid-response" as const, data: null };
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
      while (true) {
        const part = await reader.read();
        if (part.done) break;
        size += part.value.byteLength;
        if (size > maximumBytes) {
          await reader.cancel();
          return { status: "invalid-response" as const, data: null };
        }
        chunks.push(part.value);
      }
    } finally {
      reader.releaseLock();
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    try {
      return {
        status: "verified" as const,
        data: JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)) as unknown,
      };
    } catch {
      return { status: "invalid-response" as const, data: null };
    }
  } catch {
    return { status: "unavailable" as const, data: null };
  }
}

async function readResource<T extends z.ZodType>(
  endpoint: string,
  apiKey: string,
  schema: T,
  fetcher: typeof fetch
): Promise<ReadResult<z.output<T>>> {
  const result = await readJson(endpoint, apiKey, fetcher);
  if (result.status !== "verified") return { status: result.status, resource: null };
  const parsed = schema.safeParse(result.data);
  return parsed.success
    ? { status: "verified", resource: parsed.data }
    : { status: "invalid-response", resource: null };
}

const identifiesAi = (value: string | null | undefined) =>
  !value?.trim() || /\bAI\b|artificial intelligence|synthetic|AI[- ]generated/i.test(value);
function projectPal(pal: z.output<typeof palSchema>) {
  const perception = pal.layers?.perception;
  const tts = pal.layers?.tts;
  return {
    pal_id: pal.pal_id,
    pal_type: pal.pal_type ?? null,
    default_face_id: pal.default_face_id ?? null,
    hasSystemPrompt: Boolean(pal.system_prompt?.trim()),
    disclosureType: pal.disclosure_type ?? null,
    aiDisclosureClear:
      pal.disclosure_type === "always" &&
      identifiesAi(pal.verbal_disclosure) &&
      identifiesAi(pal.visual_disclosure),
    perceptionBoundary:
      perception?.perception_model === "off"
        ? ("off" as const)
        : perception?.emotion_recognition === "limited"
          ? ("limited" as const)
          : ("not-confirmed" as const),
    voiceSelection:
      tts?.voice_id && tts.external_voice_id
        ? ("conflicting" as const)
        : tts?.external_voice_id
          ? ("external" as const)
          : tts?.voice_id
            ? ("tavus" as const)
            : ("face-default" as const),
    tavus_voice_id: tts?.voice_id ?? null,
  };
}

async function listResources<T extends z.ZodType>(
  endpoint: string,
  apiKey: string,
  schema: T,
  fetcher: typeof fetch
) {
  const result = await readResource(
    endpoint,
    apiKey,
    z
      .object({
        data: z.array(schema).max(pageSize),
        total_count: z.number().int().min(0).max(10000000),
      })
      .refine((value) => value.total_count >= value.data.length),
    fetcher
  );
  return {
    status: result.status,
    resources: result.resource?.data ?? [],
    totalCount: result.resource?.total_count ?? null,
    complete: result.resource ? result.resource.total_count <= result.resource.data.length : false,
  };
}

export async function getAvatarReadiness(
  env: Environment = process.env,
  fetcher: typeof fetch = globalThis.fetch
) {
  const apiKey = env.TAVUS_API_KEY?.trim() ?? "";
  const faceSetting = env.TAVUS_FACE_ID?.trim() ?? "";
  const palSetting = env.TAVUS_PAL_ID?.trim() ?? "";
  const faceId = resourceId.safeParse(faceSetting);
  const palId = resourceId.safeParse(palSetting);
  const base = {
    provider: "tavus" as const,
    readOnly: true,
    checkedAt: new Date().toISOString(),
    keyConfigured: Boolean(apiKey),
    liveEnabled: env.DIGITAL_AVATAR_ENABLED === "true",
    personalIdentityVerified: false,
    launchApproved: false,
    accountPlan: {
      status: "unverified",
      reason:
        "No documented public quota or billing GET endpoint was used. Check the signed-in account's entitlement, price and spending settings.",
    },
    limitations: [
      "Read access does not establish a user-scoped voice-creation key or paid training entitlement.",
      "Resource completion does not establish the owner's identity, consent or audiovisual quality.",
      "This check never trains, purchases, creates a PAL or starts a conversation; it never changes activation flags.",
    ],
    configuration: {
      faceId: faceId.success ? faceId.data : null,
      palId: palId.success ? palId.data : null,
      faceState: !faceSetting ? "absent" : faceId.success ? "configured" : "invalid",
      palState: !palSetting ? "absent" : palId.success ? "configured" : "invalid",
    },
  };
  if (!apiKey)
    return { ...base, credentialReadAccess: "not-configured", discovery: null, selected: null };

  const [faces, voices, pals, faceRead, palRead] = await Promise.all([
    listResources("faces?face_type=user&verbose=true&limit=10&page=1", apiKey, faceSchema, fetcher),
    listResources("voices?source=user&limit=10&page=1", apiKey, voiceSchema, fetcher),
    listResources("pals?pal_type=user&limit=10&page=1", apiKey, palSchema, fetcher),
    faceId.success
      ? readResource(
          `faces/${encodeURIComponent(faceId.data)}?verbose=true`,
          apiKey,
          faceSchema,
          fetcher
        )
      : null,
    palId.success
      ? readResource(`pals/${encodeURIComponent(palId.data)}`, apiKey, palSchema, fetcher)
      : null,
  ]);
  const face =
    faceRead?.resource?.face_id === (faceId.success ? faceId.data : null)
      ? faceRead.resource
      : null;
  const pal =
    palRead?.resource?.pal_id === (palId.success ? palId.data : null) ? palRead.resource : null;
  const palProjection = pal ? projectPal(pal) : null;
  const effectiveVoiceId =
    palProjection?.voiceSelection === "external" || palProjection?.voiceSelection === "conflicting"
      ? null
      : palProjection?.tavus_voice_id || face?.default_voice_id || null;
  const voiceRead = effectiveVoiceId
    ? await readResource(
        `voices/${encodeURIComponent(effectiveVoiceId)}`,
        apiKey,
        voiceSchema,
        fetcher
      )
    : null;
  const effectiveVoice =
    voiceRead?.resource?.voice_id === effectiveVoiceId ? voiceRead.resource : null;
  const access = [faces.status, voices.status, pals.status];
  const verified = access.filter((status) => status === "verified").length;
  return {
    ...base,
    credentialReadAccess:
      verified === 3
        ? "verified"
        : verified
          ? "partial"
          : access.includes("unauthorized")
            ? "denied"
            : "unverified",
    discovery: { faces, voices, pals: { ...pals, resources: pals.resources.map(projectPal) } },
    selected: {
      face: {
        status: faceRead
          ? face
            ? "verified"
            : faceRead.status === "verified"
              ? "invalid-response"
              : faceRead.status
          : "not-configured",
        resource: face,
      },
      pal: {
        status: palRead
          ? pal
            ? "verified"
            : palRead.status === "verified"
              ? "invalid-response"
              : palRead.status
          : "not-configured",
        resource: palProjection,
      },
      effectiveVoice: {
        status: voiceRead
          ? effectiveVoice
            ? "verified"
            : voiceRead.status === "verified"
              ? "invalid-response"
              : voiceRead.status
          : "not-configured",
        resource: effectiveVoice,
      },
      configuredResourcesUsable: Boolean(
        face?.face_type === "user" &&
        face.status === "completed" &&
        palProjection?.hasSystemPrompt &&
        palProjection.aiDisclosureClear &&
        palProjection.perceptionBoundary !== "not-confirmed" &&
        effectiveVoice?.status === "completed" &&
        effectiveVoice.voice_type === "user"
      ),
    },
  };
}
