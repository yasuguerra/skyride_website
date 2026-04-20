import { setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/data/seo";
import { HomePage } from "@/components/home-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata("home", locale as Locale, {
    esSlug: "",
    enSlug: "",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePage locale={locale as Locale} />;
}
