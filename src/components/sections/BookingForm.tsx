"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import { trackBookingFormStep, trackFormSubmit } from "@/lib/analytics";
import {
  getInstantQuotes,
  formatPrice,
  quoteCopy,
  type QuoteOption,
} from "@/data/pricing";

const destinations = [
  { value: "contadora", label: { es: "Isla Contadora", en: "Contadora Island" } },
  { value: "san-blas", label: { es: "San Blas (Guna Yala)", en: "San Blas (Guna Yala)" } },
  { value: "costa-rica", label: { es: "Costa Rica", en: "Costa Rica" } },
  { value: "bocas-del-toro", label: { es: "Bocas del Toro", en: "Bocas del Toro" } },
  { value: "medellin", label: { es: "Medellín", en: "Medellín" } },
  { value: "other", label: { es: "Otro destino", en: "Other destination" } },
];

const origins = [
  { value: "panama-city", label: { es: "Ciudad de Panamá", en: "Panama City" } },
  { value: "david", label: { es: "David, Chiriquí", en: "David, Chiriquí" } },
  { value: "other", label: { es: "Otra ciudad", en: "Other city" } },
];

const t = {
  es: {
    heading: "Cotiza tu vuelo",
    step1: "Origen",
    step2: "Destino",
    step3: "Fecha y pasajeros",
    step4: "Opciones",
    originLabel: "¿Desde dónde sales?",
    destLabel: "¿A dónde quieres volar?",
    dateLabel: "Fecha de vuelo",
    paxLabel: "Pasajeros",
    next: "Siguiente",
    back: "Atrás",
    submit: "Cotizar por WhatsApp",
    selectPlaceholder: "Seleccionar...",
  },
  en: {
    heading: "Get your quote",
    step1: "Origin",
    step2: "Destination",
    step3: "Date & passengers",
    step4: "Options",
    originLabel: "Where are you departing from?",
    destLabel: "Where do you want to fly?",
    dateLabel: "Flight date",
    paxLabel: "Passengers",
    next: "Next",
    back: "Back",
    submit: "Quote via WhatsApp",
    selectPlaceholder: "Select...",
  },
};

export function BookingForm({ locale }: { locale: Locale }) {
  const copy = t[locale] || t.es;
  const qCopy = quoteCopy[locale] || quoteCopy.es;
  const [step, setStep] = useState(1);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [pax, setPax] = useState("2");
  const [quotes, setQuotes] = useState<{ best3: QuoteOption[]; upgrade: QuoteOption | null } | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const steps = [copy.step1, copy.step2, copy.step3, copy.step4];

  function goNext() {
    if (step < 4) {
      const next = step + 1;
      trackBookingFormStep(next, window.location.pathname);
      if (next === 4) {
        // Generate instant quotes
        const result = getInstantQuotes(destination, parseInt(pax, 10));
        setQuotes(result);
        setShowUpgrade(false);
      }
      setStep(next);
    }
  }

  function goBack() {
    if (step > 1) setStep(step - 1);
  }

  function handleSubmit(selectedAircraft?: string, selectedPrice?: number) {
    const originLabel =
      origins.find((o) => o.value === origin)?.label[locale] || origin;
    const destLabel =
      destinations.find((d) => d.value === destination)?.label[locale] ||
      destination;

    const aircraftLine = selectedAircraft ? `\n• ${locale === "es" ? "Aeronave" : "Aircraft"}: ${selectedAircraft}` : "";
    const priceLine = selectedPrice ? `\n• ${locale === "es" ? "Precio" : "Price"}: ${formatPrice(selectedPrice)}` : "";

    trackFormSubmit("booking-widget", locale, origin, destination);

    const msg =
      locale === "es"
        ? `Hola *Sky Ride*, quiero reservar un vuelo:\n• Origen: ${originLabel}\n• Destino: ${destLabel}\n• Fecha: ${date}\n• Pasajeros: ${pax}${aircraftLine}${priceLine}`
        : `Hello *Sky Ride*, I'd like to book a flight:\n• Origin: ${originLabel}\n• Destination: ${destLabel}\n• Date: ${date}\n• Passengers: ${pax}${aircraftLine}${priceLine}`;

    window.open(
      `https://wa.me/15557298766?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  }

  const canAdvance =
    (step === 1 && origin !== "") ||
    (step === 2 && destination !== "") ||
    (step === 3 && date !== "" && pax !== "") ||
    step === 4;

  return (
    <div className="rounded-2xl border border-white/15 bg-slate-950/60 p-6 backdrop-blur-md">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#3edcc2]">
        {copy.heading}
      </p>

      {/* Step indicator */}
      <div className="mt-4 flex gap-2" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={4} aria-label={`${copy.heading} - ${steps[step - 1]}`}>
        {steps.map((label, i) => (
          <div key={label} className="flex-1">
            <div
              className={`h-1 rounded-full transition-colors ${
                i + 1 <= step ? "bg-[#3edcc2]" : "bg-white/15"
              }`}
            />
            <p
              className={`mt-1.5 text-[10px] uppercase tracking-wider ${
                i + 1 <= step ? "text-white" : "text-slate-400"
              }`}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="mt-5 min-h-[120px]" aria-live="polite">
        {step === 1 && (
          <div>
            <label htmlFor="booking-origin" className="text-xs text-slate-300">{copy.originLabel}</label>
            <select
              id="booking-origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#3edcc2]"
            >
              <option value="" className="text-slate-900">
                {copy.selectPlaceholder}
              </option>
              {origins.map((o) => (
                <option key={o.value} value={o.value} className="text-slate-900">
                  {o.label[locale]}
                </option>
              ))}
            </select>
          </div>
        )}

        {step === 2 && (
          <div>
            <label htmlFor="booking-destination" className="text-xs text-slate-300">{copy.destLabel}</label>
            <select
              id="booking-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#3edcc2]"
            >
              <option value="" className="text-slate-900">
                {copy.selectPlaceholder}
              </option>
              {destinations.map((d) => (
                <option key={d.value} value={d.value} className="text-slate-900">
                  {d.label[locale]}
                </option>
              ))}
            </select>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <div>
              <label htmlFor="booking-date" className="text-xs text-slate-300">{copy.dateLabel}</label>
              <input
                id="booking-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#3edcc2]"
              />
            </div>
            <div>
              <label htmlFor="booking-pax" className="text-xs text-slate-300">{copy.paxLabel}</label>
              <select
                id="booking-pax"
                value={pax}
                onChange={(e) => setPax(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#3edcc2]"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={String(n)} className="text-slate-900">
                    {n} {n === 1 ? (locale === "es" ? "pasajero" : "passenger") : (locale === "es" ? "pasajeros" : "passengers")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {step === 4 && quotes && (
          <div className="space-y-3">
            {quotes.best3.length > 0 ? (
              <>
                <p className="text-xs font-bold uppercase tracking-wider text-[#fff829]">
                  {qCopy.resultsTitle}
                </p>
                <p className="text-[11px] text-slate-400">{qCopy.resultsSubtitle}</p>
                {quotes.best3.map((q, i) => (
                  <div
                    key={q.aircraft.id}
                    className={`relative rounded-xl border p-3 transition ${
                      i === 0
                        ? "border-[#fff829]/40 bg-[#fff829]/5"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    {i === 0 && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-[#fff829] px-2 py-0.5 text-[9px] font-bold uppercase text-[#152c46]">
                        {locale === "es" ? "Recomendado" : "Recommended"}
                      </span>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={q.aircraft.image}
                          alt={q.aircraft.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-white">{q.aircraft.name}</p>
                        <p className="text-[10px] text-slate-400">
                          {qCopy.capacity}: {q.aircraft.passengers} · {qCopy.flightTime}: {q.route.flightTime}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#20d1b3]">{formatPrice(q.price)}</p>
                        <p className="text-[10px] text-slate-400">
                          {formatPrice(q.pricePerPerson)}{qCopy.perPerson}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSubmit(q.aircraft.name, q.price)}
                      className="mt-2 w-full rounded-full bg-[#25D366] py-2 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-[#20bd5a]"
                    >
                      {qCopy.bookThis}
                    </button>
                  </div>
                ))}

                {/* Upgrade option */}
                {quotes.upgrade && !showUpgrade && (
                  <button
                    onClick={() => setShowUpgrade(true)}
                    className="w-full rounded-xl border border-dashed border-[#fff829]/30 bg-transparent p-3 text-center text-xs font-semibold text-[#fff829] transition hover:bg-[#fff829]/5"
                  >
                    ✨ {qCopy.showUpgrade}
                  </button>
                )}
                {quotes.upgrade && showUpgrade && (
                  <div className="rounded-xl border border-[#4670b5]/40 bg-[#4670b5]/10 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#4670b5]">
                      {qCopy.upgradeTitle}
                    </p>
                    <p className="mb-2 text-[10px] text-slate-400">{qCopy.upgradeDesc}</p>
                    <div className="flex items-start gap-3">
                      <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={quotes.upgrade.aircraft.image}
                          alt={quotes.upgrade.aircraft.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-white">{quotes.upgrade.aircraft.name}</p>
                        <p className="text-[10px] text-slate-400">
                          {qCopy.capacity}: {quotes.upgrade.aircraft.passengers} · {qCopy.flightTime}: {quotes.upgrade.route.flightTime}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#4670b5]">{formatPrice(quotes.upgrade.price)}</p>
                        <p className="text-[10px] text-slate-400">
                          {formatPrice(quotes.upgrade.pricePerPerson)}{qCopy.perPerson}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSubmit(quotes.upgrade!.aircraft.name, quotes.upgrade!.price)}
                      className="mt-2 w-full rounded-full bg-[#4670b5] py-2 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-[#3a5ea0]"
                    >
                      {qCopy.bookThis}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <p className="text-sm text-slate-300">{qCopy.noResults}</p>
                <button
                  onClick={() => handleSubmit()}
                  className="mt-3 rounded-full bg-[#25D366] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
                >
                  {qCopy.contactMartin}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-5 flex gap-3">
        {step > 1 && (
          <button
            onClick={goBack}
            className="rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-white/40"
          >
            {copy.back}
          </button>
        )}
        {step < 4 && (
          <button
            onClick={goNext}
            disabled={!canAdvance}
            className="flex-1 rounded-full bg-[#20d1b3] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 transition hover:bg-[#3edcc2] disabled:opacity-40"
          >
            {step === 3 ? (locale === "es" ? "Ver opciones →" : "See options →") : copy.next}
          </button>
        )}
      </div>
    </div>
  );
}
