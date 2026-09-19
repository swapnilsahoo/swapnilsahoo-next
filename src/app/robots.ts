import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.swapnilsahoo.com";

export default function robots(): MetadataRoute.Robots {
  return {
    // The site is public by design and should stay fully indexable. `/api/` is
    // excluded as crawl hygiene only — it is advisory, and the route enforces
    // its own limits and sends `X-Robots-Tag: noindex` regardless.
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
