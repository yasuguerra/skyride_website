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
    faq: [
      {
        q: { es: "¿Cuánto tiempo dura el vuelo a Isla Contadora?", en: "How long is the flight to Contadora Island?" },
        a: { es: "Solo 20 minutos desde el Aeropuerto de Albrook, Ciudad de Panamá. Sin filas ni check-in.", en: "Just 20 minutes from Albrook Airport, Panama City. No lines or check-in required." },
      },
      {
        q: { es: "¿Es mejor el ferry o el vuelo privado a Contadora?", en: "Is the ferry or private flight better to Contadora?" },
        a: { es: "El ferry tarda 2–2.5 horas con riesgo de mareos y cancelaciones frecuentes. El vuelo privado llega en 20 minutos, sale a tu horario y el costo es comparable para grupos de 3 o más pasajeros.", en: "The ferry takes 2–2.5 hours with risk of seasickness and frequent cancellations. The private flight arrives in 20 minutes, departs on your schedule, and the cost is comparable for groups of 3 or more passengers." },
      },
      {
        q: { es: "¿Qué hacer en Isla Contadora?", en: "What to do on Contadora Island?" },
        a: { es: "Playas como Playa Larga y Playa Cacique (snorkel), avistamiento de ballenas de julio a octubre, kayak entre islas y gastronomía caribeña. La isla es pequeña — todo queda a minutos a pie.", en: "Beaches like Playa Larga and Playa Cacique (snorkeling), whale watching July–October, kayaking between islands, and Caribbean cuisine. The island is small — everything is minutes away on foot." },
      },
    ],
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
    faq: [
      {
        q: { es: "¿Cuánto tiempo tarda llegar a San Blas por carretera?", en: "How long does it take to reach San Blas by road?" },
        a: { es: "Entre 5 y 7 horas desde Ciudad de Panamá, incluyendo carretera de montaña con tramos de tierra. En temporada lluviosa el camino puede volverse intransitable. En avión privado, son 30 minutos.", en: "Between 5 and 7 hours from Panama City, including a mountain road with unpaved sections. During rainy season the road can become impassable. By private plane, it's 30 minutes." },
      },
      {
        q: { es: "¿Cuánto cuesta un vuelo privado a San Blas?", en: "How much does a private flight to San Blas cost?" },
        a: { es: "Desde $644 por grupo (no por persona). Para 4 pasajeros, el costo es $161 por persona — comparable o menor que el transporte terrestre más los traslados en lancha.", en: "From $644 per group (not per person). For 4 passengers, that's $161 per person — comparable to or less than ground transport plus boat transfers." },
      },
      {
        q: { es: "¿Cuál es la mejor época para visitar San Blas?", en: "What's the best time to visit San Blas?" },
        a: { es: "La temporada seca (diciembre–abril) ofrece mar tranquilo y excelente visibilidad para snorkel. Semana Santa y enero son las fechas más solicitadas — reserva con al menos dos semanas de anticipación.", en: "Dry season (December–April) offers calm seas and excellent snorkeling visibility. Holy Week and January are the most in-demand dates — book at least two weeks in advance." },
      },
    ],
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
    faq: [
      {
        q: { es: "¿Cuánto tiempo dura el vuelo privado de Panamá a Costa Rica?", en: "How long is the private flight from Panama to Costa Rica?" },
        a: { es: "Menos de 2 horas hasta San José, Playa Tambor o Guanacaste, sin escalas comerciales ni tiempo de check-in.", en: "Less than 2 hours to San José, Playa Tambor, or Guanacaste, with no commercial layovers or check-in time." },
      },
      {
        q: { es: "¿A qué destinos en Costa Rica pueden volar?", en: "What destinations in Costa Rica can you fly to?" },
        a: { es: "Operamos vuelos directos a San José (Juan Santamaría), Playa Tambor, Guanacaste y otros aeropuertos privados según el destino final del pasajero.", en: "We operate direct flights to San José (Juan Santamaría), Playa Tambor, Guanacaste, and other private airfields depending on the passenger's final destination." },
      },
      {
        q: { es: "¿Qué aeronaves operan la ruta Panamá–Costa Rica?", en: "What aircraft operate the Panama–Costa Rica route?" },
        a: { es: "La ruta opera con Cessna Grand Caravan (hasta 12 pasajeros), King Air F90 (6 pasajeros) y King Air 200 (hasta 8 pasajeros), según el tamaño del grupo y el equipaje.", en: "The route operates with Cessna Grand Caravan (up to 12 passengers), King Air F90 (6 passengers), and King Air 200 (up to 8 passengers), depending on group size and luggage." },
      },
    ],
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
    faq: [
      {
        q: { es: "¿Cuánto tiempo tarda el viaje en bus o auto a Bocas del Toro?", en: "How long is the bus or car trip to Bocas del Toro?" },
        a: { es: "En bus más de 10 horas, en auto unas 6 horas por carretera de montaña. En vuelo privado, llegas en 1 hora y 35 minutos directamente al aeropuerto de Isla Colón.", en: "By bus over 10 hours, by car about 6 hours on mountain roads. By private flight, you land in 1 hour 35 minutes directly at Isla Colón airport." },
      },
      {
        q: { es: "¿Qué playas y actividades tiene Bocas del Toro?", en: "What beaches and activities does Bocas del Toro have?" },
        a: { es: "Playa de las Estrellas, surf en Playa Bluff y Paunch, snorkel en Cayo Zapatilla, restaurantes sobre el agua en Isla Colón, tour de manglares y avistamiento de delfines en Dolphin Bay.", en: "Starfish Beach, surfing at Playa Bluff and Paunch, snorkeling at Cayo Zapatilla, overwater restaurants on Isla Colón, mangrove boat tours, and dolphin watching at Dolphin Bay." },
      },
      {
        q: { es: "¿Cuándo es la mejor temporada para visitar Bocas del Toro?", en: "What's the best season to visit Bocas del Toro?" },
        a: { es: "Septiembre–octubre y febrero–marzo tienen el mejor clima. Bocas es una zona lluviosa todo el año, por lo que se recomienda llevar impermeable independientemente de la temporada.", en: "September–October and February–March have the best weather. Bocas is a rainy area year-round, so a light rain jacket is recommended regardless of the season." },
      },
    ],
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
    faq: [
      {
        q: { es: "¿Cuánto tiempo dura el vuelo privado de Panamá a Medellín?", en: "How long is the private flight from Panama to Medellín?" },
        a: { es: "Aproximadamente 2 horas de vuelo directo sin escala. Sin el tiempo de check-in ni las conexiones de los vuelos comerciales.", en: "Approximately 2 hours of direct non-stop flight. No check-in time or connections required." },
      },
      {
        q: { es: "¿Necesito documentación especial para el vuelo internacional a Medellín?", en: "Do I need special documentation for the international flight to Medellín?" },
        a: { es: "Sí, se requiere pasaporte vigente y cumplir con los requisitos de entrada a Colombia. Sky Ride coordina el despacho internacional desde el Aeropuerto Internacional de Tocumen.", en: "Yes, a valid passport and compliance with Colombia's entry requirements are necessary. Sky Ride coordinates international dispatch from Tocumen International Airport." },
      },
      {
        q: { es: "¿Por qué elegir vuelo privado a Medellín en lugar de un vuelo comercial?", en: "Why choose a private flight to Medellín instead of a commercial flight?" },
        a: { es: "Sin filas, sin escalas, horario a tu medida y capacidad para hasta 8 pasajeros en una cabina presurizada. Ideal para ejecutivos, grupos y viajeros que valoran privacidad y eficiencia.", en: "No lines, no layovers, schedule on your terms, and capacity for up to 8 passengers in a pressurized cabin. Ideal for executives, groups, and travelers who value privacy and efficiency." },
      },
    ],
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
  {
    id: "panama-david",
    slug: "panama-david",
    origin: { es: "Ciudad de Panamá", en: "Panama City" },
    destination: { es: "David, Chiriquí", en: "David, Chiriquí" },
    flightTime: "55 min",
    distance: "470 km",
    startingPrice: 1200,
    currency: "USD",
    description: {
      es: "Vuelo privado directo a David, la capital de Chiriquí. Evite las 7 horas de carretera y llegue descansado a la puerta del Boquete, el Baru y las Tierras Altas. Ideal para viajes de negocios y escapadas de naturaleza.",
      en: "Direct private flight to David, Chiriquí's capital. Skip the 7-hour highway drive and arrive fresh at the gateway to Boquete, Baru volcano, and the Highlands. Perfect for business trips and nature escapes.",
    },
    aircraft: ["cessna-caravan", "daher-kodiak", "king-air-f90"],
    image: "/images/hero/skyride-vuelos-privados-panama.webp",
    highlights: {
      es: ["55 min de vuelo directo", "Puerta al Boquete y Baru", "Ideal para negocios", "Sin 7 horas de carretera"],
      en: ["55-min direct flight", "Gateway to Boquete & Baru", "Ideal for business", "Skip the 7-hour drive"],
    },
    faq: [
      {
        q: { es: "¿Cuánto tiempo ahorro viajando en avión privado vs. carretera a David?", en: "How much time do I save flying private vs. driving to David?" },
        a: { es: "El vuelo privado dura 55 minutos desde Albrook versus 6 a 7 horas por carretera. Llegas descansado directo a Chiriquí, sin el desgaste del trayecto terrestre.", en: "The private flight takes 55 minutes from Albrook vs. 6 to 7 hours by road. You arrive rested directly in Chiriuí, without the fatigue of the highway drive." },
      },
      {
        q: { es: "¿Qué hacer en David y las Tierras Altas de Chiriquí?", en: "What to do in David and the Chiriuí Highlands?" },
        a: { es: "Senderismo y tours de café en Boquete, ascenso al Volcán Barú (3,475 m, el punto más alto de Panamá), rafting en el Río Chiriquí, observación de aves (más de 400 especies) y Playa La Barqueta.", en: "Hiking and coffee tours in Boquete, ascent of Volcán Barú (3,475 m, Panama's highest point), rafting on the Chiriuí River, bird watching (over 400 species), and Playa La Barqueta." },
      },
      {
        q: { es: "¿Cuál es la mejor época para visitar las Tierras Altas de Chiriquí?", en: "What's the best time to visit the Chiriuí Highlands?" },
        a: { es: "Diciembre a mayo (temporada seca) es la época ideal. Boquete tiene clima fresco todo el año con temperatura promedio de 19°C, pero los meses secos ofrecen mejores condiciones para senderismo.", en: "December through May (dry season) is ideal. Boquete has cool weather year-round with an average of 19°C, but the dry months offer the best conditions for hiking and outdoor activities." },
      },
    ],
  },
  {
    id: "panama-pedasi",
    slug: "panama-pedasi",
    origin: { es: "Ciudad de Panamá", en: "Panama City" },
    destination: { es: "Pedásí, Azuero", en: "Pedásí, Azuero" },
    flightTime: "40 min",
    distance: "230 km",
    startingPrice: 750,
    currency: "USD",
    description: {
      es: "Vuelo privado a Pedásí, el corazón surf de la Península de Azuero. Playas vírgenes, tortugas marinas y el Panamá más auténtico a solo 40 minutos de vuelo. Sin las 4 horas de carretera.",
      en: "Private flight to Pedásí, the surf heart of the Azuero Peninsula. Pristine beaches, sea turtles, and the most authentic Panama — just 40 minutes away by air. No 4-hour highway drive.",
    },
    aircraft: ["cessna-206", "piper-azteca", "daher-kodiak"],
    image: "/images/hero/service-4.webp",
    highlights: {
      es: ["40 min de vuelo directo", "Surf y tortugas marinas", "Panamá rural auténtico", "Sin 4 horas de carretera"],
      en: ["40-min direct flight", "Surf & sea turtles", "Authentic rural Panama", "Skip the 4-hour drive"],
    },
    faq: [
      {
        q: { es: "¿Cuánto tiempo dura el vuelo a Pedasí?", en: "How long is the flight to Pedasí?" },
        a: { es: "40 minutos desde Albrook versus 4 horas por carretera — un ahorro de tiempo considerable para llegar a la Península de Azuero.", en: "40 minutes from Albrook vs. 4 hours by road — a significant time saving to reach the Azuero Peninsula." },
      },
      {
        q: { es: "¿Cuáles son las mejores playas de Pedasí?", en: "What are the best beaches near Pedasí?" },
        a: { es: "Playa El Toro (surf), Playa Los Destiladeros (snorkel y tortugas marinas), Playa Venao (surf, sede del campeonato nacional) e Isla Iguana, una reserva natural con arrecifes de coral en excelente estado.", en: "Playa El Toro (surf), Playa Los Destiladeros (snorkeling and sea turtles), Playa Venao (surf, national championship venue), and Isla Iguana, a nature reserve with excellent coral reefs." },
      },
      {
        q: { es: "¿Cuándo es la mejor temporada para surfear en Pedasí?", en: "When is the best surf season in Pedasí?" },
        a: { es: "La temporada de surf principal es diciembre–marzo en Playa El Toro y Playa Venao. Para avistamiento de tortugas marinas, la temporada es octubre–marzo en Playa Los Destiladeros.", en: "The main surf season is December–March at Playa El Toro and Playa Venao. For sea turtle watching, the season is October–March at Playa Los Destiladeros." },
      },
    ],
  },
];

export function getRoute(id: string): RouteData | undefined {
  return routes.find((r) => r.id === id);
}

export function getRouteBySlug(slug: string): RouteData | undefined {
  return routes.find((r) => r.slug === slug);
}
