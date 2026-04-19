export interface Testimonial {
  name: string;
  service: "charter" | "helicopter" | "available-seats" | "general";
  text: { es: string; en: string };
  rating: number;
  date: string;
  source: "google" | "direct";
}

export const testimonials: Testimonial[] = [
  {
    name: "Carlos M.",
    service: "charter",
    text: {
      es: "La atención fue inmediata y el vuelo a Contadora se cerró en minutos por WhatsApp. Excelente servicio de principio a fin.",
      en: "The response was immediate and the flight to Contadora was booked in minutes via WhatsApp. Excellent service from start to finish.",
    },
    rating: 5,
    date: "2026-02-15",
    source: "google",
  },
  {
    name: "Andrea R.",
    service: "helicopter",
    text: {
      es: "El paseo en helicóptero fue impecable y la experiencia se sintió premium de principio a fin. ¡Totalmente recomendado!",
      en: "The helicopter ride was flawless and the experience felt premium from start to finish. Totally recommended!",
    },
    rating: 5,
    date: "2026-01-20",
    source: "google",
  },
  {
    name: "David L.",
    service: "charter",
    text: {
      es: "Necesitábamos un vuelo urgente a Bocas del Toro para un evento corporativo. Sky Ride lo organizó en menos de 24 horas.",
      en: "We needed an urgent flight to Bocas del Toro for a corporate event. Sky Ride organized it in less than 24 hours.",
    },
    rating: 5,
    date: "2026-03-10",
    source: "direct",
  },
  {
    name: "María G.",
    service: "helicopter",
    text: {
      es: "Celebramos nuestro aniversario con un paseo en helicóptero sobre la ciudad. Las vistas fueron increíbles y el piloto muy profesional.",
      en: "We celebrated our anniversary with a helicopter ride over the city. The views were incredible and the pilot very professional.",
    },
    rating: 5,
    date: "2025-12-28",
    source: "google",
  },
  {
    name: "James W.",
    service: "available-seats",
    text: {
      es: "Encontré asientos disponibles a San Blas a un precio accesible. La experiencia fue tan buena como un vuelo privado completo.",
      en: "I found available seats to San Blas at an accessible price. The experience was as good as a full private flight.",
    },
    rating: 5,
    date: "2026-01-05",
    source: "google",
  },
  {
    name: "Patricia H.",
    service: "charter",
    text: {
      es: "Viajamos en familia a Costa Rica. El King Air 200 fue perfecto para los 7 pasajeros. Servicio impecable.",
      en: "We traveled as a family to Costa Rica. The King Air 200 was perfect for all 7 passengers. Impeccable service.",
    },
    rating: 5,
    date: "2026-02-28",
    source: "direct",
  },
];

export function getTestimonialsByService(
  service?: Testimonial["service"],
): Testimonial[] {
  if (!service) return testimonials;
  return testimonials.filter((t) => t.service === service);
}
