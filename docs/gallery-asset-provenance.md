# Gallery asset provenance register

This internal register records the evidence trail available for locally hosted
gallery assets. It is not a copyright clearance record, a licence, or evidence
of consent from people pictured.

## AOM 2026

The event photographs below were supplied directly by Swapnil Sahoo. The
presentation photograph's session context was checked against the
[official AOM 2026 programme](https://events.aom.org/events/aom-2026/session/cBpcAGEGq2KU8qoDBFRUV).

| Local asset                                                            | SHA-256                                                            | Recorded source                                                                                                                                                  | Public provenance                                                                                         | Rights and credit status                                                                                                |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `public/images/gallery/aom-2026-entrepreneurship-under-constraint.png` | `6df55e3c5d283456ede98bf2b6bcea48592247ea0430c1804f4b1f6c0fdb083b` | Personal event photograph supplied directly by Swapnil Sahoo for this gallery                                                                                    | Personal event photograph supplied by Swapnil Sahoo                                                       | Photographer, copyright owner, formal licence, and publication-permission records are not documented in this repository |
| `public/images/gallery/aom-2026-with-jp-eggers.png`                    | `99ccfd068b16984dbb9ece89a57c81581f27606357fd272f9bfffaa98d3f1f19` | User-supplied portrait (`163dbe4f956623d0d90e862e9371143eb9b3a10ec7615a7cf791a740fa9e4295`); identity-preserving professional retouch requested by Swapnil Sahoo | AI-assisted professional retouch of a user-supplied event photograph; embedded OpenAI provenance retained | Photographer, copyright owner, formal licence, and publication-permission records are not documented in this repository |

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
| `public/images/ai-hackathon/hackathon-demo.jpg`            | `12a79fd2b98b847279a2799f3bb54009e987e6c62854831b71865222d9e75a51` | AI Mini Hackathon camera originals; exact Drive file unresolved                      | Camera-original event photograph; photographer not identified                             | Photographer, copyright owner, licence, publication permission, and consent/model-release records are not documented in this repository |
| `public/images/ai-hackathon/hackathon-room.jpg`            | `733203f61ff385322ea3286376723fc74c6ee655406118ad940834d278ecfe79` | AI Mini Hackathon camera originals; exact Drive file unresolved                      | Camera-original event photograph; photographer not identified                             | Photographer, copyright owner, licence, publication permission, and consent/model-release records are not documented in this repository |
| `public/images/gallery/ai-mini-hackathon-winners-2026.jpg` | `96befdd72f158a4ca36596a5185b8002f40baa9935f8cfc679850f27f36e1aeb` | Great Lakes Gurgaon event-media collection listed above; exact Drive file unresolved | Event media shared by the Great Lakes Gurgaon programme team; photographer not identified | Photographer, copyright owner, licence, publication permission, and consent/model-release records are not documented in this repository |
| `public/images/gallery/ai-mini-hackathon-team-2026.jpg`    | `8621cfd56a789a7fc198f73868a60a79971f62e15b4ce31d009b260643467774` | Great Lakes Gurgaon event-media collection listed above; exact Drive file unresolved | Event media shared by the Great Lakes Gurgaon programme team; photographer not identified | Photographer, copyright owner, licence, publication permission, and consent/model-release records are not documented in this repository |

The two camera originals are 4608 × 3072 JPEG files. Their embedded EXIF names
a Sony ILCE-7M4 camera and records 5 July 2026 capture times, but does not name
a photographer. The two gallery exports are 1920 × 1080 JPEG files whose
embedded metadata identifies Adobe Lightroom as the export software but does
not identify a photographer.

## Generated-media audit

The 30 July 2026 audit removed every previously public raster asset carrying
OpenAI Media Service provenance metadata. The sole current exception is the
user-approved, identity-preserving retouch
`public/images/gallery/aom-2026-with-jp-eggers.png`. Its embedded provenance is
retained, and the media check admits it only at the registered path with the
registered SHA-256. Every other marked raster fails the check; any byte change
to this asset also fails until both this register and the checksum allowlist are
deliberately updated. The other gallery and teaching images use the
camera-original or programme-shared photographs listed above. The comics page
uses a separately credited human photograph under CC BY-SA 2.0.

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
