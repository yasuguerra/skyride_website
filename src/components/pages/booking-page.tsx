import Link from "next/link";

import type { Locale } from "@/i18n/routing";
import { getWhatsAppHref } from "@/data/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { MartinChat } from "@/components/ui/MartinChat";
import { MartinChat } from "@/components/ui/MartinChat";

/**
 * /reservar-con-martin (ES) · /en/book-with-martin (EN)
 *
 * This page embeds the Martin AI booking agent. The agent lives at the
 * current WordPress URL which will be kept alive during migration.
 * For now we render a conversion-focused landing that funnels to WhatsApp,
 * and reserve a slot for the native Martin chat widget once the backend
 * CORS is updated for the new domain.
 */
export function BookingPage({ locale }: { locale: Locale }) {
  const whatsappHref = getWhatsAppHref(
    locale,
    locale === "es"
      ? "una reserva de vuelo"
      : "a flight booking"
  );

  const pageHref =
    locale === "en" ? "/en/book-with-martin" : "/reservar-con-martin";

  const t = locale === "es" ? es : en;

  return (
    <div className="min-h-screen bg-[#f7f4ec]">
      <Header locale={locale} />
      <Breadcrumbs
        locale={locale}
        items={[{ name: t.breadcrumb, href: pageHref }]}
      />

      <section className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-10">
        {/* Illustration / icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#d8a651]/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-[#c8953d]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
        </div>

        <h1 className="mt-8 font-serif text-4xl text-slate-950 sm:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{t.subtitle}</p>

        {/* Steps */}
        <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
          {t.steps.map((step, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c8953d] text-sm font-bold text-white">
                {i + 1}
              </div>
              <h3 className="mt-4 font-semibold text-slate-950">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-[#d8a651]/30 bg-[#d8a651]/10 p-8">
          <h2 className="font-serif text-2xl text-slate-950">{t.cta}</h2>
          <p className="mt-2 text-sm text-slate-700">{t.ctaSub}</p>
          <Link
            href={whatsappHref}
            className="mt-6 inline-flex rounded-full bg-[#c8953d] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-[#d8a651]"
          >
            {t.ctaButton}
          </Link>
        </div>

        {/* Martin AI Chat — powered by Vertex AI (Gemini) */}
        <div className="mt-12">
          <MartinChat locale={locale} />
        </div>
      </section>

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}

// ─── Copy ─────────────────────────────────────────────────────

const es = {
  breadcrumb: "Reservar con Martin",
  title: "Reserva tu vuelo con Martin",
  subtitle:
    "Martin es nuestro asistente de inteligencia artificial. Te ayuda a cotizar y reservar vuelos privados en segundos — sin esperas, sin complicaciones.",
  steps: [
    {
      title: "Escribe tu destino",
      desc: "Cuéntale a Martin a dónde quieres volar, cuántos pasajeros y la fecha.",
    },
    {
      title: "Recibe tu cotización",
      desc: "Martin te presenta opciones de aeronaves con precios en tiempo real.",
    },
    {
      title: "Confirma por WhatsApp",
      desc: "Un ejecutivo de Sky Ride finaliza tu reserva y te envía el itinerario.",
    },
  ],
  cta: "¿Prefieres hablar con una persona?",
  ctaSub: "Nuestro equipo responde por WhatsApp en menos de 10 minutos.",
  ctaButton: "Escribir por WhatsApp",
};

const en = {
  breadcrumb: "Book with Martin",
  title: "Book your flight with Martin",
  subtitle:
    "Martin is our AI assistant. He helps you quote and book private flights in seconds — no waiting, no hassle.",
  steps: [
    {
      title: "Tell us your destination",
      desc: "Let Martin know where you want to fly, how many passengers, and the date.",
    },
    {
      title: "Get your quote",
      desc: "Martin presents aircraft options with real-time pricing.",
    },
    {
      title: "Confirm via WhatsApp",
      desc: "A Sky Ride executive finalizes your booking and sends your itinerary.",
    },
  ],
  cta: "Prefer talking to a person?",
  ctaSub: "Our team replies on WhatsApp in under 10 minutes.",
  ctaButton: "Message on WhatsApp",
};
