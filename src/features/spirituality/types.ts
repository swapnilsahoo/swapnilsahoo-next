export type ScriptureSlug =
  | "hanuman-chalisa"
  | "vishnu-sahasranama"
  | "lalita-sahasranama"
  | "shiva-tandava-stotram"
  | "bhagavad-gita"
  | "ramcharitmanas"
  | "chandogya-upanishad";

export type WordGloss = {
  original?: string;
  transliteration: string;
  meaning: string;
};

export type ReaderEntry = {
  id: string;
  sequence: number;
  section: string;
  label: string;
  original: string;
  transliteration: string;
  meaning: string;
  words: WordGloss[];
  note?: string;
};

export type SourceLink = {
  title: string;
  institution: string;
  href: string;
  note: string;
};

export type AttributionProfile = {
  role: string;
  name: string;
  dates?: string;
  summary: string;
  evidenceLabel: "Historical profile" | "Traditional attribution" | "Narrative voice";
};

export type ScriptureCatalogEntry = {
  slug: ScriptureSlug;
  navLabel: string;
  shortTitle: string;
  title: string;
  originalTitle: string;
  transliteratedTitle: string;
  language: string;
  form: string;
  glyph: string;
  dek: string;
  scopeLabel: string;
  scopeNote: string;
  entryCountLabel: string;
  authenticity: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
  profiles: AttributionProfile[];
  editorialPolicy: string[];
  sources: SourceLink[];
  traditionalBenefits?: {
    eyebrow: string;
    title: string;
    items: string[];
    disclaimer: string;
    image?: {
      src: string;
      alt: string;
    };
  };
  practicalGuidance?: {
    eyebrow: string;
    title: string;
    items: string[];
    disclaimer: string;
    images?: Array<{
      src: string;
      alt: string;
      width: number;
      height: number;
    }>;
  };
};
