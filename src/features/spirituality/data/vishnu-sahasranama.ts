import type { ReaderEntry, WordGloss } from "@/features/spirituality/types";

function name(
  sequence: number,
  original: string,
  transliteration: string,
  meaning: string,
  words: WordGloss[]
): ReaderEntry {
  const verse =
    sequence <= 9 ? 1 : sequence <= 17 ? 2 : sequence <= 24 ? 3 : sequence <= 30 ? 4 : 5;

  return {
    id: `vishnu-${sequence}`,
    sequence,
    section: `Opening verse ${verse}`,
    label: `Name ${sequence}`,
    original,
    transliteration,
    meaning,
    words,
  };
}

export const vishnuSahasranamaEntries: ReaderEntry[] = [
  name(1, "विश्वम्", "viśvam", "The universe; all that exists.", [
    { original: "विश्वम्", transliteration: "viśvam", meaning: "the universe; the all" },
  ]),
  name(2, "विष्णुः", "viṣṇuḥ", "The all-pervading One.", [
    { original: "विष्णुः", transliteration: "viṣṇuḥ", meaning: "the all-pervading One" },
  ]),
  name(3, "वषट्कारः", "vaṣaṭkāraḥ", "The sacred invocation embodied in sacrifice.", [
    { original: "वषट्", transliteration: "vaṣaṭ", meaning: "sacrificial exclamation" },
    { original: "कारः", transliteration: "kāraḥ", meaning: "the form or embodiment of" },
  ]),
  name(
    4,
    "भूतभव्यभवत्प्रभुः",
    "bhūta-bhavya-bhavat-prabhuḥ",
    "Lord of what has been, what will be, and what is.",
    [
      { original: "भूत", transliteration: "bhūta", meaning: "past; what has been" },
      { original: "भव्य", transliteration: "bhavya", meaning: "future; what will be" },
      { original: "भवत्", transliteration: "bhavat", meaning: "present; what is" },
      { original: "प्रभुः", transliteration: "prabhuḥ", meaning: "lord; sovereign" },
    ]
  ),
  name(5, "भूतकृत्", "bhūta-kṛt", "Maker of all beings.", [
    { original: "भूत", transliteration: "bhūta", meaning: "beings; created existence" },
    { original: "कृत्", transliteration: "kṛt", meaning: "maker; creator" },
  ]),
  name(6, "भूतभृत्", "bhūta-bhṛt", "Bearer and sustainer of all beings.", [
    { original: "भूत", transliteration: "bhūta", meaning: "beings" },
    { original: "भृत्", transliteration: "bhṛt", meaning: "bearer; sustainer" },
  ]),
  name(7, "भावः", "bhāvaḥ", "Pure being; the source of becoming.", [
    { original: "भावः", transliteration: "bhāvaḥ", meaning: "being; existence; becoming" },
  ]),
  name(8, "भूतात्मा", "bhūtātmā", "The indwelling Self of all beings.", [
    { original: "भूत", transliteration: "bhūta", meaning: "beings" },
    { original: "आत्मा", transliteration: "ātmā", meaning: "self; indwelling essence" },
  ]),
  name(9, "भूतभावनः", "bhūta-bhāvanaḥ", "One who brings beings forth and nurtures them.", [
    { original: "भूत", transliteration: "bhūta", meaning: "beings" },
    { original: "भावनः", transliteration: "bhāvanaḥ", meaning: "one who fosters or brings forth" },
  ]),
  name(10, "पूतात्मा", "pūtātmā", "The perfectly pure Self.", [
    { original: "पूत", transliteration: "pūta", meaning: "purified; pure" },
    { original: "आत्मा", transliteration: "ātmā", meaning: "self" },
  ]),
  name(11, "परमात्मा", "paramātmā", "The supreme Self.", [
    { original: "परम", transliteration: "parama", meaning: "highest; supreme" },
    { original: "आत्मा", transliteration: "ātmā", meaning: "self" },
  ]),
  name(
    12,
    "मुक्तानां परमा गतिः",
    "muktānāṃ paramā gatiḥ",
    "The highest destination of those who are liberated.",
    [
      { original: "मुक्तानाम्", transliteration: "muktānām", meaning: "of the liberated" },
      { original: "परमा", transliteration: "paramā", meaning: "highest; supreme" },
      { original: "गतिः", transliteration: "gatiḥ", meaning: "goal; refuge; destination" },
    ]
  ),
  name(13, "अव्ययः", "avyayaḥ", "The imperishable One.", [
    { original: "अव्ययः", transliteration: "avyayaḥ", meaning: "undecaying; imperishable" },
  ]),
  name(14, "पुरुषः", "puruṣaḥ", "The cosmic Person; the indweller.", [
    { original: "पुरुषः", transliteration: "puruṣaḥ", meaning: "person; indwelling spirit" },
  ]),
  name(15, "साक्षी", "sākṣī", "The witnessing consciousness.", [
    { original: "साक्षी", transliteration: "sākṣī", meaning: "witness" },
  ]),
  name(16, "क्षेत्रज्ञः", "kṣetrajñaḥ", "The knower of the field of experience.", [
    { original: "क्षेत्र", transliteration: "kṣetra", meaning: "field; embodied domain" },
    { original: "ज्ञः", transliteration: "jñaḥ", meaning: "knower" },
  ]),
  name(17, "अक्षरः", "akṣaraḥ", "The undecaying and imperishable.", [
    { original: "अक्षरः", transliteration: "akṣaraḥ", meaning: "imperishable; undecaying" },
  ]),
  name(18, "योगः", "yogaḥ", "Union, integration, and the means to it.", [
    {
      original: "योगः",
      transliteration: "yogaḥ",
      meaning: "union; integration; spiritual discipline",
    },
  ]),
  name(19, "योगविदां नेता", "yogavidāṃ netā", "Guide of those who know yoga.", [
    { original: "योगविदाम्", transliteration: "yogavidām", meaning: "of the knowers of yoga" },
    { original: "नेता", transliteration: "netā", meaning: "leader; guide" },
  ]),
  name(
    20,
    "प्रधानपुरुषेश्वरः",
    "pradhāna-puruṣeśvaraḥ",
    "Lord of primordial nature and conscious beings.",
    [
      { original: "प्रधान", transliteration: "pradhāna", meaning: "primordial nature" },
      { original: "पुरुष", transliteration: "puruṣa", meaning: "conscious person or spirit" },
      { original: "ईश्वरः", transliteration: "īśvaraḥ", meaning: "lord; ruler" },
    ]
  ),
  name(21, "नारसिंहवपुः", "nārasiṃha-vapuḥ", "The One whose form is Narasiṃha.", [
    { original: "नारसिंह", transliteration: "nārasiṃha", meaning: "the Man-Lion manifestation" },
    { original: "वपुः", transliteration: "vapuḥ", meaning: "form; body" },
  ]),
  name(22, "श्रीमान्", "śrīmān", "The bearer of splendour and auspicious abundance.", [
    { original: "श्री", transliteration: "śrī", meaning: "splendour; fortune; auspiciousness" },
    { original: "मान्", transliteration: "mān", meaning: "possessing; bearing" },
  ]),
  name(23, "केशवः", "keśavaḥ", "Keśava, a celebrated name of Viṣṇu.", [
    { original: "केशवः", transliteration: "keśavaḥ", meaning: "Keśava; a name of Viṣṇu" },
  ]),
  name(24, "पुरुषोत्तमः", "puruṣottamaḥ", "The supreme Person.", [
    { original: "पुरुष", transliteration: "puruṣa", meaning: "person; spirit" },
    { original: "उत्तमः", transliteration: "uttamaḥ", meaning: "highest; supreme" },
  ]),
  name(25, "सर्वः", "sarvaḥ", "The all; the One who is everything.", [
    { original: "सर्वः", transliteration: "sarvaḥ", meaning: "all; everything" },
  ]),
  name(26, "शर्वः", "śarvaḥ", "The remover; the One who brings dissolution.", [
    { original: "शर्वः", transliteration: "śarvaḥ", meaning: "remover; destroyer" },
  ]),
  name(27, "शिवः", "śivaḥ", "The auspicious and gracious One.", [
    { original: "शिवः", transliteration: "śivaḥ", meaning: "auspicious; gracious" },
  ]),
  name(28, "स्थाणुः", "sthāṇuḥ", "The firm and unchanging One.", [
    { original: "स्थाणुः", transliteration: "sthāṇuḥ", meaning: "firm; stable; unmoving" },
  ]),
  name(29, "भूतादिः", "bhūtādiḥ", "The origin of all beings.", [
    { original: "भूत", transliteration: "bhūta", meaning: "beings" },
    { original: "आदिः", transliteration: "ādiḥ", meaning: "beginning; origin" },
  ]),
  name(30, "निधिरव्ययः", "nidhir avyayaḥ", "The imperishable treasury and ground of all.", [
    { original: "निधिः", transliteration: "nidhiḥ", meaning: "treasury; repository" },
    { original: "अव्ययः", transliteration: "avyayaḥ", meaning: "imperishable" },
  ]),
  name(31, "सम्भवः", "sambhavaḥ", "The One who manifests by divine will.", [
    { original: "सम्भवः", transliteration: "sambhavaḥ", meaning: "manifestation; arising" },
  ]),
  name(32, "भावनः", "bhāvanaḥ", "The One who generates and nurtures.", [
    { original: "भावनः", transliteration: "bhāvanaḥ", meaning: "one who brings forth or fosters" },
  ]),
  name(33, "भर्ता", "bhartā", "The supporter and sustainer.", [
    { original: "भर्ता", transliteration: "bhartā", meaning: "supporter; sustainer" },
  ]),
  name(34, "प्रभवः", "prabhavaḥ", "The source from whom all proceeds.", [
    { original: "प्रभवः", transliteration: "prabhavaḥ", meaning: "source; origin" },
  ]),
  name(35, "प्रभुः", "prabhuḥ", "The sovereign Lord.", [
    { original: "प्रभुः", transliteration: "prabhuḥ", meaning: "master; sovereign lord" },
  ]),
  name(36, "ईश्वरः", "īśvaraḥ", "The supreme ruler.", [
    { original: "ईश्वरः", transliteration: "īśvaraḥ", meaning: "lord; supreme ruler" },
  ]),
];
