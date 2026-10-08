import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthDatabase, getAuthSecret, getDatabase, LabUnavailable } from "./database";
import { LabHttpError, type LabActor } from "./errors";
export { LabHttpError, type LabActor } from "./errors";

type LabAuth = Awaited<ReturnType<typeof initialiseAuth>>;
let authPromise: Promise<LabAuth> | undefined;
export function getLabAuth() {
  return (authPromise ??= initialiseAuth().catch((error) => {
    authPromise = undefined;
    throw error;
  }));
}
async function initialiseAuth() {
  const baseURL = process.env.LAB_BASE_URL || "http://localhost:3110";
  if (
    (process.env.VERCEL ||
      (process.env.NODE_ENV === "production" && process.env.LAB_LOCAL_MODE !== "true")) &&
    !baseURL.startsWith("https://")
  )
    throw new LabUnavailable("Set the secure Lab base URL before launch.");
  return betterAuth({
    appName: "Swapnil Sahoo Learning Lab",
    baseURL,
    basePath: "/api/learning-lab/auth",
    secret: await getAuthSecret(),
    database: drizzleAdapter(await getAuthDatabase(), { provider: "sqlite" }),
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
      minPasswordLength: 12,
      maxPasswordLength: 128,
      revokeSessionsOnPasswordReset: true,
    },
    session: { expiresIn: 60 * 60 * 8, updateAge: 60 * 60, cookieCache: { enabled: false } },
    rateLimit: {
      enabled: true,
      storage: "database",
      window: 60,
      max: 60,
      customRules: { "/sign-in/email": { window: 60, max: 5 } },
    },
    advanced: {
      cookiePrefix: "sahoo-lab",
      useSecureCookies: baseURL.startsWith("https://"),
      database: { generateId: () => crypto.randomUUID() },
    },
    trustedOrigins: [new URL(baseURL).origin],
  });
}

export async function getActor(requestHeaders: Headers): Promise<LabActor | null> {
  const result = await (await getLabAuth()).api.getSession({ headers: requestHeaders });
  if (!result) return null;
  const record = (
    await (
      await getDatabase()
    ).execute({
      sql: "SELECT role,is_demo,must_change_password FROM lab_member WHERE user_id=?",
      args: [result.user.id],
    })
  ).rows[0];
  if (!record) return null;
  return {
    id: result.user.id,
    name: result.user.name,
    email: result.user.email,
    role: record.role as LabActor["role"],
    isDemo: Boolean(record.is_demo),
    mustChangePassword: Boolean(record.must_change_password),
  };
}
export async function requireActor(
  requestHeaders: Headers,
  role?: LabActor["role"],
  allowPasswordChange = false
) {
  const actor = await getActor(requestHeaders);
  if (!actor) throw new LabHttpError(401, "Please sign in to continue.");
  if (role && actor.role !== role)
    throw new LabHttpError(403, "You do not have access to this area.");
  if (actor.mustChangePassword && !allowPasswordChange)
    throw new LabHttpError(403, "Change your temporary password before continuing.");
  return actor;
}
export async function requirePageActor(role?: LabActor["role"]) {
  try {
    const actor = await getActor(await headers());
    if (!actor) redirect("/learning-lab/login");
    if (role && actor.role !== role) redirect("/learning-lab/learner");
    return actor;
  } catch (error) {
    if (error instanceof LabUnavailable) redirect("/learning-lab/login?unavailable=1");
    throw error;
  }
}
