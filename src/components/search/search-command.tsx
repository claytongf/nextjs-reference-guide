"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Document, type DocumentData } from "flexsearch";
import { Search } from "lucide-react";
import { SEARCH_INDEX_URL, type SearchDoc } from "@/lib/search/types";

/** Shape of FlexSearch's non-enriched Document search result. */
type IdResults = Array<{ field: string; result: Array<string | number> }>;

export function SearchCommand() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [results, setResults] = useState<SearchDoc[]>([]);

  const indexRef = useRef<Document | null>(null);
  const byIdRef = useRef<Map<string, SearchDoc>>(new Map());

  // ⌘K / Ctrl+K toggles the palette anywhere in the app.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lazily fetch the index and build FlexSearch the first time it's opened.
  useEffect(() => {
    if (!open || indexRef.current) return;
    let cancelled = false;
    void (async () => {
      const res = await fetch(SEARCH_INDEX_URL);
      const data: SearchDoc[] = await res.json();
      if (cancelled) return;

      const index = new Document({
        tokenize: "forward",
        document: { id: "id", index: ["title", "summary", "content"] },
      });
      for (const doc of data) index.add(doc as unknown as DocumentData);
      indexRef.current = index;
      byIdRef.current = new Map(data.map((d) => [d.id, d]));
      setDocs(data);
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  // Re-run whenever the query changes or the index finishes loading (`docs`),
  // so typing before the fetch completes still resolves once it's ready.
  useEffect(() => {
    const index = indexRef.current;
    if (!index || query.trim() === "") {
      setResults([]);
      return;
    }
    const groups = index.search(query, { limit: 12 }) as unknown as IdResults;
    const ordered: SearchDoc[] = [];
    const seen = new Set<string>();
    for (const group of groups) {
      for (const id of group.result) {
        const key = String(id);
        const doc = byIdRef.current.get(key);
        if (doc && !seen.has(key)) {
          seen.add(key);
          ordered.push(doc);
        }
      }
    }
    setResults(ordered);
  }, [query, docs]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    setResults([]);
    router.push(href);
  };

  const list = query.trim() === "" ? docs : results;
  const lowerQuery = query.trim().toLowerCase();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border-border bg-background text-muted-foreground hover:text-foreground inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm transition-colors"
        aria-label="Search docs"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search…</span>
        <kbd className="border-border bg-muted text-foreground hidden rounded border px-1.5 font-mono text-xs sm:inline">
          ⌘K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        shouldFilter={false}
        label="Search documentation"
        overlayClassName="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        contentClassName="fixed left-1/2 top-24 z-50 w-[90vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
      >
        <div className="border-border flex items-center gap-2 border-b px-3">
          <Search className="text-muted-foreground h-4 w-4 shrink-0" />
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Search the docs…"
            className="placeholder:text-muted-foreground h-12 w-full bg-transparent text-sm outline-none"
          />
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="text-muted-foreground py-6 text-center text-sm">
            No results found.
          </Command.Empty>
          {list.map((doc) => {
            const matchedHeadings = lowerQuery
              ? doc.headings.filter((h) =>
                  h.title.toLowerCase().includes(lowerQuery),
                )
              : [];
            return (
              <Command.Group
                key={doc.id}
                heading={doc.trackLabel}
                className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-xs"
              >
                <Command.Item
                  value={doc.slug}
                  onSelect={() => go(`/docs/${doc.slug}`)}
                  className="aria-selected:bg-muted flex cursor-pointer flex-col gap-0.5 rounded-md px-2 py-2 text-sm"
                >
                  <span className="font-medium">{doc.title}</span>
                  {doc.summary ? (
                    <span className="text-muted-foreground line-clamp-1 text-xs">
                      {doc.summary}
                    </span>
                  ) : null}
                </Command.Item>
                {matchedHeadings.slice(0, 3).map((h) => (
                  <Command.Item
                    key={`${doc.id}#${h.id}`}
                    value={`${doc.slug}#${h.id}`}
                    onSelect={() => go(`/docs/${doc.slug}#${h.id}`)}
                    className="text-muted-foreground aria-selected:bg-muted flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 pl-5 text-xs"
                  >
                    <span className="text-border">#</span>
                    {h.title}
                  </Command.Item>
                ))}
              </Command.Group>
            );
          })}
        </Command.List>
      </Command.Dialog>
    </>
  );
}
