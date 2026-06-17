import type { ReactNode } from "react";

/**
 * Numbered steps. Wrap a series of `### Heading` + content blocks in <Steps>;
 * each immediate child heading is numbered via a CSS counter.
 */
export function Steps({ children }: { children: ReactNode }) {
  return (
    <div className="steps border-border mb-12 ml-4 border-l pl-6 [counter-reset:step]">
      {children}
    </div>
  );
}
