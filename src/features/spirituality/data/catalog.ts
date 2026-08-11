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
    ],
  },
  "bhagavad-gita": {
    slug: "bhagavad-gita",
    navLabel: "Authentic Bhagavad Gita",
    shortTitle: "Bhagavad Gita",
    title: "Authentic Bhagavad Gita",
    originalTitle: "श्रीमद्भगवद्गीता",
    transliteratedTitle: "Śrīmadbhagavadgītā",
    language: "Sanskrit · Devanagari + IAST",
    form: "Mahābhārata dialogue · 18 chapters, 701 verses",
    glyph: "कृ",
    dek: "Read all eighteen chapters in their received Sanskrit, with consistent IAST, a close English rendering, and a grammatical word-by-word split for every verse, set within the Bhīṣmaparvan battlefield dialogue between Kṛṣṇa and Arjuna.",
    scopeLabel: "Complete 701-verse reading edition",
    scopeNote:
      "Every verse across all eighteen chapters is present, including the additional Arjuna-uvāca opening verse of Chapter 13 carried by this edition's base text (see the note on 13.1). Each verse is split into its grammatical constituents with a sourced or editorially supplied meaning for every word.",
    entryCountLabel: "All 701 verses",
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
        value: "Every verse, every word",
        detail:
          "All 701 verses carry Devanagari, IAST, a close English rendering, and a word-by-word grammatical split with a meaning for each word.",
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
      "The Sanskrit base text follows the widely circulated recension prepared by volunteers at sanskritdocuments.org, cross-checked verse by verse against its companion word-meaning and sandhi-vigraha (compound-splitting) files from the same source.",
      "Devanagari and IAST are generated mechanically from that base text using a standard ITRANS-based transliteration library, not retyped by hand; a small number of source-specific spelling conventions (such as this edition's own notation for jña) were normalized before conversion so the two layers agree.",
      "Word-by-word entries follow the grammatical compound-splitting (sandhi-vigraha) prepared for the cited source. Meanings are drawn from that source's companion word-meaning file where available; a minority of inflected or compound forms not covered there received a concise editorial gloss, checked against standard dictionaries.",
      "The close English rendering for each verse is newly composed for this edition, checked against the word-by-word data verse by verse. It aims at a clear, literal reading rather than a polished literary paraphrase, and it does not replace the depth of a full commentary tradition (Śaṅkara, Rāmānuja, Madhusūdana, and others read many verses differently).",
      "This edition's base text carries 701 verses because it includes the Arjuna-uvāca verse opening Chapter 13, present in many popular printed editions; Śaṅkara's recension omits that verse and begins the chapter with what this reader numbers 13.2, arriving at the more commonly cited total of 700. Both countings describe the same received text; nothing is silently dropped either way.",
      "The source word-meaning file records a single dictionary sense for each Sanskrit spelling rather than a separate sense per verse; a handful of words that are genuinely spelled identically but mean different things in different verses (for example kṛṣṇaḥ, which names Kṛṣṇa in most verses but denotes the moon's dark fortnight in one astronomical aside) were individually checked and corrected, but the word-by-word layer as a whole should be read as a close, source-grounded study aid rather than an exhaustively context-verified translation for every one of several thousand words.",
    ],
    sources: [
      {
        title: "Śrīmadbhagavadgītā — mūla text",
        institution: "Sanskrit Documents · sanskritdocuments.org",
        href: "https://sanskritdocuments.org/doc_giitaa/bhagvadnew.itx",
        note: "Base Devanagari/ITRANS verse text for all eighteen chapters, checked while preparing this reader.",
      },
      {
        title: "Bhagavad Gītā śabdārtha (word meanings)",
        institution: "Sanskrit Documents · sanskritdocuments.org",
        href: "https://sanskritdocuments.org/doc_giitaa/bgwords.itx",
        note: "Volunteer-prepared word-by-word meanings used as the primary source for this reader's word-study layer; the file itself notes these glosses are not exhaustively scholar-verified.",
      },
      {
        title: "Gītā anvaya and sandhi-vigraha",
        institution: "Sanskrit Documents · sanskritdocuments.org (prepared by Sunder Hattangadi)",
        href: "https://sanskritdocuments.org/doc_giitaa/gitAanvayasandhivigraha.itx",
        note: "Grammatical compound-splitting and prose word-order for every verse, used to build this reader's word-by-word division.",
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
        note: "A public-domain 19th-century scholarly translation, consulted for comparison while preparing this edition's close English rendering.",
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
};

export const scriptureSlugs = Object.keys(scriptureCatalog) as ScriptureSlug[];

export function isScriptureSlug(value: string): value is ScriptureSlug {
  return value in scriptureCatalog;
}
