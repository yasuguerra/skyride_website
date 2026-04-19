import Image from "next/image";
import Link from "next/link";

import { homeContent, type Locale, whatsappHref } from "@/content/home";

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

const fleetShowcase = [
  { name: "Cessna Grand Caravan", capacity: "12 passengers", image: "/images/fleet/cessna-caravan.jpg" },
  { name: "Daher Kodiak", capacity: "9 passengers", image: "/images/fleet/kodiak.jpg" },
  { name: "King Air 200", capacity: "9 passengers", image: "/images/fleet/king-air-200.png" },
  { name: "Eurocopter B3 (AS350)", capacity: "5 passengers", image: "/images/fleet/eurocopter-b3.jpg" },
  { name: "Eurocopter B4 (EC130)", capacity: "6 passengers", image: "/images/fleet/eurocopter-b4.jpg" },
  { name: "Robinson R66", capacity: "4 passengers", image: "/images/fleet/robinson-r66.jpg" },
  { name: "Robinson R44", capacity: "3 passengers", image: "/images/fleet/robinson-r44.jpg" },
  { name: "Cessna 206", capacity: "5 passengers", image: "/images/fleet/cessna-206.jpg" },
];

type HomePageProps = {
  locale: Locale;
};

export function HomePage({ locale }: HomePageProps) {
  const content = homeContent[locale];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(28,95,142,0.26),_transparent_45%),linear-gradient(180deg,_#07111d_0%,_#0b1625_38%,_#f3efe5_38%,_#f7f4ec_100%)] text-slate-950">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 text-sm text-slate-100 lg:px-10">
        <Link href={locale === "en" ? "/en" : "/"} className="flex items-center gap-3">
          <Image
            src="/images/logos/logo-skyride.png"
            alt="Sky Ride Panama"
            width={160}
            height={48}
            priority
            className="h-10 w-auto brightness-0 invert"
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
          className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white transition hover:border-white/50"
        >
          {content.switchLabel}
        </Link>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:pb-28 lg:pt-12">
          <div className="space-y-8 text-slate-100">
            <div className="inline-flex items-center rounded-full border border-sky-300/30 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.28em] text-sky-100 backdrop-blur">
              {content.hero.eyebrow}
            </div>
            <div className="space-y-6">
              <h1 className="max-w-4xl font-serif text-5xl leading-none sm:text-6xl lg:text-7xl">
                {content.hero.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {content.hero.description}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={whatsappHref}
                className="inline-flex items-center justify-center rounded-full bg-[#c8953d] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-[#d8a651]"
              >
                {content.hero.primaryCta}
              </Link>
              <Link
                href="#routes"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/50 hover:bg-white/8"
              >
                {content.hero.secondaryCta}
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {content.hero.stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-slate-950/30 lg:min-h-[540px]">
            <Image
              src="/images/hero/skyride-vuelos-privados-panama.webp"
              alt="Sky Ride Panama — vuelos privados"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 38vw"
            />
            <div className="relative z-10 flex h-full flex-col justify-end bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-6 lg:p-8">
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Booking flow</p>
                  <p className="mt-2 font-serif text-3xl text-white">3-step quote</p>
                </div>
                <div className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">
                  {content.localeLabel}
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {content.hero.steps.map((step, index) => (
                  <div key={step} className="rounded-2xl border border-white/15 bg-slate-950/40 p-4 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.24em] text-sky-200">Step {index + 1}</p>
                    <p className="mt-1 text-lg text-white">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="border-y border-slate-200 bg-[#f7f4ec]">
          <div className="mx-auto grid max-w-7xl gap-4 px-6 py-6 text-sm uppercase tracking-[0.22em] text-slate-600 lg:grid-cols-4 lg:px-10">
            {content.trust.map((item) => (
              <div key={item} className="rounded-full border border-slate-300/80 bg-white/70 px-4 py-3 text-center">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Core services</p>
            <h2 className="mt-4 font-serif text-4xl text-slate-950 sm:text-5xl">
              A stronger visual and commercial foundation for the services that drive revenue.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {content.services.map((service, index) => (
              <article key={service.title} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(8,15,28,0.4)]">
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
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-700">{service.badge}</p>
                  <h3 className="mt-4 font-serif text-3xl text-slate-950">{service.title}</h3>
                  <p className="mt-4 text-base leading-8 text-slate-600">{service.description}</p>
                  <Link href={whatsappHref} className="mt-8 inline-flex text-sm font-semibold uppercase tracking-[0.2em] text-slate-950">
                    Open WhatsApp &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="routes" className="bg-[#0c1727] py-20 text-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-200">Featured routes</p>
                <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Intent-led route cards ready for SEO and quote capture.</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-slate-300">
                These blocks are the first step toward the route-page cluster in the PRD. They can be expanded into dedicated locale-aware pages without changing the visual system.
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {content.routes.map((route, index) => (
                <article key={route.route} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 backdrop-blur-sm">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={routeImages[index] || routeImages[0]}
                      alt={route.route}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                    <p className="absolute bottom-3 left-5 text-xs uppercase tracking-[0.24em] text-[#d8a651]">{route.price}</p>
                  </div>
                  <div className="p-7">
                    <h3 className="font-serif text-3xl text-white">{route.route}</h3>
                    <p className="mt-4 text-base leading-8 text-slate-300">{route.detail}</p>
                    <Link href={whatsappHref} className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.2em] text-[#d8a651]">
                      Request this route &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Trust and proof</p>
            <h2 className="mt-4 font-serif text-4xl text-slate-950 sm:text-5xl">The homepage already carries the trust signals your PRD calls for.</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {content.testimonials.map((testimonial) => (
              <blockquote key={testimonial.name} className="rounded-[2rem] border border-slate-200 bg-[#f1ebe0] p-8">
                <p className="text-lg leading-8 text-slate-800">“{testimonial.quote}”</p>
                <footer className="mt-6 text-sm uppercase tracking-[0.22em] text-slate-500">
                  {testimonial.name} · {testimonial.service}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="fleet" className="border-y border-slate-200 bg-[#f7f4ec]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{locale === "es" ? "Nuestra flota" : "Our fleet"}</p>
              <h2 className="mt-4 font-serif text-4xl text-slate-950 sm:text-5xl">
                {locale === "es"
                  ? "Aeronaves certificadas para cada tipo de vuelo."
                  : "Certified aircraft for every type of flight."}
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {fleetShowcase.map((aircraft) => (
                <div key={aircraft.name} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="relative h-36 overflow-hidden sm:h-44">
                    <Image
                      src={aircraft.image}
                      alt={aircraft.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-slate-900">{aircraft.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{aircraft.capacity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-6 pb-28 pt-20 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[linear-gradient(135deg,_#0f1b2d_0%,_#18324f_55%,_#28547f_100%)] p-8 text-white shadow-[0_40px_120px_-60px_rgba(9,14,24,0.8)] lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-sky-100">Next build slice</p>
                <h2 className="mt-4 font-serif text-4xl sm:text-5xl">{content.finalCta.title}</h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">{content.finalCta.description}</p>
              </div>
              <div className="space-y-4">
                <Link
                  href={whatsappHref}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#d8a651] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950"
                >
                  {content.finalCta.primary}
                </Link>
                <Link
                  href={content.switchHref}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white"
                >
                  {content.finalCta.secondary}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-[#f7f4ec] px-6 py-10 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto_auto]">
          <div>
            <Image
              src="/images/logos/logo-skyride-dark.png"
              alt="Sky Ride Panama"
              width={140}
              height={42}
              className="h-9 w-auto"
            />
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{content.footer.blurb}</p>
            <div className="mt-4 flex gap-4">
              <Link href="https://www.facebook.com/skyridepa/" className="text-slate-500 hover:text-slate-800" aria-label="Facebook">FB</Link>
              <Link href="https://www.instagram.com/skyridepa/" className="text-slate-500 hover:text-slate-800" aria-label="Instagram">IG</Link>
              <Link href="https://www.tiktok.com/@skyridepa" className="text-slate-500 hover:text-slate-800" aria-label="TikTok">TK</Link>
              <Link href="https://www.youtube.com/@skyride9486" className="text-slate-500 hover:text-slate-800" aria-label="YouTube">YT</Link>
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
          &copy; {new Date().getFullYear()} Sky Ride Panam&aacute; | Vuelos Privados y Ch&aacute;rter. Todos los derechos reservados.
        </div>
      </footer>

      <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-full border border-slate-900/10 bg-white/95 p-2 shadow-2xl shadow-slate-900/10 backdrop-blur lg:hidden">
        <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-900">
          <Link href={whatsappHref} className="rounded-full bg-[#d8a651] px-4 py-3">
            WhatsApp
          </Link>
          <Link href="tel:+50768400045" className="rounded-full border border-slate-300 px-4 py-3">
            Call now
          </Link>
        </div>
      </div>
    </div>
  );
}