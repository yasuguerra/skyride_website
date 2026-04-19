import { test, expect } from "@playwright/test";

test.describe("Fleet page", () => {
  test("ES fleet index loads", async ({ page }) => {
    const res = await page.goto("/es/nuestra-flota");
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("EN fleet index loads", async ({ page }) => {
    const res = await page.goto("/en/our-fleet");
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});

test.describe("Booking page", () => {
  test("ES booking page loads", async ({ page }) => {
    const res = await page.goto("/es/reservar-con-martin");
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("EN booking page loads", async ({ page }) => {
    const res = await page.goto("/en/book-with-martin");
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});
