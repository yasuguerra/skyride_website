import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/routing";
import type { Aircraft } from "@/data/fleet";
import { getWhatsAppHref } from "@/data/navigation";
import { routes } from "@/data/routes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, productSchema } from "@/components/seo/JsonLd";

export function FleetDetailPage({
  locale,
  aircraft,
}: {
  locale: Locale;
  aircraft: Aircraft;
}) {
  const whatsappHref = getWhatsAppHref(
    locale,
    locale === "es"
      ? `alquilar el ${aircraft.name}`
      : `charter the ${aircraft.name}`,
  );

  const relatedRoutes = routes.filter((r) =>
    aircraft.routes.includes(r.slug),
  );

  const fleetIndexHref = locale === "en" ? "/en/our-fleet" : "/nuestra-flota";
  const detailUrl =
    locale === "en"
      ? `/en/product/${aircraft.slug}`
      : `/producto/${aircraft.slug}`;
  const priceNumber = aircraft.priceFrom
    ? Number(
        (aircraft.priceFrom.en || aircraft.priceFrom.es)
          .replace(/[^0-9]/g, ""),
      ) || undefined
    : undefined;

  return (
    <div className="min-h-screen bg-[#f0f7fa]">
      <Header locale={locale} />
      <Breadcrumbs
        locale={locale}
        items={[
          { name: locale === "es" ? "Nuestra Flota" : "Our Fleet", href: fleetIndexHref },
          { name: aircraft.name, href: detailUrl },
        ]}
      />
      <JsonLd
        data={productSchema({
          name: aircraft.name,
          description: aircraft.description[locale],
          image: aircraft.image,
          url: detailUrl,
          passengers: aircraft.passengers,
          priceFrom: priceNumber,
        })}
      />

      {/* Hero */}
      <section className="relative bg-[#152c46]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2 lg:px-10">
          <div className="flex flex-col justify-center text-white">
            <p className="text-xs uppercase tracking-wider text-sky-200">
              {locale === "es"
                ? aircraft.type === "airplane"
                  ? "Avión"
                  : "Helicóptero"
                : aircraft.type === "airplane"
                  ? "Airplane"
                  : "Helicopter"}
            </p>
            <h1 className="mt-4 font-sans font-bold text-4xl sm:text-5xl lg:text-6xl">
              {aircraft.name}
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              {aircraft.description[locale]}
            </p>
            {aircraft.priceFrom && (
              <p className="mt-4 inline-flex self-start rounded-full border border-[#3edcc2]/30 bg-[#3edcc2]/10 px-4 py-1.5 text-sm font-semibold text-[#3edcc2]">
                {aircraft.priceFrom[locale]}
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={whatsappHref}
                className="inline-flex items-center justify-center rounded-full bg-[#20d1b3] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-950"
              >
                {locale === "es"
                  ? "Alquilar esta aeronave"
                  : "Charter this aircraft"}
              </Link>
              <Link
                href={locale === "en" ? "/en/our-fleet" : "/nuestra-flota"}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white"
              >
                {locale === "es" ? "Ver toda la flota" : "View full fleet"}
              </Link>
            </div>
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-2xl">
            <Image
              src={aircraft.image}
              alt={aircraft.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <h2 className="font-sans font-bold text-3xl text-slate-950">
          {locale === "es" ? "Especificaciones" : "Specifications"}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SpecCard
            label={locale === "es" ? "Pasajeros" : "Passengers"}
            value={String(aircraft.passengers)}
          />
          {aircraft.specs.speed && (
            <SpecCard
              label={locale === "es" ? "Velocidad" : "Speed"}
              value={aircraft.specs.speed}
            />
          )}
          {aircraft.specs.range && (
            <SpecCard
              label={locale === "es" ? "Alcance" : "Range"}
              value={aircraft.specs.range}
            />
          )}
          {aircraft.specs.altitude && (
            <SpecCard
              label={locale === "es" ? "Altitud máxima" : "Max altitude"}
              value={aircraft.specs.altitude}
            />
          )}
          {aircraft.specs.engines && (
            <SpecCard
              label={locale === "es" ? "Motores" : "Engines"}
              value={aircraft.specs.engines}
            />
          )}
        </div>
      </section>

      {/* Gallery */}
      {aircraft.gallery && aircraft.gallery.length > 0 && (
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <h2 className="font-sans font-bold text-3xl text-slate-950">
              {locale === "es" ? "Galería" : "Gallery"}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {aircraft.gallery.map((img) => (
                <div
                  key={img}
                  className="relative h-56 overflow-hidden rounded-2xl"
                >
                  <Image
                    src={img}
                    alt={aircraft.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related routes */}
      {relatedRoutes.length > 0 && (
        <section className="border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <h2 className="font-sans font-bold text-3xl text-slate-950">
              {locale === "es"
                ? "Rutas disponibles con esta aeronave"
                : "Available routes with this aircraft"}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedRoutes.map((route) => (
                <Link
                  key={route.id}
                  href={
                    locale === "en"
                      ? `/en/route/${route.slug}`
                      : `/ruta/${route.slug}`
                  }
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-md"
                >
                  <p className="font-sans font-bold text-xl text-slate-950">
                    {route.origin[locale]} → {route.destination[locale]}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {route.flightTime} · ${route.startingPrice.toLocaleString()}+
                  </p>
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

function SpecCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}
