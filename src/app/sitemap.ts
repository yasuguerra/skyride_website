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
      languages: { es: BASE, en: `${BASE}/en` },
    },
  });

  entries.push({
    url: `${BASE}/en`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: { es: BASE, en: `${BASE}/en` },
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
      page.type === "blog-post" ? 0.6 :
      page.type === "legal" ? 0.3 :
      0.5;

    const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
      page.type === "blog-post" ? "monthly" :
      page.type === "legal" ? "yearly" :
      "weekly";

    entries.push({
      url: esUrl,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: { es: esUrl, en: enUrl },
      },
    });

    entries.push({
      url: enUrl,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: { es: esUrl, en: enUrl },
      },
    });
  }

  return entries;
}
