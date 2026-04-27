import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/routing";
import type { ContentHub } from "@/data/content-hubs";
import { getBlogPostsByLocale } from "@/data/blog";
import { getWhatsAppHref } from "@/data/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackedWhatsAppLink } from "@/components/ui/TrackedCTA";
import { VideoEmbed } from "@/components/ui/VideoEmbed";

const BASE_URL = "https://www.skyride.city";

export function ContentHubPage({
  locale,
  hub,
}: {
  locale: Locale;
  hub: ContentHub;
}) {
  const hubHref =
    locale === "en" ? `/en/${hub.pageId.replace("hub-", "") + "-guide"}` : `/${hub.pageId.replace("hub-", "guia-")}`;
  const whatsappHref = getWhatsAppHref(locale);
  const allBlogPosts = getBlogPostsByLocale(locale);

  // Find blog posts that belong to this hub by matching slugs
  const hubPosts = allBlogPosts.filter((p) =>
    hub.blogSlugs.some(
      (s) => p.slug === s || p.slug.includes(s.split("-").slice(0, 3).join("-"))
    )
  );

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hub.title[locale],
    description: hub.description[locale],
    url: `${BASE_URL}${hubHref}`,
    inLanguage: locale === "en" ? "en-US" : "es-PA",
    publisher: { "@id": `${BASE_URL}/#organization` },
  };

  return (
    <div className="min-h-screen bg-[#f0f7fa]">
      <Header locale={locale} />
      <Breadcrumbs
        locale={locale}
        items={[{ name: hub.title[locale], href: hubHref }]}
      />
      <JsonLd data={collectionSchema} />

      {/* Hero */}
      <section className="relative h-72 sm:h-96">
        <Image
          src={hub.heroImage}
          alt={hub.title[locale]}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-10 lg:px-10">
            <h1 className="font-sans font-bold text-3xl text-white sm:text-5xl">
              {hub.title[locale]}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/80">
              {hub.subtitle[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-6 py-12 lg:px-10">
        <p className="text-lg leading-8 text-slate-700">
          {hub.description[locale]}
        </p>
      </section>

      {/* Quick links: Service + Route */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-sans font-bold text-3xl text-slate-950">
            {locale === "es" ? "Acceso directo" : "Quick access"}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Link
              href={hub.servicePage[locale]}
              className="rounded-2xl border border-slate-200 bg-[#f0f7fa] p-6 transition hover:shadow-md"
            >
              <p className="text-xs uppercase tracking-wider text-sky-700">
                {locale === "es" ? "Página de servicio" : "Service page"}
              </p>
              <h3 className="mt-2 font-sans font-bold text-xl text-slate-950">
                {hub.servicePage.label[locale]}
              </h3>
            </Link>
            <Link
              href={hub.routePage[locale]}
              className="rounded-2xl border border-slate-200 bg-[#f0f7fa] p-6 transition hover:shadow-md"
            >
              <p className="text-xs uppercase tracking-wider text-sky-700">
                {locale === "es" ? "Detalles de la ruta" : "Route details"}
              </p>
              <h3 className="mt-2 font-sans font-bold text-xl text-slate-950">
                {hub.routePage.label[locale]}
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Video embed (if available) */}
      {hub.videoId && (
        <section className="mx-auto max-w-4xl px-6 py-12 lg:px-10">
          <VideoEmbed videoId={hub.videoId} title={hub.title[locale]} />
        </section>
      )}

      {/* Related blog posts */}
      {hubPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <h2 className="font-sans font-bold text-3xl text-slate-950">
            {locale === "es" ? "Artículos relacionados" : "Related articles"}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hubPosts.map((post) => {
              const postHref =
                locale === "en" ? `/en/${post.slug}` : `/${post.slug}`;
              return (
                <Link
                  key={post.slug}
                  href={postHref}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-md"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      {post.category}
                    </p>
                    <h3 className="mt-2 font-sans font-bold text-lg text-slate-950">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Partner cross-sell */}
      {hub.partnerCta && (
        <section className="border-t border-slate-200 bg-[#f0f7fa] py-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#20d1b3]">
              {locale === "es" ? "Empresa hermana" : "Sister company"}
            </p>
            <h2 className="mt-3 font-sans font-bold text-3xl text-slate-950">
              {hub.partnerCta.heading[locale]}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              {hub.partnerCta.body[locale]}
            </p>
            <a
              href={hub.partnerCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-slate-800"
            >
              {hub.partnerCta.ctaLabel[locale]} →
            </a>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-slate-950 py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-sans font-bold text-3xl text-white sm:text-4xl">
            {locale === "es"
              ? "¿Listo para vivir la experiencia?"
              : "Ready to experience it?"}
          </h2>
          <p className="mt-4 text-white/70">
            {locale === "es"
              ? "Cotización por WhatsApp en menos de 10 minutos."
              : "Get a WhatsApp quote in under 10 minutes."}
          </p>
          <TrackedWhatsAppLink
            href={whatsappHref}
            locale={locale}
            pagePath={hubHref}
            serviceType="content-hub"
            className="mt-6 inline-flex rounded-full bg-[#20d1b3] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-slate-950 transition hover:bg-[#3edcc2]"
          >
            {locale === "es" ? "Cotizar por WhatsApp" : "Get a WhatsApp Quote"}
          </TrackedWhatsAppLink>
        </div>
      </section>

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}
