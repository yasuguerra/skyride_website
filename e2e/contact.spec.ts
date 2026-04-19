import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test("ES contact page shows form fields", async ({ page }) => {
    await page.goto("/es/contacto");
    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator('input[name="name"]').first()).toBeVisible();
    await expect(page.locator('input[name="email"]').first()).toBeVisible();
    await expect(page.locator('textarea[name="message"]').first()).toBeVisible();
  });

  test("EN contact page shows form fields", async ({ page }) => {
    await page.goto("/en/contact");
    await expect(page.locator("form")).toBeVisible();
  });

  test("form requires name and email", async ({ page }) => {
    await page.goto("/es/contacto");
    const submitBtn = page.locator('button[type="submit"]');
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      // Page should stay on contact (form not submitted)
      await expect(page).toHaveURL(/contacto/);
    }
  });
});
