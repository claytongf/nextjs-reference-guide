"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/content/toc";
import { cn } from "@/lib/utils";

/** "On this page" navigation with scrollspy highlighting the active heading. */
export function Toc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (entries.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0% 0% -70% 0%", threshold: 1 },
    );

    for (const { id } of entries) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-2 font-semibold">On this page</p>
      <ul className="space-y-1.5">
        {entries.map((entry) => (
          <li key={entry.id} className={cn(entry.depth === 3 && "pl-3")}>
            <a
              href={`#${entry.id}`}
              className={cn(
                "text-muted-foreground hover:text-foreground block transition-colors",
                activeId === entry.id && "text-foreground font-medium",
              )}
            >
              {entry.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
