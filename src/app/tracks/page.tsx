import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getNavigation } from "@/lib/content/loader";
import { TRACK_META } from "@/lib/content/schema";

export const metadata: Metadata = {
  title: "Tracks",
  description:
    "Guided learning tracks for React 19 & Next.js 16 — from Junior to Tech Lead, plus dedicated Testing and Security tracks.",
};

export default function TracksPage() {
  const sections = getNavigation();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Learning Tracks</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Pick a path and work through it in order, or jump straight to a topic.
          Each track builds from fundamentals to interview-ready depth.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => {
          const first = section.items[0];
          const count = section.items.length;
          return (
            <Link
              key={section.track}
              href={first ? `/docs/${first.slug}` : "/docs"}
              className="border-border hover:bg-muted group flex flex-col rounded-lg border p-6 transition-colors"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <h2 className="text-xl font-semibold tracking-tight">
                  {section.label}
                </h2>
                <ArrowRight className="text-muted-foreground h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-muted-foreground flex-1 text-sm">
                {TRACK_META[section.track].description}
              </p>
              <p className="text-muted-foreground mt-4 text-xs font-medium">
                {count} {count === 1 ? "lesson" : "lessons"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
