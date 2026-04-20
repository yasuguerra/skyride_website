"use client";

import { useState } from "react";

import type { Locale } from "@/i18n/routing";
import { trackFormSubmit } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      origin: String(formData.get("origin") || ""),
      destination: String(formData.get("destination") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Request failed");
      }

      trackFormSubmit("contact", locale, payload.origin, payload.destination);

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : locale === "es"
            ? "Error al enviar. Intente de nuevo."
            : "Error sending. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="text-4xl">✓</div>
        <h3 className="mt-4 font-sans font-bold text-2xl text-emerald-900">
          {locale === "es" ? "¡Mensaje enviado!" : "Message sent!"}
        </h3>
        <p className="mt-2 text-sm text-emerald-800">
          {locale === "es"
            ? "Nos pondremos en contacto en menos de 10 minutos en horario laboral."
            : "We'll be in touch within 10 minutes during business hours."}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-emerald-900 underline"
        >
          {locale === "es" ? "Enviar otro mensaje" : "Send another message"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <Field
        name="name"
        label={locale === "es" ? "Nombre completo" : "Full name"}
        type="text"
        required
      />
      <Field
        name="email"
        label={locale === "es" ? "Correo electrónico" : "Email"}
        type="email"
        required
      />
      <Field
        name="phone"
        label={locale === "es" ? "Teléfono" : "Phone"}
        type="tel"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          name="origin"
          label={locale === "es" ? "Origen" : "Origin"}
          type="text"
        />
        <Field
          name="destination"
          label={locale === "es" ? "Destino" : "Destination"}
          type="text"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700">
          {locale === "es" ? "Mensaje" : "Message"}
          <span className="text-red-500"> *</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          minLength={10}
          maxLength={2000}
          className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-[#20d1b3] focus:outline-none focus:ring-1 focus:ring-[#20d1b3]"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[#20d1b3] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-950 transition hover:bg-[#3edcc2] disabled:opacity-60"
      >
        {status === "submitting"
          ? locale === "es"
            ? "Enviando..."
            : "Sending..."
          : locale === "es"
            ? "Enviar mensaje"
            : "Send message"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type,
  required,
}: {
  name: string;
  label: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={`contact-${name}`} className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={`contact-${name}`}
        type={type}
        name={name}
        required={required}
        className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-[#20d1b3] focus:outline-none focus:ring-1 focus:ring-[#20d1b3]"
      />
    </div>
  );
}
