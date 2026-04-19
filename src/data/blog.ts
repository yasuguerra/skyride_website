import type { Locale } from "@/i18n/routing";

export interface BlogPost {
  slug: string;
  locale: Locale;
  title: string;
  excerpt: string;
  image: string;
  date: string; // ISO YYYY-MM-DD
  author: string;
  category: string;
  readingMinutes: number;
  /** Alternate-locale slug if a translation exists */
  altSlug?: string;
}

// Sample migrated posts. The full corpus lives in content/blog/*.md
// and can be expanded without touching this file once the loader is in place.
export const blogPosts: BlogPost[] = [
  // ─── ES ────────────────────────────────────────
  {
    slug: "descubre-las-mejores-islas-de-san-blas-skyride",
    locale: "es",
    title: "Descubre las mejores islas de San Blas con Sky Ride",
    excerpt:
      "Vuelos privados al archipiélago de Guna Yala. Conozca las 5 islas imperdibles del paraíso caribeño de Panamá.",
    image: "/images/hero/turista-skyride.webp",
    date: "2025-11-12",
    author: "Sky Ride Editorial",
    category: "Destinos",
    readingMinutes: 6,
  },
  {
    slug: "que-es-un-vuelo-charter-y-como-se-reserva",
    locale: "es",
    title: "¿Qué es un vuelo chárter y cómo se reserva?",
    excerpt:
      "Guía completa sobre vuelos chárter privados en Panamá: qué son, cuánto cuestan y cómo reservar en minutos.",
    image: "/images/hero/charter-exterior.webp",
    date: "2025-10-22",
    author: "Sky Ride Editorial",
    category: "Guías",
    readingMinutes: 5,
  },
  {
    slug: "paseo-en-helicoptero-precio-panama",
    locale: "es",
    title: "Paseo en helicóptero en Panamá: precios y opciones 2026",
    excerpt:
      "Descubra cuánto cuesta un paseo en helicóptero sobre la Ciudad de Panamá y el Canal. Precios desde $350/persona.",
    image: "/images/fleet/eurocopter-b4.jpg",
    date: "2026-01-15",
    author: "Sky Ride Editorial",
    category: "Helicópteros",
    readingMinutes: 4,
  },
  {
    slug: "que-hacer-en-isla-contadora",
    locale: "es",
    title: "Qué hacer en Isla Contadora: guía completa",
    excerpt:
      "Playas, snorkel, gastronomía y vida nocturna. Todo lo que puede hacer en la joya del archipiélago de Las Perlas.",
    image: "/images/destinations/contadora.jpg",
    date: "2025-09-18",
    author: "Sky Ride Editorial",
    category: "Destinos",
    readingMinutes: 7,
    altSlug: "what-to-do-in-contadora-island",
  },
  {
    slug: "playa-larga-contadora",
    locale: "es",
    title: "Playa Larga en Isla Contadora: tu próximo destino",
    excerpt:
      "La playa más extensa de Contadora: arena dorada, aguas calmas y atardeceres espectaculares a 20 minutos de vuelo.",
    image: "/images/destinations/contadora.jpg",
    date: "2025-08-20",
    author: "Sky Ride Editorial",
    category: "Destinos",
    readingMinutes: 5,
    altSlug: "long-beach-on-contadora-island-choose-your-next-destination",
  },
  {
    slug: "playa-cacique-contadora",
    locale: "es",
    title: "Playa Cacique en Contadora: un verdadero paraíso",
    excerpt:
      "Arrecifes de coral, snorkel de clase mundial y aguas cristalinas. Todo sobre Playa Cacique en Isla Contadora.",
    image: "/images/destinations/contadora.jpg",
    date: "2025-08-05",
    author: "Sky Ride Editorial",
    category: "Destinos",
    readingMinutes: 5,
    altSlug: "cacique-beach-in-contadora-a-true-paradise",
  },
  {
    slug: "ferry-a-contadora",
    locale: "es",
    title: "Ferry a Contadora: ¿realmente conviene?",
    excerpt:
      "Comparativa completa entre el ferry y el vuelo privado a Contadora. Tiempo, precio, comodidad y disponibilidad.",
    image: "/images/destinations/contadora.jpg",
    date: "2025-07-15",
    author: "Sky Ride Editorial",
    category: "Transporte",
    readingMinutes: 6,
    altSlug: "ferry-to-contadora-is-it-really-convenient",
  },
  {
    slug: "transporte-a-contadora",
    locale: "es",
    title: "Transporte a Contadora: mejores opciones",
    excerpt:
      "Todas las formas de llegar a Isla Contadora desde Ciudad de Panamá: ferry, vuelo privado, lancha y más.",
    image: "/images/destinations/contadora.jpg",
    date: "2025-07-01",
    author: "Sky Ride Editorial",
    category: "Transporte",
    readingMinutes: 6,
    altSlug: "transportation-to-contadora-island-best-options",
  },
  {
    slug: "experimenta-un-tour-de-helicoptero-inolvidable-sobreciudad-de-panama",
    locale: "es",
    title: "Tour de helicóptero inolvidable sobre Ciudad de Panamá",
    excerpt:
      "Sobrevuela el skyline de Panamá, el Canal y las islas cercanas en un tour de helicóptero privado.",
    image: "/images/fleet/eurocopter-b4.jpg",
    date: "2025-10-05",
    author: "Sky Ride Editorial",
    category: "Helicópteros",
    readingMinutes: 5,
  },
  {
    slug: "helicoptero-privado-lo-que-debes-saber-sky-ride",
    locale: "es",
    title: "Helicóptero privado: lo que debes saber",
    excerpt:
      "Guía esencial para volar en helicóptero privado en Panamá. Seguridad, precios, rutas y cómo reservar.",
    image: "/images/fleet/eurocopter-b4.jpg",
    date: "2025-09-01",
    author: "Sky Ride Editorial",
    category: "Helicópteros",
    readingMinutes: 5,
  },
  {
    slug: "luna-de-miel-en-panama",
    locale: "es",
    title: "Luna de miel en Panamá: los mejores destinos",
    excerpt:
      "San Blas, Contadora, Bocas del Toro — itinerario completo para una luna de miel volando privado en Panamá.",
    image: "/images/hero/service-2.webp",
    date: "2025-11-28",
    author: "Sky Ride Editorial",
    category: "Viajes",
    readingMinutes: 8,
    altSlug: "honeymoon-in-panama-best-places-activities-itinerary",
  },
  {
    slug: "descubre-el-confort-vuelo-privado-panama-costa-rica",
    locale: "es",
    title: "Descubre el confort de un vuelo privado Panamá-Costa Rica",
    excerpt:
      "Sin escalas, sin filas: así es volar privado de Panamá a Costa Rica. Rutas, precios y aeronaves disponibles.",
    image: "/images/destinations/vuelos-privados.jpg",
    date: "2025-10-30",
    author: "Sky Ride Editorial",
    category: "Rutas",
    readingMinutes: 6,
  },
  {
    slug: "que-ver-y-hacer-en-playa-tambor-costa-rica",
    locale: "es",
    title: "Qué ver y hacer en Playa Tambor, Costa Rica",
    excerpt:
      "Surf, naturaleza y tortugas marinas en la Península de Nicoya. Accede volando privado desde Panamá.",
    image: "/images/hero/service-4.webp",
    date: "2025-09-25",
    author: "Sky Ride Editorial",
    category: "Destinos",
    readingMinutes: 6,
    altSlug: "whats-to-see-and-do-in-playa-tambor-costa-rica",
  },
  {
    slug: "que-ver-en-san-jose-capital-de-costa-rica",
    locale: "es",
    title: "Qué ver en San José, capital de Costa Rica",
    excerpt:
      "Museos, mercados y barrios históricos. Todo lo que necesitas saber antes de aterrizar en San José.",
    image: "/images/destinations/vuelos-privados.jpg",
    date: "2025-09-10",
    author: "Sky Ride Editorial",
    category: "Destinos",
    readingMinutes: 6,
    altSlug: "what-to-see-in-san-jose-capital-of-costa-rica",
  },
  {
    slug: "mejores-lugares-turisticos-de-costa-rica",
    locale: "es",
    title: "Los mejores lugares turísticos de Costa Rica",
    excerpt:
      "Volcanes, bosques nubosos, playas del Pacífico y Caribe. Los destinos imperdibles accesibles por vuelo privado.",
    image: "/images/destinations/vuelos-privados.jpg",
    date: "2025-12-03",
    author: "Sky Ride Editorial",
    category: "Destinos",
    readingMinutes: 7,
    altSlug: "the-best-tourist-places-in-costa-rica",
  },
  {
    slug: "luna-de-miel-en-costa-rica",
    locale: "es",
    title: "Luna de miel en Costa Rica: guía completa",
    excerpt:
      "Playas paradisíacas, volcanes y aventura. Planifica tu luna de miel en Costa Rica con vuelo privado desde Panamá.",
    image: "/images/destinations/vuelos-privados.jpg",
    date: "2025-11-05",
    author: "Sky Ride Editorial",
    category: "Viajes",
    readingMinutes: 7,
    altSlug: "honeymoon-in-costa-rica",
  },
  {
    slug: "vuela-de-panama-a-bocas-del-toro-la-mejor-forma-de-llegar-al-paraiso",
    locale: "es",
    title: "Vuela de Panamá a Bocas del Toro: la mejor forma de llegar al paraíso",
    excerpt:
      "En una hora de vuelo privado llegas al Caribe de Panamá. Descubre Bocas del Toro sin carreteras ni escalas.",
    image: "/images/hero/turista-skyride.webp",
    date: "2025-08-15",
    author: "Sky Ride Editorial",
    category: "Rutas",
    readingMinutes: 5,
  },
  {
    slug: "vuelos-privados-y-charter-tu-solucion-para-viajes-exclusivos-en-panama",
    locale: "es",
    title: "Vuelos privados y chárter: tu solución para viajes exclusivos en Panamá",
    excerpt:
      "Todo lo que necesitas saber sobre la aviación privada en Panamá. Tipos de vuelos, beneficios y cómo reservar.",
    image: "/images/hero/charter-exterior.webp",
    date: "2025-07-20",
    author: "Sky Ride Editorial",
    category: "Guías",
    readingMinutes: 6,
  },
  {
    slug: "reservar-vuelo-sin-pagar-demasiado",
    locale: "es",
    title: "Cómo reservar un vuelo privado sin pagar demasiado",
    excerpt:
      "Vuelos compartidos, asientos disponibles y temporadas baja: trucos para volar privado a buen precio en Panamá.",
    image: "/images/hero/charter-exterior.webp",
    date: "2025-06-15",
    author: "Sky Ride Editorial",
    category: "Guías",
    readingMinutes: 5,
  },
  {
    slug: "apps-para-encontrar-viajes-en-avion-privado",
    locale: "es",
    title: "Apps para encontrar viajes en avión privado",
    excerpt:
      "Las mejores aplicaciones y plataformas para cotizar y reservar vuelos privados en Latinoamérica.",
    image: "/images/hero/charter-exterior.webp",
    date: "2025-06-01",
    author: "Sky Ride Editorial",
    category: "Guías",
    readingMinutes: 5,
  },
  {
    slug: "tips-para-viajar-en-avion-guia-completa",
    locale: "es",
    title: "Tips para viajar en avión: guía completa",
    excerpt:
      "Consejos prácticos para volar más cómodo y seguro, tanto en aviación comercial como privada.",
    image: "/images/hero/charter-exterior.webp",
    date: "2025-05-20",
    author: "Sky Ride Editorial",
    category: "Guías",
    readingMinutes: 6,
  },
  {
    slug: "hipertensos-pueden-viajar-en-avion",
    locale: "es",
    title: "¿Los hipertensos pueden viajar en avión?",
    excerpt:
      "Recomendaciones médicas y consejos para personas con hipertensión que planean volar en avión privado.",
    image: "/images/hero/charter-exterior.webp",
    date: "2025-05-10",
    author: "Sky Ride Editorial",
    category: "Salud",
    readingMinutes: 4,
  },
  {
    slug: "como-elegir-asientos-de-avion-privado",
    locale: "es",
    title: "Cómo elegir asientos de avión privado",
    excerpt:
      "Guía para entender la configuración de cabina en aeronaves privadas y elegir el mejor asiento.",
    image: "/images/hero/charter-exterior.webp",
    date: "2025-04-25",
    author: "Sky Ride Editorial",
    category: "Guías",
    readingMinutes: 4,
  },

  // ─── EN ────────────────────────────────────────
  {
    slug: "what-to-do-in-contadora-island",
    locale: "en",
    title: "What to do on Contadora Island: complete guide",
    excerpt:
      "Beaches, snorkeling, dining, and nightlife. Everything you can do on the jewel of the Pearl Islands archipelago.",
    image: "/images/destinations/contadora.jpg",
    date: "2025-09-18",
    author: "Sky Ride Editorial",
    category: "Destinations",
    readingMinutes: 7,
    altSlug: "que-hacer-en-isla-contadora",
  },
  {
    slug: "honeymoon-in-panama-best-places-activities-itinerary",
    locale: "en",
    title: "Honeymoon in Panama: best places, activities & itinerary",
    excerpt:
      "From San Blas to Contadora and Bocas del Toro — your complete private-flight honeymoon itinerary in Panama.",
    image: "/images/hero/service-2.webp",
    date: "2026-02-08",
    author: "Sky Ride Editorial",
    category: "Travel",
    readingMinutes: 8,
  },
  {
    slug: "the-best-tourist-places-in-costa-rica",
    locale: "en",
    title: "The best tourist places in Costa Rica",
    excerpt:
      "Volcanoes, rainforests, and Pacific beaches — reach them all faster with a private flight from Panama.",
    image: "/images/destinations/vuelos-privados.jpg",
    date: "2025-12-03",
    author: "Sky Ride Editorial",
    category: "Destinations",
    readingMinutes: 6,
    altSlug: "mejores-lugares-turisticos-de-costa-rica",
  },
  {
    slug: "cacique-beach-in-contadora-a-true-paradise",
    locale: "en",
    title: "Cacique Beach in Contadora: a true paradise",
    excerpt:
      "World-class snorkeling, coral reefs, and crystal-clear water. Everything about Cacique Beach on Contadora Island.",
    image: "/images/destinations/contadora.jpg",
    date: "2025-08-05",
    author: "Sky Ride Editorial",
    category: "Destinations",
    readingMinutes: 5,
    altSlug: "playa-cacique-contadora",
  },
  {
    slug: "whats-to-see-and-do-in-playa-tambor-costa-rica",
    locale: "en",
    title: "What to see and do in Playa Tambor, Costa Rica",
    excerpt:
      "Surfing, wildlife, and sea turtles on Costa Rica's Nicoya Peninsula. Fly private from Panama.",
    image: "/images/hero/service-4.webp",
    date: "2025-09-25",
    author: "Sky Ride Editorial",
    category: "Destinations",
    readingMinutes: 6,
    altSlug: "que-ver-y-hacer-en-playa-tambor-costa-rica",
  },
  {
    slug: "what-to-see-in-san-jose-capital-of-costa-rica",
    locale: "en",
    title: "What to see in San José, capital of Costa Rica",
    excerpt:
      "Museums, markets, and historic neighborhoods. Everything you need to know before landing in San José.",
    image: "/images/destinations/vuelos-privados.jpg",
    date: "2025-09-10",
    author: "Sky Ride Editorial",
    category: "Destinations",
    readingMinutes: 6,
    altSlug: "que-ver-en-san-jose-capital-de-costa-rica",
  },
  {
    slug: "ferry-to-contadora-is-it-really-convenient",
    locale: "en",
    title: "Ferry to Contadora: is it really convenient?",
    excerpt:
      "Full comparison between the ferry and a private flight to Contadora. Time, price, comfort, and availability.",
    image: "/images/destinations/contadora.jpg",
    date: "2025-07-15",
    author: "Sky Ride Editorial",
    category: "Transport",
    readingMinutes: 6,
    altSlug: "ferry-a-contadora",
  },
  {
    slug: "honeymoon-in-costa-rica",
    locale: "en",
    title: "Honeymoon in Costa Rica: complete guide",
    excerpt:
      "Pristine beaches, volcanoes, and adventure. Plan your Costa Rica honeymoon with a private flight from Panama.",
    image: "/images/destinations/vuelos-privados.jpg",
    date: "2025-11-05",
    author: "Sky Ride Editorial",
    category: "Travel",
    readingMinutes: 7,
    altSlug: "luna-de-miel-en-costa-rica",
  },
  {
    slug: "long-beach-on-contadora-island-choose-your-next-destination",
    locale: "en",
    title: "Long Beach on Contadora Island: choose your next destination",
    excerpt:
      "The longest beach on Contadora Island — golden sand, calm waters, and spectacular sunsets just 20 minutes away.",
    image: "/images/destinations/contadora.jpg",
    date: "2025-08-20",
    author: "Sky Ride Editorial",
    category: "Destinations",
    readingMinutes: 5,
    altSlug: "playa-larga-contadora",
  },
  {
    slug: "transportation-to-contadora-island-best-options",
    locale: "en",
    title: "Transportation to Contadora Island: best options",
    excerpt:
      "Every way to get to Contadora Island from Panama City: ferry, private flight, boat, and more.",
    image: "/images/destinations/contadora.jpg",
    date: "2025-07-01",
    author: "Sky Ride Editorial",
    category: "Transport",
    readingMinutes: 6,
    altSlug: "transporte-a-contadora",
  },
];

export function getBlogPostsByLocale(locale: Locale): BlogPost[] {
  return blogPosts
    .filter((p) => p.locale === locale)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPost(slug: string, locale: Locale): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug && p.locale === locale);
}
