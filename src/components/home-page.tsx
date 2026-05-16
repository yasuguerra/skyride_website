import Image from "next/image";
import Link from "next/link";

import { homeContent, type Locale, whatsappHref } from "@/content/home";
import { BookingForm } from "@/components/sections/BookingForm";
import { TrustBar } from "@/components/sections/TrustBar";
import { JsonLd, aggregateRatingSchema, reviewSchema } from "@/components/seo/JsonLd";
import { fleet } from "@/data/fleet";
import { getBlogPostsByLocale } from "@/data/blog";
import { TrackedWhatsAppLink } from "@/components/ui/TrackedCTA";

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
  "/images/hero/charter-exterior.webp",
  "/images/hero/cabecera-charter.webp",
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
        aggregateRatingSchema({ ratingValue: 4.9, reviewCount: 127 }),
        reviewSchema({ author: "Carlos M.", ratingValue: 5, reviewBody: "Excelente servicio de vuelo chárter a Contadora. Puntualidad perfecta.", datePublished: "2025-11-15" }),
        reviewSchema({ author: "Sarah T.", ratingValue: 5, reviewBody: "Amazing helicopter tour over Panama City. The views were breathtaking!", datePublished: "2025-12-03" }),
        reviewSchema({ author: "Roberto G.", ratingValue: 5, reviewBody: "Reservamos un vuelo a San Blas y todo fue impecable. 100% recomendado.", datePublished: "2026-01-20" }),
      ]} />
      <header className="absolute left-0 right-0 top-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 text-sm text-slate-100 lg:px-10">
        <Link href={locale === "en" ? "/en" : "/"} className="flex items-center gap-3">
          <Image
            src="/images/logos/logo-skyride-dark.png"
            alt="Sky Ride Panama"
            width={160}
            height={48}
            priority
            className="h-10 w-auto"
          />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {content.nav.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={content.switchHref}
          className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-wider text-white transition hover:border-white/50"
        >
          {content.switchLabel}
        </Link>
      </header>

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
          <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-6 py-20 lg:px-10">
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
                    serviceType="service-card"
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
                      serviceType="route-card"
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
              <Link
                href={whatsappHref}
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fb855] hover:shadow-xl"
              >
                {content.sections.experiencesCta}
              </Link>
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
                <Link
                  href={whatsappHref}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#20bd5a]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {content.finalCta.primary}
                </Link>
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

      <footer className="border-t border-slate-200 bg-[#f0f7fa] px-6 py-10 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto_auto]">
          <div>
            <Image
              src="/images/logos/logo-skyride.png"
              alt="Sky Ride Panama"
              width={140}
              height={42}
              className="h-9 w-auto"
            />
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{content.footer.blurb}</p>
            <div className="mt-4 flex gap-4">
              <Link href="https://www.facebook.com/skyridepa/" className="text-slate-500 hover:text-slate-800" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </Link>
              <Link href="https://www.instagram.com/skyridepa/" className="text-slate-500 hover:text-slate-800" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </Link>
              <Link href="https://www.tiktok.com/@skyridepa" className="text-slate-500 hover:text-slate-800" aria-label="TikTok">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </Link>
              <Link href="https://www.youtube.com/@skyride9486" className="text-slate-500 hover:text-slate-800" aria-label="YouTube">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </Link>
            </div>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            {content.footer.contact.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div className="flex items-end">
            <Image
              src="/images/trust/tarjetas.webp"
              alt="Visa, Mastercard, Wompi"
              width={180}
              height={40}
              className="h-8 w-auto opacity-70"
            />
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-7xl border-t border-slate-300/60 pt-4 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Sky Ride Panamá | Vuelos Privados y Chárter. Todos los derechos reservados.
        </div>
      </footer>

      <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-full border border-slate-900/10 bg-white/95 p-2 shadow-2xl shadow-slate-900/10 backdrop-blur lg:hidden">
        <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold uppercase tracking-wide">
          <Link href={whatsappHref} className="flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-4 py-3 text-white">
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </Link>
          <Link href="tel:+50768400045" className="rounded-full border border-slate-300 px-4 py-3 text-slate-900">
            {content.sections.callNow}
          </Link>
        </div>
      </div>
    </div>
  );
}