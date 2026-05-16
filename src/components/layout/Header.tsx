"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

import type { Locale } from "@/i18n/routing";
import { getNavigation, getWhatsAppHref } from "@/data/navigation";
import { trackLanguageSwitch } from "@/lib/analytics";
import { slugMap } from "@/data/slug-map";

export function Header({ locale }: { locale: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const nav = getNavigation(locale);
  const pathname = usePathname();
  const homeHref = locale === "en" ? "/en" : "/";
  const switchHref = (() => {
    if (locale === "en") {
      const stripped = pathname.replace(/^\/en\//, "");
      const entry = slugMap.find((e) => e.en === stripped);
      return entry ? `/${entry.es}` : "/";
    } else {
      const stripped = pathname.replace(/^\//, "");
      const entry = slugMap.find((e) => e.es === stripped);
      return entry ? `/en/${entry.en}` : "/en";
    }
  })();
  const switchLabel = locale === "en" ? "ES" : "EN";
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const closeDropdown = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  }, []);

  const cancelCloseDropdown = useCallback(() => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
  }, []);

  // Return focus to hamburger when mobile menu closes
  useEffect(() => {
    if (!mobileOpen) hamburgerRef.current?.focus();
  }, [mobileOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="border-b border-white/10 bg-[#0e1f35] text-xs text-slate-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 lg:px-10">
          <div className="flex items-center gap-4">
            <Link href="tel:+50768400045" className="hover:text-white transition">
              +507 6840 0045
            </Link>
            <Link
              href={getWhatsAppHref(locale)}
              className="hover:text-white transition"
            >
              WhatsApp
            </Link>
          </div>
          <Link
            href="https://oceanride.city"
            className="hidden hover:text-white transition sm:inline"
          >
            🚢 Ocean Ride →
          </Link>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#152c46]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href={homeHref} className="flex items-center gap-3">
            <Image
              src="/images/logos/logo-skyride-dark.png"
              alt="Sky Ride Panama"
              width={160}
              height={48}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label={locale === "es" ? "Navegación principal" : "Main navigation"} className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => { cancelCloseDropdown(); setOpenDropdown(item.label); }}
                  onMouseLeave={closeDropdown}
                >
                  <button
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.label}
                    onFocus={() => { cancelCloseDropdown(); setOpenDropdown(item.label); }}
                    onBlur={closeDropdown}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") { setOpenDropdown(null); }
                    }}
                    className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                    <span className="ml-1 text-[10px]">▾</span>
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute left-0 top-full z-50 min-w-[240px] rounded-xl border border-white/10 bg-[#152c46] p-2 shadow-xl">
                      {item.children.map((child) =>
                        child.isGroupLabel ? (
                          <p
                            key={child.label}
                            className="mt-1 border-t border-white/10 px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-widest text-sky-300/70"
                          >
                            {child.label}
                          </p>
                        ) : (
                          <Link
                            key={child.href}
                            href={child.href}
                            onFocus={cancelCloseDropdown}
                            onBlur={closeDropdown}
                            className="block rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                          >
                            {child.label}
                          </Link>
                        ),
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={switchHref}
              onClick={() => trackLanguageSwitch(locale, locale === "en" ? "es" : "en", pathname)}
              className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-white/50"
            >
              {switchLabel}
            </Link>
            <Link
              href={getWhatsAppHref(locale)}
              className="hidden rounded-full bg-[#20d1b3] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 transition hover:bg-[#3edcc2] sm:inline-flex"
            >
              {locale === "es" ? "Cotizar" : "Get Quote"}
            </Link>

            {/* Mobile hamburger */}
            <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-white lg:hidden"
              aria-label={locale === "es" ? "Abrir menú" : "Toggle menu"}
              aria-expanded={mobileOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav aria-label={locale === "es" ? "Navegación móvil" : "Mobile navigation"} className="border-t border-white/10 bg-[#152c46] px-6 pb-6 lg:hidden">
            {nav.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <p className="mt-4 text-xs uppercase tracking-wider text-slate-500">
                      {item.label}
                    </p>
                    {item.children.map((child) =>
                      child.isGroupLabel ? (
                        <p key={child.label} className="mt-3 border-t border-white/10 pt-2 text-[10px] font-semibold uppercase tracking-widest text-sky-300/70">
                          {child.label}
                        </p>
                      ) : (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm text-slate-300 transition hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ),
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-sm text-slate-300 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        )}
      </header>
      <div id="main-content" tabIndex={-1} className="outline-none" />
    </>
  );
}
