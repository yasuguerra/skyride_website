export type Locale = "es" | "en";

type Service = {
  title: string;
  description: string;
  badge: string;
};

type Route = {
  route: string;
  detail: string;
  price: string;
  slug: string;
};

type Testimonial = {
  quote: string;
  name: string;
  service: string;
};

type Experience = {
  image: string;
  alt: string;
  category: string;
  caption: string;
};

type HomeContent = {
  localeLabel: string;
  switchHref: string;
  switchLabel: string;
  nav: { label: string; href: string }[];
  sections: {
    servicesLabel: string;
    servicesTitle: string;
    servicesWhatsapp: string;
    routesLabel: string;
    routesTitle: string;
    routesDescription: string;
    routesCta: string;
    routesViewAll: string;
    testimonialsLabel: string;
    testimonialsTitle: string;
    ctaLabel: string;
    callNow: string;
    fleetLabel: string;
    fleetTitle: string;
    fleetCta: string;
    reviewSummary: string;
    noCreditCard: string;
    replyTime: string;
    experiencesLabel: string;
    experiencesTitle: string;
    experiencesCta: string;
    blogLabel: string;
    blogTitle: string;
    blogViewAll: string;
    fleetViewAll: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    stats: { label: string; value: string }[];
    steps: string[];
    trustInline: string[];
  };
  trust: string[];
  services: Service[];
  routes: Route[];
  testimonials: Testimonial[];
  experiences: Experience[];
  seoContent: {
    title: string;
    paragraphs: string[];
  };
  finalCta: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
  footer: {
    blurb: string;
    contact: string[];
  };
};

export const homeContent: Record<Locale, HomeContent> = {
  es: {
    localeLabel: "ES",
    switchHref: "/en",
    switchLabel: "View in English",
    sections: {
      servicesLabel: "Nuestros servicios",
      servicesTitle: "Tu aventura empieza en el aire.",
      servicesWhatsapp: "Cotizar por WhatsApp",
      routesLabel: "Rutas destacadas",
      routesTitle: "Vuelos directos al paraíso. Sin escalas. Sin estrés.",
      routesDescription: "Conectamos viajeros con vuelos regulares y chárter desde Ciudad de Panamá hacia las mejores islas, playas y destinos de Centroamérica.",
      routesCta: "Ver disponibilidad",
      routesViewAll: "Ver detalles de la ruta →",
      testimonialsLabel: "Testimonios",
      testimonialsTitle: "Más de 500 viajeros ya volaron con nosotros.",
      ctaLabel: "¿Listo para la aventura?",
      callNow: "Llamar",
      fleetLabel: "Nuestra flota",
      fleetTitle: "Red de operadores verificados. 13 aeronaves listas para volar.",
      fleetCta: "¿No sabes qué aeronave necesitas? Pregúntale a Martin →",
      reviewSummary: "4.9/5 de 127 reseñas",
      noCreditCard: "No necesitas tarjeta de crédito para cotizar.",
      replyTime: "Respondemos en menos de 10 min",
      experiencesLabel: "Experiencias reales",
      experiencesTitle: "Esto es lo que te espera.",
      experiencesCta: "Vive tu propia experiencia →",
      blogLabel: "Nuestro blog",
      blogTitle: "Guías, consejos y destinos.",
      blogViewAll: "Ver todos los artículos →",
      fleetViewAll: "Ver toda la flota →",
    },
    nav: [
      { label: "Servicios", href: "#services" },
      { label: "Rutas", href: "#routes" },      { label: "Flota", href: "/nuestra-flota" },
      { label: "Blog", href: "/blog" },      { label: "Testimonios", href: "#testimonials" },
      { label: "Contacto", href: "#contact" },
    ],
    hero: {
      eyebrow: "Vuelos privados en Panamá",
      title: "Reserva un vuelo privado en 60 segundos.",
      description:
        "Vuelos chárter, jet privado, tours en helicóptero y asientos compartidos a Contadora, San Blas, Bocas del Toro y Costa Rica. Cotiza al instante. Vuela hoy.",
      primaryCta: "Cotiza al instante",
      secondaryCta: "Ver rutas populares ↓",
      stats: [
        { label: "Vuelos completados", value: "500+" },
        { label: "Tiempo de respuesta", value: "< 10 min" },
        { label: "Destinos premium", value: "20+" },
      ],
      steps: [
        "Origen y destino",
        "Fecha y pasajeros",
        "Confirmación por WhatsApp",
      ],
      trustInline: ["✓ Operadores verificados", "✓ 500+ vuelos coordinados", "✓ Cotización instantánea"],
    },
    trust: ["Operadores verificados", "Pagos con Wompi", "Atención bilingüe", "Cobertura en Panamá y Costa Rica"],
    services: [
      {
        title: "Vuelos chárter",
        description: "Llega directo a tu destino en Panamá o Costa Rica. Perfecto para grupos, familias y escapadas de última hora.",
        badge: "Desde Ciudad de Panamá",
      },
      {
        title: "Paseos en helicóptero",
        description: "Sobrevuela la Ciudad de Panamá, el Canal y las islas del Pacífico. La experiencia favorita de nuestros viajeros.",
        badge: "Más popular",
      },
      {
        title: "Asientos disponibles",
        description: "Comparte un vuelo privado y viaja a precio accesible. Ideal para viajeros solos o parejas aventureras.",
        badge: "Alta demanda",
      },
    ],
    routes: [
      {
        route: "Panamá → Contadora",
        detail: "Escápate a la isla en solo 20 minutos. Playas cristalinas, snorkel y sol garantizado.",
        price: "Desde $398",
        slug: "panama-contadora",
      },
      {
        route: "Panamá → San Blas",
        detail: "Acceso directo al archipiélago Guna Yala. Islas vírgenes, hamacas y cabañas sobre el agua.",
        price: "Desde $644",
        slug: "panama-san-blas",
      },
      {
        route: "Panamá → Bocas del Toro",
        detail: "Vuelo directo al archipiélago caribeño. Playas, surf y naturaleza sin escalas comerciales.",
        price: "Desde $1,605",
        slug: "panama-bocas-del-toro",
      },
    ],
    testimonials: [
      {
        quote: "La atención fue inmediata y el vuelo a Contadora se cerró en minutos por WhatsApp.",
        name: "Carlos M.",
        service: "Chárter privado",
      },
      {
        quote: "El paseo en helicóptero fue impecable y la experiencia se sintió premium de principio a fin.",
        name: "Andrea R.",
        service: "Helicóptero",
      },
      {
        quote: "Reservamos un vuelo a San Blas y todo fue impecable. 100% recomendado.",
        name: "Roberto G.",
        service: "Chárter a San Blas",
      },
    ],
    experiences: [
      {
        image: "/images/Experiences/helicopter-tour-1.webp",
        alt: "Pasajera disfrutando un tour en helicóptero sobre Panamá",
        category: "Tour en Helicóptero",
        caption: "Vistas que cambian tu perspectiva.",
      },
      {
        image: "/images/Experiences/proposal-1.webp",
        alt: "Propuesta de matrimonio durante vuelo privado en Panamá",
        category: "Propuesta de Matrimonio",
        caption: "El sí más alto del mundo.",
      },
      {
        image: "/images/Experiences/helicopter-tour-2.webp",
        alt: "Experiencia en helicóptero sobre la Ciudad de Panamá",
        category: "Tour en Helicóptero",
        caption: "Panamá desde el cielo.",
      },
      {
        image: "/images/Experiences/proposal-2.webp",
        alt: "Pareja celebrando propuesta de matrimonio en vuelo",
        category: "Experiencia Romántica",
        caption: "Momentos que duran para siempre.",
      },
    ],
    finalCta: {
      title: "El paraíso está a un vuelo de distancia.",
      description:
        "Dínos a dónde quieres ir, cuántos son y cuándo. Te armamos un plan de vuelo con precios en minutos.",
      primary: "Cotizar ahora",
      secondary: "Llamar al +507 6840 0045",
    },
    seoContent: {
      title: "Aviación privada en Panamá — ¿por qué volar con Sky Ride?",
      paragraphs: [
        "Sky Ride es el marketplace líder de vuelos privados y chárter en Panamá. Conectamos viajeros con una red verificada de operadores para ofrecer vuelos chárter, paseos en helicóptero sobre la Ciudad de Panamá y el Canal, y asientos compartidos en jet privado hacia Contadora, San Blas, Bocas del Toro, Costa Rica y Medellín. Cotiza tu vuelo privado en 60 segundos desde cualquier dispositivo, sin tarjeta de crédito y con respuesta en menos de 10 minutos por WhatsApp.",
        "Nuestra red incluye aviones monomotor y bimotor, turbopropulsores como el Daher Kodiak y el Cessna Grand Caravan, jets ejecutivos King Air para rutas internacionales, y helicópteros Robinson y Eurocopter para tours panorámicos. Precios reales transparentes desde $398 para vuelos privados a Contadora, $644 a San Blas, $1,605 a Bocas del Toro, $3,400 a Costa Rica, $5,500 a Medellín, $14,500 a República Dominicana y $18,500 a Miami. Cada cotización incluye aeronave, duración, capacidad y precio total — sin sorpresas.",
        "Ya sea que busques un jet charter para un viaje de negocios, un paseo en helicóptero sobre la Ciudad de Panamá para una ocasión especial, o un vuelo privado económico a las islas de Guna Yala, Sky Ride te arma el plan de vuelo ideal. Servicio bilingüe, operadores verificados, pagos con Wompi y más de 500 vuelos coordinados. El paraíso está a un vuelo de distancia.",
      ],
    },
    footer: {
      blurb: "Sky Ride conecta viajeros con vuelos chárter, tours en helicóptero y rutas directas a las mejores playas e islas de Panamá y Costa Rica.",
      contact: ["+507 6840 0045", "info@skyride.city", "Ciudad de Panamá, Panamá"],
    },
  },
  en: {
    localeLabel: "EN",
    switchHref: "/",
    switchLabel: "Ver en Español",
    sections: {
      servicesLabel: "Our services",
      servicesTitle: "Your adventure starts in the air.",
      servicesWhatsapp: "Quote on WhatsApp",
      routesLabel: "Featured routes",
      routesTitle: "Direct flights to paradise. No layovers. No stress.",
      routesDescription: "We connect travelers with scheduled and charter flights from Panama City to the best islands, beaches, and destinations across Central America.",
      routesCta: "Check availability",
      routesViewAll: "View route details →",
      testimonialsLabel: "Testimonials",
      testimonialsTitle: "500+ travelers have flown with us.",
      ctaLabel: "Ready for the adventure?",
      callNow: "Call now",
      fleetLabel: "Our fleet",
      fleetTitle: "Vetted operator network. 13 aircraft ready to fly.",
      fleetCta: "Not sure which aircraft? Ask Martin →",
      reviewSummary: "4.9/5 from 127 reviews",
      noCreditCard: "No credit card required to request a quote.",
      replyTime: "We reply in under 10 min",
      experiencesLabel: "Real experiences",
      experiencesTitle: "This is what awaits you.",
      experiencesCta: "Live your own experience \u2192",
      blogLabel: "Our blog",
      blogTitle: "Guides, tips & destinations.",
      blogViewAll: "View all articles →",
      fleetViewAll: "View full fleet →",
    },
    nav: [
      { label: "Services", href: "#services" },
      { label: "Routes", href: "#routes" },
      { label: "Fleet", href: "/en/our-fleet" },
      { label: "Blog", href: "/en/blog" },
      { label: "Reviews", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      eyebrow: "Private flights in Panama",
      title: "Book a private flight in 60 seconds.",
      description:
        "Charter flights, private jet charter, helicopter tours, and shared seats to Contadora, San Blas, Bocas del Toro, and Costa Rica. Instant quotes. Fly today.",
      primaryCta: "Get an Instant Quote",
      secondaryCta: "View popular routes ↓",
      stats: [
        { label: "Flights completed", value: "500+" },
        { label: "Response time", value: "< 10 min" },
        { label: "Premium destinations", value: "20+" },
      ],
      steps: [
        "Origin and destination",
        "Date and passengers",
        "WhatsApp confirmation",
      ],
      trustInline: ["✓ Vetted Operators", "✓ 500+ Flights Booked", "✓ Instant Quotes"],
    },
    trust: ["Vetted operators", "Wompi payments", "Bilingual service", "Panama and Costa Rica coverage"],
    services: [
      {
        title: "Charter flights",
        description: "Fly direct to your destination in Panama or Costa Rica. Perfect for groups, families, and last-minute getaways.",
        badge: "Based in Panama City",
      },
      {
        title: "Helicopter tours",
        description: "Soar over Panama City, the Canal, and the Pacific islands. Our travelers' favorite experience.",
        badge: "Best seller",
      },
      {
        title: "Available seats",
        description: "Share a private flight and travel at an accessible price. Great for solo travelers and adventurous couples.",
        badge: "High demand",
      },
    ],
    routes: [
      {
        route: "Panama → Contadora",
        detail: "Escape to the island in just 20 minutes. Crystal-clear beaches, snorkeling, and guaranteed sunshine.",
        price: "From $398",
        slug: "panama-contadora",
      },
      {
        route: "Panama → San Blas",
        detail: "Direct access to the Guna Yala archipelago. Pristine islands, hammocks, and overwater cabins.",
        price: "From $644",
        slug: "panama-san-blas",
      },
      {
        route: "Panama → Bocas del Toro",
        detail: "Direct flight to the Caribbean archipelago. Beaches, surf, and nature with no commercial layovers.",
        price: "From $1,605",
        slug: "panama-bocas-del-toro",
      },
    ],
    testimonials: [
      {
        quote: "The team replied immediately and we confirmed our Contadora flight in just a few minutes via WhatsApp.",
        name: "Carlos M.",
        service: "Private charter",
      },
      {
        quote: "The helicopter experience was flawless — it felt premium, safe, and unforgettable from start to finish.",
        name: "Andrea R.",
        service: "Helicopter tour",
      },
      {
        quote: "We booked a flight to San Blas and everything was impeccable. 100% recommended.",
        name: "Roberto G.",
        service: "Charter to San Blas",
      },
    ],
    experiences: [
      {
        image: "/images/Experiences/helicopter-tour-1.webp",
        alt: "Passenger enjoying a helicopter tour over Panama",
        category: "Helicopter Tour",
        caption: "Views that change your perspective.",
      },
      {
        image: "/images/Experiences/proposal-1.webp",
        alt: "Marriage proposal during a private flight in Panama",
        category: "Marriage Proposal",
        caption: "The highest yes in the world.",
      },
      {
        image: "/images/Experiences/helicopter-tour-2.webp",
        alt: "Helicopter experience over Panama City",
        category: "Helicopter Tour",
        caption: "Panama from the sky.",
      },
      {
        image: "/images/Experiences/proposal-2.webp",
        alt: "Couple celebrating proposal on a private flight",
        category: "Romantic Experience",
        caption: "Moments that last forever.",
      },
    ],
    finalCta: {
      title: "Paradise is just one flight away.",
      description:
        "Tell us where you want to go, how many you are, and when. We’ll put together a flight plan with pricing in minutes.",
      primary: "Get a Quote Now",
      secondary: "Call +507 6840 0045",
    },
    seoContent: {
      title: "Private aviation in Panama — why fly with Sky Ride?",
      paragraphs: [
        "Sky Ride is the leading marketplace for private charter flights and helicopter tours in Panama. We connect travelers with a vetted network of operators for private jet charter flights, helicopter tours over Panama City and the Canal, and shared-seat flights to Contadora, San Blas, Bocas del Toro, Costa Rica and Medellín. Book a private flight in 60 seconds from any device — no credit card required and WhatsApp response in under 10 minutes.",
        "Our network includes single- and twin-engine airplanes, turboprops like the Daher Kodiak and Cessna Grand Caravan, King Air executive jets for international routes, and Robinson and Eurocopter helicopters for scenic tours. Transparent real pricing: from $398 to Contadora, $644 to San Blas, $1,605 to Bocas del Toro, $3,400 to Costa Rica, $5,500 to Medellín, $14,500 to the Dominican Republic and $18,500 to Miami. Every quote includes aircraft, flight time, capacity and total price — no surprises.",
        "Whether you’re looking for a private jet charter for a business trip, a Panama City helicopter ride for a special occasion, or an affordable private flight to the San Blas islands, Sky Ride builds the ideal flight plan for you. Bilingual service, vetted operators, Wompi payments and 500+ flights coordinated. Paradise is just one flight away.",
      ],
    },
    footer: {
      blurb: "Sky Ride connects travelers with charter flights, helicopter tours, and direct routes to the best beaches and islands in Panama and Costa Rica.",
      contact: ["+507 6840 0045", "info@skyride.city", "Panama City, Panama"],
    },
  },
};

export const whatsappHref =
  "https://wa.me/15557298766?text=Hola%20Sky%20Ride%2C%20quiero%20cotizar%20un%20vuelo.";