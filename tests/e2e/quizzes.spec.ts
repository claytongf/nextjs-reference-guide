import { test, expect } from "@playwright/test";

/** Walk a quiz to completion by always picking the first option. */
async function completeQuiz(page: import("@playwright/test").Page) {
  const counter = page.getByText(/Question 1 of \d+/);
  await expect(counter).toBeVisible();
  const total = Number((await counter.textContent())!.match(/of (\d+)/)![1]);

  for (let i = 0; i < total; i++) {
    await page.locator("fieldset button").first().click();
    await page.getByRole("button", { name: "Check answer" }).click();
    if (i < total - 1) {
      await page.getByRole("button", { name: "Next question" }).click();
    } else {
      await page.getByRole("button", { name: "See results" }).click();
    }
  }
  return total;
}

test("quizzes index groups quizzes by track and links into one", async ({
  page,
}) => {
  await page.goto("/quizzes");

  await expect(
    page.getByRole("heading", { name: "Quizzes", level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Junior", level: 2 }),
  ).toBeVisible();

  await page.getByRole("link", { name: /React Fundamentals/ }).click();
  await expect(
    page.getByRole("heading", { name: "React Fundamentals", level: 1 }),
  ).toBeVisible();
  await expect(page.getByText(/Question 1 of/)).toBeVisible();
});

test("checking a correct answer reveals feedback and the explanation", async ({
  page,
}) => {
  await page.goto("/quizzes/react-fundamentals");

  const check = page.getByRole("button", { name: "Check answer" });
  await expect(check).toBeDisabled();

  await page
    .getByRole("button", { name: /Plain JavaScript function calls/ })
    .click();
  await expect(check).toBeEnabled();
  await check.click();

  await expect(page.getByText(/Correct\./).first()).toBeVisible();
  await expect(page.getByText(/JSX is syntax sugar/)).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Next question" }),
  ).toBeVisible();
});

test("checking a wrong answer reveals the correction", async ({ page }) => {
  await page.goto("/quizzes/react-fundamentals");

  // The first option is the distractor for question 1.
  await page.locator("fieldset button").first().click();
  await page.getByRole("button", { name: "Check answer" }).click();

  await expect(page.getByText(/Not quite\./).first()).toBeVisible();
});

test("completing a quiz shows a score and supports retry", async ({ page }) => {
  await page.goto("/quizzes/testing-essentials");

  const total = await completeQuiz(page);

  await expect(page.getByText("Your score")).toBeVisible();
  await expect(page.getByText(new RegExp(`/\\s*${total}`))).toBeVisible();

  await page.getByRole("button", { name: /Try again/ }).click();
  await expect(page.getByText(/Question 1 of/)).toBeVisible();
});

test("quiz progress persists and appears on the index", async ({ page }) => {
  await page.goto("/quizzes/web-security");
  await completeQuiz(page);

  await page.getByRole("link", { name: "All quizzes" }).click();
  await expect(
    page.getByRole("heading", { name: "Quizzes", level: 1 }),
  ).toBeVisible();

  const card = page.getByRole("link", { name: /Web Security/ });
  await expect(card.getByText(/Best \d+\/\d+/)).toBeVisible();
});

test("an unknown quiz slug returns a 404", async ({ page }) => {
  const response = await page.goto("/quizzes/does-not-exist");
  expect(response?.status()).toBe(404);
});
