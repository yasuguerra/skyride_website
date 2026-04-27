import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/routing";
import { getWhatsAppHref } from "@/data/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, faqSchema, serviceSchema } from "@/components/seo/JsonLd";
import { TrustBar } from "@/components/sections/TrustBar";
import { TrackedWhatsAppLink, TrackedPhoneLink } from "@/components/ui/TrackedCTA";

interface RelatedLink {
  label: { es: string; en: string };
  href: { es: string; en: string };
  type: "route" | "fleet" | "booking" | "hub";
}

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
    relatedLinks?: RelatedLink[];
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
      es: "Disfruta de un paseo en helicóptero inolvidable sobre los rascacielos de la Ciudad de Panamá, el Canal de Panamá y la Calzada de Amador. Pilotos experimentados garantizan una experiencia segura y memorable.",
      en: "Enjoy an unforgettable helicopter ride over the skyscrapers of Panama City, the Panama Canal, and the Amador Causeway. Experienced pilots ensure a safe and memorable experience.",
    },
    features: {
      es: [
        "Vuelos desde 15 minutos",
        "Pilotos con miles de horas de vuelo",
        "Helicópteros Robinson R44, R66 y Eurocopter",
        "Vuelos panorámicos y traslados",
        "Reserva en minutos por WhatsApp",
        "Fotos y video incluidos en tours VIP",
      ],
      en: [
        "Flights from 15 minutes",
        "Pilots with thousands of flight hours",
        "Robinson R44, R66 & Eurocopter helicopters",
        "Scenic flights and transfers",
        "Book in minutes via WhatsApp",
        "Photos & video included in VIP tours",
      ],
    },
    priceLabel: { es: "Desde $588 por aeronave", en: "From $588 per aircraft" },
    relatedLinks: [
      { label: { es: "Ver flota de helicópteros", en: "See helicopter fleet" }, href: { es: "/nuestra-flota", en: "/en/our-fleet" }, type: "fleet" },
      { label: { es: "Guía de helicópteros en Panamá", en: "Helicopter guide Panama" }, href: { es: "/guia-helicopteros", en: "/en/helicopter-guide" }, type: "hub" },
      { label: { es: "Reservar con Martín", en: "Book with Martín" }, href: { es: "/reservar-con-martin", en: "/en/book-with-martin" }, type: "booking" },
    ],
    faq: [
      {
        q: { es: "¿Cuánto cuesta un paseo en helicóptero en Panamá?", en: "How much does a helicopter ride cost in Panama?" },
        a: { es: "Los precios comienzan desde $588 por aeronave (hasta 3 pasajeros en R44) para el City Tour de 30 minutos; R66 desde $875 (4 pax), Eurocopter B3 desde $1,284 (5 pax) y B4 desde $1,337 (6 pax). Los tours VIP y traslados tienen precios personalizados según destino y duración.", en: "Prices start from $588 per aircraft (up to 3 passengers on the R44) for the 30-minute City Tour; R66 from $875 (4 pax), Eurocopter B3 from $1,284 (5 pax), and B4 from $1,337 (6 pax). VIP tours and transfers have custom pricing based on destination and duration." },
      },
      {
        q: { es: "¿Es seguro volar en helicóptero?", en: "Is it safe to fly in a helicopter?" },
        a: { es: "Absolutamente. Trabajamos solo con operadores que cumplen con todas las regulaciones de aviación y cuyos pilotos tienen miles de horas de experiencia. La seguridad es nuestra prioridad número uno.", en: "Absolutely. We only partner with operators that comply with all aviation regulations and whose pilots have thousands of hours of experience. Safety is our number one priority." },
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
        "Red de 13 aeronaves disponibles",
        "Rutas a más de 20 destinos",
        "Vuelos para 3 a 12 pasajeros",
        "Cotización inmediata por WhatsApp",
        "Operación en Panamá y Costa Rica",
        "Pago con tarjeta o Wompi",
      ],
      en: [
        "Network of 13 available aircraft",
        "Routes to 20+ destinations",
        "Flights for 3 to 12 passengers",
        "Instant quotes via WhatsApp",
        "Operations in Panama & Costa Rica",
        "Card or Wompi payment",
      ],
    },
    priceLabel: { es: "Desde $398", en: "From $398" },
    relatedLinks: [
      { label: { es: "Tabla de precios chárter", en: "Charter prices table" }, href: { es: "/precios-vuelos-charter", en: "/en/charter-flight-prices" }, type: "route" },
      { label: { es: "Ruta Panamá → Contadora", en: "Panama → Contadora route" }, href: { es: "/ruta/panama-contadora", en: "/en/route/panama-contadora" }, type: "route" },
      { label: { es: "Ruta Panamá → San Blas", en: "Panama → San Blas route" }, href: { es: "/ruta/panama-san-blas", en: "/en/route/panama-san-blas" }, type: "route" },
      { label: { es: "Ruta Panamá → Bocas del Toro", en: "Panama → Bocas del Toro route" }, href: { es: "/ruta/panama-bocas-del-toro", en: "/en/route/panama-bocas-del-toro" }, type: "route" },
      { label: { es: "Ruta Panamá → Costa Rica", en: "Panama → Costa Rica route" }, href: { es: "/ruta/panama-costa-rica", en: "/en/route/panama-costa-rica" }, type: "route" },
      { label: { es: "Ver toda la flota", en: "See the full fleet" }, href: { es: "/nuestra-flota", en: "/en/our-fleet" }, type: "fleet" },
      { label: { es: "Reservar con Martín", en: "Book with Martín" }, href: { es: "/reservar-con-martin", en: "/en/book-with-martin" }, type: "booking" },
    ],
    faq: [
      {
        q: { es: "¿Qué es un vuelo chárter?", en: "What is a charter flight?" },
        a: { es: "Un vuelo chárter es un vuelo privado donde usted alquila toda la aeronave. Elige su horario, destino y viaja solo con su grupo.", en: "A charter flight is a private flight where you rent the entire aircraft. You choose your schedule, destination, and travel only with your group." },
      },
      {
        q: { es: "¿Cuánto cuesta un vuelo chárter?", en: "How much does a charter flight cost?" },
        a: { es: "Los precios varían según destino, aeronave y número de pasajeros. Vuelos a Contadora desde $398, a San Blas desde $644, a Bocas del Toro desde $1,605, a Costa Rica desde $3,400, a Medellín desde $5,500, a República Dominicana desde $14,500 y a Miami desde $18,500.", en: "Prices vary by destination, aircraft, and number of passengers. Flights to Contadora from $398, to San Blas from $644, to Bocas del Toro from $1,605, to Costa Rica from $3,400, to Medellín from $5,500, to the Dominican Republic from $14,500, and to Miami from $18,500." },
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
    relatedLinks: [
      { label: { es: "Asientos disponibles", en: "Available seats" }, href: { es: "/asientos-disponibles", en: "/en/available-seats" }, type: "route" },
      { label: { es: "Ruta Panamá → Contadora", en: "Panama → Contadora route" }, href: { es: "/ruta/panama-contadora", en: "/en/route/panama-contadora" }, type: "route" },
      { label: { es: "Ruta Panamá → San Blas", en: "Panama → San Blas route" }, href: { es: "/ruta/panama-san-blas", en: "/en/route/panama-san-blas" }, type: "route" },
      { label: { es: "Reservar con Martín", en: "Book with Martín" }, href: { es: "/reservar-con-martin", en: "/en/book-with-martin" }, type: "booking" },
    ],
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
    relatedLinks: [
      { label: { es: "Vuelos privados baratos", en: "Affordable private flights" }, href: { es: "/vuelos-privados-baratos", en: "/en/affordable-flights" }, type: "route" },
      { label: { es: "Ruta Panamá → Contadora", en: "Panama → Contadora route" }, href: { es: "/ruta/panama-contadora", en: "/en/route/panama-contadora" }, type: "route" },
      { label: { es: "Reservar con Martín", en: "Book with Martín" }, href: { es: "/reservar-con-martin", en: "/en/book-with-martin" }, type: "booking" },
    ],
  },
  "business-flights": {
    image: "/images/fleet/king-air-200.png",
    title: {
      es: "Renta de Aviones Privados para Viajes de Negocios",
      en: "Business Charter Flights â€” Personalized Experience",
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
    priceLabel: { es: "Desde $1,798", en: "From $1,798" },
    relatedLinks: [
      { label: { es: "Ruta Panamá → Costa Rica", en: "Panama → Costa Rica route" }, href: { es: "/ruta/panama-costa-rica", en: "/en/route/panama-costa-rica" }, type: "route" },
      { label: { es: "King Air 200 â€” hasta 9 pasajeros", en: "King Air 200 â€” up to 9 passengers" }, href: { es: "/producto/king-air-200-hasta-9-pasajeros", en: "/en/product/king-air-200-hasta-9-pasajeros" }, type: "fleet" },
      { label: { es: "King Air F90 â€” 6 pasajeros", en: "King Air F90 â€” 6 passengers" }, href: { es: "/producto/king-air-f90-6-pasajeros", en: "/en/product/king-air-f90-6-pasajeros" }, type: "fleet" },
      { label: { es: "Reservar con Martín", en: "Book with Martín" }, href: { es: "/reservar-con-martin", en: "/en/book-with-martin" }, type: "booking" },
    ],
  },  "private-jet": {
    image: "/images/fleet/king-air-200.png",
    title: {
      es: "Jet Privado en Panamá — Vuelos Ejecutivos",
      en: "Private Jet Charter Panama — Executive Flights",
    },
    subtitle: {
      es: "La experiencia más exclusiva de la aviación privada en Panamá",
      en: "The most exclusive private aviation experience in Panama",
    },
    description: {
      es: "Cuando el tiempo y la comodidad son lo primero. Nuestros aviones ejecutivos — King Air 200 y King Air F90 — son la opción preferida por ejecutivos y viajeros de alto perfil que vuelan desde Panamá a Costa Rica, Medellín y más allá. Cabinas presurizadas, horarios a tu medida y sin las colas del aeropuerto comercial.",
      en: "When time and comfort come first. Our executive aircraft — King Air 200 and King Air F90 — are the preferred choice for executives and high-profile travelers flying from Panama to Costa Rica, Medellín, and beyond. Pressurized cabins, custom schedules, and none of the commercial airport crowds.",
    },
    features: {
      es: [
        "King Air 200: hasta 9 pasajeros",
        "King Air F90: hasta 6 pasajeros",
        "Cabina 100% presurizada",
        "Alcance: Costa Rica, Medellín, Miami, RD",
        "Horarios completamente flexibles",
        "Facturación corporativa disponible",
      ],
      en: [
        "King Air 200: up to 9 passengers",
        "King Air F90: up to 6 passengers",
        "Fully pressurized cabin",
        "Range: Costa Rica, Medellín, Miami, DR",
        "Completely flexible schedules",
        "Corporate billing available",
      ],
    },
    priceLabel: { es: "Desde $1,798", en: "From $1,798" },
    faq: [
      {
        q: { es: "¿Cuánto cuesta un jet privado en Panamá?", en: "How much does a private jet cost in Panama?" },
        a: { es: "Nuestros aviones ejecutivos comienzan desde $1,798 para rutas regionales como Costa Rica. Para destinos como Medellín ($5,500) o Miami ($18,500), el precio incluye una aeronave presurizada con capacidad para 6–9 pasajeros.", en: "Our executive aircraft start from $1,798 for regional routes like Costa Rica. For destinations like Medellín ($5,500) or Miami ($18,500), the price includes a pressurized aircraft with capacity for 6–9 passengers." },
      },
      {
        q: { es: "¿Qué aeronaves ofrecen?", en: "What aircraft do you offer?" },
        a: { es: "Operamos el King Air 200 (hasta 9 pasajeros, 265 kt) y el King Air F90 (hasta 6 pasajeros, 270 kt). Ambos son turbohélices presurizados que la industria conoce coloquialmente como \"jets privados\" por su experiencia de cabina ejecutiva.", en: "We operate the King Air 200 (up to 9 passengers, 265 kt) and the King Air F90 (up to 6 passengers, 270 kt). Both are pressurized turboprops that the industry colloquially calls \"private jets\" for their executive cabin experience." },
      },
      {
        q: { es: "¿Desde qué aeropuerto salen?", en: "Which airport do you depart from?" },
        a: { es: "Los vuelos ejecutivos salen del Aeropuerto de Albrook (PAC) en Ciudad de Panamá. Este aeropuerto no tiene filas de check-in ni control de seguridad masivo, lo que significa que puedes llegar 15 minutos antes de tu vuelo.", en: "Executive flights depart from Albrook Airport (PAC) in Panama City. This airport has no check-in lines or mass security screening, meaning you can arrive just 15 minutes before your flight." },
      },
      {
        q: { es: "¿Es posible el pago corporativo?", en: "Is corporate payment available?" },
        a: { es: "Sí. Aceptamos facturación corporativa, pago con tarjeta de crédito y transferencia bancaria. Consulta condiciones por WhatsApp.", en: "Yes. We accept corporate billing, credit card payment, and bank transfer. Ask about conditions via WhatsApp." },
      },
    ],
    relatedLinks: [
      { label: { es: "Vuelos de negocios", en: "Business flights" }, href: { es: "/renta-de-aviones-privados-para-viajes-de-negocios", en: "/en/charter-flights-panama-personalized-experience" }, type: "route" },
      { label: { es: "Ruta Panamá → Costa Rica", en: "Panama → Costa Rica route" }, href: { es: "/ruta/panama-costa-rica", en: "/en/route/panama-costa-rica" }, type: "route" },
      { label: { es: "King Air 200 — hasta 9 pasajeros", en: "King Air 200 — up to 9 passengers" }, href: { es: "/producto/king-air-200-hasta-9-pasajeros", en: "/en/product/king-air-200-hasta-9-pasajeros" }, type: "fleet" },
      { label: { es: "King Air F90 — 6 pasajeros", en: "King Air F90 — 6 passengers" }, href: { es: "/producto/king-air-f90-6-pasajeros", en: "/en/product/king-air-f90-6-pasajeros" }, type: "fleet" },
      { label: { es: "Reservar con Martín", en: "Book with Martín" }, href: { es: "/reservar-con-martin", en: "/en/book-with-martin" }, type: "booking" },
    ],
  },};

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
      ? `/en/${pageId === "helicopter" ? "helicopter-rides" : pageId === "charter" ? "charter-flights" : pageId === "affordable-flights" ? "affordable-private-flights" : pageId === "available-seats" ? "available-seats" : pageId === "private-jet" ? "private-jet-charter" : "business-charter-flights"}`
      : `/${pageId === "helicopter" ? "paseo-en-helicoptero-en-panama" : pageId === "charter" ? "vuelos-charter-en-panama" : pageId === "affordable-flights" ? "vuelos-privados-baratos-en-panama" : pageId === "available-seats" ? "asientos-disponibles" : pageId === "private-jet" ? "jet-privado-en-panama" : "renta-de-aviones-privados-para-viajes-de-negocios"}`;
  return (
    <div className="min-h-screen bg-[#f0f7fa]">
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
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden bg-[#152c46]">
        <Image
          src={data.image}
          alt={data.title[locale]}
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#152c46] via-transparent to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12 lg:px-10">
          {data.priceLabel && (
            <p className="mb-3 inline-flex self-start rounded-full border border-[#3edcc2]/30 bg-[#3edcc2]/10 px-4 py-1.5 text-sm font-semibold text-[#3edcc2]">
              {data.priceLabel[locale]}
            </p>
          )}
          <h1 className="max-w-3xl font-sans font-bold text-4xl text-white sm:text-5xl lg:text-6xl">
            {data.title[locale]}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-300">
            {data.subtitle[locale]}
          </p>
        </div>
      </section>

      <TrustBar locale={locale} variant="dark" />

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="text-lg leading-8 text-slate-700">
              {data.description[locale]}
            </p>

            <div className="mt-10">
              <h2 className="font-sans font-bold text-3xl text-slate-950">
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
                    <span className="mt-0.5 text-[#20d1b3]">âœ“</span>
                    <span className="text-sm text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            {data.faq && data.faq.length > 0 && (
              <div className="mt-16">
                <h2 className="font-sans font-bold text-3xl text-slate-950">
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
              <h3 className="font-sans font-bold text-2xl text-slate-950">
                {locale === "es"
                  ? "¿Listo para volar?"
                  : "Ready to fly?"}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {locale === "es"
                  ? "Envíenos un mensaje por WhatsApp y reciba su cotización en menos de 10 minutos."
                  : "Send us a WhatsApp message and receive your quote in under 10 minutes."}
              </p>
              <TrackedWhatsAppLink
                href={whatsappHref}
                locale={locale}
                pagePath={pageUrl}
                serviceType={pageId}
                className="mt-6 flex w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white"
              >
                {locale === "es" ? "Cotizar por WhatsApp" : "Quote via WhatsApp"}
              </TrackedWhatsAppLink>
              <TrackedPhoneLink
                href="tel:+50768400045"
                locale={locale}
                pagePath={pageUrl}
                className="mt-3 flex w-full items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-900"
              >
                +507 6840 0045
              </TrackedPhoneLink>
            </div>
          </aside>
        </div>
      </section>

      {/* Related links */}
      {data.relatedLinks && data.relatedLinks.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="font-sans font-bold text-2xl text-slate-950">
              {locale === "es" ? "Páginas relacionadas" : "Related pages"}
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {data.relatedLinks.map((link) => (
                <Link
                  key={link.href[locale]}
                  href={link.href[locale]}
                  className="rounded-full border border-slate-300 bg-[#f0f7fa] px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-[#20d1b3] hover:text-[#20d1b3]"
                >
                  {link.label[locale]}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}
