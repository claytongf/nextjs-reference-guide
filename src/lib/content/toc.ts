import GithubSlugger from "github-slugger";

export interface TocEntry {
  /** Heading text. */
  title: string;
  /** Slug id — matches the `id` rehype-slug assigns to the heading. */
  id: string;
  /** Heading depth (2 = h2, 3 = h3). */
  depth: 2 | 3;
}

/**
 * Extract h2/h3 headings from raw MDX body to build an "On this page" TOC.
 * Fenced code blocks are skipped so `# comments` inside code aren't picked up.
 * Ids are generated with github-slugger to match rehype-slug exactly.
 */
export function getTableOfContents(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const lines = markdown.split("\n");
  const toc: TocEntry[] = [];
  let inFence = false;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    // Strip inline markdown emphasis/code/links from the heading text.
    const title = match[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .trim();

    toc.push({ title, id: slugger.slug(title), depth });
  }

  return toc;
}
