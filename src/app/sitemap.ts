import type { MetadataRoute } from "next";

import { slugMap } from "@/data/slug-map";

const BASE = "https://www.skyride.city";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Homepages
  entries.push({
    url: BASE,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: { es: BASE, en: `${BASE}/en`, "x-default": BASE },
    },
  });

  entries.push({
    url: `${BASE}/en`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
    alternates: {
      languages: { es: BASE, en: `${BASE}/en`, "x-default": BASE },
    },
  });

  // All slug-mapped pages
  for (const page of slugMap) {
    const esUrl = `${BASE}/${page.es}`;
    const enUrl = `${BASE}/en/${page.en}`;

    const priority =
      page.type === "service" ? 0.9 :
      page.type === "route" ? 0.85 :
      page.type === "fleet-index" ? 0.8 :
      page.type === "fleet-detail" ? 0.7 :
      page.type === "destination" ? 0.8 :
      page.type === "charter-prices" ? 0.85 :
      page.type === "reviews" ? 0.7 :
      page.type === "blog-post" ? 0.6 :
      page.type === "legal" ? 0.3 :
      0.5;

    const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
      page.type === "blog-post" ? "monthly" :
      page.type === "legal" ? "yearly" :
      "weekly";

    const lastModified =
      page.type === "legal" ? new Date("2025-01-01") :
      page.type === "fleet-detail" ? new Date("2026-01-01") :
      page.type === "blog-post" ? new Date("2025-12-01") :
      page.type === "blog-index" ? now :
      new Date("2026-03-01");

    const xDefault = page.enOnly ? enUrl : esUrl;

    // ES URL — skip for EN-only entries
    if (!page.enOnly) {
      entries.push({
        url: esUrl,
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: { es: esUrl, en: enUrl, "x-default": xDefault },
        },
      });
    }

    // EN URL — skip for ES-only entries
    if (!page.esOnly) {
      entries.push({
        url: enUrl,
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: { es: esUrl, en: enUrl, "x-default": xDefault },
        },
      });
    }
  }

  return entries;
}
