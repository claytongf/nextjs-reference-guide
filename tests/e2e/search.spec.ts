import { test, expect } from "@playwright/test";

test("⌘K palette searches and navigates to a lesson", async ({ page }) => {
  await page.goto("/");

  // Open via keyboard shortcut.
  await page.keyboard.press("ControlOrMeta+k");
  const input = page.getByPlaceholder("Search the docs…");
  await expect(input).toBeVisible();

  await input.fill("caching");
  const result = page.getByRole("option", { name: /Caching with/i }).first();
  await expect(result).toBeVisible();

  await result.click();
  await expect(page).toHaveURL(/\/docs\/tracks\/senior\/caching-in-next-16$/);
  await expect(
    page.getByRole("heading", { level: 1, name: /Caching with/i }),
  ).toBeVisible();
});

test("search button opens the palette", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search docs" }).click();
  await expect(page.getByPlaceholder("Search the docs…")).toBeVisible();
});
