import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/routing";
import { getWhatsAppHref } from "@/data/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, faqSchema, serviceSchema } from "@/components/seo/JsonLd";

const serviceData: Record<
  string,
  {
    image: string;
    title: { es: string; en: string };
    subtitle: { es: string; en: string };
    description: { es: string; en: string };
    features: { es: string[]; en: string[] };
    priceLabel?: { es: string; en: string };
    faq?: { q: { es: string; en: string }; a: { es: string; en: string } }[];
  }
> = {
  helicopter: {
    image: "/images/fleet/eurocopter-b4.jpg",
    title: {
      es: "Paseo en Helicóptero en Panamá",
      en: "Helicopter Rides in Panama",
    },
    subtitle: {
      es: "Experiencias aéreas únicas sobre la Ciudad de Panamá",
      en: "Unique aerial experiences over Panama City",
    },
    description: {
      es: "Disfruta de un paseo en helicóptero inolvidable sobre los rascacielos de la Ciudad de Panamá, el Canal de Panamá y la Calzada de Amador. Nuestros pilotos certificados garantizan una experiencia segura y memorable.",
      en: "Enjoy an unforgettable helicopter ride over the skyscrapers of Panama City, the Panama Canal, and the Amador Causeway. Our certified pilots ensure a safe and memorable experience.",
    },
    features: {
      es: [
        "Vuelos desde 15 minutos",
        "Pilotos certificados DGAC",
        "Helicópteros Robinson R44, R66 y Eurocopter",
        "Vuelos panorámicos y traslados",
        "Reserva en minutos por WhatsApp",
        "Fotos y video incluidos en tours VIP",
      ],
      en: [
        "Flights from 15 minutes",
        "DGAC-certified pilots",
        "Robinson R44, R66 & Eurocopter helicopters",
        "Scenic flights and transfers",
        "Book in minutes via WhatsApp",
        "Photos & video included in VIP tours",
      ],
    },
    priceLabel: { es: "Desde $350/persona", en: "From $350/person" },
    faq: [
      {
        q: { es: "¿Cuánto cuesta un paseo en helicóptero en Panamá?", en: "How much does a helicopter ride cost in Panama?" },
        a: { es: "Los precios comienzan desde $350 por persona para vuelos de 15 minutos. Los tours VIP y traslados tienen precios personalizados según destino y duración.", en: "Prices start from $350 per person for 15-minute flights. VIP tours and transfers have custom pricing based on destination and duration." },
      },
      {
        q: { es: "¿Es seguro volar en helicóptero?", en: "Is it safe to fly in a helicopter?" },
        a: { es: "Absolutamente. Todos nuestros helicópteros cumplen con las regulaciones de la DGAC y nuestros pilotos tienen miles de horas de experiencia. La seguridad es nuestra prioridad número uno.", en: "Absolutely. All our helicopters comply with DGAC regulations and our pilots have thousands of hours of experience. Safety is our number one priority." },
      },
      {
        q: { es: "¿Cuántas personas pueden volar?", en: "How many people can fly?" },
        a: { es: "Depende del helicóptero: Robinson R44 (3 pasajeros), R66 (4 pasajeros), Eurocopter AS350 B3 (5 pasajeros), Eurocopter EC130 B4 (6 pasajeros).", en: "It depends on the helicopter: Robinson R44 (3 passengers), R66 (4 passengers), Eurocopter AS350 B3 (5 passengers), Eurocopter EC130 B4 (6 passengers)." },
      },
    ],
  },
  charter: {
    image: "/images/hero/charter-exterior.webp",
    title: {
      es: "Vuelos Chárter en Panamá",
      en: "Charter Flights in Panama",
    },
    subtitle: {
      es: "Vuelos privados y compartidos a cualquier destino",
      en: "Private and shared flights to any destination",
    },
    description: {
      es: "Vuelos chárter privados para ejecutivos, familias y grupos. Vuele directo a Contadora, San Blas, Costa Rica, Bocas del Toro o cualquier destino en la región. Sin filas, sin esperas, sin escalas.",
      en: "Private charter flights for executives, families, and groups. Fly directly to Contadora, San Blas, Costa Rica, Bocas del Toro, or any destination in the region. No lines, no waits, no layovers.",
    },
    features: {
      es: [
        "Flota de 13 aeronaves certificadas",
        "Rutas a más de 20 destinos",
        "Vuelos para 3 a 12 pasajeros",
        "Cotización inmediata por WhatsApp",
        "Operación en Panamá y Costa Rica",
        "Pago con tarjeta o Wompi",
      ],
      en: [
        "Fleet of 13 certified aircraft",
        "Routes to 20+ destinations",
        "Flights for 3 to 12 passengers",
        "Instant quotes via WhatsApp",
        "Operations in Panama & Costa Rica",
        "Card or Wompi payment",
      ],
    },
    priceLabel: { es: "Desde $950", en: "From $950" },
    faq: [
      {
        q: { es: "¿Qué es un vuelo chárter?", en: "What is a charter flight?" },
        a: { es: "Un vuelo chárter es un vuelo privado donde usted alquila toda la aeronave. Elige su horario, destino y viaja solo con su grupo.", en: "A charter flight is a private flight where you rent the entire aircraft. You choose your schedule, destination, and travel only with your group." },
      },
      {
        q: { es: "¿Cuánto cuesta un vuelo chárter?", en: "How much does a charter flight cost?" },
        a: { es: "Los precios varían según destino, aeronave y número de pasajeros. Vuelos a Contadora desde $950, a San Blas desde $1,250, a Costa Rica desde $3,400.", en: "Prices vary by destination, aircraft, and number of passengers. Flights to Contadora from $950, to San Blas from $1,250, to Costa Rica from $3,400." },
      },
    ],
  },
  "affordable-flights": {
    image: "/images/hero/cabecera-charter.webp",
    title: {
      es: "Vuelos Privados Baratos en Panamá",
      en: "Affordable Private Flights in Panama",
    },
    subtitle: {
      es: "La forma más accesible de volar privado",
      en: "The most accessible way to fly private",
    },
    description: {
      es: "No necesitas alquilar un avión completo para volar privado. Con nuestros vuelos compartidos, puedes comprar asientos individuales a precios accesibles y disfrutar de la velocidad y confort de la aviación privada.",
      en: "You don't need to rent an entire plane to fly private. With our shared flights, you can buy individual seats at accessible prices and enjoy the speed and comfort of private aviation.",
    },
    features: {
      es: [
        "Asientos desde $180",
        "Rutas populares a Contadora y San Blas",
        "Sin filas ni check-in de aerolínea",
        "Tiempo de vuelo reducido",
        "Equipaje flexible",
        "Reserva fácil por WhatsApp",
      ],
      en: [
        "Seats from $180",
        "Popular routes to Contadora & San Blas",
        "No airline check-in or lines",
        "Reduced flight time",
        "Flexible luggage",
        "Easy booking via WhatsApp",
      ],
    },
    priceLabel: { es: "Desde $180/asiento", en: "From $180/seat" },
  },
  "available-seats": {
    image: "/images/hero/charter-interior.webp",
    title: {
      es: "Asientos Disponibles en Vuelos Privados",
      en: "Available Seats on Private Flights",
    },
    subtitle: {
      es: "Vuele en privado sin alquilar la aeronave completa",
      en: "Fly private without renting the whole aircraft",
    },
    description: {
      es: "Consulte los asientos disponibles en nuestros próximos vuelos. Viaje con la comodidad y velocidad de un vuelo privado compartiendo el costo con otros pasajeros.",
      en: "Check available seats on our upcoming flights. Travel with the comfort and speed of a private flight while sharing the cost with other passengers.",
    },
    features: {
      es: [
        "Vuelos semanales a destinos populares",
        "Precio por asiento, no por avión",
        "Confort de aviación privada",
        "Horarios flexibles",
        "Reserva rápida por WhatsApp",
        "Ideal para viajeros individuales",
      ],
      en: [
        "Weekly flights to popular destinations",
        "Price per seat, not per aircraft",
        "Private aviation comfort",
        "Flexible schedules",
        "Quick booking via WhatsApp",
        "Ideal for individual travelers",
      ],
    },
  },
  "business-flights": {
    image: "/images/fleet/king-air-200.png",
    title: {
      es: "Renta de Aviones Privados para Viajes de Negocios",
      en: "Business Charter Flights — Personalized Experience",
    },
    subtitle: {
      es: "Soluciones ejecutivas de transporte aéreo",
      en: "Executive air transport solutions",
    },
    description: {
      es: "Para ejecutivos y empresas que valoran su tiempo. Vuelos privados con cabinas presurizadas, alcance internacional y horarios a su medida. Desde traslados regionales hasta vuelos internacionales a Medellín y Costa Rica.",
      en: "For executives and businesses that value their time. Private flights with pressurized cabins, international range, and schedules tailored to you. From regional transfers to international flights to Medellín and Costa Rica.",
    },
    features: {
      es: [
        "King Air 200 y F90 para ejecutivos",
        "Cabina presurizada",
        "Alcance internacional",
        "Horarios 100% flexibles",
        "Servicio puerta a puerta",
        "Facturación corporativa",
      ],
      en: [
        "King Air 200 & F90 for executives",
        "Pressurized cabin",
        "International range",
        "100% flexible schedules",
        "Door-to-door service",
        "Corporate billing",
      ],
    },
    priceLabel: { es: "Desde $4,500", en: "From $4,500" },
  },
};

export function ServicePage({
  locale,
  pageId,
}: {
  locale: Locale;
  pageId: string;
}) {
  const data = serviceData[pageId];
  if (!data) return null;

  const whatsappHref = getWhatsAppHref(
    locale,
    locale === "es"
      ? `información sobre ${data.title.es}`
      : `information about ${data.title.en}`,
  );

  const pageUrl =
    locale === "en"
      ? `/en/${pageId === "helicopter" ? "helicopter-rides" : pageId === "charter" ? "charter-flights" : pageId === "affordable-flights" ? "affordable-private-flights" : pageId === "available-seats" ? "available-seats" : "business-charter-flights"}`
      : `/${pageId === "helicopter" ? "paseo-en-helicoptero-en-panama" : pageId === "charter" ? "vuelos-charter-en-panama" : pageId === "affordable-flights" ? "vuelos-privados-baratos-en-panama" : pageId === "available-seats" ? "asientos-disponibles" : "renta-de-aviones-privados-para-viajes-de-negocios"}`;

  return (
    <div className="min-h-screen bg-[#f7f4ec]">
      <Header locale={locale} />
      <Breadcrumbs
        locale={locale}
        items={[{ name: data.title[locale], href: pageUrl }]}
      />
      <JsonLd
        data={[
          serviceSchema({
            name: data.title[locale],
            description: data.description[locale],
            url: pageUrl,
            image: data.image,
          }),
          ...(data.faq
            ? [
                faqSchema(
                  data.faq.map((f) => ({
                    question: f.q[locale],
                    answer: f.a[locale],
                  })),
                ),
              ]
            : []),
        ]}
      />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden bg-[#0b1625]">
        <Image
          src={data.image}
          alt={data.title[locale]}
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1625] via-transparent to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12 lg:px-10">
          {data.priceLabel && (
            <p className="mb-3 inline-flex self-start rounded-full border border-[#d8a651]/30 bg-[#d8a651]/10 px-4 py-1.5 text-sm font-semibold text-[#d8a651]">
              {data.priceLabel[locale]}
            </p>
          )}
          <h1 className="max-w-3xl font-serif text-4xl text-white sm:text-5xl lg:text-6xl">
            {data.title[locale]}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-300">
            {data.subtitle[locale]}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="text-lg leading-8 text-slate-700">
              {data.description[locale]}
            </p>

            <div className="mt-10">
              <h2 className="font-serif text-3xl text-slate-950">
                {locale === "es"
                  ? "¿Qué incluye?"
                  : "What's included?"}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {data.features[locale].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <span className="mt-0.5 text-[#c8953d]">✓</span>
                    <span className="text-sm text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            {data.faq && data.faq.length > 0 && (
              <div className="mt-16">
                <h2 className="font-serif text-3xl text-slate-950">
                  {locale === "es"
                    ? "Preguntas frecuentes"
                    : "Frequently asked questions"}
                </h2>
                <div className="mt-6 space-y-4">
                  {data.faq.map((item, i) => (
                    <details
                      key={i}
                      className="group rounded-2xl border border-slate-200 bg-white"
                    >
                      <summary className="cursor-pointer p-5 text-sm font-semibold text-slate-900">
                        {item.q[locale]}
                      </summary>
                      <p className="border-t border-slate-100 p-5 text-sm leading-7 text-slate-600">
                        {item.a[locale]}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-2xl text-slate-950">
                {locale === "es"
                  ? "¿Listo para volar?"
                  : "Ready to fly?"}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {locale === "es"
                  ? "Envíenos un mensaje por WhatsApp y reciba su cotización en menos de 10 minutos."
                  : "Send us a WhatsApp message and receive your quote in under 10 minutes."}
              </p>
              <Link
                href={whatsappHref}
                className="mt-6 flex w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white"
              >
                {locale === "es" ? "Cotizar por WhatsApp" : "Quote via WhatsApp"}
              </Link>
              <Link
                href="tel:+50768400045"
                className="mt-3 flex w-full items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900"
              >
                +507 6840 0045
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}
