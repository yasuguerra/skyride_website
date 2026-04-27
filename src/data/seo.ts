import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

const SITE_URL = "https://www.skyride.city";

/** Build full metadata (alternates + OG + twitter) from explicit values */
function buildFullMetadata(
  locale: Locale,
  title: string,
  description: string,
  esPath: string,
  enPath: string,
  opts?: { ogImage?: string; ogType?: "website" | "article" },
): Metadata {
  const canonical = `${SITE_URL}${locale === "en" ? enPath : esPath}`;
  const ogImage = opts?.ogImage ?? `${SITE_URL}/images/hero/canal-panama.webp`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}${esPath}`,
        en: `${SITE_URL}${enPath}`,
        "x-default": `${SITE_URL}${esPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Sky Ride Panama",
      locale: locale === "es" ? "es_PA" : "en_US",
      type: opts?.ogType ?? "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

interface PageSeo {
  title: { es: string; en: string };
  description: { es: string; en: string };
  focusKeyword?: { es: string; en: string };
  ogType?: "website" | "article";
}

const seoData: Record<string, PageSeo> = {
  home: {
    title: {
      es: "Reserva Tu Vuelo Chárter Privado en Panamá | Sky Ride",
      en: "Book Your Private Charter Flight in Panama | Sky Ride",
    },
    description: {
      es: "Vuelos chárter privados, paseos en helicóptero y asientos disponibles en Panamá. Cotización inmediata por WhatsApp. +500 vuelos completados.",
      en: "Private charter flights, helicopter tours, and available seats in Panama. Instant quotes via WhatsApp. 500+ flights completed.",
    },
    focusKeyword: { es: "vuelo chárter privado panamá", en: "private charter flight panama" },
  },
  helicopter: {
    title: {
      es: "Paseo en Helicóptero en Panamá | Desde $588 por aeronave | Sky Ride",
      en: "Helicopter Rides in Panama | From $588 per aircraft | Sky Ride",
    },
    description: {
      es: "Experimenta un inolvidable paseo en helicóptero sobre la Ciudad de Panamá. Vuelos desde $588 por aeronave (hasta 3 pax). Reserva por WhatsApp en minutos.",
      en: "Experience an unforgettable helicopter ride over Panama City. Flights from $588 per aircraft (up to 3 pax). Book via WhatsApp in minutes.",
    },
    focusKeyword: { es: "paseo en helicóptero panamá", en: "helicopter ride panama" },
  },
  charter: {
    title: {
      es: "Vuelos Chárter en Panamá | Vuelos Privados | Sky Ride",
      en: "Charter Flights in Panama | Private Flights | Sky Ride",
    },
    description: {
      es: "Vuelos chárter privados y compartidos en Panamá. Rutas a Contadora, San Blas, Costa Rica y más. Cotización inmediata.",
      en: "Private and shared charter flights in Panama. Routes to Contadora, San Blas, Costa Rica, and more. Instant quotes.",
    },
    focusKeyword: { es: "vuelos charter en panamá", en: "charter flights panama" },
  },
  "charter-prices": {
    title: {
      es: "Precios Vuelos Chárter Panamá 2025 — Tabla de Tarifas | Sky Ride",
      en: "Charter Flight Prices Panama 2025 — Rate Table | Sky Ride",
    },
    description: {
      es: "Consulta los precios de vuelos chárter desde Panamá: Contadora desde $398, San Blas desde $644, Bocas del Toro desde $1,605. Tabla completa por aeronave.",
      en: "View charter flight prices from Panama: Contadora from $398, San Blas from $644, Bocas del Toro from $1,605. Full table by aircraft.",
    },
    focusKeyword: { es: "precios vuelos charter panama", en: "charter flight prices panama" },
  },
  "private-jet": {
    title: {
      es: "Jet Privado en Panamá — Aviones Ejecutivos | Sky Ride",
      en: "Private Jet Charter Panama — Executive Flights | Sky Ride",
    },
    description: {
      es: "Alquila un jet privado en Panamá desde $1,798. King Air 200 y F90 con cabina presurizada para vuelos ejecutivos a Costa Rica, Medellín y Miami.",
      en: "Charter a private jet in Panama from $1,798. King Air 200 & F90 with pressurized cabin for executive flights to Costa Rica, Medellín, and Miami.",
    },
    focusKeyword: { es: "jet privado panama", en: "private jet charter panama" },
  },
  "reviews": {
    title: {
      es: "Reseñas y Opiniones — Sky Ride Panama | 4.9 ★",
      en: "Reviews & Testimonials — Sky Ride Panama | 4.9 ★",
    },
    description: {
      es: "Lee las opiniones de nuestros pasajeros. Más de 500 vuelos completados y 4.9/5 de calificación promedio. Vuelos chárter, helicópteros y asientos compartidos.",
      en: "Read our passenger reviews. Over 500 flights completed and 4.9/5 average rating. Charter flights, helicopter tours, and shared seats.",
    },
    focusKeyword: { es: "sky ride panama opiniones", en: "sky ride panama reviews" },
  },
  "affordable-flights": {
    title: {
      es: "Vuelos Privados Baratos en Panamá | Sky Ride",
      en: "Affordable Private Flights in Panama | Sky Ride",
    },
    description: {
      es: "Vuelos privados accesibles con asientos compartidos. La forma más económica de volar privado en Panamá.",
      en: "Accessible private flights with shared seats. The most affordable way to fly private in Panama.",
    },
    focusKeyword: { es: "vuelos privados baratos", en: "affordable private flights panama" },
  },
  "available-seats": {
    title: {
      es: "Asientos Disponibles en Vuelos Privados | Sky Ride",
      en: "Available Seats on Private Flights | Sky Ride",
    },
    description: {
      es: "Compra asientos individuales en vuelos privados compartidos. Viaja cómodo, rápido y a mejor precio.",
      en: "Buy individual seats on shared private flights. Travel comfortably, fast, and at a better price.",
    },
  },
  "business-flights": {
    title: {
      es: "Renta de Aviones Privados para Viajes de Negocios | Sky Ride",
      en: "Charter Flights Panama — Personalized Experience | Sky Ride",
    },
    description: {
      es: "Alquiler de aviones privados para ejecutivos. Vuelos de negocios a cualquier destino desde Panamá.",
      en: "Private airplane rental for executives. Business flights to any destination from Panama.",
    },
  },
  "fleet-index": {
    title: {
      es: "Nuestra Flota Aérea | 13 Aeronaves Disponibles | Sky Ride",
      en: "Our Air Fleet | 13 Available Aircraft | Sky Ride",
    },
    description: {
      es: "Conozca nuestra red de 13 aeronaves disponibles: aviones chárter y helicópteros para todo tipo de vuelo en Panamá.",
      en: "Browse our network of 13 available aircraft: charter airplanes and helicopters for every type of flight in Panama.",
    },
    focusKeyword: { es: "flota aérea panamá", en: "air fleet panama" },
  },
  "dest-contadora": {
    title: {
      es: "Vuelo Privado a Contadora | 20 min desde Panamá | Sky Ride",
      en: "Private Flight to Contadora | 20 min from Panama | Sky Ride",
    },
    description: {
      es: "Vuelo privado directo a Isla Contadora en 20 minutos. Evite el ferry y disfrute la playa más rápido.",
      en: "Direct private flight to Contadora Island in 20 minutes. Skip the ferry and enjoy the beach faster.",
    },
    focusKeyword: { es: "vuelo privado contadora", en: "private flight contadora island" },
  },
  "dest-costa-rica": {
    title: {
      es: "Vuelo Privado a Costa Rica desde Panamá | Sky Ride",
      en: "Private Flight to Costa Rica from Panama | Sky Ride",
    },
    description: {
      es: "Vuelo privado directo de Panamá a Costa Rica. San José, Playa Tambor, Guanacaste en menos de 2 horas.",
      en: "Direct private flight from Panama to Costa Rica. San José, Playa Tambor, Guanacaste in under 2 hours.",
    },
    focusKeyword: { es: "vuelo privado panamá costa rica", en: "private flight panama costa rica" },
  },
  "dest-san-blas": {
    title: {
      es: "Vuelo Privado a San Blas desde Panamá | 30 min | Sky Ride",
      en: "Private Flight to San Blas from Panama | 30 min | Sky Ride",
    },
    description: {
      es: "Vuela a San Blas en 30 minutos desde Panamá. Evita las 4 horas de carretera y llega directo al paraíso del Caribe. Desde $644 por aeronave.",
      en: "Fly to San Blas in 30 minutes from Panama City. Skip the 4-hour road and land directly in Caribbean paradise. From $644 per aircraft.",
    },
    focusKeyword: { es: "vuelo privado san blas panama", en: "private flight san blas panama" },
  },
  "dest-bocas-del-toro": {
    title: {
      es: "Vuelo Privado a Bocas del Toro | 1 hora desde Panamá | Sky Ride",
      en: "Private Flight to Bocas del Toro | 1 Hour from Panama | Sky Ride",
    },
    description: {
      es: "Vuelo privado directo a Bocas del Toro en 1 hora. Sin las 6–10 horas de carretera por la Cordillera. Desde $1,605 por aeronave.",
      en: "Direct private flight to Bocas del Toro in 1 hour. Skip the 6–10 hour mountain drive. From $1,605 per aircraft.",
    },
    focusKeyword: { es: "vuelo privado bocas del toro", en: "private flight bocas del toro panama" },
  },
  "dest-medellin": {
    title: {
      es: "Vuelos Privados a Medellín desde Panamá | Sky Ride",
      en: "Private Flights to Medellín from Panama | Sky Ride",
    },
    description: {
      es: "Vuelo privado internacional de Panamá a Medellín en 2 horas. La opción ejecutiva para negocios y turismo.",
      en: "Private international flight from Panama to Medellín in 2 hours. The executive option for business and tourism.",
    },
  },
  "dest-playa-tambor": {
    title: {
      es: "Vuelos a Playa Tambor, Costa Rica | Sky Ride",
      en: "Flights to Playa Tambor, Costa Rica | Sky Ride",
    },
    description: {
      es: "Vuelo privado directo a Playa Tambor en la Península de Nicoya. Sin horas de carretera.",
      en: "Direct private flight to Playa Tambor in the Nicoya Peninsula. No hours of driving.",
    },
  },
  contact: {
    title: {
      es: "Contacto | Sky Ride Panama",
      en: "Contact | Sky Ride Panama",
    },
    description: {
      es: "Contáctenos para cotizar su vuelo privado o paseo en helicóptero en Panamá. WhatsApp, teléfono o formulario.",
      en: "Contact us to quote your private flight or helicopter tour in Panama. WhatsApp, phone, or form.",
    },
  },
  faq: {
    title: {
      es: "Preguntas Frecuentes | Sky Ride Panama",
      en: "Frequently Asked Questions | Sky Ride Panama",
    },
    description: {
      es: "Respuestas a las preguntas más frecuentes sobre vuelos chárter, helicópteros y reservas con Sky Ride Panamá.",
      en: "Answers to frequently asked questions about charter flights, helicopters, and bookings with Sky Ride Panama.",
    },
  },
  terms: {
    title: {
      es: "Términos y Condiciones | Sky Ride Panama",
      en: "Terms & Conditions | Sky Ride Panama",
    },
    description: {
      es: "Términos y condiciones de servicio de Sky Ride Panamá.",
      en: "Terms and conditions of service for Sky Ride Panama.",
    },
  },
  privacy: {
    title: {
      es: "Política de Privacidad | Sky Ride Panama",
      en: "Privacy Policy | Sky Ride Panama",
    },
    description: {
      es: "Política de privacidad y protección de datos de Sky Ride Panamá.",
      en: "Privacy and data protection policy for Sky Ride Panama.",
    },
  },
  "blog-index": {
    title: {
      es: "Blog de Aviación Privada en Panamá | Sky Ride",
      en: "Private Aviation Blog in Panama | Sky Ride",
    },
    description: {
      es: "Guías, consejos y noticias sobre vuelos privados, helicópteros y destinos en Panamá y Centroamérica.",
      en: "Guides, tips, and news about private flights, helicopters, and destinations in Panama and Central America.",
    },
    ogType: "website",
  },
  "hub-bocas-del-toro": {
    title: {
      es: "Guía de Bocas del Toro | Vuelo Privado desde Panamá en 1 Hora | Sky Ride",
      en: "Bocas del Toro Travel Guide | Private Flight from Panama in 1 Hour | Sky Ride",
    },
    description: {
      es: "Cómo llegar a Bocas del Toro en vuelo privado desde Panamá. Mejores playas, qué hacer y consejos para visitar el Caribe panameño.",
      en: "How to fly private from Panama City to Bocas del Toro in 1 hour. Best beaches, activities, and tips for visiting Panama's Caribbean archipelago.",
    },
    focusKeyword: { es: "vuelo privado bocas del toro panama", en: "private flight bocas del toro panama" },
  },
  "hub-san-blas": {
    title: {
      es: "Guía Completa de San Blas (Guna Yala) | Cómo Llegar y Qué Ver | Sky Ride",
      en: "San Blas Islands Travel Guide (Guna Yala) | How to Get There | Sky Ride",
    },
    description: {
      es: "Cómo llegar a San Blas en vuelo privado desde Panamá. Las mejores islas, qué hacer y consejos para tu visita a Guna Yala.",
      en: "How to get to San Blas by private flight from Panama City. Best islands, what to do, and tips for visiting Guna Yala.",
    },
    focusKeyword: { es: "como llegar a san blas vuelo", en: "san blas islands travel guide" },
  },
  "hub-contadora": {
    title: {
      es: "Guía Completa de Isla Contadora | Vuelos, Playas y Tips | Sky Ride",
      en: "Complete Contadora Island Guide | Flights, Beaches & Tips | Sky Ride",
    },
    description: {
      es: "Todo sobre Isla Contadora: playas, cómo llegar en vuelo privado, alojamiento y actividades. La guía más completa.",
      en: "Everything about Contadora Island: beaches, how to get there by private flight, accommodation and activities. The most complete guide.",
    },
    focusKeyword: { es: "isla contadora vuelo privado", en: "contadora island private flight" },
  },
  "hub-costa-rica": {
    title: {
      es: "Guía de Vuelos Panamá–Costa Rica | Destinos y Precios | Sky Ride",
      en: "Panama–Costa Rica Flights Guide | Destinations & Prices | Sky Ride",
    },
    description: {
      es: "Vuelos privados de Panamá a Costa Rica: San José, Playa Tambor, Liberia. Rutas, precios y aeronaves disponibles.",
      en: "Private flights from Panama to Costa Rica: San José, Playa Tambor, Liberia. Routes, prices, and available aircraft.",
    },
    focusKeyword: { es: "vuelo privado panama costa rica", en: "private flight panama costa rica" },
  },
  "hub-helicopters": {
    title: {
      es: "Guía de Helicópteros en Panamá | Tours, Precios y Flota | Sky Ride",
      en: "Helicopter Guide in Panama | Tours, Prices & Fleet | Sky Ride",
    },
    description: {
      es: "Todo sobre helicópteros en Panamá: tours panorámicos, precios, modelos disponibles y cómo reservar.",
      en: "Everything about helicopters in Panama: scenic tours, prices, available models, and how to book.",
    },
    focusKeyword: { es: "helicóptero panamá precio tour", en: "helicopter panama price tour" },
  },
  "booking-martin": {
    title: {
      es: "Reserva tu Vuelo con Martin — Asistente IA | Sky Ride",
      en: "Book Your Flight with Martin — AI Assistant | Sky Ride",
    },
    description: {
      es: "Reserva tu vuelo privado en 3 pasos con Martin, nuestro asistente de inteligencia artificial. Cotización inmediata 24/7.",
      en: "Book your private flight in 3 steps with Martin, our AI assistant. Instant quotes 24/7.",
    },
  },
};

/** Get SEO metadata for a page by its pageId and locale */
export function getPageSeo(pageId: string, locale: Locale): PageSeo | undefined {
  return seoData[pageId];
}

/** Build Next.js Metadata object for a page */
export function buildMetadata(
  pageId: string,
  locale: Locale,
  opts?: { esSlug?: string; enSlug?: string },
): Metadata {
  const seo = seoData[pageId];
  if (!seo) {
    return { title: "Sky Ride Panama" };
  }

  const esPath = opts?.esSlug ? `/${opts.esSlug}` : "/";
  const enPath = opts?.enSlug ? `/en/${opts.enSlug}` : "/en";

  return buildFullMetadata(locale, seo.title[locale], seo.description[locale], esPath, enPath, {
    ogType: seo.ogType,
  });
}

/** Route-specific SEO data */
export const routeSeoData: Record<string, { title: { es: string; en: string }; description: { es: string; en: string }; focusKeyword: { es: string; en: string } }> = {
  "panama-contadora": {
    title: {
      es: "Vuelo Privado Panamá → Contadora | Precio desde $398 | Sky Ride",
      en: "Private Flight Panama → Contadora | From $398 | Sky Ride",
    },
    description: {
      es: "Vuelo privado de Panamá a Contadora en 20 minutos. Desde $398. Reserva por WhatsApp.",
      en: "Private flight from Panama to Contadora in 20 minutes. From $398. Book via WhatsApp.",
    },
    focusKeyword: { es: "vuelo privado panama contadora precio", en: "private flight panama to contadora price" },
  },
  "panama-san-blas": {
    title: {
      es: "Vuelo a San Blas desde Panamá | Desde $644 | Sky Ride",
      en: "Flight to San Blas from Panama | From $644 | Sky Ride",
    },
    description: {
      es: "Vuelo directo a San Blas desde Panamá en 30 minutos. Evite las 4 horas de carretera.",
      en: "Direct flight to San Blas from Panama in 30 minutes. Skip the 4-hour road trip.",
    },
    focusKeyword: { es: "vuelo a san blas desde panama", en: "flight to san blas from panama" },
  },
  "panama-costa-rica": {
    title: {
      es: "Vuelo Chárter Panamá → Costa Rica | Desde $3,400 | Sky Ride",
      en: "Charter Flight Panama → Costa Rica | From $3,400 | Sky Ride",
    },
    description: {
      es: "Vuelo chárter de Panamá a Costa Rica en menos de 2 horas. Múltiples destinos. Cotización inmediata.",
      en: "Charter flight from Panama to Costa Rica in under 2 hours. Multiple destinations. Instant quotes.",
    },
    focusKeyword: { es: "vuelo charter panama costa rica precio", en: "charter flight panama to costa rica cost" },
  },
  "panama-bocas-del-toro": {
    title: {
      es: "Vuelo Panamá → Bocas del Toro | Desde $1,605 | Sky Ride",
      en: "Flight Panama → Bocas del Toro | From $1,605 | Sky Ride",
    },
    description: {
      es: "Vuelo directo a Bocas del Toro en 1h 35min. Sin escalas. Reserva por WhatsApp.",
      en: "Direct flight to Bocas del Toro in 1h 35min. No layovers. Book via WhatsApp.",
    },
    focusKeyword: { es: "vuelo panama bocas del toro", en: "flight panama to bocas del toro" },
  },
  "panama-medellin": {
    title: {
      es: "Vuelo Privado Panamá → Medellín | Desde $5,500 | Sky Ride",
      en: "Private Flight Panama → Medellín | From $5,500 | Sky Ride",
    },
    description: {
      es: "Vuelo privado internacional de Panamá a Medellín en 2 horas. Ejecutivo y turístico.",
      en: "Private international flight from Panama to Medellín in 2 hours. Business and leisure.",
    },
    focusKeyword: { es: "vuelo privado panama medellin", en: "private flight panama to medellin" },
  },
  "panama-miami": {
    title: {
      es: "Vuelo Privado Panamá → Miami | Desde $18,500 | Sky Ride",
      en: "Private Flight Panama → Miami | From $18,500 | Sky Ride",
    },
    description: {
      es: "Vuelo privado internacional de Panamá a Miami en 3h 30min. Sin filas ni escalas. Ideal para ejecutivos y familias.",
      en: "International private flight from Panama to Miami in 3h 30min. No lines or layovers. Ideal for executives and families.",
    },
    focusKeyword: { es: "vuelo privado panama miami", en: "private flight panama to miami" },
  },
  "panama-dominican-republic": {
    title: {
      es: "Vuelo Privado Panamá → República Dominicana | Desde $14,500 | Sky Ride",
      en: "Private Flight Panama → Dominican Republic | From $14,500 | Sky Ride",
    },
    description: {
      es: "Vuelo privado de Panamá a Santo Domingo o Punta Cana en 2h 45min. Escapadas premium y bodas de destino.",
      en: "Private flight from Panama to Santo Domingo or Punta Cana in 2h 45min. Premium getaways and destination weddings.",
    },
    focusKeyword: { es: "vuelo privado panama republica dominicana", en: "private flight panama to dominican republic" },
  },
};

/** Build metadata for route pages (full alternates + OG) */
export function buildRouteMetadata(
  routeSlug: string,
  locale: Locale,
  esSlug: string,
  enSlug: string,
): Metadata {
  const routeSeo = routeSeoData[routeSlug];
  if (!routeSeo) return { title: "Sky Ride Panama" };

  return buildFullMetadata(
    locale,
    routeSeo.title[locale],
    routeSeo.description[locale],
    `/${esSlug}`,
    `/en/${enSlug}`,
  );
}

/** Build metadata for fleet-detail pages */
export function buildFleetMetadata(
  locale: Locale,
  aircraft: { name: string; passengers: number; description: Record<string, string>; image: string },
  esSlug: string,
  enSlug: string,
): Metadata {
  const title =
    locale === "es"
      ? `${aircraft.name} — ${aircraft.passengers} Pasajeros | Sky Ride`
      : `${aircraft.name} — ${aircraft.passengers} Passengers | Sky Ride`;

  return buildFullMetadata(locale, title, aircraft.description[locale], `/${esSlug}`, `/en/${enSlug}`, {
    ogImage: `${SITE_URL}${aircraft.image}`,
  });
}

/** Build metadata for blog posts */
export function buildBlogMetadata(
  locale: Locale,
  post: { title: string; excerpt: string; image: string; slug: string; altSlug?: string },
  esSlug: string,
  enSlug: string,
): Metadata {
  return buildFullMetadata(locale, `${post.title} | Sky Ride`, post.excerpt, `/${esSlug}`, `/en/${enSlug}`, {
    ogImage: `${SITE_URL}${post.image}`,
    ogType: "article",
  });
}
