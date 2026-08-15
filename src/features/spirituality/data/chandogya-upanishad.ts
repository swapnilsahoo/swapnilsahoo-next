import type { ReaderEntry, WordGloss } from "@/features/spirituality/types";

type Word = Required<WordGloss>;

function entry(
  id: string,
  sequence: number,
  section: string,
  label: string,
  original: string,
  transliteration: string,
  meaning: string,
  words: Word[],
  note?: string
): ReaderEntry {
  return { id, sequence, section, label, original, transliteration, meaning, words, note };
}

const SECTION = "Prapāṭhaka 1 · Khaṇḍa 1 (Om as the udgītha)";

export const chandogyaUpanishadEntries: ReaderEntry[] = [
  entry(
    "chandogya-1-1-1",
    1,
    SECTION,
    "1.1.1",
    "ओमित्येतदक्षरमुद्गीथमुपासीत। ओमिति ह्युद्गायति तस्योपव्याख्यानम्॥",
    "om ity etad akṣaram udgītham upāsīta. om iti hy udgāyati tasyopavyākhyānam.",
    "One should meditate on the syllable Om as the udgītha — for one begins the udgītha-chant with Om. Here follows its explanation.",
    [
      { original: "ओम् इति एतत् अक्षरम्", transliteration: "om iti etad akṣaram", meaning: "the syllable that is this: Om" },
      { original: "उद्गीथम् उपासीत", transliteration: "udgītham upāsīta", meaning: "one should meditate on it as the udgītha" },
      { original: "ओम् इति हि उद्गायति", transliteration: "om iti hy udgāyati", meaning: "for one chants the udgītha starting with Om" },
      { original: "तस्य उपव्याख्यानम्", transliteration: "tasyopavyākhyānam", meaning: "of this, here follows the explanation" },
    ]
  ),
  entry(
    "chandogya-1-1-2",
    2,
    SECTION,
    "1.1.2",
    "एषां भूतानां पृथिवी रसः, पृथिव्या आपो रसः, अपामोषधयो रसः, ओषधीनां पुरुषो रसः, पुरुषस्य वाग्रसः, वाच ऋग्रसः, ऋचः साम रसः, साम्न उद्गीथो रसः॥",
    "eṣāṃ bhūtānāṃ pṛthivī rasaḥ, pṛthivyā āpo rasaḥ, apām oṣadhayo rasaḥ, oṣadhīnāṃ puruṣo rasaḥ, puruṣasya vāg rasaḥ, vāca ṛg rasaḥ, ṛcaḥ sāma rasaḥ, sāmna udgītho rasaḥ.",
    "The earth is the essence of these beings; water is the essence of the earth; plants are the essence of water; the person is the essence of plants; speech is the essence of the person; the Ṛk is the essence of speech; the Sāma is the essence of the Ṛk; the udgītha is the essence of the Sāma.",
    [
      { original: "एषां भूतानां पृथिवी रसः", transliteration: "eṣāṃ bhūtānāṃ pṛthivī rasaḥ", meaning: "of these beings, the earth is the essence" },
      { original: "पृथिव्या आपो रसः", transliteration: "pṛthivyā āpo rasaḥ", meaning: "of the earth, water is the essence" },
      { original: "अपामोषधयो रसः", transliteration: "apām oṣadhayo rasaḥ", meaning: "of water, plants are the essence" },
      { original: "ओषधीनां पुरुषो रसः", transliteration: "oṣadhīnāṃ puruṣo rasaḥ", meaning: "of plants, the person is the essence" },
      { original: "पुरुषस्य वाग्रसः", transliteration: "puruṣasya vāg rasaḥ", meaning: "of the person, speech is the essence" },
      { original: "वाच ऋग्रसः", transliteration: "vāca ṛg rasaḥ", meaning: "of speech, the Ṛk is the essence" },
      { original: "ऋचः साम रसः", transliteration: "ṛcaḥ sāma rasaḥ", meaning: "of the Ṛk, the Sāma is the essence" },
      { original: "साम्न उद्गीथो रसः", transliteration: "sāmna udgītho rasaḥ", meaning: "of the Sāma, the udgītha is the essence" },
    ]
  ),
  entry(
    "chandogya-1-1-3",
    3,
    SECTION,
    "1.1.3",
    "स एष रसानां रसतमः परमः परार्ध्योऽष्टमो यदुद्गीथः॥",
    "sa eṣa rasānāṃ rasatamaḥ paramaḥ parārdhyo 'ṣṭamo yad udgīthaḥ.",
    "This udgītha is the essence of essences, the highest, worthy of the highest place — the eighth.",
    [
      { original: "स एष रसानां रसतमः", transliteration: "sa eṣa rasānāṃ rasatamaḥ", meaning: "this, of essences, is the essence of essences" },
      { original: "परमः परार्ध्यः", transliteration: "paramaḥ parārdhyaḥ", meaning: "the highest, worthy of the highest place" },
      { original: "अष्टमो यदुद्गीथः", transliteration: "aṣṭamo yad udgīthaḥ", meaning: "the eighth — namely, the udgītha" },
    ]
  ),
  entry(
    "chandogya-1-1-4",
    4,
    SECTION,
    "1.1.4",
    "कतमा कतमर्क्, कतमत्साम, कतमः कतम उद्गीथ इति विचिकित्सितं भवति॥",
    "katamā katamark, katamat sāma, katamaḥ katama udgītha iti vicikitsitaṃ bhavati.",
    "Which, then, is the Ṛk? Which is the Sāma? Which is the udgītha? This becomes a matter of inquiry.",
    [
      { original: "कतमा कतमर्क्", transliteration: "katamā katamark", meaning: "which, which, is the Ṛk" },
      { original: "कतमत्साम", transliteration: "katamat sāma", meaning: "which, which, is the Sāma" },
      { original: "कतमः कतम उद्गीथः", transliteration: "katamaḥ katama udgīthaḥ", meaning: "which, which, is the udgītha" },
      { original: "इति विचिकित्सितं भवति", transliteration: "iti vicikitsitaṃ bhavati", meaning: "thus this becomes a matter of inquiry" },
    ]
  ),
  entry(
    "chandogya-1-1-5",
    5,
    SECTION,
    "1.1.5",
    "वागेवर्क्, प्राणः साम, तदेतदृक्सामयोर्मिथुनं यद्वाक्च प्राणश्च॥",
    "vāgevark, prāṇaḥ sāma, tad etad ṛksāmayor mithunaṃ yad vākca prāṇaśca.",
    "Speech indeed is the Ṛk; breath is the Sāma. This, then, is the pairing of Ṛk and Sāma — namely, speech and breath.",
    [
      { original: "वागेवर्क्", transliteration: "vāg eva ṛk", meaning: "speech indeed is the Ṛk" },
      { original: "प्राणः साम", transliteration: "prāṇaḥ sāma", meaning: "breath (the life-force) is the Sāma" },
      { original: "तदेतदृक्सामयोर्मिथुनं", transliteration: "tad etad ṛksāmayor mithunam", meaning: "this, then, is the pairing of Ṛk and Sāma" },
      { original: "यद्वाक्च प्राणश्च", transliteration: "yad vākca prāṇaśca", meaning: "namely, speech and breath together" },
    ]
  ),
  entry(
    "chandogya-1-1-6",
    6,
    SECTION,
    "1.1.6",
    "तदेतन्मिथुनमोमित्येतस्मिन्नक्षरे संसृज्यते। यदा वै मिथुनौ समागच्छत आपयतो वा उ तावन्योन्यस्य कामम्॥",
    "tad etan mithunam om ity etasminn akṣare saṃsṛjyate. yadā vai mithunau samāgacchata āpayato vā u tāv anyonyasya kāmam.",
    "This pairing is joined together in the syllable Om. When a pair come together, the two of them fulfil each other's desire.",
    [
      { original: "तदेतन्मिथुनम्", transliteration: "tad etan mithunam", meaning: "this pairing" },
      { original: "ओमित्येतस्मिन्नक्षरे संसृज्यते", transliteration: "om ity etasminn akṣare saṃsṛjyate", meaning: "is joined together in this syllable, Om" },
      { original: "यदा वै मिथुनौ समागच्छतः", transliteration: "yadā vai mithunau samāgacchataḥ", meaning: "when a pair come together" },
      { original: "आपयतो वा उ तौ", transliteration: "āpayato vā u tau", meaning: "the two of them indeed bring about" },
      { original: "अन्योन्यस्य कामम्", transliteration: "anyonyasya kāmam", meaning: "each other's desire" },
    ]
  ),
  entry(
    "chandogya-1-1-7",
    7,
    SECTION,
    "1.1.7",
    "आपयिता ह वे कामानां भवति य एतदेवं विद्वानक्षरमुद्गीथमुपास्ते॥",
    "āpayitā ha vai kāmānāṃ bhavati ya etadevaṃ vidvān akṣaram udgītham upāste.",
    "Whoever, knowing this, meditates on the syllable as the udgītha becomes a fulfiller of desires.",
    [
      { original: "आपयिता ह वे कामानां भवति", transliteration: "āpayitā ha vai kāmānāṃ bhavati", meaning: "becomes indeed a fulfiller of desires" },
      { original: "य एतदेवं विद्वान्", transliteration: "ya etad evaṃ vidvān", meaning: "whoever, knowing this thus" },
      { original: "अक्षरमुद्गीथमुपास्ते", transliteration: "akṣaram udgītham upāste", meaning: "meditates on the syllable as the udgītha" },
    ]
  ),
  entry(
    "chandogya-1-1-8",
    8,
    SECTION,
    "1.1.8",
    "तद्वा एतदनुज्ञाक्षरं यद्धि किंचानुजानात्योमित्येव तदाह, एषा एव समृद्धिर्यदनुज्ञा। समर्धयिता ह वै कामानां भवति य एतदेवं विद्वानक्षरमुद्गीथमुपास्ते॥",
    "tad vā etad anujñākṣaraṃ yaddhi kiṃ cānujānāty om ity eva tadāha, eṣā eva samṛddhir yad anujñā. samardhayitā ha vai kāmānāṃ bhavati ya etadevaṃ vidvān akṣaram udgītham upāste.",
    "This syllable is also the syllable of assent — for whatever a person assents to, one says exactly 'Om.' Assent itself is a kind of fulfilment. Whoever, knowing this, meditates on the syllable as the udgītha becomes a fulfiller of desires.",
    [
      { original: "तद्वा एतदनुज्ञाक्षरं", transliteration: "tad vā etad anujñākṣaram", meaning: "this, moreover, is the syllable of assent" },
      { original: "यद्धि किंचानुजानाति", transliteration: "yaddhi kiṃ cānujānāti", meaning: "for whatever a person assents to" },
      { original: "ओमित्येव तदाह", transliteration: "om ity eva tad āha", meaning: "one says exactly 'Om' to it" },
      { original: "एषा एव समृद्धिर्यदनुज्ञा", transliteration: "eṣā eva samṛddhir yad anujñā", meaning: "this assent itself is a kind of fulfilment" },
      { original: "समर्धयिता ह वै कामानां भवति", transliteration: "samardhayitā ha vai kāmānāṃ bhavati", meaning: "becomes indeed a fulfiller of desires" },
      { original: "य एतदेवं विद्वानक्षरमुद्गीथमुपास्ते", transliteration: "ya etadevaṃ vidvān akṣaram udgītham upāste", meaning: "whoever, knowing this, meditates on the syllable as the udgītha" },
    ]
  ),
  entry(
    "chandogya-1-1-9",
    9,
    SECTION,
    "1.1.9",
    "तेनेयं त्रयी विद्या वर्तते। ओमित्याश्रावयत्योमिति शंसत्योमित्युद्गायत्येतस्यैवाक्षरस्यापचित्यै महिम्ना रसेन॥",
    "teneyaṃ trayī vidyā vartate. om ity āśrāvayaty om iti śaṃsaty om ity udgāyaty etasyaivākṣarasyāpacityai mahimnā rasena.",
    "By that syllable this threefold Vedic knowledge proceeds: one calls out with Om, recites with Om, chants with Om — in honour of that very syllable, by its greatness and by its essence.",
    [
      { original: "तेनेयं त्रयी विद्या वर्तते", transliteration: "teneyaṃ trayī vidyā vartate", meaning: "by that syllable this threefold Vedic knowledge proceeds" },
      { original: "ओमित्याश्रावयति", transliteration: "om ity āśrāvayati", meaning: "one calls out [the invitation to the rite] with Om" },
      { original: "ओमिति शंसति", transliteration: "om iti śaṃsati", meaning: "one recites [the verse] with Om" },
      { original: "ओमित्युद्गायति", transliteration: "om ity udgāyati", meaning: "one chants with Om" },
      { original: "एतस्यैवाक्षरस्यापचित्यै महिम्ना रसेन", transliteration: "etasyaivākṣarasyāpacityai mahimnā rasena", meaning: "in honour of this very syllable, by its greatness and its essence" },
    ]
  ),
  entry(
    "chandogya-1-1-10",
    10,
    SECTION,
    "1.1.10",
    "तेनोभौ कुरुतो यश्चैतदेवं वेद यश्च न वेद। नाना तु विद्या चाविद्या च यदेव विद्यया करोति श्रद्धयोपनिषदा तदेव वीर्यवत्तरं भवतीति खल्वेतस्यैवाक्षरस्योपव्याख्यानं भवति॥",
    "tenobhau kuruto yaścaitad evaṃ veda yaśca na veda. nānā tu vidyā cāvidyā ca yad eva vidyayā karoti śraddhayopaniṣadā tad eva vīryavattaraṃ bhavatīti khalv etasyaivākṣarasyopavyākhyānaṃ bhavati.",
    "Both the one who knows this and the one who does not know it act by that syllable — but knowledge and ignorance yield different results. Whatever is done with knowledge, with faith, and with understanding becomes more potent. This, then, is the explanation of that syllable.",
    [
      { original: "तेनोभौ कुरुतो", transliteration: "tenobhau kuruto", meaning: "with that syllable, both act" },
      { original: "यश्चैतदेवं वेद यश्च न वेद", transliteration: "yaścaitad evaṃ veda yaśca na veda", meaning: "the one who knows this thus, and the one who does not know it" },
      { original: "नाना तु विद्या चाविद्या च", transliteration: "nānā tu vidyā cāvidyā ca", meaning: "but knowledge and ignorance are different" },
      { original: "यदेव विद्यया करोति श्रद्धयोपनिषदा", transliteration: "yad eva vidyayā karoti śraddhayopaniṣadā", meaning: "whatever one does with knowledge, with faith, and with understanding" },
      { original: "तदेव वीर्यवत्तरं भवति", transliteration: "tad eva vīryavattaraṃ bhavati", meaning: "that indeed becomes more potent" },
      { original: "इति खल्वेतस्यैवाक्षरस्योपव्याख्यानं भवति", transliteration: "iti khalv etasyaivākṣarasyopavyākhyānaṃ bhavati", meaning: "thus, indeed, this is the explanation of that very syllable" },
    ]
  ),
];
