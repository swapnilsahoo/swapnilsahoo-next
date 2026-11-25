# AI Viva Bot (Learning Lab product)

Updated 25 November 2026.

AI Viva Bot is the Learning Lab's first product: a working prototype of an AI oral examiner. The product page is `/learning-lab/products`, and its facts live in `src/features/learning-lab/products.ts`. The app is one static file at `public/learning-lab/products/ai-viva-bot.html`, served by this site at `/learning-lab/products/ai-viva-bot.html`. It is no longer hosted on Netlify.

## What changed when the Lab took it over

The founder's v9.0 single-file build was imported on 25 November 2026 with these changes:

- **No institution branding is built in.** The header reads "AI Viva Bot, by Swapnil Sahoo Learning Lab", and the version label is v9.0 throughout.
- **Faculty set their own institution name.** The setup panels have an "Institution name" field. It is stored in the browser as `avb_institution` and included in backups. It appears on the welcome badge, on the dashboard and in the AI examiner's instructions. The default is "Your institution".
- **Sample students and placeholders use the reserved `.example` domain**, so a test email can never be delivered.
- **Browser storage keys** use the `avb_` prefix.
- **The visitor's Gemini key is kept in `sessionStorage`** and forgotten when the tab closes. This site's other pages load Google Tag Manager on the same origin, so the key is not left in `localStorage`. The in-app notice says this.
- **On phones, the header buttons wrap.** The original pushed the page about 365px sideways at 390px.

## Security policy

`VIVA_SOURCE` and `VIVA_SECURITY_HEADERS` in `security-headers.ts` give this file its own policy, and the teaching-deck rule excludes it so the response carries exactly one CSP. The policy allows:

- the Gemini API;
- pdf.js from cdnjs, whose worker starts from a blob URL;
- Google Fonts.

Camera access (`camera=(self)`) is allowed on this page only, for in-browser proctoring. No analytics or third-party frames load on the page.

## Checked on 25 November 2026, on a local production build

- One CSP per response for the app, a teaching deck and a Lab page.
- Camera allowed on the app only.
- No old branding, at 1440px and 390px.
- The institution setting is applied and saved.
- The Faculty and Student demos load.
- The key goes to session storage only.
- An invalid-key request reaches Google, which answers HTTP 400, so the policy does not block it.
- pdf.js reads a real PDF.
- No CSP violations or page errors.

A complete live viva with a real Gemini key was not run.

## Updating the app

Replace the file with a new build, then reapply the changes above: generic branding, the institution field, `.example` samples, the tab-only key and the phone header. Repeat the checks before release.

If the app needs a new outside origin, add it to `VIVA_CSP`, not to the site-wide policies. Do not add usage numbers, pilots or customers to the product page without evidence.
