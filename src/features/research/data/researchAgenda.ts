import type { ResearchBranch, ThesisFoundation } from "@/features/research/types";

export const researchAgenda = {
  eyebrow: "Research · open agenda",
  title: "Creating strategic possibility under constraint.",
  description:
    "My research asks how entrepreneurs and family firms act when conventional resources, supportive institutions and established pathways are limited. The focus is not only what resources people possess, but how cognition, materials, relationships and collective effort are mobilised into action.",
  collaboration:
    "I welcome collaboration with researchers, founders, family enterprises, incubators and institutions interested in testing and extending this agenda through longitudinal, comparative, multi-source and cross-country work.",
} as const;

export const thesisFoundation: ThesisFoundation = {
  eyebrow: "Doctoral foundation · XLRI Jamshedpur",
  title: "Entrepreneurial Resourcefulness in Resource-Constrained Environments",
  status: "Submitted doctoral thesis toward the Fellow in Management (FPM)",
  institution: "Xavier School of Management (XLRI), Jamshedpur",
  manuscriptDate: "August 2024",
  submittedDate: "30 October 2024",
  description:
    "The thesis brings together three connected perspectives: neurodiverse entrepreneurial agency, the movement from bricolage to effectuation, and family-business resourcefulness in institutional voids. It provides the foundation for a broader agenda on inclusive entrepreneurship, family-enterprise innovation, frugal problem-solving and dynamic capabilities.",
  citation:
    "Sahoo, S. (2024). Entrepreneurial Resourcefulness in Resource-Constrained Environments. Submitted doctoral thesis, Fellow in Management, Xavier School of Management (XLRI), Jamshedpur.",
  committee: [
    {
      name: "Prof. Fr. Kuruvilla Pandikattu, S.J.",
      role: "Thesis Committee Chairperson",
    },
    { name: "Prof. Munish Thakur", role: "Thesis Committee Advisor" },
    { name: "Prof. Rahul Shukla", role: "Thesis Committee Advisor" },
  ],
  acknowledgement:
    "This doctoral work was shaped by the guidance of my thesis committee and by the generosity of faculty colleagues, the FPM and eFPM community, family-business leaders who shared their experiences, and my family and friends. Their questions, criticism, trust and encouragement made the work possible.",
  questions: [
    "How do neurodiverse traits translate into entrepreneurial agency and resourcefulness under scarcity?",
    "How might family firms move from bricolage toward effectuation as legitimacy and access improve?",
    "How does family-business resourcefulness operate in institutional voids, and how might it become frugal innovation through dynamic capabilities?",
  ],
};

export const researchBranches: ResearchBranch[] = [
  {
    slug: "neurodiversity-entrepreneurial-agency",
    index: "01",
    title: "Neurodiversity & Entrepreneurial Agency",
    shortTitle: "Neurodiversity & Agency",
    status: "Conceptual foundation · open empirical agenda",
    summary:
      "How distinctive combinations of cognitive strengths and support needs may shape opportunity recognition, persistence and adaptation.",
    centralQuestion:
      "How do neurodiverse traits translate into entrepreneurial agency and resourcefulness in environments characterised by limited resources?",
    thesisConnection:
      "The first thesis essay develops the ‘spiky profile’ as a conceptual lens and connects it with coping, sociomateriality and affordances across the entrepreneurial lifecycle.",
    context:
      "Neurodiverse founders, entrepreneurial teams, incubators and support environments where individual variability matters more than broad diagnostic stereotypes.",
    icon: "compass",
    keywords: [
      "neurodiversity and entrepreneurship",
      "entrepreneurial agency",
      "spiky profile",
      "inclusive entrepreneurship",
      "sociomateriality",
    ],
    concepts: [
      "Neurodiversity",
      "Spiky profiles",
      "Coping",
      "Sociomateriality",
      "Affordances",
      "Entrepreneurial agency",
    ],
    mechanism: [
      {
        label: "Profile",
        title: "Uneven strengths and support needs",
        detail:
          "A person may show pronounced capabilities in some domains alongside real difficulty in others; neither side should be treated as the whole person.",
      },
      {
        label: "Scaffolding",
        title: "Coping and sociomaterial support",
        detail:
          "Tools, routines, relationships and settings can help people work with their cognitive profile rather than expecting strengths to convert automatically into outcomes.",
      },
      {
        label: "Agency",
        title: "Opportunity action and adaptation",
        detail:
          "The research asks when supportive configurations make it easier to notice, pursue and persist with entrepreneurial possibilities.",
      },
    ],
    contributions: [
      "Develops the spiky profile as a conceptual platform for studying entrepreneurship without flattening individual differences.",
      "Organises coping as natural or deliberate and as promotive or protective.",
      "Connects cognitive profiles with opportunity recognition, venture-stage demands, persistence and adaptation.",
    ],
    openQuestions: [
      "How do founders’ support needs and coping practices change across venture stages?",
      "Which assistive technologies, incubator practices and team arrangements are genuinely enabling?",
      "How do intention, persistence and performance differ—and which mechanisms explain each outcome?",
      "How can research remain person-specific while still building useful, testable theory?",
    ],
    collaborationFits: [
      "Researchers in entrepreneurship, neurodiversity, organisational behaviour or disability studies",
      "Incubators and support organisations designing more inclusive founder environments",
      "Founders and teams interested in careful longitudinal or qualitative research",
      "Methodologists working with person-centred, mixed-method or lifecycle designs",
    ],
    evidenceNote:
      "This branch is primarily a conceptual proposition and literature synthesis. It does not claim that any diagnosis determines entrepreneurial behaviour, nor that one cognitive profile is universally advantageous.",
    methodNote:
      "The next evidential step is longitudinal and person-centred: following founders across venture stages while documenting context, supports, coping practices and distinct outcomes.",
  },
  {
    slug: "bricolage-to-effectuation",
    index: "02",
    title: "From Bricolage to Effectuation",
    shortTitle: "Bricolage → Effectuation",
    status: "Thesis evidence · transition questions in progress",
    summary:
      "When making do with what is at hand becomes a pathway toward a broader logic of entrepreneurial action.",
    centralQuestion:
      "Under what conditions can bricolage become a springboard to effectuation as legitimacy and access to resources improve?",
    thesisConnection:
      "The second thesis essay studies family enterprises that begin by recombining locally available resources and examines whether effectual action becomes more prominent as their room to manoeuvre expands.",
    context:
      "Family enterprises and small firms operating under material scarcity, legitimacy deficits and uneven access to formal markets or institutions.",
    icon: "bricolage",
    keywords: [
      "entrepreneurial bricolage",
      "effectuation",
      "family business",
      "resource constraints",
      "socioemotional wealth",
    ],
    concepts: [
      "Bricolage",
      "Effectuation",
      "Legitimacy",
      "Affordances",
      "Community resources",
      "Socioemotional wealth",
    ],
    mechanism: [
      {
        label: "Make do",
        title: "Recombine what is already at hand",
        detail:
          "Actors respond to immediate constraints through local knowledge, relationships, overlooked materials and practical experimentation.",
      },
      {
        label: "Legitimise",
        title: "Build access and room to choose",
        detail:
          "Useful action can create credibility, networks and selective access to more conventional resources without erasing the value of local ingenuity.",
      },
      {
        label: "Expand",
        title: "Use effectual commitments strategically",
        detail:
          "The research examines when affordable loss, partnerships and co-created commitments begin to extend the venture’s action set.",
      },
    ],
    contributions: [
      "Treats bricolage and effectuation as potentially sequential, not only parallel entrepreneurial logics.",
      "Highlights legitimacy and access to conventional resources as possible transition mechanisms.",
      "Examines family-centred non-financial goals as a boundary condition rather than assuming one universal pathway.",
    ],
    openQuestions: [
      "When does a transition occur, stall or fail—and what observable threshold marks the change?",
      "When are bricolage and effectuation sequential, simultaneous or substitutable?",
      "How do industry, region, firm age and family involvement change the pathway?",
      "What roles do legitimacy, community ties and access to conventional resources play over time?",
    ],
    collaborationFits: [
      "Scholars studying entrepreneurial process, effectuation, bricolage or resource orchestration",
      "Family firms and small enterprises willing to participate in longitudinal field research",
      "Researchers building comparative family and non-family samples",
      "Institutions working in regions where formal-market access is uneven",
    ],
    evidenceNote:
      "The dissertation combines an in-depth retrospective family-business case with a cross-sectional owner survey. Its evidence is consistent with a transition pathway; it does not prove a universal causal sequence.",
    methodNote:
      "The strongest extension would observe ventures repeatedly over time and triangulate interviews with resource, partnership, legitimacy and performance records.",
  },
  {
    slug: "family-business-resourcefulness",
    index: "03",
    title: "Family Business Resourcefulness",
    shortTitle: "Family Resourcefulness",
    status: "Emerging construct · validation agenda",
    summary:
      "How family commitment, coordination and adaptive effort may help firms mobilise scarce resources when institutions do not work well.",
    centralQuestion:
      "How does family-business resourcefulness manifest in institutional voids, and where are the boundaries of family-based coordination?",
    thesisConnection:
      "The third thesis essay introduces Family Business Resourcefulness (FBR) as an emerging construct and distinguishes active resource mobilisation from socioemotional wealth.",
    context:
      "Family firms in institutional voids, where formal contracting, specialised markets and reliable infrastructure may be incomplete or costly.",
    icon: "network",
    keywords: [
      "family business resourcefulness",
      "institutional voids",
      "family governance",
      "resource mobilisation",
      "socioemotional wealth",
    ],
    concepts: [
      "Family governance",
      "Institutional voids",
      "Resource mobilisation",
      "Transaction costs",
      "Non-tradable assets",
      "Socioemotional wealth",
    ],
    mechanism: [
      {
        label: "Void",
        title: "Formal support is incomplete",
        detail:
          "Missing intermediaries, costly contracting or weak infrastructure make ordinary resource acquisition less reliable.",
      },
      {
        label: "Mobilise",
        title: "Family effort coordinates resources",
        detail:
          "Commitment, trust, shared history and adaptive effort can help assemble generic resources that markets do not supply efficiently.",
      },
      {
        label: "Boundary",
        title: "Specialised needs test the model",
        detail:
          "Family coordination may not substitute for every specialised asset, professional capability or external perspective.",
      },
    ],
    contributions: [
      "Introduces Family Business Resourcefulness as an active resource-mobilisation construct.",
      "Develops an initial four-item measure intended for further testing and refinement.",
      "Connects family governance with transaction costs, institutional voids and the resource-based view.",
      "Separates resourceful action from the family-centred identity and continuity concerns captured by socioemotional wealth.",
    ],
    openQuestions: [
      "Can independent studies validate, refine or challenge the proposed FBR measure?",
      "How does the construct differ across family and non-family firms, countries and institutional settings?",
      "What can owners, employees, financial records and external assessments reveal together?",
      "Where does family coordination help with generic assets but constrain access to specialised ones?",
    ],
    collaborationFits: [
      "Family-business researchers interested in construct development and independent replication",
      "Family enterprises open to multi-source organisational research",
      "Cross-country teams comparing institutional environments",
      "Scholars of governance, transaction costs, institutions or resource orchestration",
    ],
    evidenceNote:
      "FBR is an emerging construct with an initial measure. The website presents it as a research proposition that requires independent validation—not as an established universal scale.",
    methodNote:
      "Priority designs include measurement validation, matched family/non-family samples, multiple respondents per firm and cross-country invariance testing.",
  },
  {
    slug: "frugal-innovation-dynamic-capabilities",
    index: "04",
    title: "Frugal Innovation & Dynamic Capabilities",
    shortTitle: "Frugal Innovation",
    status: "Thesis model · longitudinal extension agenda",
    summary:
      "How sensing, seizing and reconfiguring may convert family resourcefulness into useful, affordable innovation.",
    centralQuestion:
      "How does family-business resourcefulness become frugal innovation through dynamic capabilities, and when does family-centred value strengthen or constrain that pathway?",
    thesisConnection:
      "The thesis tests a model in which dynamic capabilities carry much of the relationship between Family Business Resourcefulness and frugal innovation, with socioemotional wealth considered as context.",
    context:
      "Family firms seeking useful, affordable solutions under resource constraint while balancing economic, social and family-centred goals.",
    icon: "spark",
    keywords: [
      "frugal innovation",
      "dynamic capabilities",
      "family business",
      "resource orchestration",
      "socioemotional wealth",
    ],
    concepts: [
      "Frugal innovation",
      "Dynamic capabilities",
      "Sensing",
      "Seizing",
      "Reconfiguring",
      "Resource efficiency",
    ],
    mechanism: [
      {
        label: "Resourcefulness",
        title: "Mobilise under constraint",
        detail:
          "Family effort and coordination create an action base when money, infrastructure or market support is limited.",
      },
      {
        label: "Capability",
        title: "Sense, seize and reconfigure",
        detail:
          "Dynamic capabilities describe how firms notice change, commit to possibilities and rearrange resources as conditions evolve.",
      },
      {
        label: "Innovation",
        title: "Create more value with less",
        detail:
          "Frugal innovation is treated as an outcome to be evaluated for usefulness and affordability—not as scarcity romanticised.",
      },
    ],
    contributions: [
      "Positions dynamic capabilities as a possible pathway between resource mobilisation and frugal innovation.",
      "Connects sensing, seizing and reconfiguring with family-enterprise action under constraint.",
      "Treats socioemotional wealth as a contextual influence whose effects require careful, qualified interpretation.",
    ],
    openQuestions: [
      "How do dynamic capabilities actually develop and change inside family firms over time?",
      "Do objective innovation and performance outcomes support perceptual findings?",
      "How does resource orchestration differ in resource-rich and resource-constrained settings?",
      "When does frugal innovation improve economic, social and environmental outcomes together?",
    ],
    collaborationFits: [
      "Researchers in innovation, dynamic capabilities, sustainability or family enterprise",
      "Firms willing to combine survey evidence with innovation and performance records",
      "Cross-disciplinary teams studying affordable, inclusive or resource-efficient innovation",
      "Partners interested in longitudinal capability development and comparative settings",
    ],
    evidenceNote:
      "The thesis reports relationships consistent with a mediating role for dynamic capabilities. Some moderation evidence is mixed, so the branch treats it as a boundary question rather than a settled conclusion.",
    methodNote:
      "Longitudinal, multi-source designs with objective innovation measures are the clearest next step for testing sequence, persistence and impact.",
  },
];

export function getResearchBranch(slug: string) {
  return researchBranches.find((branch) => branch.slug === slug);
}

export function researchCollaborationHref(subject: string) {
  const email = "swapnil.sahoo@greatlakes.edu.in";
  const body = [
    "Dear Dr. Sahoo,",
    "",
    `My work intersects with your research on ${subject}.`,
    "",
    "A possible question, context or dataset we could explore is:",
    "",
    "Best regards,",
  ].join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(`Research collaboration: ${subject}`)}&body=${encodeURIComponent(body)}`;
}
