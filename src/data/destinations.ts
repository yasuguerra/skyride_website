export interface Destination {
  id: string;
  pageId: string;
  name: { es: string; en: string };
  description: {
    es: string;
    en: string;
  };
  image: string;
  routeId: string;
  highlights: { es: string[]; en: string[] };
}

export const destinations: Destination[] = [
  {
    id: "contadora",
    pageId: "dest-contadora",
    name: { es: "Isla Contadora", en: "Contadora Island" },
    description: {
      es: "La joya del archipiélago de Las Perlas. Playas de arena blanca, aguas cristalinas y la escapada perfecta a solo 20 minutos de vuelo desde la Ciudad de Panamá.",
      en: "The jewel of the Pearl Islands archipelago. White sand beaches, crystal-clear waters, and the perfect getaway just 20 minutes from Panama City.",
    },
    image: "/images/destinations/contadora.jpg",
    routeId: "panama-contadora",
    highlights: {
      es: ["Playas vírgenes", "Snorkel y buceo", "Restaurantes y vida nocturna", "Avistamiento de ballenas (temporada)"],
      en: ["Pristine beaches", "Snorkeling & diving", "Restaurants & nightlife", "Whale watching (seasonal)"],
    },
  },
  {
    id: "costa-rica",
    pageId: "dest-costa-rica",
    name: { es: "Costa Rica", en: "Costa Rica" },
    description: {
      es: "Vuelos privados directos a San José, Playa Tambor y Guanacaste. Evite las escalas comerciales y llegue a su destino en Costa Rica en menos de 2 horas.",
      en: "Direct private flights to San José, Playa Tambor, and Guanacaste. Skip commercial layovers and reach your Costa Rica destination in under 2 hours.",
    },
    image: "/images/destinations/vuelos-privados.jpg",
    routeId: "panama-costa-rica",
    highlights: {
      es: ["Múltiples destinos", "Volcanes y playas", "Biodiversidad única", "Turismo de aventura"],
      en: ["Multiple destinations", "Volcanoes & beaches", "Unique biodiversity", "Adventure tourism"],
    },
  },
  {
    id: "medellin",
    pageId: "dest-medellin",
    name: { es: "Medellín", en: "Medellín" },
    description: {
      es: "Vuelo privado internacional a la ciudad de la eterna primavera. Ideal para viajes de negocios y turismo entre Panamá y Colombia.",
      en: "Private international flight to the city of eternal spring. Ideal for business and leisure trips between Panama and Colombia.",
    },
    image: "/images/hero/service-3.webp",
    routeId: "panama-medellin",
    highlights: {
      es: ["Ciudad de negocios", "Clima perfecto todo el año", "Gastronomía y cultura", "Conexión ejecutiva"],
      en: ["Business city", "Perfect year-round climate", "Gastronomy & culture", "Executive connection"],
    },
  },
  {
    id: "playa-tambor",
    pageId: "dest-playa-tambor",
    name: { es: "Playa Tambor", en: "Playa Tambor" },
    description: {
      es: "Destino de playa tranquilo en la Península de Nicoya, Costa Rica. Acceso directo sin las horas de carretera desde San José.",
      en: "Quiet beach destination in Costa Rica's Nicoya Peninsula. Direct access without hours of driving from San José.",
    },
    image: "/images/hero/service-4.webp",
    routeId: "panama-costa-rica",
    highlights: {
      es: ["Playa tranquila", "Surf y naturaleza", "Tortugas marinas", "Península de Nicoya"],
      en: ["Quiet beach", "Surf & nature", "Sea turtles", "Nicoya Peninsula"],
    },
  },
];

export function getDestination(id: string): Destination | undefined {
  return destinations.find((d) => d.id === id);
}

export function getDestinationByPageId(pageId: string): Destination | undefined {
  return destinations.find((d) => d.pageId === pageId);
}
