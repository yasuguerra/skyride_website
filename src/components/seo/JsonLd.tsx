import Script from "next/script";

export type JsonLdData = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((item, i) => (
        <Script
          key={i}
          id={`ld-${(item["@type"] as string) ?? "schema"}-${i}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

const BASE_URL = "https://skyride.city";

export function organizationSchema(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#organization`,
    name: "Sky Ride Panama",
    alternateName: "Sky Ride Panamá",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logos/logo-skyride.png`,
    image: `${BASE_URL}/images/hero/skyride-vuelos-privados-panama.webp`,
    description:
      "Premium private aviation in Panama — charter flights, helicopter tours, and exclusive routes to Contadora, San Blas, Costa Rica and beyond.",
    telephone: "+507-6840-0045",
    email: "info@skyride.city",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Panama City",
      addressCountry: "PA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 8.9824,
      longitude: -79.5199,
    },
    sameAs: [
      "https://www.facebook.com/skyridepa/",
      "https://www.instagram.com/skyridepa/",
      "https://www.tiktok.com/@skyridepa",
      "https://www.youtube.com/@skyride9486",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "06:00",
      closes: "20:00",
    },
  };
}

export function websiteSchema(locale: "es" | "en"): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: locale === "en" ? `${BASE_URL}/en` : BASE_URL,
    name: "Sky Ride Panama",
    inLanguage: locale === "en" ? "en-US" : "es-PA",
    publisher: { "@id": `${BASE_URL}/#organization` },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(
  items: { question: string; answer: string }[],
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceSchema(params: {
  name: string;
  description: string;
  url: string;
  image?: string;
  priceFrom?: number;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    url: params.url.startsWith("http") ? params.url : `${BASE_URL}${params.url}`,
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Panama" },
    ...(params.image && { image: params.image }),
    ...(params.priceFrom && {
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: params.priceFrom,
        availability: "https://schema.org/InStock",
      },
    }),
  };
}

export function productSchema(params: {
  name: string;
  description: string;
  image: string;
  url: string;
  priceFrom?: number;
  passengers: number;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: params.name,
    description: params.description,
    image: params.image.startsWith("http")
      ? params.image
      : `${BASE_URL}${params.image}`,
    url: params.url.startsWith("http") ? params.url : `${BASE_URL}${params.url}`,
    brand: { "@type": "Brand", name: "Sky Ride Panama" },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Passengers",
        value: params.passengers,
      },
    ],
    ...(params.priceFrom && {
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: params.priceFrom,
        availability: "https://schema.org/InStock",
        url: params.url.startsWith("http")
          ? params.url
          : `${BASE_URL}${params.url}`,
      },
    }),
  };
}

export function tripSchema(params: {
  origin: string;
  destination: string;
  description: string;
  url: string;
  priceFrom: number;
  image: string;
  duration: string;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `${params.origin} → ${params.destination}`,
    description: params.description,
    url: params.url.startsWith("http") ? params.url : `${BASE_URL}${params.url}`,
    image: params.image.startsWith("http")
      ? params.image
      : `${BASE_URL}${params.image}`,
    provider: { "@id": `${BASE_URL}/#organization` },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: params.priceFrom,
      availability: "https://schema.org/InStock",
    },
    itinerary: {
      "@type": "ItemList",
      itemListElement: [
        { "@type": "Place", name: params.origin },
        { "@type": "Place", name: params.destination },
      ],
    },
  };
}
