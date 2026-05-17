import type { Locale } from "@/i18n/routing";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  isGroupLabel?: boolean;
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
          { label: "Charter Prices", href: "/en/charter-flight-prices" },
        ],
      },
      {
        label: "Destinations",
        href: "#",
        children: [
          { label: "Contadora Island", href: "/en/private-flight-to-contadora" },
          { label: "San Blas Islands", href: "/en/san-blas-guide" },
          { label: "Bocas del Toro", href: "/en/bocas-del-toro-guide" },
          { label: "Costa Rica", href: "/en/private-flight-costa-rica" },
          { label: "Medellín", href: "/en/private-flights-to-medellin" },
          { label: "Playa Tambor", href: "/en/flights-to-playa-tambor" },
          { label: "David, Chiriquí", href: "/en/private-flight-to-david-panama" },
          { label: "Pedasi", href: "/en/private-flight-to-pedasi" },
        ],
      },
      { label: "Our Fleet", href: "/en/our-fleet" },
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
        { label: "Precios Chárter", href: "/precios-vuelos-charter" },
      ],
    },
    {
      label: "Destinos",
      href: "#",
      children: [
        { label: "Isla Contadora", href: "/vuelo-privado-a-contadora" },
        { label: "San Blas", href: "/guia-san-blas" },
        { label: "Bocas del Toro", href: "/guia-bocas-del-toro" },
        { label: "Costa Rica", href: "/vuelo-privado-costa-rica" },
        { label: "Medellín", href: "/vuelos-privados-a-medellin" },
        { label: "Playa Tambor", href: "/vuelos-a-playa-tambor" },
        { label: "David, Chiriquí", href: "/vuelo-privado-a-david-chiriqui" },
        { label: "Pedasí", href: "/vuelo-privado-a-pedasi" },
      ],
    },
    { label: "Nuestra Flota", href: "/nuestra-flota" },
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
