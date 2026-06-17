"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  // The visible icon is driven entirely by the `.dark` class via CSS, so there
  // is no hydration mismatch and no need for a mounted flag.
  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggle}
    >
      <Moon className="h-5 w-5 dark:hidden" />
      <Sun className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
