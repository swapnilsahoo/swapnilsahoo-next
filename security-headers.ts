/**
 * Security headers for swapnilsahoo.com.
 *
 * Two Content-Security-Policies are served, and they are deliberately mutually
 * exclusive so no response ever carries two CSP headers — browsers enforce the
 * intersection of multiple policies, which would silently break the pages that
 * need the looser one.
 *
 *   1. APP_CSP  — every Next.js-rendered route.
 *   2. DECK_CSP — the standalone teaching decks served as static `.html` files
 *                 out of `public/`, which load Tailwind/Chart.js from CDNs.
 *
 * `'unsafe-inline'` is present in `script-src` for both policies. It is not
 * avoidable here without giving up static generation: nonce-based CSP requires
 * dynamic rendering on every request (see Next's CSP guide), which would turn a
 * fully static content site into per-request SSR purely for a hardening measure
 * that buys little on a site with no auth, no sessions and no user-submitted
 * content. The directives that do the real work on this site — `object-src`,
 * `base-uri`, `frame-ancestors`, `form-action` and the origin allowlists — are
 * all enforced normally.
 */

const isDev = process.env.NODE_ENV === "development";

/** Matches any path ending in `.html`, i.e. the static decks under `public/`. */
export const STATIC_DECK_SOURCE = "/:path(.*\\.html)";

/**
 * Everything that is neither a `.html` deck nor an `/api` route, so that each of
 * the three policies lands on a disjoint set of paths and no response is ever
 * sent two of them.
 */
export const APP_SOURCE = "/:path((?!api/)(?!.*\\.html$).*)";

function collapse(policy: string) {
  return policy.replace(/\s{2,}/g, " ").trim();
}

/**
 * Next.js inlines its bootstrap and flight payloads, and `next dev` additionally
 * needs `eval` for React refresh plus a websocket back to the dev server.
 */
const APP_CSP = collapse(`
  default-src 'self';
  base-uri 'self';
  object-src 'none';
  frame-ancestors 'self';
  frame-src 'none';
  form-action 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://swapnilsahoo.com;
  font-src 'self' data:;
  media-src 'self';
  worker-src 'self' blob:;
  manifest-src 'self';
  connect-src 'self'${isDev ? " ws: wss:" : ""};
  upgrade-insecure-requests;
`);

/**
 * The decks are self-contained HTML authored for classroom use: inline scripts
 * and styles throughout, Tailwind + Chart.js from CDN, one YouTube embed, and
 * editorial imagery from a long tail of publisher hosts. `img-src https:` is a
 * deliberate trade — enumerating those hosts is brittle and a broken teaching
 * deck is a worse outcome than a permissive image origin on static content.
 */
const DECK_CSP = collapse(`
  default-src 'self';
  base-uri 'self';
  object-src 'none';
  frame-ancestors 'self';
  form-action 'self';
  script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com https://cdnjs.cloudflare.com;
  font-src 'self' data: https://fonts.gstatic.com https://api.fontshare.com https://cdnjs.cloudflare.com;
  img-src 'self' data: blob: https:;
  media-src 'self' https:;
  connect-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;
  frame-src https://www.youtube.com https://www.youtube-nocookie.com;
  upgrade-insecure-requests;
`);

/** Applied to every response, alongside exactly one of the two policies above. */
export const BASE_SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Retained for browsers that predate frame-ancestors; CSP is the real control.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // No OAuth popups or cross-origin window handoffs anywhere on the site.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

export const APP_CSP_HEADER = { key: "Content-Security-Policy", value: APP_CSP };
export const DECK_CSP_HEADER = { key: "Content-Security-Policy", value: DECK_CSP };

/**
 * `Cross-Origin-Resource-Policy` is set here rather than site-wide: the site's
 * images and documents are public teaching material that may legitimately be
 * embedded elsewhere, but nothing should be embedding the JSON API.
 *
 * The API is same-origin only and must never be indexed — `X-Robots-Tag` keeps
 * it out of search results without touching `robots.txt`, which is advisory.
 */
export const API_SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: "default-src 'none'; frame-ancestors 'none'" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
  { key: "Vary", value: "Accept-Encoding" },
];
