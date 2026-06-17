import type { MDXComponents } from "mdx/types";
import { Pre } from "@/components/mdx/pre";
import { Callout } from "@/components/mdx/callout";
import { Steps } from "@/components/mdx/steps";
import { FileTree } from "@/components/mdx/file-tree";

/**
 * Global MDX component registry. Components listed here are available as bare
 * JSX tags inside any `.mdx` file without an explicit import, and HTML element
 * overrides (e.g. `pre`) apply to all rendered markdown.
 */
export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    // Fenced code blocks → copy-button wrapper around Shiki output.
    pre: Pre,
    // Custom lesson components.
    Callout,
    Steps,
    FileTree,
    ...components,
  };
}
