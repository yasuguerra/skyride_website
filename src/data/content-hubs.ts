import type { Locale } from "@/i18n/routing";

export interface ContentHub {
  id: string;
  pageId: string;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  description: { es: string; en: string };
  heroImage: string;
  /** Linked service / destination page IDs */
  servicePage: { label: { es: string; en: string }; es: string; en: string };
  routePage: { label: { es: string; en: string }; es: string; en: string };
  /** Blog post slugs (ES locale) that belong to this hub */
  blogSlugs: string[];
  /** Fleet aircraft slugs relevant to this hub */
  fleetSlugs: string[];
  /** YouTube video ID for VideoEmbed (optional) */
  videoId?: string;
  /** Optional cross-sell partner section */
  partnerCta?: {
    heading: { es: string; en: string };
    body: { es: string; en: string };
    ctaLabel: { es: string; en: string };
    href: string;
  };
}

export const contentHubs: ContentHub[] = [
  {
    id: "contadora",
    pageId: "hub-contadora",
    title: {
      es: "Guía Completa de Isla Contadora",
      en: "Complete Guide to Contadora Island",
    },
    subtitle: {
      es: "Todo lo que necesitas saber para tu escapada privada a Las Perlas",
      en: "Everything you need to know for your private getaway to the Pearl Islands",
    },
    description: {
      es: "Isla Contadora es el destino de playa más exclusivo de Panamá, a solo 20 minutos de vuelo privado desde la ciudad. En esta guía reunimos las mejores playas, actividades, opciones de transporte y consejos prácticos para planificar tu visita perfecta.",
      en: "Contadora Island is Panama's most exclusive beach destination, just 20 minutes by private flight from the city. In this guide we bring together the best beaches, activities, transport options, and practical tips for planning your perfect visit.",
    },
    heroImage: "/images/destinations/contadora.jpg",
    servicePage: {
      label: { es: "Vuelo privado a Contadora", en: "Private flight to Contadora" },
      es: "/vuelo-privado-a-contadora",
      en: "/en/private-flight-to-contadora",
    },
    routePage: {
      label: { es: "Ruta Panamá → Contadora", en: "Panama → Contadora Route" },
      es: "/ruta/panama-contadora",
      en: "/en/route/panama-contadora",
    },
    blogSlugs: [
      "playa-larga-contadora",
      "playa-cacique-contadora",
      "ferry-a-contadora",
      "transporte-a-contadora",
      "que-hacer-en-isla-contadora",
    ],
    fleetSlugs: ["cessna-206-5-pasajeros", "piper-azteca-5-pasajeros", "cessna-grand-caravan-12-pasajeros"],
    videoId: undefined, // Add YouTube ID when available
  },
  {
    id: "bocas-del-toro",
    pageId: "hub-bocas-del-toro",
    title: {
      es: "Guía Completa de Bocas del Toro",
      en: "Complete Guide to Bocas del Toro",
    },
    subtitle: {
      es: "Todo lo que necesitas saber para volar privado al Caribe de Panamá",
      en: "Everything you need to know to fly private to Panama's Caribbean coast",
    },
    description: {
      es: "Bocas del Toro es el destino caribeño más buscado de Panamá: playas de arena blanca, surf de clase mundial, manglares y vida marina única. Llegar por tierra toma 6–10 horas; en vuelo privado con Sky Ride, aterrizas en Isla Colón en solo 1 hora. Esta guía cubre cómo llegar, qué hacer, las mejores islas y consejos prácticos.",
      en: "Bocas del Toro is Panama's most sought-after Caribbean destination: white sand beaches, world-class surf, mangroves, and unique marine life. Getting there overland takes 6–10 hours; on a private flight with Sky Ride, you land on Isla Colón in just 1 hour. This guide covers how to get there, what to do, the best islands, and practical tips.",
    },
    heroImage: "/images/destinations/Bocas del Toro.jpg",
    servicePage: {
      label: { es: "Vuelo privado a Bocas del Toro", en: "Private flight to Bocas del Toro" },
      es: "/vuelo-privado-bocas-del-toro",
      en: "/en/private-flight-bocas-del-toro",
    },
    routePage: {
      label: { es: "Ruta Panamá → Bocas del Toro", en: "Panama → Bocas del Toro Route" },
      es: "/ruta/panama-bocas-del-toro",
      en: "/en/route/panama-bocas-del-toro",
    },
    blogSlugs: [
      "vuela-de-panama-a-bocas-del-toro-la-mejor-forma-de-llegar-al-paraiso",
    ],
    fleetSlugs: ["cessna-grand-caravan-12-pasajeros", "daher-kodiak-hasta-9-pasajeros", "piper-azteca-5-pasajeros"],
    videoId: undefined,
  },
  {
    id: "san-blas",
    pageId: "hub-san-blas",
    title: {
      es: "Guía Completa de San Blas (Guna Yala)",
      en: "San Blas Islands Travel Guide (Guna Yala)",
    },
    subtitle: {
      es: "Todo lo que necesitas saber para llegar a San Blas en vuelo privado desde Panamá",
      en: "Everything you need to know to reach San Blas by private flight from Panama City",
    },
    description: {
      es: "San Blas, oficialmente conocido como Guna Yala, es el archipiélago más virgen del Caribe panameño. Más de 365 islas con arenas blancas, palmeras y aguas turquesas a solo 30 minutos de vuelo desde la Ciudad de Panamá. Esta guía cubre cómo llegar, qué ver, las mejores islas y todo lo que necesitas para planificar tu visita perfecta.",
      en: "San Blas, officially known as Guna Yala, is Panama's most pristine Caribbean archipelago. Over 365 islands with white sand, palm trees, and turquoise waters just 30 minutes by private flight from Panama City. This guide covers how to get there, what to see, the best islands, and everything you need to plan your perfect visit.",
    },
    heroImage: "/images/destinations/Approaching Island.png",
    servicePage: {
      label: { es: "Vuelo privado a San Blas", en: "Private flight to San Blas" },
      es: "/vuelo-privado-a-san-blas",
      en: "/en/private-flight-san-blas",
    },
    routePage: {
      label: { es: "Ruta Panamá → San Blas", en: "Panama → San Blas Route" },
      es: "/ruta/panama-san-blas",
      en: "/en/route/panama-san-blas",
    },
    blogSlugs: [
      "como-llegar-a-san-blas",
      "descubre-las-mejores-islas-de-san-blas-skyride",
      "vuela-de-panama-a-bocas-del-toro-la-mejor-forma-de-llegar-al-paraiso",
    ],
    fleetSlugs: ["cessna-206-5-pasajeros", "piper-azteca-5-pasajeros", "cessna-172-hasta-3-pasajeros"],
    videoId: undefined,
    partnerCta: {
      heading: {
        es: "Navega San Blas con Ocean Ride",
        en: "Sail San Blas with Ocean Ride",
      },
      body: {
        es: "¿Ya tienes tu vuelo? Completa la experiencia explorando el archipiélago en catamarán. Ocean Ride, empresa hermana de Sky Ride, opera tours privados en velero y catamarán por las islas de Guna Yala. La combinación perfecta: llegas en 30 minutos y navegas sin límites.",
        en: "Already have your flight? Complete the experience by exploring the archipelago by catamaran. Ocean Ride, Sky Ride's sister company, runs private sailing and catamaran tours through the Guna Yala islands. The perfect combination: fly in 30 minutes, sail without limits.",
      },
      ctaLabel: {
        es: "Ver tours en catamarán",
        en: "View catamaran tours",
      },
      href: "https://www.oceanride.city/san-blas/",
    },
  },
  {
    id: "costa-rica",
    pageId: "hub-costa-rica",
    title: {
      es: "Guía de Vuelos Privados a Costa Rica",
      en: "Private Flights to Costa Rica Guide",
    },
    subtitle: {
      es: "Rutas, destinos y todo lo que necesitas para volar privado entre Panamá y Costa Rica",
      en: "Routes, destinations, and everything you need to fly private between Panama and Costa Rica",
    },
    description: {
      es: "Costa Rica es uno de los destinos más solicitados por nuestros pasajeros. Vuelos directos a San José, Playa Tambor y Guanacaste sin escalas ni filas. Aquí encontrarás rutas, precios de referencia, blogs de destinos y recomendaciones de nuestra tripulación.",
      en: "Costa Rica is one of the most requested destinations by our passengers. Direct flights to San José, Playa Tambor, and Guanacaste with no layovers or lines. Here you'll find routes, reference pricing, destination blogs, and crew recommendations.",
    },
    heroImage: "/images/destinations/vuelos-privados.jpg",
    servicePage: {
      label: { es: "Vuelo privado a Costa Rica", en: "Private flight to Costa Rica" },
      es: "/vuelo-privado-costa-rica",
      en: "/en/private-flight-costa-rica",
    },
    routePage: {
      label: { es: "Ruta Panamá → Costa Rica", en: "Panama → Costa Rica Route" },
      es: "/ruta/panama-costa-rica",
      en: "/en/route/panama-costa-rica",
    },
    blogSlugs: [
      "que-ver-y-hacer-en-playa-tambor-costa-rica",
      "que-ver-en-san-jose-capital-de-costa-rica",
      "mejores-lugares-turisticos-de-costa-rica",
      "luna-de-miel-en-costa-rica",
    ],
    fleetSlugs: ["king-air-f90-6-pasajeros", "king-air-200-hasta-9-pasajeros", "cessna-grand-caravan-12-pasajeros"],
    videoId: undefined,
  },
  {
    id: "helicopters",
    pageId: "hub-helicopters",
    title: {
      es: "Todo Sobre Helicópteros en Panamá",
      en: "Helicopter Tours Panama — Complete Guide",
    },
    subtitle: {
      es: "Tours, precios, seguridad y todo sobre los paseos en helicóptero en Ciudad de Panamá",
      en: "Tours, pricing, safety, and everything about helicopter rides in Panama City",
    },
    description: {
      es: "Los paseos en helicóptero sobre la Ciudad de Panamá ofrecen una perspectiva única del skyline, el Canal y las islas cercanas. Esta guía cubre todo: desde precios y duración de tours hasta la seguridad de cada aeronave de nuestra flota.",
      en: "Helicopter rides over Panama City offer a unique perspective of the skyline, the Canal, and nearby islands. This guide covers everything: from pricing and tour duration to the safety of each aircraft in our fleet.",
    },
    heroImage: "/images/hero/canal-panama.webp",
    servicePage: {
      label: { es: "Paseo en helicóptero", en: "Helicopter rides" },
      es: "/paseo-en-helicoptero-en-panama",
      en: "/en/helicopter-rides",
    },
    routePage: {
      label: { es: "Flota de helicópteros", en: "Helicopter fleet" },
      es: "/nuestra-flota",
      en: "/en/our-fleet",
    },
    blogSlugs: [
      "experimenta-un-tour-de-helicoptero-inolvidable-sobreciudad-de-panama",
      "paseo-en-helicoptero-precio-panama",
      "helicoptero-privado-lo-que-debes-saber-sky-ride",
    ],
    fleetSlugs: ["robinson-r44-3-pasajeros", "robinson-r66-4-pasajeros", "eurocopter-b3-as350-5-pasajeros", "eurocopter-b4-ec130-6-pasajeros"],
    videoId: undefined,
  },
];

export function getContentHub(id: string): ContentHub | undefined {
  return contentHubs.find((h) => h.id === id);
}

export function getContentHubByPageId(pageId: string): ContentHub | undefined {
  return contentHubs.find((h) => h.pageId === pageId);
}
