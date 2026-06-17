import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm sm:flex-row sm:px-6">
        <p>{siteConfig.name} — open-source React &amp; Next.js reference.</p>
        <nav className="flex items-center gap-4">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
