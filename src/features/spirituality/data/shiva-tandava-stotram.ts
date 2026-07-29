import type { ReaderEntry, WordGloss } from "@/features/spirituality/types";

type Pada = Required<WordGloss>;

function stanza(sequence: number, padas: Pada[], meaning: string, note?: string): ReaderEntry {
  const section =
    sequence <= 4
      ? "Dance, river, and living iconography"
      : sequence <= 8
        ? "Fire, moon, and divine form"
        : sequence <= 11
          ? "Power, names, and rhythm"
          : sequence <= 15
            ? "Equanimity, contemplation, and mantra"
            : "Phalaśruti and received supplement";

  return {
    id: `shiva-${sequence}`,
    sequence,
    section,
    label:
      sequence === 16
        ? "Phalaśruti · unit 16"
        : sequence === 17
          ? "Supplement · unit 17"
          : `Stanza ${sequence}`,
    original: padas
      .map((pada, index) => `${pada.original}${index === 1 ? " ।" : index === 3 ? " ॥" : ""}`)
      .join("\n"),
    transliteration: padas
      .map(
        (pada, index) =>
          `${pada.transliteration.replaceAll("-", "")}${index === 1 ? " |" : index === 3 ? " ||" : ""}`
      )
      .join("\n"),
    meaning,
    words: padas,
    note,
  };
}

export const shivaTandavaStotramEntries: ReaderEntry[] = [
  stanza(
    1,
    [
      {
        original: "जटाटवीगलज्जलप्रवाहपावितस्थले",
        transliteration: "jaṭāṭavī-galaj-jala-pravāha-pāvita-sthale",
        meaning:
          "in the place made pure by the stream of water falling through his forest of locks",
      },
      {
        original: "गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्",
        transliteration: "gale 'valambya lambitāṃ bhujaṅga-tuṅga-mālikām",
        meaning: "having hung upon his neck a lofty, swaying garland of serpents",
      },
      {
        original: "डमड्डमड्डमड्डमन्निनादवड्डमर्वयं",
        transliteration: "ḍamaḍ-ḍamaḍ-ḍamaḍ-ḍaman-nināda-vaḍ-ḍamarvayaṃ",
        meaning: "to the rolling ḍamaḍ sound of this ḍamaru drum",
      },
      {
        original: "चकार चण्डताण्डवं तनोतु नः शिवः शिवम्",
        transliteration: "cakāra caṇḍa-tāṇḍavaṃ tanotu naḥ śivaḥ śivam",
        meaning: "Śiva performed the fierce dance; may he extend auspiciousness to us",
      },
    ],
    "With Gaṅgā streaming through his matted locks, a serpent garland swinging at his neck, and the ḍamaru sounding, Śiva performs the fierce Tāṇḍava. May that Śiva bring us auspiciousness.",
    "This famous opening heads the received popular sequence used here. The manuscript evidence surveyed in the cited 2025 study preserves different openings and arrangements."
  ),
  stanza(
    2,
    [
      {
        original: "जटाकटाहसम्भ्रमभ्रमन्निलिम्पनिर्झरी",
        transliteration: "jaṭā-kaṭāha-sambhrama-bhraman-nilimpa-nirjharī",
        meaning: "the celestial river whirling vigorously in the cauldron of his matted locks",
      },
      {
        original: "विलोलवीचिवल्लरीविराजमानमूर्धनि",
        transliteration: "vilola-vīci-vallarī-virājamāna-mūrdhani",
        meaning: "whose head shines with its playfully moving tendrils of waves",
      },
      {
        original: "धगद्धगद्धगज्ज्वलल्ललाटपट्टपावके",
        transliteration: "dhagad-dhagad-dhagaj-jvalal-lalāṭa-paṭṭa-pāvake",
        meaning: "whose forehead fire blazes with the sound dhagad-dhagad",
      },
      {
        original: "किशोरचन्द्रशेखरे रतिः प्रतिक्षणं मम",
        transliteration: "kiśora-candra-śekhare ratiḥ pratikṣaṇaṃ mama",
        meaning: "may my delight rest every moment in the bearer of the young moon",
      },
    ],
    "May my delight dwell every moment in the moon-crested Śiva, whose locks carry Gaṅgā's dancing waves and whose forehead fire flashes with the syllabic force of dhagad-dhagad."
  ),
  stanza(
    3,
    [
      {
        original: "धराधरेन्द्रनन्दिनीविलासबन्धुबन्धुर",
        transliteration: "dharādharendra-nandinī-vilāsa-bandhu-bandhura",
        meaning: "beautifully joined to the graceful play of the mountain king's daughter",
      },
      {
        original: "स्फुरद्दृगन्तसन्ततिप्रमोदमानमानसे",
        transliteration: "sphurad-dṛg-anta-santati-pramodamāna-mānase",
        meaning: "whose mind rejoices in the succession of her radiant sidelong glances",
      },
      {
        original: "कृपाकटाक्षधोरणीनिरुद्धदुर्धरापदि",
        transliteration: "kṛpā-kaṭākṣa-dhoraṇī-niruddha-durdharāpadi",
        meaning: "whose stream of compassionate glances restrains overwhelming adversity",
      },
      {
        original: "क्वचिद्दिगम्बरे मनो विनोदमेतु वस्तुनि",
        transliteration: "kvacid digambare mano vinodam etu vastuni",
        meaning: "may the mind find delight in that sky-clad reality",
      },
    ],
    "May the mind delight in sky-clad Śiva: joyful in Pārvatī's radiant glances and able, through a current of compassion, to hold even formidable adversity in check.",
    "This reader selects kvacid digambare. A widely transmitted variant reads kvacic cidambare, shifting the image from 'sky-clad' toward the sacred space of consciousness."
  ),
  stanza(
    4,
    [
      {
        original: "जटाभुजङ्गपिङ्गलस्फुरत्फणामणिप्रभा",
        transliteration: "jaṭā-bhujaṅga-piṅgala-sphurat-phaṇā-maṇi-prabhā",
        meaning: "the tawny radiance of jewels flashing on serpent hoods among his locks",
      },
      {
        original: "कदम्बकुङ्कुमद्रवप्रलिप्तदिग्वधूमुखे",
        transliteration: "kadamba-kuṅkuma-drava-pralipta-dig-vadhū-mukhe",
        meaning: "anointing the faces of the maidens of the directions like liquid saffron",
      },
      {
        original: "मदान्धसिन्धुरासुरत्वगुत्तरीयमेदुरे",
        transliteration: "madāndha-sindhurāsura-tvag-uttarīya-medure",
        meaning: "splendid in the elephant-demon's hide worn as an upper garment",
      },
      {
        original: "मनो विनोदमद्भुतं बिभर्तु भूतभर्तरि",
        transliteration: "mano vinodam adbhutaṃ bibhartu bhūta-bhartari",
        meaning: "may the mind bear wondrous delight in the Lord of beings",
      },
    ],
    "May the mind find wondrous delight in the Lord of beings, glowing with the jewels of serpents in his locks and magnificent in the elephant-demon's hide."
  ),
  stanza(
    5,
    [
      {
        original: "ललाटचत्वरज्वलद्धनञ्जयस्फुलिङ्गया",
        transliteration: "lalāṭa-catvara-jvalad-dhanañjaya-sphuliṅgayā",
        meaning: "by sparks from the fire blazing upon the open space of his forehead",
      },
      {
        original: "निपीतपञ्चसायकं नमन्निलिम्पनायकम्",
        transliteration: "nipīta-pañca-sāyakaṃ naman-nilimpa-nāyakam",
        meaning: "who consumed the five-arrowed Kāma and before whom the celestial lord bows",
      },
      {
        original: "सुधामयूखरेखया विराजमानशेखरम्",
        transliteration: "sudhā-mayūkha-rekhayā virājamāna-śekharam",
        meaning: "whose crest shines with a slender ray of the nectar-bearing moon",
      },
      {
        original: "महः कपालि सम्पदे सरिज्जटालमस्तु नः",
        transliteration: "mahaḥ kapāli sampade sarij-jaṭālam astu naḥ",
        meaning: "O skull-bearer, may the splendour of your river-wreathed locks be our wealth",
      },
    ],
    "O Kapālin, may the splendour of your Gaṅgā-wreathed locks, moonlit crest, and forehead fire—which consumed the five-arrowed Kāma—be our enduring wealth.",
    "Some popular editions place the sahasralocana stanza before this one. The ordering here follows the declared 17-unit study sequence."
  ),
  stanza(
    6,
    [
      {
        original: "सहस्रलोचनप्रभृत्यशेषलेखशेखर",
        transliteration: "sahasra-locana-prabhṛty-aśeṣa-lekha-śekhara",
        meaning: "Indra and all the other celestial beings, their crowns adorned",
      },
      {
        original: "प्रसूनधूलिधोरणीविधूसराङ्घ्रिपीठभूः",
        transliteration: "prasūna-dhūli-dhoraṇī-vidhūsarāṅghri-pīṭha-bhūḥ",
        meaning: "whose footstool is grey with streams of pollen from their flowers",
      },
      {
        original: "भुजङ्गराजमालया निबद्धजाटजूटकः",
        transliteration: "bhujaṅga-rāja-mālayā nibaddha-jāṭa-jūṭakaḥ",
        meaning: "whose massed locks are bound by a garland of serpent kings",
      },
      {
        original: "श्रिये चिराय जायतां चकोरबन्धुशेखरः",
        transliteration: "śriye cirāya jāyatāṃ cakora-bandhu-śekharaḥ",
        meaning: "may the moon-crested Lord manifest for lasting prosperity",
      },
    ],
    "May the moon-crested Lord grant lasting well-being: the gods' floral pollen settles at his feet, while a garland of serpent kings binds his matted locks."
  ),
  stanza(
    7,
    [
      {
        original: "करालभालपट्टिकाधगद्धगद्धगज्ज्वलद्",
        transliteration: "karāla-bhāla-paṭṭikā-dhagad-dhagad-dhagaj-jvalad",
        meaning: "blazing dhagad-dhagad upon the fearsome surface of his forehead",
      },
      {
        original: "धनञ्जयाहुतीकृतप्रचण्डपञ्चसायके",
        transliteration: "dhanañjayāhutī-kṛta-pracaṇḍa-pañca-sāyake",
        meaning: "whose fire made the fierce five-arrowed Kāma its offering",
      },
      {
        original: "धराधरेन्द्रनन्दिनीकुचाग्रचित्रपत्रक",
        transliteration: "dharādharendra-nandinī-kucāgra-citra-patraka",
        meaning: "the decorative leaf-pattern upon the breast of the mountain king's daughter",
      },
      {
        original: "प्रकल्पनैकशिल्पिनि त्रिलोचने रतिर्मम",
        transliteration: "prakalpanaika-śilpini trilocane ratir mama",
        meaning: "may my devotion rest in the three-eyed, incomparable artist",
      },
    ],
    "May my devotion rest in the three-eyed divine artist: Śiva, whose fearsome forehead fire consumed Kāma and whose intimacy with Pārvatī is rendered through ornate poetic imagery."
  ),
  stanza(
    8,
    [
      {
        original: "नवीनमेघमण्डलीनिरुद्धदुर्धरस्फुरत्",
        transliteration: "navīna-megha-maṇḍalī-niruddha-durdhara-sphurat",
        meaning: "enveloped in the irresistibly spreading mass of fresh rain clouds",
      },
      {
        original: "कुहूनिशीथिनीतमःप्रबन्धबद्धकन्धरः",
        transliteration: "kuhū-niśīthinī-tamaḥ-prabandha-baddha-kandharaḥ",
        meaning: "whose neck is bound in the deep darkness of a new-moon night",
      },
      {
        original: "निलिम्पनिर्झरीधरस्तनोतु कृत्तिसुन्दरः",
        transliteration: "nilimpa-nirjharī-dharas tanotu kṛtti-sundaraḥ",
        meaning: "may the bearer of the celestial river, beautiful in his hide garment, bestow",
      },
      {
        original: "कलानिधानबन्धुरः श्रियं जगद्धुरन्धरः",
        transliteration: "kalā-nidhāna-bandhuraḥ śriyaṃ jagad-dhurandharaḥ",
        meaning: "the moon-adorned bearer of the world's burden, prosperity",
      },
    ],
    "May Śiva—the world-bearer whose dark throat resembles a moonless night beneath rain clouds, who carries Gaṅgā and wears the crescent moon—grant well-being."
  ),
  stanza(
    9,
    [
      {
        original: "प्रफुल्लनीलपङ्कजप्रपञ्चकालिमप्रभा",
        transliteration: "praphulla-nīla-paṅkaja-prapañca-kālima-prabhā",
        meaning: "with the dark radiance of a vast field of fully opened blue lotuses",
      },
      {
        original: "वलम्बिकण्ठकन्दलीरुचिप्रबद्धकन्धरम्",
        transliteration: "valambi-kaṇṭha-kandalī-ruci-prabaddha-kandharam",
        meaning: "whose neck is marked by the beauty of the darkened throat",
      },
      {
        original: "स्मरच्छिदं पुरच्छिदं भवच्छिदं मखच्छिदम्",
        transliteration: "smara-cchidaṃ pura-cchidaṃ bhava-cchidaṃ makha-cchidam",
        meaning: "destroyer of Kāma, the cities, worldly becoming, and the sacrifice",
      },
      {
        original: "गजच्छिदान्धकच्छिदं तमन्तकच्छिदं भजे",
        transliteration: "gaja-cchidāndhaka-cchidaṃ tam antaka-cchidaṃ bhaje",
        meaning: "I worship the destroyer of the elephant demon, Andhaka, and death itself",
      },
    ],
    "I worship the dark-throated Śiva, destroyer of Kāma, the three cities, binding existence, the sacrifice, the elephant demon, Andhaka, and even death itself."
  ),
  stanza(
    10,
    [
      {
        original: "अखर्वसर्वमङ्गलाकलाकदम्बमञ्जरी",
        transliteration: "akharva-sarva-maṅgalā-kalā-kadamba-mañjarī",
        meaning: "the abundant cluster of every auspicious art, like kadamba blossoms",
      },
      {
        original: "रसप्रवाहमाधुरीविजृम्भणामधुव्रतम्",
        transliteration: "rasa-pravāha-mādhurī-vijṛmbhaṇā-madhu-vratam",
        meaning: "a bee drinking the expanding sweetness of their flowing nectar",
      },
      {
        original: "स्मरान्तकं पुरान्तकं भवान्तकं मखान्तकम्",
        transliteration: "smarāntakaṃ purāntakaṃ bhavāntakaṃ makhāntakam",
        meaning: "ender of Kāma, the cities, conditioned existence, and the sacrifice",
      },
      {
        original: "गजान्तकान्धकान्तकं तमन्तकान्तकं भजे",
        transliteration: "gajāntakāndhakāntakaṃ tam antakāntakaṃ bhaje",
        meaning: "I worship the ender of the elephant demon, Andhaka, and the ender of death",
      },
    ],
    "I worship Śiva as the bee drawn to the nectar of every auspicious art, and as the one who ends Kāma, the cities, bondage, sacrifice, the elephant demon, Andhaka, and death.",
    "This edition reads akharva, 'abundant' or 'not small'; agarva, 'without pride', appears in other received readings."
  ),
  stanza(
    11,
    [
      {
        original: "जयत्यदभ्रविभ्रमभ्रमद्भुजङ्गमश्वसद्",
        transliteration: "jayaty adabhra-vibhrama-bhramad-bhujaṅgama-śvasad",
        meaning: "victorious amid the immense motion and breath of whirling serpents",
      },
      {
        original: "विनिर्गमक्रमस्फुरत्करालभालहव्यवाट्",
        transliteration: "vinirgama-krama-sphurat-karāla-bhāla-havyavāṭ",
        meaning: "whose fearsome forehead fire flares in time with their exhalation",
      },
      {
        original: "धिमिं धिमिं धिमिं ध्वनन्मृदङ्गतुङ्गमङ्गल",
        transliteration: "dhimiṃ dhimiṃ dhimiṃ dhvanan-mṛdaṅga-tuṅga-maṅgala",
        meaning: "to the lofty auspicious mṛdaṅga resounding dhimiṃ-dhimiṃ",
      },
      {
        original: "ध्वनिक्रमप्रवर्तितप्रचण्डताण्डवः शिवः",
        transliteration: "dhvani-krama-pravartita-pracaṇḍa-tāṇḍavaḥ śivaḥ",
        meaning: "Śiva's fierce Tāṇḍava is set in motion by the succession of sound",
      },
    ],
    "Victorious is Śiva: serpent breath fans his forehead fire, and the ascending dhimiṃ-dhimiṃ of the mṛdaṅga sets his fierce Tāṇḍava in motion.",
    "The opening jayaty adabhra is a declared reading; jayatv adabhra is also widely printed. The onomatopoeia and Pañcacāmara rhythm are part of the stanza's meaning."
  ),
  stanza(
    12,
    [
      {
        original: "दृषद्विचित्रतल्पयोर्भुजङ्गमौक्तिकस्रजोर्",
        transliteration: "dṛṣad-vicitra-talpayor bhujaṅga-mauktika-srajor",
        meaning: "toward a stone and an ornate bed; a serpent and a string of pearls",
      },
      {
        original: "गरिष्ठरत्नलोष्ठयोः सुहृद्विपक्षपक्षयोः",
        transliteration: "gariṣṭha-ratna-loṣṭhayoḥ suhṛd-vipakṣa-pakṣayoḥ",
        meaning: "toward the finest jewel and a clod; a friend and an opposing side",
      },
      {
        original: "तृणारविन्दचक्षुषोः प्रजामहीमहेन्द्रयोः",
        transliteration: "tṛṇāravinda-cakṣuṣoḥ prajā-mahī-mahendrayoḥ",
        meaning: "toward grass and lotus-like eyes; an ordinary person and a mighty king",
      },
      {
        original: "समप्रवृत्तिकः कदा सदाशिवं भजाम्यहम्",
        transliteration: "sama-pravṛttikaḥ kadā sadāśivaṃ bhajāmy aham",
        meaning: "when, holding an equal disposition, shall I worship Sadāśiva?",
      },
    ],
    "When shall I worship Sadāśiva with equal vision toward comfort and hardship, ornament and danger, wealth and earth, friend and foe, beauty and the ordinary, subject and king?",
    "This stanza has substantial syntactic variants. The selected reading understands sama-pravṛttikaḥ as an even or impartial disposition."
  ),
  stanza(
    13,
    [
      {
        original: "कदा निलिम्पनिर्झरीनिकुञ्जकोटरे वसन्",
        transliteration: "kadā nilimpa-nirjharī-nikuñja-koṭare vasan",
        meaning: "when, dwelling in a sheltered grove by the celestial river",
      },
      {
        original: "विमुक्तदुर्मतिः सदा शिरःस्थमञ्जलिं वहन्",
        transliteration: "vimukta-durmatiḥ sadā śiraḥ-stham añjaliṃ vahan",
        meaning: "free of distorted thought, always carrying joined hands above the head",
      },
      {
        original: "विलोललोललोचनाललामभाललग्नकं",
        transliteration: "vilola-lola-locanā-lalāma-bhāla-lagnakaṃ",
        meaning: "fixed upon the radiant brow of the one with playfully moving eyes",
      },
      {
        original: "शिवेति मन्त्रमुच्चरन् कदा सुखी भवाम्यहम्",
        transliteration: "śiveti mantram uccaran kadā sukhī bhavāmy aham",
        meaning: "uttering the mantra 'Śiva', when shall I become truly happy?",
      },
    ],
    "When, free from distorted thought, dwelling by the celestial river with hands joined and repeating the mantra 'Śiva', shall I become truly at peace?"
  ),
  stanza(
    14,
    [
      {
        original: "निलिम्पनाथनागरीकदम्बमौलिमल्लिका",
        transliteration: "nilimpa-nātha-nāgarī-kadamba-mauli-mallikā",
        meaning: "jasmine clustered upon the heads of the celestial Lord's companions",
      },
      {
        original: "निगुम्फनिर्भरक्षरन्मधूष्णिकामनोहरः",
        transliteration: "nigumpha-nirbhara-kṣaran-madhūṣṇikā-manoharaḥ",
        meaning: "enchanting with warm, honeyed pollen falling densely from the garlands",
      },
      {
        original: "तनोतु नो मनोमुदं विनोदिनीमहर्निशम्",
        transliteration: "tanotu no mano-mudaṃ vinodinīm aharniśam",
        meaning: "may it extend heart-delighting joy to us day and night",
      },
      {
        original: "परश्रियः परं पदं तदङ्गजत्विषां चयः",
        transliteration: "para-śriyaḥ paraṃ padaṃ tad-aṅgaja-tviṣāṃ cayaḥ",
        meaning: "that host of radiance born from the limbs of the supreme splendour",
      },
    ],
    "May the radiance flowing from Śiva's form—fragrant in the stanza's celestial garland imagery—bring the mind a deep, playful joy by day and night."
  ),
  stanza(
    15,
    [
      {
        original: "प्रचण्डवाडवानलप्रभाशुभप्रचारिणी",
        transliteration: "pracaṇḍa-vāḍavānala-prabhāśubha-pracāriṇī",
        meaning: "moving with the fierce radiance of the submarine cosmic fire",
      },
      {
        original: "महाष्टसिद्धिकामिनीजनावहूतजल्पना",
        transliteration: "mahāṣṭa-siddhi-kāminī-janāvahūta-jalpanā",
        meaning: "an invoked murmur among those who seek the eight great attainments",
      },
      {
        original: "विमुक्तवामलोचनाविवाहकालिकध्वनिः",
        transliteration: "vimukta-vāma-locanā-vivāha-kālika-dhvaniḥ",
        meaning: "a sound released at the wedding of the beautiful-eyed goddess",
      },
      {
        original: "शिवेति मन्त्रभूषणा जगज्जयाय जायताम्",
        transliteration: "śiveti mantra-bhūṣaṇā jagaj-jayāya jāyatām",
        meaning: "may the mantra-jewel 'Śiva' arise for the world's flourishing",
      },
    ],
    "May the mantra 'Śiva'—imagined through cosmic fire, sacred invocation, and the sound of Śiva and Pārvatī's wedding—arise for the welfare of the world.",
    "The compact compounds of this late body stanza support more than one grammatical resolution. The gloss stays close to the declared reading without pretending to settle every interpretive question."
  ),
  stanza(
    16,
    [
      {
        original: "पूजावसानसमये दशवक्त्रगीतं",
        transliteration: "pūjāvasāna-samaye daśavaktra-gītaṃ",
        meaning: "the song of the ten-faced one, at the completion of worship",
      },
      {
        original: "यः शम्भुपूजनपरं पठति प्रदोषे",
        transliteration: "yaḥ śambhu-pūjana-paraṃ paṭhati pradoṣe",
        meaning: "whoever recites it at Pradoṣa with devotion to Śambhu's worship",
      },
      {
        original: "तस्य स्थिरां मदगजेन्द्रतुरङ्गयुक्तां",
        transliteration: "tasya sthirāṃ mada-gajendra-turaṅga-yuktāṃ",
        meaning: "for that person, enduring prosperity attended by great elephants and horses",
      },
      {
        original: "लक्ष्मीं प्रसादसमये प्रददाति शम्भुः",
        transliteration: "lakṣmīṃ prasāda-samaye pradadāti śambhuḥ",
        meaning: "Śambhu grants Lakṣmī at the moment of grace",
      },
    ],
    "The concluding phalaśruti says that Śambhu grants enduring prosperity to one who recites the ten-faced one's hymn at Pradoṣa after worship.",
    "This is the benefit promised by the transmitted liturgical stanza. It is presented as a devotional claim, not as a guaranteed material outcome."
  ),
  stanza(
    17,
    [
      {
        original: "इदं हि नित्यमेवमुक्तमुत्तमोत्तमं स्तवं",
        transliteration: "idaṃ hi nityam evam uktam uttamottamaṃ stavaṃ",
        meaning: "this excellent hymn, spoken in this way and practiced regularly",
      },
      {
        original: "पठन् स्मरन् ब्रुवन् नरो विशुद्धमेति सन्ततम्",
        transliteration: "paṭhan smaran bruvan naro viśuddham eti santatam",
        meaning: "a person reading, remembering, and speaking it approaches continual purity",
      },
      {
        original: "हरे गुरौ सुभक्तिमाशु याति नान्यथा गतिम्",
        transliteration: "hare gurau subhaktim āśu yāti nānyathā gatim",
        meaning: "soon reaches deep devotion to Hara and the teacher, not another course",
      },
      {
        original: "विमोहनं हि देहिनां सुशङ्करस्य चिन्तनम्",
        transliteration: "vimohanaṃ hi dehināṃ suśaṅkarasya cintanam",
        meaning: "contemplation of auspicious Śaṅkara removes embodied beings' delusion",
      },
    ],
    "This supplementary stanza commends regular reading, remembering, and speaking of the hymn as a path toward purity, devotion to Hara and the teacher, and freedom from delusion.",
    "The declared source presents this after the phalaśruti as a transmitted supplementary unit; other editions place or count concluding material differently."
  ),
];
