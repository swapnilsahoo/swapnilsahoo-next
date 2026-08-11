export type ImmortalityTraditionFamily = "indic" | "buddhist" | "bon" | "global";

export type ImmortalityEvidenceLevel =
  | "historically-attested"
  | "tradition-led"
  | "source-limited"
  | "historical-legend";

export interface ImmortalityTerm {
  original: string;
  transliteration: string;
  meaning: string;
  language: string;
  lang: string;
  scriptClass?: string;
}

export interface ImmortalityNativeName {
  text: string;
  lang: string;
  scriptClass?: string;
}

export interface ImmortalitySource {
  id: string;
  title: string;
  citation: string;
  href: string;
  kind: "primary text" | "scholarship" | "institution" | "tradition source" | "archive";
  note: string;
}

export interface ImmortalityProfile {
  slug: string;
  index: string;
  name: string;
  alternateNames?: string;
  originalName?: string;
  originalNameLang?: string;
  originalNameClass?: string;
  originalNames?: ImmortalityNativeName[];
  period: string;
  place: string;
  tradition: string;
  family: ImmortalityTraditionFamily;
  familyLabel: string;
  evidenceLevel: ImmortalityEvidenceLevel;
  evidenceLabel: string;
  proposition: string;
  historicalRecord: string;
  traditionAccount: string;
  evidenceBoundary: string;
  terms: ImmortalityTerm[];
  sourceIds: string[];
}
