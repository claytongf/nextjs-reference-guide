"use client";

import { useRef, useState, type ComponentPropsWithoutRef } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Replaces the default <pre> for fenced code blocks. rehype-pretty-code emits
 * the highlighted markup as children; we add a copy-to-clipboard button that
 * reads the rendered text.
 */
export function Pre({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = ref.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6">
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="border-border bg-background/80 text-muted-foreground hover:text-foreground absolute top-2 right-2 z-10 rounded-md border p-1.5 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre
        ref={ref}
        className={cn(
          "border-border bg-muted/40 overflow-x-auto rounded-lg border py-4 text-sm",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
