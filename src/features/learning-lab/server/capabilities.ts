import "server-only";

// Only a capability boolean crosses into the client; credentials remain on the server.
// This checks configuration, not service uptime. API handlers still validate every request.
export function isLabServiceConfigured() {
  const local =
    !process.env.VERCEL &&
    (process.env.NODE_ENV !== "production" || process.env.LAB_LOCAL_MODE === "true");
  if (local) return true;
  const databaseUrl = process.env.LAB_DATABASE_URL || "";
  const secret = process.env.LAB_AUTH_SECRET || "";
  const baseUrl = process.env.LAB_BASE_URL || "";
  return (
    /^(libsql|https):\/\//.test(databaseUrl) &&
    secret.length >= 32 &&
    baseUrl.startsWith("https://")
  );
}
