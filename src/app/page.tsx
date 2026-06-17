import Link from "next/link";
import { ArrowRight, BookOpen, Code2, GraduationCap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const highlights = [
  {
    icon: BookOpen,
    title: "Searchable reference",
    description:
      "Accurate, up-to-date docs for React 19 and Next.js 16 — including the new caching directives, proxy, and file conventions.",
  },
  {
    icon: Code2,
    title: "Live playgrounds",
    description:
      "Edit and run React & Next examples in the browser. Learn by doing, not just reading.",
  },
  {
    icon: GraduationCap,
    title: "Tracks & tests",
    description:
      "Structured paths from Junior to Tech Lead, with knowledge tests that track your progress.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="flex flex-col items-center gap-6 py-20 text-center sm:py-28">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          The interactive React &amp; Next.js reference
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          {siteConfig.description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/docs" className={buttonVariants({ size: "default" })}>
            Start learning
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/tracks"
            className={buttonVariants({ variant: "outline" })}
          >
            Browse tracks
          </Link>
        </div>
      </section>

      <section className="grid gap-6 pb-24 sm:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="border-border rounded-lg border p-6">
            <item.icon className="text-primary h-6 w-6" />
            <h2 className="mt-4 font-semibold">{item.title}</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              {item.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
