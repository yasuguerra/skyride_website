import Image from "next/image";
import Link from "next/link";

import { homeContent, type Locale, whatsappHref } from "@/content/home";
import { BookingForm } from "@/components/sections/BookingForm";
import { TrackedWhatsAppLink } from "@/components/ui/TrackedCTA";
import { TrustBar } from "@/components/sections/TrustBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { JsonLd, reviewSchema } from "@/components/seo/JsonLd";
import { fleet } from "@/data/fleet";
import { getBlogPostsByLocale } from "@/data/blog";

const WHATSAPP_NUMBER = "15557298766";

function whatsappRouteHref(route: string, locale: Locale) {
  const msg =
    locale === "es"
      ? `Hola *Sky Ride*, quiero consultar disponibilidad para la ruta ${route}.`
      : `Hello *Sky Ride*, I'd like to check availability for the ${route} route.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const serviceImages = [
  "/images/fleet/hawker-despegando.webp",
  "/images/fleet/eurocopter-b4-side.jpg",
  "/images/hero/charter-interior.webp",
];

const routeImages = [
  "/images/destinations/contadora.jpg",
  "/images/hero/turista-skyride.webp",
  "/images/destinations/vuelos-privados.jpg",
];

type HomePageProps = {
  locale: Locale;
};

export function HomePage({ locale }: HomePageProps) {
  const content = homeContent[locale];

  return (
    <div className="min-h-screen bg-[#f0f7fa] text-slate-950">
      <JsonLd data={[
        reviewSchema({ author: "Carlos M.", ratingValue: 5, reviewBody: "Excelente servicio de vuelo chárter a Contadora. Puntualidad perfecta.", datePublished: "2025-11-15" }),
        reviewSchema({ author: "Sarah T.", ratingValue: 5, reviewBody: "Amazing helicopter tour over Panama City. The views were breathtaking!", datePublished: "2025-12-03" }),
        reviewSchema({ author: "Roberto G.", ratingValue: 5, reviewBody: "Reservamos un vuelo a San Blas y todo fue impecable. 100% recomendado.", datePublished: "2026-01-20" }),
      ]} />
      <Header locale={locale} />

      <main id="main-content">
        {/* ─── HERO: Full-width cinematic ─────────────────────────── */}
        <section className="relative min-h-[85vh] overflow-hidden">
          <Image
            src="/images/hero/canal-panama.webp"
            alt="Aerial view of the Panama Canal — Sky Ride private flights"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40" />
          <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-6 py-16 lg:px-10">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center rounded-full border border-[#fff829]/30 bg-[#fff829]/10 px-4 py-2 text-xs uppercase tracking-wider text-[#fff829] backdrop-blur">
                {content.hero.eyebrow}
              </div>
              <h1 className="font-sans font-bold text-5xl leading-[1.1] text-white sm:text-6xl lg:text-8xl">
                {content.hero.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {content.hero.description}
              </p>

              {/* Primary + Secondary CTA */}
              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                <TrackedWhatsAppLink
                  href={whatsappHref}
                  locale={locale}
                  pagePath={locale === "en" ? "/en" : "/"}
                  serviceType="hero"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-green-900/30 transition hover:bg-[#20bd5a] hover:shadow-xl"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {content.hero.primaryCta}
                </TrackedWhatsAppLink>
                <Link
                  href="#routes"
                  className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium tracking-wide text-slate-300 transition hover:text-white"
                >
                  {content.hero.secondaryCta}
                </Link>
              </div>

              {/* Inline trust signals */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-slate-300">
                {content.hero.trustInline.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid max-w-lg gap-4 pt-4 sm:grid-cols-3">
                {content.hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Booking Form (standalone section) ─────────────────── */}
        <section className="bg-[#152c46] px-6 py-14 lg:px-10">
          <div className="mx-auto max-w-2xl">
            <BookingForm locale={locale} />
          </div>
        </section>

        <TrustBar locale={locale} variant="light" />

        <section id="services" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-wider text-slate-500">{content.sections.servicesLabel}</p>
            <h2 className="mt-4 font-sans font-bold text-4xl text-slate-950 sm:text-5xl">
              {content.sections.servicesTitle}
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {content.services.map((service, index) => (
              <article key={service.title} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(8,15,28,0.4)] transition-shadow hover:shadow-[0_32px_100px_-40px_rgba(8,15,28,0.5)]">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={serviceImages[index] || serviceImages[0]}
                    alt={service.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-7">
                  <p className="text-xs uppercase tracking-wider text-sky-700">{service.badge}</p>
                  <h3 className="mt-3 font-sans font-bold text-3xl text-slate-950">{service.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{service.description}</p>
                  <TrackedWhatsAppLink
                    href={whatsappHref}
                    locale={locale}
                    pagePath={locale === "en" ? "/en" : "/"}
                    serviceType={service.badge}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#20bd5a]"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {content.sections.servicesWhatsapp}
                  </TrackedWhatsAppLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="routes" className="bg-[#132840] py-20 text-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-wider text-sky-200">{content.sections.routesLabel}</p>
                <h2 className="mt-4 font-sans font-bold text-4xl sm:text-5xl">{content.sections.routesTitle}</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-slate-300">
                {content.sections.routesDescription}
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {content.routes.map((route, index) => (
                <article key={route.route} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 backdrop-blur-sm transition-shadow hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={routeImages[index] || routeImages[0]}
                      alt={route.route}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                    <p className="absolute bottom-3 left-5 rounded-full bg-[#3edcc2]/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-950">{route.price}</p>
                  </div>
                  <div className="p-7">
                    <h3 className="font-sans font-bold text-3xl text-white">{route.route}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-300">{route.detail}</p>
                    <TrackedWhatsAppLink
                      href={whatsappRouteHref(route.route, locale)}
                      locale={locale}
                      pagePath={locale === "en" ? "/en" : "/"}
                      serviceType={route.route}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#20bd5a]"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      {content.sections.routesCta}
                    </TrackedWhatsAppLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-wider text-slate-500">{content.sections.testimonialsLabel}</p>
              <h2 className="mt-4 font-sans font-bold text-4xl text-slate-950 sm:text-5xl">{content.sections.testimonialsTitle}</h2>
            </div>
            <p className="text-sm font-semibold text-[#20d1b3]"><span className="text-[#fff829]">★★★★★</span> {content.sections.reviewSummary}</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {content.testimonials.map((testimonial) => (
              <blockquote key={testimonial.name} className="rounded-[2rem] border border-slate-200 bg-[#e4f1f8] p-8">
                <p className="text-sm text-[#20d1b3]">★★★★★</p>
                <p className="mt-3 text-lg leading-8 text-slate-800">&ldquo;{testimonial.quote}&rdquo;</p>
                <footer className="mt-6 text-sm uppercase tracking-wide text-slate-500">
                  {testimonial.name} · {testimonial.service}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="fleet" className="border-y border-slate-200 bg-[#f0f7fa]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-wider text-slate-500">{content.sections.fleetLabel}</p>
                <h2 className="mt-4 font-sans font-bold text-4xl text-slate-950 sm:text-5xl">
                  {content.sections.fleetTitle}
                </h2>
              </div>
              <Link
                href={locale === "en" ? "/en/our-fleet" : "/nuestra-flota"}
                className="inline-flex items-center rounded-full border-2 border-[#20d1b3] px-6 py-2.5 text-sm font-semibold text-[#20d1b3] transition hover:bg-[#20d1b3] hover:text-slate-950"
              >
                {content.sections.fleetViewAll}
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {fleet.map((aircraft) => {
                const detailHref = locale === "en"
                  ? `/en/product/${aircraft.slug}`
                  : `/producto/${aircraft.slug}`;
                return (
                  <Link
                    key={aircraft.id}
                    href={detailHref}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className="relative h-40 overflow-hidden sm:h-48">
                      <Image
                        src={aircraft.image}
                        alt={aircraft.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                        {aircraft.passengers} {locale === "es" ? "pasajeros" : "passengers"}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-sans text-base font-bold text-slate-950">{aircraft.name}</h3>
                        <span className="rounded-full bg-[#3edcc2]/15 px-2 py-0.5 text-xs font-medium text-[#18b89e]">
                          {aircraft.type === "helicopter"
                            ? (locale === "es" ? "Helicóptero" : "Helicopter")
                            : (locale === "es" ? "Avión" : "Airplane")}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                        {aircraft.description[locale]}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                        {aircraft.specs.speed && (
                          <span>⚡ {aircraft.specs.speed}</span>
                        )}
                        {aircraft.specs.range && (
                          <span>📏 {aircraft.specs.range}</span>
                        )}
                      </div>
                      {aircraft.priceFrom && (
                        <p className="mt-3 text-sm font-semibold text-[#20d1b3]">
                          {aircraft.priceFrom[locale]}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={locale === "en" ? "/en/our-fleet" : "/nuestra-flota"}
                className="inline-flex items-center rounded-full bg-[#20d1b3] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-950 shadow-lg transition hover:bg-[#3edcc2] hover:shadow-xl"
              >
                {content.sections.fleetViewAll}
              </Link>
              <TrackedWhatsAppLink
                href={whatsappHref}
                locale={locale}
                pagePath={locale === "en" ? "/en" : "/"}
                serviceType="fleet-cta"
                className="inline-flex items-center rounded-full border-2 border-[#25D366] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
              >
                {content.sections.fleetCta}
              </TrackedWhatsAppLink>
            </div>
          </div>
        </section>

        {/* ─── EXPERIENCES GALLERY: Bento grid ─────────────────────── */}
        <section className="bg-[#152c46] px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-[#fff829]">{content.sections.experiencesLabel}</p>
              <h2 className="mt-4 font-sans font-bold text-4xl text-white sm:text-5xl">
                {content.sections.experiencesTitle}
              </h2>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
              {content.experiences.map((exp, i) => (
                <div
                  key={exp.image}
                  className={`group relative overflow-hidden rounded-2xl ${
                    i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                  } ${i === 0 ? "aspect-[4/3] lg:aspect-auto" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={exp.image}
                    alt={exp.alt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <span className="inline-block rounded-full bg-[#fff829] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#152c46]">
                      {exp.category}
                    </span>
                    <p className="mt-2 text-sm font-medium text-white drop-shadow-lg">{exp.caption}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <TrackedWhatsAppLink
                href={whatsappHref}
                locale={locale}
                pagePath={locale === "en" ? "/en" : "/"}
                serviceType="experiences-cta"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fb855] hover:shadow-xl"
              >
                {content.sections.experiencesCta}
              </TrackedWhatsAppLink>
            </div>
          </div>
        </section>

        {/* ─── BLOG SECTION ────────────────────────────────────────── */}
        <section id="blog" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-wider text-slate-500">{content.sections.blogLabel}</p>
              <h2 className="mt-4 font-sans font-bold text-4xl text-slate-950 sm:text-5xl">
                {content.sections.blogTitle}
              </h2>
            </div>
            <Link
              href={locale === "en" ? "/en/blog" : "/blog"}
              className="inline-flex items-center rounded-full border-2 border-[#20d1b3] px-6 py-2.5 text-sm font-semibold text-[#20d1b3] transition hover:bg-[#20d1b3] hover:text-slate-950"
            >
              {content.sections.blogViewAll}
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getBlogPostsByLocale(locale).slice(0, 3).map((post) => {
              const postHref = locale === "en" ? `/en/${post.slug}` : `/${post.slug}`;
              return (
                <Link
                  key={post.slug}
                  href={postHref}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-[#20d1b3]">{post.category}</p>
                    <h3 className="mt-2 font-sans text-lg font-bold leading-snug text-slate-950 group-hover:text-[#4670b5] transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                    <p className="mt-3 text-xs text-slate-400">
                      {new Date(post.date).toLocaleDateString(locale === "es" ? "es-PA" : "en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      {" · "}{post.readingMinutes} {locale === "es" ? "min de lectura" : "min read"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={locale === "en" ? "/en/blog" : "/blog"}
              className="inline-flex items-center rounded-full bg-[#20d1b3] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-950 shadow-lg transition hover:bg-[#3edcc2] hover:shadow-xl"
            >
              {content.sections.blogViewAll}
            </Link>
          </div>
        </section>

        {/* ─── SEO CONTENT BLOCK ───────────────────────────────────── */}
        <section className="bg-white px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-sans font-bold text-3xl text-slate-950 sm:text-4xl">
              {content.seoContent.title}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
              {content.seoContent.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-6 pb-28 pt-20 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[linear-gradient(135deg,_#152c46_0%,_#1e3a5a_55%,_#4670b5_100%)] p-8 text-white shadow-[0_40px_120px_-60px_rgba(9,14,24,0.8)] lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-wider text-sky-100">{content.sections.ctaLabel}</p>
                <h2 className="mt-4 font-sans font-bold text-4xl sm:text-5xl">{content.finalCta.title}</h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">{content.finalCta.description}</p>
              </div>
              <div className="space-y-4">
                <TrackedWhatsAppLink
                  href={whatsappHref}
                  locale={locale}
                  pagePath={locale === "en" ? "/en" : "/"}
                  serviceType="final-cta"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#20bd5a]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {content.finalCta.primary}
                </TrackedWhatsAppLink>
                <Link
                  href="tel:+50768400045"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white/40"
                >
                  {content.finalCta.secondary}
                </Link>
                <p className="text-center text-xs text-slate-400">{content.sections.noCreditCard}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}