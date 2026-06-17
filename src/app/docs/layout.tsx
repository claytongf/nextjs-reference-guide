import type { ReactNode } from "react";
import { getNavigation } from "@/lib/content/loader";
import { SidebarNav } from "@/components/docs/sidebar-nav";

export default function DocsLayout({ children }: { children: ReactNode }) {
  const sections = getNavigation();

  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-4 sm:px-6">
      <aside className="hidden w-56 shrink-0 py-10 md:block">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
          <SidebarNav sections={sections} />
        </div>
      </aside>
      <div className="min-w-0 flex-1 py-10">{children}</div>
    </div>
  );
}
