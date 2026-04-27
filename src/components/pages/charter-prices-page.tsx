import Link from "next/link";
import type { Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";
import { TrackedWhatsAppLink } from "@/components/ui/TrackedCTA";
import { getWhatsAppHref } from "@/data/navigation";

// ─── Pricing data ─────────────────────────────────────────────────────────────
// Base multipliers: Cessna 206 = 1.0 (cheapest charter aircraft)
const multipliers: Record<string, number> = {
  "cessna-172": 0.85,
  "cessna-206": 1.0,
  "piper-azteca": 1.15,
  "daher-kodiak": 1.45,
  "cessna-caravan": 1.7,
  "king-air-f90": 2.8,
  "king-air-200": 3.5,
};

const aircraftColumns = [
  { id: "cessna-172",    label: "Cessna 172",         pax: "1–3" },
  { id: "cessna-206",    label: "Cessna 206",         pax: "1–5" },
  { id: "piper-azteca",  label: "Piper Azteca",       pax: "1–5" },
  { id: "daher-kodiak",  label: "Daher Kodiak 100",   pax: "1–9" },
  { id: "cessna-caravan",label: "Cessna Grand Caravan",pax: "1–9" },
  { id: "king-air-f90",  label: "King Air F90",       pax: "1–6" },
  { id: "king-air-200",  label: "King Air 200",       pax: "1–9" },
];

const routes = [
  {
    id: "contadora",
    label: { es: "Ciudad de Panamá → Contadora", en: "Panama City → Contadora" },
    time: "20 min",
    startingPrice: 398,
    aircraft: ["cessna-172","cessna-206","piper-azteca","daher-kodiak","cessna-caravan"],
    href: { es: "/ruta/panama-contadora", en: "/en/route/panama-contadora" },
  },
  {
    id: "san-blas",
    label: { es: "Ciudad de Panamá → San Blas", en: "Panama City → San Blas" },
    time: "45 min",
    startingPrice: 644,
    aircraft: ["cessna-172","cessna-206","piper-azteca","daher-kodiak","cessna-caravan"],
    href: { es: "/ruta/panama-san-blas", en: "/en/route/panama-san-blas" },
  },
  {
    id: "bocas-del-toro",
    label: { es: "Ciudad de Panamá → Bocas del Toro", en: "Panama City → Bocas del Toro" },
    time: "60 min",
    startingPrice: 1605,
    aircraft: ["piper-azteca","daher-kodiak","cessna-caravan","king-air-f90","king-air-200"],
    href: { es: "/ruta/panama-bocas-del-toro", en: "/en/route/panama-bocas-del-toro" },
  },
  {
    id: "costa-rica",
    label: { es: "Ciudad de Panamá → Costa Rica", en: "Panama City → Costa Rica" },
    time: "90 min",
    startingPrice: 3400,
    aircraft: ["piper-azteca","daher-kodiak","cessna-caravan","king-air-f90","king-air-200"],
    href: { es: "/ruta/panama-costa-rica", en: "/en/route/panama-costa-rica" },
  },
  {
    id: "medellin",
    label: { es: "Ciudad de Panamá → Medellín", en: "Panama City → Medellín" },
    time: "3 h",
    startingPrice: 5500,
    aircraft: ["king-air-f90","king-air-200"],
    href: { es: "/ruta/panama-medellin", en: "/en/route/panama-medellin" },
  },
];

function calcPrice(startingPrice: number, aircraftId: string): number | null {
  const m = multipliers[aircraftId];
  if (!m) return null;
  return Math.round((startingPrice * m) / 5) * 5;
}

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US");
}

// ─── Copy ──────────────────────────────────────────────────────────────────────
const copy = {
  es: {
    title: "Precios de Vuelos Chárter en Panamá — Tabla de Tarifas 2025",
    subtitle: "Tarifas reales por aeronave y destino",
    description:
      "Consulta los precios estimados de vuelos privados desde Ciudad de Panamá. Todas las tarifas son por aeronave (no por asiento) e incluyen combustible, piloto y tasas de aterrizaje. Los precios varían según disponibilidad y fecha.",
    tableCta: "Solicitar cotización exacta",
    tableNote:
      "* Precios estimados en USD, por aeronave completa, ida. Tarifas exactas bajo petición por WhatsApp.",
    routeCol: "Ruta",
    timeCol: "Tiempo",
    breadcrumb: "Precios vuelos chárter",
    relatedTitle: "Rutas populares",
    faqTitle: "Preguntas frecuentes sobre precios",
    ctaHeading: "¿Listo para volar?",
    ctaBody: "Envíe su fecha y cantidad de pasajeros por WhatsApp y reciba cotización en 10 minutos.",
    ctaButton: "Cotizar por WhatsApp",
    notAvailable: "—",
    availableUpon: "Consultar",
  },
  en: {
    title: "Charter Flight Prices in Panama — 2025 Rate Table",
    subtitle: "Real rates by aircraft and destination",
    description:
      "View estimated private flight prices from Panama City. All rates are per aircraft (not per seat) and include fuel, pilot, and landing fees. Prices vary by availability and date.",
    tableCta: "Request exact quote",
    tableNote:
      "* Estimated prices in USD, per full aircraft, one-way. Exact rates available on request via WhatsApp.",
    routeCol: "Route",
    timeCol: "Flight time",
    breadcrumb: "Charter flight prices",
    relatedTitle: "Popular routes",
    faqTitle: "Pricing FAQs",
    ctaHeading: "Ready to fly?",
    ctaBody: "Send your date and passenger count via WhatsApp and receive a quote in under 10 minutes.",
    ctaButton: "Quote via WhatsApp",
    notAvailable: "—",
    availableUpon: "On request",
  },
} as const;

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: {
      es: "¿Cuánto cuesta un vuelo chárter a Contadora desde Panamá?",
      en: "How much does a charter flight to Contadora cost from Panama?",
    },
    a: {
      es: "Un vuelo chárter a Contadora empieza desde $398 en Cessna 206 (hasta 5 pasajeros). El precio cubre la aeronave completa, no por asiento.",
      en: "A charter flight to Contadora starts from $398 in a Cessna 206 (up to 5 passengers). The price covers the entire aircraft, not per seat.",
    },
  },
  {
    q: {
      es: "¿Cuánto cuesta volar a San Blas en avión privado?",
      en: "How much does it cost to fly to San Blas on a private plane?",
    },
    a: {
      es: "Volar a San Blas en avión privado cuesta desde $644 (Cessna 172, hasta 3 pasajeros). Para grupos más grandes, el Daher Kodiak o la Grand Caravan ofrecen hasta 9 asientos a precios proporcionales.",
      en: "Flying to San Blas by private plane costs from $644 (Cessna 172, up to 3 passengers). For larger groups, the Daher Kodiak or Grand Caravan offer up to 9 seats at proportional prices.",
    },
  },
  {
    q: {
      es: "¿Cuánto cuesta un vuelo privado a Bocas del Toro?",
      en: "How much is a private flight to Bocas del Toro?",
    },
    a: {
      es: "Un vuelo privado a Bocas del Toro empieza desde $1,605 en Piper Azteca. El trayecto dura aproximadamente 60 minutos desde la Ciudad de Panamá.",
      en: "A private flight to Bocas del Toro starts from $1,605 on a Piper Azteca. The journey takes approximately 60 minutes from Panama City.",
    },
  },
  {
    q: {
      es: "¿Los precios incluyen todo o hay costos extra?",
      en: "Are prices all-inclusive or are there extra costs?",
    },
    a: {
      es: "Las tarifas incluyen combustible, piloto certificado, tasas de aterrizaje y seguro. No se cobra por asiento ni existen costos ocultos de aerolínea.",
      en: "Rates include fuel, certified pilot, landing fees, and insurance. There are no per-seat charges or hidden airline fees.",
    },
  },
  {
    q: {
      es: "¿Se puede comprar un solo asiento en vuelo privado?",
      en: "Can I buy just one seat on a private flight?",
    },
    a: {
      es: "Sí. Ofrecemos asientos compartidos desde $180 en rutas frecuentes como Contadora y San Blas. Consulta nuestra página de vuelos privados baratos para disponibilidad actual.",
      en: "Yes. We offer shared seats from $180 on frequent routes like Contadora and San Blas. Check our affordable private flights page for current availability.",
    },
  },
  {
    q: {
      es: "¿El precio es el mismo para ida y vuelta?",
      en: "Is the price the same for a round trip?",
    },
    a: {
      es: "El precio de regreso es independiente. Sin embargo, si coordinas ambos tramos con nosotros puedes obtener descuento. Consúltanos por WhatsApp.",
      en: "The return leg is priced separately. However, if you coordinate both legs with us you may qualify for a discount. Ask us via WhatsApp.",
    },
  },
  {
    q: {
      es: "¿Cuánto cuesta un King Air a Costa Rica?",
      en: "How much does a King Air to Costa Rica cost?",
    },
    a: {
      es: "Un King Air F90 a Costa Rica cuesta aproximadamente $9,520. El King Air 200 ronda los $11,900. Ambos incluyen cabina presurizada, ideal para grupos ejecutivos.",
      en: "A King Air F90 to Costa Rica costs approximately $9,520. The King Air 200 is around $11,900. Both include a pressurized cabin, ideal for executive groups.",
    },
  },
  {
    q: {
      es: "¿Con cuánta anticipación debo reservar?",
      en: "How far in advance should I book?",
    },
    a: {
      es: "La mayoría de vuelos chárter se confirman el mismo día o con 24–48 horas de anticipación. Para fechas de alta demanda (Semana Santa, Carnaval) se recomienda reservar con 1–2 semanas de anticipación.",
      en: "Most charter flights are confirmed the same day or with 24–48 hours notice. For high-demand dates (Easter, Carnival) we recommend booking 1–2 weeks in advance.",
    },
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function CharterPricesPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const pageUrl =
    locale === "es"
      ? "/precios-vuelos-charter"
      : "/en/charter-flight-prices";

  const whatsappHref = getWhatsAppHref(
    locale,
    locale === "es"
      ? "cotización de vuelo chárter"
      : "charter flight quote",
  );

  return (
    <div className="min-h-screen bg-[#f0f7fa]">
      <Header locale={locale} />
      <Breadcrumbs
        locale={locale}
        items={[{ name: t.breadcrumb, href: pageUrl }]}
      />

      <JsonLd
        data={[
          faqSchema(
            faqs.map((f) => ({ question: f.q[locale], answer: f.a[locale] })),
          ),
        ]}
      />

      {/* Hero */}
      <section className="bg-[#152c46] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h1 className="font-sans font-bold text-4xl text-white sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{t.subtitle}</p>
          <p className="mt-3 max-w-2xl text-sm text-slate-400">
            {t.description}
          </p>
        </div>
      </section>

      <TrustBar locale={locale} variant="dark" />

      {/* Pricing table */}
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-10">
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-[#152c46] text-white">
                <th className="px-4 py-3 text-left font-semibold">
                  {t.routeCol}
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  {t.timeCol}
                </th>
                {aircraftColumns.map((a) => (
                  <th
                    key={a.id}
                    className="px-3 py-3 text-center font-semibold"
                  >
                    <span className="block">{a.label}</span>
                    <span className="block text-xs font-normal text-slate-300">
                      {a.pax} pax
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {routes.map((route, i) => (
                <tr
                  key={route.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-[#f8fbfc]"}
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <Link
                      href={route.href[locale]}
                      className="hover:text-[#20d1b3] hover:underline"
                    >
                      {route.label[locale]}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{route.time}</td>
                  {aircraftColumns.map((ac) => {
                    if (!route.aircraft.includes(ac.id)) {
                      return (
                        <td
                          key={ac.id}
                          className="px-3 py-3 text-center text-slate-300"
                        >
                          {t.notAvailable}
                        </td>
                      );
                    }
                    const price = calcPrice(route.startingPrice, ac.id);
                    return (
                      <td
                        key={ac.id}
                        className="px-3 py-3 text-center font-semibold text-slate-800"
                      >
                        {price ? fmt(price) : t.availableUpon}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500">{t.tableNote}</p>
      </section>

      {/* CTA + FAQ two-column */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">

          {/* FAQ */}
          <div>
            <h2 className="font-sans font-bold text-3xl text-slate-950">
              {t.faqTitle}
            </h2>
            <div className="mt-6 space-y-4">
              {faqs.map((item, i) => (
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

          {/* Sidebar CTA */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-sans font-bold text-2xl text-slate-950">
                {t.ctaHeading}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {t.ctaBody}
              </p>
              <TrackedWhatsAppLink
                href={whatsappHref}
                locale={locale}
                pagePath={pageUrl}
                serviceType="charter-prices"
                className="mt-6 flex w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white"
              >
                {t.ctaButton}
              </TrackedWhatsAppLink>
              <Link
                href={
                  locale === "es"
                    ? "/reservar-con-martin"
                    : "/en/book-with-martin"
                }
                className="mt-3 flex w-full items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-900 hover:border-[#20d1b3]"
              >
                {locale === "es"
                  ? "Reservar con Martín →"
                  : "Book with Martín →"}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Related routes */}
      <section className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-sans font-bold text-2xl text-slate-950">
            {t.relatedTitle}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {routes.map((route) => (
              <Link
                key={route.id}
                href={route.href[locale]}
                className="rounded-full border border-slate-300 bg-[#f0f7fa] px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-[#20d1b3] hover:text-[#20d1b3]"
              >
                {route.label[locale]}
              </Link>
            ))}
            <Link
              href={
                locale === "es"
                  ? "/vuelos-charter-en-panama"
                  : "/en/charter-flights"
              }
              className="rounded-full border border-slate-300 bg-[#f0f7fa] px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-[#20d1b3] hover:text-[#20d1b3]"
            >
              {locale === "es"
                ? "Vuelos chárter en Panamá"
                : "Charter flights in Panama"}
            </Link>
            <Link
              href={
                locale === "es" ? "/nuestra-flota" : "/en/our-fleet"
              }
              className="rounded-full border border-slate-300 bg-[#f0f7fa] px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-[#20d1b3] hover:text-[#20d1b3]"
            >
              {locale === "es" ? "Ver toda la flota" : "See the full fleet"}
            </Link>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}
