import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import ts from "typescript";
import { getAvatarReadiness } from "../src/features/digital-avatar/readiness.ts";

// Isolated synthetic responses only. No real account, database, credential or
// provider request is accessed. The actual route is evaluated with auth and
// database module boundaries replaced, preserving its GET implementation.
const fixtureEnv = {
  TAVUS_API_KEY: "synthetic-provider-key",
  TAVUS_FACE_ID: "face_owner",
  TAVUS_PAL_ID: "pal_owner",
  DIGITAL_AVATAR_ENABLED: "false",
};
const face = {
  face_id: "face_owner",
  status: "completed",
  face_type: "user",
  model_name: "phoenix-4.5",
  finetune_status: "started",
  default_voice_id: "voice_face",
  original_voice_id: "voice_face",
  thumbnail_video_url: "https://private.invalid/signed?token=private-url-token",
  face_name: "private-face-name",
};
const voice = {
  voice_id: "voice_pal",
  status: "completed",
  voice_type: "user",
  voice_name: "private-voice-name",
  error_message: "private-upstream-error",
};
const pal = {
  pal_id: "pal_owner",
  pal_type: "user",
  default_face_id: "face_owner",
  system_prompt: "private-teaching-prompt",
  disclosure_type: "always",
  verbal_disclosure: "You are speaking with an AI tutor.",
  visual_disclosure: "AI mentor",
  document_ids: ["private-document-id"],
  layers: {
    perception: { perception_model: "off" },
    tts: { voice_id: "voice_pal", api_key: "private-tts-key" },
    llm: {
      api_key: "private-llm-key",
      base_url: "https://private.invalid/llm",
      headers: { Authorization: "private-llm-header" },
    },
  },
};
const privateValues = [
  fixtureEnv.TAVUS_API_KEY,
  "private-url-token",
  "private-face-name",
  "private-voice-name",
  "private-teaching-prompt",
  "private-document-id",
  "private-tts-key",
  "private-llm-key",
  "private-llm-header",
  "private-upstream-error",
  "private.invalid",
];
const checks = [];

function fixtureFetch(options = {}, calls = []) {
  return async (input, init) => {
    const url = new URL(String(input));
    assert.equal(url.origin, "https://tavusapi.com");
    assert.ok(/^\/v2\/(faces|voices|pals)(\/[A-Za-z0-9_-]{3,100})?$/.test(url.pathname));
    assert.equal(init.method, "GET");
    assert.equal(init.redirect, "error");
    assert.equal(init.cache, "no-store");
    assert.equal(new Headers(init.headers).get("x-api-key"), fixtureEnv.TAVUS_API_KEY);
    assert.equal(init.body, undefined);
    assert.ok(init.signal);
    calls.push(url.toString());
    if (options.throw) throw new Error("private-upstream-error synthetic-provider-key");
    if (options.response) return options.response(url);
    if (options.denied) return new Response("private-upstream-error", { status: 401 });
    let result;
    if (url.pathname === "/v2/faces")
      result = {
        data: options.empty ? [] : [options.face ?? face],
        total_count: options.empty ? 0 : (options.total ?? 1),
      };
    else if (url.pathname === "/v2/voices") {
      assert.equal(url.searchParams.get("source"), "user");
      result = {
        data: options.empty ? [] : [options.voice ?? voice],
        total_count: options.empty ? 0 : 1,
      };
    } else if (url.pathname === "/v2/pals")
      result = {
        data: options.empty ? [] : [options.pal ?? pal],
        total_count: options.empty ? 0 : 1,
      };
    else if (url.pathname.startsWith("/v2/faces/"))
      result = options.selectedFace ?? options.face ?? face;
    else if (url.pathname.startsWith("/v2/pals/"))
      result = options.selectedPal ?? options.pal ?? pal;
    else result = { ...(options.voice ?? voice), voice_id: url.pathname.split("/").at(-1) };
    return Response.json(result);
  };
}
async function run(name, options = {}, verify = () => {}) {
  const calls = [];
  const env = { ...fixtureEnv, ...options.env };
  const before = JSON.stringify(env);
  const result = await getAvatarReadiness(env, fixtureFetch(options, calls));
  const serialized = JSON.stringify(result);
  for (const privateValue of privateValues)
    assert.ok(!serialized.includes(privateValue), `Sensitive value exposed in ${name}`);
  assert.equal(result.launchApproved, false);
  assert.equal(result.personalIdentityVerified, false);
  assert.equal(result.accountPlan.status, "unverified");
  assert.equal(result.readOnly, true);
  assert.equal(JSON.stringify(env), before);
  verify(result, calls);
  checks.push(name);
}

await run("Absent key performs no provider reads", { env: { TAVUS_API_KEY: "" } }, (r, c) => {
  assert.equal(c.length, 0);
  assert.equal(r.credentialReadAccess, "not-configured");
});
await run(
  "Key-only discovery verifies empty account resources without claiming training",
  { empty: true, env: { TAVUS_FACE_ID: "", TAVUS_PAL_ID: "" } },
  (r, c) => {
    assert.equal(c.length, 3);
    assert.equal(r.credentialReadAccess, "verified");
    assert.equal(r.discovery.faces.totalCount, 0);
    assert.equal(r.selected.configuredResourcesUsable, false);
  }
);
await run("Configured resources use PAL voice precedence and safe projection", {}, (r, c) => {
  assert.equal(c.length, 6);
  assert.equal(r.selected.configuredResourcesUsable, true);
  assert.ok(c.some((u) => u.endsWith("/voices/voice_pal")));
  assert.ok(!c.some((u) => u.endsWith("/voices/voice_face")));
  assert.equal(r.selected.face.resource.finetune_status, "started");
});
await run(
  "Face default applies without a PAL voice override",
  { pal: { ...pal, layers: { ...pal.layers, tts: {} } } },
  (r, c) => {
    assert.equal(r.selected.effectiveVoice.resource.voice_id, "voice_face");
    assert.ok(c.some((u) => u.endsWith("/voices/voice_face")));
  }
);
await run(
  "External voice cannot establish owner voice readiness",
  {
    pal: {
      ...pal,
      layers: {
        ...pal.layers,
        tts: { external_voice_id: "external_owner", api_key: "private-tts-key" },
      },
    },
  },
  (r, c) => {
    assert.equal(c.length, 5);
    assert.equal(r.selected.configuredResourcesUsable, false);
    assert.equal(r.selected.effectiveVoice.resource, null);
  }
);
await run(
  "Conflicting voice selection is not usable",
  {
    pal: {
      ...pal,
      layers: {
        ...pal.layers,
        tts: { voice_id: "voice_pal", external_voice_id: "external_owner" },
      },
    },
  },
  (r) => assert.equal(r.selected.configuredResourcesUsable, false)
);
await run(
  "Stock voice remains distinct from a trained owner voice",
  { voice: { ...voice, voice_type: "system" } },
  (r) => assert.equal(r.selected.configuredResourcesUsable, false)
);
await run("Pending Face cannot be used", { face: { ...face, status: "started" } }, (r) =>
  assert.equal(r.selected.configuredResourcesUsable, false)
);
await run(
  "AI disclosure and perception boundaries are required",
  {
    pal: {
      ...pal,
      disclosure_type: "off",
      layers: {
        ...pal.layers,
        perception: { perception_model: "raven-1", emotion_recognition: "auto" },
      },
    },
  },
  (r) => {
    assert.equal(r.selected.configuredResourcesUsable, false);
    assert.equal(r.selected.pal.resource.aiDisclosureClear, false);
  }
);
await run(
  "Unknown or mismatched selected resources are rejected",
  {
    selectedFace: { ...face, face_id: "face_other" },
    selectedPal: { ...pal, pal_id: "pal_other" },
  },
  (r) => {
    assert.equal(r.selected.face.status, "invalid-response");
    assert.equal(r.selected.pal.status, "invalid-response");
    assert.equal(r.selected.face.resource, null);
  }
);
await run(
  "Invalid configured IDs cannot choose endpoints",
  { env: { TAVUS_FACE_ID: "../../secret?url=https://private.invalid", TAVUS_PAL_ID: "" } },
  (r, c) => {
    assert.equal(c.length, 3);
    assert.equal(r.configuration.faceState, "invalid");
    assert.equal(r.configuration.faceId, null);
  }
);
await run("Unauthorized provider response hides raw errors", { denied: true }, (r) => {
  assert.equal(r.credentialReadAccess, "denied");
  assert.equal(r.discovery.faces.status, "unauthorized");
});
await run("Provider network errors remain sanitized", { throw: true }, (r) =>
  assert.equal(r.credentialReadAccess, "unverified")
);
await run(
  "Malformed JSON does not masquerade as empty account",
  {
    response: () =>
      new Response("private-upstream-error", { headers: { "content-type": "application/json" } }),
  },
  (r) => {
    assert.equal(r.credentialReadAccess, "unverified");
    assert.equal(r.discovery.faces.totalCount, null);
  }
);
await run(
  "Missing resource IDs and disguised whitespace are rejected",
  { face: { ...face, face_id: "face_owner\n" } },
  (r) => {
    assert.equal(r.discovery.faces.status, "invalid-response");
    assert.equal(r.selected.face.resource, null);
  }
);
await run(
  "Oversized declared payload rejected before reading",
  {
    response: () =>
      new Response("private-upstream-error", { headers: { "content-length": "524289" } }),
  },
  (r) => assert.equal(r.discovery.faces.status, "invalid-response")
);
await run(
  "Oversized streaming payload is bounded even without length header",
  { response: () => new Response("x".repeat(524289)) },
  (r) => assert.equal(r.discovery.faces.status, "invalid-response")
);
await run(
  "Unexpected schemas and statuses are quarantined",
  { face: { ...face, status: "connected" } },
  (r) => {
    assert.equal(r.discovery.faces.status, "invalid-response");
    assert.equal(r.selected.face.resource, null);
  }
);
await run("Paginated results disclose incompleteness", { total: 50 }, (r) => {
  assert.equal(r.discovery.faces.complete, false);
  assert.equal(r.discovery.faces.resources.length, 1);
  assert.equal(r.discovery.faces.totalCount, 50);
});
await run("Inconsistent resource count cannot masquerade as an empty account", { total: 0 }, (r) =>
  assert.equal(r.discovery.faces.status, "invalid-response")
);
await run(
  "Mixed endpoint access is partial rather than fully verified",
  {
    response: (url) =>
      url.pathname === "/v2/voices"
        ? new Response("private-upstream-error", { status: 403 })
        : Response.json({ data: [], total_count: 0 }),
  },
  (r) => assert.equal(r.credentialReadAccess, "partial")
);

class LabHttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
class LabUnavailable extends Error {}
let actor = { role: "admin", isDemo: false, mustChangePassword: false };
let routeFetches = 0;
globalThis.__avatarReadinessRouteMocks = {
  LabHttpError,
  LabUnavailable,
  requireActor: async (_headers, role, allowPasswordChange = false) => {
    assert.equal(role, "admin");
    assert.equal(allowPasswordChange, false);
    if (!actor) throw new LabHttpError(401, "Please sign in to continue.");
    if (actor.role !== role) throw new LabHttpError(403, "You do not have access to this area.");
    if (actor.mustChangePassword && !allowPasswordChange)
      throw new LabHttpError(403, "Change your temporary password before continuing.");
    return actor;
  },
  getAvatarReadiness: async () => {
    routeFetches++;
    return getAvatarReadiness(
      { ...fixtureEnv, TAVUS_FACE_ID: "", TAVUS_PAL_ID: "" },
      fixtureFetch({ empty: true })
    );
  },
};
const routePath = "src/app/api/learning-lab/admin/avatar-readiness/route.ts";
const source = await readFile(routePath, "utf8");
assert.ok(!/export\s+(?:async\s+)?function\s+(POST|PUT|PATCH|DELETE)/.test(source));
const isolated = source.replace(/^import .*;\r?\n/gm, "");
const compiled = ts.transpileModule(
  `const {requireActor,LabHttpError,LabUnavailable,getAvatarReadiness}=globalThis.__avatarReadinessRouteMocks;\n${isolated}`,
  { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }
).outputText;
const route = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
async function routeCheck(name, nextActor, status, options = {}) {
  actor = nextActor;
  const before = routeFetches;
  const response = await route.GET(
    new Request(
      `https://example.invalid/api/learning-lab/admin/avatar-readiness${options.query ?? ""}`,
      { headers: options.headers ?? {} }
    )
  );
  assert.equal(response.status, status);
  assert.ok(response.headers.get("cache-control").includes("no-store"));
  assert.equal(response.headers.get("vary"), "Cookie");
  const result = await response.json();
  assert.equal(routeFetches - before, status === 200 ? 1 : 0);
  for (const secret of privateValues) assert.ok(!JSON.stringify(result).includes(secret));
  checks.push(name);
}
await routeCheck("Anonymous caller denied before any provider read", null, 401);
await routeCheck(
  "Learner denied before any provider read",
  { role: "learner", isDemo: false, mustChangePassword: false },
  403
);
await routeCheck(
  "Temporary-password admin denied",
  { role: "admin", isDemo: false, mustChangePassword: true },
  403
);
await routeCheck(
  "Demo admin denied",
  { role: "admin", isDemo: true, mustChangePassword: false },
  403
);
await routeCheck(
  "Permanent admin may run GET-only discovery",
  { role: "admin", isDemo: false, mustChangePassword: false },
  200
);
await routeCheck(
  "Query parameters cannot select resource endpoints",
  { role: "admin", isDemo: false, mustChangePassword: false },
  400,
  { query: "?url=https://private.invalid" }
);
await routeCheck(
  "Cross-site operator request denied",
  { role: "admin", isDemo: false, mustChangePassword: false },
  403,
  { headers: { "sec-fetch-site": "cross-site" } }
);
await routeCheck(
  "Unexpected Origin denied",
  { role: "admin", isDemo: false, mustChangePassword: false },
  403,
  { headers: { origin: "https://private.invalid" } }
);
delete globalThis.__avatarReadinessRouteMocks;
await mkdir("artifacts/learning-lab/digital-guide", { recursive: true });
await writeFile(
  "artifacts/learning-lab/digital-guide/avatar-readiness-results.json",
  JSON.stringify(
    {
      at: new Date().toISOString(),
      status: "PASS",
      mocked: true,
      providerWrites: 0,
      realAccountReads: 0,
      checks,
    },
    null,
    2
  )
);
console.log(
  `PASS ${checks.length} isolated avatar readiness checks; GET-only fixtures, access denial, bounded redaction, no account or provider writes.`
);
