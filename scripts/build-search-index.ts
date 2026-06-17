/**
 * Build-time search index generator.
 *
 * Walks src/content, validates frontmatter, extracts headings and a plain-text
 * body, and writes public/search-index.json. The client palette fetches this
 * file and builds a FlexSearch index in the browser. Run via `prebuild`/`predev`.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { docFrontmatterSchema, TRACK_META } from "../src/lib/content/schema";
import { getTableOfContents } from "../src/lib/content/toc";
import type { SearchDoc } from "../src/lib/search/types";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");
const OUT_FILE = path.join(process.cwd(), "public", "search-index.json");

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.isFile() && full.endsWith(".mdx") ? [full] : [];
  });
}

/** Reduce MDX/markdown to searchable plain text. */
function toPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/<[^>]+>/g, " ") // JSX/HTML tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links → text
    .replace(/[#>*_~|-]/g, " ") // markdown punctuation
    .replace(/\{[^}]*\}/g, " ") // JSX expressions
    .replace(/\s+/g, " ")
    .trim();
}

function build(): void {
  const docs: SearchDoc[] = walk(CONTENT_DIR).flatMap((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const parsed = docFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in ${path.relative(process.cwd(), filePath)}: ` +
          parsed.error.issues.map((i) => i.message).join(", "),
      );
    }
    if (parsed.data.draft) return [];

    const slug = path
      .relative(CONTENT_DIR, filePath)
      .replace(/\\/g, "/")
      .replace(/\.mdx$/, "");

    return [
      {
        id: slug,
        slug,
        title: parsed.data.title,
        summary: parsed.data.summary ?? "",
        track: parsed.data.track,
        trackLabel: TRACK_META[parsed.data.track].label,
        headings: getTableOfContents(content).map((h) => ({
          id: h.id,
          title: h.title,
        })),
        content: toPlainText(content),
      },
    ];
  });

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(docs));
  console.log(
    `[search] indexed ${docs.length} docs → ${path.relative(process.cwd(), OUT_FILE)}`,
  );
}

build();
