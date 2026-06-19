import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Accessibility smoke tests. Each representative page type is scanned with axe
 * against the WCAG 2.1 A/AA rule set; the test fails if any violations are found.
 */
const pages: Array<{ name: string; path: string }> = [
  { name: "home", path: "/" },
  { name: "docs index", path: "/docs" },
  { name: "lesson", path: "/docs/tracks/mid/server-and-client-components" },
  { name: "tracks", path: "/tracks" },
  { name: "quizzes index", path: "/quizzes" },
  { name: "quiz", path: "/quizzes/react-fundamentals" },
];

for (const { name, path } of pages) {
  test(`${name} page has no detectable a11y violations`, async ({ page }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
