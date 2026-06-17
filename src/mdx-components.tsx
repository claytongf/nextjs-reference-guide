import type { MDXComponents } from "mdx/types";

/**
 * Global MDX component overrides.
 *
 * Required by `@next/mdx` with the App Router. Custom lesson components
 * (Callout, Tabs, Steps, Playground, CodeBlock...) are registered here in
 * Phase 1+. For now it returns the defaults unchanged.
 */
export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    ...components,
  };
}
