# Security posture

What this site actually is, what is enforced in code, and what has to be configured
outside the repository.

## Threat model

`swapnilsahoo.com` is a statically generated public content site. It has **no
authentication, no database, no user accounts, no sessions, no payments, no
uploads and no admin surface**. Every page is intended to be readable by anyone,
and every page except the JSON API is intended to be indexed.

That shapes everything below. There is no private data to leak, so the work is
about keeping the site itself from being turned against its readers (injection,
clickjacking, transport downgrade), keeping the one API honest, and keeping
dependencies current.

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
- The 34 standalone `.html` decks under `public/teaching/` get a looser one —
  they are self-contained classroom artefacts that pull Tailwind and Chart.js
  from CDNs and carry inline scripts throughout.
- `/api/*` gets `default-src 'none'`.

### Why `'unsafe-inline'` is present in `script-src`

Removing it requires nonces, and nonces require dynamic rendering on every
request. That would convert a fully static site into per-request SSR — a real
cost in latency, Vercel spend and SEO — to defend against an injection vector
that needs attacker-controlled content to exist in the first place. This site has
none: all content is authored in-repo, and the only dynamic output (JSON-LD) is
already `JSON.stringify`-escaped with `<` replaced.

The directives that do the real work here — `object-src 'none'`, `base-uri
'self'`, `frame-ancestors 'self'`, `form-action 'self'` and the origin
allowlists — are all enforced normally. Revisit this if the site ever accepts
user-submitted content.

`'unsafe-eval'` is **not** used in production (only in `next dev`, which React
requires). Tailwind's Play CDN was verified to work on the decks without it.

## Must be configured outside the repo

### Cloudflare

Rate limiting belongs here, not in application code: this site has no Redis and
no durable store, and per-instance in-memory counters do not work correctly
across serverless invocations.

1. **Rate limiting rule** — path `/api/*`, 60 requests per minute per IP,
   action *Managed Challenge*. Legitimate use of the reader is a handful of
   requests per page view; sustained triple-digit rates are scraping.
2. **Bot Fight Mode** — on. Leave *Verified Bots* allowed so Googlebot and
   Bingbot keep indexing; the site's value depends on being found.
3. **WAF Managed Rules** — Cloudflare Free Managed Ruleset enabled.
4. **Always Use HTTPS** — on, and **Minimum TLS 1.2**.
5. **HSTS** — the origin sends `max-age=63072000; includeSubDomains; preload`.
   Only submit to <https://hstspreload.org> once you are certain every current
   and future subdomain will serve HTTPS; preload is hard to reverse.

Do not enable a blanket "block all bots" rule — it will deindex the site.

### Vercel

1. Set `NEXT_PUBLIC_SITE_URL` to `https://www.swapnilsahoo.com` for Production.
   It is a public canonical URL, not a secret; the code falls back to that value.
2. Keep **Deployment Protection** off for Production (the site is public) and
   consider enabling it for Preview deployments so drafts are not indexed.
3. No other environment variables are required. The project has no secrets.

### Not applicable

Turnstile, CAPTCHA and honeypots have nothing to protect: there are no forms
that submit to the server, no login, no signup and no password reset. Adding
them would cost real users friction for no gain. Revisit if a contact form,
newsletter signup or comment system is ever added.

## Known accepted risks

- **`toml` advisories** (via `@indic-transliteration/sanscript`). Not reachable:
  `toml` is referenced only by that package's own `scripts/build.js` and never by
  the shipped `sanscript.js` entry. Fixing it would mean forcing a major upgrade
  on a dependency the scripture readers rely on. Tracked, not patched.
- **`img-src https:` on the teaching decks.** The decks embed editorial imagery
  from a long tail of publisher hosts. Enumerating them is brittle, and a broken
  teaching deck is a worse outcome than a permissive image origin on static
  content with no user data.
