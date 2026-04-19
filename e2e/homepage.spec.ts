import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("ES homepage loads and shows hero content", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('img[alt="Sky Ride Panama"]').first()).toBeVisible();
  });

  test("EN homepage loads and shows hero content", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("h1")).toBeVisible();
  });
});
