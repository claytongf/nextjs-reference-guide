/** A single searchable document, emitted by scripts/build-search-index.ts. */
export interface SearchDoc {
  /** Unique id — same as `slug`. */
  id: string;
  /** Slug under /docs, e.g. "tracks/junior/what-is-react". */
  slug: string;
  title: string;
  summary: string;
  track: string;
  trackLabel: string;
  /** Section headings, for "jump to heading" results. */
  headings: { id: string; title: string }[];
  /** Plain-text body, for full-text search. */
  content: string;
}

/** Public URL of the generated index (served from /public). */
export const SEARCH_INDEX_URL = "/search-index.json";
