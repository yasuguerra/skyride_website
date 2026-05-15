export interface RouteData {
  id: string;
  slug: string;
  origin: { es: string; en: string };
  destination: { es: string; en: string };
  flightTime: string;
  distance: string;
  startingPrice: number;
  currency: string;
  description: {
    es: string;
    en: string;
  };
  aircraft: string[];
  image: string;
  highlights: { es: string[]; en: string[] };
  faq?: { q: { es: string; en: string }; a: { es: string; en: string } }[];
  contentSections?: {
    id: string;
    heading: { es: string; en: string };
    body: { es: string; en: string };
    listItems?: { es: string; en: string }[];
  }[];
}

export const routes: RouteData[] = [
  {
    id: "panama-contadora",
    slug: "panama-contadora",
    origin: { es: "Ciudad de Panamá", en: "Panama City" },
    destination: { es: "Isla Contadora", en: "Contadora Island" },
    flightTime: "20 min",
    distance: "80 km",
    startingPrice: 398,
    currency: "USD",
    description: {
      es: "Escapada premium de fin de semana a Isla Contadora. Vuelo directo desde la Ciudad de Panamá sin filas ni esperas. Playas de arena blanca te esperan a solo 20 minutos.",
      en: "Premium weekend getaway to Contadora Island. Direct flight from Panama City with no lines or waits. White sand beaches await you just 20 minutes away.",
    },
    aircraft: ["piper-cherokee", "cessna-172", "cessna-206", "piper-azteca", "cessna-caravan", "daher-kodiak"],
    image: "/images/destinations/contadora.jpg",
    highlights: {
      es: ["Vuelo directo de 20 min", "Playas de arena blanca", "Ideal para parejas y familias", "Snorkel y buceo"],
      en: ["20-min direct flight", "White sand beaches", "Ideal for couples & families", "Snorkeling & diving"],
    },
  },
  {
    id: "panama-san-blas",
    slug: "panama-san-blas",
    origin: { es: "Ciudad de Panamá", en: "Panama City" },
    destination: { es: "San Blas (Guna Yala)", en: "San Blas (Guna Yala)" },
    flightTime: "30 min",
    distance: "120 km",
    startingPrice: 644,
    currency: "USD",
    description: {
      es: "Acceso directo a las islas de San Blas sin las 4 horas de carretera. Vuelo sobre la selva del Darién hasta el paraíso del Caribe panameño.",
      en: "Direct access to the San Blas islands without the 4-hour road trip. Fly over the Darién jungle to the Panamanian Caribbean paradise.",
    },
    aircraft: ["cessna-172", "cessna-206", "cessna-caravan", "daher-kodiak"],
    image: "/images/hero/turista-skyride.webp",
    highlights: {
      es: ["Sin carretera de 4 horas", "365+ islas vírgenes", "Cultura Guna Yala", "Aguas cristalinas"],
      en: ["Skip the 4-hour road", "365+ virgin islands", "Guna Yala culture", "Crystal-clear waters"],
    },
  },
  {
    id: "panama-costa-rica",
    slug: "panama-costa-rica",
    origin: { es: "Ciudad de Panamá", en: "Panama City" },
    destination: { es: "Costa Rica", en: "Costa Rica" },
    flightTime: "1h 45min",
    distance: "500 km",
    startingPrice: 3400,
    currency: "USD",
    description: {
      es: "Ruta ejecutiva y turística entre Panamá y Costa Rica. Vuelo directo sin escalas comerciales. Llegue a San José, Playa Tambor o Guanacaste en menos de 2 horas.",
      en: "Executive and tourist route between Panama and Costa Rica. Direct nonstop flight. Arrive in San José, Playa Tambor, or Guanacaste in under 2 hours.",
    },
    aircraft: ["cessna-caravan", "king-air-f90", "king-air-200"],
    image: "/images/destinations/vuelos-privados.jpg",
    highlights: {
      es: ["Vuelo directo < 2 horas", "Múltiples destinos en CR", "Ideal para negocios", "Sin filas de aeropuerto"],
      en: ["Direct flight < 2 hours", "Multiple CR destinations", "Ideal for business", "No airport lines"],
    },
  },
  {
    id: "panama-bocas-del-toro",
    slug: "panama-bocas-del-toro",
    origin: { es: "Ciudad de Panamá", en: "Panama City" },
    destination: { es: "Bocas del Toro", en: "Bocas del Toro" },
    flightTime: "1h 35min",
    distance: "340 km",
    startingPrice: 1605,
    currency: "USD",
    description: {
      es: "Vuelo directo al archipiélago caribeño de Bocas del Toro. Evite las escalas comerciales y llegue a la playa en una hora.",
      en: "Direct flight to the Caribbean archipelago of Bocas del Toro. Skip commercial layovers and reach the beach in one hour.",
    },
    aircraft: ["cessna-caravan", "daher-kodiak", "piper-azteca"],
    image: "/images/hero/service-2.webp",
    highlights: {
      es: ["1 hora de vuelo directo", "Archipiélago caribeño", "Surf y naturaleza", "Sin escalas"],
      en: ["1-hour direct flight", "Caribbean archipelago", "Surf & nature", "No layovers"],
    },
  },
  {
    id: "panama-medellin",
    slug: "panama-medellin",
    origin: { es: "Ciudad de Panamá", en: "Panama City" },
    destination: { es: "Medellín, Colombia", en: "Medellín, Colombia" },
    flightTime: "2h",
    distance: "680 km",
    startingPrice: 5500,
    currency: "USD",
    description: {
      es: "Ruta internacional privada entre Panamá y Medellín. La opción ejecutiva para quienes valoran su tiempo en viajes de negocios o placer.",
      en: "Private international route between Panama and Medellín. The executive option for those who value their time on business or leisure trips.",
    },
    aircraft: ["king-air-200", "king-air-f90"],
    image: "/images/hero/service-3.webp",
    highlights: {
      es: ["Vuelo internacional privado", "2 horas de vuelo", "Ciudad de la eterna primavera", "Ideal para negocios"],
      en: ["Private international flight", "2-hour flight", "City of eternal spring", "Ideal for business"],
    },
  },
  {
    id: "panama-miami",
    slug: "panama-miami",
    origin: { es: "Ciudad de Panamá", en: "Panama City" },
    destination: { es: "Miami, Estados Unidos", en: "Miami, United States" },
    flightTime: "3h 30min",
    distance: "1,930 km",
    startingPrice: 18500,
    currency: "USD",
    description: {
      es: "Vuelo privado internacional entre Ciudad de Panamá y Miami. Evite las filas, los retrasos y las escalas. Salga cuando quiera, con la privacidad y confort de un jet ejecutivo.",
      en: "International private flight between Panama City and Miami. Skip the lines, delays, and layovers. Depart on your schedule with the privacy and comfort of an executive jet.",
    },
    aircraft: ["king-air-200"],
    image: "/images/hero/service-3.webp",
    highlights: {
      es: ["Vuelo directo a EE.UU.", "Sin escalas ni filas", "Horario flexible", "Cabina ejecutiva"],
      en: ["Direct flight to the U.S.", "No layovers or lines", "Flexible schedule", "Executive cabin"],
    },
  },
  {
    id: "panama-dominican-republic",
    slug: "panama-dominican-republic",
    origin: { es: "Ciudad de Panamá", en: "Panama City" },
    destination: { es: "República Dominicana", en: "Dominican Republic" },
    flightTime: "2h 45min",
    distance: "1,460 km",
    startingPrice: 14500,
    currency: "USD",
    description: {
      es: "Vuelo privado a Santo Domingo o Punta Cana. Ideal para escapadas de playa premium, bodas de destino y viajes ejecutivos al Caribe.",
      en: "Private flight to Santo Domingo or Punta Cana. Perfect for premium beach getaways, destination weddings, and Caribbean executive travel.",
    },
    aircraft: ["king-air-200"],
    image: "/images/hero/service-3.webp",
    highlights: {
      es: ["Vuelo directo al Caribe", "Santo Domingo y Punta Cana", "Perfecto para parejas", "Cabina presurizada"],
      en: ["Direct Caribbean flight", "Santo Domingo & Punta Cana", "Perfect for couples", "Pressurized cabin"],
    },
  },
];

export function getRoute(id: string): RouteData | undefined {
  return routes.find((r) => r.id === id);
}

export function getRouteBySlug(slug: string): RouteData | undefined {
  return routes.find((r) => r.slug === slug);
}
