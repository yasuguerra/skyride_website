import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  test("ES blog index loads", async ({ page }) => {
    const res = await page.goto("/es/blog");
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("EN blog index loads", async ({ page }) => {
    const res = await page.goto("/en/blog");
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});
