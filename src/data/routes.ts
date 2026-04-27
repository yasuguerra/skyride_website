export interface RouteSection {
  id: string;
  heading: { es: string; en: string };
  body: { es: string; en: string };
  listItems?: { es: string; en: string }[];
}

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
  contentSections?: RouteSection[];
  faq?: { q: { es: string; en: string }; a: { es: string; en: string } }[];
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
    contentSections: [
      {
        id: "why-fly",
        heading: {
          es: "Vuelo privado vs. ferry a Contadora: la diferencia real",
          en: "Private flight vs. ferry to Contadora: the real difference",
        },
        body: {
          es: "El ferry a Contadora sale del Muelle Fiscal a las 8:00 AM y tarda entre 1 hora 30 minutos y 2 horas según el estado del mar — y puede cancelarse por mal tiempo. El vuelo privado desde Albrook dura exactamente 20 minutos, sale cuando usted decide y llega directamente a la pista de Contadora, a menos de 5 minutos a pie de la playa principal. Sin mareos, sin madrugar, sin cancelaciones de último minuto. Para grupos de 3 o más personas, la diferencia de precio frente al ferry es mínima comparada con las 2–3 horas extra que recupera en su día.",
          en: "The ferry to Contadora departs from Muelle Fiscal at 8:00 AM and takes 1.5 to 2 hours depending on sea conditions — and can be cancelled due to bad weather. The private flight from Albrook takes exactly 20 minutes, departs when you decide, and lands directly at Contadora's airstrip, less than 5 minutes' walk from the main beach. No seasickness, no early wake-ups, no last-minute cancellations. For groups of 3 or more, the price difference from the ferry is minimal compared to the 2–3 extra hours you reclaim in your day.",
        },
      },
      {
        id: "beaches",
        heading: {
          es: "Qué hacer en Isla Contadora",
          en: "What to do on Contadora Island",
        },
        body: {
          es: "Contadora es la más desarrollada del archipiélago de Las Perlas, con siete playas accesibles a pie, restaurantes, buceo y vida nocturna. Las playas principales:",
          en: "Contadora is the most developed island in the Las Perlas Archipelago, with seven beaches accessible on foot, restaurants, diving, and nightlife. The main beaches:",
        },
        listItems: [
          {
            es: "Playa Larga — la más extensa de la isla, arena dorada y aguas tranquilas, ideal para familias.",
            en: "Playa Larga — the longest beach on the island, golden sand and calm water, ideal for families.",
          },
          {
            es: "Playa Cacique — la más céntrica y animada, frente al pueblo principal.",
            en: "Playa Cacique — the most central and lively, facing the main village.",
          },
          {
            es: "Playa de las Suecas — la más tranquila y alejada, perfecta para parejas.",
            en: "Playa de las Suecas — the quietest and most secluded, perfect for couples.",
          },
          {
            es: "Playa Ejecutiva — la favorita para snorkel, con tortugas marinas y rayas.",
            en: "Playa Ejecutiva — the snorkeling favorite, with sea turtles and rays.",
          },
          {
            es: "Playa Galeón — ideal para kayak y paddle board, con aguas cristalinas.",
            en: "Playa Galeón — ideal for kayaking and paddleboarding, with crystal-clear water.",
          },
        ],
      },
      {
        id: "best-time",
        heading: {
          es: "Cuándo ir a Isla Contadora",
          en: "When to visit Contadora Island",
        },
        body: {
          es: "La temporada seca (diciembre–abril) ofrece el clima más estable: cielos despejados, mar en calma y visibilidad submarina excelente. Enero y febrero son los meses pico — reserve con al menos 2 semanas de anticipación. De mayo a noviembre hay más lluvia y el mar puede estar algo agitado, pero la isla está mucho menos concurrida y los precios de hospedaje son más bajos. Si lo que busca es un fin de semana tranquilo para dos personas, la temporada baja es perfecta. Los vuelos privados con Sky Ride operan los 365 días del año.",
          en: "The dry season (December–April) offers the most stable weather: clear skies, calm seas, and excellent underwater visibility. January and February are peak months — book at least 2 weeks in advance. May through November brings more rain and slightly rougher seas, but the island is far less crowded and accommodation prices are lower. If you're looking for a quiet weekend for two, the low season is ideal. Sky Ride private flights operate 365 days a year.",
        },
      },
      {
        id: "how-to-book",
        heading: {
          es: "Cómo reservar tu vuelo a Contadora",
          en: "How to book your flight to Contadora",
        },
        body: {
          es: "Reservar con Sky Ride es simple y rápido:",
          en: "Booking with Sky Ride is simple and fast:",
        },
        listItems: [
          {
            es: "Envíe un WhatsApp con su fecha, número de pasajeros y si viaja solo de ida o de ida y vuelta.",
            en: "Send a WhatsApp with your date, number of passengers, and whether you need a one-way or round-trip flight.",
          },
          {
            es: "Martín, nuestro asistente IA, le responde con opciones de aeronave y precios en menos de 10 minutos.",
            en: "Martín, our AI assistant, replies with aircraft options and prices in under 10 minutes.",
          },
          {
            es: "Confirme su reserva con un depósito. El saldo restante se paga el día del vuelo.",
            en: "Confirm your booking with a deposit. The remaining balance is paid on the day of the flight.",
          },
          {
            es: "Preséntese en Albrook 30 minutos antes del vuelo. Sin filas ni check-in.",
            en: "Arrive at Albrook 30 minutes before your flight. No lines or check-in.",
          },
          {
            es: "20 minutos de vuelo. Llegada directa a Isla Contadora.",
            en: "20 minutes of flight. Direct arrival at Contadora Island.",
          },
        ],
      },
    ],
    faq: [
      {
        q: { es: "¿Cuánto cuesta un vuelo privado a Isla Contadora?", en: "How much does a private flight to Contadora Island cost?" },
        a: { es: "Los vuelos privados a Contadora parten desde $398 por aeronave (no por persona). El precio final depende de la aeronave elegida y la fecha. Solicite una cotización exacta por WhatsApp en minutos.", en: "Private flights to Contadora start from $398 per aircraft (not per person). The final price depends on the aircraft chosen and the date. Request an exact quote via WhatsApp in minutes." },
      },
      {
        q: { es: "¿Cuánto tiempo dura el vuelo a Contadora?", en: "How long is the flight to Contadora?" },
        a: { es: "El vuelo desde la Ciudad de Panamá hasta Isla Contadora dura aproximadamente 20 minutos. En comparación, el ferry tarda entre 1 hora y media y 2 horas.", en: "The flight from Panama City to Contadora Island takes approximately 20 minutes. By comparison, the ferry takes 1.5 to 2 hours." },
      },
      {
        q: { es: "¿Desde qué aeropuerto salen los vuelos a Contadora?", en: "From which airport do flights to Contadora depart?" },
        a: { es: "Los vuelos privados a Contadora operan desde el Aeropuerto Marcos A. Gelabert (Albrook), en la Ciudad de Panamá.", en: "Private flights to Contadora operate from Marcos A. Gelabert Airport (Albrook) in Panama City." },
      },
      {
        q: { es: "¿Cuántas personas pueden volar en la misma aeronave?", en: "How many people can fly on the same aircraft?" },
        a: { es: "Según el avión: Cessna 172 (3 pax), Cessna 206 (5 pax), Piper Azteca (5 pax), Cessna Caravan (9 pax). Todos los asientos son para su grupo, sin pasajeros desconocidos.", en: "Depending on the aircraft: Cessna 172 (3 pax), Cessna 206 (5 pax), Piper Aztec (5 pax), Cessna Caravan (9 pax). All seats are for your group — no strangers on board." },
      },
      {
        q: { es: "¿Cómo se reserva un vuelo privado a Contadora con Sky Ride?", en: "How do I book a private flight to Contadora with Sky Ride?" },
        a: { es: "Envíe un mensaje de WhatsApp con su fecha, número de pasajeros y destino. Martín, nuestro asistente IA, le responde con opciones y precio en menos de 10 minutos.", en: "Send a WhatsApp message with your date, number of passengers, and destination. Martín, our AI assistant, replies with options and pricing in under 10 minutes." },
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
    contentSections: [
      {
        id: "why-fly",
        heading: {
          es: "Por qué volar a San Blas en avión privado",
          en: "Why fly to San Blas by private plane",
        },
        body: {
          es: "La ruta terrestre a San Blas implica salir antes del amanecer, 4 horas de carretera montañosa en 4x4 por caminos en mal estado, y luego entre 30 y 60 minutos adicionales en lancha. Con Sky Ride, parte desde el Aeropuerto Albrook (Marcos A. Gelabert) y aterriza en Guna Yala en apenas 30 minutos. Sin filas, sin mareos, sin desgaste físico. Mientras los demás llegan exhaustos, usted ya está nadando en aguas de 28°C. El avión privado no es solo comodidad — es la única forma de aprovechar al máximo cada hora de su día en el archipiélago.",
          en: "The overland route to San Blas means leaving before dawn, 4 hours of rough mountain road in a 4WD, then another 30–60 minutes by boat. With Sky Ride, you depart from Albrook Airport (Marcos A. Gelabert) and land in Guna Yala in just 30 minutes. No lines, no seasickness, no physical exhaustion. While everyone else arrives drained, you're already swimming in 28°C water. A private plane isn't just about comfort — it's the only way to make the most of every hour of your day on the archipelago.",
        },
      },
      {
        id: "islands",
        heading: {
          es: "Las mejores islas de San Blas para visitar",
          en: "The best islands to visit in San Blas",
        },
        body: {
          es: "San Blas (oficialmente Guna Yala) es un archipiélago de más de 365 islas, de las cuales solo unas 49 están habitadas. Su piloto puede coordinar el aterrizaje en la pista más cercana a las islas de su preferencia. Las más visitadas:",
          en: "San Blas (officially Guna Yala) is an archipelago of more than 365 islands, of which only about 49 are inhabited. Your pilot can coordinate landing at the airstrip closest to your preferred islands. The most visited:",
        },
        listItems: [
          {
            es: "Isla Perro (Dog Island) — la favorita para snorkel, con un avión sumergido a apenas metros de la orilla y arrecifes de coral intactos.",
            en: "Dog Island (Isla Perro) — the top snorkeling spot, with a sunken plane just meters from shore and pristine coral reefs.",
          },
          {
            es: "Isla Pelícano — pequeña, redonda y completamente rodeada de palmeras. Icónica para fotografías y perfecta para relajarse.",
            en: "Pelican Island (Isla Pelícano) — tiny, round, and completely fringed by palm trees. Iconic for photos and perfect for relaxation.",
          },
          {
            es: "Isla Tigre — comunidad Guna activa con artesanías de molas, cocina local y cultura ancestral auténtica.",
            en: "Tigre Island — an active Guna community with mola handicrafts, local food, and genuine indigenous culture.",
          },
          {
            es: "Isla Aguja — aguas turquesas absolutas, ideal para parejas que buscan privacidad total.",
            en: "Needle Island (Isla Aguja) — absolute turquoise perfection, ideal for couples seeking complete privacy.",
          },
          {
            es: "El Porvenir — puerta de entrada principal al archipiélago, con la pista de aterrizaje más accesible y servicios básicos.",
            en: "El Porvenir — the main gateway to the archipelago, with the most accessible airstrip and basic services.",
          },
        ],
      },
      {
        id: "what-to-expect",
        heading: {
          es: "Qué esperar en San Blas",
          en: "What to expect in San Blas",
        },
        body: {
          es: "San Blas está protegido constitucionalmente por el pueblo Guna Yala, quienes administran sus propias normas de acceso. No hay hoteles de cadena ni resorts masivos. Las cabañas y palafitos sobre el mar son la opción de alojamiento principal — básicas, auténticas y completamente desconectadas. El snorkel es excepcional: arrecifes de coral intactos a menos de 5 metros de profundidad con tortugas, mantarrayas y centenares de peces de colores. La actividad principal es simplemente flotar y desconectarse. Lleve siempre efectivo (no hay cajeros automáticos en las islas), protector solar biodegradable (requerido por la comunidad Guna), ropa ligera, repelente de insectos y una tarjeta de turismo Guna ($20 USD por persona).",
          en: "San Blas is constitutionally protected territory of the Guna Yala indigenous people, who manage their own access rules. There are no chain hotels or large resorts. Overwater huts and palafitos are the main accommodation — basic, authentic, and completely off-grid. Snorkeling is exceptional: intact coral reefs less than 5 meters deep with sea turtles, rays, and hundreds of colorful fish. The main activity is simply floating and switching off. Always bring cash (no ATMs on the islands), biodegradable sunscreen (required by the Guna community), light clothing, insect repellent, and a Guna tourism card ($20 USD per person).",
        },
      },
      {
        id: "best-time",
        heading: {
          es: "Mejor época para visitar San Blas",
          en: "Best time to visit San Blas",
        },
        body: {
          es: "La temporada seca (diciembre–abril) es la más popular: los vientos alisios del norte crean condiciones ideales de navegación entre islas, el cielo está despejado y la visibilidad submarina es máxima. De mayo a noviembre el mar puede estar más agitado y hay mayor probabilidad de lluvia, pero el archipiélago está mucho menos concurrido y los precios de las cabañas son considerablemente más bajos. Los vuelos privados con Sky Ride operan durante todo el año — las condiciones meteorológicas afectan sobre todo a las lanchas entre islas, no al vuelo de 30 minutos desde Panamá.",
          en: "The dry season (December–April) is most popular: the northeastern trade winds create ideal inter-island boating conditions, skies are clear, and underwater visibility is at its best. May through November can bring choppier seas and more frequent rain, but the archipelago is far less crowded and cabin prices are significantly lower. Sky Ride private flights operate year-round — weather conditions affect inter-island boat rides far more than the 30-minute flight from Panama.",
        },
      },
      {
        id: "how-to-book",
        heading: {
          es: "Cómo reservar tu vuelo privado a San Blas",
          en: "How to book your private flight to San Blas",
        },
        body: {
          es: "El proceso es simple y toma menos de 10 minutos:",
          en: "The process is simple and takes less than 10 minutes:",
        },
        listItems: [
          {
            es: "Envíe un WhatsApp con su fecha de viaje, número de pasajeros e islas que desea visitar.",
            en: "Send a WhatsApp with your travel date, number of passengers, and the islands you want to visit.",
          },
          {
            es: "Martín, nuestro asistente IA, le confirma disponibilidad de aeronaves y precio exacto en minutos.",
            en: "Martín, our AI assistant, confirms aircraft availability and exact price in minutes.",
          },
          {
            es: "Seleccione su aeronave (Cessna 172, 206, Caravan o Kodiak según su grupo) y pague el depósito para asegurar la fecha.",
            en: "Choose your aircraft (Cessna 172, 206, Caravan, or Kodiak depending on your group size) and pay the deposit to secure the date.",
          },
          {
            es: "El día del vuelo: llegue a Albrook 30 minutos antes. Sin cola, sin mostrador, sin esperas.",
            en: "On the day of your flight: arrive at Albrook 30 minutes early. No line, no check-in counter, no waiting.",
          },
          {
            es: "30 minutos de vuelo sobre la selva del Darién. Llegada a Guna Yala.",
            en: "30 minutes flying over the Darién jungle. Arrival in Guna Yala.",
          },
        ],
      },
    ],
    faq: [
      {
        q: { es: "¿Cuánto cuesta volar a San Blas desde Panamá?", en: "How much does it cost to fly to San Blas from Panama?" },
        a: { es: "Los vuelos privados a San Blas comienzan desde $644 por aeronave. El precio es por el avión completo, no por persona, e incluye todos los asientos para su grupo.", en: "Private flights to San Blas start from $644 per aircraft. The price is for the entire plane, not per person, and includes all seats for your group." },
      },
      {
        q: { es: "¿Por qué volar a San Blas en lugar de ir por tierra?", en: "Why fly to San Blas instead of taking the land route?" },
        a: { es: "La ruta terrestre a San Blas implica 4 horas de carretera en mal estado más una lancha de 30–60 minutos. El vuelo privado dura 30 minutos directamente sobre la selva del Darién, sin desgaste físico.", en: "The overland route to San Blas involves 4 hours on rough roads plus a 30–60 minute boat ride. The private flight takes 30 minutes directly over the Darién jungle, with no physical fatigue." },
      },
      {
        q: { es: "¿Cuánto dura el vuelo a San Blas?", en: "How long is the flight to San Blas?" },
        a: { es: "El vuelo desde Albrook (Ciudad de Panamá) a San Blas dura aproximadamente 30 minutos.", en: "The flight from Albrook (Panama City) to San Blas takes approximately 30 minutes." },
      },
      {
        q: { es: "¿Hay aeropuerto en San Blas?", en: "Is there an airport in San Blas?" },
        a: { es: "Sí. Hay varias pistas de aterrizaje en Guna Yala, las principales en El Porvenir, Achutupo y Ogobsucum. Su piloto le indicará en cuál aterriza según las islas que visitará.", en: "Yes. There are several airstrips in Guna Yala, the main ones at El Porvenir, Achutupo, and Ogobsucum. Your pilot will indicate which one you land at based on the islands you plan to visit." },
      },
      {
        q: { es: "¿Cómo reservo un vuelo privado a San Blas?", en: "How do I book a private flight to San Blas?" },
        a: { es: "Escríbanos por WhatsApp con su fecha y número de pasajeros. Martín, nuestro asistente IA, le da opciones de aeronave y precios en menos de 10 minutos.", en: "Message us on WhatsApp with your date and number of passengers. Martín, our AI assistant, gives you aircraft options and prices in under 10 minutes." },
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
        q: { es: "¿Cuánto cuesta un vuelo privado de Panamá a Costa Rica?", en: "How much does a private flight from Panama to Costa Rica cost?" },
        a: { es: "Los vuelos privados entre Panamá y Costa Rica parten desde $3,400 por aeronave. El precio varía según el destino en Costa Rica (San José, Guanacaste, Tambor) y la aeronave elegida.", en: "Private flights between Panama and Costa Rica start from $3,400 per aircraft. The price varies by destination in Costa Rica (San José, Guanacaste, Tambor) and the aircraft chosen." },
      },
      {
        q: { es: "¿Cuánto dura el vuelo privado de Panamá a Costa Rica?", en: "How long is the private flight from Panama to Costa Rica?" },
        a: { es: "El vuelo directo desde la Ciudad de Panamá dura aproximadamente 1 hora 45 minutos, dependiendo del destino en Costa Rica.", en: "The direct flight from Panama City takes approximately 1 hour 45 minutes, depending on the destination in Costa Rica." },
      },
      {
        q: { es: "¿A qué aeropuertos de Costa Rica pueden volar?", en: "Which airports in Costa Rica can you fly to?" },
        a: { es: "Operamos vuelos privados a San José (Tobías Bolaños), Guanacaste (Daniel Oduber), Playa Tambor, Nosara y otros aeropuertos regionales según disponibilidad.", en: "We operate private flights to San José (Tobías Bolaños), Guanacaste (Daniel Oduber), Playa Tambor, Nosara, and other regional airports subject to availability." },
      },
      {
        q: { es: "¿Necesito pasaporte para volar de Panamá a Costa Rica?", en: "Do I need a passport to fly from Panama to Costa Rica?" },
        a: { es: "Sí. Al ser un vuelo internacional, todos los pasajeros deben presentar pasaporte vigente. Nuestro equipo le orientará sobre los trámites migratorios necesarios.", en: "Yes. As an international flight, all passengers must present a valid passport. Our team will guide you through the necessary immigration procedures." },
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
        q: { es: "¿Cuánto cuesta un vuelo privado a Bocas del Toro?", en: "How much does a private flight to Bocas del Toro cost?" },
        a: { es: "Los vuelos privados a Bocas del Toro parten desde $1,605 por aeronave. El precio es por el avión completo para su grupo, sin otros pasajeros.", en: "Private flights to Bocas del Toro start from $1,605 per aircraft. The price is for the entire plane for your group, with no other passengers." },
      },
      {
        q: { es: "¿Cuánto dura el vuelo de Panamá a Bocas del Toro?", en: "How long is the flight from Panama to Bocas del Toro?" },
        a: { es: "El vuelo privado desde la Ciudad de Panamá hasta Bocas del Toro dura aproximadamente 1 hora 35 minutos, dependiendo de las condiciones del tiempo.", en: "The private flight from Panama City to Bocas del Toro takes approximately 1 hour 35 minutes, depending on weather conditions." },
      },
      {
        q: { es: "¿Qué aeronaves están disponibles para la ruta a Bocas del Toro?", en: "Which aircraft are available for the Bocas del Toro route?" },
        a: { es: "Para esta ruta operamos con Cessna Caravan (9 pax), Daher Kodiak (9 pax) y Piper Azteca (5 pax), todos con capacidad para manejar la pista de Bocas.", en: "For this route we operate the Cessna Caravan (9 pax), Daher Kodiak (9 pax), and Piper Aztec (5 pax), all capable of handling the Bocas airstrip." },
      },
      {
        q: { es: "¿Cuál es la mejor época para visitar Bocas del Toro?", en: "What is the best time to visit Bocas del Toro?" },
        a: { es: "La mejor época es de septiembre a octubre y de marzo a abril, cuando el clima es más estable. La temporada alta es de diciembre a marzo para los amantes del surf.", en: "The best time is September–October and March–April when weather is most stable. Peak surf season runs December–March." },
      },
    ],
    contentSections: [
      {
        id: "why-fly-bocas",
        heading: {
          es: "Por qué volar a Bocas del Toro en avión privado",
          en: "Why fly to Bocas del Toro by private plane",
        },
        body: {
          es: "La ruta terrestre a Bocas del Toro desde la Ciudad de Panamá implica cruzar la Cordillera Central: mínimo 6 horas en auto, o más de 10 horas en autobús, por carreteras de montaña con curvas cerradas. Con Sky Ride, partes de Albrook y aterrizas directamente en Isla Colón en 1 hora. Sin montaña, sin mareo, sin desgaste físico. Y con vistas del Darién desde el aire que por sí solas ya valen el viaje.",
          en: "The overland route to Bocas del Toro from Panama City means crossing the Central Cordillera: at least 6 hours by car, or over 10 hours by bus, through winding mountain roads. With Sky Ride, you depart from Albrook and land directly on Isla Colón in 1 hour. No mountains, no motion sickness, no exhaustion. Plus aerial views of the Darién that are worth the trip on their own.",
        },
      },
      {
        id: "bocas-islands",
        heading: {
          es: "Las mejores islas y playas de Bocas del Toro",
          en: "The best islands and beaches in Bocas del Toro",
        },
        body: {
          es: "El archipiélago de Bocas del Toro está formado por 9 islas principales y decenas de cayos menores. Las más visitadas:",
          en: "The Bocas del Toro archipelago consists of 9 main islands and dozens of smaller cays. The most visited:",
        },
        listItems: [
          {
            es: "Isla Colón — el corazón del archipiélago. Aquí está el aeropuerto, la vida nocturna, restaurantes sobre el agua y acceso a todas las demás islas.",
            en: "Isla Colón — the heart of the archipelago. Home to the airport, nightlife, overwater restaurants, and access to all other islands.",
          },
          {
            es: "Playa de las Estrellas (Starfish Beach) — playa protegida llena de estrellas de mar en aguas cristalinas poco profundas. Icónica para fotografías.",
            en: "Starfish Beach (Playa de las Estrellas) — sheltered beach full of starfish in shallow crystal waters. The most photographed spot in Bocas.",
          },
          {
            es: "Playa Bluff — la playa favorita de los surfistas. Olas potentes de hasta 3 metros, perfectas para todos los niveles. También punto de anidación de tortugas (julio–septiembre).",
            en: "Playa Bluff — the surfers' favorite. Powerful waves up to 3 meters, great for all levels. Also a sea turtle nesting site (July–September).",
          },
          {
            es: "Cayo Zapatilla — Parque Nacional marino con arrecifes de coral intactos, tortugas y peces tropicales. Snorkel de clase mundial.",
            en: "Cayo Zapatilla — Marine National Park with pristine coral reefs, sea turtles, and tropical fish. World-class snorkeling.",
          },
          {
            es: "Isla Bastimentos — la isla más grande y menos turística. Naturaleza pura, manglares y el pueblo afrocaribeño de Old Bank.",
            en: "Isla Bastimentos — the largest and least touristy island. Pure nature, mangroves, and the Afro-Caribbean village of Old Bank.",
          },
        ],
      },
      {
        id: "bocas-best-time",
        heading: {
          es: "Mejor época para visitar Bocas del Toro",
          en: "Best time to visit Bocas del Toro",
        },
        body: {
          es: "Bocas del Toro tiene un clima tropical húmedo con lluvia durante gran parte del año, pero eso no significa que el viaje no valga la pena en cualquier época. Las temporadas más secas y populares son septiembre–octubre (la \"mini veranillo de San Juan\") y febrero–marzo. La temporada alta de surf es diciembre–marzo, cuando los swell del norte llegan a Playa Bluff. Para snorkel y buceo en Cayo Zapatilla, septiembre–octubre ofrece la mejor visibilidad submarina. Los vuelos privados con Sky Ride operan todo el año — la lluvia afecta más a las lanchas entre islas que al vuelo desde Panamá.",
          en: "Bocas del Toro has a humid tropical climate with rain for much of the year, but that doesn't mean the trip isn't worthwhile at any time. The driest and most popular periods are September–October (the 'veranillo' dry spell) and February–March. Peak surf season is December–March when north swells hit Playa Bluff. For snorkeling and diving at Cayo Zapatilla, September–October offers the best underwater visibility. Sky Ride private flights operate year-round — rain affects inter-island boats far more than the flight from Panama.",
        },
      },
      {
        id: "bocas-how-to-book",
        heading: {
          es: "Cómo reservar tu vuelo privado a Bocas del Toro",
          en: "How to book your private flight to Bocas del Toro",
        },
        body: {
          es: "El proceso toma menos de 10 minutos:",
          en: "The process takes under 10 minutes:",
        },
        listItems: [
          {
            es: "Envíe un WhatsApp con su fecha, número de pasajeros y preferencia de aeronave.",
            en: "Send a WhatsApp with your date, number of passengers, and aircraft preference.",
          },
          {
            es: "Martín, nuestro asistente IA, le confirma disponibilidad y precio exacto de inmediato.",
            en: "Martín, our AI assistant, immediately confirms availability and exact price.",
          },
          {
            es: "Seleccione su aeronave (Piper Azteca para grupos de 5, Kodiak o Caravan para grupos de hasta 9–12) y pague el depósito.",
            en: "Choose your aircraft (Piper Azteca for groups of 5, Kodiak or Caravan for groups up to 9–12) and pay the deposit.",
          },
          {
            es: "El día del vuelo: llegue a Albrook 30 minutos antes. Sin fila, sin mostrador, sin esperas.",
            en: "On the day of your flight: arrive at Albrook 30 minutes early. No line, no check-in counter, no waiting.",
          },
          {
            es: "1 hora de vuelo sobre el Darién y la costa caribeña. Aterrizaje en Isla Colón.",
            en: "1 hour over the Darién and Caribbean coast. Landing on Isla Colón.",
          },
        ],
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
