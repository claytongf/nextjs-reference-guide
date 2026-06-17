import { describe, expect, it } from "vitest";
import { getTableOfContents } from "./toc";

describe("getTableOfContents", () => {
  it("extracts h2 and h3 with slugger ids", () => {
    const md = ["## Getting Started", "text", "### Install Deps"].join("\n");
    expect(getTableOfContents(md)).toEqual([
      { title: "Getting Started", id: "getting-started", depth: 2 },
      { title: "Install Deps", id: "install-deps", depth: 3 },
    ]);
  });

  it("ignores headings inside fenced code blocks", () => {
    const md = ["## Real", "```", "## Not a heading", "```"].join("\n");
    expect(getTableOfContents(md)).toEqual([
      { title: "Real", id: "real", depth: 2 },
    ]);
  });

  it("strips inline markdown from heading text", () => {
    const md = "## Using `use cache` **today**";
    expect(getTableOfContents(md)[0]).toEqual({
      title: "Using use cache today",
      id: "using-use-cache-today",
      depth: 2,
    });
  });

  it("deduplicates repeated headings like github-slugger", () => {
    const md = ["## Notes", "## Notes"].join("\n");
    expect(getTableOfContents(md).map((e) => e.id)).toEqual([
      "notes",
      "notes-1",
    ]);
  });
});
