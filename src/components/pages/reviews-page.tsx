import Link from "next/link";
import type { Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, aggregateRatingSchema, reviewSchema } from "@/components/seo/JsonLd";
import { TrackedWhatsAppLink } from "@/components/ui/TrackedCTA";
import { getWhatsAppHref } from "@/data/navigation";
import { testimonials } from "@/data/testimonials";

// ─── Copy ──────────────────────────────────────────────────────────────────────
const copy = {
  es: {
    title: "Reseñas y Opiniones — Sky Ride Panama",
    subtitle: "Lo que dicen nuestros pasajeros",
    description:
      "Más de 500 vuelos completados y cientos de pasajeros satisfechos. Lee las experiencias de quienes han volado con Sky Ride Panama.",
    aggregate: "Calificación promedio",
    totalReviews: "127 reseñas verificadas",
    sourceGoogle: "Google",
    sourceDirect: "Directo",
    serviceLabels: {
      charter: "Vuelo chárter",
      helicopter: "Helicóptero",
      "available-seats": "Asientos compartidos",
      general: "General",
    },
    ctaHeading: "¿Listo para volar?",
    ctaBody:
      "Únase a cientos de pasajeros que ya confían en Sky Ride Panama. Cotice su vuelo por WhatsApp en menos de 10 minutos.",
    ctaButton: "Cotizar por WhatsApp",
    ctaSecondary: "Reservar con Martín →",
    googleCta: "Ver todas las reseñas en Google →",
    breadcrumb: "Reseñas",
    statsFlights: "vuelos completados",
    statsRating: "calificación promedio",
    statsYears: "años de experiencia",
  },
  en: {
    title: "Reviews & Testimonials — Sky Ride Panama",
    subtitle: "What our passengers say",
    description:
      "Over 500 flights completed and hundreds of happy passengers. Read the experiences of those who have flown with Sky Ride Panama.",
    aggregate: "Average rating",
    totalReviews: "127 verified reviews",
    sourceGoogle: "Google",
    sourceDirect: "Direct",
    serviceLabels: {
      charter: "Charter flight",
      helicopter: "Helicopter",
      "available-seats": "Shared seats",
      general: "General",
    },
    ctaHeading: "Ready to fly?",
    ctaBody:
      "Join hundreds of passengers who already trust Sky Ride Panama. Get your flight quote via WhatsApp in under 10 minutes.",
    ctaButton: "Quote via WhatsApp",
    ctaSecondary: "Book with Martín →",
    googleCta: "See all reviews on Google →",
    breadcrumb: "Reviews",
    statsFlights: "flights completed",
    statsRating: "average rating",
    statsYears: "years of experience",
  },
} as const;

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-amber-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ReviewsPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const pageUrl = locale === "es" ? "/resenas" : "/en/reviews";

  const whatsappHref = getWhatsAppHref(
    locale,
    locale === "es" ? "cotización de vuelo" : "flight quote",
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
          aggregateRatingSchema({ ratingValue: 4.9, reviewCount: 127 }),
          ...testimonials.map((t2) =>
            reviewSchema({
              author: t2.name,
              ratingValue: t2.rating,
              reviewBody: t2.text[locale],
              datePublished: t2.date,
            }),
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
          <p className="mt-3 max-w-2xl text-sm text-slate-400">{t.description}</p>

          {/* Aggregate score */}
          <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
            <span className="font-sans font-bold text-5xl text-[#20d1b3]">4.9</span>
            <div>
              <StarRow rating={5} />
              <p className="mt-1 text-sm text-slate-300">{t.totalReviews}</p>
            </div>
          </div>
        </div>
      </section>

      <TrustBar locale={locale} variant="dark" />

      {/* Stats bar */}
      <section className="border-b border-slate-200 bg-white py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-6 px-6 text-center lg:px-10">
          {[
            { value: "500+", label: t.statsFlights },
            { value: "4.9 / 5", label: t.statsRating },
            { value: "10+", label: t.statsYears },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-sans font-bold text-3xl text-[#152c46] sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials grid + sidebar */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          {/* Cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            {testimonials.map((review) => (
              <article
                key={review.name}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">{review.name}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {t.serviceLabels[review.service]}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                      review.source === "google"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {review.source === "google" ? t.sourceGoogle : t.sourceDirect}
                  </span>
                </div>

                {/* Stars */}
                <div className="mt-3">
                  <StarRow rating={review.rating} />
                </div>

                {/* Body */}
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                  &ldquo;{review.text[locale]}&rdquo;
                </p>

                {/* Date */}
                <p className="mt-4 text-xs text-slate-400">
                  {new Date(review.date).toLocaleDateString(
                    locale === "es" ? "es-PA" : "en-US",
                    { year: "numeric", month: "long", day: "numeric" },
                  )}
                </p>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-sans font-bold text-2xl text-slate-950">
                {t.ctaHeading}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{t.ctaBody}</p>
              <TrackedWhatsAppLink
                href={whatsappHref}
                locale={locale}
                pagePath={pageUrl}
                serviceType="reviews"
                className="mt-6 flex w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white"
              >
                {t.ctaButton}
              </TrackedWhatsAppLink>
              <Link
                href={locale === "es" ? "/reservar-con-martin" : "/en/book-with-martin"}
                className="mt-3 flex w-full items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-900 hover:border-[#20d1b3]"
              >
                {t.ctaSecondary}
              </Link>
            </div>

            {/* Google link */}
            <a
              href="https://share.google/ELN1nvr2cG5O6XJTC"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm hover:border-[#20d1b3] hover:text-[#20d1b3]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t.googleCta}
            </a>
          </aside>
        </div>
      </section>

      {/* Related links */}
      <section className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap gap-3">
            <Link
              href={locale === "es" ? "/vuelos-charter-en-panama" : "/en/charter-flights"}
              className="rounded-full border border-slate-300 bg-[#f0f7fa] px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-[#20d1b3] hover:text-[#20d1b3]"
            >
              {locale === "es" ? "Vuelos chárter en Panamá" : "Charter flights in Panama"}
            </Link>
            <Link
              href={locale === "es" ? "/paseo-en-helicoptero-en-panama" : "/en/helicopter-rides"}
              className="rounded-full border border-slate-300 bg-[#f0f7fa] px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-[#20d1b3] hover:text-[#20d1b3]"
            >
              {locale === "es" ? "Paseos en helicóptero" : "Helicopter tours"}
            </Link>
            <Link
              href={locale === "es" ? "/nuestra-flota" : "/en/our-fleet"}
              className="rounded-full border border-slate-300 bg-[#f0f7fa] px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-[#20d1b3] hover:text-[#20d1b3]"
            >
              {locale === "es" ? "Ver la flota" : "See the fleet"}
            </Link>
            <Link
              href={locale === "es" ? "/reservar-con-martin" : "/en/book-with-martin"}
              className="rounded-full border border-slate-300 bg-[#f0f7fa] px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-[#20d1b3] hover:text-[#20d1b3]"
            >
              {locale === "es" ? "Reservar con Martín" : "Book with Martín"}
            </Link>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}
