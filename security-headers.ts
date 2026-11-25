/**
 * Security headers for swapnilsahoo.com.
 *
 * Content-Security-Policies are served on deliberately mutually
 * exclusive so no response ever carries two CSP headers — browsers enforce the
 * intersection of multiple policies, which would silently break the pages that
 * need the looser one.
 *
 *   1. APP_CSP  — Next.js-rendered routes except checkout.
 *   2. DECK_CSP — the standalone teaching decks served as static `.html` files
 *                 out of `public/`, which load Tailwind/Chart.js from CDNs.
 *   3. Checkout — the application policy plus Razorpay's exact origins.
 *   4. API      — no scripts, frames or embedding.
 *   5. AI Viva Bot — the Lab's hosted single-file prototype: Gemini API, pdf.js,
 *                 Google Fonts, and camera/microphone for in-browser proctoring.
 *
 * `'unsafe-inline'` is present in `script-src` for both policies. It is not
 * avoidable here without giving up static generation: nonce-based CSP requires
 * dynamic rendering on every request (see Next's CSP guide), which would turn a
 * fully static content site into per-request SSR purely for a hardening measure
 * that would also change caching for public teaching pages. The Lab's private
 * workspace is protected separately. The other directives — `object-src`,
 * `base-uri`, `frame-ancestors`, `form-action` and the origin allowlists — are
 * all enforced normally.
 */

import { getAvatarFrameOrigins } from "./src/features/digital-avatar/embed-config";

const isDev = process.env.NODE_ENV === "development";
const avatarFrameOrigins = getAvatarFrameOrigins();
const tagManagerOrigin = "https://www.googletagmanager.com";
const appFrameSources = [...avatarFrameOrigins, tagManagerOrigin].join(" ");
const microphonePolicy = avatarFrameOrigins.length
  ? `(self ${avatarFrameOrigins.map((origin) => `"${origin}"`).join(" ")})`
  : "(self)";

/** The Lab's AI Viva Bot prototype: one static file under `public/` with its own policy. */
export const VIVA_SOURCE = "/learning-lab/products/ai-viva-bot.html";

/** Matches any path ending in `.html` (the static decks under `public/`), except AI Viva Bot. */
export const STATIC_DECK_SOURCE = "/:path((?!learning-lab/products/ai-viva-bot\\.html$).*\\.html)";

/**
 * Everything except `.html` decks, `/api` routes and checkout, so that each
 * policy lands on a disjoint set of paths and no response is ever
 * sent two of them.
 */
export const APP_SOURCE = "/:path((?!api/)(?!learning-lab/checkout/?$)(?!.*\\.html$).*)";
export const CHECKOUT_SOURCE = "/learning-lab/checkout";

function collapse(policy: string) {
  return policy.replace(/\s{2,}/g, " ").trim();
}

/**
 * Next.js inlines its bootstrap and flight payloads, and `next dev` additionally
 * needs `eval` for React refresh plus a websocket back to the dev server.
 */
function appCsp(checkout = false) {
  const checkoutOrigin = "https://checkout.razorpay.com";
  const apiOrigin = "https://api.razorpay.com";
  return collapse(`
  default-src 'self';
  base-uri 'self';
  object-src 'none';
  frame-ancestors 'self';
  frame-src ${appFrameSources}${checkout ? ` ${checkoutOrigin} ${apiOrigin}` : ""};
  form-action 'self';
  script-src 'self' 'unsafe-inline' ${tagManagerOrigin}${checkout ? ` ${checkoutOrigin}` : ""}${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://swapnilsahoo.com ${tagManagerOrigin} https://*.google-analytics.com;
  font-src 'self' data:;
  media-src 'self';
  worker-src 'self' blob:;
  manifest-src 'self';
  connect-src 'self' ${tagManagerOrigin} https://*.google-analytics.com https://*.google.com${checkout ? ` ${checkoutOrigin} ${apiOrigin} https://lumberjack.razorpay.com` : ""}${isDev ? " ws: wss:" : ""};
  upgrade-insecure-requests;
`);
}
const APP_CSP = appCsp();

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
  script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com ${tagManagerOrigin};
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com https://cdnjs.cloudflare.com;
  font-src 'self' data: https://fonts.gstatic.com https://api.fontshare.com https://cdnjs.cloudflare.com;
  img-src 'self' data: blob: https:;
  media-src 'self' https:;
  connect-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com ${tagManagerOrigin} https://*.google-analytics.com https://*.google.com;
  frame-src https://www.youtube.com https://www.youtube-nocookie.com ${tagManagerOrigin};
  upgrade-insecure-requests;
`);

/**
 * AI Viva Bot runs entirely in the browser: inline scripts and styles, pdf.js from cdnjs
 * (its worker starts from a blob URL), Google Fonts, and direct calls to the Gemini API
 * with the visitor's own key. No analytics or third-party frames load on this page.
 */
const VIVA_CSP = collapse(`
  default-src 'self';
  base-uri 'self';
  object-src 'none';
  frame-ancestors 'self';
  frame-src 'none';
  form-action 'self';
  script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' data: https://fonts.gstatic.com;
  img-src 'self' data: blob:;
  media-src 'self' blob: mediastream:;
  worker-src 'self' blob: https://cdnjs.cloudflare.com;
  connect-src 'self' https://generativelanguage.googleapis.com https://cdnjs.cloudflare.com;
  manifest-src 'self';
  upgrade-insecure-requests;
`);

/** Applied to every response, alongside exactly one content policy. */
export const BASE_SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Retained for browsers that predate frame-ancestors; CSP is the real control.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: `camera=(), display-capture=(), microphone=${microphonePolicy}, geolocation=(), browsing-topics=(), payment=(), usb=(), interest-cohort=()`,
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Checkout overrides this for the payment provider's popup handoffs.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

export const APP_CSP_HEADER = { key: "Content-Security-Policy", value: APP_CSP };
export const DECK_CSP_HEADER = { key: "Content-Security-Policy", value: DECK_CSP };

// One CSP on this route, with popup/payment permissions scoped to checkout only.
export const CHECKOUT_SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: appCsp(true) },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  {
    key: "Permissions-Policy",
    value: BASE_SECURITY_HEADERS.find(
      (header) => header.key === "Permissions-Policy"
    )!.value.replace(
      "payment=()",
      'payment=(self "https://api.razorpay.com" "https://checkout.razorpay.com")'
    ),
  },
];

// One CSP on this page, and camera access for proctoring on this page only.
export const VIVA_SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: VIVA_CSP },
  {
    key: "Permissions-Policy",
    value: BASE_SECURITY_HEADERS.find(
      (header) => header.key === "Permissions-Policy"
    )!.value.replace("camera=()", "camera=(self)"),
  },
];

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
