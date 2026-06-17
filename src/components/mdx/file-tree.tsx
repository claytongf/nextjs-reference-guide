/**
 * Lightweight file/directory tree rendered in a monospace, bordered panel.
 *
 * Pass the tree as a `tree` string (a template literal in MDX) rather than as
 * children — children would be reflowed by Prettier, collapsing the layout.
 *
 * ```mdx
 * <FileTree tree={`app/
 *   layout.tsx
 *   page.tsx`} />
 * ```
 */
export function FileTree({ tree }: { tree: string }) {
  return (
    <div className="border-border bg-muted/40 my-6 overflow-x-auto rounded-lg border p-4">
      <pre className="m-0 bg-transparent p-0 font-mono text-sm leading-6">
        {tree.replace(/^\n+|\n+$/g, "")}
      </pre>
    </div>
  );
}
