import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/routing";
import type { Destination } from "@/data/destinations";
import { getRoute } from "@/data/routes";
import { fleet } from "@/data/fleet";
import { getContentHubForDestination } from "@/data/content-hubs";
import { getWhatsAppHref } from "@/data/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, tripSchema, faqSchema } from "@/components/seo/JsonLd";
import { TrackedWhatsAppLink, TrackedPhoneLink } from "@/components/ui/TrackedCTA";

export function DestinationPage({
  locale,
  destination,
}: {
  locale: Locale;
  destination: Destination;
}) {
  const route = getRoute(destination.routeId);
  const hub = getContentHubForDestination(destination.id);
  const routeAircraft = route ? fleet.filter((a) => route.aircraft.includes(a.id)) : [];
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
      {route?.faq && route.faq.length > 0 && (
        <JsonLd
          data={faqSchema(
            route.faq.map((f) => ({ question: f.q[locale], answer: f.a[locale] })),
          )}
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

      {/* Flight info from route */}
      {route && (
        <>
          {/* Stats */}
          <section className="border-t border-slate-200 bg-[#152c46]">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    {locale === "es" ? "Tiempo de vuelo" : "Flight time"}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">{route.flightTime}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    {locale === "es" ? "Distancia" : "Distance"}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">{route.distance}</p>
                </div>
                <div className="rounded-2xl border border-[#3edcc2]/30 bg-[#3edcc2]/10 p-5">
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    {locale === "es" ? "Desde" : "From"}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[#3edcc2]">${route.startingPrice.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    {locale === "es" ? "Aeronaves" : "Aircraft"}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {routeAircraft.length} {locale === "es" ? "opciones" : "options"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Route description & highlights */}
          <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
              <div>
                <h2 className="font-sans font-bold text-3xl text-slate-950">
                  {locale === "es"
                    ? `Tu vuelo a ${destination.name.es}`
                    : `Your flight to ${destination.name.en}`}
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-700">{route.description[locale]}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {route.highlights[locale].map((h) => (
                    <div key={h} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                      <span className="mt-0.5 text-[#20d1b3]">✓</span>
                      <span className="text-sm text-slate-700">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-4xl font-semibold text-slate-950">
                    ${route.startingPrice.toLocaleString()}
                    <span className="text-base font-normal text-slate-500">+</span>
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {locale === "es" ? "Precio inicial" : "Starting price"}
                  </p>
                  <TrackedWhatsAppLink
                    href={whatsappHref}
                    locale={locale}
                    pagePath={destUrl}
                    serviceType="destination-route-sidebar"
                    className="mt-6 flex w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white"
                  >
                    WhatsApp
                  </TrackedWhatsAppLink>
                  <TrackedPhoneLink
                    href="tel:+50768400045"
                    locale={locale}
                    pagePath={destUrl}
                    className="mt-3 flex w-full items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-900"
                  >
                    {locale === "es" ? "Llamar" : "Call"}
                  </TrackedPhoneLink>
                </div>
              </aside>
            </div>
          </section>

          {/* Extended content sections */}
          {route.contentSections && route.contentSections.length > 0 && (
            <section className="border-t border-slate-200 bg-white">
              <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
                <div className="space-y-12">
                  {route.contentSections.map((section) => (
                    <div key={section.id}>
                      <h2 className="font-sans font-bold text-2xl text-slate-950">{section.heading[locale]}</h2>
                      <p className="mt-4 leading-8 text-slate-700">{section.body[locale]}</p>
                      {section.listItems && section.listItems.length > 0 && (
                        <ul className="mt-4 space-y-3">
                          {section.listItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="mt-1 flex-shrink-0 text-[#20d1b3]">✓</span>
                              <span className="text-slate-700">{item[locale]}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Aircraft options */}
          {routeAircraft.length > 0 && (
            <section className="border-t border-slate-200 bg-white">
              <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
                <h2 className="font-sans font-bold text-3xl text-slate-950">
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
                      className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-[#f0f7fa] p-4 transition hover:shadow-md"
                    >
                      <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl">
                        <Image src={aircraft.image} alt={aircraft.name} fill className="object-cover" sizes="112px" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-950">{aircraft.name}</p>
                        <p className="text-sm text-slate-600">
                          {aircraft.passengers} {locale === "es" ? "pasajeros" : "passengers"}
                        </p>
                        {aircraft.priceFrom && (
                          <p className="text-sm text-[#20d1b3]">{aircraft.priceFrom[locale]}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* FAQ */}
          {route.faq && route.faq.length > 0 && (
            <section className="border-t border-slate-200 bg-[#f0f7fa]">
              <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
                <h2 className="font-sans font-bold text-3xl text-slate-950">
                  {locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}
                </h2>
                <dl className="mt-8 space-y-6">
                  {route.faq.map((item, i) => (
                    <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
                      <dt className="font-semibold text-slate-950">{item.q[locale]}</dt>
                      <dd className="mt-2 text-sm leading-7 text-slate-600">{item.a[locale]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          )}
        </>
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
