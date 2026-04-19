import Link from "next/link";

import type { Locale } from "@/i18n/routing";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs({
  items,
  locale,
}: {
  items: BreadcrumbItem[];
  locale: Locale;
}) {
  const homeHref = locale === "en" ? "/en" : "/";
  const homeLabel = locale === "es" ? "Inicio" : "Home";

  const fullItems: BreadcrumbItem[] = [
    { name: homeLabel, href: homeHref },
    ...items,
  ];

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-7xl px-6 pt-6 lg:px-10"
      >
        <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-500">
          {fullItems.map((item, i) => {
            const isLast = i === fullItems.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {isLast ? (
                  <span className="text-slate-900" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="transition hover:text-slate-900"
                    >
                      {item.name}
                    </Link>
                    <span className="text-slate-300">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(fullItems.map((i) => ({ name: i.name, url: i.href })))} />
    </>
  );
}
