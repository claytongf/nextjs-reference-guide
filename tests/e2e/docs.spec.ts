import { test, expect } from "@playwright/test";

test("docs index lists tracks and links to a lesson", async ({ page }) => {
  await page.goto("/docs");
  await expect(
    page.getByRole("heading", { name: "Documentation", level: 1 }),
  ).toBeVisible();

  await page.getByRole("link", { name: "What is React?" }).first().click();
  await expect(
    page.getByRole("heading", { name: "What is React?", level: 1 }),
  ).toBeVisible();
});

test("a lesson renders sidebar, on-this-page TOC, and prev/next", async ({
  page,
}) => {
  await page.goto("/docs/tracks/mid/server-and-client-components");

  await expect(
    page.getByRole("navigation", { name: "Docs navigation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "On this page" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Next/ }).last()).toBeVisible();
});
