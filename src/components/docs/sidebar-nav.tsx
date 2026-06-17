"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavSection } from "@/lib/content/loader";
import { cn } from "@/lib/utils";

export function SidebarNav({ sections }: { sections: NavSection[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs navigation" className="space-y-6 text-sm">
      {sections.map((section) => (
        <div key={section.track}>
          <p className="mb-2 font-semibold tracking-tight">{section.label}</p>
          <ul className="border-border space-y-1 border-l">
            {section.items.map((item) => {
              const href = `/docs/${item.slug}`;
              const active = pathname === href;
              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-muted-foreground hover:text-foreground -ml-px block border-l border-transparent py-1 pl-3 transition-colors",
                      active && "border-primary text-foreground font-medium",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
