import Link from "next/link";
import { GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span
              className="bg-primary inline-block h-5 w-5 rounded"
              aria-hidden
            />
            <span>{siteConfig.name}</span>
          </Link>
          <nav className="hidden items-center gap-4 text-sm md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1">
          {/* ⌘K search palette is wired up in Phase 2. */}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
