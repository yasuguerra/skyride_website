import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import type { Locale } from "@/i18n/routing";
import { findPageBySlug, slugMap, wpRedirects } from "@/data/slug-map";
import { buildMetadata, routeSeoData } from "@/data/seo";
import { getRoute } from "@/data/routes";
import { getDestinationByPageId } from "@/data/destinations";
import { getAircraftBySlug } from "@/data/fleet";

import { ServicePage } from "@/components/pages/service-page";
import { FleetIndexPage } from "@/components/pages/fleet-index-page";
import { FleetDetailPage } from "@/components/pages/fleet-detail-page";
import { DestinationPage } from "@/components/pages/destination-page";
import { RoutePage } from "@/components/pages/route-page";
import { ContactPage } from "@/components/pages/contact-page";
import { FAQPage } from "@/components/pages/faq-page";
import { LegalPage } from "@/components/pages/legal-page";
import { BlogIndexPage } from "@/components/pages/blog-index-page";
import { BlogPostPage } from "@/components/pages/blog-post-page";
import { ContentHubPage } from "@/components/pages/content-hub-page";
import { BookingPage } from "@/components/pages/booking-page";
import { PlaceholderPage } from "@/components/pages/placeholder-page";
import { getBlogPost } from "@/data/blog";
import { getContentHubByPageId } from "@/data/content-hubs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const slugPath = slug.join("/");
  const entry = findPageBySlug(slugPath, locale as Locale);

  if (!entry) return { title: "Sky Ride Panama" };

  // Route pages have their own SEO data
  if (entry.type === "route") {
    const routeSlug = slug[slug.length - 1];
    const routeSeo = routeSeoData[routeSlug];
    if (routeSeo) {
      return {
        title: routeSeo.title[locale as Locale],
        description: routeSeo.description[locale as Locale],
      };
    }
  }

  // Fleet detail pages
  if (entry.type === "fleet-detail") {
    const aircraftSlug = slug[slug.length - 1];
    const aircraft = getAircraftBySlug(aircraftSlug);
    if (aircraft) {
      return {
        title:
          locale === "es"
            ? `${aircraft.name} — ${aircraft.passengers} Pasajeros | Sky Ride`
            : `${aircraft.name} — ${aircraft.passengers} Passengers | Sky Ride`,
        description: aircraft.description[locale as Locale],
      };
    }
  }

  return buildMetadata(entry.pageId, locale as Locale, {
    esSlug: entry.es,
    enSlug: entry.en,
  });
}

export function generateStaticParams() {
  const params: { locale: string; slug: string[] }[] = [];

  for (const entry of slugMap) {
    for (const locale of ["es", "en"] as const) {
      const slugPath = entry[locale];
      params.push({ locale, slug: slugPath.split("/") });
    }
  }

  return params;
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const slugPath = slug.join("/");

  // Check for WordPress redirects
  const firstSegment = slug[0];
  if (firstSegment in wpRedirects) {
    // In production these would be handled by middleware/next.config redirects
    notFound();
  }

  const entry = findPageBySlug(slugPath, locale as Locale);

  if (!entry) {
    notFound();
  }

  const loc = locale as Locale;

  switch (entry.type) {
    case "service":
      return <ServicePage locale={loc} pageId={entry.pageId} />;

    case "fleet-index":
      return <FleetIndexPage locale={loc} />;

    case "fleet-detail": {
      const aircraftSlug = slug[slug.length - 1];
      const aircraft = getAircraftBySlug(aircraftSlug);
      if (!aircraft) notFound();
      return <FleetDetailPage locale={loc} aircraft={aircraft} />;
    }

    case "destination": {
      const destination = getDestinationByPageId(entry.pageId);
      if (!destination) notFound();
      return <DestinationPage locale={loc} destination={destination} />;
    }

    case "route": {
      const routeSlug = slug[slug.length - 1];
      const route = getRoute(routeSlug);
      if (!route) notFound();
      return <RoutePage locale={loc} route={route} />;
    }

    case "contact":
      return <ContactPage locale={loc} />;

    case "faq":
      return <FAQPage locale={loc} />;

    case "legal":
      return <LegalPage locale={loc} pageId={entry.pageId} />;

    case "blog-index":
      return <BlogIndexPage locale={loc} />;

    case "blog-post": {
      const postSlug = slug[slug.length - 1];
      const post = getBlogPost(postSlug, loc);
      if (post) {
        return <BlogPostPage locale={loc} post={post} />;
      }
      // Fallback for posts not yet migrated to blog registry
      return (
        <PlaceholderPage
          locale={loc}
          pageId={entry.pageId}
          type={entry.type}
        />
      );
    }

    case "content-hub": {
      const hub = getContentHubByPageId(entry.pageId);
      if (!hub) notFound();
      return <ContentHubPage locale={loc} hub={hub} />;
    }

    case "booking":
      return <BookingPage locale={loc} />;

    default:
      notFound();
  }
}
