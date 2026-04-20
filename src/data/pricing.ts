import { fleet, type Aircraft } from "./fleet";
import { routes, type RouteData } from "./routes";
import type { Locale } from "@/i18n/routing";

export interface QuoteOption {
  aircraft: Aircraft;
  route: RouteData;
  price: number;
  pricePerPerson: number;
  isUpgrade: boolean;
}

/**
 * Base price multiplier per aircraft relative to route startingPrice.
 * The route's startingPrice corresponds to the cheapest compatible aircraft.
 * Larger / premium aircraft cost proportionally more.
 */
const priceMultiplier: Record<string, number> = {
  "cessna-172": 0.85,
  "piper-cherokee": 0.9,
  "cessna-206": 1.0,
  "piper-saratoga": 1.05,
  "piper-azteca": 1.15,
  "daher-kodiak": 1.45,
  "cessna-caravan": 1.7,
  "king-air-f90": 2.8,
  "king-air-200": 3.5,
  // Helicopters — not charter routes, separate pricing
  "robinson-r44": 1.0,
  "robinson-r66": 1.2,
  "eurocopter-b3": 1.6,
  "eurocopter-b4": 1.9,
};

/** Map booking form destination values to route IDs */
const destToRouteId: Record<string, string> = {
  contadora: "panama-contadora",
  "san-blas": "panama-san-blas",
  "costa-rica": "panama-costa-rica",
  "bocas-del-toro": "panama-bocas-del-toro",
  medellin: "panama-medellin",
};

/**
 * Get instant quote options for a given route and passenger count.
 * Returns { best3, upgrade } where best3 are the 3 cheapest that fit,
 * sorted high→low, and upgrade is the best premium option above those.
 */
export function getInstantQuotes(
  destinationValue: string,
  passengers: number,
): { best3: QuoteOption[]; upgrade: QuoteOption | null } {
  const routeId = destToRouteId[destinationValue];
  if (!routeId) return { best3: [], upgrade: null };

  const route = routes.find((r) => r.id === routeId);
  if (!route) return { best3: [], upgrade: null };

  // Get all compatible aircraft for this route that fit the passenger count
  const options: QuoteOption[] = [];
  for (const aircraftId of route.aircraft) {
    const ac = fleet.find((a) => a.id === aircraftId);
    if (!ac || ac.passengers < passengers) continue;

    const mult = priceMultiplier[ac.id] ?? 1.0;
    const price = Math.round(route.startingPrice * mult);
    const pricePerPerson = Math.round(price / passengers);

    options.push({
      aircraft: ac,
      route,
      price,
      pricePerPerson,
      isUpgrade: false,
    });
  }

  // Sort by price ascending to pick the 3 cheapest
  options.sort((a, b) => a.price - b.price);

  const best3 = options.slice(0, 3).map((o) => ({ ...o, isUpgrade: false }));
  // Sort best3 high→low for display
  best3.sort((a, b) => b.price - a.price);

  // Upgrade = next option above the top 3, or the most expensive if only 3
  const remaining = options.slice(3);
  let upgrade: QuoteOption | null = null;
  if (remaining.length > 0) {
    const up = remaining[remaining.length - 1]; // most expensive remaining
    upgrade = { ...up, isUpgrade: true };
  }

  return { best3, upgrade };
}

/** Format price for display */
export function formatPrice(price: number): string {
  return `$${price.toLocaleString("en-US")}`;
}

/** Copy strings for the quote results */
export const quoteCopy = {
  es: {
    resultsTitle: "Tu cotización instantánea",
    resultsSubtitle: "3 opciones que se ajustan a tu viaje",
    passengers: "pasajeros",
    passenger: "pasajero",
    perPerson: "/persona",
    flightTime: "Tiempo de vuelo",
    capacity: "Capacidad",
    totalPrice: "Precio total",
    bookThis: "Reservar este vuelo",
    upgradeTitle: "¿Quieres una mejor aeronave?",
    upgradeDesc: "Más espacio, más velocidad, más confort",
    showUpgrade: "Ver opción premium →",
    noResults: "No encontramos aeronaves disponibles para esta ruta y cantidad de pasajeros. Contáctanos por WhatsApp.",
    contactMartin: "Hablar con Martin →",
  },
  en: {
    resultsTitle: "Your instant quote",
    resultsSubtitle: "3 options that fit your trip",
    passengers: "passengers",
    passenger: "passenger",
    perPerson: "/person",
    flightTime: "Flight time",
    capacity: "Capacity",
    totalPrice: "Total price",
    bookThis: "Book this flight",
    upgradeTitle: "Want a better aircraft?",
    upgradeDesc: "More space, more speed, more comfort",
    showUpgrade: "See premium option →",
    noResults: "No aircraft available for this route and passenger count. Contact us on WhatsApp.",
    contactMartin: "Talk to Martin →",
  },
};
