import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/routing";
import type { Destination } from "@/data/destinations";
import { getRoute } from "@/data/routes";
import { getContentHubForDestination } from "@/data/content-hubs";
import { getWhatsAppHref } from "@/data/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, tripSchema } from "@/components/seo/JsonLd";
import { TrackedWhatsAppLink } from "@/components/ui/TrackedCTA";

export function DestinationPage({
  locale,
  destination,
}: {
  locale: Locale;
  destination: Destination;
}) {
  const route = getRoute(destination.routeId);
  const hub = getContentHubForDestination(destination.id);
  const whatsappHref = getWhatsAppHref(
    locale,
    locale === "es"
      ? `un vuelo a ${destination.name.es}`
      : `a flight to ${destination.name.en}`,
  );

  const destUrl =
    locale === "en"
      ? `/en/destination/${destination.id}`
      : `/destino/${destination.id}`;

  return (
    <div className="min-h-screen bg-[#f0f7fa]">
      <Header locale={locale} />
      <Breadcrumbs
        locale={locale}
        items={[{ name: destination.name[locale], href: destUrl }]}
      />
      {route && (
        <JsonLd
          data={tripSchema({
            origin: route.origin[locale],
            destination: route.destination[locale],
            description: destination.description[locale],
            url: destUrl,
            priceFrom: route.startingPrice,
            image: destination.image,
            duration: route.flightTime,
          })}
        />
      )}

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden bg-[#152c46]">
        <Image
          src={destination.image}
          alt={destination.name[locale]}
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#152c46] via-[#152c46]/40 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12 lg:px-10">
          {route && (
            <p className="mb-3 inline-flex self-start rounded-full border border-[#3edcc2]/30 bg-[#3edcc2]/10 px-4 py-1.5 text-sm font-semibold text-[#3edcc2]">
              {locale === "es" ? "Desde" : "From"} ${route.startingPrice.toLocaleString()} · {route.flightTime}
            </p>
          )}
          <h1 className="max-w-3xl font-sans font-bold text-4xl text-white sm:text-5xl lg:text-6xl">
            {locale === "es"
              ? `Vuelo Privado a ${destination.name.es}`
              : `Private Flight to ${destination.name.en}`}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-300">
            {destination.description[locale]}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <TrackedWhatsAppLink
              href={whatsappHref}
              locale={locale}
              pagePath={destUrl}
              serviceType="destination-hero"
              className="inline-flex items-center justify-center rounded-full bg-[#20d1b3] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-950"
            >
              {locale === "es"
                ? `Volar a ${destination.name.es}`
                : `Fly to ${destination.name.en}`}
            </TrackedWhatsAppLink>
            {route && (
              <Link
                href={
                  locale === "en"
                    ? `/en/route/${route.slug}`
                    : `/ruta/${route.slug}`
                }
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white"
              >
                {locale === "es" ? "Ver detalles de ruta" : "View route details"}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <h2 className="font-sans font-bold text-3xl text-slate-950">
          {locale === "es"
            ? `¿Por qué volar a ${destination.name.es}?`
            : `Why fly to ${destination.name.en}?`}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {destination.highlights[locale].map((highlight) => (
            <div
              key={highlight}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5"
            >
              <span className="mt-0.5 text-[#20d1b3]">✓</span>
              <span className="text-slate-700">{highlight}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Content Hub CTA */}
      {hub && (
        <section className="mx-auto max-w-7xl px-6 pb-4 lg:px-10">
          <Link
            href={locale === "en" ? hub.servicePage.en : hub.servicePage.es}
            className="flex items-center justify-between gap-4 rounded-2xl border border-[#20d1b3]/30 bg-[#152c46] px-6 py-5 text-white transition hover:bg-[#1a3655]"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#20d1b3]">
                {locale === "es" ? "Guía completa" : "Complete guide"}
              </p>
              <p className="mt-1 font-semibold text-lg">{hub.title[locale]}</p>
              <p className="mt-1 text-sm text-slate-300">{hub.subtitle[locale]}</p>
            </div>
            <span className="shrink-0 text-[#20d1b3] text-2xl">&rarr;</span>
          </Link>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#132840] px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="font-sans font-bold text-3xl sm:text-4xl">
            {locale === "es"
              ? `Reserve su vuelo a ${destination.name.es}`
              : `Book your flight to ${destination.name.en}`}
          </h2>
          <p className="mt-4 text-slate-300">
            {locale === "es"
              ? "Cotización en menos de 10 minutos por WhatsApp."
              : "Quote in under 10 minutes via WhatsApp."}
          </p>
          <TrackedWhatsAppLink
            href={whatsappHref}
            locale={locale}
            pagePath={destUrl}
            serviceType="destination-cta"
            className="mt-8 inline-flex rounded-full bg-[#3edcc2] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-slate-950"
          >
            {locale === "es" ? "Cotizar ahora" : "Get a quote"}
          </TrackedWhatsAppLink>
        </div>
      </section>

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}
