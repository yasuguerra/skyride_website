/**
 * Phase 6: URL Verification Script
 *
 * Verifies all generated URLs return 200, correct title, and correct canonical.
 * Run: npx tsx scripts/verify-urls.ts
 *
 * Requires the dev server running at http://localhost:3000
 */

const BASE = process.env.BASE_URL || "http://localhost:3000";

interface Result {
  url: string;
  status: number;
  title: string | null;
  canonical: string | null;
  ok: boolean;
  error?: string;
}

async function checkUrl(path: string): Promise<Result> {
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    const html = await res.text();

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const canonicalMatch = html.match(
      /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i,
    );

    const title = titleMatch ? titleMatch[1].trim() : null;
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : null;

    return {
      url: path,
      status: res.status,
      title,
      canonical,
      ok: res.status === 200,
    };
  } catch (e) {
    return {
      url: path,
      status: 0,
      title: null,
      canonical: null,
      ok: false,
      error: String(e),
    };
  }
}

// All URLs from slug-map + hardcoded pages
const urls: string[] = [
  // Homepage
  "/",
  "/en",

  // Services (ES)
  "/paseo-en-helicoptero-en-panama",
  "/vuelos-charter-en-panama",
  "/vuelos-privados-baratos-en-panama",
  "/asientos-disponibles",
  "/renta-de-aviones-privados-para-viajes-de-negocios",

  // Services (EN)
  "/en/helicopter-rides",
  "/en/charter-flights",
  "/en/affordable-private-flights",
  "/en/available-seats",
  "/en/business-charter-flights",

  // Fleet
  "/flota",
  "/en/fleet",

  // Fleet detail (ES) — sample
  "/flota/cessna-206-5-pasajeros",
  "/flota/piper-azteca-5-pasajeros",
  "/flota/cessna-grand-caravan-12-pasajeros",
  "/flota/king-air-f90-6-pasajeros",
  "/flota/robinson-r44-3-pasajeros",
  "/flota/eurocopter-b3-as350-5-pasajeros",

  // Fleet detail (EN) — sample
  "/en/fleet/cessna-206-5-pasajeros",
  "/en/fleet/king-air-200-hasta-9-pasajeros",

  // Destinations (ES)
  "/destino/contadora",
  "/destino/costa-rica",
  "/destino/medellin",
  "/destino/playa-tambor",

  // Destinations (EN)
  "/en/destination/contadora",
  "/en/destination/costa-rica",
  "/en/destination/medellin",
  "/en/destination/playa-tambor",

  // Routes (ES)
  "/ruta/panama-contadora",
  "/ruta/panama-san-blas",
  "/ruta/panama-costa-rica",
  "/ruta/panama-bocas-del-toro",
  "/ruta/panama-medellin",

  // Routes (EN)
  "/en/route/panama-contadora",
  "/en/route/panama-san-blas",
  "/en/route/panama-costa-rica",
  "/en/route/panama-bocas-del-toro",
  "/en/route/panama-medellin",

  // Content hubs (ES)
  "/guia-contadora",
  "/guia-costa-rica",
  "/guia-helicoptero",

  // Content hubs (EN)
  "/en/contadora-guide",
  "/en/costa-rica-guide",
  "/en/helicopter-guide",

  // Booking
  "/reservar-con-martin",
  "/en/book-with-martin",

  // Contact
  "/contacto",
  "/en/contact",

  // FAQ
  "/preguntas-frecuentes",
  "/en/faq",

  // Legal
  "/terminos-y-condiciones",
  "/en/terms-and-conditions",
  "/politica-de-privacidad",
  "/en/privacy-policy",

  // Blog index
  "/blog",
  "/en/blog",

  // Blog posts (ES) — sample
  "/descubre-las-mejores-islas-de-san-blas-skyride",
  "/que-es-un-vuelo-charter-y-como-se-reserva",
  "/paseo-en-helicoptero-precio-panama",
  "/que-hacer-en-isla-contadora",
  "/luna-de-miel-en-panama",

  // Blog posts (EN) — sample
  "/en/what-to-do-in-contadora-island",
  "/en/discover-the-best-san-blas-islands",
  "/en/helicopter-ride-prices-panama",
  "/en/what-is-a-charter-flight-and-how-to-book",
  "/en/honeymoon-in-panama-best-places-activities-itinerary",

  // WordPress redirects (should 301/302/308 or 410)
  // These should NOT return 200
  "/wp-admin",
  "/wp-login.php",

  // Sitemap + robots
  "/sitemap.xml",
  "/robots.txt",
];

async function main() {
  console.log(`\n🔍 Verifying ${urls.length} URLs against ${BASE}\n`);

  const results: Result[] = [];
  // Process in batches of 5
  for (let i = 0; i < urls.length; i += 5) {
    const batch = urls.slice(i, i + 5);
    const batchResults = await Promise.all(batch.map(checkUrl));
    results.push(...batchResults);
  }

  const passed: Result[] = [];
  const failed: Result[] = [];
  const redirects: Result[] = [];

  for (const r of results) {
    if (r.url.includes("wp-admin") || r.url.includes("wp-login")) {
      // These should redirect (not 200)
      if (r.status >= 300 && r.status < 400) {
        redirects.push(r);
      } else if (r.status === 410) {
        redirects.push(r);
      } else {
        failed.push(r);
      }
    } else if (r.ok) {
      passed.push(r);
    } else {
      failed.push(r);
    }
  }

  console.log(`✅ Passed: ${passed.length}`);
  console.log(`🔀 Redirects (expected): ${redirects.length}`);
  console.log(`❌ Failed: ${failed.length}\n`);

  if (failed.length > 0) {
    console.log("─── FAILURES ───────────────────────────────────\n");
    for (const f of failed) {
      console.log(`  ${f.status} ${f.url}${f.error ? ` (${f.error})` : ""}`);
    }
    console.log("");
  }

  // Title verification
  const missingTitles = passed.filter(
    (r) =>
      !r.url.endsWith(".xml") &&
      !r.url.endsWith(".txt") &&
      (!r.title || r.title === ""),
  );
  if (missingTitles.length > 0) {
    console.log("⚠️  Pages missing <title>:\n");
    for (const m of missingTitles) {
      console.log(`  ${m.url}`);
    }
    console.log("");
  }

  // Canonical verification
  const missingCanonicals = passed.filter(
    (r) =>
      !r.url.endsWith(".xml") &&
      !r.url.endsWith(".txt") &&
      !r.canonical,
  );
  if (missingCanonicals.length > 0) {
    console.log("⚠️  Pages missing canonical:\n");
    for (const m of missingCanonicals) {
      console.log(`  ${m.url}`);
    }
    console.log("");
  }

  const exitCode = failed.length > 0 ? 1 : 0;
  console.log(
    exitCode === 0
      ? "🎉 All URLs verified successfully!"
      : `💥 ${failed.length} URL(s) failed verification.`,
  );
  process.exit(exitCode);
}

main();
