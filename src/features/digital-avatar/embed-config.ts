type AvatarEnvironment = Record<string, string | undefined>;

// Shared by the server and Next's response-header configuration. This module
// only handles public embed origins; it never reads provider API credentials.
export function getApprovedOneMindUrl(env: AvatarEnvironment = process.env): string | null {
  if (
    env.DIGITAL_AVATAR_ENABLED !== "true" ||
    env.DIGITAL_AVATAR_PROVIDER !== "1mind" ||
    env.ONEMIND_DEPLOYMENT_APPROVED !== "true"
  ) return null;
  try {
    const raw = env.ONEMIND_EMBED_URL || "";
    if (raw.length > 4096) return null;
    const url = new URL(raw);
    if (
      url.protocol !== "https:" ||
      !/^deployment-[a-z0-9]+\.1mind\.com$/.test(url.hostname) ||
      url.port || url.username || url.password || url.hash || url.pathname !== "/" ||
      [...url.searchParams.keys()].some((key) => !["access-code", "display_mode"].includes(key))
    ) return null;
    return url.href;
  } catch {
    return null;
  }
}

export function getAvatarFrameOrigins(env: AvatarEnvironment = process.env): string[] {
  const oneMind = getApprovedOneMindUrl(env);
  if (oneMind) return [new URL(oneMind).origin];
  if (env.DIGITAL_AVATAR_ENABLED === "true" && env.DIGITAL_AVATAR_PROVIDER === "tavus")
    return ["https://tavus.daily.co"];
  return [];
}
