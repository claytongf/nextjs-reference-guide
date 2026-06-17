import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DocLink {
  title: string;
  slug: string;
}

export function PrevNext({ prev, next }: { prev?: DocLink; next?: DocLink }) {
  if (!prev && !next) return null;

  return (
    <nav className="border-border mt-12 grid gap-4 border-t pt-6 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group border-border hover:bg-muted flex flex-col rounded-lg border p-4 transition-colors"
        >
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            <ArrowLeft className="h-3 w-3" /> Previous
          </span>
          <span className="mt-1 font-medium">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group border-border hover:bg-muted flex flex-col rounded-lg border p-4 text-right transition-colors sm:items-end"
        >
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            Next <ArrowRight className="h-3 w-3" />
          </span>
          <span className="mt-1 font-medium">{next.title}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
