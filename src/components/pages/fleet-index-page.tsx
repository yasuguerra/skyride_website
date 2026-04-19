import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/routing";
import { fleet } from "@/data/fleet";
import { getWhatsAppHref } from "@/data/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function FleetIndexPage({ locale }: { locale: Locale }) {
  const pageUrl = locale === "en" ? "/en/our-fleet" : "/nuestra-flota";
  const title = locale === "es" ? "Nuestra Flota" : "Our Fleet";
  const airplanes = fleet.filter((a) => a.type === "airplane");
  const helicopters = fleet.filter((a) => a.type === "helicopter");

  return (
    <div className="min-h-screen bg-[#f7f4ec]">
      <Header locale={locale} />
      <Breadcrumbs locale={locale} items={[{ name: title, href: pageUrl }]} />

      {/* Hero */}
      <section className="bg-[#0b1625] px-6 py-20 text-white lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-200">
            {locale === "es" ? "13 aeronaves certificadas" : "13 certified aircraft"}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl sm:text-5xl lg:text-6xl">
            {locale === "es" ? "Nuestra Flota" : "Our Fleet"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            {locale === "es"
              ? "Aviones y helicópteros para cada tipo de vuelo. Desde traslados económicos hasta vuelos ejecutivos internacionales."
              : "Airplanes and helicopters for every type of flight. From affordable transfers to international executive flights."}
          </p>
        </div>
      </section>

      {/* Airplanes */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <h2 className="font-serif text-3xl text-slate-950 sm:text-4xl">
          {locale === "es" ? "Aviones" : "Airplanes"}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {airplanes.map((aircraft) => (
            <AircraftCard
              key={aircraft.id}
              aircraft={aircraft}
              locale={locale}
            />
          ))}
        </div>
      </section>

      {/* Helicopters */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <h2 className="font-serif text-3xl text-slate-950 sm:text-4xl">
            {locale === "es" ? "Helicópteros" : "Helicopters"}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {helicopters.map((aircraft) => (
              <AircraftCard
                key={aircraft.id}
                aircraft={aircraft}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}

function AircraftCard({
  aircraft,
  locale,
}: {
  aircraft: (typeof fleet)[number];
  locale: Locale;
}) {
  const detailHref =
    locale === "en"
      ? `/en/product/${aircraft.slug}`
      : `/producto/${aircraft.slug}`;

  return (
    <Link
      href={detailHref}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={aircraft.image}
          alt={aircraft.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur">
          {aircraft.passengers} {locale === "es" ? "pax" : "pax"}
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-sky-700">
          {locale === "es"
            ? aircraft.type === "airplane"
              ? "Avión"
              : "Helicóptero"
            : aircraft.type === "airplane"
              ? "Airplane"
              : "Helicopter"}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-slate-950">
          {aircraft.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
          {aircraft.description[locale]}
        </p>
        {aircraft.priceFrom && (
          <p className="mt-3 text-sm font-semibold text-[#c8953d]">
            {aircraft.priceFrom[locale]}
          </p>
        )}
      </div>
    </Link>
  );
}
