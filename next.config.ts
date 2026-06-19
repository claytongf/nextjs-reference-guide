import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Produce a minimal, self-contained server build for Docker / self-hosting.
  output: "standalone",
  // Allow `.md` / `.mdx` files to be treated as pages and imports.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // Turbopack runs plugins in Rust: pass plugin *names* (strings), and only
    // serializable options — JavaScript functions cannot be passed across.
    remarkPlugins: [
      // Parse & strip YAML frontmatter so it doesn't render as content.
      "remark-frontmatter",
      // GitHub Flavored Markdown (tables, strikethrough, task lists...).
      "remark-gfm",
    ],
    rehypePlugins: [
      // Add `id`s to headings (github-slugger), so the TOC can link to them.
      "rehype-slug",
      // Wrap each heading in an anchor link.
      ["rehype-autolink-headings", { behavior: "wrap" }],
      // Syntax highlighting via Shiki. `keepBackground: false` lets our CSS
      // control the code block background for light/dark parity.
      [
        "rehype-pretty-code",
        {
          // github-light-high-contrast meets WCAG AA on the light code
          // background (plain github-light's red keyword token does not).
          theme: { light: "github-light-high-contrast", dark: "github-dark" },
          keepBackground: false,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
