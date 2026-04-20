/**
 * Complete URL slug mapping for Sky Ride Panama.
 * Maps every URL slug to a page type and its translation pair.
 *
 * ES pages have no locale prefix.
 * EN pages use /en/ prefix.
 */

import type { Locale } from "@/i18n/routing";

export type PageType =
  | "home"
  | "service"
  | "fleet-index"
  | "fleet-detail"
  | "destination"
  | "route"
  | "content-hub"
  | "blog-index"
  | "blog-post"
  | "booking"
  | "legal"
  | "contact"
  | "faq";

export interface SlugEntry {
  /** Internal page identifier */
  pageId: string;
  /** Page type for template resolution */
  type: PageType;
  /** ES slug (no leading slash, no locale prefix) */
  es: string;
  /** EN slug (no leading slash, no /en/ prefix) */
  en: string;
}

/**
 * Master slug map — every page in the site.
 * For fleet-detail, the slug is under /producto/ (ES) and /en/product/ (EN).
 * For route pages, the slug is under /ruta/ (ES) and /en/route/ (EN).
 */
export const slugMap: SlugEntry[] = [
  // ─── Homepage ────────────────────────────────────
  // Handled by [locale]/page.tsx, not the catch-all

  // ─── Service Pages ───────────────────────────────
  {
    pageId: "helicopter",
    type: "service",
    es: "paseo-en-helicoptero-en-panama",
    en: "helicopter-rides",
  },
  {
    pageId: "charter",
    type: "service",
    es: "vuelos-charter-en-panama",
    en: "charter-flights",
  },
  {
    pageId: "affordable-flights",
    type: "service",
    es: "vuelos-privados-baratos",
    en: "affordable-flights",
  },
  {
    pageId: "available-seats",
    type: "service",
    es: "asientos-disponibles",
    en: "available-seats",
  },
  {
    pageId: "business-flights",
    type: "service",
    es: "renta-de-aviones-privados-para-viajes-de-negocios",
    en: "charter-flights-panama-personalized-experience",
  },

  // ─── Fleet ───────────────────────────────────────
  {
    pageId: "fleet-index",
    type: "fleet-index",
    es: "nuestra-flota",
    en: "our-fleet",
  },

  // ─── Destination Pages ───────────────────────────
  {
    pageId: "dest-contadora",
    type: "destination",
    es: "vuelo-privado-a-contadora",
    en: "private-flight-to-contadora",
  },
  {
    pageId: "dest-costa-rica",
    type: "destination",
    es: "vuelo-privado-costa-rica",
    en: "private-flight-costa-rica",
  },
  {
    pageId: "dest-medellin",
    type: "destination",
    es: "vuelos-privados-a-medellin",
    en: "private-flights-to-medellin",
  },
  {
    pageId: "dest-playa-tambor",
    type: "destination",
    es: "vuelos-a-playa-tambor",
    en: "flights-to-playa-tambor",
  },

  // ─── Route Pages ─────────────────────────────────
  // URL pattern: /ruta/{slug} (ES), /en/route/{slug} (EN)
  {
    pageId: "route-panama-contadora",
    type: "route",
    es: "ruta/panama-contadora",
    en: "route/panama-contadora",
  },
  {
    pageId: "route-panama-san-blas",
    type: "route",
    es: "ruta/panama-san-blas",
    en: "route/panama-san-blas",
  },
  {
    pageId: "route-panama-costa-rica",
    type: "route",
    es: "ruta/panama-costa-rica",
    en: "route/panama-costa-rica",
  },
  {
    pageId: "route-panama-bocas-del-toro",
    type: "route",
    es: "ruta/panama-bocas-del-toro",
    en: "route/panama-bocas-del-toro",
  },
  {
    pageId: "route-panama-medellin",
    type: "route",
    es: "ruta/panama-medellin",
    en: "route/panama-medellin",
  },
  {
    pageId: "route-panama-miami",
    type: "route",
    es: "ruta/panama-miami",
    en: "route/panama-miami",
  },
  {
    pageId: "route-panama-dominican-republic",
    type: "route",
    es: "ruta/panama-dominican-republic",
    en: "route/panama-dominican-republic",
  },

  // ─── Content Hubs ────────────────────────────────
  {
    pageId: "hub-contadora",
    type: "content-hub",
    es: "guia-contadora",
    en: "contadora-guide",
  },
  {
    pageId: "hub-costa-rica",
    type: "content-hub",
    es: "guia-costa-rica",
    en: "costa-rica-guide",
  },
  {
    pageId: "hub-helicopters",
    type: "content-hub",
    es: "guia-helicopteros",
    en: "helicopter-guide",
  },

  // ─── Booking ─────────────────────────────────────
  {
    pageId: "booking-martin",
    type: "booking",
    es: "reservar-con-martin",
    en: "book-with-martin",
  },

  // ─── Blog ────────────────────────────────────────
  {
    pageId: "blog-index",
    type: "blog-index",
    es: "blog",
    en: "blog",
  },

  // ─── Legal / Info ────────────────────────────────
  {
    pageId: "contact",
    type: "contact",
    es: "contacto",
    en: "contact",
  },
  {
    pageId: "faq",
    type: "faq",
    es: "preguntas-frecuentes",
    en: "faq",
  },
  {
    pageId: "terms",
    type: "legal",
    es: "terminos-y-condiciones",
    en: "terms-and-conditions",
  },
  {
    pageId: "privacy",
    type: "legal",
    es: "politica-de-privacidad",
    en: "privacy-policy",
  },
];

// ─── Blog Posts (ES) ──────────────────────────────
const esBlogSlugs = [
  "descubre-las-mejores-islas-de-san-blas-skyride",
  "descubre-el-confort-vuelo-privado-panama-costa-rica",
  "playa-larga-contadora",
  "playa-cacique-contadora",
  "ferry-a-contadora",
  "transporte-a-contadora",
  "que-hacer-en-isla-contadora",
  "experimenta-un-tour-de-helicoptero-inolvidable-sobreciudad-de-panama",
  "vuelos-privados-y-charter-tu-solucion-para-viajes-exclusivos-en-panama",
  "vuela-de-panama-a-bocas-del-toro-la-mejor-forma-de-llegar-al-paraiso",
  "luna-de-miel-en-panama",
  "paseo-en-helicoptero-precio-panama",
  "reservar-vuelo-sin-pagar-demasiado",
  "helicoptero-privado-lo-que-debes-saber-sky-ride",
  "que-es-un-vuelo-charter-y-como-se-reserva",
  "que-ver-y-hacer-en-playa-tambor-costa-rica",
  "apps-para-encontrar-viajes-en-avion-privado",
  "hipertensos-pueden-viajar-en-avion",
  "tips-para-viajar-en-avion-guia-completa",
  "mejores-lugares-turisticos-de-costa-rica",
  "que-ver-en-san-jose-capital-de-costa-rica",
  "luna-de-miel-en-costa-rica",
  "como-elegir-asientos-de-avion-privado",
];

// ─── Blog Posts (EN) ──────────────────────────────
const enBlogSlugs = [
  "cacique-beach-in-contadora-a-true-paradise",
  "whats-to-see-and-do-in-playa-tambor-costa-rica",
  "what-to-see-in-san-jose-capital-of-costa-rica",
  "the-best-tourist-places-in-costa-rica",
  "what-to-do-in-contadora-island",
  "ferry-to-contadora-is-it-really-convenient",
  "honeymoon-in-panama-best-places-activities-itinerary",
  "honeymoon-in-costa-rica",
  "long-beach-on-contadora-island-choose-your-next-destination",
  "transportation-to-contadora-island-best-options",
  "discover-the-best-san-blas-islands",
  "what-is-a-charter-flight-and-how-to-book",
  "helicopter-ride-prices-panama",
  "unforgettable-helicopter-tour-over-panama-city",
  "private-helicopter-what-you-need-to-know",
  "private-flight-panama-costa-rica-comfort",
  "fly-panama-to-bocas-del-toro",
  "private-and-charter-flights-panama",
  "book-a-flight-without-overpaying",
  "apps-for-private-airplane-flights",
  "tips-for-flying-complete-guide",
  "can-hypertensive-people-fly",
  "how-to-choose-private-airplane-seats",
];

// Blog translation pairs (ES index → EN slug, null if no translation)
const blogTranslationMap: Record<string, string | null> = {
  "playa-cacique-contadora": "cacique-beach-in-contadora-a-true-paradise",
  "que-ver-y-hacer-en-playa-tambor-costa-rica":
    "whats-to-see-and-do-in-playa-tambor-costa-rica",
  "que-ver-en-san-jose-capital-de-costa-rica":
    "what-to-see-in-san-jose-capital-of-costa-rica",
  "mejores-lugares-turisticos-de-costa-rica":
    "the-best-tourist-places-in-costa-rica",
  "que-hacer-en-isla-contadora": "what-to-do-in-contadora-island",
  "ferry-a-contadora": "ferry-to-contadora-is-it-really-convenient",
  "luna-de-miel-en-panama":
    "honeymoon-in-panama-best-places-activities-itinerary",
  "luna-de-miel-en-costa-rica": "honeymoon-in-costa-rica",
  "playa-larga-contadora":
    "long-beach-on-contadora-island-choose-your-next-destination",
  "transporte-a-contadora":
    "transportation-to-contadora-island-best-options",
  "descubre-las-mejores-islas-de-san-blas-skyride":
    "discover-the-best-san-blas-islands",
  "que-es-un-vuelo-charter-y-como-se-reserva":
    "what-is-a-charter-flight-and-how-to-book",
  "paseo-en-helicoptero-precio-panama":
    "helicopter-ride-prices-panama",
  "experimenta-un-tour-de-helicoptero-inolvidable-sobreciudad-de-panama":
    "unforgettable-helicopter-tour-over-panama-city",
  "helicoptero-privado-lo-que-debes-saber-sky-ride":
    "private-helicopter-what-you-need-to-know",
  "descubre-el-confort-vuelo-privado-panama-costa-rica":
    "private-flight-panama-costa-rica-comfort",
  "vuela-de-panama-a-bocas-del-toro-la-mejor-forma-de-llegar-al-paraiso":
    "fly-panama-to-bocas-del-toro",
  "vuelos-privados-y-charter-tu-solucion-para-viajes-exclusivos-en-panama":
    "private-and-charter-flights-panama",
  "reservar-vuelo-sin-pagar-demasiado":
    "book-a-flight-without-overpaying",
  "apps-para-encontrar-viajes-en-avion-privado":
    "apps-for-private-airplane-flights",
  "tips-para-viajar-en-avion-guia-completa":
    "tips-for-flying-complete-guide",
  "hipertensos-pueden-viajar-en-avion":
    "can-hypertensive-people-fly",
  "como-elegir-asientos-de-avion-privado":
    "how-to-choose-private-airplane-seats",
};

// Add blog posts to slug map
for (const esSlug of esBlogSlugs) {
  const enSlug = blogTranslationMap[esSlug] ?? null;
  slugMap.push({
    pageId: `blog-${esSlug}`,
    type: "blog-post",
    es: esSlug,
    en: enSlug ?? esSlug, // fallback to ES slug if no EN translation
  });
}

// EN-only blog posts (no ES pair)
const enOnlySlugs = enBlogSlugs.filter(
  (slug) => !Object.values(blogTranslationMap).includes(slug),
);
for (const enSlug of enOnlySlugs) {
  slugMap.push({
    pageId: `blog-en-${enSlug}`,
    type: "blog-post",
    es: enSlug, // fallback
    en: enSlug,
  });
}

// ─── Fleet Detail Pages ────────────────────────────
export const fleetSlugs = [
  "cessna-206-5-pasajeros",
  "piper-azteca-5-pasajeros",
  "piper-saratoga-5-pasajeros",
  "daher-kodiak-hasta-9-pasajeros",
  "cessna-grand-caravan-12-pasajeros",
  "piper-cherokee-3-pasajeros",
  "cessna-172-hasta-3-pasajeros",
  "king-air-f90-6-pasajeros",
  "king-air-200-hasta-9-pasajeros",
  "robinson-r44-3-pasajeros",
  "robinson-r66-4-pasajeros",
  "eurocopter-b3-as350-5-pasajeros",
  "eurocopter-b4-ec130-6-pasajeros",
];

for (const slug of fleetSlugs) {
  slugMap.push({
    pageId: `fleet-${slug}`,
    type: "fleet-detail",
    es: `producto/${slug}`,
    en: `product/${slug}`,
  });
}

// ─── Lookup Helpers ────────────────────────────────

/** Find a slug entry by its URL slug and locale */
export function findPageBySlug(
  slug: string,
  locale: Locale,
): SlugEntry | undefined {
  return slugMap.find((entry) => entry[locale] === slug);
}

/** Get the alternate locale URL for a page */
export function getAlternateSlug(
  pageId: string,
  targetLocale: Locale,
): string | undefined {
  const entry = slugMap.find((e) => e.pageId === pageId);
  if (!entry) return undefined;
  return entry[targetLocale];
}

/** Get all slugs for a given locale (for generateStaticParams) */
export function getAllSlugsForLocale(locale: Locale): string[] {
  return slugMap.map((entry) => entry[locale]);
}

/** Get all entries of a specific page type */
export function getEntriesByType(type: PageType): SlugEntry[] {
  return slugMap.filter((entry) => entry.type === type);
}

/** WordPress redirect map */
export const wpRedirects: Record<string, string | null> = {
  // 301 redirects
  "wp-content": "/",
  tienda: "/nuestra-flota/",
  shop: "/en/our-fleet/",
  "categoria-producto": "/nuestra-flota/",
  "paseo-en-helicoptero": "/paseo-en-helicoptero-en-panama/",
  // 410 Gone (null = return 410)
  "wp-admin": null,
  "wp-login.php": null,
  "wp-includes": null,
  "wp-json": null,
  cart: null,
  checkout: null,
  "my-account": null,
};
