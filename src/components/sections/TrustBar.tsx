import Image from "next/image";
import type { Locale } from "@/i18n/routing";

const t = {
  es: {
    dgac: "Operadores verificados",
    flights: "500+ vuelos completados",
    since: "Desde 2018 en Panamá",
    payment: "Visa · Mastercard · Wompi",
  },
  en: {
    dgac: "Vetted Operators",
    flights: "500+ flights completed",
    since: "Serving Panama since 2018",
    payment: "Visa · Mastercard · Wompi",
  },
};

export function TrustBar({
  locale,
  variant = "light",
}: {
  locale: Locale;
  variant?: "light" | "dark";
}) {
  const copy = t[locale] || t.es;

  const items = [
    { icon: "🛡️", text: copy.dgac },
    { icon: "✈️", text: copy.flights },
    { icon: "📍", text: copy.since },
  ];

  const bg = variant === "dark" ? "bg-[#152c46]" : "bg-white/70";
  const border =
    variant === "dark" ? "border-white/10" : "border-slate-300/80";
  const textColor = variant === "dark" ? "text-slate-200" : "text-slate-600";

  return (
    <section
      className={`border-y ${variant === "dark" ? "border-white/10" : "border-slate-200"} ${variant === "dark" ? "bg-[#152c46]" : "bg-[#f0f7fa]"}`}
    >
      <div
        className={`mx-auto grid max-w-7xl gap-4 px-6 py-5 text-sm uppercase tracking-wider lg:grid-cols-4 lg:px-10 ${textColor}`}
      >
        {items.map((item) => (
          <div
            key={item.text}
            className={`flex items-center justify-center gap-2 rounded-full border px-4 py-3 ${border} ${bg}`}
          >
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
        <div
          className={`flex items-center justify-center gap-3 rounded-full border px-4 py-3 ${border} ${bg}`}
        >
          <Image
            src="/images/trust/tarjetas.webp"
            alt={copy.payment}
            width={120}
            height={28}
            className="h-5 w-auto opacity-80"
          />
          <span className="text-xs">{copy.payment}</span>
        </div>
      </div>
    </section>
  );
}
