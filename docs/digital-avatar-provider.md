# Swapnil’s digital guide and optional video avatar

Updated 10 October 2026. The user authorised use of his portrait and publication, requested a Section-style Superhuman agent, and specified light mode as the default.

## Implemented experience

`/digital-guide` introduces an AI-created likeness generated from the authentic `/images/profile_pic.jpg`. A floating launcher opens a small, anchored native **nonmodal** popup on public Next.js pages. Visitors can keep using the page without a backdrop or focus trap. The likeness animates while a prepared reply is spoken. The Video tab offers a prerecorded welcome in H.264/AAC MP4 and VP9/Opus WebM, with captions and a transcript. It plays only when started and does not listen or answer questions. Voice is the default when a live video provider is unavailable; a configured provider becomes the default, with a separate explicit start. Text remains a fallback. The 13 MBA session pages link to this guide through their shared navigation. Private Lab access pages suppress the launcher.

Guided answers are deterministic, browser-side website guidance, explicitly labelled as prepared answers rather than a live human or generative AI conversation. They cover six free lessons, the academic course map, proposed programmes, founder, contact, payment availability and certificate boundaries. Unknown questions receive clarification and source links. Messages are held only in React state, bounded to 30; reset/reload clears them. Optional read-aloud uses standard browser/device speech, never a cloned founder voice. Browser/device voice services may process the text.

Optional voice questions use feature-detected `SpeechRecognition` or `webkitSpeechRecognition`, after a separate consent choice and an explicit Ask by voice click. Each start accepts one final English question, bounded to 500 characters; recognition is aborted before the prepared reply is read aloud. There is no automatic listening loop. A microphone request times out after 30 seconds; active listening is limited to 20 seconds. Unsupported browsers and permission/service errors retain a text alternative. Closing, resetting, changing mode/page, hiding the tab and unmounting stop listening/playback. The browser speech service may process audio remotely; this is disclosed before consent. The website does not upload/store microphone audio or send the question to an AI service. The generated likeness, stock welcome voice and device read-aloud are explicitly distinguished from a trained replica and Swapnil’s own voice.

The animated component starts mouth motion only on actual speech start/resume and stops on pause, end, error or cancellation. Late speech callbacks are ignored. Reduced-motion preferences keep the likeness still. Interactive replies use simple expression cycling rather than phoneme-aligned lip synchronisation; the prerecorded welcome uses locally captured synthetic-speech mouth cues. See [creation, provenance and reproduction](digital-avatar-created.md).

Light mode starts every new document, even with stored dark preferences or a dark OS theme. A deliberate dark switch lasts through client navigation until refresh. The 17 active static MBA/session-topic pages also start light and retain their dark toggle. Historical archive files are preserved.

## 1mind: Section-style Superhuman

Direct read-only inspection of Section’s current homepage on 8 October 2026 found a 1mind launcher. The reference establishes the provider, not permission to reuse Section’s account, avatar, knowledge or deployment. [1mind’s official product page](https://www.1mind.com/) describes realistic Superhumans and website integration. Its public [privacy notice](https://www.1mind.com/privacy-policy) explains provider processing; actual customer terms/settings must also be reviewed.

The site accepts an owner-supplied, provider-issued public embed/share URL in `ONEMIND_EMBED_URL`. Only HTTPS `deployment-….1mind.com` URLs with an optional public `access-code`/`display_mode` parameter are accepted. API keys, private admin URLs and arbitrary hosts are rejected. The integration uses a contained iframe, loaded only after an explicit visitor choice. It allows microphone/autoplay/fullscreen and does not grant camera or screen capture. Closing or changing mode removes the frame. The view also closes after five minutes; this UI timer is **not a provider billing or session-limit guarantee**.

Set privately in Vercel and rebuild:

```text
DIGITAL_AVATAR_ENABLED=true
DIGITAL_AVATAR_PROVIDER=1mind
ONEMIND_EMBED_URL=<your own provider-issued public embed URL>
ONEMIND_DEPLOYMENT_APPROVED=true
```

Before setting the approval flag: create the owner’s deployment with the provider, complete its required likeness/voice verification, use an approved recording of Swapnil, review the visible AI identity, publish accurate provider/retention disclosures, configure allowed domains and provider-side cost/session limits, set the provider’s UI to light, and test the exact embed URL with a real microphone on desktop/mobile. The website cannot force the theme or settings inside a cross-origin provider frame. Do not fabricate a consent recording, use another customer’s deployment, or purchase a plan without owner authorisation.

The public deployment URL is intentionally sent to the browser after configuration; it must be a public embed credential, never an API secret. If the provider requires its launcher SDK instead of a public iframe URL, obtain its account-specific embed instructions and adapt this boundary before approval. No owner deployment or live 1mind conversation has been supplied or tested.

## Alternative: Tavus API adapter

The server-only adapter implements current [create conversation](https://docs.tavus.io/api-reference/conversations/create-conversation), [end conversation](https://docs.tavus.io/api-reference/conversations/end-conversation) and [iframe embedding](https://docs.tavus.io/sections/integrations/embedding-cvi) contracts. Current naming is Face and PAL. Use the owner’s approved Face and reviewed PAL. A photo can create a face with a separately attached voice; creating Swapnil’s own voice needs authorised audio/video. See [the recording and creation brief](digital-avatar-recording-brief.md).

Set `DIGITAL_AVATAR_PROVIDER=tavus`, `DIGITAL_AVATAR_ENABLED=true`, `TAVUS_API_KEY`, `TAVUS_FACE_ID`, `TAVUS_PAL_ID`, `DIGITAL_AVATAR_BASE_URL`, an independent 32+ character `DIGITAL_AVATAR_SESSION_SECRET`, and an explicit `DIGITAL_AVATAR_DAILY_SESSION_LIMIT` (1–100). Shared persistent remote `LAB_DATABASE_URL`/`LAB_DATABASE_AUTH_TOKEN` is required in production. Off Vercel only, explicit local file mode supports mocked tests. Secrets stay server-side.

POST `/api/digital-avatar/session` requires same-origin JSON `{consent:true}`. Optional `lessonId` must name one of the six published free lessons; optional `mode` must be `find-path`, `explain`, `practice` or `review`. Extra fields, arbitrary URLs and unknown lessons are rejected before quota reservation or a provider request. Teaching context is resolved from the server's versioned original-lesson manifest, never supplied as learner-controlled source text.

Admission uses atomic shared daily attempt and per-client hourly limits and a global concurrency ceiling of two. Failed/ambiguous attempts consume budget conservatively. `DIGITAL_AVATAR_SESSION_SECONDS` defaults to 300 and accepts 60–300 seconds. The requested provider configuration includes that duration, absence/left timeouts, private authenticated rooms, empty participant tags for stateless operation and recording disabled. These settings require real provider verification before activation; local mocks do not prove provider enforcement. Review the PAL's underlying instructions and tools before enabling: conversation context is not a security boundary against a misconfigured PAL.

Optional `TAVUS_LESSON_DOCUMENT_IDS` is a private JSON mapping of approved lesson slugs to processed provider document IDs. Only the selected lesson's IDs are sent with balanced retrieval; client document IDs or source URLs are never accepted. Document ingestion and retrieval have not been performed in an owner account. The adapter uses direct HTTP API v2, checked against the official create/end/knowledge-base documentation on 10 October 2026; no Tavus SDK was added. See [the provider's knowledge-base guide](https://docs.tavus.io/sections/conversational-video-interface/knowledge-base).

The browser receives a conversation ID, expiry and participant URL with its short-lived meeting token. A signed HttpOnly SameSite cookie binds DELETE to the current session; clients cannot choose arbitrary provider conversation IDs. DELETE confirms provider termination or returns an honest error. Elapsed local time alone does not mark a room as provider-confirmed ended. A failed stop retains the ownership cookie and unfinished record so it can be retried. Provider errors are sanitised; keys, raw upstream replies, microphone data and transcripts are not logged/stored by this website. Rate/session bookkeeping stores HMAC client buckets and provider room IDs with expiry, not chats. No real provider request is made by the disabled configuration or mocked tests.

## Activation and verification limits

Default production settings keep live video disabled; its panel truthfully explains availability. Missing provider credentials, approved deployment or budget/storage settings cannot produce a fake connected state. The portrait guide’s text fallback remains usable without a database, microphone or external AI account.

Response headers allow same-origin microphone access for opt-in browser voice while keeping external frames closed by default. Enabling a selected video provider at build time permits its exact frame/microphone origin: the approved owner-specific 1mind deployment or `https://tavus.daily.co`. Camera and screen capture remain blocked. Permission policy does not grant user microphone consent. Rebuild after changing provider settings; headers and statically rendered guide availability must agree.

No avatar account, training footage, owner-specific deployment, provider charge, cloned voice or real microphone conversation was created during implementation. Actual audiovisual quality, provider retention and end-to-end service behaviour require verification with the owner's configured service. The delivered animated likeness and prerecorded welcome must not be presented as a trained live conversational replica.

Run `node scripts/test-digital-guide.mjs` against the local preview (default localhost:3112), or set `GUIDE_TEST_BASE_URL` and `GUIDE_TEST_PROFILE`. This browser script blocks HTTP writes; its guided questions cannot create provider sessions or payments. Results/screenshots are under ignored `artifacts/learning-lab/digital-guide/`.

## Earlier production verification

The production build and scoped ESLint checks passed. Fourteen server checks passed with every provider request mocked, including session ownership, concurrency, spending limits and honest failure handling. Browser checks passed for 16 public route/viewport combinations (320–1440 pixels), keyboard focus, prepared source links, input escaping, reset/reload privacy, private-route suppression, all 13 MBA session entry links and light defaults despite a dark OS/old saved preference. The actively linked older corporate-strategy deck also received a light palette and explicit dark toggle. Explicit read-aloud and cancellation were checked using a local speech mock; this does not verify the founder's voice or real device audio. The local guide returned HTTP 200, appeared in the sitemap, and retained closed frame/microphone headers while video was disabled. No real provider conversation, likeness training, purchase or payment was performed.

The same public browser checks passed against `https://www.swapnilsahoo.com` after publication, including the linked older deck. Production HTTP, sitemap and disabled-provider headers also passed. Existing third-party teaching-video embeds were isolated during this guide check, and HTTP writes were blocked throughout; teaching-video playback was outside its scope.

## Compact popup and browser voice verification

Run `node scripts/test-digital-guide.mjs` and `node scripts/test-digital-guide-voice.mjs` against the local preview. The voice checks replace recognition, microphone access and synthesis before application code loads; they never use real audio, browser speech services or avatar sessions. Their results establish UI behaviour under mocks, not real device recognition, voice quality or a generated likeness. The earlier closed microphone header is superseded by the opt-in same-origin permission described above.

The final production build and scoped ESLint passed. Local checks passed: all 16 public route/viewport combinations, nonmodal keyboard/background access, prepared text answers/source links, reset/reload, private-route suppression and the existing MBA guide links/light defaults. All 16 mocked voice checks passed, including standard/prefixed recognition, opt-in capture, bounded final text, spoken answers, errors, no automatic restart, and close/reset/mode/route/visibility cleanup. No HTTP writes or browser errors occurred. Visual review passed at 1440 × 900, 390 × 900, 320 × 600 and 844 × 390; the final narrow-screen stylesheet was also checked directly in the browser. HTTP 200, same-origin microphone permission and closed external frame permission were verified locally.

The video client now waits for cookie-bound session cleanup before permitting another creation request; cancelled or malformed successful starts also finish cleanup before releasing that lock. This change was reviewed in code. An actual configured provider conversation and personal audio/video quality remain untested and disabled.
