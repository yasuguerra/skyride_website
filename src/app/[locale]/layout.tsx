import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { Analytics, GtmNoScript } from "@/components/analytics/Analytics";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from "@/components/seo/JsonLd";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";

import "../globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
      <body
        className={`${displayFont.variable} ${bodyFont.variable} antialiased`}
      >
        <Analytics />
        <GtmNoScript />
        <JsonLd data={[organizationSchema(), websiteSchema(locale as "es" | "en")]} />
        <NextIntlClientProvider messages={messages}>
          {children}
          <StickyMobileCTA locale={locale as "es" | "en"} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
