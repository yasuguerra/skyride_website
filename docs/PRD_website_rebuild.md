# PRD: Sky Ride Panama — Website Rebuild

> **Project**: skyride.city full website rebuild  
> **Status**: Planning  
> **Created**: April 14, 2026  
> **Owner**: Yasu Guerra  
> **Stack**: Next.js 15 · TypeScript · Tailwind CSS · next-intl  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Business Context](#2-business-context)
3. [Problems with Current Site](#3-problems-with-current-site)
4. [Goals & Success Metrics](#4-goals--success-metrics)
5. [Tech Stack Decision](#5-tech-stack-decision)
6. [Site Architecture](#6-site-architecture)
7. [URL Map — Complete Inventory](#7-url-map--complete-inventory)
8. [SEO Requirements](#8-seo-requirements)
9. [Internationalization (i18n)](#9-internationalization-i18n)
10. [Design & UI Requirements](#10-design--ui-requirements)
11. [Integrations](#11-integrations)
12. [Performance Requirements](#12-performance-requirements)
13. [Security Requirements](#13-security-requirements)
14. [Content Migration Plan](#14-content-migration-plan)
15. [Phase Plan & Milestones](#15-phase-plan--milestones)
16. [Project Structure](#16-project-structure)
17. [Deployment & Infrastructure](#17-deployment--infrastructure)
18. [Launch Checklist](#18-launch-checklist)
19. [Post-Launch Monitoring](#19-post-launch-monitoring)
20. [Risks & Mitigations](#20-risks--mitigations)
21. [Appendix A — SEO Metadata to Port](#appendix-a--seo-metadata-to-port)
22. [Appendix B — Structured Data Schemas](#appendix-b--structured-data-schemas)
23. [Appendix C — Current Site Audit Findings](#appendix-c--current-site-audit-findings)

---

## 1. Executive Summary

Sky Ride Panama (skyride.city) is a charter flight, helicopter tour, and private aviation company based in Panama City. The current website is built on WordPress 6.9.4 + Elementor Pro and suffers from critical performance issues (Mobile PageSpeed: 63/100), an indexation crisis (only 1 of 85 URLs is indexed by Google), and heavy plugin dependency.

This PRD defines the complete rebuild of skyride.city using **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS** — technologies the team already uses across martin-agent and seliabot projects. The goal is to achieve **95+ mobile PageSpeed**, get **all key pages indexed within 30 days**, and create a fast, maintainable, SEO-optimized site with zero plugin dependencies.

**Scope**: Rebuild all 85 URLs (19 pages + 34 blog posts + 32 products) with exact URL preservation, bilingual support (ES/EN), and all SEO infrastructure baked into code.

---

## 2. Business Context

### Company Profile

| Field | Value |
|-------|-------|
| **Company** | Sky Ride Panama |
| **Website** | https://www.skyride.city |
| **Industry** | Private aviation / Charter flights / Helicopter tours |
| **Markets** | Panama (primary), Costa Rica, Colombia (secondary) |
| **Languages** | Spanish (default), English |
| **Phone** | +507 6840 0045 |
| **WhatsApp** | +1 (555) 729-8766 |
| **Social** | Facebook, Instagram, TikTok, YouTube (@skyridepa) |
| **Sister Company** | Ocean Ride (oceanride.city) — maritime transport |
| **Sales Model** | WhatsApp conversations + AI booking agent (Martin) |
| **Payment** | Wompi (Latin American gateway), credit cards |

### Core Services

1. **Charter Flights** — Private airplane charters across Panama, Costa Rica, Colombia
2. **Helicopter Tours** — Scenic flights over Panama City, island transfers
3. **Available Seats** — Shared seat sales on scheduled private flights (affordable option)
4. **Fleet Rental** — Direct aircraft rental for business/tourism

### Target Audiences

| Audience | Language | Intent |
|----------|----------|--------|
| Panama residents (high-income) | ES | Weekend getaways (Contadora, San Blas) |
| Business travelers | ES/EN | Executive transport, time-sensitive routes |
| International tourists | EN | Helicopter tours, island hopping |
| Expats in Panama | EN | Charter flights, Costa Rica connections |
| Honeymoon couples | ES/EN | Romantic packages, destination flights |

### Key Competitors (SEO)

- Air Panama (airpanama.com) — scheduled commercial flights
- Cup Aviation Panama — charter flights
- Helipan Panama — helicopter services
- Various travel blogs ranking for "vuelo charter panama", "contadora island"

---

## 3. Problems with Current Site

### 3.1 Performance

| Metric | Current (WordPress) | Target (Next.js) |
|--------|-------------------|------------------|
| Mobile PageSpeed | 63 | 95+ |
| Desktop PageSpeed | 89 | 98+ |
| Mobile LCP | 7.9s | < 2.5s |
| CLS | 0.000 (fixed) | 0.000 |
| TBT | 10ms | < 50ms |
| FCP | 2.7s | < 1.5s |
| Total CSS shipped | ~500KB (Elementor) | ~15KB (Tailwind purged) |

**Root causes**:
- Elementor loads its entire framework (~500KB CSS + ~300KB JS) on every page
- Hero background image was lazy-loaded by WP Rocket (fixed, but still Elementor animation delay of 1s)
- No tree-shaking — unused CSS from 20+ Elementor widgets loaded on every page
- jQuery + Elementor JS + WP Core JS = multiple render-blocking scripts

### 3.2 SEO / Indexation Crisis

**Critical finding from Google Search Console (April 14, 2026):**

| URL | GSC Status | Last Crawl |
|-----|-----------|------------|
| `/` (ES homepage) | **Indexed** ✅ | Recent |
| `/en/sky-ride-charter-flights/` | **Not indexed** (crawled, not indexed) | Nov 8, 2025 |
| `/paseo-en-helicoptero-en-panama/` | **Unknown to Google** (never crawled) | N/A |
| `/vuelos-charter-en-panama/` | **Unknown to Google** (never crawled) | N/A |
| `/transporte-a-contadora/` | **Not indexed** (crawled, not indexed) | Oct 11, 2025 |
| `/vuelos-privados-baratos/` | **Not indexed** (crawled, not indexed) | Nov 8, 2025 |

**Only 1 out of 85 URLs is indexed.** Root causes:
1. XML sitemap was returning 404 for months (now fixed)
2. EN homepage canonical was pointing to ES homepage (now fixed)
3. No external backlinks to most pages
4. Low crawl frequency due to broken sitemap discovery

### 3.3 Maintainability

- Content changes require Elementor visual editor
- SEO metadata managed through Rank Math plugin (not version-controlled)
- 15+ WordPress plugins create dependency and update conflicts
- No staging environment — all changes are live
- No version control on content or configuration

### 3.4 Plugin Dependencies to Eliminate

| Plugin | What It Does | Replacement in Next.js |
|--------|-------------|----------------------|
| Elementor Free + Pro | Page builder | React components + Tailwind CSS |
| Rank Math SEO Pro | Meta tags, sitemaps, schemas | Metadata API + `next-sitemap` + JSON-LD |
| Polylang Free | i18n routing + hreflang | `next-intl` middleware |
| WP Rocket | Caching, CSS/JS optimization | Static generation + Vercel Edge CDN |
| EWWW Image Optimizer | WebP conversion, compression | `next/image` (automatic WebP/AVIF) |
| Head and Footer | Custom `<head>` injection | `layout.tsx` + `next/script` |
| Really Simple Security | Security headers | `next.config.ts` headers + middleware |
| WooCommerce | Product catalog | Data-driven fleet pages from JSON |
| GeneratePress | Theme | Tailwind CSS |

---

## 4. Goals & Success Metrics

### Primary Goals

| # | Goal | Metric | Target | Timeline |
|---|------|--------|--------|----------|
| G1 | Performance | Mobile PageSpeed | ≥ 95 | Launch day |
| G2 | SEO Indexation | Key pages indexed in Google | All 20+ service/landing pages | 30 days post-launch |
| G3 | SEO Rankings | "vuelo charter panama" position | Top 10 | 90 days post-launch |
| G4 | Core Web Vitals | LCP / CLS / INP | Good (green) | Launch day |
| G5 | Conversion | WhatsApp inquiries per week | +50% vs current | 60 days post-launch |
| G6 | Revenue | Annual organic revenue | $1,000,000 USD | 12 months post-launch |
| G7 | Conversion Rate | Visitor → WhatsApp contact rate | ≥ 3% | 90 days post-launch |
| G8 | EN Traffic | English organic sessions/month | ≥ 30% of total traffic | 6 months post-launch |

### Revenue Model Assumptions

To reach $1MM/year from organic traffic alone:

| Metric | Assumption |
|--------|------------|
| Avg. ticket value | $2,000 (blended: helicopter tours ~$500, charter flights ~$3,000+) |
| Required bookings/year | ~500 (42/month) |
| Visitor → WhatsApp rate | 3% |
| WhatsApp → Booking rate | 15% |
| Required monthly visitors | ~9,300 organic visitors |
| Required daily visitors | ~310 organic visitors/day |

This is achievable for Panama's aviation market with proper SEO + CRO. Current organic traffic baseline should be measured at launch to track progress.

### Secondary Goals

- All blog content ported with EN translations (34 → 68 posts)
- Martin AI agent natively integrated (not script injection)
- Zero downtime during migration
- Full version control (Git) for all content and configuration
- < 3s full page load on 3G mobile
- EN site at feature parity with ES site (destinations, routes, all services)
- All conversion events tracked in GA4 with attribution per page and service

---

## 5. Tech Stack Decision

### Core Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| **Framework** | Next.js (App Router) | 15.x | SSG/SSR, React Server Components, Metadata API, Image optimization |
| **Language** | TypeScript | 5.x | Already used across all team projects |
| **Styling** | Tailwind CSS | 4.x | Utility-first, automatic purging (~15KB production CSS) |
| **i18n** | next-intl | 4.x | App Router compatible, ICU message format, SEO-friendly routing |
| **Content** | MDX | 3.x | Blog posts as Markdown with React components |
| **Images** | next/image | built-in | Automatic WebP/AVIF, responsive srcSet, lazy loading |
| **Fonts** | next/font | built-in | Self-hosted, zero layout shift |
| **Analytics** | next/script | built-in | Deferred loading of GTM, Clarity, etc. |
| **Sitemap** | next-sitemap | 4.x | Automatic sitemap.xml and robots.txt generation |
| **Linting** | ESLint + Prettier | latest | Code quality |
| **Testing** | Vitest + Playwright | latest | Unit + E2E (consistent with seliabot) |

### Why Next.js (Not Astro, Nuxt, or Remix)

| Framework | Pros | Cons | Verdict |
|-----------|------|------|---------|
| **Next.js 15** | Team knows React, best SEO tooling, Vercel edge CDN, huge ecosystem, ISR | Heavier than Astro for static sites | **Selected** ✅ |
| Astro | Fastest for static content, zero JS by default | Team doesn't know Astro, smaller ecosystem, less React integration | Good but learning curve |
| Nuxt 3 | Good SSG, Vue ecosystem | Team uses React exclusively, would need to learn Vue | Wrong framework |
| Remix | Good SSR, nested routes | Less mature SSG, smaller ecosystem, Vercel support limited | Too new |

### Team Skill Match

The team already uses across martin-agent, seliabot, and skydocs-whatsapp:
- **React 18** — All frontends
- **TypeScript 5.3** — Every project
- **Vite** — All frontend builds  
- **Express.js** — All backends
- **PostgreSQL** — All databases
- **Docker + Cloud Run** — All deployments
- **Google Cloud** — Vertex AI, Cloud Storage, Pub/Sub

Next.js is the natural evolution: same React + TypeScript, with built-in SSR/SSG/ISR.

---

## 6. Site Architecture

### 6.1 Information Architecture

```
skyride.city/
├── / ............................ Homepage (ES)
├── /en/ ......................... Homepage (EN) → /en/sky-ride-charter-flights/
│
├── Services
│   ├── /paseo-en-helicoptero-en-panama/ ........ Helicopter Tours (ES)
│   ├── /en/helicopter-rides/ ................... Helicopter Tours (EN)
│   ├── /vuelos-charter-en-panama/ .............. Charter Flights (ES)  
│   ├── /en/charter-flights/ .................... Charter Flights (EN)
│   ├── /vuelos-privados-baratos/ ............... Affordable Private Flights (ES)
│   ├── /en/available-seats/ .................... Available Seats (EN)
│   ├── /asientos-disponibles/ .................. Available Seats (ES)
│   ├── /renta-de-aviones-privados-para-viajes-de-negocios/ ... Business Flights (ES)
│   └── /en/charter-flights-panama-personalized-experience/ ... Personalized Charter (EN)
│
├── Fleet
│   ├── /nuestra-flota/ ......................... Fleet Index (ES)
│   ├── /en/our-fleet/ .......................... Fleet Index (EN)
│   └── /producto/{aircraft-slug}/ .............. Individual Aircraft (x32)
│
├── Destinations
│   ├── /vuelo-privado-a-contadora/ ............. Contadora (ES)
│   ├── /en/private-flight-to-contadora/ ........ Contadora (EN) — NEW
│   ├── /vuelo-privado-costa-rica/ .............. Costa Rica (ES)
│   ├── /en/private-flight-costa-rica/ .......... Costa Rica (EN) — NEW
│   ├── /vuelos-privados-a-medellin/ ............ Medellín (ES)
│   ├── /en/private-flights-to-medellin/ ........ Medellín (EN) — NEW
│   ├── /vuelos-a-playa-tambor/ ................. Playa Tambor (ES)
│   └── /en/flights-to-playa-tambor/ ............ Playa Tambor (EN) — NEW
│
├── Routes (NEW — high commercial intent)
│   ├── /ruta/panama-contadora/ ................. Panama → Contadora (ES)
│   ├── /en/route/panama-contadora/ ............. Panama → Contadora (EN)
│   ├── /ruta/panama-san-blas/ .................. Panama → San Blas (ES)
│   ├── /en/route/panama-san-blas/ .............. Panama → San Blas (EN)
│   ├── /ruta/panama-costa-rica/ ................ Panama → Costa Rica (ES)
│   ├── /en/route/panama-costa-rica/ ............ Panama → Costa Rica (EN)
│   ├── /ruta/panama-bocas-del-toro/ ............ Panama → Bocas del Toro (ES)
│   ├── /en/route/panama-bocas-del-toro/ ........ Panama → Bocas del Toro (EN)
│   ├── /ruta/panama-medellin/ .................. Panama → Medellín (ES)
│   └── /en/route/panama-medellin/ .............. Panama → Medellín (EN)
│
├── Content Hubs (NEW — topic authority clusters)
│   ├── /guia-contadora/ ....................... Contadora Hub (ES)
│   ├── /en/contadora-guide/ ................... Contadora Hub (EN)
│   ├── /guia-costa-rica/ ...................... Costa Rica Hub (ES)
│   ├── /en/costa-rica-guide/ .................. Costa Rica Hub (EN)
│   ├── /guia-helicopteros/ .................... Helicopter Hub (ES)
│   └── /en/helicopter-guide/ .................. Helicopter Hub (EN)
│
├── Blog
│   ├── /blog/ .................................. Blog Index (ES)
│   ├── /en/blog-2/ ............................ Blog Index (EN)
│   ├── /{post-slug}/ .......................... Blog Posts (ES, x21)
│   └── /en/{post-slug}/ ....................... Blog Posts (EN, x13+)
│
├── Booking
│   ├── /reservar-con-martin/ ................... Martin AI Agent (ES)
│   └── /alquiler-de-helicopteros-en-panama-*/ .. Helicopter Rental Info (ES)
│
└── Legal/Info (NEW — currently broken # links)
    ├── /contacto/ .............................. Contact (ES)
    ├── /en/contact/ ............................ Contact (EN)
    ├── /preguntas-frecuentes/ .................. FAQ (ES)
    ├── /en/faq/ ................................ FAQ (EN)
    ├── /terminos-y-condiciones/ ................ Terms (ES)
    ├── /en/terms-and-conditions/ ............... Terms (EN)
    ├── /politica-de-privacidad/ ................ Privacy (ES)
    └── /en/privacy-policy/ ..................... Privacy (EN)
```

### 6.2 Component Architecture

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx ............... Root layout (header, footer, Martin widget)
│   │   ├── page.tsx ................. Homepage
│   │   ├── blog/
│   │   │   ├── page.tsx ............. Blog index
│   │   │   └── [slug]/page.tsx ...... Blog post
│   │   ├── fleet/
│   │   │   ├── page.tsx ............. Fleet index
│   │   │   └── [slug]/page.tsx ...... Aircraft detail
│   │   ├── route/
│   │   │   └── [slug]/page.tsx ...... Route detail (NEW — e.g. panama-contadora)
│   │   ├── guide/
│   │   │   └── [slug]/page.tsx ...... Content hub pages (NEW — e.g. contadora-guide)
│   │   └── [...slug]/page.tsx ....... Catch-all for service/destination pages
│   ├── sitemap.ts ................... Dynamic sitemap generation
│   ├── robots.ts .................... robots.txt
│   └── not-found.tsx ................ 404 page
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   ├── TopBar.tsx ............... Phone + WhatsApp + OceanRide link
│   │   └── LanguageSwitcher.tsx
│   ├── seo/
│   │   ├── JsonLd.tsx ............... Structured data component
│   │   ├── Breadcrumbs.tsx
│   │   └── HreflangTags.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Hero.tsx
│   │   ├── CTABanner.tsx
│   │   ├── ContactForm.tsx
│   │   ├── WhatsAppButton.tsx
│   │   ├── VideoEmbed.tsx ........... YouTube/video embed (NEW)
│   │   └── ...
│   ├── sections/
│   │   ├── ServicesGrid.tsx
│   │   ├── DestinationCards.tsx
│   │   ├── FleetGallery.tsx
│   │   ├── Testimonials.tsx ......... Google Reviews / curated testimonials
│   │   ├── TrustBar.tsx ............. Safety badges, flight counter, certifications (NEW)
│   │   ├── FAQAccordion.tsx
│   │   ├── BookingForm.tsx .......... Multi-step: Origin→Dest→Date→Pax (NEW enhanced)
│   │   ├── RouteCard.tsx ............ Route summary card (NEW)
│   │   ├── PricingAnchor.tsx ........ "Starting from $X" component (NEW)
│   │   └── ContentHubLinks.tsx ...... Pillar page → child content links (NEW)
│   └── martin/
│       └── MartinChat.tsx ........... Native Martin AI widget
├── content/
│   ├── pages/ ....................... Static page content (JSON/MDX)
│   ├── blog/ ........................ Blog posts (MDX)
│   ├── fleet/ ....................... Aircraft data (JSON)
│   ├── destinations/ ............... Destination data (JSON)
│   └── routes/ ..................... Route data (JSON) — NEW
├── data/
│   ├── seo.ts ....................... All SEO metadata per page
│   ├── fleet.ts ..................... Fleet aircraft definitions
│   ├── destinations.ts .............. Destination definitions
│   ├── routes.ts .................... Route definitions (origin, dest, time, price)
│   ├── navigation.ts ............... Nav links per locale
│   └── slug-map.ts .................. URL slug mapping per locale
├── lib/
│   ├── i18n.ts ...................... i18n configuration
│   ├── mdx.ts ....................... MDX processing utilities
│   ├── analytics.ts ................. GA4 event tracking helpers (NEW)
│   └── utils.ts ..................... Shared utilities
├── messages/
│   ├── es.json ...................... Spanish translations
│   └── en.json ...................... English translations
├── styles/
│   └── globals.css .................. Tailwind base + custom properties
├── middleware.ts ..................... i18n locale detection + routing
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 7. URL Map — Complete Inventory

> **CRITICAL REQUIREMENT**: Every existing URL must either remain the same or have a 301 redirect. Zero broken links.

### 7.1 Pages (19 Existing + 20 New = 39 URLs)

| # | Current URL | Type | Locale | Priority | Notes |
|---|-------------|------|--------|----------|-------|
| 1 | `/` | Homepage | ES | Critical | Hero + services + CTA |
| 2 | `/en/sky-ride-charter-flights/` | Homepage | EN | Critical | Parallel translation |
| 3 | `/nuestra-flota/` | Fleet Index | ES | High | Aircraft gallery |
| 4 | `/en/our-fleet/` | Fleet Index | EN | High | |
| 5 | `/vuelos-privados-baratos/` | Service | ES | High | Affordable flights |
| 6 | `/paseo-en-helicoptero/` | Service redirect | ES | — | Redirects to #7 |
| 7 | `/paseo-en-helicoptero-en-panama/` | Service | ES | Critical | Helicopter tours |
| 8 | `/en/helicopter-rides/` | Service | EN | High | |
| 9 | `/vuelos-charter-en-panama/` | Service | ES | Critical | Charter flights |
| 10 | `/en/charter-flights/` | Service | EN | High | |
| 11 | `/renta-de-aviones-privados-para-viajes-de-negocios/` | Service | ES | Medium | Business flights |
| 12 | `/en/charter-flights-panama-personalized-experience/` | Service | EN | Medium | |
| 13 | `/vuelo-privado-a-contadora/` | Destination | ES | High | |
| 14 | `/vuelo-privado-costa-rica/` | Destination | ES | High | |
| 15 | `/vuelos-privados-a-medellin/` | Destination | ES | Medium | |
| 16 | `/vuelos-a-playa-tambor/` | Destination | ES | Medium | |
| 17 | `/asientos-disponibles/` | Service | ES | Medium | |
| 18 | `/en/available-seats/` | Service | EN | Medium | |
| 19 | `/reservar-con-martin/` | Booking | ES | High | Martin AI agent |

#### 7.1.1 NEW — EN Destination Pages

| # | URL | Type | Locale | Priority | Notes |
|---|-----|------|--------|----------|-------|
| 20 | `/en/private-flight-to-contadora/` | Destination | EN | High | EN pair of #13 |
| 21 | `/en/private-flight-costa-rica/` | Destination | EN | High | EN pair of #14 |
| 22 | `/en/private-flights-to-medellin/` | Destination | EN | Medium | EN pair of #15 |
| 23 | `/en/flights-to-playa-tambor/` | Destination | EN | Medium | EN pair of #16 |

#### 7.1.2 NEW — Route Pages (High Commercial Intent)

These target searches like "panama to contadora flight price" — highest conversion intent.

| # | URL (ES) | URL (EN) | Route | Priority |
|---|----------|----------|-------|----------|
| 24–25 | `/ruta/panama-contadora/` | `/en/route/panama-contadora/` | Panama → Contadora | Critical |
| 26–27 | `/ruta/panama-san-blas/` | `/en/route/panama-san-blas/` | Panama → San Blas | High |
| 28–29 | `/ruta/panama-costa-rica/` | `/en/route/panama-costa-rica/` | Panama → Costa Rica | High |
| 30–31 | `/ruta/panama-bocas-del-toro/` | `/en/route/panama-bocas-del-toro/` | Panama → Bocas del Toro | High |
| 32–33 | `/ruta/panama-medellin/` | `/en/route/panama-medellin/` | Panama → Medellín | Medium |
| 34–35 | `/ruta/panama-miami/` | `/en/route/panama-miami/` | Panama → Miami | Medium |
| 36–37 | `/ruta/panama-dominican-republic/` | `/en/route/panama-dominican-republic/` | Panama → Dominican Republic | Medium |

Each route page includes: route map, flight time, aircraft options, starting price, WhatsApp CTA, related destination page link.

#### 7.1.3 NEW — Content Hub Pillar Pages

| # | URL (ES) | URL (EN) | Topic | Priority |
|---|----------|----------|-------|----------|
| 34–35 | `/guia-contadora/` | `/en/contadora-guide/` | Contadora Island (links 6 blog posts + destination + route) | High |
| 36–37 | `/guia-costa-rica/` | `/en/costa-rica-guide/` | Costa Rica (links 4 blog posts + destination + route) | High |
| 38–39 | `/guia-helicopteros/` | `/en/helicopter-guide/` | Helicopter Tours (links 3 blog posts + service + fleet helicopters) | High |

### 7.2 Blog Posts (34 URLs)

| # | URL (slug) | Locale | Topic |
|---|-----------|--------|-------|
| 1 | `/blog/` | ES | Blog index |
| 2 | `/en/blog-2/` | EN | Blog index |
| 3 | `/descubre-las-mejores-islas-de-san-blas-skyride/` | ES | San Blas Islands |
| 4 | `/descubre-el-confort-vuelo-privado-panama-costa-rica/` | ES | Panama-Costa Rica flights |
| 5 | `/playa-larga-contadora/` | ES | Playa Larga, Contadora |
| 6 | `/playa-cacique-contadora/` | ES | Playa Cacique, Contadora |
| 7 | `/ferry-a-contadora/` | ES | Ferry to Contadora |
| 8 | `/transporte-a-contadora/` | ES | Transport to Contadora |
| 9 | `/que-hacer-en-isla-contadora/` | ES | Things to do in Contadora |
| 10 | `/experimenta-un-tour-de-helicoptero-inolvidable-sobreciudad-de-panama/` | ES | Helicopter tour Panama City |
| 11 | `/vuelos-privados-y-charter-tu-solucion-para-viajes-exclusivos-en-panama/` | ES | Private/charter flights |
| 12 | `/vuela-de-panama-a-bocas-del-toro-la-mejor-forma-de-llegar-al-paraiso/` | ES | Panama to Bocas del Toro |
| 13 | `/luna-de-miel-en-panama/` | ES | Honeymoon in Panama |
| 14 | `/paseo-en-helicoptero-precio-panama/` | ES | Helicopter prices |
| 15 | `/reservar-vuelo-sin-pagar-demasiado/` | ES | Booking affordable flights |
| 16 | `/helicoptero-privado-lo-que-debes-saber-sky-ride/` | ES | Private helicopter guide |
| 17 | `/que-es-un-vuelo-charter-y-como-se-reserva/` | ES | What is a charter flight |
| 18 | `/que-ver-y-hacer-en-playa-tambor-costa-rica/` | ES | Playa Tambor guide |
| 19 | `/apps-para-encontrar-viajes-en-avion-privado/` | ES | Private flight apps |
| 20 | `/hipertensos-pueden-viajar-en-avion/` | ES | Flying with hypertension |
| 21 | `/tips-para-viajar-en-avion-guia-completa/` | ES | Air travel tips |
| 22 | `/mejores-lugares-turisticos-de-costa-rica/` | ES | Costa Rica tourist spots |
| 23 | `/que-ver-en-san-jose-capital-de-costa-rica/` | ES | San José guide |
| 24 | `/luna-de-miel-en-costa-rica/` | ES | Honeymoon Costa Rica |
| 25 | `/como-elegir-asientos-de-avion-privado/` | ES | Choosing private plane seats |
| 26 | `/en/cacique-beach-in-contadora-a-true-paradise/` | EN | Cacique Beach |
| 27 | `/en/whats-to-see-and-do-in-playa-tambor-costa-rica/` | EN | Playa Tambor |
| 28 | `/en/what-to-see-in-san-jose-capital-of-costa-rica/` | EN | San José |
| 29 | `/en/the-best-tourist-places-in-costa-rica/` | EN | Costa Rica tourist spots |
| 30 | `/en/what-to-do-in-contadora-island/` | EN | Contadora Island |
| 31 | `/en/ferry-to-contadora-is-it-really-convenient/` | EN | Ferry to Contadora |
| 32 | `/en/honeymoon-in-panama-best-places-activities-itinerary/` | EN | Honeymoon Panama |
| 33 | `/en/honeymoon-in-costa-rica/` | EN | Honeymoon Costa Rica |
| 34 | `/en/long-beach-on-contadora-island-choose-your-next-destination/` | EN | Playa Larga |
| 35 | `/en/transportation-to-contadora-island-best-options/` | EN | Transport Contadora |

### 7.3 Products — Fleet (32 URLs)

Aircraft product pages under `/producto/` prefix. All follow the pattern:
`/producto/{aircraft-name}-{passengers}-pasajeros/`

**Aircraft Inventory:**

| Aircraft | Passengers | Type | ES Slug | EN Slug |
|----------|-----------|------|---------|---------|
| Cessna 206 | 5 | Airplane | cessna-206-5-pasajeros | (EN variant) |
| Piper Azteca | 5 | Airplane | piper-azteca-5-pasajeros | (EN variant) |
| Piper Saratoga | 5 | Airplane | piper-saratoga-5-pasajeros | (EN variant) |
| Daher Kodiak | 9 | Airplane | daher-kodiak-hasta-9-pasajeros | (EN variant) |
| Cessna Grand Caravan | 12 | Airplane | cessna-grand-caravan-12-pasajeros | (EN variant) |
| Piper Cherokee | 3 | Airplane | piper-cherokee-3-pasajeros | (EN variant) |
| Cessna 172 | 3 | Airplane | cessna-172-hasta-3-pasajeros | (EN variant) |
| King Air F90 | 6 | Airplane | king-air-f90-6-pasajeros | (EN variant) |
| King Air 200 | 9 | Airplane | king-air-200-hasta-9-pasajeros | (EN variant) |
| Robinson R44 | 3 | Helicopter | robinson-r44-3-pasajeros | (EN variant) |
| Robinson R66 | 4 | Helicopter | robinson-r66-4-pasajeros | (EN variant) |
| Eurocopter AS350 B3 | 5 | Helicopter | eurocopter-b3-as350-5-pasajeros | (EN variant) |
| Eurocopter EC130 B4 | 6 | Helicopter | eurocopter-b4-ec130-6-pasajeros | (EN variant) |

Plus service products:
- `/producto/vuelos-charter/` (charter flights service)
- `/en/producto/charter-flights/` (EN)
- `/producto/el-catamaran/` (catamaran service)
- `/producto/catamaran-valpar/` (catamaran variant)
- `/producto/catamaran-zenith/` (catamaran variant)

### 7.4 WordPress URLs to Redirect (410/301)

These WordPress-specific URLs should return 410 Gone or redirect to homepage:

```
/wp-admin/*          → 410 Gone
/wp-login.php        → 410 Gone
/wp-content/*        → 301 → / (homepage)
/wp-includes/*       → 410 Gone
/wp-json/*           → 410 Gone
/?p=*                → 301 → / (homepage)
/cart/               → 410 Gone
/checkout/           → 410 Gone
/my-account/         → 410 Gone
/tienda/             → 301 → /nuestra-flota/
/shop/               → 301 → /en/our-fleet/
/categoria-producto/* → 301 → /nuestra-flota/
```

### 7.5 Pages Currently Noindexed (to exclude or redirect)

These pages were noindexed on WordPress and should NOT be rebuilt:

| WP Post ID | URL/Purpose | Action |
|------------|------------|--------|
| 3571 | Bot page | Don't rebuild |
| 4539 | Bot page | Don't rebuild |
| 5179 | Bot page | Don't rebuild |
| 3556 | Bot page | Don't rebuild |
| 5113 | /asistente-martin/ | Don't rebuild |
| 3709, 3904 | Fleet template pages | Don't rebuild |
| 3710, 3906 | Fleet template pages | Don't rebuild |
| 3711, 3908 | Fleet template pages | Don't rebuild |
| 3537, 3611 | Utility pages | Don't rebuild |
| 2204 | Duplicate of /vuelos-privados-baratos/ | Don't rebuild |

---

## 8. SEO Requirements

### 8.1 Per-Page Metadata (Mandatory)

Every page MUST have:

```tsx
// Example: Using Next.js Metadata API
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: 'Reserva Tu Vuelo Chárter Privado en Panamá | Sky Ride',
    description: 'Vuelos chárter privados y compartidos...',
    alternates: {
      canonical: 'https://www.skyride.city/',
      languages: {
        'es': 'https://www.skyride.city/',
        'en': 'https://www.skyride.city/en/sky-ride-charter-flights/',
        'x-default': 'https://www.skyride.city/',
      },
    },
    openGraph: {
      title: '...',
      description: '...',
      url: 'https://www.skyride.city/',
      siteName: 'Sky Ride Panama',
      locale: 'es_PA',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
```

### 8.2 Structured Data (JSON-LD)

Required schemas per page type:

| Page Type | Schemas Required |
|-----------|-----------------|
| All pages | `Organization`, `WebSite`, `BreadcrumbList` |
| Homepage | + `LocalBusiness`, `AggregateRating` |
| Service pages | + `Service`, `FAQPage` (helicopter & charter) |
| Blog posts | + `Article`, `BlogPosting` |
| Fleet/Product pages | + `Product` |
| Route pages | + `Service` (with `areaServed`, `priceRange`) |
| Content Hub pages | + `CollectionPage` |
| FAQ page | + `FAQPage` |
| Testimonials | `Review` + `AggregateRating` (on homepage + service pages) |

### 8.3 Technical SEO Checklist

- [ ] Self-referencing canonical on every page
- [ ] Hreflang tags: `es`, `en`, `x-default` (→ ES version)
- [ ] XML sitemap at `/sitemap.xml` with all indexed URLs
- [ ] `robots.txt` allowing all crawlers, referencing sitemap
- [ ] Breadcrumbs on all pages (visible + BreadcrumbList schema)
- [ ] Semantic HTML: one `<h1>` per page, proper heading hierarchy
- [ ] Image alt text on every `<img>`
- [ ] Internal linking: every page linked from at least 2 other pages
- [ ] 404 page with helpful navigation
- [ ] No orphan pages
- [ ] No duplicate content (each URL has unique `<title>` and `<h1>`)
- [ ] Blog posts have `<article>` semantic markup
- [ ] Structured data validates in Google Rich Results Test

### 8.4 Focus Keywords to Preserve

These keywords were set during the SEO audit and MUST be the primary keyword for each page:

| Page | Focus Keyword |
|------|--------------|
| ES Homepage | vuelo chárter privado panamá |
| EN Homepage | private charter flight panama |
| Helicopter ES | paseo en helicóptero panamá |
| Charter ES | vuelos charter en panamá |
| Vuelos Privados Baratos | vuelos privados baratos |
| Contadora Activities | que hacer en isla contadora |
| Transport to Contadora | transporte a contadora |
| Ferry to Contadora | ferry a contadora |
| Playa Cacique | playa cacique contadora |
| Playa Larga | playa larga contadora |
| Panama-Costa Rica | vuelo privado panamá costa rica |
| San Blas | islas de san blas |
| Fleet ES | flota aérea panamá |
| Fleet EN | air fleet panama |

#### NEW — Focus Keywords for Route Pages

| Page | Focus Keyword (ES) | Focus Keyword (EN) |
|------|-------------------|-------------------|
| Route: Panama–Contadora | vuelo privado panama contadora precio | private flight panama to contadora price |
| Route: Panama–San Blas | vuelo a san blas desde panama | flight to san blas from panama |
| Route: Panama–Costa Rica | vuelo charter panama costa rica precio | charter flight panama to costa rica cost |
| Route: Panama–Bocas del Toro | vuelo panama bocas del toro | flight panama to bocas del toro |
| Route: Panama–Medellín | vuelo privado panama medellin | private flight panama to medellin |
| Hub: Contadora | guía completa isla contadora | contadora island complete guide |
| Hub: Costa Rica | vuelos privados a costa rica guía | private flights to costa rica guide |
| Hub: Helicopters | todo sobre helicópteros en panamá | helicopter tours panama complete guide |

### 8.5 Sitemap Configuration

Dynamic sitemap generation via `src/app/sitemap.ts`:

```typescript
// Must generate:
// - All pages (39 — original 19 + 20 new)
// - All blog posts (34+)
// - All product/fleet pages (32)
// - All route pages (10)
// - All content hub pages (6)
// - Exclude noindex pages
// - Include lastmod dates
// - Include alternate hreflang links per URL
```

### 8.6 Content Hub Strategy (NEW — Topic Authority Clusters)

Content hubs create **topical authority** — Google's primary signal for ranking in competitive niches. Each hub is a pillar page that links to all related content, forming a tight cluster.

**Hub Structure:**

```
Pillar Page (hub)
├── Links to 4–8 related blog posts (spokes)
├── Links to destination/service page
├── Links to route page
├── Links to fleet pages (relevant aircraft)
└── Each spoke links back to pillar + to other spokes
```

**Hubs to build:**

| Hub | Pillar Page | Spoke Content (linked pages) |
|-----|------------|------------------------------|
| **Contadora** | `/guia-contadora/` | Playa Larga blog, Playa Cacique blog, Ferry blog, Transport blog, Activities blog, Contadora destination page, Panama-Contadora route page |
| **Costa Rica** | `/guia-costa-rica/` | Playa Tambor blog, San José blog, Costa Rica tourist spots blog, Honeymoon Costa Rica blog, Costa Rica destination page, Panama-Costa Rica route page |
| **Helicopter Tours** | `/guia-helicopteros/` | Helicopter tour blog, Helicopter prices blog, Private helicopter guide blog, Helicopter service page, Robinson R44/R66/Eurocopter fleet pages |

### 8.7 Video SEO Strategy (NEW)

YouTube videos embedded on pages increase dwell time (ranking signal) and can rank independently in Google Video results.

**Required video embeds:**

| Page | Video Content | Source |
|------|-------------|--------|
| Homepage | 30-60s highlight reel (aerial Panama + flights) | @skyridepa YouTube |
| Helicopter Tours | Full helicopter tour experience video | @skyridepa YouTube |
| Contadora Destination | Aerial footage of Contadora Island | @skyridepa YouTube |
| Route: Panama–Contadora | Flight experience video | @skyridepa YouTube |

**Technical implementation:**
- Lazy-load YouTube embeds via `VideoEmbed.tsx` (load facade image first, iframe on click)
- Add `VideoObject` schema on pages with video embeds
- YouTube video descriptions should link back to corresponding website pages (backlink + traffic)

---

## 9. Internationalization (i18n)

### 9.1 Locale Strategy

| Setting | Value |
|---------|-------|
| Default locale | `es` (Spanish) |
| Available locales | `es`, `en` |
| URL strategy | Directory-based (`/en/` prefix for English) |
| Default locale prefix | Hidden (ES pages have no `/es/` prefix) |
| x-default hreflang | Always points to ES version |
| Cookie/header detection | Accept-Language header for first visit |

### 9.2 URL Routing Rules

```
Spanish (default):  https://www.skyride.city/{slug}/
English:            https://www.skyride.city/en/{slug}/
```

**Important**: ES and EN versions do NOT have matching slugs. Each locale has its own unique slug. This is NOT a simple `/es/page` → `/en/page` pattern. The routing must support arbitrary slug mapping per locale.

### 9.3 Translation File Structure

```json
// messages/es.json
{
  "nav": {
    "home": "Inicio",
    "charter": "Vuelos Chárter",
    "helicopter": "Paseo en Helicóptero",
    "fleet": "Nuestra Flota",
    "blog": "Blog",
    "contact": "Contacto"
  },
  "cta": {
    "book_now": "Reservar Ahora",
    "learn_more": "Más Información",
    "whatsapp": "Escribir por WhatsApp",
    "call": "Llamar"
  },
  "footer": {
    "copyright": "© {year} Sky Ride Panama | Vuelos Privados y Chárter. Todos los derechos reservados.",
    "contact": "Contacto",
    "faq": "Preguntas Frecuentes",
    "terms": "Términos y Condiciones",
    "privacy": "Política de Privacidad"
  }
}
```

### 9.4 Content Translation Map

Blog posts that need EN translation (currently ES-only):

| ES Post | Translation Status |
|---------|-------------------|
| San Blas Islands | Needs EN translation |
| Panama-Bocas del Toro | Needs EN translation |
| Helicopter Tour | Needs EN translation |
| Charter Flights Guide | Needs EN translation |
| Helicopter Prices | Needs EN translation |
| Affordable Flight Booking | Needs EN translation |
| Private Helicopter Guide | Needs EN translation |
| What is a Charter Flight | Needs EN translation |
| Private Flight Apps | Needs EN translation |
| Flying with Hypertension | Needs EN translation |
| Air Travel Tips | Needs EN translation |
| Choose Private Plane Seats | Needs EN translation |
| Panama-Costa Rica Flights | Needs EN translation |

**Plan**: Use AI-assisted translation during content migration to create all 13 EN versions simultaneously.

---

## 10. Design & UI Requirements

### 10.1 Design Principles

1. **Aviation-premium feel** — Clean, professional, trustworthy
2. **Mobile-first** — 70%+ of Panama traffic is mobile
3. **Fast perceived loading** — Hero loads instantly, no animation delays
4. **Clear CTAs** — WhatsApp button and booking CTA always visible
5. **Visual destinations** — Large, high-quality images of Panama destinations

### 10.2 Brand Assets

| Asset | Value |
|-------|-------|
| Primary color | Brand blue (extract from current logo) |
| Logo | Current Sky Ride logo (SVG, must be extracted) |
| Fonts | Current site uses system fonts via GeneratePress |
| Hero image | `Cabecera-charter-panama-skyride.webp` |
| Payment badges | Visa/Mastercard/Wompi badges image |

### 10.3 Key UI Components

| Component | Description | Used On |
|-----------|-------------|---------|
| Hero | Full-width background image + headline + CTA + multi-step booking form | Homepage |
| ServiceCard | Icon + title + description + CTA link | Homepage, services |
| AircraftCard | Image + name + specs + capacity badge | Fleet index |
| DestinationCard | Image + name + starting price + CTA | Homepage, destinations |
| RouteCard | Origin → Destination + flight time + starting price + CTA | Homepage, routes (NEW) |
| BlogCard | Featured image + title + excerpt + date | Blog index |
| FAQAccordion | Question/answer expandable items | Service pages, FAQ page |
| ContactForm | Name + phone + email + origin + destination | Homepage, contact |
| BookingForm | Multi-step: Origin → Destination → Date → Passengers → WhatsApp handoff | Homepage hero, service pages (NEW enhanced) |
| WhatsAppFloat | Floating WhatsApp button (bottom-right) | All pages |
| MartinChat | AI chat widget (floating or central bar) | All pages (floating), /reservar-con-martin/ (central) |
| Breadcrumbs | Home > Section > Page | All pages except homepage |
| LanguageSwitcher | ES/EN toggle | Header |
| TopBar | Phone number + WhatsApp + OceanRide link | All pages |
| TrustBar | Safety badges + flight counter + certifications | Homepage, service pages (NEW) |
| Testimonials | Google Reviews carousel or curated reviews | Homepage, service pages (NEW spec) |
| PricingAnchor | "Starting from $X" price display with CTA | Service pages, route pages, fleet (NEW) |
| VideoEmbed | Lazy-loaded YouTube embed (facade → iframe on click) | Helicopter, homepage, destinations (NEW) |
| ContentHubLinks | Pillar page internal links to spoke content | Content hub pages (NEW) |

### 10.4 Responsive Breakpoints

```css
/* Tailwind defaults — aligned with mobile-first */
sm: 640px    /* Large phones */
md: 768px    /* Tablets */
lg: 1024px   /* Small laptops */
xl: 1280px   /* Desktops */
2xl: 1536px  /* Large desktops */
```

### 10.5 Conversion Rate Optimization (CRO) Strategy (NEW)

Every page must be engineered to convert visitors into WhatsApp conversations or form submissions. Target: ≥ 3% visitor → contact rate.

#### CRO Rules

1. **Above-the-fold CTA on every service/destination/route page** — WhatsApp button + "Request Quote" form visible without scrolling
2. **"Starting from $X" pricing anchors** — Displayed on helicopter tours, charter flights, destinations, and route pages. Reduces friction ("Will I be able to afford this?")
3. **Multi-step booking form** — Homepage hero: Origin → Destination → Date → Passengers → WhatsApp handoff. Micro-commitment design increases completion vs. single long form
4. **Sticky mobile CTA** — On mobile, a sticky bottom bar with WhatsApp + Call buttons (appears after scrolling past hero)
5. **Martin AI chat triggers** — On pages with > 30s dwell time and no CTA click, Martin chat opens with a contextual message (e.g., "Looking for a flight to Contadora? I can help!")
6. **Exit-intent / scroll-trigger** — Desktop: exit-intent popup with "Get a free quote in 30 seconds". Mobile: triggered at 70% scroll depth
7. **Social proof near CTAs** — Testimonial quote or "★ 4.8 — 200+ reviews" badge displayed adjacent to booking forms and WhatsApp buttons
8. **Route pages as conversion funnels** — Each route page answers: What? (route details), How much? (starting price), How? (WhatsApp CTA). Shortest path from search intent to contact

#### Page-Level CTA Map

| Page Type | Primary CTA | Secondary CTA | Pricing Shown? |
|-----------|------------|---------------|----------------|
| Homepage | Multi-step booking form | WhatsApp float + Martin chat | No (too many services) |
| Helicopter Tours | "Book Your Flight" → WhatsApp | Contact form | Yes ("from $X/person") |
| Charter Flights | "Request Quote" → WhatsApp | Contact form | Yes ("from $X") |
| Destination pages | "Fly to {destination}" → WhatsApp | Route page link | Yes ("from $X") |
| Route pages | "Book This Route" → WhatsApp | Contact form | Yes (starting price + aircraft options) |
| Fleet aircraft | "Charter This Aircraft" → WhatsApp | Related routes | Yes ("from $X/hour") |
| Blog posts | Inline CTA banner after paragraph 3 | WhatsApp float | No |
| Content hubs | CTA cards per linked service | WhatsApp float | Yes (per linked route) |

### 10.6 Trust & Social Proof Strategy (NEW)

Aviation is a high-trust, high-ticket industry. Without visible trust signals, visitors will not convert regardless of page speed or SEO.

#### Required Trust Elements

| Element | Description | Placement |
|---------|-------------|-----------|
| **TrustBar component** | Horizontal bar with: DGAC certification badge, "500+ flights completed" counter, "Serving Panama since XXXX", payment badges (Visa/MC/Wompi) | Below hero on homepage, above footer on service pages |
| **Testimonials carousel** | 5–8 curated client testimonials with name, photo (optional), service used, star rating | Homepage (below services grid), Helicopter page, Charter page |
| **Google Reviews badge** | Star rating + review count pulled from Google Business Profile | Header area or TrustBar |
| **Safety section** | Pilot credentials, aircraft maintenance standards, insurance info | Helicopter page, Charter page, Fleet aircraft pages |
| **Client logos** | If B2B corporate clients exist — display logos in a "Trusted by" bar | Homepage |
| **AggregateRating schema** | `AggregateRating` structured data on homepage + service pages for rich star snippets in SERP | JSON-LD on homepage, helicopter, charter |

#### Testimonial Data Format

```typescript
// data/testimonials.ts
export const testimonials = [
  {
    name: "Carlos M.",
    service: "charter",  // charter | helicopter | available-seats
    text: { 
      es: "Excelente servicio, el vuelo a Contadora fue perfecto...",
      en: "Excellent service, the flight to Contadora was perfect..."
    },
    rating: 5,
    date: "2026-02-15",
    source: "google",  // google | direct
  },
  // ... 5-8 testimonials
];
```

---

## 11. Integrations

### 11.1 Martin AI Chat Agent

**Current**: External `<script>` tag injecting widget.js from Firebase hosting  
**New**: Native React component imported directly

```tsx
// src/components/martin/MartinChat.tsx
// Port from martin-agent/frontend/src/components/ChatWidget.tsx
// Already React + TypeScript — import directly or as package

// Integration points:
// - API URL: martin-agent backend /api/chat
// - Session management: useSession hook
// - WhatsApp transfer: after 3 messages
// - Two modes: floating (all pages) + central bar (/reservar-con-martin/)
```

**Backend changes needed**:
- Add `skyride.city` (new hosting) to CORS whitelist in martin-agent backend

### 11.2 Analytics & Tracking

| Service | Account/ID | Integration Method |
|---------|-----------|-------------------|
| Google Tag Manager | GTM-W433GH2 | `next/script` strategy="afterInteractive" |
| Google Analytics 4 | G-NFNXQFYJ30 | Via GTM |
| Google Ads | AW-471822052 | Via GTM |
| Microsoft Clarity | m5rtsxrw5c | `next/script` strategy="lazyOnload" |
| InstantFox/Autopilot | API key in current `<head>` | `next/script` strategy="lazyOnload" |

```tsx
// src/app/[locale]/layout.tsx
import Script from 'next/script';

// GTM — loads after page is interactive (no render blocking)
<Script id="gtm" strategy="afterInteractive">
  {`(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-W433GH2');`}
</Script>

// Clarity — loads lazily (lowest priority)
<Script id="clarity" strategy="lazyOnload">
  {`(function(c,l,a,r,i,t,y){...})(window,document,"clarity","script","m5rtsxrw5c");`}
</Script>
```

### 11.3 WhatsApp Integration

```tsx
// Click-to-chat link with pre-filled message
const whatsappUrl = `https://wa.me/15557298766?text=${encodeURIComponent(
  locale === 'es' 
    ? 'Hola *Sky Ride*, estoy interesado en...'
    : 'Hello *Sky Ride*, I am interested in...'
)}`;
```

### 11.4 Contact Form

Current form fields: Full Name, Phone, Email, Origin, Destination  
**Submission**: Send to martin-agent backend or direct WhatsApp redirect  
**Validation**: Zod schema (consistent with team patterns)

### 11.5 Ocean Ride Cross-Link

Header button linking to oceanride.city (sister company for maritime transport).

### 11.6 Conversion Event Tracking (NEW)

Every revenue-generating action must be tracked in GA4 via GTM dataLayer pushes. Without this, we cannot measure progress toward the $1MM revenue target.

#### Required GA4 Events

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `whatsapp_click` | Any WhatsApp CTA click | `page_path`, `service_type` (charter/helicopter/route/general), `locale` |
| `phone_call_click` | Phone number click (TopBar, contact) | `page_path`, `locale` |
| `generate_lead` | Contact form or booking form submitted. **dataLayer event**: `form_submit` (fired by `trackFormSubmit()`). **GTM maps** `form_submit` trigger → sends `generate_lead` to GA4. | `form_type` (contact/booking), `origin`, `destination`, `locale` |
| `martin_chat_start` | Martin chat widget opened | `page_path`, `trigger` (manual/auto), `locale` |
| `martin_whatsapp_transfer` | Martin chat hands off to WhatsApp | `page_path`, `messages_count`, `locale` |
| `fleet_card_click` | Aircraft card clicked on fleet index | `aircraft_name`, `aircraft_type`, `locale` |
| `route_card_click` | Route card clicked | `route_name` (e.g. panama-contadora), `locale` |
| `booking_form_step` | Each step of multi-step booking form | `step` (1–4), `page_path` |
| `cta_click` | Any CTA button click | `cta_text`, `page_path`, `section`, `locale` |
| `video_play` | YouTube embed played | `video_title`, `page_path` |
| `language_switch` | Language toggled | `from_locale`, `to_locale`, `page_path` |

#### Implementation

```typescript
// src/lib/analytics.ts
export function trackEvent(eventName: string, params: Record<string, string>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...params });
  }
}

// Usage in components:
// trackEvent('whatsapp_click', { page_path: '/en/helicopter-rides/', service_type: 'helicopter', locale: 'en' });
```

#### GA4 Conversion Goals

Configure in GA4 as conversions:
1. `whatsapp_click` — **Primary conversion** (directly tied to revenue)
2. `generate_lead` — **Primary conversion** (dataLayer event `form_submit` → mapped to `generate_lead` by GTM)
3. `martin_whatsapp_transfer` — **Secondary conversion**
4. `phone_call_click` — **Secondary conversion**

### 11.7 Google Business Profile Integration (NEW)

For local searches like "helicopter tour panama city" and "charter flight panama", Google Business Profile (GBP) is the #1 local ranking factor. The website must be aligned with GBP.

#### GBP Requirements

| Action | Detail |
|--------|--------|
| **GBP listing setup/optimization** | All services listed (charter, helicopter, available seats, fleet rental), 20+ photos, business hours, service area |
| **NAP consistency** | Name: "Sky Ride Panama", Address: Panama City address, Phone: +507 6840 0045 — identical across website, GBP, social profiles |
| **GBP link on website** | "See our Google Reviews" link on homepage TrustBar |
| **Review generation** | Post-flight email/WhatsApp with direct Google Review link |
| **LocalBusiness schema** | Add `geo` coordinates (`latitude`, `longitude`) to existing LocalBusiness schema |
| **Photos sync** | Upload key website images (fleet, destinations, team) to GBP |

---

## 12. Performance Requirements

### 12.1 Performance Budget

| Metric | Budget | Tool |
|--------|--------|------|
| Mobile PageSpeed | ≥ 95 | Lighthouse |
| Desktop PageSpeed | ≥ 98 | Lighthouse |
| LCP | < 2.5s | Core Web Vitals |
| FID/INP | < 200ms | Core Web Vitals |
| CLS | < 0.1 | Core Web Vitals |
| Total page weight | < 500KB | DevTools |
| Total CSS | < 20KB | DevTools |
| Total JS (first load) | < 100KB | Next.js build output |
| Time to First Byte | < 200ms | WebPageTest |
| Hero image load | < 1.5s | Lighthouse |

### 12.2 Performance Strategies

1. **Static Generation (SSG)** for all pages — no server computation at request time
2. **next/image** with `priority` prop on hero images — automatic preload, WebP/AVIF, responsive srcSet
3. **next/font** for self-hosted fonts — zero external font requests, no FOUT
4. **Tailwind CSS purging** — only used classes shipped (~10-15KB)
5. **next/script** strategies — GTM after interactive, Clarity lazy
6. **No animation delays** — hero renders instantly (no Elementor animation_delay)
7. **Component-level code splitting** — automatic with Next.js App Router
8. **Image dimensions** — explicit width/height on all images (zero CLS)
9. **Preconnect** to critical origins (GTM, analytics, Twilio)

### 12.3 Image Optimization Strategy

| Image Type | Format | Loading | Sizing |
|------------|--------|---------|--------|
| Hero background | WebP/AVIF | `priority` (preloaded) | Full viewport width, responsive srcSet |
| Aircraft photos | WebP/AVIF | Lazy | Fixed aspect ratio, multiple sizes |
| Destination photos | WebP/AVIF | Lazy | Card-sized, responsive |
| Blog featured images | WebP/AVIF | Lazy (first post eager) | 16:9 aspect, responsive |
| Logo | SVG | Inline | Fixed size |
| Icons | SVG or Lucide React | Inline | Fixed size |

---

## 13. Security Requirements

### 13.1 HTTP Security Headers

Configure in `next.config.ts`:

```typescript
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '0' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { 
    key: 'Strict-Transport-Security', 
    value: 'max-age=63072000; includeSubDomains; preload' 
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com *.clarity.ms *.instantfox.co; style-src 'self' 'unsafe-inline'; img-src 'self' data: *.skyride.city *.googleusercontent.com; connect-src 'self' *.skyride.city *.google-analytics.com *.clarity.ms; font-src 'self';"
  },
];
```

### 13.2 Additional Security

- HTTPS enforced (Vercel default or Cloud Run + Cloudflare)
- No exposed API keys in client-side code
- Contact form: rate limiting + honeypot field (no CAPTCHA needed)
- DOMPurify for any user-generated content rendering
- CSP headers block inline script injection

---

## 14. Content Migration Plan

### 14.1 Phase 0: Extract Existing Content

Before building, extract all content from the current WordPress site:

1. **Text content**: Use WP REST API (`/wp-json/wp/v2/pages`, `/posts`, `/products`) to pull:
   - Title, content (HTML), excerpt, slug, featured image URL
   - Rank Math SEO metadata (title, description, focus keyword)
   - Translation pairs (Polylang mappings)
   
2. **Images**: Download all images from `/wp-content/uploads/` via:
   - Featured images per page/post
   - In-content images
   - Hero/background images
   - Fleet aircraft photos
   - Destination photos

3. **Structured data**: Port all JSON-LD schemas (Organization, LocalBusiness, FAQPage)

### 14.2 Content Format

**Blog posts** → MDX files:
```mdx
---
title: "Descubre las Mejores Islas de San Blas"
description: "Guía completa de las islas de San Blas en Panamá..."
slug: "descubre-las-mejores-islas-de-san-blas-skyride"
locale: "es"
translationSlug: null  # No EN translation yet
date: "2025-06-15"
featuredImage: "/images/blog/san-blas.webp"
focusKeyword: "islas de san blas"
category: "destinations"
---

# Descubre las Mejores Islas de San Blas

Content here...
```

**Fleet data** → JSON:
```json
{
  "slug": "cessna-206-5-pasajeros",
  "name": "Cessna 206",
  "type": "airplane",
  "passengers": 5,
  "description": { "es": "...", "en": "..." },
  "specs": {
    "range": "1,300 km",
    "speed": "278 km/h",
    "altitude": "15,700 ft"
  },
  "image": "/images/fleet/cessna-206.webp",
  "routes": ["contadora", "san-blas", "bocas-del-toro"]
}
```

**Page content** → TSX components with content data:
```typescript
// data/pages/helicopter.ts
export const helicopterPage = {
  es: {
    slug: 'paseo-en-helicoptero-en-panama',
    title: 'Paseo en Helicóptero en Panamá | Sky Ride',
    description: 'Experimenta un inolvidable paseo en helicóptero...',
    h1: 'Paseo en Helicóptero en Panamá',
    focusKeyword: 'paseo en helicóptero panamá',
    sections: { /* hero, services, pricing, faq, cta */ },
    faq: [
      { q: '¿Cuánto cuesta un paseo en helicóptero en Panamá?', a: '...' },
      { q: '¿Es seguro volar en helicóptero?', a: '...' },
      // ... 5 Q&As
    ],
  },
  en: {
    slug: 'helicopter-rides',
    // ... parallel EN content
  },
};
```

---

## 15. Phase Plan & Milestones

### Effort Summary

| Phase | Duration | Difficulty | Parallel? |
|-------|----------|------------|-----------|
| Phase 0: Content Extraction | 3–4 days | Low-Medium | ✅ Parallel with Phase 1 |
| Phase 1: Foundation | 5–7 days | **Medium-High** | ✅ Parallel with Phase 0 |
| Phase 2: SEO Infrastructure | 3–4 days | Medium | After Phase 1 |
| Phase 3: Core Pages | 12–16 days | **High** | After Phase 2 + Phase 0 | **Note: build shipped 7 routes (not 5) + EN booking page + EN affordable flights** |
| Phase 4: Blog + Content | 5–7 days | Medium | After Phase 1 + Phase 0; partially parallel with Phase 3 |
| Phase 5: Integrations + Legal | 4–5 days | Medium | After Phase 3 |
| Phase 6: Testing + QA | 4–6 days | **Medium-High** | After all phases |
| Phase 7: Launch | 1–2 days | Low-Medium | After Phase 6 |
| **Total (1 developer)** | **37–51 days** | | **~8–11 weeks** |
| **Total (2 developers)** | **28–38 days** | | **~6–8 weeks** |

### Critical Path

```
Phase 0 (extraction) ──────┐
                            ├──→ Phase 3 (pages) ──→ Phase 5 (integrations) ──→ Phase 6 (QA) ──→ Phase 7 (launch)
Phase 1 (foundation) → Phase 2 (SEO) ──┘                    ↑
                           Phase 4 (blog) ───────────────────┘ (partially parallel with Phase 3)
```

---

### Phase 0: Content Extraction (NEW — Prerequisite)

> **Duration**: 3–4 days | **Difficulty**: Low-Medium | **Developers**: 1

**Deliverables:**
- [ ] WP REST API extraction script (`scripts/extract-wp-content.ts`)
- [ ] All page content extracted (title, HTML body, excerpt, slug, featured image URL)
- [ ] All Rank Math SEO metadata exported (title, description, focus keyword per page)
- [ ] Polylang translation pair mappings exported (ES ↔ EN slug pairs)
- [ ] All blog posts converted from HTML to MDX with frontmatter
- [ ] All images downloaded from `/wp-content/uploads/` and organized into `public/images/`
- [ ] Fleet data structured as JSON (13 aircraft with specs)
- [ ] FAQPage schema Q&As extracted from Rank Math (helicopter + charter)
- [ ] Testimonials collected and structured (Google Reviews + direct feedback)

**Acceptance criteria:** All content exists as local files (MDX, JSON, images) ready for the build phases.

**Risk:** Some content may be locked inside Elementor shortcodes (not available via REST API). Fallback: manual copy-paste from rendered pages.

**Parallel with:** Phase 1 (different scope, no dependency).

---

### Phase 1: Foundation — Scaffold + Routing + i18n

> **Duration**: 5–7 days | **Difficulty**: Medium-High | **Developers**: 1

**Why Medium-High:** The arbitrary ES↔EN slug mapping is the hardest part. `next-intl` doesn't natively support different slugs per locale — requires custom `slug-map.ts` + middleware logic. The catch-all `[...slug]` route must resolve 100+ URLs to the correct page component and locale. WordPress redirect rules (wp-admin, wp-content, etc.) add complexity.

**Deliverables:**
- [ ] Next.js 15 project initialized with TypeScript + Tailwind CSS
- [ ] `next-intl` configured with ES/EN locale switching
- [ ] Middleware for locale detection + URL rewriting
- [ ] Custom slug mapping system for arbitrary ES↔EN URL pairs
- [ ] All 100+ URL routes defined and responding with placeholder content
- [ ] `robots.txt` and `sitemap.xml` generation working
- [ ] Security headers configured in `next.config.ts`
- [ ] WordPress redirect rules (wp-admin, wp-content, etc.)
- [ ] Route page routes (`/ruta/[slug]`, `/en/route/[slug]`)
- [ ] Content hub page routes (`/guia-[slug]`, `/en/[slug]-guide`)
- [ ] 404 page with navigation

**Acceptance criteria:** Every current URL returns 200 with correct locale. All new URLs (routes, hubs, EN destinations) return 200 with placeholder content.

---

### Phase 2: SEO Infrastructure

> **Duration**: 3–4 days | **Difficulty**: Medium | **Developers**: 1

**Why Medium:** Metadata API is well-documented. JSON-LD components are reusable templates. Main effort is creating the SEO data file with metadata for all 100+ URLs. Hreflang is handled by next-intl + Metadata API `alternates`. Schema validation requires manual testing per page type.

**Deliverables:**
- [ ] Metadata API configured for every page (title, desc, canonical, OG)
- [ ] Hreflang tags (es, en, x-default) on every page
- [ ] JSON-LD structured data components (Organization, WebSite, BreadcrumbList)
- [ ] FAQPage schema on helicopter + charter pages
- [ ] AggregateRating schema on homepage + service pages
- [ ] VideoObject schema component (for pages with video embeds)
- [ ] Breadcrumb component (visible + schema)
- [ ] All focus keywords mapped in SEO data file (including new route + hub pages)
- [ ] Open Graph images generated or mapped

**Acceptance criteria:** Google Rich Results Test passes for all schema types.

---

### Phase 3: Core Pages

> **Duration**: 12–16 days | **Difficulty**: High | **Developers**: 1–2

**Why High:** This is ~70% of the visual work. 10+ unique page layouts, 20+ reusable components, responsive design for all breakpoints, hero optimization. Now also includes EN destination pages, route pages, content hub pages, trust/CRO components, and multi-step booking form. Mobile-first responsive for each layout.

**Deliverables:**
- [ ] Homepage ES + EN (hero + multi-step booking form, services grid, destinations, trust bar, testimonials, CTAs)
- [ ] Helicopter Tours page ES + EN (with FAQPage schema, pricing anchor, video embed)
- [ ] Charter Flights page ES + EN (with FAQPage schema, pricing anchor)
- [ ] Affordable Flights / Available Seats pages ES + EN
- [ ] Business Flights page ES + EN
- [ ] Destination landing pages ES + EN (8 pages — 4 ES + 4 EN NEW)
- [ ] Route pages ES + EN (10 pages — 5 routes × 2 locales — NEW)
- [ ] Content hub pillar pages ES + EN (6 pages — 3 hubs × 2 locales — NEW)
- [ ] Fleet index page ES + EN
- [ ] Individual aircraft pages (data-driven from fleet JSON, with pricing anchors)
- [ ] Martin booking page (/reservar-con-martin/)
- [ ] Header, Footer, TopBar, Mobile Nav, Language Switcher components
- [ ] Multi-step BookingForm component (Origin → Destination → Date → Passengers → WhatsApp)
- [ ] Contact Form component (with Zod validation)
- [ ] WhatsApp floating button (with sticky mobile CTA bar)
- [ ] TrustBar component (certifications, flight counter, payment badges)
- [ ] Testimonials carousel component
- [ ] PricingAnchor component ("Starting from $X")
- [ ] VideoEmbed component (lazy YouTube facade)
- [ ] RouteCard component (origin → destination + time + price)

**Breakdown:**
| Sub-task | Days |
|----------|------|
| Homepage (hero, booking form, services, trust, testimonials) | 3 |
| Service pages ×5 (helicopter, charter, affordable, available, business) | 4 |
| Fleet index + aircraft pages (data-driven) | 2 |
| Destination pages ES + EN (4 existing + 4 new EN) | 2 |
| Route pages (5 routes × 2 locales, data-driven) | 2 |
| Content hub pillar pages (3 hubs × 2 locales) | 1 |
| Layout components (header, footer, topbar, nav, language switcher) | 2 |
| CRO/Trust components (trust bar, testimonials, pricing, sticky CTA) | 1 |

**Acceptance criteria:** Visual quality exceeds current site. All CTAs functional. Trust signals visible. Pricing anchors on service/route/fleet pages. Mobile-first responsive on all breakpoints.

---

### Phase 4: Blog + Content

> **Duration**: 5–7 days | **Difficulty**: Medium | **Developers**: 1

**Why Medium:** MDX setup with frontmatter is standard. Blog template needs reading time, related posts, share buttons, and inline CTA banners. Content migration is mostly automated (Phase 0 script). The 13 EN translations require AI-assisted translation + human review. Content hub pillar pages need original content/design.

**Deliverables:**
- [ ] MDX blog system with frontmatter
- [ ] Blog index page with pagination (ES + EN)
- [ ] All 34 blog posts migrated to MDX (from Phase 0 output)
- [ ] 13 missing EN translations created (AI-assisted + human review)
- [ ] Blog post template (featured image, reading time, inline CTA banner, share buttons, related posts)
- [ ] Internal links added: each blog post links to relevant service/destination/route pages
- [ ] Each blog post linked from its parent content hub pillar page

**Breakdown:**
| Sub-task | Days |
|----------|------|
| MDX system setup + blog template | 1 |
| Blog index pages (ES + EN, pagination) | 1 |
| Content migration verification (34 posts) | 1 |
| EN translations (13 posts, AI-assisted + review) | 1–2 |
| Internal linking pass (all posts → services/routes/hubs) | 1 |

**Acceptance criteria:** All blog URLs respond with correct content. Each blog post links to ≥ 2 service/destination pages. All content hubs link to their spoke posts.

---

### Phase 5: Integrations + Legal Pages

> **Duration**: 4–5 days | **Difficulty**: Medium | **Developers**: 1

**Why Medium:** Martin chat is already React — port is straightforward. GTM/GA4/Clarity are script tags. The NEW work is GA4 conversion event tracking (dataLayer pushes for all CTAs), Google Business Profile setup, and legal page content creation. Legal pages are templated — low design effort.

**Deliverables:**
- [ ] Martin Chat widget integrated as native React component
- [ ] GTM, GA4, Clarity, Google Ads scripts loaded via next/script
- [ ] GA4 conversion event tracking implemented (`src/lib/analytics.ts`) — all events from §11.6
- [ ] GA4 conversion goals configured (whatsapp_click, generate_lead, martin_whatsapp_transfer, phone_call_click)
- [ ] WhatsApp click-to-chat integration (with per-page pre-filled messages)
- [ ] Ocean Ride cross-link
- [ ] Google Business Profile optimized (photos, services, hours, service area) — NEW
- [ ] NAP consistency verified across site + GBP + social profiles — NEW
- [ ] Contact page (ES + EN) — NEW
- [ ] FAQ page (ES + EN) — NEW
- [ ] Terms and Conditions page (ES + EN) — NEW
- [ ] Privacy Policy page (ES + EN) — NEW

**Breakdown:**
| Sub-task | Days |
|----------|------|
| Martin chat integration + testing | 1 |
| Analytics scripts + conversion event tracking | 1 |
| WhatsApp + Ocean Ride + GBP setup | 0.5 |
| Legal pages ×4 (templated, 2 locales each) | 1 |
| FAQ + Contact pages (2 locales each) | 1 |

**Acceptance criteria:** All integrations fire correctly. All conversion events appear in GA4 debug view. Legal pages accessible from footer. GBP listing live and linked from site.

---

### Phase 6: Testing + Performance Optimization

> **Duration**: 4–6 days | **Difficulty**: Medium-High | **Developers**: 1

**Why Medium-High:** Lighthouse 95+ mobile on ALL pages is aggressive — may require image re-optimization, component lazy-loading adjustments, or third-party script auditing. E2E tests with Playwright for booking form, Martin chat, language switcher. URL verification script for 100+ URLs. Visual regression testing across browsers. Side-by-side comparison with current WordPress site for content parity.

**Deliverables:**
- [ ] Lighthouse CI passing ≥ 95 on all pages (mobile)
- [ ] All 100+ URLs verified (200 status, correct title, correct canonical)
- [ ] All redirect rules verified (WordPress URLs, /paseo-en-helicoptero/ → /paseo-en-helicoptero-en-panama/)
- [ ] Structured data validated (Rich Results Test on every page type)
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile responsive testing (iPhone SE, iPhone 15, Galaxy S24, iPad)
- [ ] Image optimization verified (all WebP/AVIF, proper sizing, no broken images)
- [ ] Total bundle size within budget (< 100KB JS first load, < 20KB CSS)
- [ ] E2E tests for critical flows (multi-step booking form, Martin chat, language switch, WhatsApp click)
- [ ] Conversion events verified in GA4 debug view
- [ ] Content parity check: side-by-side comparison with current WordPress site
- [ ] Accessibility audit (keyboard nav, screen reader, color contrast)

**Breakdown:**
| Sub-task | Days |
|----------|------|
| Lighthouse optimization passes (images, scripts, lazy loading) | 2 |
| E2E test writing (Playwright) | 1–2 |
| URL/redirect verification (automated script) | 0.5 |
| Cross-browser + mobile testing | 1 |
| Content parity QA + accessibility | 0.5 |

**Acceptance criteria:** Zero Lighthouse warnings, zero console errors, all conversion events firing, all URLs returning correct content.

---

### Phase 7: Launch

> **Duration**: 1–2 days | **Difficulty**: Low-Medium | **Developers**: 1

**Why Low-Medium:** Mostly operational — DNS switch, SSL verification, GSC sitemap submission, Martin CORS update. Risk is in monitoring for 404s and crawl errors post-launch.

**Deliverables:**
- [ ] DNS cutover to new hosting (Vercel or Cloud Run)
- [ ] SSL certificate verified
- [ ] Old WordPress backup at old.skyride.city (30 days)
- [ ] GSC sitemap re-submitted
- [ ] GSC URL inspection on 10 key pages (homepage, helicopter, charter, fleet, top destinations, top routes)
- [ ] Google cache updated verification
- [ ] Social media links updated if needed
- [ ] Martin backend CORS updated for new hosting domain
- [ ] GA4 real-time dashboard verified (events flowing)
- [ ] First 24-hour monitoring: check GSC hourly for crawl errors

**Acceptance criteria:** Zero downtime, zero 404 errors in GSC.

---

## 16. Project Structure

```
sky-ride-web/
├── docs/
│   └── PRD_website_rebuild.md ......... This document
├── scripts/
│   └── extract-wp-content.ts .......... WordPress content extraction script (Phase 0)
├── public/
│   ├── images/
│   │   ├── hero/ ...................... Hero/banner images
│   │   ├── fleet/ ..................... Aircraft photos
│   │   ├── destinations/ .............. Destination photos
│   │   ├── routes/ .................... Route maps/illustrations (NEW)
│   │   ├── blog/ ...................... Blog featured images
│   │   ├── trust/ ..................... Safety badges, certifications (NEW)
│   │   └── logos/ ..................... Logo variants (SVG)
│   ├── favicon.ico
│   └── og-default.jpg ................ Default OG image
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── blog/
│   │   │   ├── fleet/
│   │   │   ├── route/ ................ Route pages (NEW)
│   │   │   ├── guide/ ................ Content hub pages (NEW)
│   │   │   └── [...slug]/page.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/ ................... Header, Footer, MobileNav, TopBar, LanguageSwitcher
│   │   ├── seo/ ...................... JsonLd, Breadcrumbs, HreflangTags
│   │   ├── ui/ ....................... Button, Card, Hero, CTABanner, ContactForm, WhatsAppButton, VideoEmbed
│   │   ├── sections/ ................. ServicesGrid, DestinationCards, FleetGallery, Testimonials, TrustBar, FAQAccordion, BookingForm, RouteCard, PricingAnchor, ContentHubLinks
│   │   └── martin/ ................... MartinChat
│   ├── content/
│   │   ├── blog/ ..................... MDX blog posts (ES + EN)
│   │   ├── fleet/ .................... Aircraft data (JSON)
│   │   ├── destinations/ ............. Destination data (JSON)
│   │   └── routes/ ................... Route data (JSON) — NEW
│   ├── data/
│   │   ├── seo.ts .................... All SEO metadata per page
│   │   ├── fleet.ts .................. Fleet aircraft definitions
│   │   ├── destinations.ts ........... Destination definitions
│   │   ├── routes.ts ................. Route definitions (origin, dest, time, price)
│   │   ├── testimonials.ts ........... Client testimonials data (NEW)
│   │   ├── navigation.ts ............. Nav links per locale
│   │   └── slug-map.ts ............... URL slug mapping per locale
│   ├── lib/
│   │   ├── i18n.ts ................... i18n configuration
│   │   ├── mdx.ts .................... MDX processing utilities
│   │   ├── analytics.ts .............. GA4 event tracking helpers (NEW)
│   │   └── utils.ts .................. Shared utilities
│   ├── messages/
│   │   ├── es.json ................... Spanish translations
│   │   └── en.json ................... English translations
│   ├── styles/
│   │   └── globals.css ............... Tailwind base + custom properties
│   └── middleware.ts .................. i18n locale detection + routing
├── .env.local ......................... Environment variables
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 17. Deployment & Infrastructure

### 17.1 Recommended: Vercel

| Aspect | Detail |
|--------|--------|
| **Platform** | Vercel (free tier → Pro if needed) |
| **CDN** | Vercel Edge Network (global, automatic) |
| **SSL** | Automatic (Let's Encrypt) |
| **Custom domain** | skyride.city + www.skyride.city |
| **Preview deploys** | Automatic per Git branch/PR |
| **Analytics** | Vercel Web Analytics (optional, free tier) |
| **Build** | Automatic on `git push` to `main` |
| **Cost** | Free tier: 100GB bandwidth/month, sufficient for this site |

### 17.2 Alternative: Google Cloud Run

If staying on Google Cloud (consistent with martin-agent, seliabot):

| Aspect | Detail |
|--------|--------|
| **Platform** | Cloud Run (serverless containers) |
| **CDN** | Cloudflare (free plan) in front |
| **SSL** | Cloudflare auto-SSL |
| **Build** | Cloud Build (cloudbuild.yaml) |
| **Docker** | Multi-stage Next.js Dockerfile |
| **Cost** | Pay-per-request (~$0-5/month for this traffic level) |

### 17.3 DNS Configuration

```
skyride.city         → A/CNAME → Vercel (or Cloud Run)
www.skyride.city     → CNAME  → Vercel (or Cloud Run)
old.skyride.city     → A      → Current WordPress host (30-day backup)
```

### 17.4 Environment Variables

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://www.skyride.city
NEXT_PUBLIC_GTM_ID=GTM-W433GH2
NEXT_PUBLIC_GA_ID=G-NFNXQFYJ30
NEXT_PUBLIC_CLARITY_ID=m5rtsxrw5c
NEXT_PUBLIC_WHATSAPP_NUMBER=15557298766
NEXT_PUBLIC_PHONE_NUMBER=+50768400045
NEXT_PUBLIC_MARTIN_API_URL=https://martin-backend-url/api
NEXT_PUBLIC_OCEANRIDE_URL=https://www.oceanride.city
```

---

## 18. Launch Checklist

### Pre-Launch (T-1 day)

- [ ] All 100+ URLs return 200 with correct content
- [ ] All redirects working (WordPress URLs, old slugs)
- [ ] Lighthouse mobile ≥ 95 on homepage, service pages, blog, route pages
- [ ] Structured data passes Rich Results Test (all schema types)
- [ ] sitemap.xml accessible and lists all indexed URLs (including new routes, hubs, EN destinations)
- [ ] robots.txt correct
- [ ] Hreflang tags verified on 10+ pages (including route pages and content hubs)
- [ ] Canonical tags self-referencing on all pages
- [ ] Multi-step booking form submitting correctly (all 4 steps → WhatsApp)
- [ ] Contact form submitting correctly
- [ ] Martin chat widget functional (floating mode + /reservar-con-martin/ central mode)
- [ ] WhatsApp buttons working (with correct pre-filled messages per locale)
- [ ] Language switcher working on all pages (including route + hub pages)
- [ ] All conversion events firing in GA4 debug view (whatsapp_click, generate_lead, martin_whatsapp_transfer, etc.)
- [ ] Trust bar displaying correctly (certifications, flight counter, payment badges)
- [ ] Testimonials carousel loading with real reviews
- [ ] Pricing anchors displaying on service/route/fleet pages
- [ ] Video embeds loading correctly (lazy facade → iframe)
- [ ] Images loading correctly (no broken images)
- [ ] Favicon and OG images present
- [ ] Console: zero errors
- [ ] Cross-browser testing passed
- [ ] Google Business Profile listing live and linked from site

### Launch Day (T-0)

- [ ] DNS switch to new hosting
- [ ] SSL certificate active and valid
- [ ] Verify homepage loads at https://www.skyride.city
- [ ] Verify all service pages load
- [ ] Verify all route pages load (NEW)
- [ ] Verify all content hub pages load (NEW)
- [ ] Verify blog loads
- [ ] Submit sitemap to GSC
- [ ] Request indexing on 10 key pages via GSC URL Inspection (homepage, helicopter, charter, fleet, top routes, top hubs)
- [ ] Verify old WordPress accessible at old.skyride.city
- [ ] Monitor GSC for crawl errors (check hourly for first 24h)
- [ ] Test WhatsApp flow end-to-end
- [ ] Test Martin chat flow end-to-end
- [ ] Verify GA4 real-time dashboard showing events

### Post-Launch (T+1 to T+7)

- [ ] Check GSC daily for crawl errors
- [ ] Verify sitemap status changes to "Success"
- [ ] Monitor PageSpeed scores
- [ ] Check `site:skyride.city` in Google — pages appearing
- [ ] Check Google Cache for key pages
- [ ] Fix any 404s found in GSC
- [ ] Monitor Martin chat sessions for issues
- [ ] Verify analytics data flowing in GA4
- [ ] Verify conversion events attribution is correct (per page, per service)
- [ ] First WhatsApp inquiry count baseline established

---

## 19. Post-Launch Monitoring

### Weekly SEO Checks (first 90 days)

| Check | Tool | Frequency |
|-------|------|-----------|
| Pages indexed | GSC > Pages | Weekly |
| Crawl errors | GSC > Pages | Weekly |
| Sitemap status | GSC > Sitemaps | Weekly |
| Core Web Vitals | GSC > Experience | Weekly |
| Keyword rankings | GSC > Performance | Weekly |
| PageSpeed scores | PageSpeed Insights | Bi-weekly |
| Backlinks | GSC > Links | Monthly |

### Key Search Queries to Track

| Query (ES) | Query (EN) | Target Page |
|------------|-----------|-------------|
| vuelo charter panama | charter flight panama | Homepage |
| paseo en helicóptero panamá | helicopter tour panama | Helicopter page |
| vuelos privados baratos | affordable private flights | Vuelos Privados page |
| transporte a contadora | transportation to contadora | Contadora blog |
| ferry a contadora | ferry to contadora | Ferry blog |
| vuelo privado panama costa rica | private flight panama costa rica | Destination page |
| islas de san blas | san blas islands | San Blas blog |
| vuelo panama contadora precio | flight panama to contadora price | Route: Panama–Contadora (NEW) |
| vuelo panama san blas | flight to san blas from panama | Route: Panama–San Blas (NEW) |
| vuelo charter panama costa rica precio | charter flight panama costa rica cost | Route: Panama–Costa Rica (NEW) |
| guía isla contadora | contadora island guide | Hub: Contadora (NEW) |
| helicóptero panama guía | helicopter tour panama guide | Hub: Helicopters (NEW) |

### Revenue Tracking (NEW)

Weekly review of conversion funnel metrics tied to the $1MM annual revenue target:

| Metric | Tool | Target | Frequency |
|--------|------|--------|-----------|
| Organic visitors | GA4 | ≥ 9,300/month | Weekly |
| WhatsApp clicks (from organic) | GA4 `whatsapp_click` event | ≥ 280/month (3% rate) | Weekly |
| Form submissions | GA4 `generate_lead` event | ≥ 100/month | Weekly |
| Martin chat → WhatsApp transfers | GA4 `martin_whatsapp_transfer` | Track trend | Weekly |
| Bookings from organic (reported by sales) | Internal CRM / WhatsApp logs | ≥ 42/month | Monthly |
| Revenue from organic bookings | Internal accounting | ≥ $83,333/month | Monthly |
| Top converting pages | GA4 page-level conversion report | Identify winners | Bi-weekly |
| EN vs ES conversion rate | GA4 locale segment | Optimize underperforming locale | Monthly |

### Performance Monitoring

- **Vercel Analytics**: Real-user Web Vitals data (if on Vercel)
- **GSC Core Web Vitals**: Once enough CrUX data accumulates
- **PageSpeed Insights**: Manual check bi-weekly

---

## 20. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| URL mismatch causes 404s | High (SEO loss) | Medium | Comprehensive URL map + redirect testing before launch |
| Google re-crawl takes weeks | Medium (delayed rankings) | High | Request indexing via GSC on day 1, sitemap submission |
| Martin chat breaks on new domain | Medium (lost bookings) | Low | Update CORS before launch, test in staging |
| Images not migrated completely | Medium (broken pages) | Medium | Automated image extraction script, visual QA per page |
| Content parity issues | Medium (missing info) | Medium | Side-by-side comparison of every page before launch |
| DNS propagation delay | Low (temporary outage) | Low | Lower TTL to 300s 24h before switch |
| New EN translations poor quality | Low (bad UX) | Medium | Human review of all AI-generated translations |
| WordPress backup needed after launch | Low | Low | Keep old.skyride.city running for 30 days |
| Elementor content not in REST API | Medium (content gaps) | Medium | Fallback: manual extraction from rendered pages, visual QA per page |
| No backlinks = slow organic growth | High (revenue target at risk) | High | Post-launch content marketing plan, YouTube backlinks, GBP reviews, partner links (hotels, tour operators) |
| Route page pricing becomes stale | Medium (trust erosion) | Medium | Use "Starting from" language, review quarterly, connect to fleet data |
| Conversion tracking gaps | Medium (can't measure revenue) | Low | QA all events in GA4 debug view before launch, verify weekly post-launch |
| Scope creep from new pages (routes, hubs, EN destinations) | Medium (delays launch) | Medium | Route and hub pages use data-driven templates — minimal custom design per page |

---

## Appendix A — SEO Metadata to Port

### Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sky Ride Panama",
  "url": "https://www.skyride.city",
  "logo": "https://www.skyride.city/images/logos/skyride-logo.svg",
  "sameAs": [
    "https://www.facebook.com/skyridepa/",
    "https://www.instagram.com/skyridepa/",
    "https://www.tiktok.com/@skyridepa",
    "https://www.youtube.com/@skyride9486"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+507-6840-0045",
    "contactType": "reservations",
    "areaServed": ["PA", "CR", "CO"],
    "availableLanguage": ["Spanish", "English"]
  }
}
```

### LocalBusiness Schema

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sky Ride Panama",
  "description": "Private charter flights, helicopter tours, and shared seat flights in Panama",
  "url": "https://www.skyride.city",
  "telephone": "+507-6840-0045",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Panama City",
    "addressCountry": "PA"
  },
  "priceRange": "$$-$$$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "06:00",
    "closes": "20:00"
  }
}
```

### FAQPage Schema — Helicopter Tours

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta un paseo en helicóptero en Panamá?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los precios varían según la duración y la ruta..."
      }
    }
    // ... 5 Q&As total (extract from current Rank Math FAQPage)
  ]
}
```

### FAQPage Schema — Charter Flights

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    // ... 5 Q&As (extract from current Rank Math FAQPage)
  ]
}
```

---

## Appendix B — Structured Data Schemas

### Per-Page Schema Matrix

| Page Type | Organization | WebSite | LocalBusiness | BreadcrumbList | FAQPage | Article | Product | Service | AggregateRating | VideoObject | CollectionPage |
|-----------|:-----------:|:-------:|:------------:|:--------------:|:-------:|:-------:|:-------:|:-------:|:---------------:|:-----------:|:--------------:|
| Homepage | ✅ | ✅ | ✅ | — | — | — | — | — | ✅ | ✅* | — |
| Service pages | ✅ | — | — | ✅ | ✅** | — | — | ✅ | ✅ | ✅* | — |
| Fleet index | ✅ | — | — | ✅ | — | — | — | — | — | — | — |
| Aircraft page | ✅ | — | — | ✅ | — | — | ✅ | — | — | — | — |
| Route pages (NEW) | ✅ | — | — | ✅ | — | — | — | ✅ | — | — | — |
| Content hubs (NEW) | ✅ | — | — | ✅ | — | — | — | — | — | — | ✅ |
| Destination pages | ✅ | — | — | ✅ | — | — | — | — | — | ✅* | — |
| Blog post | ✅ | — | — | ✅ | — | ✅ | — | — | — | — | — |
| Blog index | ✅ | — | — | ✅ | — | — | — | — | — | — | — |
| FAQ page | ✅ | — | — | ✅ | ✅ | — | — | — | — | — | — |
| Legal pages | ✅ | — | — | ✅ | — | — | — | — | — | — | — |

*VideoObject only on pages with YouTube video embeds.
**FAQPage only on helicopter and charter pages.

---

## Appendix C — Current Site Audit Findings

### Comprehensive SEO Audit Summary (Score: 4.0/10 → improved to ~6.5/10)

**Completed fixes (Phases 1-6):**

1. ✅ Organization schema: "Yasu Guerra" → "Sky Ride Panama" + LocalBusiness
2. ✅ EN homepage title/meta: Spanish → English
3. ✅ Breadcrumbs enabled via Rank Math
4. ✅ 13 utility pages noindexed (cart, checkout, bot pages)
5. ✅ Slug fixes: /5113-2/ → /asistente-martin/
6. ✅ Canonical fix on /paseo-en-helicoptero/
7. ✅ Catch-all redirect deleted
8. ✅ Blog excerpts made unique (3 posts)
9. ✅ WP Rocket fully configured (file optimization, LazyLoad, preload, heartbeat, DB)
10. ✅ EWWW Image Optimizer: WebP ON, 543 images bulk optimized
11. ✅ Security headers added (X-XSS-Protection, X-Content-Type-Options, Referrer-Policy)
12. ✅ Hreflang verified for all pages
13. ✅ x-default hreflang added via PHP snippet
14. ✅ FAQPage schema: helicopter (5 Q&As) + charter (5 Q&As)
15. ✅ Product URL emoji cleanup: 24 slugs cleaned
16. ✅ Sitemap fix: was 404, now live (87 URLs)
17. ✅ Focus keywords set on 14+ key pages
18. ✅ EN homepage canonical fix: was pointing to ES homepage
19. ✅ Duplicate page resolution: post 2204 noindexed
20. ✅ Hero image preload + LazyLoad exclusion (Mobile PageSpeed: 46 → 63)
21. ✅ GSC verified + sitemap submitted
22. ✅ Indexing requested for 5 key URLs

**Issues the rebuild will permanently resolve:**

1. Elementor performance bloat (500KB+ CSS, animation delays)
2. Plugin dependency chain (15+ plugins)
3. Indexation crisis (only 1/85 URLs indexed)
4. Broken footer links (Contact, FAQ, Terms, Privacy = # anchors)
5. Missing legal pages
6. 13 blog posts without EN translation
7. No version control for content or SEO configuration
8. No staging environment
9. HSTS headers (currently blocked by hosting limitations)
10. Full CSP headers (currently blocked by WP plugin requirements)

---

*End of PRD. This document should be updated as decisions are made and milestones are reached.*
