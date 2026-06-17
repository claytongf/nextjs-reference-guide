import type { Metadata } from "next";
import Link from "next/link";
import { getNavigation } from "@/lib/content/loader";
import { TRACK_META, type Track } from "@/lib/content/schema";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Browse the React & Next.js reference and learning tracks, from Junior to Tech Lead.",
};

export default function DocsIndexPage() {
  const sections = getNavigation();

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Reference and learning tracks for React 19 &amp; Next.js 16.
        </p>
      </header>

      {sections.length === 0 ? (
        <p className="text-muted-foreground">No content published yet.</p>
      ) : (
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.track}>
              <h2 className="text-xl font-semibold">{section.label}</h2>
              <p className="text-muted-foreground mb-4 text-sm">
                {TRACK_META[section.track as Track].description}
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {section.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/docs/${item.slug}`}
                      className="border-border hover:bg-muted block rounded-lg border p-4 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
