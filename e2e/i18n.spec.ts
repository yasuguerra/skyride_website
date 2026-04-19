import { test, expect } from "@playwright/test";

test.describe("i18n — locale switching", () => {
  test("ES homepage has language switcher to EN", async ({ page }) => {
    await page.goto("/es");
    const switcher = page.locator('a:has-text("English"), a:has-text("english"), a[href="/en"]');
    await expect(switcher.first()).toBeVisible();
  });

  test("EN homepage has language switcher to ES", async ({ page }) => {
    await page.goto("/en");
    const switcher = page.locator('a:has-text("Espanol"), a:has-text("español"), a[href="/"]');
    await expect(switcher.first()).toBeVisible();
  });

  test("clicking EN switcher navigates to /en", async ({ page }) => {
    await page.goto("/es");
    const switcher = page.locator('a:has-text("English"), a[href="/en"]');
    await switcher.first().click();
    await expect(page).toHaveURL(/\/en/);
  });
});
