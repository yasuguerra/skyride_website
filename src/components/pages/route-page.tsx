import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/routing";
import type { RouteData } from "@/data/routes";
import { fleet } from "@/data/fleet";
import { getWhatsAppHref } from "@/data/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, tripSchema } from "@/components/seo/JsonLd";

export function RoutePage({
  locale,
  route,
}: {
  locale: Locale;
  route: RouteData;
}) {
  const whatsappHref = getWhatsAppHref(
    locale,
    locale === "es"
      ? `la ruta ${route.origin.es} → ${route.destination.es}`
      : `the ${route.origin.en} → ${route.destination.en} route`,
  );

  const routeAircraft = fleet.filter((a) =>
    route.aircraft.includes(a.id),
  );

  const routeUrl =
    locale === "en" ? `/en/route/${route.slug}` : `/ruta/${route.slug}`;
  const routeName = `${route.origin[locale]} → ${route.destination[locale]}`;

  return (
    <div className="min-h-screen bg-[#f7f4ec]">
      <Header locale={locale} />
      <Breadcrumbs
        locale={locale}
        items={[{ name: routeName, href: routeUrl }]}
      />
      <JsonLd
        data={tripSchema({
          origin: route.origin[locale],
          destination: route.destination[locale],
          description: route.description[locale],
          url: routeUrl,
          priceFrom: route.startingPrice,
          image: route.image,
          duration: route.flightTime,
        })}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b1625]">
        <Image
          src={route.image}
          alt={`${route.origin[locale]} → ${route.destination[locale]}`}
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0b1625]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-200">
            {locale === "es" ? "Ruta" : "Route"}
          </p>
          <h1 className="mt-4 font-serif text-4xl text-white sm:text-5xl lg:text-6xl">
            {route.origin[locale]} → {route.destination[locale]}
          </h1>

          {/* Route stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            <StatCard
              label={locale === "es" ? "Tiempo de vuelo" : "Flight time"}
              value={route.flightTime}
            />
            <StatCard
              label={locale === "es" ? "Distancia" : "Distance"}
              value={route.distance}
            />
            <StatCard
              label={locale === "es" ? "Desde" : "From"}
              value={`$${route.startingPrice.toLocaleString()}`}
              highlight
            />
            <StatCard
              label={locale === "es" ? "Aeronaves" : "Aircraft"}
              value={`${routeAircraft.length} ${locale === "es" ? "opciones" : "options"}`}
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={whatsappHref}
              className="inline-flex items-center justify-center rounded-full bg-[#c8953d] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950"
            >
              {locale === "es" ? "Reservar esta ruta" : "Book this route"}
            </Link>
            <Link
              href="tel:+50768400045"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white"
            >
              +507 6840 0045
            </Link>
          </div>
        </div>
      </section>

      {/* Description & Highlights */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <h2 className="font-serif text-3xl text-slate-950">
              {locale === "es"
                ? "Acerca de esta ruta"
                : "About this route"}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              {route.description[locale]}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {route.highlights[locale].map((h) => (
                <div
                  key={h}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <span className="mt-0.5 text-[#c8953d]">✓</span>
                  <span className="text-sm text-slate-700">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-4xl font-semibold text-slate-950">
                ${route.startingPrice.toLocaleString()}
                <span className="text-base font-normal text-slate-500">+</span>
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {locale === "es" ? "Precio inicial" : "Starting price"}
              </p>
              <Link
                href={whatsappHref}
                className="mt-6 flex w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white"
              >
                WhatsApp
              </Link>
              <Link
                href="tel:+50768400045"
                className="mt-3 flex w-full items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900"
              >
                {locale === "es" ? "Llamar" : "Call"}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Aircraft options */}
      {routeAircraft.length > 0 && (
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <h2 className="font-serif text-3xl text-slate-950">
              {locale === "es"
                ? "Aeronaves disponibles para esta ruta"
                : "Aircraft available for this route"}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {routeAircraft.map((aircraft) => (
                <Link
                  key={aircraft.id}
                  href={
                    locale === "en"
                      ? `/en/product/${aircraft.slug}`
                      : `/producto/${aircraft.slug}`
                  }
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-[#f7f4ec] p-4 transition hover:shadow-md"
                >
                  <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={aircraft.image}
                      alt={aircraft.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">
                      {aircraft.name}
                    </p>
                    <p className="text-sm text-slate-600">
                      {aircraft.passengers}{" "}
                      {locale === "es" ? "pasajeros" : "passengers"}
                    </p>
                    {aircraft.priceFrom && (
                      <p className="text-sm text-[#c8953d]">
                        {aircraft.priceFrom[locale]}
                      </p>
                    )}
                  </div>
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

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-[#d8a651]/30 bg-[#d8a651]/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p
        className={`mt-2 text-2xl font-semibold ${
          highlight ? "text-[#d8a651]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
