import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/routing";
import { getBlogPostsByLocale } from "@/data/blog";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, itemListSchema } from "@/components/seo/JsonLd";

export function BlogIndexPage({ locale }: { locale: Locale }) {
  const posts = getBlogPostsByLocale(locale);
  const pageUrl = locale === "en" ? "/en/blog" : "/blog";
  const title = locale === "es" ? "Blog" : "Blog";
  const subtitle =
    locale === "es"
      ? "Guías de viaje, consejos de aviación privada y destinos en Panamá y Centroamérica."
      : "Travel guides, private aviation tips, and destinations in Panama and Central America.";

  const dateLocale = locale === "es" ? "es-PA" : "en-US";

  const blogListSchema = itemListSchema({
    name: locale === "es" ? "Blog Sky Ride Panamá" : "Sky Ride Panama Blog",
    items: posts.map((post) => ({
      name: post.title,
      url: locale === "en" ? `/en/${post.slug}` : `/${post.slug}`,
      image: post.image,
      description: post.excerpt,
    })),
  });

  return (
    <div className="min-h-screen bg-[#f0f7fa]">
      <Header locale={locale} />
      <Breadcrumbs locale={locale} items={[{ name: title, href: pageUrl }]} />
      <JsonLd data={blogListSchema} />

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <h1 className="font-sans font-bold text-4xl text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">{subtitle}</p>

        {posts.length === 0 ? (
          <p className="mt-12 text-slate-500">
            {locale === "es"
              ? "Próximamente publicaremos nuevos artículos."
              : "New articles coming soon."}
          </p>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const postHref =
                locale === "en" ? `/en/${post.slug}` : `/${post.slug}`;
              return (
                <Link
                  key={post.slug}
                  href={postHref}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-md"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      {new Date(post.date).toLocaleDateString(dateLocale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      · {post.readingMinutes}{" "}
                      {locale === "es" ? "min" : "min read"}
                    </p>
                    <h2 className="mt-3 font-sans font-bold text-xl leading-tight text-slate-950">
                      {post.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm text-slate-600">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}
