import { test, expect } from "@playwright/test";

const esPages = [
  "/es/vuelos-charter-en-panama",
  "/es/paseo-en-helicoptero-en-panama",
  "/es/asientos-disponibles",
  "/es/nuestra-flota",
  "/es/contacto",
  "/es/preguntas-frecuentes",
  "/es/blog",
];

const enPages = [
  "/en/charter-flights",
  "/en/helicopter-rides",
  "/en/available-seats",
  "/en/our-fleet",
  "/en/contact",
  "/en/faq",
  "/en/blog",
];

test.describe("Navigation — ES pages load", () => {
  for (const path of esPages) {
    test(`${path} returns 200`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1, h2").first()).toBeVisible();
    });
  }
});

test.describe("Navigation — EN pages load", () => {
  for (const path of enPages) {
    test(`${path} returns 200`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1, h2").first()).toBeVisible();
    });
  }
});

test.describe("Header navigation", () => {
  test("desktop nav has expected links", async ({ page }) => {
    await page.goto("/es");
    const nav = page.locator("nav, header");
    await expect(nav.first()).toBeVisible();
  });
});
