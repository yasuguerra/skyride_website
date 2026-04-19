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
};

type Testimonial = {
  quote: string;
  name: string;
  service: string;
};

type HomeContent = {
  localeLabel: string;
  switchHref: string;
  switchLabel: string;
  nav: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    stats: { label: string; value: string }[];
    steps: string[];
  };
  trust: string[];
  services: Service[];
  routes: Route[];
  testimonials: Testimonial[];
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
    nav: [
      { label: "Servicios", href: "#services" },
      { label: "Rutas", href: "#routes" },
      { label: "Testimonios", href: "#testimonials" },
      { label: "Contacto", href: "#contact" },
    ],
    hero: {
      eyebrow: "Aviacion privada premium en Panama",
      title: "Vuelos charter, helicoperos y rutas exclusivas que convierten interes en reservas.",
      description:
        "La nueva experiencia digital de Sky Ride Panama esta pensada para velocidad, confianza y cierres por WhatsApp desde el primer scroll.",
      primaryCta: "Cotizar por WhatsApp",
      secondaryCta: "Explorar rutas destacadas",
      stats: [
        { label: "Vuelos completados", value: "500+" },
        { label: "Tiempo promedio de respuesta", value: "< 10 min" },
        { label: "Destinos premium", value: "20+" },
      ],
      steps: [
        "Origen y destino",
        "Fecha y pasajeros",
        "Confirmacion por WhatsApp",
      ],
    },
    trust: ["DGAC ready", "Pagos con Wompi", "Atencion bilingue", "Operacion en Panama y Costa Rica"],
    services: [
      {
        title: "Vuelos charter",
        description: "Traslados ejecutivos y rutas privadas para negocios, turismo y grupos pequenos.",
        badge: "Desde Panama City",
      },
      {
        title: "Paseos en helicoptero",
        description: "Experiencias aereas memorables con enfoque visual, seguridad y conversion directa.",
        badge: "Top servicio",
      },
      {
        title: "Asientos disponibles",
        description: "Opciones mas accesibles para viajeros flexibles que buscan velocidad sin sacrificar confort.",
        badge: "Alta demanda",
      },
    ],
    routes: [
      {
        route: "Panama -> Contadora",
        detail: "Ideal para escapadas premium de fin de semana.",
        price: "Desde $950",
      },
      {
        route: "Panama -> San Blas",
        detail: "Tiempo reducido y acceso directo a experiencias exclusivas.",
        price: "Desde $1,250",
      },
      {
        route: "Panama -> Costa Rica",
        detail: "Ruta ejecutiva y turistica para clientes con itinerarios exigentes.",
        price: "Desde $3,400",
      },
    ],
    testimonials: [
      {
        quote: "La atencion fue inmediata y el vuelo a Contadora se cerro en minutos por WhatsApp.",
        name: "Carlos M.",
        service: "Charter privado",
      },
      {
        quote: "El paseo en helicoptero fue impecable y la experiencia se sintio premium de principio a fin.",
        name: "Andrea R.",
        service: "Helicoptero",
      },
    ],
    finalCta: {
      title: "Convirtamos esta base en el sitio que gana velocidad, SEO y ventas.",
      description:
        "Este primer corte ya establece la direccion visual y comercial. El siguiente paso es conectar slugs, contenido y rutas reales.",
      primary: "Iniciar cotizacion",
      secondary: "Ver version en ingles",
    },
    footer: {
      blurb: "Sky Ride Panama combina charter privado, helicopteros y rutas premium para viajeros que necesitan velocidad y confianza.",
      contact: ["+507 6840 0045", "info@skyride.city", "Panama City, Panama"],
    },
  },
  en: {
    localeLabel: "EN",
    switchHref: "/",
    switchLabel: "Ver en Espanol",
    nav: [
      { label: "Services", href: "#services" },
      { label: "Routes", href: "#routes" },
      { label: "Reviews", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      eyebrow: "Premium private aviation in Panama",
      title: "Charter flights, helicopter rides, and high-converting route pages for a stronger launch.",
      description:
        "This first build turns the PRD into a conversion-focused landing experience designed for fast load times, trust, and direct WhatsApp handoff.",
      primaryCta: "Quote on WhatsApp",
      secondaryCta: "Explore featured routes",
      stats: [
        { label: "Flights completed", value: "500+" },
        { label: "Average response time", value: "< 10 min" },
        { label: "Premium destinations", value: "20+" },
      ],
      steps: [
        "Origin and destination",
        "Date and passengers",
        "WhatsApp handoff",
      ],
    },
    trust: ["DGAC ready", "Wompi payments", "Bilingual service", "Panama and Costa Rica coverage"],
    services: [
      {
        title: "Charter flights",
        description: "Private air mobility for business, leisure, and time-sensitive itineraries.",
        badge: "Based in Panama City",
      },
      {
        title: "Helicopter rides",
        description: "Scenic and executive helicopter experiences with a clear premium positioning.",
        badge: "Best seller",
      },
      {
        title: "Available seats",
        description: "A lower-friction private aviation option for travelers seeking speed and comfort.",
        badge: "High intent",
      },
    ],
    routes: [
      {
        route: "Panama -> Contadora",
        detail: "Built for premium island getaways and short decision cycles.",
        price: "From $950",
      },
      {
        route: "Panama -> San Blas",
        detail: "Fast access to one of the region's strongest experiential routes.",
        price: "From $1,250",
      },
      {
        route: "Panama -> Costa Rica",
        detail: "Executive and leisure charter demand with stronger SEO upside.",
        price: "From $3,400",
      },
    ],
    testimonials: [
      {
        quote: "The team replied immediately and we confirmed our Contadora flight in a few minutes.",
        name: "Carlos M.",
        service: "Private charter",
      },
      {
        quote: "The helicopter experience felt polished, safe, and premium from the first touchpoint.",
        name: "Andrea R.",
        service: "Helicopter ride",
      },
    ],
    finalCta: {
      title: "This is the first step toward the fast, indexable, sales-driven site in the PRD.",
      description:
        "The next iteration should wire locale-aware routing, real content collections, and the booking funnel behind these sections.",
      primary: "Start a quote",
      secondary: "See Spanish version",
    },
    footer: {
      blurb: "Sky Ride Panama combines private charters, helicopter services, and premium destination routes for high-intent travelers.",
      contact: ["+507 6840 0045", "info@skyride.city", "Panama City, Panama"],
    },
  },
};

export const whatsappHref =
  "https://wa.me/50768400045?text=Hola%20Sky%20Ride%2C%20quiero%20cotizar%20un%20vuelo.";