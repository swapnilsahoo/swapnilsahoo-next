import type { ScriptureCatalogEntry, ScriptureSlug } from "@/features/spirituality/types";

export const scriptureCatalog: Record<ScriptureSlug, ScriptureCatalogEntry> = {
  "hanuman-chalisa": {
    slug: "hanuman-chalisa",
    navLabel: "Authentic Hanuman Chalisa",
    shortTitle: "Hanuman Chalisa",
    title: "Authentic Hanuman Chalisa",
    originalTitle: "श्री हनुमान चालीसा",
    transliteratedTitle: "Śrī Hanumān Cālīsā",
    language: "Old Awadhi · Devanagari + reader-friendly romanization",
    form: "2 opening dohās · 40 caupāīs · 1 closing dohā",
    glyph: "राम",
    dek: "A complete, line-by-line study edition of the beloved praise-poem—its Old Awadhi text, word-level romanization, close meaning, literary form, and Tulsidas attribution presented with care.",
    scopeLabel: "Complete line reader",
    scopeNote:
      "All forty numbered caupāīs are included, together with the opening and closing dohās. The word boundaries and concise English glosses are editorial study aids.",
    entryCountLabel: "86 annotated lines",
    authenticity: [
      {
        label: "Base reading",
        value: "Normalized Devanagari",
        detail:
          "Compared against commonly circulated Old Awadhi readings; spelling and word division can vary between printed and recited traditions.",
      },
      {
        label: "Language",
        value: "Old Awadhi",
        detail:
          "The Chalisa is an early Hindi devotional poem, not a Sanskrit composition. Devanagari is its common modern presentation.",
      },
      {
        label: "Form",
        value: "Dohā + caupāī",
        detail: "Forty numbered caupāī stanzas are framed by opening and concluding dohās.",
      },
      {
        label: "Attribution",
        value: "Traditionally Tulsidas",
        detail:
          "The attribution is longstanding and generally accepted, while no surviving authorial autograph establishes a single exclusive wording.",
      },
    ],
    profiles: [
      {
        role: "Poet traditionally credited",
        name: "Goswami Tulsidas",
        dates: "16th–early 17th century",
        evidenceLabel: "Historical profile",
        summary:
          "Tulsidas was one of early modern North India’s most influential Rama-bhakti poets. Writing in literary vernaculars including Awadhi and Braj, he brought theology, ethics, and poetry to audiences far beyond Sanskrit-reading circles. His Ramcharitmanas, begun in 1574, became foundational to North Indian literary and performance culture. Exact birth details remain uncertain, and many familiar stories about his life belong to devotional biography rather than independently documented history.",
      },
    ],
    editorialPolicy: [
      "The Devanagari line is presented before interpretation so readers can always see the reading being glossed.",
      "The Awadhi layer is a reader-friendly romanization that retains familiar recitation spellings and selected diacritics; it is deliberately not labeled as strict IAST.",
      "Word divisions are editorial. Awadhi compounds, particles, and recited pronunciation can reasonably be parsed in more than one way.",
      "The English meanings are newly prepared, close study glosses—not copied devotional translations and not exhaustive commentary.",
    ],
    sources: [
      {
        title: "The Hanuman Chalisa: text, translation and glossary",
        institution: "HAL / CNRS · Denis Matringe",
        href: "https://hal.science/hal-04606145v1",
        note: "A 2024 scholarly treatment of the Old Awadhi poem, metre, vocabulary, and transmission.",
      },
      {
        title: "Two Poems in Praise of Hanuman (Attributed to Tulsidas)",
        institution: "Oxford Academic · Philip Lutgendorf",
        href: "https://academic.oup.com/book/36076/chapter/313187216",
        note: "A source-aware scholarly framing of the Tulsidas attribution.",
      },
      {
        title: "Tulasīdāsa authority record",
        institution: "Bibliothèque nationale de France",
        href: "https://catalogue.bnf.fr/ark:/12148/cb11927237v.public",
        note: "Library authority data for Tulsidas, his works, language, dates, and literary identity.",
      },
      {
        title: "Hanumana Chalisa",
        institution: "Sanskrit Documents",
        href: "https://sanskritdocuments.org/doc_z_otherlang_hindi/chaalisa.html",
        note: "A volunteer-maintained comparison text; linked for study rather than reposted.",
      },
    ],
  },
  "vishnu-sahasranama": {
    slug: "vishnu-sahasranama",
    navLabel: "Authentic Vishnu Sahasranama",
    shortTitle: "Vishnu Sahasranama",
    title: "Authentic Vishnu Sahasranama",
    originalTitle: "श्री विष्णुसहस्रनाम",
    transliteratedTitle: "Śrī Viṣṇusahasranāma",
    language: "Sanskrit · Devanagari + IAST",
    form: "Mahābhārata hymn · one thousand names",
    glyph: "ॐ",
    dek: "Enter the Mahābhārata’s celebrated litany through a carefully segmented opening sequence, then place every name back inside Bhīṣma’s answer to Yudhiṣṭhira.",
    scopeLabel: "Guided opening edition",
    scopeNote:
      "This on-site study reader covers names 1–36. The complete Sanskrit source remains linked below; expanding all one thousand names requires a declared edition, stable numbering, and independent Sanskrit review.",
    entryCountLabel: "Names 1–36",
    authenticity: [
      {
        label: "Textual home",
        value: "Mahābhārata · Anuśāsanaparvan",
        detail:
          "The BORI critical edition places the episode at 13.135; many traditional editions number it chapter 149.",
      },
      {
        label: "Narrative frame",
        value: "Yudhiṣṭhira asks · Bhīṣma answers",
        detail:
          "Vaiśampāyana narrates the higher-level scene. Bhīṣma is the hymn’s speaker within the epic, not a documented historical author.",
      },
      {
        label: "Traditional attribution",
        value: "Vyāsa as compiler-seer",
        detail:
          "Ritual preliminaries in some recensions name Vyāsa as ṛṣi. This is a sacred textual attribution, not a modern biographical authorship claim.",
      },
      {
        label: "Reader standard",
        value: "Padaccheda + IAST",
        detail:
          "Compounds are opened into learning units, while the unbroken transmitted name remains visible above them.",
      },
    ],
    profiles: [
      {
        role: "Speaker inside the Mahābhārata",
        name: "Bhīṣma",
        evidenceLabel: "Narrative voice",
        summary:
          "Bhīṣma is the elder Kuru statesman and teacher of dharma who speaks from his bed of arrows. When Yudhiṣṭhira asks who is the highest divinity and what recitation leads to the highest good, Bhīṣma answers with Viṣṇu’s thousand names. This identifies the dramatic speaker, not a historically recoverable composer.",
      },
      {
        role: "Traditional epic compiler and seer",
        name: "Kṛṣṇa Dvaipāyana Vyāsa",
        evidenceLabel: "Traditional attribution",
        summary:
          "Hindu tradition remembers Vyāsa as the compiler of the Mahābhārata and organizer of Vedic learning. Some liturgical preliminaries identify him as the ṛṣi of the thousand names. Vyāsa is therefore presented here as a traditional compiler-seer, not as a modern author with independently verifiable dates.",
      },
      {
        role: "Commentary traditionally attributed",
        name: "Śaṅkara",
        dates: "early 8th century",
        evidenceLabel: "Traditional attribution",
        summary:
          "Śaṅkara was the formative philosopher and commentator of Advaita Vedānta. A celebrated Viṣṇusahasranāma commentary circulates under his name, but recent textual scholarship argues that its terminology and citations may point to a later author. The commentary attribution is therefore traditional rather than certain.",
      },
    ],
    editorialPolicy: [
      "Numbering follows a familiar traditional division of the thousand names; name boundaries can differ when compounds and sandhi are resolved differently.",
      "Each card keeps the received Sanskrit name intact, then supplies editorial padaccheda and standard scholarly IAST.",
      "Lexical glosses stay deliberately concise. They do not collapse the distinct readings of Advaita, Viśiṣṭādvaita, and other commentary traditions into one answer.",
      "The reader is an opening study sequence, not a claim to host a fully proofread critical edition of all one thousand names.",
    ],
    sources: [
      {
        title: "Mahābhārata, Book 13 critical-edition text",
        institution: "GRETIL · based on the BORI critical edition",
        href: "https://gretil.sub.uni-goettingen.de/gretil/1_sanskr/2_epic/mbh/mbh_13_u.htm",
        note: "Primary Sanskrit context for the Anuśāsanaparvan episode and critical-edition numbering.",
      },
      {
        title: "Viṣṇusahasranāmastotram",
        institution: "Sanskrit Wikisource",
        href: "https://sa.wikisource.org/wiki/%E0%A4%B5%E0%A4%BF%E0%A4%B7%E0%A5%8D%E0%A4%A3%E0%A5%81%E0%A4%B8%E0%A4%B9%E0%A4%B8%E0%A5%8D%E0%A4%B0%E0%A4%A8%E0%A4%BE%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%8B%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%AE%E0%A5%8D%E2%80%8C",
        note: "A complete Sanskrit reading with the Yudhiṣṭhira–Bhīṣma frame and open-license provenance.",
      },
      {
        title: "Viṣṇu Sahasranāma",
        institution: "Sanskrit Documents",
        href: "https://sanskritdocuments.org/doc_vishhnu/vsahasranew.html",
        note: "A traditional chapter-149 reading used as a comparison source and linked under its custodian’s terms.",
      },
      {
        title: "Authorship of the Viṣṇusahasranāmabhāṣya",
        institution: "International Journal of Hindu Studies · Ivan Andrijanić",
        href: "https://doi.org/10.1007/s11407-025-09405-9",
        note: "Recent research explaining why the commentary’s Śaṅkara attribution should be qualified.",
      },
    ],
  },
  "lalita-sahasranama": {
    slug: "lalita-sahasranama",
    navLabel: "Authentic Lalita Sahasranama",
    shortTitle: "Lalita Sahasranama",
    title: "Authentic Lalita Sahasranama",
    originalTitle: "श्री ललितासहस्रनाम",
    transliteratedTitle: "Śrī Lalitāsahasranāma",
    language: "Sanskrit · Devanagari + IAST",
    form: "Śrīvidyā hymn · one thousand names",
    glyph: "श्री",
    dek: "Read the opening names as precise Sanskrit compounds, then follow the hymn’s own sacred chain of transmission—from the Vāgdevīs to Lalitā’s court, and from Hayagrīva to Agastya.",
    scopeLabel: "Guided opening edition",
    scopeNote:
      "This on-site study reader covers names 1–12 in compound-level detail. The complete text is linked below; recension placement and name numbering are stated rather than silently harmonized.",
    entryCountLabel: "Names 1–12",
    authenticity: [
      {
        label: "Transmission",
        value: "Lalitopākhyāna tradition",
        detail:
          "Colophons associate the hymn with the Brahmāṇḍa Purāṇa’s Uttarakhaṇḍa, though its placement is not uniform across recensions.",
      },
      {
        label: "Sacred attribution",
        value: "Vaśinī and the Vāgdevīs",
        detail:
          "The narrative says Lalitā commissioned the Vāgdevīs to compose and proclaim her names in the divine court.",
      },
      {
        label: "Teaching frame",
        value: "Hayagrīva teaches Agastya",
        detail:
          "This is the text’s narrative chain of transmission, not evidence for a historically identifiable human author.",
      },
      {
        label: "Reader standard",
        value: "Compound analysis + IAST",
        detail:
          "Long names remain intact while their component words and close lexical senses are opened below.",
      },
    ],
    profiles: [
      {
        role: "Composers in the sacred narrative",
        name: "Vaśinī and the Vāgdevīs",
        evidenceLabel: "Traditional attribution",
        summary:
          "The hymn’s own frame says Lalitā commands the goddesses of speech, led by Vaśinī, to compose her thousand names. They recite them in her court so devotees may praise her. This is the liturgy’s sacred account of origin; the historical individual or community that formed the text remains unknown.",
      },
      {
        role: "Teacher in the frame narrative",
        name: "Hayagrīva",
        evidenceLabel: "Narrative voice",
        summary:
          "Hayagrīva—the horse-headed form of Viṣṇu associated with knowledge—reveals the secret hymn to the sage Agastya in the Lalitopākhyāna transmission. The dialogue situates the text within a teacher–disciple lineage.",
      },
      {
        role: "Influential early-modern commentator",
        name: "Bhāskararāya",
        dates: "early 18th century",
        evidenceLabel: "Historical profile",
        summary:
          "Bhāskararāya was a major Śākta theologian and polymath from Maharashtra who worked extensively in southern India. His Saubhāgyabhāskara became one of the most influential commentaries on the Lalitāsahasranāma, bringing Śrīvidyā Tantra into conversation with Vedic learning, Mīmāṃsā, grammar, and devotion. He was a commentator, not the hymn’s author.",
      },
    ],
    editorialPolicy: [
      "The unbroken transmitted name is retained before editorial compound splitting, because grammatical analysis and liturgical counting serve different purposes.",
      "IAST marks long vowels, retroflex consonants, sibilants, and anusvāra consistently; pronunciation still benefits from lineage-based instruction.",
      "The glosses give close lexical orientation. Symbolic and tantric readings are not presented as a single universal translation.",
      "The page says ‘transmitted with the Lalitopākhyāna tradition’ because the hymn’s placement and numbering are not uniform in all Brahmāṇḍa Purāṇa recensions.",
    ],
    sources: [
      {
        title: "Śrī Lalitāsahasranāmastotram",
        institution: "Sanskrit Wikisource",
        href: "https://sa.wikisource.org/wiki/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80_%E0%A4%B2%E0%A4%B2%E0%A4%BF%E0%A4%A4%E0%A4%BE%E0%A4%B8%E0%A4%B9%E0%A4%B8%E0%A5%8D%E0%A4%B0%E0%A4%A8%E0%A4%BE%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%8B%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%AE%E0%A5%8D",
        note: "A complete Sanskrit reading with the Hayagrīva–Agastya frame, colophon, and open-license provenance.",
      },
      {
        title: "Lalitāsahasranāma with pūrvapīṭhikā",
        institution: "Sanskrit Documents",
        href: "https://sanskritdocuments.org/doc_devii/lalitacomplete.html",
        note: "A full traditional reading used for comparison and linked under its custodian’s terms.",
      },
      {
        title: "Rahasyasahasranāmastotra manuscript A 961-32",
        institution: "Nepal-German Manuscript Preservation Project",
        href: "https://www-archiv.fdm.uni-hamburg.de/ngmcp/A_961-32_Rahasyasahasran%25C4%2581mastotra.html",
        note: "Manuscript-catalog evidence for the Hayagrīva–Agastya frame and Lalitopākhyāna colophon.",
      },
      {
        title: "Threads of bhakti",
        institution: "Oxford Academic",
        href: "https://academic.oup.com/book/58948/chapter/493012563",
        note: "Academic context for Bhāskararāya’s Śrīvidyā scholarship and commentary tradition.",
      },
    ],
  },
};

export const scriptureSlugs = Object.keys(scriptureCatalog) as ScriptureSlug[];

export function isScriptureSlug(value: string): value is ScriptureSlug {
  return value in scriptureCatalog;
}
