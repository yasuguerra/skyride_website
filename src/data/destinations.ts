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
    id: "san-blas",
    pageId: "dest-san-blas",
    name: { es: "San Blas (Guna Yala)", en: "San Blas Islands" },
    description: {
      es: "El archipiélago más virgen del Caribe panameño. Más de 365 islas con arenas blancas y aguas turquesas a solo 30 minutos de vuelo desde Panamá. Sin carretera de 4 horas.",
      en: "Panama's most pristine Caribbean archipelago. Over 365 islands with white sand and turquoise waters just 30 minutes from Panama City. Skip the 4-hour road trip.",
    },
    image: "/images/destinations/sanblas-catamaran.jpg",
    routeId: "panama-san-blas",
    highlights: {
      es: ["30 min de vuelo directo", "365+ islas vírgenes", "Snorkel con tortugas", "Cultura Guna Yala"],
      en: ["30-min direct flight", "365+ virgin islands", "Snorkeling with turtles", "Guna Yala culture"],
    },
  },
  {
    id: "bocas-del-toro",
    pageId: "dest-bocas-del-toro",
    name: { es: "Bocas del Toro", en: "Bocas del Toro" },
    description: {
      es: "El archipiélago caribeño más buscado de Panamá. Surf, manglares, vida marina única y playas blancas a solo 1 hora de vuelo. Sin las 6–10 horas de carretera por la Cordillera.",
      en: "Panama's most sought-after Caribbean archipelago. Surf, mangroves, unique marine life, and white sand beaches just 1 hour by private flight. Skip the 6–10 hour mountain drive.",
    },
    image: "/images/destinations/Bocas del Toro.jpg",
    routeId: "panama-bocas-del-toro",
    highlights: {
      es: ["1h de vuelo directo", "Surf en Playa Bluff", "Cayo Zapatilla (snorkel)", "Sin 10 horas de carretera"],
      en: ["1-hour direct flight", "Surf at Playa Bluff", "Cayo Zapatilla snorkeling", "Skip the 10-hour drive"],
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
  {
    id: "david",
    pageId: "dest-david",
    name: { es: "David, Chiriquí", en: "David, Chiriquí" },
    description: {
      es: "La segunda ciudad de Panamá y puerta de entrada a la Cordillera de Chiriquí, el Baru y Boquete. A solo 55 minutos de vuelo desde la Ciudad de Panamá, con cero embotellamientos y sin 7 horas de carretera.",
      en: "Panama's second city and gateway to the Chiriquí Highlands, Baru volcano, and Boquete. Just 55 minutes by private flight from Panama City — no highway traffic, no 7-hour drive.",
    },
    image: "/images/hero/skyride-vuelos-privados-panama.webp",
    routeId: "panama-david",
    highlights: {
      es: ["Puerta al Boquete", "Volcán Barú", "Clima montañoso", "Sin 7 horas de carretera"],
      en: ["Gateway to Boquete", "Barú Volcano", "Mountain climate", "Skip the 7-hour drive"],
    },
  },
  {
    id: "pedasi",
    pageId: "dest-pedasi",
    name: { es: "Pedásí, Azuero", en: "Pedásí, Azuero" },
    description: {
      es: "El secreto mejor guardado de la Peninsula de Azuero: playas de surf virgen, tortugas marinas y el auténtico Panamá rural. A 40 minutos de vuelo privado desde Ciudad de Panamá. Sin las 4 horas de carretera.",
      en: "The best-kept secret of the Azuero Peninsula: pristine surf beaches, sea turtles, and authentic rural Panama. Just 40 minutes by private flight from Panama City. No 4-hour highway drive.",
    },
    image: "/images/hero/service-4.webp",
    routeId: "panama-pedasi",
    highlights: {
      es: ["Surf virgen", "Tortugas marinas", "Panamá auténtico", "Sin 4 horas de carretera"],
      en: ["Pristine surf", "Sea turtles", "Authentic Panama", "Skip the 4-hour drive"],
    },
  },
];

export function getDestination(id: string): Destination | undefined {
  return destinations.find((d) => d.id === id);
}

export function getDestinationByPageId(pageId: string): Destination | undefined {
  return destinations.find((d) => d.pageId === pageId);
}
