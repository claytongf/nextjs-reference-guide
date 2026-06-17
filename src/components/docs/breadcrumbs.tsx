import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Renders Docs › Track › Title from the doc's track label and title. */
export function Breadcrumbs({
  trackLabel,
  title,
}: {
  trackLabel: string;
  title: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-muted-foreground mb-4 flex items-center gap-1 text-sm"
    >
      <Link href="/docs" className="hover:text-foreground">
        Docs
      </Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <span>{trackLabel}</span>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="text-foreground">{title}</span>
    </nav>
  );
}
