import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  docFrontmatterSchema,
  TRACKS,
  TRACK_META,
  type DocFrontmatter,
  type Track,
} from "./schema";

/** Absolute path to the MDX content root. */
export const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export interface Doc {
  /** URL path under /docs, e.g. "tracks/junior/components". */
  slug: string;
  /** Slug split into segments, for the [...slug] route. */
  segments: string[];
  /** Absolute file path. */
  filePath: string;
  frontmatter: DocFrontmatter;
}

/** Recursively collect every `.mdx` file under the content directory. */
function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.isFile() && full.endsWith(".mdx") ? [full] : [];
  });
}

function fileToSlug(filePath: string): string {
  const rel = path.relative(CONTENT_DIR, filePath).replace(/\\/g, "/");
  return rel.replace(/\.mdx$/, "");
}

let cache: Doc[] | null = null;

/**
 * Load and validate all docs once per process. Frontmatter that fails schema
 * validation throws with the offending file path so CI catches it early.
 */
export function getAllDocs(): Doc[] {
  if (cache) return cache;

  const docs = walk(CONTENT_DIR).map((filePath): Doc => {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = docFrontmatterSchema.safeParse(matter(raw).data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in ${path.relative(process.cwd(), filePath)}:\n` +
          parsed.error.issues
            .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
            .join("\n"),
      );
    }
    return {
      slug: fileToSlug(filePath),
      segments: fileToSlug(filePath).split("/"),
      filePath,
      frontmatter: parsed.data,
    };
  });

  cache = docs;
  return docs;
}

/** Published docs only (drafts excluded), sorted by track then order then title. */
export function getPublishedDocs(): Doc[] {
  const trackIndex = (t: Track) => TRACKS.indexOf(t);
  return getAllDocs()
    .filter((d) => !d.frontmatter.draft)
    .sort((a, b) => {
      const t =
        trackIndex(a.frontmatter.track) - trackIndex(b.frontmatter.track);
      if (t !== 0) return t;
      const o = a.frontmatter.order - b.frontmatter.order;
      if (o !== 0) return o;
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
    });
}

export function getDocBySegments(segments: string[]): Doc | undefined {
  const slug = segments.join("/");
  return getAllDocs().find((d) => d.slug === slug && !d.frontmatter.draft);
}

export interface NavSection {
  track: Track;
  label: string;
  items: { title: string; slug: string }[];
}

/** Sidebar navigation grouped by track, in track + order sequence. */
export function getNavigation(): NavSection[] {
  const docs = getPublishedDocs();
  return TRACKS.map((track) => ({
    track,
    label: TRACK_META[track].label,
    items: docs
      .filter((d) => d.frontmatter.track === track)
      .map((d) => ({ title: d.frontmatter.title, slug: d.slug })),
  })).filter((section) => section.items.length > 0);
}

/** Previous/next neighbours in the flattened, ordered reading sequence. */
export function getDocNeighbours(slug: string): {
  prev?: { title: string; slug: string };
  next?: { title: string; slug: string };
} {
  const docs = getPublishedDocs();
  const index = docs.findIndex((d) => d.slug === slug);
  if (index === -1) return {};
  const toLink = (d?: Doc) =>
    d ? { title: d.frontmatter.title, slug: d.slug } : undefined;
  return {
    prev: toLink(docs[index - 1]),
    next: toLink(docs[index + 1]),
  };
}
