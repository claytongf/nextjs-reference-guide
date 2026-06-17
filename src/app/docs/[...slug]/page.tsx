import fs from "node:fs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import {
  getDocBySegments,
  getPublishedDocs,
  getDocNeighbours,
} from "@/lib/content/loader";
import { TRACK_META } from "@/lib/content/schema";
import { getTableOfContents } from "@/lib/content/toc";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { PrevNext } from "@/components/docs/prev-next";
import { Toc } from "@/components/docs/toc";

// 404 on any slug not produced by generateStaticParams.
export const dynamicParams = false;

type Params = Promise<{ slug: string[] }>;

export function generateStaticParams() {
  return getPublishedDocs().map((doc) => ({ slug: doc.segments }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySegments(slug);
  if (!doc) return {};
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.summary,
  };
}

export default async function DocPage({ params }: { params: Params }) {
  const { slug } = await params;
  const doc = getDocBySegments(slug);
  if (!doc) notFound();

  // Raw body drives the "On this page" TOC; the compiled module renders content.
  const raw = fs.readFileSync(doc.filePath, "utf8");
  const toc = getTableOfContents(matter(raw).content);
  const { prev, next } = getDocNeighbours(doc.slug);

  const { default: Content } = await import(`@/content/${doc.slug}.mdx`);

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-10">
      <article className="min-w-0">
        <Breadcrumbs
          trackLabel={TRACK_META[doc.frontmatter.track].label}
          title={doc.frontmatter.title}
        />
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {doc.frontmatter.title}
          </h1>
          {doc.frontmatter.summary ? (
            <p className="text-muted-foreground mt-2 text-lg">
              {doc.frontmatter.summary}
            </p>
          ) : null}
        </header>
        <div className="prose prose-zinc dark:prose-invert prose-code:before:content-none prose-code:after:content-none prose-pre:p-0 max-w-none">
          <Content />
        </div>
        <PrevNext prev={prev} next={next} />
      </article>
      <aside className="hidden xl:block">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <Toc entries={toc} />
        </div>
      </aside>
    </div>
  );
}
