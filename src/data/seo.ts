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
  "charter-prices": {
    title: {
      es: "Precios de Vuelos Chárter en Panamá | Tabla 2026 | Sky Ride",
      en: "Charter Flight Prices in Panama | 2026 Rate Table | Sky Ride",
    },
    description: {
      es: "Tabla completa de precios de vuelos chárter privados desde Panamá. Precios por ruta y aeronave, actualizados para 2026.",
      en: "Complete price table for private charter flights from Panama. Prices by route and aircraft, updated for 2026.",
    },
    focusKeyword: { es: "precios vuelos charter panama", en: "charter flight prices panama" },
  },
  reviews: {
    title: {
      es: "Reseñas y Opiniones — Sky Ride Panama | 4.9 ★",
      en: "Reviews & Ratings — Sky Ride Panama | 4.9 ★",
    },
    description: {
      es: "Más de 127 reseñas verificadas de pasajeros que han volado con Sky Ride Panama. Calificación 4.9 sobre 5 en Google.",
      en: "Over 127 verified passenger reviews from people who have flown with Sky Ride Panama. 4.9 out of 5 on Google.",
    },
    focusKeyword: { es: "reseñas sky ride panama", en: "sky ride panama reviews" },
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
