# Gallery asset provenance register

This internal register records the evidence trail available for locally hosted
gallery assets. It is not a copyright clearance record, a licence, or evidence
of consent from people pictured.

## The Entrepreneurship Shelf cover art and posters (18 Aug 2026)

`/teaching/reading-and-watching-list` displays 46 small cover-art and poster
thumbnails (book covers, film posters, series art, documentary posters)
alongside original first-person commentary recommending each title. These are
a different category from every other asset in this register: official
promotional material published by the book's publisher or the film/show's
studio/network, not personal photography, and not something this site claims
any ownership or licence over.

**Sourcing.** Book covers were located via the Internet Archive's Open
Library Covers API (`covers.openlibrary.org`, a public service Open Library
provides for exactly this kind of external reference use). Film, series and
documentary art was located via Wikipedia's public REST summary API
(`en.wikipedia.org/api/rest_v1/page/summary/...`), which surfaces each
article's lead image — in practice the same poster or key art displayed on
the film/show's own Wikipedia infobox.

**Why downloaded rather than hotlinked.** The first implementation hotlinked
directly to `covers.openlibrary.org` and `upload.wikimedia.org` through
Next's image optimizer. Wikimedia's CDN began returning `429 Too Many
Requests` under the optimizer's concurrent fetch pattern, causing intermittent
broken images — a reliability problem, not a rights one. Each image was
downloaded once, resized to a small thumbnail (max 500px on the long edge,
matching the actual card display size — the same "never ship an oversized
source image" discipline applied everywhere else in this repository) and
re-encoded to WebP, then hosted locally under
`public/images/entrepreneurship-shelf/{books,movies,series,documentaries}/`.
No image was upscaled or cropped to alter its content; several very low
resolution or purely textual source images (title cards, wordmarks) were used
as-is at their native small size rather than enlarged.

**Rights basis.** Thumbnail-resolution reproduction of a book cover or film
poster specifically to identify the work being discussed, alongside
substantial original commentary, is long-settled editorial/fair-use practice
followed by essentially every book and film recommendation site, library
catalogue and review outlet on the web (Goodreads, IMDb, Wikipedia itself,
and the ThinkMBA "Think Shelf" page this feature was explicitly modelled on
all do the same). No image here is used at a resolution or in a context that
substitutes for the original work or its official marketing use. All cover
art and poster images remain the property of their respective publishers and
studios; this repository does not claim otherwise, and says so on the page
itself.

**Exclusions.** One further poster (a low-resolution "Halt and Catch Fire"
title-card screenshot) was downloaded, judged too poor quality to represent
the show reasonably, and deleted rather than shipped; that entry on the page
initially had no cover art. One book cover (the audiobook edition of *Zero to
One*, initially the only cover Open Library's search API surfaced) was
replaced with the standard print hardcover jacket once a better
edition-specific cover was found, since this is the shelf's first and most
prominent entry.

**Two gaps filled directly by Swapnil Sahoo (18 Aug 2026).** The two titles
without usable cover art — Halt and Catch Fire and The Playlist, which had no
Wikipedia infobox image at all — were supplied directly by Swapnil Sahoo:
official Amazon Prime Video key art for Halt and Catch Fire's streaming
exclusive, and official Netflix key art for The Playlist. Both are the same
class of asset as the API-sourced images above (studio/platform promotional
material, used at thumbnail size for identification alongside original
commentary) and were resized the same way (max 500px, re-encoded to WebP) and
saved to the same `public/images/entrepreneurship-shelf/series/` directory.

**Last two gaps filled directly by Swapnil Sahoo (18 Aug 2026).** The two
documentaries that had shipped without cover art — Inside Bill's Brain:
Decoding Bill Gates and Something Ventured, neither of which resolved a usable
image via the Wikipedia REST API — were supplied directly by Swapnil Sahoo:
official poster art for both. Same class of asset (official promotional
material, thumbnail size, identification alongside original commentary), same
resize treatment (max 500px, re-encoded to WebP), saved to
`public/images/entrepreneurship-shelf/documentaries/`. Every title on the
shelf now has cover art.

## AOM 2026

The event photographs below were supplied directly by Swapnil Sahoo. The
presentation photograph's session context was checked against the
[official AOM 2026 programme](https://events.aom.org/events/aom-2026/session/cBpcAGEGq2KU8qoDBFRUV).

| Local asset                                                            | SHA-256                                                            | Recorded source                                                                                                                                                  | Public provenance                                                                                         | Rights and credit status                                                                                                |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `public/images/gallery/aom-2026-entrepreneurship-under-constraint.jpg` | `902a28bcb9da997ce35dfcf90196f957e16cc8deed07fbd599887fb6f2c693be` | Personal event photograph supplied directly by Swapnil Sahoo for this gallery; re-encoded from the original PNG to JPEG on 15 Aug 2026 (resized to a 1920px max dimension) purely to fix a slow on-demand image-optimization transform — same photograph, no crop or retouch | Personal event photograph supplied by Swapnil Sahoo                                                       | Photographer, copyright owner, formal licence, and publication-permission records are not documented in this repository |
| `public/images/gallery/aom-2026-with-jp-eggers.jpg`                    | `cbb3b07917a14e64e3eec70454988d816346bee50e5d8b8f69d120f26198b897` | User-supplied portrait (`163dbe4f956623d0d90e862e9371143eb9b3a10ec7615a7cf791a740fa9e4295`); identity-preserving professional retouch requested by Swapnil Sahoo; re-encoded from the original PNG to JPEG on 15 Aug 2026 (resized to a 1920px max dimension) purely to fix a slow on-demand image-optimization transform — this also stripped the embedded OpenAI provenance metadata the prior PNG carried (see the Generated-media audit note below) | AI-assisted professional retouch of a user-supplied event photograph; embedded OpenAI provenance no longer present after the 15 Aug 2026 re-encode | Photographer, copyright owner, formal licence, and publication-permission records are not documented in this repository |
| `public/images/gallery/aom-2026-conference-badge.jpg`                  | `12923f9136e148dc64d2b7d2bddbbcb6a37571e116c269a83161051565598da7` | Personal conference-badge photograph supplied directly by Swapnil Sahoo                                                                                          | Personal conference credential, AOM 2026 (University of Liverpool Management School registration)         | Photographer, copyright owner, formal licence, and publication-permission records are not documented in this repository |
| `public/images/gallery/aom-2026-proceedings-abstract.jpg`              | `37b8a59ebe7e3c56a4f70bb3cff559a64498991555bccb1502860adbf8de69d1` | Screenshot of the publicly published Academy of Management Proceedings abstract page, supplied by Swapnil Sahoo                                                  | Publicly available scholarly record (DOI: 10.5465/AMPROC.2026.12395abstract)                              | Publisher (Academy of Management); screenshot itself carries no separate licence record in this repository              |
| `public/images/gallery/aom-2026-sarasvathy-ratinho.webp`               | `51b15d3842a3a95587fa0fde1cdb02add13903e2df36bdb0bb9030d18653c4c9` | Personal event photograph supplied directly by Swapnil Sahoo; horizontally flipped to correct a front-camera mirror artifact and resized to a 2000px max dimension for this gallery (same photograph, no crop or retouch); also posted to his LinkedIn (`urn:li:activity:7494274053365522432`), which independently identifies Tiago Ratinho's visible name badge | Personal event photograph, AOM 2026, Philadelphia | Photographer, copyright owner, formal licence, and other attendees' consent/model-release records are not documented in this repository |

## Great Lakes Gurgaon campus

| Local asset                                                    | SHA-256                                                            | Recorded source                                                | Public provenance                                    | Rights and credit status                                                                                                 |
| --------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `public/images/gallery/great-lakes-gurgaon-tree-plantation.jpg` | `d9651a5da0bed4badeffeffeae74f61dd916159c51e0a1b1c9e552b5c1cf98af` | Personal event photograph supplied directly by Swapnil Sahoo   | Personal event photograph supplied by Swapnil Sahoo | Photographer, copyright owner, formal licence, and publication-permission records are not documented in this repository |

## CSR Times

| Local asset                                                              | SHA-256                                                            | Recorded source                                                                              | Public provenance                                                                                                     | Rights and credit status                                                                                                 |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `public/images/gallery/csr-times-sustainability-and-strategy-jun-2026.jpg` | `28892900b9052b254a14d9b7d41f2341dfb420f4c264be96e0af3b90faa0ce2c` | Scan/screenshot of the published CSR Times magazine spread, supplied by Swapnil Sahoo | Publicly published article: <https://csrtimes.org/sustainability-and-strategy-why-responsible-growth-is-now-a-business-imperative/> | Publisher (CSR Times); scan itself carries no separate licence record in this repository                                |

## 2-Year MBA — Strategic Management closure (Dec 2025)

| Local asset                                                              | SHA-256                                                            | Recorded source                                              | Public provenance                                    | Rights and credit status                                                                                                 |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `public/images/gallery/2-year-mba-strategic-management-closure-1.jpg` | `9381e53823196ebac048a2e55f749067c78f5603e9023d25e3ab8c314baab559` | Personal event photograph supplied directly by Swapnil Sahoo; WhatsApp filename dated 6 Dec 2025 | Personal event photograph supplied by Swapnil Sahoo | Photographer, copyright owner, formal licence, publication permission, and consent/model-release records are not documented in this repository |
| `public/images/gallery/2-year-mba-strategic-management-closure-2.jpg` | `4474996516dfa3926381c23877eb9a7d3a3d8121bcfcce065840229753680a70` | Personal event photograph supplied directly by Swapnil Sahoo; WhatsApp filename dated 6 Dec 2025 | Personal event photograph supplied by Swapnil Sahoo | Photographer, copyright owner, formal licence, publication permission, and consent/model-release records are not documented in this repository |

## Karma Yoga for India — Mehalchauri hero (April 2026)

| Local asset                                                                     | SHA-256                                                            | Recorded source                                                                          | Public provenance                                    | Rights and credit status                                                                                                 |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `public/images/teaching/karma-yoga/mehalchauri/girls-football-trophy-2026.jpg` | `f6365f7712cfaefe90a362bb7e6fe21e741006edd26ee4a0dac925457b5f089f` | Personal event photograph supplied directly by Swapnil Sahoo; camera filename timestamp 4 April 2026, consistent with the documented 1–6 Apr 2026 return trip. Subject (Prof. S. K. Palhan presenting the trophy) and context (Mehalchauri-Salinga's first girls' football team) confirmed by Swapnil Sahoo. | Personal event photograph supplied by Swapnil Sahoo | Photographer, copyright owner, formal licence, and publication-permission records are not documented in this repository |

## Karma Yoga — Salinga & Mehalchauri bag reuse

Used hostel bedsheets repurposed into carry bags and distributed to residents of
Salinga and Mehalchauri alongside saplings, as part of the ongoing Mehalchauri
Karma Yoga partnership documented on the Karma Yoga for India page.

| Local asset                                                            | SHA-256                                                            | Recorded source                                              | Public provenance                                    | Rights and credit status                                                                                                 |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `public/images/gallery/karma-yoga-salinga-mehalchauri-bag-reuse.jpg` | `3218db55f36ab2731fe5b738b4eac517fceb4e24c060831f2dfe332ac849403c` | Personal event photograph supplied directly by Swapnil Sahoo | Personal event photograph supplied by Swapnil Sahoo | Photographer, copyright owner, formal licence, publication permission, and participant consent are not documented in this repository |
| `public/images/gallery/karma-yoga-repurposed-bedsheet-bags.jpg`      | `ed3d998b495823729c594fae1fef7f60ee3c2e184fe9582128ce64e0fe11acb1` | Personal event photograph supplied directly by Swapnil Sahoo | Personal event photograph supplied by Swapnil Sahoo | Photographer, copyright owner, and formal licence records are not documented in this repository                          |

## AI Mini Hackathon 2026

Sagar Aggarwal shared the Great Lakes Gurgaon event-media folders by email.
That identifies the transfer contact, not the photographer or copyright owner.

The source collection comprised three shared folders:

- Camera 1;
- Camera 2;
- All Days.

Their authenticated Drive identifiers remain in the source email and connected
Drive account. They are deliberately not repeated in this public repository.

The local import did not preserve the original Drive file IDs or filenames.
These four assets can therefore be mapped honestly to the shared event-media
collection, but not to a particular source file or one of the three folders.

| Local asset                                                | SHA-256                                                            | Recorded source                                                                      | Public provenance                                                                         | Rights and credit status                                                                                                                |
| ---------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/ai-hackathon/hackathon-demo.jpg`            | `684c721b649b1e220bef09474c7373d00b385fa3e5dbf9cf67f740b0db64e34d` | AI Mini Hackathon camera originals; exact Drive file unresolved                      | Camera-original event photograph; photographer not identified                             | Photographer, copyright owner, licence, publication permission, and consent/model-release records are not documented in this repository |
| `public/images/ai-hackathon/hackathon-room.jpg`            | `c73d166b3b1731c209608b7275ee7aae39bae12180ad9611e5b93c0e11b8918f` | AI Mini Hackathon camera originals; exact Drive file unresolved                      | Camera-original event photograph; photographer not identified                             | Photographer, copyright owner, licence, publication permission, and consent/model-release records are not documented in this repository |
| `public/images/gallery/ai-mini-hackathon-winners-2026.jpg` | `b1afd32461fdae408166b99d0d10eee600728335e825f13f0aeaefa862f21fa7` | Great Lakes Gurgaon event-media collection listed above; exact Drive file unresolved | Event media shared by the Great Lakes Gurgaon programme team; photographer not identified | Photographer, copyright owner, licence, publication permission, and consent/model-release records are not documented in this repository |
| `public/images/gallery/ai-mini-hackathon-team-2026.jpg`    | `3af088fe574ae9d3ea2f890e718a18b5889358a214dc1a95c409285580b8d21b` | Great Lakes Gurgaon event-media collection listed above; exact Drive file unresolved | Event media shared by the Great Lakes Gurgaon programme team; photographer not identified | Photographer, copyright owner, licence, publication permission, and consent/model-release records are not documented in this repository |
| `public/images/gallery/ai-mini-hackathon-jury-panel-2026.jpg` | `ecc805600b532f1ec2535764226d855c842450040b7f612d22278d6241f2e586` | Personal event photograph supplied directly by Swapnil Sahoo | Personal event photograph supplied by Swapnil Sahoo | Photographer, copyright owner, formal licence, publication permission, and consent/model-release records are not documented in this repository |

The two camera originals were originally 4608 × 3072 JPEG files (2.6–3.0 MB
each); their embedded EXIF named a Sony ILCE-7M4 camera and recorded 5 July
2026 capture times, but did not name a photographer. The two gallery exports
were originally 1920 × 1080 JPEG files (~1.0–1.2 MB each) whose embedded
metadata identified Adobe Lightroom as the export software but did not
identify a photographer.

On 17 Aug 2026, a site-wide audit found these four files were still shipping
at their oversized originals — the same performance-bug class fixed for other
assets on 15 Aug 2026 (oversized source images choking Next's on-demand image
optimizer). All four were resized and re-encoded: the two camera originals to
2200 px wide (down from 4608 px) and the two gallery exports to 1920 px wide
(unchanged) at moderate JPEG quality, cutting file size by 78–96% with no
visible loss of quality. Same photographs, no content added or removed; EXIF
capture metadata is stripped by re-encoding, as it always is by this process.

## 2-Year Course — Strategy Sessions classroom (Jan 2026)

WhatsApp-shared classroom photographs supplied directly by Swapnil Sahoo from
the "2 Year Course" Strategy Sessions folder, covering sessions between 5 and
14 January 2026 (including the Great Lakes Gurgaon Winter Conference on
Sustainable Business 2025). Student name placards are visible in some frames;
no separate consent/model-release record is held for the students shown.

| Local asset                                                          | SHA-256                                                            | Recorded source                                              | Public provenance                                    | Rights and credit status                                                                                                             |
| --------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/teaching/business-simulation/decision-debrief.jpg`     | `8f160ffa644138c4c89dad213b223073655435a85188c13635051350e961f2ac` | Personal classroom photograph supplied directly by Swapnil Sahoo (WhatsApp Image 2026-01-12) | Personal classroom photograph supplied by Swapnil Sahoo | Photographer, copyright owner, formal licence, publication permission, and consent/model-release records are not documented in this repository |
| `public/images/gallery/winter-conference-2025-classroom.jpg`         | `b46beef58d9b023053c6b38af366e6f1822248f52d08d902de127f8def6c8c48` | Personal classroom photograph supplied directly by Swapnil Sahoo (WhatsApp Image 2026-01-06), Winter Conference on Sustainable Business 2025 | Personal classroom photograph supplied by Swapnil Sahoo | Photographer, copyright owner, formal licence, publication permission, and consent/model-release records are not documented in this repository |

## Mehalchauri historical programme archive — additional finds (Aug 2026)

Extracted from `Karma Yoga/Mehalchauri/MEHALCHAURI-ALL activities.pptx` (a ~1.4GB
compiled programme deck), supplied directly by Swapnil Sahoo. `geometry-activity.webp`
carries embedded EXIF identifying a Lava Iris 406Q phone camera and a
2015-04-22 capture date, confirming it belongs to the pre-2026 historical
programme record already documented on this page; `volunteer-teaching.webp`
has no EXIF but matches the same historical-era classroom setting (no
Great Lakes branding, older-style uniforms) and is recorded on the same basis.

| Local asset                                                                          | SHA-256                                                            | Recorded source                                                                                    | Public provenance                                              | Rights and credit status                                                                                                             |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/teaching/karma-yoga/mehalchauri/historical/geometry-activity.webp`     | `05717c40ab541bd5709f806d4143b963ddb68726c46a6da716a36f5e0adb8559` | Embedded photo from the MEHALCHAURI-ALL activities.pptx programme archive; EXIF dates capture to 2015-04-22 | Historical programme photograph, pre-2026; photographer not identified | Photographer, copyright owner, formal licence, publication permission, and consent/model-release records are not documented in this repository |
| `public/images/teaching/karma-yoga/mehalchauri/historical/volunteer-teaching.webp`    | `63f48cf6cdb6d0ea1c63d09b28207daf2de46f4f48bd2bbcca6a220259682611` | Embedded photo from the MEHALCHAURI-ALL activities.pptx programme archive; no EXIF, dated by context to the historical (pre-2026) era | Historical programme photograph, pre-2026; photographer not identified | Photographer, copyright owner, formal licence, publication permission, and consent/model-release records are not documented in this repository |

## Additional Strategy classroom & SPIC MACAY photos (Aug 2026)

Sourced directly from Swapnil Sahoo's OneDrive: `Strategy/Class Pics` (Sept 2025
Strategy cohort), the same "2 Year Course" Strategy Sessions classroom folder
used above (Jan 2026 case-teaching), and `Clubs/SPIC MACAY` (Nov 2025 cultural
evening). Student name placards are visible in the classroom photo; no
separate consent/model-release record is held for any of the students or
performers shown.

| Local asset                                                          | SHA-256                                                            | Recorded source                                                                                    | Public provenance                                    | Rights and credit status                                                                                                             |
| --------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/gallery/strategy-cohort-sept-2025.jpg`                 | `aa5caeef058fd7fcd5559813f7775f2ae69eb6ff83c06c954b43787bcd85cdbe` | Personal classroom photograph supplied directly by Swapnil Sahoo (WhatsApp Image 2025-09-17) | Personal classroom photograph supplied by Swapnil Sahoo | Photographer, copyright owner, formal licence, publication permission, and consent/model-release records are not documented in this repository |
| `public/images/gallery/strategy-kodak-case-teaching-2026.jpg`         | `d4782f7b184530fb252ec50ae503a0498dfbe6d60b50a1ef47541f2df24d6d68` | Personal classroom photograph supplied directly by Swapnil Sahoo (WhatsApp Image 2026-01-06) | Personal classroom photograph supplied by Swapnil Sahoo | Photographer, copyright owner, formal licence, publication permission, and consent/model-release records are not documented in this repository |
| `public/images/gallery/spic-macay-koodiyattam-performance-2025.jpg`   | `820619ef81211967a10c75a1cecffacdbc8a785f3a426405ef3f49d10ab49907` | Event photograph supplied directly by Swapnil Sahoo, SPIC MACAY cultural evening (Nov 2025) | Personal event photograph supplied by Swapnil Sahoo | Photographer, copyright owner, formal licence, publication permission, and consent/model-release records are not documented in this repository |
| `public/images/gallery/spic-macay-koodiyattam-poster-2025.jpg`        | `9056db3614bc7fb5829e8ce4ffe711dad900352dcdac166ead95ee0977781ad7` | Official event poster supplied directly by Swapnil Sahoo, SPIC MACAY chapter, Great Lakes Gurgaon | Official SPIC MACAY / Great Lakes Gurgaon event poster | Designer/publisher not identified in this repository; poster bears SPIC MACAY, Government of India and Great Lakes Gurgaon branding |

## Education Times press clipping (May 2026)

A photographed print clipping supplied directly by Swapnil Sahoo. No online
publication URL exists (confirmed print-only via his own publication-tracking
record), so this local image is used as the essay's link target on `/press`.

| Local asset                                                                      | SHA-256                                                            | Recorded source                                          | Public provenance                                        | Rights and credit status                                                                                     |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `public/images/press/education-times-b-schools-entrepreneurs-may-2026.jpg`         | `8427b1329760cdc92b5143568eb40cd91a8eaac82dd0618c58a23ee708214971` | Photographed print clipping supplied directly by Swapnil Sahoo | Print publication, Education Times, May 2026; no online edition | Publisher (Education Times); photographer of the clipping and formal licence are not documented in this repository |

## Mehalchauri April 2026 return — additional confirmed photos (Aug 2026)

Extracted from the same `MEHALCHAURI-ALL activities.pptx` programme deck as
the historical-archive additions above. Swapnil Sahoo confirmed these two are
from the documented April 2026 return (rather than an earlier, undated
visit), so they are placed in the "April 2026 return · In pictures" set
alongside the other confirmed photos from that trip.

| Local asset                                                                    | SHA-256                                                            | Recorded source                                                                                  | Public provenance                                    | Rights and credit status                                                                                                             |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/teaching/karma-yoga/mehalchauri/community-shrine-visit-2026.webp`   | `359425e189019b6b20425cd625b6571f30e9cc3257354b7911aae6474da4d3bd` | Embedded photo from the MEHALCHAURI-ALL activities.pptx programme archive; confirmed by Swapnil Sahoo as April 2026 | Personal event photograph, April 2026 return visit; photographer not identified | Photographer, copyright owner, formal licence, publication permission, and consent/model-release records are not documented in this repository |
| `public/images/teaching/karma-yoga/mehalchauri/family-visit-2026.webp`             | `a1df17a69dbcbb4a3e6c913ddf879a0e716b7642acdb663f9e3a014308953d41` | Embedded photo from the MEHALCHAURI-ALL activities.pptx programme archive; confirmed by Swapnil Sahoo as April 2026 | Personal event photograph, April 2026 return visit; photographer not identified | Photographer, copyright owner, formal licence, publication permission, and consent/model-release records are not documented in this repository |

## SAPIENCE 2025 Entrepreneurship Panel (Aug 2026)

Sourced from Swapnil Sahoo's evidence archive (`08_Photo_Assets/Unclassified_Candidates`),
originally exported from his Google Drive. On-screen event signage in the photos themselves
confirms "SAPIENCE 2025 | JULY 30-31, Entrepreneurship Panel" at Great Lakes Gurgaon. Other
identifiable panelists and attendees appear in these photos; the professor confirmed he is
comfortable with their public use, but photographer credit and other individuals' consent are
not independently documented in this repository.

| Local asset                                                        | SHA-256                                                            | Recorded source                                                              | Public provenance                                              | Rights and credit status                                                                                                             |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/gallery/sapience-2025-entrepreneurship-panel.jpg` | `521db3ff07e8ec8dd4e87add494b924ca76254f6db165a8a81dd255c6fb2b2e5` | Personal event photograph supplied directly by Swapnil Sahoo (IMG_1255.JPG), SAPIENCE 2025 | Personal event photograph, SAPIENCE 2025, Great Lakes Gurgaon | Photographer, copyright owner, formal licence, and other attendees' consent/model-release records are not documented in this repository |
| `public/images/gallery/sapience-2025-panel-speaking.jpg`         | `d19808c381a2439cf259afe754dce895fb55ee8b2fda0e56ef490eb6dfcb6e69` | Personal event photograph supplied directly by Swapnil Sahoo (DSC00527.jpg), SAPIENCE 2025 | Personal event photograph, SAPIENCE 2025, Great Lakes Gurgaon | Photographer, copyright owner, formal licence, and other attendees' consent/model-release records are not documented in this repository |
| `public/images/gallery/sapience-2025-panel-group.jpg`            | `5b3e52e61bd15cf8897c12630c1e79fac1e692f212741f30e9816332dac6dd05` | Personal event photograph supplied directly by Swapnil Sahoo (IMG_1266.JPG), SAPIENCE 2025 | Personal event photograph, SAPIENCE 2025, Great Lakes Gurgaon | Photographer, copyright owner, formal licence, and other attendees' consent/model-release records are not documented in this repository |

## PGPM (1-Year MBA) induction, 2026–27 batch (Aug 2026)

Sourced directly from Swapnil Sahoo's own camera card (`F:\100MSDCF`, DSC01225–DSC01609,
355 originals at ~9504×6336) of the incoming PGPM 2026–27 batch's induction programme at
Great Lakes Gurgaon; on-screen "GREAT LAKES GURGAON" branding is visible throughout. Three
were selected and re-encoded from the camera-original JPEGs to WebP (resized to a 1800–2400px
max dimension) for on-site use — same photographs, no crop or retouch beyond resizing.
Many incoming students are visible across the full set; no separate consent/model-release
record is held for any of them.

| Local asset                                                              | SHA-256                                                            | Recorded source                                                                                    | Public provenance                                                    | Rights and credit status                                                                                                             |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/teaching/one-year/induction-auditorium.webp`      | `087003741d7740623e879f9999ff850d723535ba732eb3618b46705fd415cc93` | Personal event photograph supplied directly by Swapnil Sahoo (DSC01369.JPG), PGPM induction, 2026–27 batch | Personal event photograph, PGPM induction, Great Lakes Gurgaon | Photographer, copyright owner, formal licence, and attendees' consent/model-release records are not documented in this repository |
| `public/images/teaching/one-year/induction-facilitation.webp`    | `570e24b605d8ff2f20129411c921ab20abf0f9131e344627d62bee5471b3a353` | Personal event photograph supplied directly by Swapnil Sahoo (DSC01329.JPG), PGPM induction, 2026–27 batch | Personal event photograph, PGPM induction, Great Lakes Gurgaon | Photographer, copyright owner, formal licence, and attendees' consent/model-release records are not documented in this repository |
| `public/images/teaching/one-year/induction-among-cohort.webp`    | `c58b31e4139334a9840f74bc908cc2ca09782e2adc63106f6bfddeb69348d2ae` | Personal event photograph supplied directly by Swapnil Sahoo (DSC01364.JPG), PGPM induction, 2026–27 batch | Personal event photograph, PGPM induction, Great Lakes Gurgaon | Photographer, copyright owner, formal licence, and attendees' consent/model-release records are not documented in this repository |
| `public/images/placements/direct-engagement.webp`                | `a9694136baf8a59e1344c2236ce78153caa35b0ec8d880c774f783e71850c9c2` | Personal event photograph supplied directly by Swapnil Sahoo (DSC01460.JPG), PGPM induction, 2026–27 batch | Personal event photograph, PGPM induction, Great Lakes Gurgaon | Photographer, copyright owner, formal licence, and attendees' consent/model-release records are not documented in this repository |

## Vishnu Sahasranama temple relief (Aug 2026)

Swapnil Sahoo supplied a folder of three images sourced from a Reddit thread about chanting
the Vishnu Sahasranama (`Images/Vishnu Sahashranama`). Two of the three are clearly
AI-generated "fantasy art" (hyper-rendered, stylised depictions with no traditional
iconographic basis) and were **not used**, consistent with this site's existing policy of not
publishing synthetic devotional imagery (see the Generated-media audit below). The third is a
genuine photograph of a traditional South Indian temple relief carving of Vishnu; it carries
no photographer credit or temple identification in the supplied file. It was cropped to remove
an in-camera date-stamp watermark and lightly sharpened/color-corrected — same photograph,
no content added or removed.

| Local asset                                                          | SHA-256                                                            | Recorded source                                                                                  | Public provenance                                            | Rights and credit status                                                                                                 |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `public/images/gallery/vishnu-sahasranama-temple-relief.webp` | `2f4e7b9bdd3b589f85f9ef14db8662f25606389f2585d6122ba7597d9ed89d82` | Photograph of unknown origin supplied by Swapnil Sahoo, sourced from a Reddit thread (`c8xybclc93gg1.jpeg`); cropped to remove an in-camera date-stamp watermark, lightly sharpened and color-corrected | Photograph of a traditional temple relief sculpture of Vishnu | Photographer and temple location are not identified in this repository; formal licence and publication-permission records are not documented |

## Vishnu Sahasranama practical-guidance photos (16 Aug 2026)

Swapnil Sahoo added two further images to the same `Images/Vishnu Sahashranama`
folder, both genuine photographs (no AI-generation markers, no CGI
appearance). Both were re-encoded to webp, lightly sharpened; the second was
also modestly brightness/saturation-corrected. No content was added, removed,
or cropped from either.

| Local asset                                                            | SHA-256                                                            | Recorded source                                                                                    | Public provenance                                                          | Rights and credit status                                                                                                 |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `public/images/gallery/vishnu-sahasranama-gita-press-edition.webp` | `4bbf69af3fa3f901cc02758fe3285e08093cb50766a0cf240cc319f2d848b052` | Photograph of unknown origin supplied by Swapnil Sahoo, sourced from a Reddit thread (`how-to-read-vishnu-sahsranam-properly-v0-vi6ml0h3ykfg1.webp`); re-encoded and lightly sharpened | Photograph of a physical Gita Press Gorakhpur printed edition of the Vishnu Sahasranama Stotram | Photographer is not identified in this repository; formal licence and publication-permission records are not documented |
| `public/images/gallery/vishnu-sahasranama-temple-murti.webp`       | `c0508b12850e18436e3366fc01f8c9984ce2a21a19def5ef824f3fd01cd1026e` | Photograph of unknown origin supplied by Swapnil Sahoo, sourced from a Reddit thread (`the-importance-of-chanting-vishnu-sahasranamam-v0-ggt5trqcfjjh1.webp`); re-encoded, lightly sharpened and modestly brightness/saturation-corrected | Photograph of a crowned, multi-faced stone temple mūrti garlanded for worship | Photographer and temple location are not identified in this repository; formal licence and publication-permission records are not documented |

## Generated-media audit

The 30 July 2026 audit removed every previously public raster asset carrying
OpenAI Media Service provenance metadata, with one documented exception: the
user-approved, identity-preserving retouch that was then hosted at
`public/images/gallery/aom-2026-with-jp-eggers.png`, whose embedded provenance
was retained and admitted by the media check only at that registered path and
SHA-256.

On 15 Aug 2026, that file (and 3 other oversized gallery/comics images) was
re-encoded to fix a real performance bug: the on-demand image-optimization
endpoint was taking 1.5-5 seconds per cold transform on these files, which
was traced to unnecessarily large multi-megabyte source images. Re-encoding
strips embedded metadata as a side effect, so the retouched image (now
`aom-2026-with-jp-eggers.jpg`) no longer carries the OpenAI marker at all —
the media check's approved-asset allowlist was cleared accordingly since
there is nothing left for it to admit. The photograph itself is unchanged
(same retouch, resized/re-encoded, no new edit). Every other raster asset
still fails the check if it carries that marker; any byte change to a
tracked asset requires updating this register (and, only if a future asset
genuinely needs to carry approved OpenAI provenance, the checksum allowlist)
deliberately. The other gallery and teaching images use the camera-original
or programme-shared photographs listed above. The comics page uses a
separately credited human photograph under CC BY-SA 2.0.

## Handling notes

- Do not describe Sagar Aggarwal as the photographer unless new primary
  evidence establishes that attribution.
- Do not attach a Creative Commons or other licence without a documented
  rights grant.
- Keep the applicable provenance record in this register while the photographer
  remains unidentified.
- Before distributing either image beyond this website, confirm the exact Drive
  source file, photographer/copyright owner, permitted uses, and any required
  participant consent with the Great Lakes Gurgaon programme team.
- When better evidence arrives, record the original Drive file ID and filename,
  the evidence source, the rights basis, and the exact public credit before
  changing the gallery copy.
