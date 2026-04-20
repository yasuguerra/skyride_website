import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Open_Sans } from "next/font/google";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { Analytics, GtmNoScript } from "@/components/analytics/Analytics";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
  siteNavigationSchema,
} from "@/components/seo/JsonLd";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";
import { FloatingMartin } from "@/components/ui/FloatingMartin";

import "../globals.css";

const bodyFont = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sky Ride Panama",
    template: "%s | Sky Ride Panama",
  },
  description: "Premium private aviation in Panama — charter flights, helicopter tours, and exclusive routes.",
  icons: {
    icon: "/favicon.ico",
    apple: "/images/favicon/favicon-192.png",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${bodyFont.variable} antialiased`}
      >
        <Analytics />
        <GtmNoScript />
        <JsonLd
          data={[
            organizationSchema(),
            websiteSchema(locale as "es" | "en"),
            siteNavigationSchema(
              locale === "en"
                ? [
                    { name: "Charter Flights", url: "/en/charter-flights" },
                    { name: "Helicopter Tours", url: "/en/helicopter-rides" },
                    { name: "Our Fleet", url: "/en/our-fleet" },
                    { name: "Available Seats", url: "/en/available-seats" },
                    { name: "Blog", url: "/en/blog" },
                    { name: "Contact", url: "/en/contact" },
                  ]
                : [
                    { name: "Vuelos Chárter", url: "/vuelos-charter-en-panama" },
                    { name: "Paseos en Helicóptero", url: "/paseo-en-helicoptero-en-panama" },
                    { name: "Nuestra Flota", url: "/nuestra-flota" },
                    { name: "Asientos Disponibles", url: "/asientos-disponibles" },
                    { name: "Blog", url: "/blog" },
                    { name: "Contacto", url: "/contacto" },
                  ],
            ),
          ]}
        />
        <a href="#main-content" className="skip-nav">
          {locale === "es" ? "Saltar al contenido" : "Skip to content"}
        </a>
        <NextIntlClientProvider messages={messages}>
          {children}
          <StickyMobileCTA locale={locale as "es" | "en"} />
          <FloatingMartin locale={locale as "es" | "en"} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
