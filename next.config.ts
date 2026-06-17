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
  // remark/rehype plugins are wired up in Phase 1 (highlighting, slugs, gfm...).
  options: {},
});

export default withMDX(nextConfig);
