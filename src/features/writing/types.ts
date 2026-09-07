/**
 * A blog post is stored as an ordered list of typed content blocks rather
 * than raw HTML/Markdown, matching the rest of the site's convention of
 * keeping authored content as structured data. A "verse" block always
 * carries a real, checkable scripture citation — never an invented or
 * paraphrased-as-if-quoted line — so every quotation on the page can be
 * traced back to a named chapter and verse.
 */
export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | {
      type: "verse";
      work: string;
      reference: string;
      sanskrit?: string;
      transliteration?: string;
      translation: string;
    }
  | { type: "note"; label: string; text: string };

export interface ScriptureReference {
  work: string;
  detail: string;
  href?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  dek: string;
  tag: string;
  publishedDate: string; // ISO 8601, used for <time dateTime>
  displayDate: string;
  readingMinutes: number;
  heroGlyph: string;
  /** Internal bookkeeping only — never rendered. Records which recorded
   * teaching session a post was drawn from, so the daily authoring job can
   * tell what it has already covered and never writes the same session twice. */
  sourceSessionId?: string;
  /** Only set when a post is explicitly framed as a response to a named
   * external source. Omitted entirely for original essays. */
  inspiration?: {
    videoTitle: string;
    channelName: string;
    channelHref: string;
    videoHref: string;
  };
  blocks: readonly BlogBlock[];
  scriptureReferences: readonly ScriptureReference[];
}
