import { test, expect } from "@playwright/test";

test.describe("Mobile responsive", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("ES homepage is usable on mobile", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("h1")).toBeVisible();
    // WhatsApp CTA should be visible on mobile
    const whatsapp = page.locator('a[href*="wa.me"], a[href*="whatsapp"]');
    await expect(whatsapp.first()).toBeVisible();
  });
});

test.describe("SEO basics", () => {
  test("ES homepage has meta description", async ({ page }) => {
    await page.goto("/es");
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute("content", /.+/);
  });

  test("robots.txt is accessible", async ({ page }) => {
    const res = await page.goto("/robots.txt");
    expect(res?.status()).toBe(200);
    const text = await res?.text();
    expect(text).toContain("Sitemap");
  });

  test("sitemap.xml is accessible", async ({ page }) => {
    const res = await page.goto("/sitemap.xml");
    expect(res?.status()).toBe(200);
  });

  test("404 page returns proper status", async ({ page }) => {
    const res = await page.goto("/es/this-page-does-not-exist-12345");
    expect(res?.status()).toBe(404);
  });
});
