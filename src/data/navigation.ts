import type { Locale } from "@/i18n/routing";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export function getNavigation(locale: Locale): NavItem[] {
  if (locale === "en") {
    return [
      {
        label: "Services",
        href: "#",
        children: [
          { label: "Charter Flights", href: "/en/charter-flights" },
          { label: "Helicopter Rides", href: "/en/helicopter-rides" },
          { label: "Available Seats", href: "/en/available-seats" },
          { label: "Business Flights", href: "/en/charter-flights-panama-personalized-experience" },
        ],
      },
      {
        label: "Destinations",
        href: "#",
        children: [
          { label: "Contadora Island", href: "/en/private-flight-to-contadora" },
          { label: "Costa Rica", href: "/en/private-flight-costa-rica" },
          { label: "Medellín", href: "/en/private-flights-to-medellin" },
          { label: "Playa Tambor", href: "/en/flights-to-playa-tambor" },
        ],
      },
      { label: "Our Fleet", href: "/en/our-fleet" },
      { label: "Routes", href: "/en/route/panama-contadora" },
      { label: "Blog", href: "/en/blog" },
      { label: "Contact", href: "/en/contact" },
    ];
  }

  return [
    {
      label: "Servicios",
      href: "#",
      children: [
        { label: "Vuelos Chárter", href: "/vuelos-charter-en-panama" },
        { label: "Paseo en Helicóptero", href: "/paseo-en-helicoptero-en-panama" },
        { label: "Asientos Disponibles", href: "/asientos-disponibles" },
        { label: "Vuelos de Negocios", href: "/renta-de-aviones-privados-para-viajes-de-negocios" },
      ],
    },
    {
      label: "Destinos",
      href: "#",
      children: [
        { label: "Isla Contadora", href: "/vuelo-privado-a-contadora" },
        { label: "Costa Rica", href: "/vuelo-privado-costa-rica" },
        { label: "Medellín", href: "/vuelos-privados-a-medellin" },
        { label: "Playa Tambor", href: "/vuelos-a-playa-tambor" },
      ],
    },
    { label: "Nuestra Flota", href: "/nuestra-flota" },
    { label: "Rutas", href: "/ruta/panama-contadora" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/contacto" },
  ];
}

export const WHATSAPP_PHONE = "15557298766";

export function getWhatsAppHref(locale: Locale, context?: string): string {
  const baseMessage =
    locale === "es"
      ? "Hola *Sky Ride*, estoy interesado en"
      : "Hello *Sky Ride*, I am interested in";

  const message = context ? `${baseMessage} ${context}` : `${baseMessage}...`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
