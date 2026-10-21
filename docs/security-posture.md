# Security posture

What this site actually is, what is enforced in code, and what has to be configured
outside the repository.

## Threat model

Updated 22 October 2026. `swapnilsahoo.com` combines public teaching content with
a private Learning Lab. The Lab has authenticated operator and learner routes,
database-backed enquiries and submissions, session cookies, and private venture
workspaces. These records require access control and are not public or intended
for indexing. Paid checkout remains disabled; optional QR support is external.

The controls below cover public-content delivery alongside these private
services. CSP is one layer; it does not replace authentication, authorisation,
input validation, output escaping or private-record retention and backup controls.

The corpora served by the reader (Gita, Ramcharitmanas, Bhagavatam, the
sahasranamas) are public scripture, already fully rendered into indexable HTML
for SEO. Rate-limiting the API protects the origin's cost and availability, not
the text's confidentiality — the text is deliberately public.

## Enforced in code

| Control | Where |
| --- | --- |
| CSP for app routes | `security-headers.ts` → `next.config.ts` |
| CSP for static `.html` teaching decks | `security-headers.ts` (separate, looser policy) |
| CSP + CORP + `noindex` for `/api/*` | `security-headers.ts` |
| HSTS, `nosniff`, Referrer-Policy, Permissions-Policy, COOP | `security-headers.ts` |
| Clickjacking (`frame-ancestors 'self'` + `X-Frame-Options`) | `security-headers.ts` |
| Server-side page-size ceiling (50) | `src/features/spirituality/data/load-entries.ts` |
| Bounded query/param lengths, integer validation | same, plus the route handler |
| Error messages with no internals | `src/app/api/spirituality/[slug]/entries/route.ts` |

### Why three Content-Security-Policies

The three `source` patterns in `next.config.ts` are mutually exclusive by
construction. This matters: when a response carries two CSP headers, browsers
enforce the **intersection** of both, so an accidental overlap would silently
break whichever pages needed the looser policy.

- App routes get a tight policy.
- The standalone `.html` documents (53 files under `public/`) get a looser one —
  they are self-contained classroom artefacts that pull Tailwind and Chart.js
  from CDNs and carry inline scripts throughout.
- `/api/*` gets `default-src 'none'`.

### Why `'unsafe-inline'` is present in `script-src`

Static app generation and standalone classroom documents use inline scripts.
The existing `unsafe-inline` allowance is retained for compatibility; this is
not a claim that private user input has no injection risk. Per-response nonces
would require a separate rendering and caching change. Private Lab work must
still be escaped and accessed only through its authorised service.

Other directives include `object-src 'none'`, `base-uri 'self'`,
`frame-ancestors 'self'`, `form-action 'self'` and explicit origin allowlists.

`'unsafe-eval'` is **not** used in production (only in `next dev`, which React
requires). Tailwind's Play CDN was verified to work on the decks without it.

## Must be configured outside the repo

Lab mutations use persistent database-backed rate limits. The public scripture
API has a separate page-size ceiling; edge controls can additionally protect
origin cost and availability. Per-instance memory alone is not a durable limit
across serverless invocations. The edge suggestions below are an operating
proposal, not evidence that those rules have been activated.

### Where the edge actually is

`www.swapnilsahoo.com` responds with `Server: Vercel` and **no `cf-ray` header**,
so despite Cloudflare being part of the wider stack it is **not currently
proxying this domain** — requests reach Vercel directly. Cloudflare WAF and rate
limiting rules therefore have nothing to act on unless the DNS records are
switched to proxied (orange cloud) first.

Pick one of the two:

**Option A — Vercel Firewall (nothing to re-point).**

1. **Rate limit** — Firewall → Rules: path starts with `/api/`, 60 requests per
   minute per IP, action *Challenge*. Legitimate reader use is a handful of
   requests per page view; sustained triple-digit rates are scraping.
2. **Attack Challenge Mode** — leave off day to day; switch on during an active
   flood. It challenges every visitor, so it costs real traffic.
3. **Bot filtering** — enable Vercel's managed bot rules, keeping verified
   search crawlers allowed.

**Option B — put the domain behind Cloudflare** by setting the DNS records to
proxied, then apply the same rate limit on `/api/*` (action *Managed Challenge*),
Bot Fight Mode with *Verified Bots* allowed, the Free Managed WAF ruleset,
Always Use HTTPS and Minimum TLS 1.2. This adds a hop and a second cache layer in
front of Vercel's, so only take it if Cloudflare is wanted for other reasons.

Under either option, never enable a blanket "block all bots" rule — it will
deindex the site, whose value depends on being found.

**HSTS preload** — the origin already sends
`max-age=63072000; includeSubDomains; preload`. Only submit to
<https://hstspreload.org> once every current and future subdomain will serve
HTTPS; preload is hard to reverse.

### Vercel environment

`NEXT_PUBLIC_SITE_URL` is **not required**. The code falls back to
`https://www.swapnilsahoo.com`, and production `robots.txt` and `sitemap.xml`
were verified to emit exactly that. Set it only if the canonical host changes.

Keep **Deployment Protection** off for Production (the site is public), and
consider enabling it for Preview deployments so drafts are not indexed.

Lab database, authentication and optional provider secrets belong in private
deployment settings. Do not commit or expose their values. Google Tag Manager's
container ID is public and does not require a secret.

### Forms and tag management

The Lab has real submission and sign-in routes. Its public forms use validation,
same-origin checks, timing/honeypot controls and bounded rate limits; private
operations also enforce their own access rules.

GTM-KJMH54BC is installed in the shared app layout, the global-error document and
all 53 standalone HTML files. The bootstrap is in the head; its hidden noscript
iframe is the first body child. The app/deck CSP permits the GTM script, image,
connection and iframe origins plus Google's documented container connection
origin. Avatar microphone permissions and the API CSP remain separate. This
installation adds no personal-data events to the data layer. Individual analytics,
Ads tags, custom variables and preview mode may need their own configuration;
container installation alone does not verify measurement reports.

The owner's manual Google tag `G-PTGSDRSVK3` is installed once in each document's
head, including the standalone HTML pages. It shares the existing data layer
with GTM. At installation, the published GTM container had no configured tags or
rules, so it did not also configure this Analytics property. Keep one installation
for this property if its configuration is moved into GTM later. CSP permits the
documented non-Ads Analytics collection origins. No private form/workspace values
are added by this snippet; account-side automatic measurement settings are separate.

References: [Google's installation instructions](https://support.google.com/tagmanager/answer/14847097)
and [GTM content-security-policy guide](https://developers.google.com/tag-platform/security/guides/csp).

## Known accepted risks

- **`toml` advisories** (via `@indic-transliteration/sanscript`). Not reachable:
  `toml` is referenced only by that package's own `scripts/build.js` and never by
  the shipped `sanscript.js` entry. Fixing it would mean forcing a major upgrade
  on a dependency the scripture readers rely on. Tracked, not patched.
- **`img-src https:` on the teaching decks.** The decks embed editorial imagery
  from a long tail of publisher hosts. Enumerating them is brittle, and a broken
  teaching deck is a worse outcome than a permissive image origin on static
  content with no user data.
