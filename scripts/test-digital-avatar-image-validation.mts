import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { deflateSync } from "node:zlib";
import { createHash } from "node:crypto";
import ts from "typescript";
import { validateAvatarImage as validateImage } from "../src/features/digital-avatar/image-validation";
import { LabHttpError, type LabActor } from "../src/features/learning-lab/server/errors";

// Synthetic PNGs and provider fixtures only. This suite reads no private image,
// credential or transcript and never contacts an account or external service.
const origin = "https://example.invalid";
const endpoint = `${origin}/api/learning-lab/admin/avatar-image-validation`;
const secret = "synthetic-provider-key-never-return";
const owner: LabActor = {
  id: "synthetic-owner",
  name: "Synthetic owner",
  email: "owner@example.invalid",
  role: "admin",
  isDemo: false,
  mustChangePassword: false,
};
const env = { TAVUS_API_KEY: secret };
const results: string[] = [];
const prohibited = [
  secret,
  "private-provider-error",
  "private-name",
  "private-signed-url",
  "private_check_identifier",
];
const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function crc32(input: Buffer) {
  let crc = 0xffffffff;
  for (const byte of input) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type: string, data = Buffer.alloc(0)) {
  const result = Buffer.alloc(data.length + 12);
  result.writeUInt32BE(data.length, 0);
  result.write(type, 4, "ascii");
  data.copy(result, 8);
  result.writeUInt32BE(crc32(result.subarray(4, -4)), result.length - 4);
  return result;
}
function png(width = 512, height = 512, extra: Buffer[] = [], splits = 1) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 2;
  const compressed = deflateSync(Buffer.alloc((width * 3 + 1) * height));
  const data: Buffer[] = [];
  for (let index = 0; index < splits; index++)
    data.push(
      chunk(
        "IDAT",
        compressed.subarray(
          Math.floor((index * compressed.length) / splits),
          Math.floor(((index + 1) * compressed.length) / splits)
        )
      )
    );
  return Buffer.concat([signature, chunk("IHDR", header), ...extra, ...data, chunk("IEND")]);
}
const image = png();
const imageDigest = createHash("sha256").update(image).digest("hex");
// The dependency is server-only. Production's route supplies no override, while
// isolated tests approve only their synthetic bytes, never the owner's image.
const validateAvatarImage = (
  req: Request,
  actor: LabActor,
  nextEnv = env,
  fetcher: typeof fetch = globalThis.fetch,
  digest = imageDigest
) => validateImage(req, actor, nextEnv, fetcher, digest);
const responseBody = {
  passed: true,
  checks: [
    { id: "image_quality_acceptable", passed: true },
    { id: "only_one_person_visible", passed: true },
  ],
};
function request(
  body: BodyInit | null = image,
  headers: Record<string, string> = {},
  url = endpoint,
  method = "POST"
) {
  return new Request(url, {
    method,
    headers: {
      Origin: origin,
      "Content-Type": "image/png",
      "x-avatar-validation-consent": "tavus-image-validation",
      ...headers,
    },
    ...(method === "GET" || method === "HEAD" ? {} : { body }),
    ...(body instanceof ReadableStream ? { duplex: "half" } : {}),
  } as RequestInit);
}
function provider(
  body: unknown = responseBody,
  hooks: { calls?: unknown[]; response?: () => Response | Promise<Response> } = {}
) {
  return (async (input: RequestInfo | URL, options?: RequestInit) => {
    assert.equal(String(input), "https://tavusapi.com/v2/faces/image-validation");
    assert.equal(options?.method, "POST");
    assert.equal(options?.redirect, "error");
    assert.equal(options?.cache, "no-store");
    assert.ok(options?.signal instanceof AbortSignal);
    const headers = new Headers(options?.headers);
    assert.equal(headers.get("x-api-key"), secret);
    assert.equal(headers.get("content-type"), "application/json");
    const payload = JSON.parse(String(options?.body));
    assert.deepEqual(Object.keys(payload).sort(), ["imageBase64", "mimeType", "model"]);
    assert.equal(payload.model, "phoenix-4.5");
    assert.equal(payload.mimeType, "image/png");
    hooks.calls?.push(payload);
    return hooks.response ? hooks.response() : Response.json(body);
  }) as typeof fetch;
}
async function check(name: string, run: () => Promise<void> | void) {
  await run();
  results.push(name);
}
async function rejected(name: string, status: number, req: Request, actor = owner, nextEnv = env) {
  await check(name, async () => {
    let calls = 0;
    const fetcher = (async () => {
      calls++;
      throw new Error("Unexpected provider call");
    }) as typeof fetch;
    await assert.rejects(
      validateAvatarImage(req, actor, nextEnv, fetcher),
      (error: unknown) => error instanceof LabHttpError && error.status === status
    );
    assert.equal(calls, 0);
  });
}
async function providerRejected(name: string, fetcher: typeof fetch, status = 502) {
  await check(name, async () => {
    await assert.rejects(validateAvatarImage(request(), owner, env, fetcher), (error: unknown) => {
      assert.ok(error instanceof LabHttpError);
      assert.equal(error.status, status);
      for (const value of prohibited) assert.ok(!error.message.includes(value));
      return true;
    });
  });
}

await check("Valid PNG is sent once to the fixed validation endpoint and model", async () => {
  const calls: { imageBase64: string }[] = [];
  const result = await validateAvatarImage(
    request(),
    owner,
    env,
    provider(responseBody, { calls })
  );
  assert.equal(calls.length, 1);
  assert.deepEqual(Buffer.from(calls[0].imageBase64, "base64"), image);
  assert.deepEqual(result.checks, responseBody.checks);
  assert.equal(result.passed, true);
  assert.equal(result.completed, true);
  assert.equal(result.trainingStarted, false);
  assert.equal(result.faceCreated, false);
  assert.ok(Number.isFinite(Date.parse(result.checkedAt)));
});
await check("The full documented check set preserves numeric IDs such as appears_under_18", async () => {
  // Tavus's Validate Face Image example uses these 12 check IDs. Detail flags
  // such as appears_under_18 describe problems; decisions use checks.passed.
  const checks = [
    "image_quality_acceptable",
    "human_like_subject",
    "appears_under_18",
    "only_one_person_visible",
    "person_centered",
    "head_fully_in_frame",
    "looking_straight_at_camera",
    "pose_suitable_for_replica",
    "face_substantially_obscured",
    "chest_up_framing_acceptable",
    "no_nudity",
    "celebrity_or_copyright_character",
  ].map((id) => ({ id, passed: true }));
  const result = await validateAvatarImage(
    request(),
    owner,
    env,
    provider({ passed: true, checks, details: { appears_under_18: false } })
  );
  assert.equal(result.completed, true);
  assert.equal(result.passed, true);
  assert.deepEqual(result.checks, checks);
});
await check("Caller headers cannot change the provider model, URL or API credential", async () => {
  const calls: unknown[] = [];
  const result = await validateAvatarImage(
    request(image, {
      "x-avatar-validation-model": "attacker-model",
      "x-avatar-validation-url": "https://attacker.invalid/training",
      "x-api-key": "attacker-credential",
    }),
    owner,
    env,
    provider(responseBody, { calls })
  );
  assert.equal(result.passed, true);
  assert.equal(calls.length, 1);
});
await rejected("Learner cannot upload", 403, request(), { ...owner, role: "learner" });
await rejected("Demo admin cannot upload", 403, request(), { ...owner, isDemo: true });
await rejected("Temporary admin cannot upload", 403, request(), {
  ...owner,
  mustChangePassword: true,
});
await rejected("GET cannot validate an image", 405, request(null, {}, endpoint, "GET"));
await rejected(
  "Caller query cannot select another endpoint",
  400,
  request(image, {}, `${endpoint}?url=https://private.invalid`)
);
await rejected("Absent Origin is rejected", 403, request(image, { Origin: "" }));
await rejected(
  "Different Origin is rejected",
  403,
  request(image, { Origin: "https://other.invalid" })
);
await rejected(
  "Cross-site metadata is rejected even with matching Origin",
  403,
  request(image, { "sec-fetch-site": "cross-site" })
);
await rejected(
  "Missing explicit upload consent is rejected",
  422,
  request(image, { "x-avatar-validation-consent": "" })
);
await rejected(
  "Wrong upload consent is rejected",
  422,
  request(image, { "x-avatar-validation-consent": "true" })
);
await rejected("JPEG MIME is rejected", 415, request(image, { "content-type": "image/jpeg" }));
await rejected(
  "MIME parameters are rejected",
  415,
  request(image, { "content-type": "image/png;charset=utf-8" })
);
await rejected(
  "Encoded request bodies are rejected",
  415,
  request(image, { "content-encoding": "gzip" })
);
await rejected("Missing provider key fails before reading an image", 503, request(), owner, {
  TAVUS_API_KEY: "",
});
await rejected(
  "Declared oversized image is rejected",
  413,
  request(image, { "content-length": String(3 * 1024 * 1024 + 1) })
);
await rejected(
  "Malformed declared size is rejected",
  413,
  request(image, { "content-length": "not-a-number" })
);
await rejected(
  "Actual oversized bytes override an understated Content-Length",
  413,
  request(Buffer.alloc(3 * 1024 * 1024 + 1), { "content-length": "1" })
);
await rejected("Absent binary body is rejected", 400, request(null));
await rejected("Unreviewed bytes cannot be uploaded", 422, request(Buffer.from("not a PNG image")));
await rejected(
  "Changed image dimensions invalidate the reviewed digest",
  422,
  request(png(511, 512))
);
await rejected("A larger PNG is not the reviewed image", 422, request(png(4097, 512)));
await rejected("Truncating the reviewed PNG is rejected", 422, request(image.subarray(0, -2)));
await rejected(
  "Appending a payload to the reviewed PNG is rejected",
  422,
  request(Buffer.concat([image, Buffer.from("private-name")]))
);
for (const type of ["eXIf", "tEXt", "zTXt", "iTXt"])
  await rejected(
    `Adding ${type} metadata invalidates the reviewed digest`,
    422,
    request(png(512, 512, [chunk(type, Buffer.from("private-name"))]))
  );
await check(
  "Exact reviewed bytes may contain pixel density and 607 small IDAT chunks",
  async () => {
    const density = Buffer.alloc(9);
    density.writeUInt32BE(3780);
    density.writeUInt32BE(3780, 4);
    density[8] = 1;
    const calls: unknown[] = [];
    const syntheticImage = png(512, 512, [chunk("pHYs", density)], 607);
    const result = await validateAvatarImage(
      request(syntheticImage),
      owner,
      env,
      provider(responseBody, { calls }),
      createHash("sha256").update(syntheticImage).digest("hex")
    );
    assert.equal(result.passed, true);
    assert.equal(calls.length, 1);
  }
);
await check("Provider rejection is an honest completed failure", async () => {
  const result = await validateAvatarImage(
    request(),
    owner,
    env,
    provider({ passed: false, checks: [{ id: "image_quality_acceptable", passed: false }] })
  );
  assert.equal(result.completed, true);
  assert.equal(result.passed, false);
});
await check(
  "Unknown check identifiers and extra private response data are projected safely",
  async () => {
    const result = await validateAvatarImage(
      request(),
      owner,
      env,
      provider({
        passed: true,
        checks: [
          { id: "private_check_identifier", passed: true, detail: "private-provider-error" },
        ],
        api_key: secret,
        name: "private-name",
        signed_url: "private-signed-url",
      })
    );
    assert.deepEqual(result.checks, [{ id: "other_check_1", passed: true }]);
    for (const value of prohibited) assert.ok(!JSON.stringify(result).includes(value));
  }
);
for (const [name, body] of [
  ["Missing overall passed flag", { checks: responseBody.checks }],
  ["String overall passed flag", { passed: "true", checks: responseBody.checks }],
  ["Empty check list", { passed: true, checks: [] }],
  ["Invalid check identifier", { passed: true, checks: [{ id: "PRIVATE/URL", passed: true }] }],
  [
    "Duplicate check identifiers",
    { passed: true, checks: [responseBody.checks[0], responseBody.checks[0]] },
  ],
  [
    "Passed contradicts a failed check",
    { passed: true, checks: [{ id: "image_quality_acceptable", passed: false }] },
  ],
  ["Failed contradicts all passed checks", { passed: false, checks: responseBody.checks }],
  [
    "Too many validation checks",
    {
      passed: true,
      checks: Array.from({ length: 31 }, (_, index) => ({
        id: `check_${"a".repeat(index + 1)}`,
        passed: true,
      })),
    },
  ],
] as const)
  await providerRejected(name, provider(body));
for (const [providerStatus, expected] of [
  [401, 503],
  [403, 503],
  [422, 422],
  [429, 429],
  [500, 502],
  [302, 502],
])
  await providerRejected(
    `Provider HTTP ${providerStatus} is sanitized without retry`,
    provider(null, {
      response: () => new Response("private-provider-error " + secret, { status: providerStatus }),
    }),
    expected
  );
await providerRejected(
  "Malformed provider JSON is sanitized",
  provider(null, { response: () => new Response("private-provider-error " + secret) })
);
await providerRejected(
  "Oversized provider response is bounded",
  provider(null, { response: () => new Response(Buffer.alloc(65537, 32)) })
);
await providerRejected("Provider exceptions cannot expose credential diagnostics", (async () => {
  throw new Error(secret + " private-provider-error");
}) as typeof fetch);

async function fastTimers(run: () => Promise<void>) {
  const original = globalThis.setTimeout;
  globalThis.setTimeout = ((
    callback: (...args: unknown[]) => void,
    delay?: number,
    ...args: unknown[]
  ) => original(callback, delay && delay >= 5000 ? 2 : delay, ...args)) as typeof setTimeout;
  try {
    await run();
  } finally {
    globalThis.setTimeout = original;
  }
}
await check("Stalled image input times out without calling the provider", async () => {
  await fastTimers(async () => {
    const stream = new ReadableStream<Uint8Array>({ pull() {} });
    let calls = 0;
    await assert.rejects(
      validateAvatarImage(request(stream), owner, env, (async () => {
        calls++;
        return Response.json(responseBody);
      }) as typeof fetch),
      (error: unknown) => error instanceof LabHttpError && error.status === 408
    );
    assert.equal(calls, 0);
  });
});
await check("Stalled provider response times out with a sanitized result", async () => {
  await fastTimers(async () => {
    await assert.rejects(
      validateAvatarImage(
        request(),
        owner,
        env,
        provider(null, {
          response: () => new Response(new ReadableStream<Uint8Array>({ pull() {} })),
        })
      ),
      (error: unknown) => error instanceof LabHttpError && error.status === 502
    );
  });
});
await check("Unresolved input cancellation cannot hold the size-limit response open", async () => {
  let finishCancellation = () => {};
  let cancelled = false;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(Buffer.alloc(3 * 1024 * 1024 + 1));
    },
    cancel() {
      cancelled = true;
      return new Promise<void>((resolve) => {
        finishCancellation = resolve;
      });
    },
  });
  let calls = 0;
  const work = validateAvatarImage(request(stream), owner, env, (async () => {
    calls++;
    return Response.json(responseBody);
  }) as typeof fetch);
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const deadline = new Promise<never>((_resolve, reject) => {
      timer = setTimeout(() => reject(new Error("Cancellation blocked response")), 500);
    });
    await assert.rejects(
      Promise.race([work, deadline]),
      (error: unknown) => error instanceof LabHttpError && error.status === 413
    );
    assert.equal(cancelled, true);
    assert.equal(calls, 0);
  } finally {
    clearTimeout(timer);
    finishCancellation();
    await work.catch(() => {});
  }
});
await check("Unresolved upstream cancellation cannot hold an error response open", async () => {
  let finishCancellation = () => {};
  let cancelled = false;
  const stream = new ReadableStream<Uint8Array>({
    cancel() {
      cancelled = true;
      return new Promise<void>((resolve) => {
        finishCancellation = resolve;
      });
    },
  });
  const work = validateAvatarImage(
    request(),
    owner,
    env,
    provider(null, { response: () => new Response(stream, { status: 403 }) })
  );
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const deadline = new Promise<never>((_resolve, reject) => {
      timer = setTimeout(() => reject(new Error("Cancellation blocked response")), 500);
    });
    await assert.rejects(
      Promise.race([work, deadline]),
      (error: unknown) => error instanceof LabHttpError && error.status === 503
    );
    assert.equal(cancelled, true);
  } finally {
    clearTimeout(timer);
    finishCancellation();
    await work.catch(() => {});
  }
});
await check(
  "Concurrent validation is rejected and in-flight state resets after success",
  async () => {
    let resolveProvider: (response: Response) => void = () => {};
    let announceStarted: () => void = () => {};
    const started = new Promise<void>((resolve) => {
      announceStarted = resolve;
    });
    const pending = validateAvatarImage(
      request(),
      owner,
      env,
      provider(null, {
        response: () => {
          announceStarted();
          return new Promise<Response>((resolve) => {
            resolveProvider = resolve;
          });
        },
      })
    );
    await started;
    try {
      await assert.rejects(
        validateAvatarImage(request(), owner, env, provider()),
        (error: unknown) => error instanceof LabHttpError && error.status === 429
      );
    } finally {
      resolveProvider(Response.json(responseBody));
    }
    await pending;
    assert.equal((await validateAvatarImage(request(), owner, env, provider())).passed, true);
  }
);
await check("In-flight state resets after local image and provider failures", async () => {
  await assert.rejects(
    validateAvatarImage(request(Buffer.from("invalid")), owner, env, provider())
  );
  await assert.rejects(
    validateAvatarImage(
      request(),
      owner,
      env,
      provider(null, { response: () => new Response(null, { status: 500 }) })
    )
  );
  assert.equal((await validateAvatarImage(request(), owner, env, provider())).passed, true);
});

// Execute the actual route with only authentication/database/fetch boundaries
// replaced. The implementation under test remains the real feature function.
class LabUnavailable extends Error {}
let routeActor: LabActor | null = owner;
let databaseUnavailable = false;
let routeCalls = 0;
const mocks = {
  LabHttpError,
  LabUnavailable,
  requireActor: async (_headers: Headers, role: string) => {
    assert.equal(role, "admin");
    if (databaseUnavailable) throw new LabUnavailable();
    if (!routeActor) throw new LabHttpError(401, "Please sign in to continue.");
    if (routeActor.role !== role || routeActor.mustChangePassword)
      throw new LabHttpError(403, "Access denied.");
    return routeActor;
  },
  validateAvatarImage: (req: Request, actor: LabActor) =>
    validateAvatarImage(
      req,
      actor,
      env,
      provider(responseBody, {
        response: () => {
          routeCalls++;
          return Response.json(responseBody);
        },
      })
    ),
};
(globalThis as Record<string, unknown>).__avatarImageRouteMocks = mocks;
try {
  const source = await readFile(
    "src/app/api/learning-lab/admin/avatar-image-validation/route.ts",
    "utf8"
  );
  const compiled = ts.transpileModule(
    `const {requireActor,LabHttpError,LabUnavailable,validateAvatarImage}=globalThis.__avatarImageRouteMocks;\n${source.replace(/^import .*;\r?\n/gm, "")}`,
    { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }
  ).outputText;
  const route = await import(
    `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
  );
  assert.equal(route.runtime, "nodejs");
  assert.equal(route.maxDuration, 60);
  assert.deepEqual(Object.keys(route).sort(), ["POST", "maxDuration", "runtime"]);
  for (const [name, actor, expected] of [
    ["Anonymous route caller", null, 401],
    ["Learner route caller", { ...owner, role: "learner" }, 403],
    ["Temporary-password route caller", { ...owner, mustChangePassword: true }, 403],
    ["Demo route caller", { ...owner, isDemo: true }, 403],
    ["Permanent operator route caller", owner, 200],
  ] as const)
    await check(name, async () => {
      routeActor = actor as LabActor | null;
      const before = routeCalls;
      const response = await route.POST(request());
      assert.equal(response.status, expected);
      assert.ok(response.headers.get("cache-control")?.includes("no-store"));
      assert.equal(response.headers.get("vary"), "Cookie");
      assert.equal(response.headers.get("x-content-type-options"), "nosniff");
      assert.equal(routeCalls - before, expected === 200 ? 1 : 0);
      for (const value of prohibited)
        assert.ok(!JSON.stringify(await response.clone().json()).includes(value));
    });
  await check("Unavailable authentication database never uploads an image", async () => {
    routeActor = owner;
    databaseUnavailable = true;
    const before = routeCalls;
    const response = await route.POST(request());
    assert.equal(response.status, 503);
    assert.equal(routeCalls, before);
    databaseUnavailable = false;
  });
} finally {
  delete (globalThis as Record<string, unknown>).__avatarImageRouteMocks;
}

await rejected(
  "Inserting a duplicate IHDR changes the approved file",
  422,
  request(png(512, 512, [image.subarray(8, 33)]))
);
await rejected(
  "Inserting arbitrary PNG chunks changes the approved file",
  422,
  request(png(512, 512, [chunk("EVIL", Buffer.from("payload"))]))
);
const badCrc = Buffer.from(image);
badCrc[29] ^= 1;
await rejected("One changed byte in the approved PNG is rejected", 422, request(badCrc));
await rejected(
  "A caller-provided digest header cannot approve another image",
  422,
  request(badCrc, { "x-avatar-image-sha256": createHash("sha256").update(badCrc).digest("hex") })
);
await check(
  "Production's default image pin rejects synthetic media without a server override",
  async () => {
    let calls = 0;
    await assert.rejects(
      validateImage(request(), owner, env, (async () => {
        calls++;
        return Response.json(responseBody);
      }) as typeof fetch),
      (error: unknown) => error instanceof LabHttpError && error.status === 422
    );
    assert.equal(calls, 0);
  }
);

console.log(
  `PASS ${results.length} synthetic avatar image-validation checks; no private files, account reads, uploads, training or real provider calls.`
);
