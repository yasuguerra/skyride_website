import Link from "next/link";

import type { Locale } from "@/i18n/routing";
import type { PageType } from "@/data/slug-map";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function PlaceholderPage({
  locale,
  pageId,
  type,
}: {
  locale: Locale;
  pageId: string;
  type: PageType;
}) {
  const typeLabels: Record<string, string> = {
    "blog-index": "Blog",
    "blog-post": "Blog Post",
    "content-hub": "Content Hub",
    booking: "Booking",
  };

  return (
    <div className="min-h-screen bg-[#f7f4ec]">
      <Header locale={locale} />

      <section className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          {typeLabels[type] ?? type}
        </p>
        <h1 className="mt-4 font-serif text-4xl text-slate-950 sm:text-5xl">
          {locale === "es" ? "Próximamente" : "Coming Soon"}
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          {locale === "es"
            ? "Esta página está en construcción. Vuelva pronto."
            : "This page is under construction. Check back soon."}
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Page: {pageId}
        </p>
        <Link
          href={locale === "en" ? "/en" : "/"}
          className="mt-8 inline-flex rounded-full bg-[#c8953d] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950"
        >
          {locale === "es" ? "Volver al inicio" : "Back to home"}
        </Link>
      </section>

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}
