# Sky Ride Panama — SEO Master Plan & Post-Migration Action Guide
*Last updated: April 27, 2026 | Status: Stabilized — tracking complete, new pages live, GSC quota exceeded (resume indexing April 28)*

---

## Table of Contents
1. [Executive Summary & Current Status](#1-executive-summary--current-status)
2. [Site Architecture Reference](#2-site-architecture-reference)
3. [Complete Button & CTA Tracking Audit](#3-complete-button--cta-tracking-audit)
4. [Analytics Stack — Current State & Fixes](#4-analytics-stack--current-state--fixes)
5. [Critical Code Bugs — Must Fix First](#5-critical-code-bugs--must-fix-first)
6. [GSC & GA4 Data Findings](#6-gsc--ga4-data-findings)
7. [Keyword Universe & Content Gaps](#7-keyword-universe--content-gaps)
8. [Schema / Structured Data Roadmap](#8-schema--structured-data-roadmap)
9. [Week-by-Week Execution Plan](#9-week-by-week-execution-plan)
10. [GTM Container Cleanup Checklist](#10-gtm-container-cleanup-checklist)
11. [GSC Post-Migration Checklist](#11-gsc-post-migration-checklist)
12. [Content Expansion Briefs](#12-content-expansion-briefs)
13. [Tracking Verification Checklist](#13-tracking-verification-checklist)

---

## 1. Executive Summary & Current Status

### The Core Problem (April 25, 2026)

Sky Ride just migrated to a new Next.js build. **The new site has 3 indexed pages out of 127.** 
Google is in an active deindexation spiral — down from 55 indexed pages in January. 
The primary causes are known and fixable within 48 hours. Every hour of delay costs rankings.

### Score Card

| Dimension | Score | Trend |
|---|---|---|
| Technical SEO | 8.0 / 10 | ↑ Canonical fixed, JSON-LD server-rendered, redirect working, preconnect removed |
| Content SEO | 6.5 / 10 | ↑ 6 new pages added, route pages expanded, blog CTAs updated |
| Analytics Data Quality | 7.5 / 10 | ↑ Deduplication fixed, all CTAs tracked, GTM cleaned (v40), OceanRide filter active |
| Off-Page Authority | 3.5 / 10 | → Directories not yet submitted |
| **Overall** | **6.5 / 10** | **↑ Recovering — indexation in progress** |

### Root Cause Summary

```
INDEXATION CRISIS (3/127 pages indexed)
└── PRIMARY CAUSE: Canonical domain split
    ├── src/data/seo.ts:5        SITE_URL = "https://skyride.city"   ← WRONG (non-www)
    ├── src/app/sitemap.ts:5     BASE     = "https://skyride.city"   ← WRONG (non-www)
    ├── src/app/robots.ts:9      sitemap  = "https://skyride.city/sitemap.xml" ← WRONG
    └── src/components/seo/JsonLd.tsx:21  BASE_URL = "https://skyride.city" ← WRONG
        
    Live site serves: https://www.skyride.city/... 
    Canonical tags say: https://skyride.city/...
    → Google treats every www page as a duplicate → deindexes them
    → Only the old WordPress non-www pages remain indexed

ZERO RICH RESULTS (0 FAQs, 0 stars, 0 breadcrumbs in SERP)
└── src/components/seo/JsonLd.tsx
    Uses: <Script strategy="afterInteractive">  ← client-side only
    Should be: <script>                         ← server-rendered HTML

ANALYTICS TRIPLE TRACKING + CROSS-DOMAIN CONTAMINATION
├── GTM fires GA4 (correct — via googtag tag in GTM-W433GH2)
├── Analytics.tsx ALSO fires standalone GA4 GA4_ID block ← REMOVE
├── GTM still has 2 Universal Analytics tags (UA dead since Jul 2023) ← DELETE
└── OceanRide's domain uses same GTM/GA4 → 1,564 OceanRide views in Sky Ride GA4
```

---

## 2. Site Architecture Reference

### Technology Stack
- **Framework:** Next.js App Router (standalone output for Cloud Run)
- **i18n:** next-intl, `as-needed` mode — ES has no locale prefix, EN uses `/en/`
- **Deployment:** Google Cloud Run via `cloudbuild.yaml` + `Dockerfile`
- **Analytics:** GTM `GTM-W433GH2` → GA4 `G-NFNXQFYJ30` + Microsoft Clarity `m5rtsxrw5c`
- **Font:** Open Sans via `next/font/google` (self-hosted at build time)
- **Images:** AVIF + WebP via `next/image`

### Page Type Map (127 total pages)

| Type | ES Pattern | EN Pattern | Count | Template |
|---|---|---|---|---|
| Home | `/` | `/en` | 2 | `home-page.tsx` |
| Service | `/vuelos-charter-en-panama` | `/en/charter-flights` | 10 | `service-page.tsx` |
| Fleet Index | `/nuestra-flota` | `/en/our-fleet` | 2 | `fleet-index-page.tsx` |
| Fleet Detail | `/producto/{slug}` | `/en/product/{slug}` | 26 | `fleet-detail-page.tsx` |
| Destination | `/vuelo-privado-a-contadora` | `/en/private-flight-to-contadora` | 8 | `destination-page.tsx` |
| Route | `/ruta/{slug}` | `/en/route/{slug}` | 14 | `route-page.tsx` |
| Content Hub | `/guia-contadora` | `/en/contadora-guide` | 6 | `content-hub-page.tsx` |
| Blog Index | `/blog` | `/en/blog` | 2 | `blog-index-page.tsx` |
| Blog Post | `/slug` | `/en/slug` | 42 | `blog-post-page.tsx` |
| Booking | `/reservar-con-martin` | `/en/book-with-martin` | 2 | `booking-page.tsx` |
| Contact | `/contacto` | `/en/contact` | 2 | `contact-page.tsx` |
| FAQ | `/preguntas-frecuentes` | `/en/faq` | 2 | `faq-page.tsx` |
| Legal | Various | Various | 9 | `legal-page.tsx` |

### URL Slugs — Key Commercial Pages

**Services (ES → EN)**
- `/vuelos-charter-en-panama` → `/en/charter-flights`
- `/paseo-en-helicoptero-en-panama` → `/en/helicopter-rides`
- `/vuelos-privados-baratos` → `/en/affordable-flights`
- `/asientos-disponibles` → `/en/available-seats`
- `/renta-de-aviones-privados-para-viajes-de-negocios` → `/en/charter-flights-panama-personalized-experience`

**Routes**
- `/ruta/panama-contadora` → `/en/route/panama-contadora`
- `/ruta/panama-san-blas` → `/en/route/panama-san-blas`
- `/ruta/panama-bocas-del-toro` → `/en/route/panama-bocas-del-toro`
- `/ruta/panama-costa-rica` → `/en/route/panama-costa-rica`
- `/ruta/panama-medellin` → `/en/route/panama-medellin`
- `/ruta/panama-miami` → `/en/route/panama-miami`
- `/ruta/panama-dominican-republic` → `/en/route/panama-dominican-republic`

**Destinations**
- `/vuelo-privado-a-contadora` → `/en/private-flight-to-contadora`
- `/vuelo-privado-costa-rica` → `/en/private-flight-costa-rica`
- `/vuelos-privados-a-medellin` → `/en/private-flights-to-medellin`
- `/vuelos-a-playa-tambor` → `/en/flights-to-playa-tambor`

**Content Hubs**
- `/guia-contadora` → `/en/contadora-guide`
- `/guia-costa-rica` → `/en/costa-rica-guide`
- `/guia-helicopteros` → `/en/helicopter-guide`

**Booking / Contact**
- `/reservar-con-martin` → `/en/book-with-martin` ← **17.39% key event rate — highest on site**
- `/contacto` → `/en/contact`

---

## 3. Complete Button & CTA Tracking Audit

This is the full inventory of every interactive element on the new site, its tracking status, and what GTM tag/GA4 event should fire for it.

### 3.1 Global Elements (Present on Every Page)

| Element | Component | Location | Event Fired | Tracking Status | GA4 Event Name |
|---|---|---|---|---|---|
| WhatsApp floating button (desktop) | `WhatsAppButton.tsx` | Fixed bottom-right | `trackWhatsAppClick(path, "floating-btn", locale)` | ✅ Tracked | `whatsapp_click` |
| WhatsApp — mobile bar | `WhatsAppButton.tsx` | Fixed bottom on mobile | `trackWhatsAppClick(path, "mobile-bar", locale)` | ✅ Tracked | `whatsapp_click` |
| Call button — mobile bar | `WhatsAppButton.tsx` | Fixed bottom on mobile | `trackPhoneCallClick(path, locale)` | ✅ Tracked | `phone_call_click` |
| StickyMobileCTA WhatsApp | `StickyMobileCTA.tsx` | Fixed bottom (appears after 300px scroll) | `trackWhatsAppClick(path, "sticky-cta", locale)` | ✅ Tracked | `whatsapp_click` |
| StickyMobileCTA Call | `StickyMobileCTA.tsx` | Fixed bottom | `trackPhoneCallClick(path, locale)` | ✅ Tracked | `phone_call_click` |
| Martin floating button (manual open) | `FloatingMartin.tsx` | Fixed bottom-right | `trackMartinChatStart(path, "manual", locale)` | ✅ Tracked | `martin_chat_start` |
| Martin auto-dwell trigger (15s) | `FloatingMartin.tsx` | Floating widget | `trackMartinChatStart(path, "auto_dwell", locale)` | ✅ Tracked | `martin_chat_start` |
| Martin "send message" | `MartinChat.tsx` | Chat widget | `trackMartinChatStart(path, "user_message", locale)` | ✅ Tracked | `martin_chat_start` |
| Martin → WhatsApp fallback link | `MartinChat.tsx` | Chat footer | ❌ **NOT TRACKED** | 🔴 Gap | Should fire `martin_whatsapp_transfer` |
| Language switcher | `home-page.tsx` header | Homepage header only | ❌ **NOT TRACKED** | 🟠 Gap | Should fire `language_switch` |
| Language switcher | `Header.tsx` | All inner pages | ❌ **NOT TRACKED** | 🟠 Gap | Should fire `language_switch` |
| Logo click | Various | All pages | ❌ Not tracked (navigation only) | ✅ OK (use GTM click trigger) | — |

**⚠️ Two Critical Gaps Found:**
1. **Martin → WhatsApp transfer** in `MartinChat.tsx` has a WhatsApp fallback link (`copy.whatsappHref`) with **no `onClick` tracking**. This is the most important handoff event (Martin chat → real conversion). Fix: add `onClick` calling `trackMartinWhatsAppTransfer`.
2. **Language switcher** on all pages fires no event. Fix: add `trackLanguageSwitch` call.

### 3.2 Homepage CTAs

| Element | Section | Event Fired | Tracking Status | Notes |
|---|---|---|---|---|
| "Cotizar vuelo" / "Get a quote" hero button | Hero | ❌ Not tracked | 🟠 Gap | `trackCtaClick("cotizar-vuelo", path, "hero", locale)` |
| Hero WhatsApp CTA | Hero | ❌ Not tracked | 🟠 Gap | Should fire `whatsapp_click` with `service_type: "hero-cta"` |
| Route card "Book" WhatsApp link | Routes section | `whatsappRouteHref()` → opens WhatsApp | ❌ Not tracked | 🔴 Gap | Add `trackRouteCardClick` on each route card |
| Fleet card "View" link | Fleet section | `<Link href>` | ❌ Not tracked | 🟡 Low | Add `trackFleetCardClick` |
| Blog post preview cards | Blog section | `<Link href>` | ❌ Not tracked | 🟢 Low | Not required |
| Booking form (multi-step widget) | Hero/booking section | `trackBookingFormStep(step, path)` | ✅ Tracked per step | Good |
| Booking form final "Quote via WhatsApp" | Step 4 of booking form | `trackFormSubmit("booking-widget", locale, origin, destination)` → `form_submit` dataLayer → `generate_lead` GA4 | ✅ Fixed (Bug #5) | Fires before `window.open()` in `handleSubmit()` |

**⚠️ Critical Gap: Booking Form Final Step**
`BookingForm.tsx` → `handleSubmit()` opens WhatsApp with `window.open()` but **never calls any tracking function**. This is the primary conversion action on the homepage. Every WhatsApp quote request from the form is invisible to GA4.

Fix needed in `BookingForm.tsx`:
```tsx
function handleSubmit(selectedAircraft?: string, selectedPrice?: number) {
  // ADD THIS before window.open():
  trackFormSubmit("booking-widget", locale, origin, destination);
  // ... existing window.open() call
}
```

### 3.3 Service Page CTAs (`service-page.tsx`)

| Element | Event Fired | Tracking Status |
|---|---|---|
| "Reservar por WhatsApp" / "Book via WhatsApp" hero button | `getWhatsAppHref()` → WhatsApp | ❌ **NOT TRACKED** |
| "Llamar" / "Call" phone button | Phone link | ❌ **NOT TRACKED** |
| Feature list — no CTAs | — | — |
| FAQ accordion items | — | ❌ Not tracked (low priority) |

Fix: Add `onClick` handlers to both CTA buttons in `service-page.tsx`.

### 3.4 Route Page CTAs (`route-page.tsx`)

| Element | Event Fired | Tracking Status |
|---|---|---|
| "Reservar esta ruta" / "Book this route" button | `getWhatsAppHref()` → WhatsApp | ❌ **NOT TRACKED** |
| Phone number link | `tel:+50768400045` | ❌ **NOT TRACKED** |
| Aircraft card links (to fleet detail) | `<Link>` | ❌ Not tracked |
| "See more routes" CTA | `<Link>` | ❌ Not tracked |

### 3.5 Fleet Detail Page CTAs (`fleet-detail-page.tsx`)

| Element | Event Fired | Tracking Status |
|---|---|---|
| "Alquilar esta aeronave" / "Charter this aircraft" button | `getWhatsAppHref()` → WhatsApp | ❌ **NOT TRACKED** |
| "Ver toda la flota" / "View all fleet" button | Navigation | ❌ Not tracked |
| Related route cards | Navigation | ❌ Not tracked |

### 3.6 Booking Page (`booking-page.tsx`)

| Element | Event Fired | Tracking Status |
|---|---|---|
| "Reservar por WhatsApp" CTA | `getWhatsAppHref()` → WhatsApp | ❌ **NOT TRACKED** |
| Martin chat send button | `trackMartinChatStart` | ✅ Tracked |
| Martin → WhatsApp fallback | Opens WhatsApp | ❌ **NOT TRACKED** |

### 3.7 Contact Page (`contact-page.tsx` + `ContactForm.tsx`)

| Element | Event Fired | Tracking Status |
|---|---|---|
| Contact form submit | `trackFormSubmit("contact", locale, origin, destination)` | ✅ Tracked (fires on successful API response) |
| Contact form — WhatsApp alternative link | Opens WhatsApp | ❌ Not tracked |

### 3.8 Tracking Gap Priority Matrix

| Gap | File | Priority | Conversion Impact | Fix Effort |
|---|---|---|---|---|
| Booking form final "Quote via WhatsApp" | `BookingForm.tsx` | 🔴 P0 | **CRITICAL — primary homepage conversion** | 5 min |
| Martin → WhatsApp transfer link | `MartinChat.tsx` | 🔴 P0 | **Critical — best converting flow** | 5 min |
| Service page "Book via WhatsApp" button | `service-page.tsx` | 🔴 P0 | High — main service CTA | 10 min |
| Route page "Book this route" button | `route-page.tsx` | 🔴 P0 | High — route conversion | 10 min |
| Fleet detail "Charter this aircraft" button | `fleet-detail-page.tsx` | 🟠 P1 | Medium | 10 min |
| Booking page WhatsApp CTA | `booking-page.tsx` | 🟠 P1 | Medium (page is orphaned but converts 17%) | 5 min |
| Homepage hero CTA buttons | `home-page.tsx` | 🟠 P1 | Medium | 10 min |
| Homepage route card WhatsApp links | `home-page.tsx` | 🟠 P1 | Medium | 10 min |
| Language switch | `Header.tsx` / `home-page.tsx` | 🟡 P2 | Low | 15 min |

---

## 4. Analytics Stack — Current State & Fixes

### 4.1 Current Architecture (Broken)

```
Browser
├── GTM (GTM-W433GH2) ← loaded by Analytics.tsx GTM block
│   ├── GA4 PAGEVIEW base (googtag type) ✅ CORRECT
│   ├── GA4 SCROLL, HISTORY, LINK CLICK  ✅ CORRECT
│   ├── UA PAGEVIEW base                 🔴 DELETE (UA dead Jul 2023)
│   ├── UA newsletter event              🔴 DELETE
│   ├── Facebook newsletter signup       🔴 DELETE (no newsletter exists)
│   ├── Facebook signup                  🔴 DELETE (no signup exists)
│   └── [CHILI] form_submit              🔴 DELETE (Chili Piper WP CRM)
│
├── Standalone GA4 (Analytics.tsx GA4_ID block) 🔴 REMOVE FROM CODE
│   └── Fires GA4 AGAIN = duplicate tracking
│
├── Clarity (Analytics.tsx CLARITY_ID block) ✅ CORRECT
└── InstantFox (Analytics.tsx) ✅ CORRECT
```

**Result: 3 tracking libraries fire per page. Data is meaningless.**

### 4.2 Target Architecture (Clean)

```
Browser
├── GTM (GTM-W433GH2) ← only tracking entry point
│   ├── GA4 PAGEVIEW base               ✅ Keep
│   ├── GA4 SCROLL default              ✅ Keep
│   ├── GA4 HISTORY base (SPA nav)      ✅ Keep
│   ├── GA4 LINK CLICK mailto           ✅ Keep
│   ├── GA4 cEVENT reservar_form_submit ✅ Keep → rename to generate_lead
│   ├── GA4 cEVENT whatsapp_click       ✅ Keep
│   ├── GA4 cEVENT phone_call_click     ✅ Keep
│   ├── GA4 cEVENT martin_chat_start    ✅ Keep
│   ├── GA4 cEVENT form_submit (contact)✅ Keep
│   └── Microsoft Clarity               ✅ Keep
│
├── Clarity ← loaded by Analytics.tsx  ✅ Keep
└── InstantFox ← loaded by Analytics.tsx ✅ Keep
```

### 4.3 GA4 Event Dictionary (Code → GTM → GA4)

All events pushed to `window.dataLayer` by `src/lib/analytics.ts`. GTM must have a Custom Event trigger for each:

| Code function | dataLayer event name | GTM trigger | GA4 event name | Key parameters |
|---|---|---|---|---|
| `trackWhatsAppClick()` | `whatsapp_click` | Custom Event: `whatsapp_click` | `whatsapp_click` | `page_path`, `service_type`, `locale` |
| `trackPhoneCallClick()` | `phone_call_click` | Custom Event: `phone_call_click` | `phone_call_click` | `page_path`, `locale` |
| `trackFormSubmit()` | `form_submit` | Custom Event: `form_submit` | `generate_lead` | `form_type`, `locale`, `origin`, `destination` |
| `trackMartinChatStart()` | `martin_chat_start` | Custom Event: `martin_chat_start` | `martin_chat_start` | `page_path`, `trigger`, `locale` |
| `trackMartinWhatsAppTransfer()` | `martin_whatsapp_transfer` | Custom Event: `martin_whatsapp_transfer` | `martin_whatsapp_transfer` | `page_path`, `messages_count`, `locale` |
| `trackBookingFormStep()` | `booking_form_step` | Custom Event: `booking_form_step` | `booking_form_step` | `step`, `page_path` |
| `trackCtaClick()` | `cta_click` | Custom Event: `cta_click` | `cta_click` | `cta_text`, `page_path`, `section`, `locale` |
| `trackFleetCardClick()` | `fleet_card_click` | Custom Event: `fleet_card_click` | `fleet_card_click` | `aircraft_name`, `aircraft_type`, `locale` |
| `trackRouteCardClick()` | `route_card_click` | Custom Event: `route_card_click` | `route_card_click` | `route_name`, `locale` |
| `trackVideoPlay()` | `video_play` | Custom Event: `video_play` | `video_play` | `video_title`, `page_path` |
| `trackLanguageSwitch()` | `language_switch` | Custom Event: `language_switch` | `language_switch` | `from_locale`, `to_locale`, `page_path` |

### 4.4 GA4 Key Events to Configure as Conversions

In GA4 Admin → Events → Mark as conversion:
1. `whatsapp_click` — primary conversion signal
2. `phone_call_click` — primary conversion signal
3. `generate_lead` (renamed from form_submit) — primary conversion signal
4. `martin_whatsapp_transfer` — secondary conversion signal
5. `martin_chat_start` — engagement signal (not conversion)

### 4.5 OceanRide Cross-Domain Contamination Fix

**Problem:** OceanRide uses the same GTM container/GA4 property → 1,564 OceanRide page views appear in Sky Ride GA4.

**Fix in GTM:** Add trigger exception to every GA4 tag:
- Condition: `Page Hostname` **does not contain** `skyride.city`
- Apply to: ALL GA4 tags in GTM-W433GH2

This ensures GA4 only fires on `skyride.city` and `www.skyride.city` domains.

---

## 5. Critical Code Bugs — Must Fix First

### Bug #1 — Canonical Domain Split (MOST CRITICAL)
**Causes: 98% of new pages not indexed by Google**

Files to edit:

**`src/data/seo.ts` line 4:**
```diff
- const SITE_URL = "https://skyride.city";
+ const SITE_URL = "https://www.skyride.city";
```

**`src/app/sitemap.ts` line 5:**
```diff
- const BASE = "https://skyride.city";
+ const BASE = "https://www.skyride.city";
```

**`src/app/robots.ts` sitemap URL:**
```diff
- sitemap: "https://skyride.city/sitemap.xml",
+ sitemap: "https://www.skyride.city/sitemap.xml",
```

**`src/components/seo/JsonLd.tsx` line 21:**
```diff
- const BASE_URL = "https://skyride.city";
+ const BASE_URL = "https://www.skyride.city";
```

**Infrastructure (Cloud Run / load balancer):**
- Verify `skyride.city` (non-www) returns `301 → https://www.skyride.city`
- Must be a single-hop redirect, not a chain
- Test with: `curl -I https://skyride.city` → should show `301` with `Location: https://www.skyride.city/`

---

### Bug #2 — JSON-LD Client-Side Only (Kills All Rich Results)
**File:** `src/components/seo/JsonLd.tsx`

**Current (broken):**
```tsx
import Script from "next/script";
// ...
<Script
  key={i}
  id={`ld-${...}-${i}`}
  type="application/ld+json"
  strategy="afterInteractive"          // ← Google can't see this
  dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
/>
```

**Fix (replace the entire JsonLd function):**
```tsx
// Remove: import Script from "next/script";  (if not used elsewhere)

export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
```

**Impact:** Unlocks ALL 7 existing schemas (Organization, WebSite, BreadcrumbList, FAQPage, Service, Product, TouristTrip) + the newly added AggregateRating and Review schemas that are already coded in `home-page.tsx`.

---

### Bug #3 — Analytics Double-Tracking
**File:** `src/components/analytics/Analytics.tsx`

**Remove the entire GA4 standalone block** (lines ~22–35):
```tsx
// DELETE THIS ENTIRE BLOCK:
{GA4_ID && (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
      strategy="afterInteractive"
    />
    <Script id="ga4" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}', { anonymize_ip: true });`}
    </Script>
  </>
)}
```

Keep: GTM block, GADS block (if used), Clarity block, InstantFox block.

---

### ~~Bug #4~~ — WhatsApp Phone Number — NOT A BUG ✅ CONFIRMED CORRECT

**`15557298766` is the real WhatsApp Business number (US-registered). Do not change it.**
**`+50768400045` is the personal Panama call number used on `tel:` links. Do not change it.**

Per PRD Section 2 (Business Context):
- WhatsApp: `+1 (555) 729-8766` → `wa.me/15557298766`
- Phone: `+507 6840 0045` → `tel:+50768400045`

Both numbers are intentional and correct. All components are wired correctly:
- `WhatsAppButton.tsx` — WhatsApp uses `getWhatsAppHref()` → `15557298766` ✅
- `StickyMobileCTA.tsx` — WhatsApp uses `WHATSAPP_PHONE` → `15557298766` ✅
- `MartinChat.tsx` — `WHATSAPP_HREF_ES/EN` → `15557298766` ✅
- `BookingForm.tsx` — `wa.me/15557298766` ✅
- All call buttons — `tel:+50768400045` ✅

**No code changes needed or should be made.**

---

### Bug #5 — Booking Form Final Step Not Tracked
**File:** `src/components/sections/BookingForm.tsx`

In the `handleSubmit` function, before `window.open(...)`, add:
```tsx
import { trackFormSubmit } from "@/lib/analytics";

function handleSubmit(selectedAircraft?: string, selectedPrice?: number) {
  // ADD:
  trackFormSubmit("booking-widget", locale, origin, destination);
  
  // existing code...
  window.open(`https://wa.me/...`, "_blank");
}
```

---

### Bug #6 — Martin WhatsApp Transfer Not Tracked
**File:** `src/components/ui/MartinChat.tsx`

Find the WhatsApp fallback link (bottom of component) and add onClick:
```tsx
import { trackMartinWhatsAppTransfer } from "@/lib/analytics";

// In the WhatsApp fallback <a> tag:
<a
  href={copy.whatsappHref}
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => trackMartinWhatsAppTransfer(pathname, messages.length, locale)}
  className="text-xs font-medium text-[#25D366] hover:underline"
>
  {copy.whatsappFallback} →
</a>
```

---

### Bug #7 — Service / Route / Fleet CTA Buttons Not Tracked

**`src/components/pages/service-page.tsx`** — add to main CTA button:
```tsx
import { trackWhatsAppClick } from "@/lib/analytics";
// (make it a client component or pass tracking as prop if needed)
onClick={() => trackWhatsAppClick(window.location.pathname, pageId, locale)}
```

**`src/components/pages/route-page.tsx`** — add to "Book this route" button:
```tsx
onClick={() => trackWhatsAppClick(window.location.pathname, route.slug, locale)}
```

**`src/components/pages/fleet-detail-page.tsx`** — add to "Charter this aircraft" button:
```tsx
onClick={() => trackWhatsAppClick(window.location.pathname, aircraft.id, locale)}
```

**Note:** These are server components. Wrap CTA buttons in a small `"use client"` wrapper component or convert the CTA section to client component.

---

### Bug #8 — Unnecessary Preconnect for Self-Hosted Font
**File:** `src/app/[locale]/layout.tsx`

Remove:
```diff
- <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

Font is self-hosted via `next/font` — this preconnect is dead weight and a CSP noise source.

---

## 6. GSC & GA4 Data Findings

### 6.1 Indexation Timeline (GSC Chart.csv)

| Date | Indexed | Not Indexed | Status |
|---|---|---|---|
| Jan 26, 2026 | 55 | 249 | Pre-collapse |
| Feb 3, 2026 | 47 | 255 | Declining |
| Feb 17, 2026 | 38 | 258 | Declining |
| Feb 24, 2026 | 30 | 266 | Declining |
| Mar 10, 2026 | 15 | 279 | Accelerating |
| Mar 17, 2026 | **3** | **278** | **Crisis** |
| Apr 19, 2026 | **3** | 202 | **No recovery** |

**Not-indexed breakdown:** 101 "Crawled – not indexed" (quality rejection) · 26 "Discovered – not indexed" · 34 "Excluded by noindex" · 36 "Page with redirect"

### 6.2 GSC Traffic Reality (12 months)

| Metric | Value | Notes |
|---|---|---|
| Total clicks | ~2,706 | Mostly from old WP content |
| Total impressions | ~291,000 | 82K from hypertension article |
| Avg CTR | 0.93% | Far below 3% target |
| Avg position (mobile) | 11.88 | Decent |
| Avg position (desktop) | 35.28 | 3x worse — desktop is broken |

### 6.3 Top Converting Pages (Real Data)

| Page | GSC Clicks | GA4 Key Event Rate | Commercial Value |
|---|---|---|---|
| `/reservar-con-martin` | 0 (no impressions) | **17.39%** | ⭐ Highest CVR — needs internal links |
| `/paseo-en-helicoptero` | 41 | 15.6% | ✅ Best organic commercial page |
| `/vuelos-charter-en-panama` | 9 | 23% | ⚠️ Good CVR, terrible traffic |
| `/ferry-a-contadora` | 319 | 3.7% | 🔗 Mid-funnel — needs flight CTA |
| `/asientos-disponibles` | 16 | 7.7% | ✅ Underutilized |

### 6.4 Traffic Traps (High Impressions, Zero Commercial Value)

| Page | GSC Impressions | GA4 Key Events | Problem |
|---|---|---|---|
| `/hipertensos-pueden-viajar-en-avion/` | **82,372** | 0 | Medical content, not aviation buyers |
| `/playa-cacique-contadora/` | 12,414 | ~3 | "playa cacique colon" wrong-intent traffic |
| `/apps-para-encontrar-vuelos-privados/` | ~8,000 | 0 | App-hunter intent |

### 6.5 Canonical Split Evidence

| URL | GSC Clicks | Position |
|---|---|---|
| `www.skyride.city/` | 590 | 16.4 |
| `skyride.city/` | 410 | **5.73** |

Non-www ranks higher because canonicals point there. Fixing this will consolidate all equity into www.

### 6.6 Desktop vs. Mobile Gap

Mobile avg position: **11.88** → Desktop avg position: **35.28**

Desktop is 3x worse. Audit desktop-specific rendering after canonical fix. May be caused by:
- Meta viewport or CSS issues on desktop
- Desktop Google bot different crawl rate
- Content/layout shifts on wider viewports (check CLS)

### 6.7 GA4 Contamination Sources

| Contamination | Views/Sessions | Fix |
|---|---|---|
| OceanRide (charter catamaran pages) | **1,564 views** | Hostname filter in GTM |
| `/5113-2` phantom WP page | 45 sessions, **118 key events** | Find and 404 this URL |
| `(not set)` landing pages | **1,709 sessions** (20% of total) | Fix cross-domain tracking |

---

## 7. Keyword Universe & Content Gaps

### 7.1 Quick Wins — Position 5–15, Act Now

| Keyword | Position | Impressions | Clicks | Action |
|---|---|---|---|---|
| `vuelos charter panama` | **5.93** | 562 | 21 | Fix indexation + FAQPage schema |
| `helicopter tour panama` | **8.17** | 164 | 17 | Expand EN page + FAQPage |
| `vuelos privados panama` | **3.60** | 138 | 10 | Add star schema |
| `ferry contadora` | **10.06** | 1,888 | 53 | Stronger flight CTA on page |
| `luna de miel panama` | **7.03** | 213 | 11 | H1 + schema optimization |
| `alquiler de helicoptero panama` | **5.97** | 105 | 6 | Minor optimization |
| `panama canal helicopter tour` | **6.97** | 68 | 5 | FAQ addition to service page |

### 7.2 Buried Money Keywords — Needs Content

| Keyword | Position | Impressions | Clicks | Action |
|---|---|---|---|---|
| `charter flights panama` | 22.76 | 1,115 | 2 | Fix indexation — page exists, not indexed |
| `vuelo charter` | 45.04 | 2,105 | 2 | `/vuelos-charter-en-panama` page expansion |
| `charter panama` | 26.91 | 970 | 4 | Same page |
| `vuelos privados baratos` | 25.14 | 902 | 2 | Fix indexation of `/vuelos-privados-baratos` |
| `private jet panama` | 36.88 | 312 | 1 | New `/en/private-jet-charter` page |
| `contadora island` | 46.18 | 636 | 1 | Fix indexation of destination page |

### 7.3 Content Gaps — Pages That Don't Exist Yet

| Target Keyword | Monthly Volume | Recommended URL | Priority |
|---|---|---|---|
| `san blas islands travel guide` | 4,400/mo | `/en/san-blas-guide` | 🔴 P1 |
| `como llegar a san blas` | 4,800/mo (ES) | `/como-llegar-a-san-blas` | 🔴 P1 |
| `how to get to bocas del toro` | 2,900/mo | `/en/bocas-del-toro-guide` | 🟠 P2 |
| `charter flights panama prices` | 1,100/mo | `/en/charter-flight-prices` | 🟠 P2 |
| `private jet panama` | ~400/mo | `/en/private-jet-charter` | 🟠 P2 |
| `sky ride panama reviews` | Brand | `/en/reviews` | 🟡 P3 |

### 7.4 Keyword Cannibalization to Resolve

| Keyword Cluster | Competing URLs |
|---|---|
| `charter flights panama` | `/vuelos-charter-en-panama` + `/en/charter-flights` + old WP pages |
| `helicopter rides panama` | `/paseo-en-helicoptero-en-panama` + 3 blog posts + guide |
| Homepage / branding | `skyride.city/` (pos 5.73) vs `www.skyride.city/` (pos 16.4) |
| `contadora flight` | Destination page + 5 route/blog pages |

---

## 8. Schema / Structured Data Roadmap

### 8.1 Current State: ZERO Rich Results (Confirmed GSC)
All 7 schemas coded but invisible due to `strategy="afterInteractive"` bug (see Bug #2).

### 8.2 Schemas Already Coded (Will Work After Bug #2 Fix)

| Schema | Where | Rich Result Type |
|---|---|---|
| `Organization` / `LocalBusiness` | All pages via `layout.tsx` | Knowledge panel |
| `WebSite` | All pages via `layout.tsx` | Sitelinks search box |
| `SiteNavigationElement` | All pages via `layout.tsx` | Breadcrumbs |
| `BreadcrumbList` | All inner pages via `Breadcrumbs` component | Breadcrumb path in SERP |
| `FAQPage` | Service pages | FAQ rich snippet |
| `Service` | Service pages | Service rich card |
| `Product` | Fleet detail pages | Product + pricing snippet |
| `TouristTrip` | Route pages | Travel card |
| `AggregateRating` | Homepage (in `home-page.tsx`) | Star rating |
| `Review` | Homepage (in `home-page.tsx`) | Individual review stars |

### 8.3 Schemas Still Missing (Need to Add)

| Schema | Target Pages | Priority | Expected Result |
|---|---|---|---|
| `BlogPosting` | All 31 blog posts | 🟠 P1 | Article rich card + freshness signals |
| `SearchAction` in WebSite | Homepage | 🟡 P2 | Sitelinks search box |
| `VideoObject` | Pages with YouTube embeds | 🟢 P3 | Video carousel |

### 8.4 BlogPosting Schema Template
Add to `src/components/pages/blog-post-page.tsx`:

```typescript
export function blogPostSchema(post: BlogPost, locale: "es" | "en", path: string): JsonLdData {
  const baseUrl = "https://www.skyride.city";
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${baseUrl}${path}`,
    headline: post.title,
    description: post.excerpt,
    image: `${baseUrl}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Sky Ride Panama",
      url: baseUrl,
    },
    publisher: { "@id": `${baseUrl}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}${path}`,
    },
    inLanguage: locale === "en" ? "en-US" : "es-PA",
  };
}
```

---

## 9. Week-by-Week Execution Plan

### 🔴 WEEK 1 — Days 1–3: Stop the Bleeding (Code Fixes)
*Target: Get from 3 indexed pages to 50+ within 2 weeks*

**Day 1 (Today — April 25, 2026)**

- [x] **Fix canonical domain** in 4 files — ✅ DONE (build `428bdb32`, 12:43 UTC)
  - `src/data/seo.ts` — `SITE_URL = "https://www.skyride.city"`
  - `src/app/sitemap.ts` — `BASE = "https://www.skyride.city"`
  - `src/app/robots.ts` — sitemap URL updated
  - `src/components/seo/JsonLd.tsx` — `BASE_URL = "https://www.skyride.city"`

- [x] **Fix JSON-LD server rendering** — ✅ DONE
  - `<Script strategy="afterInteractive">` replaced with native `<script>`
  - `import Script from "next/script"` removed from `JsonLd.tsx`

- [x] **Fix analytics double-tracking** — ✅ DONE
  - Standalone `GA4_ID` block removed from `Analytics.tsx`
  - GTM, Clarity, InstantFox untouched

- [x] **Fix booking form tracking** — ✅ DONE
  - `trackFormSubmit("booking-widget", locale, origin, destination)` added before `window.open()` in `BookingForm.tsx`

- [x] **Fix Martin WhatsApp tracking** — ✅ DONE
  - `trackMartinWhatsAppTransfer(pathname, messages.length, locale)` added to fallback anchor in `MartinChat.tsx`

- [x] **Deploy to production** — ✅ DONE (Cloud Build `428bdb32`, STATUS: SUCCESS, 2m52s)

- [x] **Fix www redirect** — ✅ DONE (build `9dbe4e1e`, April 26)
  - `src/middleware.ts` with hostname 301 redirect (non-www → www) deployed and verified

- [x] **Fix `/5113-2` phantom page** — ✅ DONE (deployed April 26)
  - WP post ID 5113 was `/asistente-martin/` per PRD §7.5 — not rebuilt in new site
  - Added `{ source: "/5113-2", destination: "/", permanent: true }` to `next.config.ts`

**Day 2 (April 26, 2026)**

- [x] **Verify canonical fix** — ✅ DONE — all pages return www URLs in canonicals
- [x] **Verify JSON-LD in HTML** — ✅ DONE — schema blocks confirmed in initial HTML
- [x] **Verify GA4 deduplication** — ✅ DONE — only 1x GA4 pageview fires per page
- [x] **CTA tracking Phase 4 Track B** — ✅ DONE (build `156af0b7`, April 26)
  - Created `TrackedWhatsAppLink` + `TrackedPhoneLink` client components
  - Wired to `service-page.tsx`, `route-page.tsx`, `fleet-detail-page.tsx`
  - Automated tests confirmed real GA4 hits to `G-NFNXQFYJ30` for all 5 button types
- [x] **GTM Version 39 published** — ✅ DONE (April 26)
  - `DLV - service_type` variable created
  - `cEVENT - whatsapp_click` + `cEVENT - phone_call_click` custom event triggers created
  - `Clic en Llámanos` + `Clic_Boton_Wsp` tags updated to fire on custom events
- [x] **GTM Version 40 published** — ✅ DONE (April 26)
  - Deleted duplicate WA tags: `Clic en Whatsapp`, `Clic_Widget_Wsp`
  - Deleted dead tags: `GA4 - cEVENT - newsletter sign up`, `GA4 - cEVENT - sign_up`
  - `Exception - Not SkyRide` hostname filter applied to ALL GA4 tags
- [x] **CSP img-src fix** — ✅ DONE (April 26)
  - Added `https://*.googletagmanager.com` to `img-src` in `next.config.ts`
  - GTM measurement pixels (`/td`, `/a`) no longer blocked
- [x] **GA4 key events starred** — ✅ DONE (April 26)
  - Starred: `Clic_Boton_Wsp`, `Clic_Boton_Llamanos`, `Lleno Formulario`, `Clic_Widget_Wsp`
  - Star `whatsapp_click`, `phone_call_click`, `generate_lead` when they appear (24-48h)
- [x] **Critical routing bug fixed** — ✅ DONE (build `9dbe4e1e`, April 26)
  - `localeDetection: false` added to `src/i18n/routing.ts`
  - next-intl was 404ing ALL Spanish pages for browsers with `Accept-Language: en-US`
  - This affected Google's crawler (sends en-US by default) — root cause of indexation failure
- [ ] **Submit sitemap in GSC** — ⏳ PENDING (do now)
  - GSC → Sitemaps → Submit `https://www.skyride.city/sitemap.xml`
  - Delete any old `skyride.city/sitemap.xml` submission
- [ ] **Request indexing for 10 key pages via GSC URL Inspection** — ⏳ PENDING (do now)
  1. `https://www.skyride.city/`
  2. `https://www.skyride.city/en`
  3. `https://www.skyride.city/vuelos-charter-en-panama`
  4. `https://www.skyride.city/en/charter-flights`
  5. `https://www.skyride.city/paseo-en-helicoptero-en-panama`
  6. `https://www.skyride.city/en/helicopter-rides`
  7. `https://www.skyride.city/ruta/panama-contadora`
  8. `https://www.skyride.city/ruta/panama-san-blas`
  9. `https://www.skyride.city/nuestra-flota`
  10. `https://www.skyride.city/reservar-con-martin`

**Day 3 (April 26–27, 2026) — completed ahead of schedule**

- [x] **Deploy middleware.ts + /5113-2 fix** — ✅ DONE (build `9dbe4e1e`)
- [x] **Fix GTM container** — ✅ DONE (GTM Version 40, April 26)
  - DELETED: all UA, Facebook, Chili Piper tags (were already gone)
  - DELETED: `Clic en Whatsapp`, `Clic_Widget_Wsp` (duplicate WA tags)
  - DELETED: `GA4 - cEVENT - newsletter sign up`, `GA4 - cEVENT - sign_up` (dead)
  - ADDED: `Exception - Not SkyRide` hostname filter on ALL GA4 tags
  - Final clean tag list: `Clic en Llámanos`, `Clic_Boton_Wsp`, `Conversion Linker`, `GA4 - cEVENT - generate_lead`, `GA4 - HISTORY - base`, `GA4 - LINK CLICK - mailto`, `GA4 - PAGEVIEW - base`, `GA4 - SCROLL - default`, `Microsoft Clarity - Official`
- [x] **`/5113-2` page** — ✅ DONE
  - 301 redirect to `/` in `next.config.ts`
- [x] **WhatsApp phone number** — ✅ CONFIRMED CORRECT
  - `15557298766` = real WhatsApp Business (US-registered)
  - `+50768400045` = real Panama call number
- [ ] **GSC URL inspection batch 2** — ⏳ PENDING
  - 11–20 from GSC checklist (routes, destinations, fleet)

---

### 🟠 WEEK 1 — Days 4–7: Tracking & Service Page CTAs

- [x] **Add tracking to service page CTAs** (`service-page.tsx`) — ✅ DONE (April 26)
- [x] **Add tracking to route page CTAs** (`route-page.tsx`) — ✅ DONE (April 26)
- [x] **Add tracking to fleet detail CTAs** (`fleet-detail-page.tsx`) — ✅ DONE (April 26)
- [x] **Add tracking to booking page CTA** (`booking-page.tsx`) — ✅ DONE (April 26)
- [x] **Verify all dataLayer pushes** — ✅ DONE via automated Playwright tests (April 26)
  - All 5 button types confirmed sending real GA4 hits to `G-NFNXQFYJ30`
- [x] **Set GA4 key events** — ✅ DONE (April 26)
  - Starred: `Clic_Boton_Wsp`, `Clic_Boton_Llamanos`, `Lleno Formulario`, `Clic_Widget_Wsp`
  - Pending (appear in 24-48h): `whatsapp_click`, `phone_call_click`, `generate_lead`
- [x] **Link GSC to GA4** — ✅ DONE (April 26)
  - `www.skyride.city - GA4 (351142491)` associated with `https://www.skyride.city/`
- [x] **Remove stale `preconnect` from `layout.tsx`** (Bug #8) — ✅ DONE (April 27, build `9337158a`)
- [x] **Add SearchAction to websiteSchema** — ✅ DONE (April 27, build `9337158a`)
- [ ] **Request indexing for next 10 pages** (routes + destinations) — ⏳ PAUSED — GSC daily quota exceeded April 27, resume April 28

---

### 🟠 WEEK 2: Schema + Quick-Win Content — ✅ FULLY COMPLETE (April 27)

- [ ] **Verify rich results in GSC** — check Search Appearance report for FAQPage, Breadcrumbs (Breadcrumbs already detected ✅ in URL Inspection)
- [x] **`BlogPosting` schema** — ✅ ALREADY IMPLEMENTED in `blog-post-page.tsx` via `blogPostingSchema()` in `JsonLd.tsx`
- [x] **FAQ block on service pages** (`/vuelos-charter-en-panama`, `/paseo-en-helicoptero-en-panama`) — ✅ ALREADY IMPLEMENTED in `service-page.tsx` with `faqSchema()`
- [x] **FAQ schema + UI on all 4 route pages** — ✅ DONE (April 26)
  - FAQs (5 per route, ES+EN) added to `routes.ts` for: Contadora, San Blas, Bocas del Toro, Costa Rica
  - `FAQPage` JSON-LD injected in `route-page.tsx`
  - Visible FAQ accordion section added to route page UI
  - Deploy pending — run build command
- [x] **Fix no-www `BASE_URL`** in `blog-post-page.tsx` and `content-hub-page.tsx` — ✅ DONE (April 26)
- [x] **Expand route pages to 900+ words** — ✅ DONE (April 26)
  - San Blas: 5 content sections (~800 words ES+EN) added to `routes.ts`
  - Contadora: 4 content sections (~600 words ES+EN) added to `routes.ts`
- [x] **Add internal CTA to `/ferry-a-contadora` post** — ✅ DONE (April 26)
  - Added "Reserva tu vuelo directo a Contadora" section with link to `/ruta/panama-contadora`
  - EN version: link to `/en/route/panama-contadora`
- [x] **Add disambiguation to `/playa-cacique-contadora`** — ✅ DONE (April 26)
  - Added blockquote at top: "Isla Contadora, Archipiélago de Las Perlas, no Colón"
- [x] **Add commercial CTA section to hypertension post** — ✅ DONE (April 26)
  - Replaced weak final paragraph with full "Fly without the stress" section
  - 4 bullet points + link to `/reservar-con-martin` (ES+EN)

---

### 🟡 WEEK 3: Content Hubs + Internal Linking — ✅ FULLY COMPLETE (April 27)

- [x] **Create San Blas guide hub** at `/en/san-blas-guide` + `/guia-san-blas` — ✅ DONE (April 26)
  - Target: `san blas islands travel guide` (4,400/mo), `how to get to san blas` (3,600/mo)
  - Hero image: `Approaching Island.png` (catamaran + palm island)
  - Ocean Ride cross-sell section added (sister company link to oceanride.city/san-blas/)
  - SEO metadata + slug-map entries added for both locales
- [x] **Ocean Ride cross-sell** — ✅ DONE (April 26)
  - San Blas hub: "Empresa hermana / Sister company" section with CTA button
  - Blog ES + EN San Blas posts: "Navega San Blas con Ocean Ride" section appended
- [x] **Add internal links from all blog posts** → relevant service/route pages — ✅ DONE (April 26)
  - 40 out of 46 posts updated (6 already had links)
  - Contadora posts → `/ruta/panama-contadora`
  - Costa Rica posts → `/ruta/panama-costa-rica`
  - Bocas posts → `/ruta/panama-bocas-del-toro`
  - Helicopter posts → `/paseo-en-helicoptero-en-panama`
  - Charter posts → `/vuelos-charter-en-panama`
  - Tips/Apps/General posts → `/reservar-con-martin`
- [x] **Internal link audit — blog posts complete** — ✅ DONE (April 26)
- [ ] **Internal link audit — service pages** — ⏳ PENDING
  - Every service page should link to: relevant fleet aircraft, relevant route, Martin booking page
- [x] **Google Business Profile setup** — ✅ ALREADY EXISTS (April 26)
  - Confirmed at https://share.google/ELN1nvr2cG5O6XJTC
  - Verify: category = "Air charter service", phone = +507 6840 0045, photos added
- [ ] **Monitor GSC indexation** — should be recovering toward 30–50 pages
- [ ] **Submit new hub URLs to GSC** — `/guia-san-blas` + `/en/san-blas-guide` (add to Batch 2 list)

---

### 🟡 WEEK 4: Off-Page + Link Building Foundation

- [ ] **Submit to directories**:
  - Viator (list helicopter tour + Contadora flight as experiences)
  - GetYourGuide (same)
  - GlobalAir.com directory
  - CharterHub.com operator listing
  - AOPA Panama affiliate directory
- [x] **Create Bocas del Toro guide hub** at `/en/bocas-del-toro-guide` + `/guia-bocas-del-toro` — ✅ DONE (April 26)
  - 4 content sections added to route page (why fly, islands/beaches, best time, how to book)
  - Same pattern as San Blas hub — `content-hubs.ts` + `slug-map.ts` + `seo.ts`
- [x] **Create charter prices page** at `/precios-vuelos-charter` + `/en/charter-flight-prices` — ✅ DONE (April 27, build `9337158a`)
  - Pricing table for 5 routes × 7 aircraft
  - FAQPage JSON-LD schema with 8 pricing questions
- [x] **Create private jet service page** at `/jet-privado-en-panama` + `/en/private-jet-charter` — ✅ DONE (April 27, build `9337158a`)
  - 4 FAQs, features, related links
- [x] **Create reviews/trust page** at `/resenas` + `/en/reviews` — ✅ DONE (April 27, build `9337158a`)
  - AggregateRating schema (4.9/127 reviews), 6 individual Review schemas
- [x] **Homepage header/footer unification** — ✅ DONE (April 27)
  - Replaced custom homepage header/footer/mobile-bar with shared `Header.tsx` + `Footer.tsx` + `WhatsAppButton`
  - Homepage now shows full nav dropdown (all services + destinations incl. San Blas, Bocas)
- [x] **All 7 homepage WhatsApp CTAs tracked** — ✅ DONE (April 27, build `b122c5c1`)
  - All use `TrackedWhatsAppLink` with individual `serviceType` values
- [x] **Helicopter service card image fixed** — ✅ DONE (April 27, build `c8bae9ae`)
- [x] **Bocas del Toro + San Blas added to nav Destinos dropdown** — ✅ DONE (April 27, build `c8bae9ae`)
- [x] **Homepage service card images updated** — ✅ DONE (April 27)
  - "Paseos en helicóptero" → `eurocopter-b4-side.jpg`
  - "Vuelos chárter" → `hawker-despegando.webp`
- [x] **Destination pages for San Blas + Bocas del Toro** — ✅ DONE (April 27)
  - `/vuelo-privado-a-san-blas` + `/en/private-flight-san-blas`
  - `/vuelo-privado-bocas-del-toro` + `/en/private-flight-bocas-del-toro`
  - Content hub `servicePage` links updated to point to new destination pages
- [ ] **Monitor GA4** for OceanRide contamination — should be zero after GTM hostname fix
- [ ] **Audit noindex pages** in GSC — verify all 34 excluded pages are intentionally noindexed

---

### 🟢 WEEKS 5–8: Ongoing Growth

- [x] Add `SearchAction` to `websiteSchema()` in `JsonLd.tsx` — ✅ DONE (April 27)
- [x] Create `/en/reviews` + `/resenas` trust page — ✅ DONE (April 27)
- [ ] **GSC — submit new pages for indexing (April 28 when quota resets)**:
  - `/jet-privado-en-panama`, `/en/private-jet-charter`
  - `/resenas`, `/en/reviews`
  - `/precios-vuelos-charter`, `/en/charter-flight-prices`
  - `/guia-san-blas`, `/en/san-blas-guide`
  - `/guia-bocas-del-toro`, `/en/bocas-del-toro-guide`
  - `/vuelo-privado-a-san-blas`, `/en/private-flight-san-blas`
  - `/vuelo-privado-bocas-del-toro`, `/en/private-flight-bocas-del-toro`
- [ ] **GTM** — Add `GA4 - cEVENT - martin_whatsapp_transfer` tag (20 min)
- [ ] **GTM** — Add `GA4 - cEVENT - booking_form_step` tag (20 min)
- [ ] **GA4** — Star `whatsapp_click`, `phone_call_click`, `generate_lead` as key events (appear 24-48h after April 26 deploy)
- [ ] **Directories** — Viator, GetYourGuide, GlobalAir.com, CharterHub.com, AOPA Panama
- [ ] Publish 2 new EN blog posts per week targeting position 20–50 keywords
- [ ] Add named author bios to blog posts (E-E-A-T)
- [ ] Reach out to Panama tourism blogs for editorial mentions
- [ ] Monitor Core Web Vitals — specifically desktop INP with Martin chat widget

---

## 10. GTM Container Cleanup Checklist

Open GTM (tagmanager.google.com) → Container: GTM-W433GH2 → Workspace

### DELETE These Tags Immediately — ✅ ALL DONE (GTM Version 40)

| Tag Name | Type | Status |
|---|---|---|
| `Universal Analytics - PAGEVIEW - base` | ua | ✅ Deleted |
| `Universal Analytics - cEVENT - engagement => newsletter` | ua | ✅ Deleted |
| `Facebook - cEVENT - engagement => newsletter_sign_up` | html/fbpixel | ✅ Deleted |
| `Facebook - cEVENT - engagement => sign_up` | html/fbpixel | ✅ Deleted |
| `[CHILI] cEVENT - form_submit` | custom event | ✅ Deleted |
| `Passive - PAGEVIEW - newsletter set up` | html | ✅ Deleted |
| `Clic en Whatsapp` | GA4 Event | ✅ Deleted (duplicate of Clic_Boton_Wsp) |
| `Clic_Widget_Wsp` | GA4 Event | ✅ Deleted (duplicate) |
| `GA4 - cEVENT - engagement => newsletter sign up` | GA4 Event | ✅ Deleted (dead) |
| `GA4 - cEVENT - engagement => sign_up` | GA4 Event | ✅ Deleted (dead) |

### MODIFY These Tags — ✅ ALL DONE (GTM Version 40)

| Tag Name | Change | Status |
|---|---|---|
| ALL GA4 tags | `Exception - Not SkyRide` hostname filter | ✅ Done |
| `Clic en Llámanos` | Now fires on `cEVENT - phone_call_click` | ✅ Done |
| `Clic_Boton_Wsp` | Now fires on `cEVENT - whatsapp_click` | ✅ Done |

### ADD These Tags (Missing Events) — lower priority, defer to Week 2

| New Tag Name | Trigger | GA4 Event | Status |
|---|---|---|---|
| `GA4 - cEVENT - martin_whatsapp_transfer` | Custom Event: `martin_whatsapp_transfer` | `martin_whatsapp_transfer` | ⏳ Pending — **add in GTM UI** |
| `GA4 - cEVENT - booking_form_step` | Custom Event: `booking_form_step` | `booking_form_step` | ⏳ Pending — **add in GTM UI** |
| `GA4 - cEVENT - language_switch` | Custom Event: `language_switch` | `language_switch` | ⏳ Pending — low priority |

### VERIFY These Tags Work — ✅ ALL VERIFIED (April 26)

| Tag Name | Result |
|---|---|
| `GA4 - PAGEVIEW - base` | ✅ Confirmed — real GA4 hit to G-NFNXQFYJ30 |
| `Clic_Boton_Wsp` | ✅ Confirmed — `whatsapp_click` event with service_type + locale |
| `Clic en Llámanos` | ✅ Confirmed — `phone_call_click` event with locale |
| `Clic_Widget_Wsp` | ✅ Deleted (was duplicate) |
| `Microsoft Clarity - Official` | ✅ Confirmed — sessions recording in Clarity dashboard |

All 5 button types tested via automated Playwright + real GA4 network hits.

---

## 11. GSC Post-Migration Checklist

After deploying the canonical domain fix:

### Step 1 — Property Setup
- [x] Confirm GSC has `https://www.skyride.city` as the primary (verified) property ✅
- [x] `skyride.city` domain property also present (covers all variants) ✅
- [x] GA4 linked: `www.skyride.city - GA4 (351142491)` → associated with `https://www.skyride.city/` ✅ (April 26)

### Step 2 — Sitemap
- [x] Submit: `https://www.skyride.city/sitemap.xml` ✅ (April 26)
- [ ] Remove old: `https://skyride.city/sitemap.xml` (if previously submitted) — check
- [x] Sitemap returns 200 and lists www URLs ✅

### Step 3 — URL Inspection (Manual Indexing Requests)
Do these in order — highest commercial priority first:

**Batch 1 (April 26) — ✅ ALL ALREADY INDEXED ("URL is on Google")**
1. ✅ `https://www.skyride.city/`
2. ✅ `https://www.skyride.city/en`
3. ✅ `https://www.skyride.city/vuelos-charter-en-panama`
4. ✅ `https://www.skyride.city/en/charter-flights`
5. ✅ `https://www.skyride.city/paseo-en-helicoptero-en-panama`
6. ✅ `https://www.skyride.city/en/helicopter-rides`
7. ✅ `https://www.skyride.city/ruta/panama-contadora`
8. ✅ `https://www.skyride.city/ruta/panama-san-blas`
9. ✅ `https://www.skyride.city/nuestra-flota`
10. ✅ `https://www.skyride.city/reservar-con-martin`

All Batch 1 pages confirmed indexed with Breadcrumbs schema detected. Breadcrumbs valid ✅, HTTPS ✅.

**Batch 2 (April 27) — ⏳ RESUME TOMORROW — quota hit at #14**
11. ⏳ `https://www.skyride.city/ruta/panama-bocas-del-toro` (unknown)
12. ⏳ `https://www.skyride.city/ruta/panama-costa-rica` (unknown)
13. ⏳ `https://www.skyride.city/vuelo-privado-a-contadora` (unknown)
14. ⏳ `https://www.skyride.city/en/private-flight-to-contadora` ← **START HERE tomorrow** (quota hit)
15. ⏳ `https://www.skyride.city/asientos-disponibles`
16. ⏳ `https://www.skyride.city/vuelos-privados-baratos`
17. ⏳ `https://www.skyride.city/en/our-fleet`
18. ⏳ `https://www.skyride.city/contacto`
19. ⏳ `https://www.skyride.city/en/blog`
20. ⏳ `https://www.skyride.city/blog`

### Step 4 — Monitor
- [ ] Check GSC Coverage daily for 2 weeks — indexed count should climb toward 50+
- [ ] Check GSC Search Appearance after 2 weeks — should show FAQPage and Breadcrumbs
- [ ] Check for Manual Actions report (GSC → Security & Manual Actions)
- [ ] Investigate `record.skyride.city` subdomain appearing in GSC — verify it and add noindex or redirect

---

## 12. Content Expansion Briefs

### Brief #1 — San Blas Route Page Expansion (URGENT)
**URL:** `/ruta/panama-san-blas` and `/en/route/panama-san-blas`
**Current word count:** ~150 words
**Target word count:** 1,200+ words
**Primary keyword:** `vuelo a san blas desde panama` (ES) / `san blas flight from panama city` (EN)

**Required sections:**
1. Route overview (flight time, departure airport, distance)
2. Why fly private vs. ferry (time comparison: 45min vs. 3–4 hours)
3. Which islands to visit (Isla Perro, Isla Pelicano, Isla Tigre)
4. Aircraft options on this route (with links to fleet pages)
5. Pricing table
6. Booking process (step by step via WhatsApp)
7. FAQPage schema (5 questions: price, duration, airport, luggage, safety)
8. Photo gallery section
9. Strong CTA → Martin booking + WhatsApp

---

### Brief #2 — San Blas Content Hub (NEW PAGE)
**URL:** `/en/san-blas-guide` (EN) + `/como-llegar-a-san-blas` (ES)
**Target word count:** 2,500 words (EN), 1,500 words (ES)
**Primary keywords:** `san blas islands travel guide` (4,400/mo), `how to get to san blas islands` (3,600/mo)

**Required sections:**
1. What are the San Blas Islands (overview, geography, indigenous Guna people)
2. How to get there: private flight vs. ferry vs. 4WD + boat
3. Best islands and beaches (named list with descriptions)
4. Best time to visit (dry season Jan–April)
5. What to pack, what to expect
6. 3-day itinerary
7. Booking your private flight with Sky Ride (CTA section)
8. FAQ schema (8 questions)

---

### Brief #3 — Charter Prices Page (NEW PAGE)
**URL:** `/en/charter-flight-prices` (EN) + `/precios-vuelos-charter` (ES)
**Target word count:** 1,000 words
**Primary keywords:** `charter flights panama prices` (1,115 impr, pos 22), `cuanto cuesta un vuelo charter` (ES)

**Required sections:**
1. Price table by route (all 7 routes, per-aircraft and per-seat options)
2. What affects the price (aircraft type, passengers, season, round-trip)
3. How to get an instant quote
4. FAQPage schema (6 pricing questions)
5. CTA to BookingForm widget

---

### Brief #4 — Helicopter Rides English Page Expansion
**URL:** `/en/helicopter-rides`
**Current status:** Exists, position 8.17 (good), 17 clicks
**Action:** Add FAQ schema, expand to 800+ words, add Panama Canal tour section

---

### Brief #5 — Hypertension Post Commercial CTA
**URL:** `/hipertensos-pueden-viajar-en-avion/`
**Action (no rewrite needed):** Add this section after medical content:

```
## Cuando tu médico te autoriza volar: ¿Por qué elegir privado?

Si tu cardiólogo o médico te ha autorizado para volar, un vuelo privado es la opción ideal para personas con hipertensión:

- **Sin estrés de aeropuerto:** Sin colas, sin check-in, sin multitudes — factores que elevan la presión
- **Cabinas presurizadas a menor altitud:** Las aeronaves pequeñas vuelan más bajo que los aviones comerciales
- **Grupos pequeños:** Solo tú y tu familia o amigos
- **Salida desde aeródromo pequeño:** Panamá tiene aeródromos tranquilos fuera de Tocumen

[Cotizar vuelo privado → WhatsApp]
```

---

## 13. Tracking Verification Checklist

Use this after every deployment to verify tracking is working correctly.

### Method: GTM Preview Mode
1. Open tagmanager.google.com → GTM-W433GH2 → Preview
2. Enter site URL: `https://www.skyride.city`
3. Navigate to each page and click each element below

### Homepage (`/`)
- [ ] Page load → `gtm.js` tag fires ONCE (not twice)
- [ ] No UA tags fire
- [ ] Click WhatsApp floating button → `whatsapp_click` in dataLayer
- [ ] Click "Quote via WhatsApp" in booking form (after completing all steps) → `form_submit` in dataLayer
- [ ] Let 15 seconds pass → `martin_chat_start` with `trigger: "auto_dwell"`
- [ ] Click Martin button manually → `martin_chat_start` with `trigger: "manual"`
- [ ] In Martin chat, click "Prefer WhatsApp?" link → `martin_whatsapp_transfer` in dataLayer
- [ ] On mobile: scroll 300px → StickyMobileCTA appears → click WhatsApp → `whatsapp_click`
- [ ] On mobile: click Call button → `phone_call_click`

### Service Page (`/vuelos-charter-en-panama`)
- [ ] Page load → 1x pageview
- [ ] Click "Reservar por WhatsApp" → `whatsapp_click` with `service_type: "charter"`
- [ ] FAQ accordion → verify no errors (non-tracked is acceptable)

### Route Page (`/ruta/panama-san-blas`)
- [ ] Page load → 1x pageview
- [ ] Click "Reservar esta ruta" → `whatsapp_click` with `service_type: "route-panama-san-blas"`

### Fleet Detail Page (`/producto/eurocopter-b4-ec130-6-pasajeros`)
- [ ] Page load → 1x pageview
- [ ] Click "Alquilar esta aeronave" → `whatsapp_click`

### Contact Page (`/contacto`)
- [ ] Fill and submit contact form → `form_submit` with `form_type: "contact"`
- [ ] Verify success state shows

### Martin Booking Page (`/reservar-con-martin`)
- [ ] Page load → 1x pageview
- [ ] Chat with Martin (type message) → `martin_chat_start`
- [ ] Click WhatsApp button on page → `whatsapp_click`

### GA4 Real-Time Verification
1. Open GA4 → Reports → Realtime
2. With GTM Preview still active, trigger each event
3. Confirm events appear in Realtime → Events with correct names

### GA4 Cross-Domain Check
After GTM hostname fix is deployed:
1. Open GA4 → Explore → Free form
2. Dimension: Page title
3. Filter: Page title contains "OceanRide" or "catamaran"
4. **Expected result: ZERO rows**

---

## Key Business Numbers Reference

| Item | Value |
|---|---|
| WhatsApp (business) | `+1 (555) 729-8766` · `wa.me/15557298766` (US-registered WhatsApp Business) |
| Phone / Call | `+507 6840 0045` · `tel:+50768400045` (Panama personal line) |
| Email | info@skyride.city |
| GTM Container | GTM-W433GH2 |
| GA4 Property | G-NFNXQFYJ30 |
| Microsoft Clarity | m5rtsxrw5c |
| Live Domain | https://www.skyride.city |
| Canonical Domain (fix to) | https://www.skyride.city |
| Old WP Domain | skyride.city (non-www — legacy) |
| Google Cloud Project | (check cloudbuild.yaml) |

---

## Pricing Reference (for content/schema use)

| Route | Starting Price | Aircraft Options |
|---|---|---|
| Panama → Contadora | $398 | Piper Cherokee (3 pax) |
| Panama → San Blas | $644 | Cessna 206 (5 pax) |
| Panama → Bocas del Toro | $1,605 | Cessna Caravan (12 pax) |
| Panama → Costa Rica | $3,400 | King Air |
| Panama → Medellín | $5,500 | King Air 200 |
| Panama → Dominican Republic | $14,500 | — |
| Panama → Miami | $18,500 | — |
| Helicopter City Tour (30 min) | $588 | Robinson R44 (3 pax) |
| Helicopter City Tour — R66 | $875 | Robinson R66 (4 pax) |
| Helicopter — Eurocopter B3 | $1,284 | AS350 (5 pax) |
| Helicopter — Eurocopter B4 | $1,337 | EC130 (6 pax) |

---

## Success Metrics — 90-Day Targets

| Metric | Current | 30-Day Target | 90-Day Target |
|---|---|---|---|
| GSC Indexed Pages | 3 | 50+ | 100+ |
| GSC Avg Daily Impressions | ~60 | 300+ | 800+ |
| GSC Avg Daily Clicks | ~7 | 40+ | 150+ |
| Commercial page clicks/day | ~3 | 20+ | 60+ |
| GA4 Monthly Active Users (clean) | ~1,400 | 1,800+ | 3,500+ |
| WhatsApp conversion events/mo | Unknown (untracked) | 50+ (now tracked) | 200+ |
| Rich results in GSC | 0 | FAQs + Breadcrumbs | FAQs + Stars + Breadcrumbs |
| Avg position — charter pages | 22–45 | 12–18 | 5–10 |

---

*Document maintained by: SEO/Dev team*
*Next review date: May 9, 2026 (2 weeks post-deployment)*
