import Link from "next/link";
import type { Locale } from "@/i18n/routing";

const t = {
  es: { from: "Desde", cta: "Cotizar ahora" },
  en: { from: "From", cta: "Get a quote" },
};

export function PricingAnchor({
  locale,
  price,
  unit,
  href,
}: {
  locale: Locale;
  price: string;
  unit?: string;
  href: string;
}) {
  const copy = t[locale] || t.es;

  return (
    <div className="inline-flex items-center gap-4 rounded-full border border-[#3edcc2]/30 bg-[#3edcc2]/10 px-5 py-2.5">
      <div className="flex items-baseline gap-1.5">
        <span className="text-xs uppercase tracking-wider text-slate-500">
          {copy.from}
        </span>
        <span className="text-2xl font-semibold text-slate-950">{price}</span>
        {unit && (
          <span className="text-xs text-slate-500">/{unit}</span>
        )}
      </div>
      <Link
        href={href}
        className="rounded-full bg-[#20d1b3] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 transition hover:bg-[#3edcc2]"
      >
        {copy.cta}
      </Link>
    </div>
  );
}
