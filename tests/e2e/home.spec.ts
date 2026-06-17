import { test, expect } from "@playwright/test";

test("home page renders hero and primary navigation", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /interactive React & Next\.js reference/i,
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Start learning" }),
  ).toBeVisible();
});
