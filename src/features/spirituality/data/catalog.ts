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
    traditionalBenefits: {
      eyebrow: "What the closing dohā promises",
      title: "The forty caupāīs end with their own promise.",
      items: [
        "Sat bar path kare koi—recite it a hundred times, the closing dohā says, and one is freed from bondage and reaches great bliss.",
        "Protection carried through the whole poem: courage, strength and steadiness against fear and obstacles, in Hanuman's own character as Sankat Mochan, remover of troubles.",
        "A settled mind—the poem is recited daily by millions precisely to steady attention before the day's first real decision, not only at moments of crisis.",
      ],
      disclaimer:
        "I'm presenting this as the closing dohā's own devotional promise, already fully glossed line by line in the reader above—not as a separate, independently verified claim.",
    },
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
    dek: "Meet all one thousand names in their received order, with Devanagari, consistent IAST, a concise name-level gloss, and the Mahābhārata setting in which Bhīṣma teaches Yudhiṣṭhira.",
    scopeLabel: "Complete declared 1,000-name enumeration",
    scopeNote:
      "All 1,000 names are present in the common enumeration documented by the declared 1927 Sastry edition and checked against the Sanskrit Wikisource stotra. Each card offers a concise editorial name-level gloss; it does not pretend that a web gloss replaces the interpretive depth of the commentary traditions.",
    entryCountLabel: "All 1,000 names",
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
        value: "Complete order + IAST",
        detail:
          "Every counted name remains intact. IAST follows the declared Devanagari reading, and the English layer is explicitly a concise name-level gloss.",
      },
    ],
    profiles: [
      {
        role: "Speaker inside the Mahābhārata",
        name: "Bhīṣma",
        evidenceLabel: "Narrative voice",
        summary:
          "Bhīṣma is the elder Kuru statesman and teacher of dharma who speaks from his bed of arrows. Kṛṣṇa himself redirects Yudhiṣṭhira's questions on dharma to Bhīṣma, saying the dying patriarch is best placed to answer; asked who is the highest divinity and what recitation leads to the highest good, Bhīṣma answers with Viṣṇu's thousand names, with Kṛṣṇa and Vyāsa present as the scene's witnesses. This identifies the dramatic speaker, not a historically recoverable composer.",
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
      "The sequence follows the common 1,000-name division documented by the 1927 Sastry edition and checked against the declared Sanskrit Wikisource stotra. Multiword expressions can count as one name, repeated epithets remain part of the received sequence, and name boundaries can differ when compounds and sandhi are resolved in other editions.",
      "The Devanagari layer is adapted from Sanskrit Wikisource under CC BY-SA 4.0. Presentation punctuation and zero-width characters were cleaned, names were segmented according to the declared enumeration, and IAST was prepared from that normalized layer.",
      "At name 396 this reader selects the Wikisource base reading विरजः (virajaḥ); that witness also prints विरतः (virataḥ) as a variant.",
      "The English is a newly edited, concise orientation informed by R. Ananthakrishna Sastry’s public-domain 1927 translation of the commentary traditionally attributed to Śaṅkara. It is name-level, not a claim of exhaustive word-by-word or doctrinal commentary.",
      "Short glosses cannot collapse the distinct readings of Advaita, Viśiṣṭādvaita, Dvaita, and other commentary traditions into one final answer.",
      "The Mahābhārata setting and its chapter-numbering variants are stated openly: the BORI critical edition places the episode at Anuśāsanaparvan 13.135, while many traditional editions identify it as chapter 149.",
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
        institution: "Sanskrit Wikisource · CC BY-SA 4.0",
        href: "https://sa.wikisource.org/wiki/%E0%A4%B5%E0%A4%BF%E0%A4%B7%E0%A5%8D%E0%A4%A3%E0%A5%81%E0%A4%B8%E0%A4%B9%E0%A4%B8%E0%A5%8D%E0%A4%B0%E0%A4%A8%E0%A4%BE%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%8B%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%AE%E0%A5%8D%E2%80%8C",
        note: "Base verse reading, checked on 30 July 2026. This site cleans presentation punctuation and zero-width characters, applies the declared name segmentation, and prepares IAST from the normalized Devanagari.",
      },
      {
        title: "Creative Commons Attribution-ShareAlike 4.0 International",
        institution: "Creative Commons",
        href: "https://creativecommons.org/licenses/by-sa/4.0/",
        note: "License governing the Wikisource-derived Devanagari and corresponding IAST layer; attribution, change indication, and ShareAlike apply.",
      },
      {
        title: "The Vishnu Sahasranama with the Bhāṣya of Śrī Śaṅkarācārya · 2nd edition",
        institution: "Internet Archive · R. Ananthakrishna Sastry, 1927",
        href: "https://archive.org/details/Vishnu.Sahasranama.with.the.Bhasya.of.Sankaracharya",
        note: "A public-domain English translation of the commentary traditionally attributed to Śaṅkara, used as a lexical and commentarial witness while preparing the concise modern name-glosses.",
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
      {
        title:
          "Phalaśruti — Sri Vishnu Sahasranama Stotram: Sanskrit, Transliteration and English Translation",
        institution: "The Divine Life Society · Swami Krishnananda",
        href: "https://www.swami-krishnananda.org/vishnu/vishnu_phala.html",
        note: "Source for the traditional phala-śruti (fruits-of-recitation) verses summarised below — presented as the text's own devotional promise, not an independent claim.",
      },
      {
        title: "Vishnu Sahastranaam Path Chanting Rules",
        institution: "MantraVidya",
        href: "https://mantravidya.com/en/vishnu-sahastranaam-path-chanting-rules/",
        note: "Source corroborating the traditional recitation practice — timing, preparation and posture — summarised in the practical-guidance section below.",
      },
    ],
    traditionalBenefits: {
      eyebrow: "What the tradition promises",
      title: "Recitation's own phala-śruti, read for what it offers.",
      items: [
        "Freedom from misfortune, in this life and beyond, for anyone who hears or recites it daily.",
        "Fulfilment matched to what is sought — dharma for those seeking it, prosperity for those seeking wealth, progeny for those wanting children.",
        "Fame, steady prosperity, and a settled, unshakeable share of good fortune.",
        "Freedom from fear, renewed vitality, freedom from disease, and a brighter, stronger bearing.",
        "Release promised to the afflicted, the bound, the frightened and the crisis-struck.",
        "A quicker crossing through difficulty, and inner happiness, patience and a lasting good name.",
        "For anyone distressed, dejected, frightened or unwell who simply calls on Nārāyaṇa's name — the phala-śruti promises complete release from that suffering.",
      ],
      disclaimer:
        "I'm presenting this as the phala-śruti's own traditional promise — the fruits of recitation as the closing verses describe them — not as a scientific or guaranteed claim. What recitation brings is between the reciter and their own experience.",
      image: {
        src: "/images/gallery/vishnu-sahasranama-temple-relief.webp",
        alt: "A traditional South Indian temple relief sculpture of Vishnu holding the conch, discus, mace and lotus, flanked by two smaller attendant figures",
      },
    },
    practicalGuidance: {
      eyebrow: "How devotees traditionally recite it",
      title: "A simple, traditional way to sit with the thousand names.",
      items: [
        "Brahma muhūrta — roughly the last ninety minutes before sunrise — is the traditionally preferred window; the early evening or just before bed are the common alternatives when mornings aren't possible.",
        "A short physical reset comes first: a bath if possible or at least washing the hands and feet, clean clothes, and a few rounds of slow, settling breath before opening the eyes to read.",
        "Sitting upright — on a chair or the floor, facing east — is preferred over reciting lying down; many households light a small lamp to mark the space as set apart for the reading.",
        "A little water, fruit or a yellow sweet is traditionally offered before the mūrti or image beforehand, then shared with the household once the recitation and a further quiet moment of meditation are done.",
        "Listening with attention counts as much as reciting it yourself — for a text of a thousand names, tradition treats hearing it read aloud with devotion as an equally valid practice, not a lesser one.",
      ],
      disclaimer:
        "I'm describing this as widely followed traditional practice, not a rule this reader needs to follow before the thousand names above mean anything on their own.",
      images: [
        {
          src: "/images/gallery/vishnu-sahasranama-gita-press-edition.webp",
          alt: "A physical Gita Press Gorakhpur edition of the Śrī Viṣṇusahasranāma Stotram, the classical illustrated booklet many households actually recite from",
          width: 1080,
          height: 839,
        },
        {
          src: "/images/gallery/vishnu-sahasranama-temple-murti.webp",
          alt: "A close-up of a crowned, multi-faced stone temple mūrti garlanded for worship",
          width: 415,
          height: 738,
        },
      ],
    },
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
    dek: "Meet all one thousand names in their received order, with Devanagari, consistent IAST, a concise name-level gloss, and a clear path back to the hymn’s sacred and textual history.",
    scopeLabel: "Complete declared 1,000-name enumeration",
    scopeNote:
      "All 1,000 names are present in the common enumeration represented by the declared Sanskrit Wikisource reading. Each card offers a concise editorial name-level gloss; it does not pretend that a web gloss replaces Bhāskararāya’s layered compound analysis.",
    entryCountLabel: "All 1,000 names",
    authenticity: [
      {
        label: "Transmission",
        value: "Lalitopākhyāna tradition",
        detail:
          "Colophons associate the 182½-verse thousand-name hymn with the Brahmāṇḍa Purāṇa’s Uttarakhaṇḍa, though some printed recensions omit it or treat it as supplementary (khila) material.",
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
        value: "Complete order + IAST",
        detail:
          "Every counted name remains intact. IAST follows the declared Devanagari reading, and the English layer is explicitly a concise name-level gloss.",
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
      "The sequence follows the common 1,000-name division checked against the open-license Sanskrit Wikisource stotra and the public-domain 1925 Sastry edition of Bhāskararāya’s commentary.",
      "The declared Devanagari layer is adapted from Sanskrit Wikisource under CC BY-SA 4.0. Presentation punctuation and zero-width characters were cleaned, the stated base readings were normalized, and IAST was generated mechanically from that normalized layer.",
      "The English is a newly edited, concise orientation based on the public-domain commentary translation. It is name-level, not a claim of exhaustive word-by-word analysis.",
      "At name 879 this reader selects the Wikisource base reading सुधासृतिः (sudhāsṛtiḥ); the same witness records सुधास्रुतिः (sudhāsrutiḥ) as a variant.",
      "The hymn is described as transmitted with the Lalitopākhyāna tradition because its placement is not uniform in printed Brahmāṇḍa Purāṇa recensions; ‘authentic’ does not mean that textual history has been erased.",
    ],
    sources: [
      {
        title: "Śrī Lalitāsahasranāmastotram",
        institution: "Sanskrit Wikisource · CC BY-SA 4.0",
        href: "https://sa.wikisource.org/wiki/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80_%E0%A4%B2%E0%A4%B2%E0%A4%BF%E0%A4%A4%E0%A4%BE%E0%A4%B8%E0%A4%B9%E0%A4%B8%E0%A5%8D%E0%A4%B0%E0%A4%A8%E0%A4%BE%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%8B%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%AE%E0%A5%8D",
        note: "Base text for the 1,000-name sequence, checked on 29 July 2026. This site cleans presentation punctuation and zero-width characters, declares normalized readings, and generates IAST from the normalized Devanagari.",
      },
      {
        title: "Creative Commons Attribution-ShareAlike 4.0 International",
        institution: "Creative Commons",
        href: "https://creativecommons.org/licenses/by-sa/4.0/",
        note: "License governing the Wikisource-derived Devanagari and IAST layers; attribution, change indication, and ShareAlike apply.",
      },
      {
        title: "Lalita Sahasranama with Bhaskararaya’s Commentary · 2nd edition",
        institution: "Internet Archive · R. Ananthakrishna Sastry, 1925",
        href: "https://archive.org/details/pli.kerala.rare.25882",
        note: "A public-domain English translation of Bhāskararāya’s Saubhāgyabhāskara used to verify the enumeration and prepare concise modern name-glosses.",
      },
      {
        title: "Lalitāsahasranāma with pūrvapīṭhikā",
        institution: "Sanskrit Documents",
        href: "https://sanskritdocuments.org/doc_devii/lalitacomplete.html",
        note: "A full traditional reading used only for comparison and linked under its custodian’s terms; its volunteer text and translation are not reposted here.",
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
      {
        title: "Phala Śruti of the Lalitā Sahasranāma",
        institution: "Hindupedia, the Hindu Encyclopedia",
        href: "https://www.hindupedia.com/en/Phala_sruthi_of_Lalitha_Sahasranamam",
        note: "Source for the traditional benefits summarised below, drawn from the Uttarakhaṇḍa's own closing phala-śruti.",
      },
    ],
    traditionalBenefits: {
      eyebrow: "What the phala-śruti promises",
      title: "The Uttarakhaṇḍa closes with its own promise.",
      items: [
        "Cleansing of past karma and, ultimately, mokṣa — liberation — for the devoted reciter.",
        "Protection from negative influence, and a life described as free of disease and want.",
        "Fulfilment of dharma, artha, kāma and mokṣa together — the four classical aims of a complete life.",
        "The phala-śruti rates a single sincere recitation above many other traditional merits, as a mark of how highly the tradition values this hymn.",
      ],
      disclaimer:
        "I'm presenting this as the Uttarakhaṇḍa's own traditional promise for reciting the thousand names — not as a scientific or guaranteed claim.",
    },
  },
  "bhagavad-gita": {
    slug: "bhagavad-gita",
    navLabel: "Bhagavad Gita · complete 701-verse source text",
    shortTitle: "Bhagavad Gita",
    title: "Bhagavad Gita · Complete 701-Verse Source Text",
    originalTitle: "श्रीमद्भगवद्गीता",
    transliteratedTitle: "Śrīmadbhagavadgītā",
    language: "Sanskrit · Devanagari + IAST",
    form: "Mahābhārata dialogue · 18 chapters, 701 verses",
    glyph: "कृ",
    dek: "Read all eighteen chapters in a reproducible 701-verse Sanskrit presentation, sourced from exact Sanskrit Wikisource revisions and accompanied by deterministic IAST. The additional Chapter 13 opening is declared as a textual variant; translation and grammar are not published until qualified human review.",
    scopeLabel: "Complete selected Sanskrit source layer · 701 verses",
    scopeNote:
      "Every verse across all eighteen chapters is present in Devanagari with mechanically generated IAST. The pinned Wikisource witness supplies a 700-verse Śaṅkara-aligned sequence; this reader explicitly adds the attested Arjuna-uvāca question as 13.1 to form its declared 701-verse presentation. Completeness applies to this Sanskrit source layer, not to translation, grammatical analysis, pronunciation, commentary, or a critical edition.",
    entryCountLabel: "18 chapters · all 701 declared Sanskrit verses",
    authenticity: [
      {
        label: "Textual home",
        value: "Mahābhārata · Bhīṣmaparvan",
        detail:
          "The Gītā is Kṛṣṇa's counsel to Arjuna on the eve of battle, embedded in the Bhīṣmaparvan of the Mahābhārata and narrated to Dhṛtarāṣṭra by Sañjaya.",
      },
      {
        label: "Narrative frame",
        value: "Sañjaya narrates · Kṛṣṇa teaches",
        detail:
          "Sañjaya, granted far-sight by Vyāsa, reports the dialogue to the blind king Dhṛtarāṣṭra; within that report, Kṛṣṇa is the dialogue's speaker and teacher.",
      },
      {
        label: "Traditional attribution",
        value: "Vyāsa as compiler-seer",
        detail:
          "Hindu tradition remembers Vyāsa as the Mahābhārata's compiler, within which the Gītā is set. This is a sacred textual attribution, not a modern authorship claim.",
      },
      {
        label: "Reader standard",
        value: "Complete source text; study layers withheld",
        detail:
          "All 701 verses carry Devanagari and deterministic IAST. English, Hindi, word-by-word grammar, pronunciation, and commentary are not filled with provisional content; each awaits separate human specialist review.",
      },
    ],
    profiles: [
      {
        role: "Narrator within the epic",
        name: "Sañjaya",
        evidenceLabel: "Narrative voice",
        summary:
          "Sañjaya is the charioteer-minister granted divine sight by Vyāsa so he can witness and report the Kurukṣetra war to the blind king Dhṛtarāṣṭra. He narrates the entire Gītā dialogue at one remove; the closing chapter returns to his voice describing what he has seen and heard.",
      },
      {
        role: "Speaker inside the dialogue",
        name: "Kṛṣṇa",
        evidenceLabel: "Narrative voice",
        summary:
          "Kṛṣṇa, Arjuna's charioteer and cousin, is the Gītā's teacher within the story: a divine figure in the epic's own terms who answers Arjuna's crisis of conscience with teachings on duty, action, knowledge, and devotion. This identifies the dialogue's speaker inside the narrative, not a historically documented author.",
      },
      {
        role: "Traditional epic compiler and seer",
        name: "Kṛṣṇa Dvaipāyana Vyāsa",
        evidenceLabel: "Traditional attribution",
        summary:
          "Hindu tradition remembers Vyāsa as the compiler of the Mahābhārata, within which the Gītā appears as an episode of Book Six. He is presented here as a traditional compiler-seer, not as a modern author with independently verifiable dates.",
      },
    ],
    editorialPolicy: [
      "The eighteen Sanskrit chapters are imported reproducibly from Sanskrit Wikisource under CC BY-SA 4.0. Every chapter is pinned to an exact revision ID, timestamp, source SHA-1, raw SHA-256, and generated-shard SHA-256 in the public manifest.",
      "The pinned Wikisource chapters follow a 700-verse Śaṅkara-aligned sequence. This reader adds the attested Arjuna question before its Chapter 13 as 13.1, yielding the explicitly declared 701-verse presentation and shifting the source chapter's 34 verses to 13.2–13.35.",
      "Speaker rubrics are stored separately from the metrical Sanskrit instead of being inconsistently counted as part of a verse. Invocation boilerplate, chapter headings, wiki markup, and printed verse numbers are excluded from the verse text by a deterministic importer.",
      "IAST is generated mechanically from the displayed Devanagari with a pinned open-source transliterator. It is a reversible reading aid, not pronunciation coaching or proof of verse-by-verse phonetic review.",
      "No inherited modern translation, web glossary, or machine-written explanation is used to simulate completeness. English, Hindi, grammatical word analysis, pronunciation, and commentary will appear only as separately licensed, human-reviewed layers.",
      "This is a transparent reading edition, not a critical edition. It preserves a named witness and one declared variant without pretending that manuscript and commentarial traditions collapse into a single uncontested text.",
    ],
    sources: [
      {
        title: "Bhagavadgītā · Sanskrit chapter index",
        institution: "Sanskrit Wikisource · CC BY-SA 4.0",
        href: "https://sa.wikisource.org/wiki/भगवद्गीता",
        note: "Licensed source for the eighteen chapter transcriptions. The site importer fetches and verifies the exact historical revisions recorded in its manifest rather than silently following later edits.",
      },
      {
        title: "Bhagavad Gita corpus provenance manifest",
        institution: "swapnilsahoo-next · exact revisions and hashes",
        href: "https://github.com/swapnilsahoo/swapnilsahoo-next/blob/main/content/scriptures/bhagavad-gita/manifest.v1.json",
        note: "Machine-readable record of the 18 pinned source revisions, licence, parsing transformations, chapter counts, 13.1 variant, limitations, and generated-file hashes.",
      },
      {
        title: "Bhagavad Gita 13.1 · recension comparison",
        institution: "Gita Supersite · IIT Kanpur",
        href: "https://www.gitasupersite.iitk.ac.in/srimad?choose=1&ecsiva=1&etassa=1&etgb=1&etsiva=1&field_chapter_value=13&field_nsutra_value=1&language=dv&setgb=1",
        note: "Comparison record for the additional Arjuna-uvāca question used by the selected 701-verse presentation and omitted by the Śaṅkara-aligned 700-verse witness.",
      },
      {
        title: "Śrīmad Bhagavadgītā (Ānandāśrama Sanskrit Series, 1901 scan)",
        institution: "Sanskrit Wikisource · public-domain scan",
        href: "https://sa.wikisource.org/wiki/सञ्चिका:श्रीमद्भगवद्गीता.pdf",
        note: "Public-domain printed witness for page-level comparison with the Śaṅkara-aligned 700-verse sequence.",
      },
      {
        title: "Mahābhārata, Book 6 (Bhīṣmaparvan) critical-edition text",
        institution: "GRETIL · based on the BORI critical edition",
        href: "https://gretil.sub.uni-goettingen.de/gretil/1_sanskr/2_epic/mbh/mbh_06_u.htm",
        note: "Scholarly context for the Gītā's placement within the Bhīṣmaparvan.",
      },
      {
        title: "The Bhagavad Gītā (Sacred Books of the East, vol. 8)",
        institution: "Internet Archive · trans. Kāshināth Trimbak Telang, 1882",
        href: "https://archive.org/details/wg908",
        note: "A public-domain historical English translation linked for comparison; it is not silently remapped into the reader as a new literal translation.",
      },
      {
        title: "Gītā Māhātmya",
        institution: "Internet Archive",
        href: "https://archive.org/stream/1537610891294/GitamahatmyaOrGreatnessOfSrimadBhagavadGita_djvu.txt",
        note: "Source for the traditional benefits of recitation summarised below — the appendix on the Gītā's own greatness that accompanies most printed editions.",
      },
    ],
    traditionalBenefits: {
      eyebrow: "What the Gītā Māhātmya promises",
      title: "Tradition's own case for reading it daily.",
      items: [
        "Reciting all eighteen chapters daily, with a steady mind, is said to bring perfection in knowledge and the supreme goal itself.",
        "Even a single verse or half-verse, sincerely read, is said to release the reader from worldly wrongdoing.",
        "The Māhātmya rates devoted study of the Gītā above many other traditional merits — a mark of how highly the tradition values simply sitting with the text.",
      ],
      disclaimer:
        "I'm presenting this as the Gītā Māhātmya's own traditional case for reading the text — not as a scientific or guaranteed claim, and not part of the eighteen chapters themselves.",
    },
  },
  ramcharitmanas: {
    slug: "ramcharitmanas",
    navLabel: "Ramcharitmanas · complete seven-kāṇḍa source text",
    shortTitle: "Ramcharitmanas",
    title: "Ramcharitmanas · Complete Seven-Kāṇḍa Source Text",
    originalTitle: "श्रीरामचरितमानस",
    transliteratedTitle: "Śrī Rāmacaritamānasa",
    language: "Awadhi, with Sanskrit invocations · Devanagari + romanization",
    form: "Seven kāṇḍas · 1,074 numbered units + 39 opening invocations",
    glyph: "राम",
    dek: "Read the selected source text from Bālakāṇḍa through Uttarakāṇḍa: all 1,074 numbered units in the pinned seven-kāṇḍa dataset, together with the 39 opening Sanskrit and Awadhi invocations checked against a public-domain 1925 edition. A deterministic romanization supports reading; translations and grammar are published only after human review.",
    scopeLabel: "Complete selected source-text topology · 1,113 records",
    scopeNote:
      "This reader contains 1,074 numbered units in the selected edition's topology plus 39 separately identified opening invocations across all seven kāṇḍas. Unit totals differ between editions, so 1,074 is not presented as a universal verse count. The complete claim applies to this declared original-language source layer—not to English or Hindi translation, pronunciation, grammar, commentary, or a critical edition.",
    entryCountLabel: "1,113 source records · all seven kāṇḍas",
    authenticity: [
      {
        label: "Textual home",
        value: "Tulsidas's Rāmacaritamānasa",
        detail:
          "Composed in Awadhi, traditionally dated to 1574–1577 CE, structured in seven kāṇḍas following the arc of Vālmīki's Sanskrit Rāmāyaṇa while remaining an independent devotional retelling.",
      },
      {
        label: "Language",
        value: "Awadhi, with Sanskrit ślokas",
        detail:
          "The narrative verses (dohā, sorathā, caupāī, chhand) are Awadhi; each kāṇḍa opens with Sanskrit invocatory ślokas in the classical style, both preserved here in their own register.",
      },
      {
        label: "Declared coverage",
        value: "Seven kāṇḍas · declared source layer complete",
        detail:
          "The reader preserves the full 1,074-unit sequence of the pinned dataset and restores 39 opening invocations from the public-domain edition. Stable IDs follow source order rather than the dataset's lossy decimal locator field.",
      },
      {
        label: "Traditional attribution",
        value: "Goswami Tulsidas",
        detail:
          "Devotional and literary tradition is consistent in attributing the whole work to Tulsidas; exact biographical dates rest on tradition rather than independently documented record, as with the Hanuman Chalisa also attributed to him.",
      },
    ],
    profiles: [
      {
        role: "Poet",
        name: "Goswami Tulsidas",
        dates: "traditionally c. 1532–1623 CE",
        evidenceLabel: "Historical profile",
        summary:
          "Tulsidas was among the most influential Rama-bhakti poets of early modern North India, writing across Awadhi and Braj to bring theology and devotion to audiences beyond Sanskrit-reading circles. The Rāmacaritamānasa, begun by his own account in 1574, became foundational to North Indian devotional literature and performance tradition (the Ramlila). As with the Hanuman Chalisa also attributed to him, precise biographical dates rest on later hagiography more than independently documented record.",
      },
      {
        role: "Narrator within the text",
        name: "Yājñavalkya and Bharadvāja; Śiva and Pārvatī",
        evidenceLabel: "Narrative voice",
        summary:
          "Like the Sanskrit Rāmāyaṇa tradition, the Mānasa layers its narration: Tulsidas recounts a dialogue between the sage Yājñavalkya and Bharadvāja, which itself contains Śiva narrating the story to Pārvatī, and further tellings besides. This identifies the text's narrative frame, not a claim about a historically documented storytelling event.",
      },
    ],
    editorialPolicy: [
      "The numbered source layer is imported reproducibly from WirelessAlien/Ramcharitmanas at the pinned commit shown below. The repository is dedicated under The Unlicense and records IIT Kanpur's Ramcharitmanas site as its upstream source.",
      "The 39 opening records omitted from that dataset are transcribed diplomatically from the public-domain 1925 Belvedere Press, Prayag edition. Its lexical spellings and edition-specific readings are preserved rather than silently harmonized with IITK or common modern printings; scan-page references stay attached to every record.",
      "Array order—not the upstream decimal verse-number field—defines the 1,074 numbered units. JSON turns locators such as 1.10 into 1.1, so using that field as a unique identifier would silently corrupt the sequence.",
      "Romanization is generated deterministically from the displayed Devanagari. For Awadhi it is an orthographic reading aid, not Sanskrit grammatical analysis, a phonetic transcription, or a substitute for listening to a knowledgeable reciter.",
      "No machine-written or approximate translation is inserted to make the edition look finished. English, Hindi, pronunciation, word-by-word grammar, and commentary remain explicitly unpublished until separately sourced and signed off by qualified human reviewers.",
      "This is a transparent composite reading corpus: the numbered sequence follows the pinned seven-file dataset, while the omitted openings follow the named Belvedere witness. Completeness means the full declared topology; it does not erase variant readings, the disputed Ayodhyākāṇḍa interpolation, or the need for a future critical apparatus.",
    ],
    sources: [
      {
        title: "Rāmacaritamānasa · 1925 Belvedere Press edition",
        institution: "Wikimedia Commons · public-domain scan",
        href: "https://commons.wikimedia.org/wiki/File:%E0%A4%B0%E0%A4%BE%E0%A4%AE%E0%A4%9A%E0%A4%B0%E0%A4%BF%E0%A4%A4%E0%A4%AE%E0%A4%BE%E0%A4%A8%E0%A4%B8.pdf",
        note: "Edition-grade legal and visual anchor for the opening invocations and source-text comparison: Prayag, 1925, edited by Mahaveer Prasad Malviya Vaidya ‘Veer’.",
      },
      {
        title: "Ramcharitmanas · pinned seven-kāṇḍa dataset",
        institution: "WirelessAlien on GitHub · The Unlicense",
        href: "https://github.com/WirelessAlien/Ramcharitmanas/tree/a8734282b3f95648032a53447f08ad77acb2ecd4",
        note: "Machine-readable source for all 1,074 numbered records. The exact commit, raw file hashes, generated shard hashes, and verbatim licence are preserved with this site.",
      },
      {
        title: "Ramcharitmanas",
        institution: "IIT Kanpur",
        href: "https://www.ramcharitmanas.iitk.ac.in/",
        note: "Scholarly comparison and navigation source acknowledged by the dataset; linked for comparison, not treated as a licensed republication source.",
      },
      {
        title: "The Rámáyana of Tulsi Dás",
        institution: "F. S. Growse, 1883 · public-domain translation",
        href: "https://en.wikisource.org/wiki/The_R%C3%A1m%C3%A1yana_of_Tulsi_D%C3%A1s",
        note: "A complete historical English translation for comparison. It is not silently mapped onto this reader's units or presented as a new literal translation.",
      },
    ],
  },
  "shiva-tandava-stotram": {
    slug: "shiva-tandava-stotram",
    navLabel: "Authentic Shiva Tandava Stotram",
    shortTitle: "Shiva Tandava Stotram",
    title: "Authentic Shiva Tandava Stotram",
    originalTitle: "शिवताण्डवस्तोत्रम्",
    transliteratedTitle: "Śivatāṇḍavastotram",
    language: "Sanskrit · Devanagari + IAST",
    form: "15 body stanzas · phalaśruti · received supplement",
    glyph: "शिव",
    dek: "Feel the hymn's drum-like movement while studying every received stanza through Devanagari, consistent IAST of the selected reading, a pāda-level reading guide, close meaning, manuscript-aware variants, metre, and a careful account of the Rāvaṇa attribution.",
    scopeLabel: "Complete declared study sequence",
    scopeNote:
      "The reader includes 17 units following a documented popular sequence: 15 body stanzas, one concluding phalaśruti, and one transmitted supplementary stanza. It is a transparent received edition, not a reconstructed critical edition.",
    entryCountLabel: "17 annotated units",
    authenticity: [
      {
        label: "Declared sequence",
        value: "17-unit received edition",
        detail:
          "The sequence follows Rohana Seneviratne's 2025 presentation of the popular recension. Manuscripts differ in stanza count, order, openings, and wording.",
      },
      {
        label: "Attribution",
        value: "Traditionally Rāvaṇa",
        detail:
          "Devotional tradition credits the hymn to the Rāmāyaṇa's king of Laṅkā. The historical poet and date have not been securely established.",
      },
      {
        label: "Poetic form",
        value: "Predominantly Pañcacāmara",
        detail:
          "The body uses an energetic sixteen-syllable line with strong short-long alternation. The common pūjāvasāna phalaśruti is in Vasantatilakā.",
      },
      {
        label: "Reader standard",
        value: "Pāda guide + IAST",
        detail:
          "The selected surface reading remains intact, consistent IAST tracks it, and each long metrical unit is opened through an editorial compound guide.",
      },
    ],
    profiles: [
      {
        role: "Poet in devotional tradition",
        name: "Rāvaṇa · first called Daśagrīva",
        evidenceLabel: "Traditional attribution",
        summary:
          "Rāvaṇa is the mythic king of Laṅkā in the Rāmāyaṇa: son of Viśravas and Kaikasī, brother of Kumbhakarṇa, Śūrpaṇakhā, and Vibhīṣaṇa, and half-brother of Kubera. The epic portrays immense ascetic power and royal ambition alongside grave wrongdoing. Uttarakāṇḍa tells how Śiva's pressure on Kailāsa provoked Daśagrīva's great cry and the name Rāvaṇa; the surviving passage does not quote this hymn. This is a traditional literary biography, not a historically verifiable life. Devotional tradition credits him with the stotram; its historical poet remains unidentified.",
      },
    ],
    editorialPolicy: [
      "The 17-unit sequence and IAST base are adapted from Rohana Seneviratne's 2025 CC BY 4.0 study; the Devanagari presentation, segmentation, close glosses, and notes are newly prepared for this site.",
      "The page names its received sequence: 15 body stanzas, the pūjāvasāna phalaśruti, and the idaṃ hi nityam supplement. Other recensions are not silently folded into it.",
      "Devanagari and consistent IAST represent the selected surface reading. Pāda boundaries, hyphenated romanization, pāda-level guides, and concise English glosses are editorial study aids.",
      "High-impact variants—including digambare/cidambare, akharva/agarva, jayatyad/jayatvad, stanza order, and concluding material—are disclosed instead of declaring one universal wording.",
      "Benefits in the phalaśruti are reported as the transmitted stanza's devotional promise, not as a scientific, financial, or guaranteed outcome.",
    ],
    sources: [
      {
        title: "Rāvaṇa as a Poet: Divine Dynamism and Devotion in a Hymn of Penitence",
        institution: "Ancient Lanka · Rohana Seneviratne",
        href: "https://doi.org/10.29173/anlk937",
        note: "A 2025 CC BY 4.0 study of authorship, metre, manuscripts, variants, and the popular 17-unit sequence used here.",
      },
      {
        title: "Śivatāṇḍava manuscript · Ms. Coll. 390 Item 2531",
        institution: "University of Pennsylvania Libraries",
        href: "https://openn.library.upenn.edu/Data/0002/html/mscoll390_item2531.html",
        note: "A public-domain four-leaf Sanskrit manuscript dated 1818, with corrections and additions visible in the witness.",
      },
      {
        title: "Vālmīki Rāmāyaṇa · Uttarakāṇḍa",
        institution: "GRETIL · Tokunaga/Smith electronic text",
        href: "https://gretil.sub.uni-goettingen.de/gretil/1_sanskr/2_epic/ramayana/ram_07_u.htm",
        note: "Primary epic context for Rāvaṇa's genealogy and the Kailāsa episode; it does not quote the present hymn.",
      },
      {
        title: "Śivatāṇḍavastotram",
        institution: "Sanskrit Wikisource",
        href: "https://sa.wikisource.org/wiki/%E0%A4%B6%E0%A4%BF%E0%A4%B5%E0%A4%A4%E0%A4%BE%E0%A4%A3%E0%A5%8D%E0%A4%A1%E0%A4%B5%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%8B%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%AE%E0%A5%8D",
        note: "An open-license Devanagari comparison reading; its sequence and wording are not treated as the only recension.",
      },
    ],
  },
  "chandogya-upanishad": {
    slug: "chandogya-upanishad",
    navLabel: "Authentic Chandogya Upanishad",
    shortTitle: "Chandogya Upanishad",
    title: "Authentic Chandogya Upanishad",
    originalTitle: "छान्दोग्योपनिषद्",
    transliteratedTitle: "Chāndogyopaniṣad",
    language: "Sanskrit · Devanagari + IAST",
    form: "Sāmavedīya (Tāṇḍya/Talavakāra) Upaniṣad · 8 prapāṭhakas, roughly 630 verses in the full text",
    glyph: "ॐ",
    dek: "One of the oldest and longest Upanishads opens by asking what Om actually is — the essence distilled from earth, water, plants, the person, speech, and the Vedas themselves. Read the opening section in Sanskrit, with consistent IAST, a close English rendering, and a grammatical word-by-word split for every verse.",
    scopeLabel: "Prapāṭhaka 1, Khaṇḍa 1 · complete",
    scopeNote:
      "This edition currently covers only the opening section — the ten verses that introduce Om as the udgītha, the thread the text's teaching on meditation and knowledge builds on across its remaining twelve sections of Chapter 1 and seven further chapters. Later khaṇḍas are not yet included; this is a starting section, not the complete Upanishad.",
    entryCountLabel: "10 verses (Khaṇḍa 1 of 13 in Prapāṭhaka 1)",
    authenticity: [
      {
        label: "Declared scope",
        value: "Prapāṭhaka 1, Khaṇḍa 1 only",
        detail:
          "The full Chandogya Upanishad runs to 8 prapāṭhakas and roughly 630 verses. This reader currently presents its first ten — the Om-as-udgītha teaching — not the whole text.",
      },
      {
        label: "Attribution",
        value: "Śruti · no individual author",
        detail:
          "Like the rest of the Upaniṣadic corpus, this text is traditionally received as śruti (revealed/heard), transmitted through the Sāma Veda's Tāṇḍya (Talavakāra) school rather than composed by a named poet.",
      },
      {
        label: "Textual basis",
        value: "Gita Press Gorakhpur edition",
        detail:
          "Devanagari verse text is checked against the Gita Press Gorakhpur Sanskrit-Hindi edition (with Śāṅkara-bhāṣya), cross-checked against Max Müller's public-domain English translation for this section.",
      },
      {
        label: "Reader standard",
        value: "Word-by-word + IAST",
        detail:
          "Each verse carries the Devanagari, a consistent IAST transliteration, a close English rendering, and a phrase-level grammatical split.",
      },
    ],
    profiles: [
      {
        role: "Textual tradition",
        name: "Sāma Veda · Tāṇḍya (Talavakāra) Brāhmaṇa",
        evidenceLabel: "Traditional attribution",
        summary:
          "The Chandogya Upanishad forms the final eight chapters of the Chāndogya Brāhmaṇa, associated with the Tāṇḍya (also called Talavakāra) school of the Sāma Veda. Like other Upaniṣads, it is not attributed to a single historical author; it took shape across generations of Vedic teachers and is traditionally received as śruti. Khaṇḍa 1 itself is philosophical exposition with no named speaker — later chapters of the full text do name specific sages and teachers (Uddālaka Āruṇi, Śāṇḍilya, Sanatkumāra and others), whose episodes are not yet part of this reader.",
      },
    ],
    editorialPolicy: [
      "This reader currently covers Prapāṭhaka 1, Khaṇḍa 1 (10 of the full text's roughly 630 verses) — the opening teaching on Om as udgītha. It does not represent the complete Chandogya Upanishad, and says so plainly rather than padding a small section to look like a finished edition.",
      "Devanagari is checked against the Gita Press Gorakhpur Sanskrit-Hindi edition (with Śāṅkara's commentary) and cross-checked against Max Müller's Sacred Books of the East translation of this section; the phrase-level word splits and close English glosses are prepared for this site.",
      "The meaning given for each verse is a close study gloss, not a substitute for the Śāṅkara-bhāṣya or for a qualified teacher's explanation of the Upaniṣad.",
    ],
    sources: [
      {
        title: "Chandogya Upanishad (Sanskrit-Hindi, with Śāṅkara-bhāṣya)",
        institution: "Gita Press, Gorakhpur",
        href: "https://archive.org/details/phAO_chandogya-upanishad-gita-press-gorakhpur",
        note: "The primary edition used for this reader's Devanagari verse text and commentary cross-checks.",
      },
      {
        title: "The Upanishads, Part I — Chāndogya Upanishad",
        institution: "Sacred Books of the East, Vol. 1 · trans. F. Max Müller (1879)",
        href: "https://sacred-texts.com/hin/sbe01/index.htm",
        note: "Public-domain scholarly translation used to cross-check this section's close English rendering.",
      },
    ],
  },
  "srimad-bhagavatam": {
    slug: "srimad-bhagavatam",
    navLabel: "Śrīmad Bhāgavatam · Skandha 1 complete source text",
    shortTitle: "Śrīmad Bhāgavatam",
    title: "Śrīmad Bhāgavatam · Skandha 1 Complete Source Text",
    originalTitle: "श्रीमद्भागवतपुराणम्",
    transliteratedTitle: "Śrīmadbhāgavatapurāṇam",
    language: "Sanskrit · Devanagari + IAST",
    form: "Mahāpurāṇa · Skandha 1 of 12, 19 chapters, 807 verses",
    glyph: "भा",
    dek: "Read the complete first skandha — Sūta's answer to the sages at Naimiṣāraṇya, opening with the Purāṇa's own famous definition of itself, janmādyasya — sourced from exact Sanskrit Wikisource revisions and accompanied by deterministic IAST. This is one of twelve skandhas; translation and grammar are not published until qualified human review.",
    scopeLabel: "Complete Skandha 1 Sanskrit source layer · 807 verses",
    scopeNote:
      "All nineteen chapters of the first skandha are present in Devanagari with mechanically generated IAST. The Bhāgavata Purāṇa runs to roughly 18,000 verses across twelve skandhas in total; this reader currently covers Skandha 1 only, as a complete and reproducible unit in its own right, not as a stand-in for the whole Purāṇa. Two verse-numbering quirks in the pinned edition — Chapter 3 has no verses numbered 11 or 32, and Chapter 13 prints two distinct verses both numbered 40 — are preserved rather than silently corrected; every verse still has a unique, stable position.",
    entryCountLabel: "19 chapters · 807 verses · Skandha 1 of 12",
    authenticity: [
      {
        label: "Textual home",
        value: "Mahāpurāṇa · Prathama Skandha",
        detail:
          "The Bhāgavata Purāṇa devotes its first skandha to the frame story: the sages of Naimiṣāraṇya ask Sūta Gosvāmī to relate what is most worth hearing in this age, and Sūta answers by recounting how the Purāṇa itself came to be told.",
      },
      {
        label: "Narrative frame",
        value: "Sūta narrates · Śuka to Parīkṣit, within it",
        detail:
          "Sūta Gosvāmī speaks to the Naimiṣāraṇya sages; within his account, the skandha also sets up the frame of Śuka reciting the Bhāgavata to King Parīkṣit in his final seven days — a narration nested inside a narration.",
      },
      {
        label: "Traditional attribution",
        value: "Vyāsa as compiler-seer",
        detail:
          "Hindu tradition remembers Vyāsa as the Bhāgavata Purāṇa's compiler, composing it at Nārada's urging after the Mahābhārata left him unsatisfied. This is a sacred textual attribution, not a modern authorship claim.",
      },
      {
        label: "Reader standard",
        value: "Complete Skandha 1 source text; study layers withheld",
        detail:
          "All 807 verses of Skandha 1 carry Devanagari and deterministic IAST. English, Hindi, word-by-word grammar, pronunciation, and commentary are not filled with provisional content; each awaits separate human specialist review, as do Skandhas 2 through 12.",
      },
    ],
    profiles: [
      {
        role: "Narrator to the Naimiṣāraṇya sages",
        name: "Sūta Gosvāmī (Ugraśravas)",
        evidenceLabel: "Narrative voice",
        summary:
          "Sūta, a professional reciter of sacred narrative, is asked by Śaunaka and the other sages performing a long sacrifice at Naimiṣāraṇya to relate the essence of all scripture. His answer to that question is the entire Bhāgavata Purāṇa, beginning in this skandha.",
      },
      {
        role: "Reciter within the nested frame",
        name: "Śuka (Śukadeva)",
        evidenceLabel: "Narrative voice",
        summary:
          "Skandha 1 introduces Śuka, the son of Vyāsa, as the one who will recite the Bhāgavata to King Parīkṣit during the king's last seven days, cursed to die of snakebite. Most of the Purāṇa's remaining eleven skandhas are framed as this recitation.",
      },
      {
        role: "Traditional compiler-seer",
        name: "Kṛṣṇa Dvaipāyana Vyāsa",
        evidenceLabel: "Traditional attribution",
        summary:
          "Hindu tradition holds that Vyāsa, despite having compiled the Vedas and the Mahābhārata, remained inexplicably dissatisfied until the sage Nārada advised him to describe the Supreme directly — producing the Bhāgavata Purāṇa. He is presented here as a traditional compiler-seer, not as a modern author with independently verifiable dates.",
      },
    ],
    editorialPolicy: [
      "The nineteen Skandha-1 chapters are imported reproducibly from Sanskrit Wikisource under CC BY-SA 4.0. Every chapter is pinned to an exact revision ID, timestamp, source SHA-1, raw SHA-256, and generated-shard SHA-256 in the public manifest.",
      "Only Skandha 1 of the Purāṇa's twelve skandhas is covered. This is declared as a complete reading of that skandha, never described as covering the whole Bhāgavata Purāṇa.",
      "Verse-number quirks already present in the pinned edition — two missing numbers in Chapter 3, one repeated number in Chapter 13 — are preserved exactly as printed rather than silently renumbered. Each verse's stable identity comes from its position in the chapter, not its printed number, so nothing collides or goes missing.",
      "A verse's closing chapter colophon (\"iti śrīmadbhāgavate ... adhyāyaḥ\") is excluded from the verse text by a deterministic importer, since it restates the chapter number rather than supplying a verse. Bracketed meter labels are captured as separate metadata instead of being left inline.",
      "IAST is generated mechanically from the displayed Devanagari with a pinned open-source transliterator. It is a reversible reading aid, not pronunciation coaching or proof of verse-by-verse phonetic review.",
      "No inherited modern translation, web glossary, or machine-written explanation is used to simulate completeness. English, Hindi, grammatical word analysis, pronunciation, and commentary will appear only as separately licensed, human-reviewed layers.",
      "This is a transparent reading edition, not a critical edition. It preserves a named witness without pretending that manuscript and commentarial traditions collapse into a single uncontested text.",
    ],
    sources: [
      {
        title: "Śrīmadbhāgavatapurāṇam · Sanskrit skandha index",
        institution: "Sanskrit Wikisource · CC BY-SA 4.0",
        href: "https://sa.wikisource.org/wiki/श्रीमद्भागवतपुराणम्",
        note: "Licensed source for the Skandha 1 chapter transcriptions. The site importer fetches and verifies the exact historical revisions recorded in its manifest rather than silently following later edits.",
      },
      {
        title: "Śrīmad Bhāgavatam corpus provenance manifest",
        institution: "swapnilsahoo-next · exact revisions and hashes",
        href: "https://github.com/swapnilsahoo/swapnilsahoo-next/blob/main/content/scriptures/srimad-bhagavatam/manifest.v1.json",
        note: "Machine-readable record of the 19 pinned source revisions, licence, parsing transformations, chapter counts, preserved numbering quirks, limitations, and generated-file hashes.",
      },
      {
        title: "Bhagavata Purana (Sanskrit text with English translation)",
        institution: "Internet Archive · trans. J. M. Sanyal / various",
        href: "https://archive.org/details/bhagavatapurana",
        note: "Public-domain historical English translations linked for comparison; not silently remapped into this reader as a new literal translation.",
      },
      {
        title: "Bhāgavata Purāṇa — overview and manuscript tradition",
        institution: "Encyclopaedia Britannica",
        href: "https://www.britannica.com/topic/Bhagavata-purana",
        note: "General scholarly context on the Purāṇa's dating, structure, and place in the wider Purāṇic corpus.",
      },
    ],
    traditionalBenefits: {
      eyebrow: "What the text says about hearing it",
      title: "Tradition's own case for hearing the Bhāgavata.",
      items: [
        "The Purāṇa opens by calling itself the ripened fruit of the wish-fulfilling tree of the Vedas, made sweeter for having passed through Śuka's mouth (1.1.3) — tradition's own image for why it should be sipped repeatedly, not read once.",
        "Sūta tells the sages that hearing of Kṛṣṇa's deeds, even in a degraded age, is said to shrink the effect of that age's own faults.",
        "The text presents itself as meant for the sincere and unenvious (nirmatsarāṇāṁ satām) — a qualification tradition treats as a condition of the promise, not the whole population.",
      ],
      disclaimer:
        "I'm presenting this as the text's own traditional case for hearing and reading it — not as a scientific or guaranteed claim, and not part of an independent claim I am making myself.",
    },
  },
};

export const scriptureSlugs = Object.keys(scriptureCatalog) as ScriptureSlug[];

export function isScriptureSlug(value: string): value is ScriptureSlug {
  return Object.hasOwn(scriptureCatalog, value);
}
