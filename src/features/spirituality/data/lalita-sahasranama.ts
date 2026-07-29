import type { ReaderEntry, WordGloss } from "@/features/spirituality/types";

function name(
  sequence: number,
  original: string,
  transliteration: string,
  meaning: string,
  words: WordGloss[]
): ReaderEntry {
  return {
    id: `lalita-${sequence}`,
    sequence,
    section:
      sequence <= 5 ? "Opening verse 1" : sequence <= 9 ? "Opening verse 2" : "Opening verse 3",
    label: `Name ${sequence}`,
    original,
    transliteration,
    meaning,
    words,
  };
}

export const lalitaSahasranamaEntries: ReaderEntry[] = [
  name(1, "श्रीमाता", "śrīmātā", "The auspicious Mother.", [
    { original: "श्री", transliteration: "śrī", meaning: "auspicious; radiant; revered" },
    { original: "माता", transliteration: "mātā", meaning: "mother" },
  ]),
  name(2, "श्रीमहाराज्ञी", "śrīmahārājñī", "The auspicious supreme Empress.", [
    { original: "श्री", transliteration: "śrī", meaning: "auspicious; radiant; revered" },
    { original: "महा", transliteration: "mahā", meaning: "great; supreme" },
    { original: "राज्ञी", transliteration: "rājñī", meaning: "queen; empress" },
  ]),
  name(3, "श्रीमत्सिंहासनेश्वरी", "śrīmat-siṃhāsaneśvarī", "Sovereign of the resplendent throne.", [
    { original: "श्रीमत्", transliteration: "śrīmat", meaning: "resplendent; glorious" },
    { original: "सिंहासन", transliteration: "siṃhāsana", meaning: "throne" },
    { original: "ईश्वरी", transliteration: "īśvarī", meaning: "sovereign; ruling goddess" },
  ]),
  name(
    4,
    "चिदग्निकुण्डसम्भूता",
    "cid-agni-kuṇḍa-sambhūtā",
    "Manifest from the fire-pit of consciousness.",
    [
      { original: "चित्", transliteration: "cit", meaning: "consciousness" },
      { original: "अग्नि", transliteration: "agni", meaning: "fire" },
      { original: "कुण्ड", transliteration: "kuṇḍa", meaning: "sacred fire-pit" },
      { original: "सम्भूता", transliteration: "sambhūtā", meaning: "arisen; manifested" },
    ]
  ),
  name(5, "देवकार्यसमुद्यता", "deva-kārya-samudyatā", "Arisen to accomplish the divine purpose.", [
    { original: "देव", transliteration: "deva", meaning: "divine; of the deities" },
    { original: "कार्य", transliteration: "kārya", meaning: "purpose; task" },
    { original: "समुद्यता", transliteration: "samudyatā", meaning: "risen; set in action" },
  ]),
  name(6, "उद्यद्भानुसहस्राभा", "udyad-bhānu-sahasrābhā", "Radiant like a thousand rising suns.", [
    { original: "उद्यत्", transliteration: "udyat", meaning: "rising" },
    { original: "भानु", transliteration: "bhānu", meaning: "sun" },
    { original: "सहस्र", transliteration: "sahasra", meaning: "thousand" },
    { original: "आभा", transliteration: "ābhā", meaning: "radiance; lustre" },
  ]),
  name(7, "चतुर्बाहुसमन्विता", "catur-bāhu-samanvitā", "Endowed with four arms.", [
    { original: "चतुर्", transliteration: "catur", meaning: "four" },
    { original: "बाहु", transliteration: "bāhu", meaning: "arms" },
    { original: "समन्विता", transliteration: "samanvitā", meaning: "endowed with; accompanied by" },
  ]),
  name(
    8,
    "रागस्वरूपपाशाढ्या",
    "rāga-svarūpa-pāśāḍhyā",
    "Richly bearing the noose whose nature is loving attraction.",
    [
      { original: "राग", transliteration: "rāga", meaning: "love; attraction; colour" },
      { original: "स्वरूप", transliteration: "svarūpa", meaning: "essential form; nature" },
      { original: "पाश", transliteration: "pāśa", meaning: "noose; bond" },
      { original: "आढ्या", transliteration: "āḍhyā", meaning: "richly endowed with" },
    ]
  ),
  name(
    9,
    "क्रोधाकाराङ्कुशोज्ज्वला",
    "krodhākārāṅkuśojjvalā",
    "Radiant with the goad whose form is corrective force.",
    [
      {
        original: "क्रोधाकार",
        transliteration: "krodhākāra",
        meaning: "having the form of force or anger",
      },
      {
        original: "अङ्कुश",
        transliteration: "aṅkuśa",
        meaning: "elephant goad; instrument of direction",
      },
      { original: "उज्ज्वला", transliteration: "ujjvalā", meaning: "radiant; blazing" },
    ]
  ),
  name(
    10,
    "मनोरूपेक्षुकोदण्डा",
    "mano-rūpekṣu-kodaṇḍā",
    "Whose sugarcane bow takes the form of the mind.",
    [
      { original: "मनः", transliteration: "manaḥ", meaning: "mind" },
      { original: "रूप", transliteration: "rūpa", meaning: "form" },
      { original: "इक्षु", transliteration: "ikṣu", meaning: "sugarcane" },
      { original: "कोदण्डा", transliteration: "kodaṇḍā", meaning: "bow" },
    ]
  ),
  name(
    11,
    "पञ्चतन्मात्रसायका",
    "pañca-tanmātra-sāyakā",
    "Whose arrows are the five subtle sensory principles.",
    [
      { original: "पञ्च", transliteration: "pañca", meaning: "five" },
      { original: "तन्मात्र", transliteration: "tanmātra", meaning: "subtle sensory principle" },
      { original: "सायका", transliteration: "sāyakā", meaning: "arrows" },
    ]
  ),
  name(
    12,
    "निजारुणप्रभापूरमज्जद्ब्रह्माण्डमण्डला",
    "nijāruṇa-prabhā-pūra-majjad-brahmāṇḍa-maṇḍalā",
    "Whose own crimson radiance immerses the sphere of the cosmos.",
    [
      { original: "निज", transliteration: "nija", meaning: "her own" },
      { original: "अरुण", transliteration: "aruṇa", meaning: "crimson; dawn-red" },
      { original: "प्रभा", transliteration: "prabhā", meaning: "radiance" },
      { original: "पूर", transliteration: "pūra", meaning: "flood; fullness" },
      { original: "मज्जत्", transliteration: "majjat", meaning: "immersing; submerging" },
      { original: "ब्रह्माण्ड", transliteration: "brahmāṇḍa", meaning: "cosmos" },
      { original: "मण्डला", transliteration: "maṇḍalā", meaning: "sphere; total domain" },
    ]
  ),
];
