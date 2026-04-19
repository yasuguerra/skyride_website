import Link from "next/link";

import type { Locale } from "@/i18n/routing";
import { getWhatsAppHref } from "@/data/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";

export function ContactPage({ locale }: { locale: Locale }) {
  const whatsappHref = getWhatsAppHref(locale);
  const pageUrl = locale === "en" ? "/en/contact" : "/contacto";
  const title = locale === "es" ? "Contacto" : "Contact";

  return (
    <div className="min-h-screen bg-[#f7f4ec]">
      <Header locale={locale} />
      <Breadcrumbs locale={locale} items={[{ name: title, href: pageUrl }]} />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="font-serif text-4xl text-slate-950 sm:text-5xl">
              {locale === "es" ? "Contacto" : "Contact Us"}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {locale === "es"
                ? "Estamos listos para ayudarle a planificar su vuelo. Contáctenos por WhatsApp para una respuesta inmediata o use el formulario a continuación."
                : "We are ready to help you plan your flight. Contact us via WhatsApp for an immediate response or use the form below."}
            </p>

            <div className="mt-10 space-y-6">
              <ContactItem
                icon="📱"
                label="WhatsApp"
                value="+507 6840 0045"
                href={whatsappHref}
              />
              <ContactItem
                icon="📞"
                label={locale === "es" ? "Teléfono" : "Phone"}
                value="+507 6840 0045"
                href="tel:+50768400045"
              />
              <ContactItem
                icon="✉️"
                label={locale === "es" ? "Correo" : "Email"}
                value="info@skyride.city"
                href="mailto:info@skyride.city"
              />
              <ContactItem
                icon="📍"
                label={locale === "es" ? "Ubicación" : "Location"}
                value="Panama City, Panamá"
              />
            </div>

            <div className="mt-10 flex gap-4">
              <Link href="https://www.facebook.com/skyridepa/" className="text-slate-500 hover:text-slate-800 transition" aria-label="Facebook">Facebook</Link>
              <Link href="https://www.instagram.com/skyridepa/" className="text-slate-500 hover:text-slate-800 transition" aria-label="Instagram">Instagram</Link>
              <Link href="https://www.tiktok.com/@skyridepa" className="text-slate-500 hover:text-slate-800 transition" aria-label="TikTok">TikTok</Link>
              <Link href="https://www.youtube.com/@skyride9486" className="text-slate-500 hover:text-slate-800 transition" aria-label="YouTube">YouTube</Link>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="font-serif text-2xl text-slate-950">
              {locale === "es" ? "Enviar mensaje" : "Send a message"}
            </h2>
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          {label}
        </p>
        {href ? (
          <Link href={href} className="mt-1 text-slate-900 hover:text-[#c8953d] transition">
            {value}
          </Link>
        ) : (
          <p className="mt-1 text-slate-900">{value}</p>
        )}
      </div>
    </div>
  );
}
