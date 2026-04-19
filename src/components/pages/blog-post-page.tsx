import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/routing";
import type { BlogPost } from "@/data/blog";
import { getBlogPostsByLocale } from "@/data/blog";
import { getWhatsAppHref } from "@/data/navigation";
import { loadBlogContent, renderMarkdown } from "@/lib/blog";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";

const BASE_URL = "https://skyride.city";

export async function BlogPostPage({
  locale,
  post,
}: {
  locale: Locale;
  post: BlogPost;
}) {
  const md = await loadBlogContent(post.slug, locale);
  const bodyHtml = md ? renderMarkdown(md) : null;
  const whatsappHref = getWhatsAppHref(locale);
  const dateLocale = locale === "es" ? "es-PA" : "en-US";

  const postHref =
    locale === "en" ? `/en/${post.slug}` : `/${post.slug}`;
  const blogIndexHref = locale === "en" ? "/en/blog" : "/blog";

  const related = getBlogPostsByLocale(locale)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@id": `${BASE_URL}/#organization` },
    mainEntityOfPage: `${BASE_URL}${postHref}`,
    inLanguage: locale === "en" ? "en-US" : "es-PA",
  };

  return (
    <div className="min-h-screen bg-[#f7f4ec]">
      <Header locale={locale} />
      <Breadcrumbs
        locale={locale}
        items={[
          { name: locale === "es" ? "Blog" : "Blog", href: blogIndexHref },
          { name: post.title, href: postHref },
        ]}
      />
      <JsonLd data={articleSchema} />

      <article className="mx-auto max-w-3xl px-6 py-12 lg:px-10">
        <p className="text-xs uppercase tracking-[0.22em] text-sky-700">
          {post.category}
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-slate-950 sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p>
        <p className="mt-4 text-sm text-slate-500">
          {new Date(post.date).toLocaleDateString(dateLocale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · {post.author} · {post.readingMinutes}{" "}
          {locale === "es" ? "min de lectura" : "min read"}
        </p>

        <div className="relative mt-8 h-72 overflow-hidden rounded-2xl sm:h-96">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 768px"
          />
        </div>

        <div className="mt-10">
          {bodyHtml ? (
            <div
              className="blog-body"
              // Rendered from trusted local markdown; no user input.
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          ) : (
            <p className="leading-8 text-slate-700">{post.excerpt}</p>
          )}
        </div>

        {/* Inline CTA */}
        <div className="mt-12 rounded-2xl border border-[#d8a651]/30 bg-[#d8a651]/10 p-6">
          <h3 className="font-serif text-2xl text-slate-950">
            {locale === "es"
              ? "¿Listo para volar?"
              : "Ready to fly?"}
          </h3>
          <p className="mt-2 text-sm text-slate-700">
            {locale === "es"
              ? "Cotización por WhatsApp en menos de 10 minutos."
              : "WhatsApp quote in under 10 minutes."}
          </p>
          <Link
            href={whatsappHref}
            className="mt-4 inline-flex rounded-full bg-[#c8953d] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950"
          >
            {locale === "es" ? "Cotizar ahora" : "Get a quote"}
          </Link>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <h2 className="font-serif text-3xl text-slate-950">
              {locale === "es" ? "Artículos relacionados" : "Related articles"}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => {
                const href =
                  locale === "en" ? `/en/${p.slug}` : `/${p.slug}`;
                return (
                  <Link
                    key={p.slug}
                    href={href}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-[#f7f4ec] transition hover:shadow-md"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg text-slate-950">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}
