"use client";

import { useMemo, useState } from "react";

type Entry = {
  sanskrit: string;
  transliteration: string;
  hindi: string;
  english: string;
};

type Scripture = {
  id: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  entries: Entry[];
  completeHref: string;
  completeLabel: string;
  external?: boolean;
};

const scriptures: Scripture[] = [
  {
    id: "hanuman",
    shortLabel: "हनुमान",
    title: "श्री हनुमान चालीसा",
    subtitle: "Opening invocation and first chaupais · Awadhi text with Roman reading",
    completeHref: "/spirituality/hanuman-chalisa.html",
    completeLabel: "Open the complete word-by-word Chalisa",
    entries: [
      {
        sanskrit: "श्रीगुरु चरन सरोज रज, निज मन मुकुर सुधारि।",
        transliteration: "śrīguru caraṇa saroja raja, nija mana mukuru sudhāri",
        hindi: "श्रद्धेय गुरु के चरण-कमलों की धूल से अपने मन रूपी दर्पण को निर्मल करके।",
        english:
          "Having polished the mirror of my mind with the dust of the revered Guru’s lotus feet.",
      },
      {
        sanskrit: "बरनऊँ रघुबर बिमल जसु, जो दायकु फल चारि॥",
        transliteration: "baranaũ raghuvara bimala jasu, jo dāyaku phala cāri",
        hindi: "मैं श्रीराम के निर्मल यश का वर्णन करता हूँ, जो जीवन के चार फल प्रदान करता है।",
        english: "I narrate the pure glory of Rama, which bestows the four aims of human life.",
      },
      {
        sanskrit: "बुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार।",
        transliteration: "buddhihīna tanu jānikē, sumirauṃ pavana-kumāra",
        hindi: "अपने को बुद्धि में अल्प जानकर मैं पवनपुत्र हनुमान का स्मरण करता हूँ।",
        english: "Knowing myself to be limited in wisdom, I remember Hanuman, the Son of the Wind.",
      },
      {
        sanskrit: "बल बुधि विद्या देहु मोहिं, हरहु कलेस बिकार॥",
        transliteration: "bala budhi vidyā dehu mohiṃ, harahu kalēsa bikāra",
        hindi: "मुझे बल, बुद्धि और विद्या दें तथा मेरे दुःख और दोष दूर करें।",
        english: "Grant me strength, discernment and knowledge; remove my afflictions and faults.",
      },
      {
        sanskrit: "जय हनुमान ज्ञान गुन सागर।",
        transliteration: "jaya hanumāna jñāna guna sāgara",
        hindi: "ज्ञान और सद्गुणों के सागर हनुमान की जय हो।",
        english: "Victory to Hanuman, the ocean of knowledge and noble qualities.",
      },
      {
        sanskrit: "जय कपीस तिहुँ लोक उजागर॥",
        transliteration: "jaya kapīsa tihuṃ loka ujāgara",
        hindi: "वानरों के स्वामी की जय हो, जिनकी कीर्ति तीनों लोकों में प्रकाशित है।",
        english: "Victory to the Lord of the vanaras, renowned throughout the three worlds.",
      },
      {
        sanskrit: "राम दूत अतुलित बल धामा।",
        transliteration: "rāma dūta atulita bala dhāmā",
        hindi: "आप श्रीराम के दूत और अतुलनीय बल के धाम हैं।",
        english: "You are Rama’s messenger and the abode of incomparable strength.",
      },
      {
        sanskrit: "अंजनि-पुत्र पवनसुत नामा॥",
        transliteration: "añjani-putra pavanasuta nāmā",
        hindi: "आप अंजनी के पुत्र और पवनपुत्र के नाम से विख्यात हैं।",
        english: "You are known as Anjani’s son and the Son of the Wind.",
      },
    ],
  },
  {
    id: "vishnu",
    shortLabel: "विष्णु",
    title: "श्री विष्णु सहस्रनाम",
    subtitle: "Opening names · Sanskrit name, IAST reading and concise study gloss",
    completeHref: "https://sanskritdocuments.org/doc_vishhnu/vsahasranew.html",
    completeLabel: "Read the complete canonical text",
    external: true,
    entries: [
      {
        sanskrit: "विश्वम्",
        transliteration: "viśvam",
        hindi: "जो स्वयं सम्पूर्ण विश्व हैं।",
        english: "The One who is the universe itself.",
      },
      {
        sanskrit: "विष्णुः",
        transliteration: "viṣṇuḥ",
        hindi: "जो सर्वत्र व्याप्त हैं।",
        english: "The All-pervading One.",
      },
      {
        sanskrit: "वषट्कारः",
        transliteration: "vaṣaṭkāraḥ",
        hindi: "यज्ञ में वषट् आह्वान के रूप में प्रतिष्ठित।",
        english: "The sacred invocation through which offerings are made.",
      },
      {
        sanskrit: "भूतभव्यभवत्प्रभुः",
        transliteration: "bhūta-bhavya-bhavat-prabhuḥ",
        hindi: "भूत, भविष्य और वर्तमान के स्वामी।",
        english: "Lord of the past, future and present.",
      },
      {
        sanskrit: "भूतकृत्",
        transliteration: "bhūtakṛt",
        hindi: "समस्त प्राणियों के सृष्टिकर्ता।",
        english: "Creator of all beings.",
      },
      {
        sanskrit: "भूतभृत्",
        transliteration: "bhūtabhṛt",
        hindi: "समस्त प्राणियों का पालन करने वाले।",
        english: "Sustainer of all beings.",
      },
      {
        sanskrit: "भावः",
        transliteration: "bhāvaḥ",
        hindi: "शुद्ध अस्तित्व और अंतःस्थित चेतना।",
        english: "Pure being and indwelling presence.",
      },
      {
        sanskrit: "भूतात्मा",
        transliteration: "bhūtātmā",
        hindi: "समस्त प्राणियों में स्थित आत्मा।",
        english: "The Self dwelling in all beings.",
      },
      {
        sanskrit: "भूतभावनः",
        transliteration: "bhūtabhāvanaḥ",
        hindi: "समस्त प्राणियों का पोषण और विकास करने वाले।",
        english: "Nourisher and promoter of all beings.",
      },
      {
        sanskrit: "पूतात्मा",
        transliteration: "pūtātmā",
        hindi: "सर्वथा शुद्ध आत्मस्वरूप।",
        english: "The perfectly pure Self.",
      },
      {
        sanskrit: "परमात्मा",
        transliteration: "paramātmā",
        hindi: "सर्वोच्च आत्मा।",
        english: "The Supreme Self.",
      },
      {
        sanskrit: "मुक्तानां परमा गतिः",
        transliteration: "muktānāṃ paramā gatiḥ",
        hindi: "मुक्त आत्माओं की परम गति।",
        english: "The highest goal of the liberated.",
      },
    ],
  },
  {
    id: "lalita",
    shortLabel: "ललिता",
    title: "श्री ललिता सहस्रनाम",
    subtitle: "Opening names · Sanskrit name, IAST reading and concise study gloss",
    completeHref: "https://sanskritdocuments.org/doc_devii/lalitacomplete.html",
    completeLabel: "Read the complete canonical text",
    external: true,
    entries: [
      {
        sanskrit: "श्रीमाता",
        transliteration: "śrīmātā",
        hindi: "समस्त जगत् की मंगलमयी माता।",
        english: "The auspicious Mother of all.",
      },
      {
        sanskrit: "श्रीमहाराज्ञी",
        transliteration: "śrīmahārājñī",
        hindi: "परम साम्राज्ञी।",
        english: "The Supreme Empress.",
      },
      {
        sanskrit: "श्रीमत्सिंहासनेश्वरी",
        transliteration: "śrīmat-siṃhāsaneśvarī",
        hindi: "दिव्य सिंहासन की अधिष्ठात्री।",
        english: "Sovereign of the resplendent throne.",
      },
      {
        sanskrit: "चिदग्निकुण्डसम्भूता",
        transliteration: "cidagni-kuṇḍa-sambhūtā",
        hindi: "चैतन्य की अग्नि से प्रकट हुईं।",
        english: "Manifest from the sacred fire of consciousness.",
      },
      {
        sanskrit: "देवकार्यसमुद्यता",
        transliteration: "devakārya-samudyatā",
        hindi: "दैवी कार्य की सिद्धि के लिए उदित हुईं।",
        english: "Arisen to accomplish the divine purpose.",
      },
      {
        sanskrit: "उद्यद्भानुसहस्राभा",
        transliteration: "udyad-bhānu-sahasrābhā",
        hindi: "हजार उगते सूर्यों के समान तेजस्विनी।",
        english: "Radiant like a thousand rising suns.",
      },
      {
        sanskrit: "चतुर्बाहुसमन्विता",
        transliteration: "caturbāhu-samanvitā",
        hindi: "चार भुजाओं से सुशोभित।",
        english: "Endowed with four arms.",
      },
      {
        sanskrit: "रागस्वरूपपाशाढ्या",
        transliteration: "rāga-svarūpa-pāśāḍhyā",
        hindi: "प्रेमरूपी पाश धारण करने वाली।",
        english: "Bearing the noose that embodies divine love.",
      },
      {
        sanskrit: "क्रोधाकाराङ्कुशोज्ज्वला",
        transliteration: "krodhākārāṅkuśojjvalā",
        hindi: "नियंत्रक अंकुश के तेज से दीप्त।",
        english: "Radiant with the goad that restrains and redirects.",
      },
      {
        sanskrit: "मनोरूपेक्षुकोदण्डा",
        transliteration: "manorūpekṣu-kodaṇḍā",
        hindi: "मनरूपी ईख का धनुष धारण करने वाली।",
        english: "Holding the sugarcane bow that symbolizes the mind.",
      },
      {
        sanskrit: "पञ्चतन्मात्रसायका",
        transliteration: "pañca-tanmātra-sāyakā",
        hindi: "पाँच सूक्ष्म तत्त्वों रूपी बाणों वाली।",
        english: "Whose arrows are the five subtle sensory principles.",
      },
      {
        sanskrit: "निजारुणप्रभापूरमज्जद्ब्रह्माण्डमण्डला",
        transliteration: "nijāruṇa-prabhā-pūra-majjad-brahmāṇḍa-maṇḍalā",
        hindi: "जिनकी अरुण प्रभा में सम्पूर्ण ब्रह्माण्ड निमग्न है।",
        english: "Whose crimson radiance immerses the entire cosmos.",
      },
    ],
  },
];

export function ScriptureExplorer() {
  const [activeId, setActiveId] = useState(scriptures[0].id);
  const [query, setQuery] = useState("");
  const active = scriptures.find((scripture) => scripture.id === activeId) ?? scriptures[0];

  const visibleEntries = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return active.entries;
    return active.entries.filter((entry) =>
      [entry.sanskrit, entry.transliteration, entry.hindi, entry.english].some((value) =>
        value.toLocaleLowerCase().includes(normalized)
      )
    );
  }, [active, query]);

  return (
    <div className="glass-card overflow-hidden p-2">
      <div
        className="border-ink-200/80 dark:border-ink-700 grid grid-cols-3 gap-1 border-b p-2"
        role="tablist"
        aria-label="Sacred texts"
      >
        {scriptures.map((scripture) => (
          <button
            key={scripture.id}
            type="button"
            role="tab"
            aria-selected={activeId === scripture.id}
            onClick={() => {
              setActiveId(scripture.id);
              setQuery("");
            }}
            className={`focus-visible:ring-brand-500 rounded-xl px-2 py-3 font-serif text-base font-semibold transition focus-visible:ring-2 focus-visible:outline-none sm:text-lg ${
              activeId === scripture.id
                ? "bg-ink-950 text-white shadow-lg dark:bg-white dark:text-slate-950"
                : "text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/5"
            }`}
          >
            {scripture.shortLabel}
          </button>
        ))}
      </div>

      <div className="p-5 sm:p-8" role="tabpanel">
        <div className="grid items-end gap-5 lg:grid-cols-[1fr_0.55fr]">
          <div>
            <p className="eyebrow mb-3">Guided word study</p>
            <h3 className="font-serif text-3xl font-semibold sm:text-4xl">{active.title}</h3>
            <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
              {active.subtitle}
            </p>
          </div>
          <label>
            <span className="sr-only">Search this scripture</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Sanskrit, Hindi or English"
              className="border-ink-200 dark:border-ink-700 focus:border-brand-500 focus:ring-brand-500/20 w-full rounded-xl border bg-white/60 px-4 py-3 text-sm outline-none focus:ring-4 dark:bg-white/5"
            />
          </label>
        </div>

        <div className="mt-8 grid gap-4">
          {visibleEntries.map((entry, index) => (
            <article
              key={`${active.id}-${entry.sanskrit}`}
              className="border-ink-200/80 dark:border-ink-700 grid gap-5 rounded-2xl border p-5 lg:grid-cols-[0.9fr_1.1fr]"
            >
              <div>
                <span className="text-ink-400 font-mono text-[10px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p lang="sa" className="mt-2 font-serif text-2xl leading-relaxed font-semibold">
                  {entry.sanskrit}
                </p>
                <p className="text-brand-700 dark:text-brand-300 mt-2 text-sm leading-relaxed italic">
                  {entry.transliteration}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="bg-brand-50/80 dark:bg-brand-900/20 rounded-xl p-4">
                  <p className="eyebrow mb-2">हिन्दी अर्थ</p>
                  <p lang="hi" className="text-ink-700 dark:text-ink-100 text-sm leading-relaxed">
                    {entry.hindi}
                  </p>
                </div>
                <div className="bg-accent-400/10 rounded-xl p-4">
                  <p className="eyebrow mb-2">English meaning</p>
                  <p className="text-ink-700 dark:text-ink-100 text-sm leading-relaxed">
                    {entry.english}
                  </p>
                </div>
              </div>
            </article>
          ))}
          {visibleEntries.length === 0 && (
            <p className="text-ink-500 py-10 text-center text-sm">
              No entries match this search in the current guided selection.
            </p>
          )}
        </div>

        <div className="from-brand-50 to-accent-400/10 dark:from-brand-900/25 dark:to-accent-400/5 border-brand-200/70 dark:border-brand-700/40 mt-8 flex flex-col gap-4 rounded-2xl border bg-gradient-to-br p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-600 dark:text-ink-300 max-w-2xl text-xs leading-relaxed">
            The guided meanings are concise study glosses; traditional commentaries may offer
            several complementary interpretations for the same sacred name.
          </p>
          <a
            href={active.completeHref}
            target={active.external ? "_blank" : undefined}
            rel={active.external ? "noopener noreferrer" : undefined}
            className="bg-ink-950 focus-visible:ring-brand-500 inline-flex shrink-0 items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:ring-2 focus-visible:outline-none dark:bg-white dark:text-slate-950"
          >
            {active.completeLabel}
            {active.external && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
        </div>
      </div>
    </div>
  );
}
