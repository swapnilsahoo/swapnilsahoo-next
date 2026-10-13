# Session 2 resource hub

Updated 13 October 2026. Target: `/teaching/1-year-mba/session2.html#session2-resources`.

The supplied `Resources_Session2` folder contains two PDFs and one video. The additive hub indexes all three, preserves the existing page and its readings/assessment, and adds a resource navigation entry. It retains the light default and manual dark option.

The video is the owner's supplied NotebookLM overview, 477.73 seconds, 1280 × 720 at 24 FPS, H.264/AAC. It is remuxed with copied video/audio streams, metadata removed and the MP4 index moved to the beginning for web playback. Native controls provide play/pause/seek and download, without autoplay or a new media-player library. The original SVG poster is a concept illustration. No caption stream was supplied; the page accurately labels an original written study companion rather than claiming a transcript or captions.

The mandatory Kaplan/Norton/Barrows article occupies PDF pages 1–5 of a complete 16-page January–February 2008 Balanced Scorecard Report issue. All four additional articles are indexed with authors, exact page pointers, reprint IDs and original optional prompts. They do not become mandatory reading. Collins/Porras occupies PDF pages 3–15, printed 65–77, in the other 16-page file. Publisher access links and course-pack pointers are provided; the copyrighted original PDFs are not copied into public assets.

The study companion links the supplied video's concepts to existing global/Indian examples and Tesla practice. A new hypothetical Indian venture illustrates purpose, values, a candidate BHAG and vivid description, with native expandable feedback. The target's ambition is explicitly conditional on the venture's baseline and capabilities.

Q1 also gains an original accessible SVG of the core ideology/envisioned future framework, with all four components and a readable HTML explanation. The 10–30-year vision-level BHAG is distinguished from Kaplan/Norton's 3–10-year quantified vision. Four original SVG illustrations provide star/mountain, historical Sony, Indian Tata Nano and fictional Nila Mobility examples with native discussion disclosures. The Nano card requests evidence rather than inventing a complete official vision; Sony is a historical reading illustration, and Nila's 2040 goal remains a classroom proposal. No image library, new JavaScript widget or original screenshot is needed.

## Verification

Exact additive preservation passed: removing the five marked additions restores every original HTML line after newline normalisation. All ten inline scripts parse. Scoped test syntax/lint, all required prebuild checks and the Next production build passed.

The focused browser suite passed in installed Chrome at 1440, 768, 390 and 320 pixels. It verified H.264/AAC support, 477.727347-second metadata, 1280 × 720 dimensions, seeking, muted playback/pause, HTTP 200 delivery and HTTP 206 byte-range handling. Native disclosures, source filenames, publisher links, original content/IDs/links/assets, valid anchors, light default despite dark system/saved preferences, manual dark and viewport containment passed. There were no page errors or HTTP writes.

With scripts disabled, the written hub remains available and fits the 390-pixel viewport. The original whole-page no-script overflow remains unchanged (666-pixel document width); this scoped addition does not certify a full no-script layout or WCAG conformance. Bundled test Chromium lacks the required proprietary video decoder, so native playback verification uses `SESSION2_TEST_BROWSER_CHANNEL=chrome` and fails clearly for unsupported codecs rather than skipping playback.

The illustration checks passed at all four widths in light and manual dark, including five named SVGs and four keyboard-operated discussion disclosures. A final scoped fallback check confirmed the diagram and all descendants fit without scripts (left 28/right 362 in a 390-pixel viewport). Normal phone geometry remained unchanged. Light, dark and no-script diagram captures were visually inspected; there were no browser errors or HTTP writes. All 133 original IDs, 32 links and 420 original section text elements were retained.

Reports and captures remain in ignored working directories. `scripts/test-session2-resource-hub.mjs --preview-ready` also accepts `SESSION2_TEST_BASE_URL` and a distinct `SESSION2_TEST_PROFILE` for production verification. No learner account, submission, payment or private-provider conversation is required.
