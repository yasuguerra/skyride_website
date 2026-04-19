"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { Locale } from "@/i18n/routing";
import { getNavigation, getWhatsAppHref } from "@/data/navigation";

export function Header({ locale }: { locale: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const nav = getNavigation(locale);
  const homeHref = locale === "en" ? "/en" : "/";
  const switchHref = locale === "en" ? "/" : "/en";
  const switchLabel = locale === "en" ? "ES" : "EN";

  return (
    <>
      {/* Top bar */}
      <div className="border-b border-white/10 bg-[#07111d] text-xs text-slate-400">
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
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1625]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href={homeHref} className="flex items-center gap-3">
            <Image
              src="/images/logos/logo-skyride.png"
              alt="Sky Ride Panama"
              width={160}
              height={48}
              priority
              className="h-10 w-auto brightness-0 invert"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">
                    {item.label}
                    <span className="ml-1 text-[10px]">▾</span>
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute left-0 top-full z-50 min-w-[220px] rounded-xl border border-white/10 bg-[#0f1b2d] p-2 shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
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
              className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white/50"
            >
              {switchLabel}
            </Link>
            <Link
              href={getWhatsAppHref(locale)}
              className="hidden rounded-full bg-[#c8953d] px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-[#d8a651] sm:inline-flex"
            >
              {locale === "es" ? "Cotizar" : "Get Quote"}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-white lg:hidden"
              aria-label="Toggle menu"
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
          <nav className="border-t border-white/10 bg-[#0b1625] px-6 pb-6 lg:hidden">
            {nav.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                      {item.label}
                    </p>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-sm text-slate-300 transition hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
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
    </>
  );
}
