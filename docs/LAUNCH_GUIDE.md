# Sky Ride Panama — Launch Operations Guide

> **Canonical domain**: `skyride.city` (no www)
> **Hosting**: Google Cloud Run (standalone Docker)
> **Git**: https://github.com/yasuguerra/skyride_website

---

## Pre-Launch Checklist (T-1)

### Already verified in codebase:
- [x] 128 static pages build with 0 errors
- [x] All WordPress URLs redirect (next.config.ts `redirects()`)
- [x] sitemap.xml lists all pages with hreflang alternates
- [x] robots.txt allows crawlers, blocks /api/, /_next/, /wp-admin/
- [x] Canonical tags self-referencing on all 128 pages
- [x] Hreflang tags on all 128 pages (ES, EN, x-default)
- [x] OG + Twitter card meta on all pages (including blog, routes, fleet-detail)
- [x] JSON-LD: Organization, WebSite, Service, Product, Trip, BlogPosting, FAQ, BreadcrumbList, AggregateRating, Review
- [x] Accessibility: skip-nav, focus-visible, keyboard navigation, aria-labels, live regions
- [x] Security: CSP, HSTS, X-Frame-Options, referrer-policy headers
- [x] Contact form: Zod validation + honeypot
- [x] Booking form: 4-step → WhatsApp
- [x] Martin chat: floating + dedicated /reservar-con-martin page
- [x] Analytics: GTM, GA4, Clarity, Google Ads, InstantFox

### Manual pre-launch checks:
- [ ] Run `npx tsx scripts/verify-urls.ts` against production URL (update BASE_URL in script)
- [ ] Lighthouse mobile ≥ 95 on homepage
- [ ] Lighthouse mobile ≥ 95 on /paseo-en-helicoptero-en-panama
- [ ] Lighthouse mobile ≥ 95 on /blog
- [ ] Rich Results Test → paste homepage URL
- [ ] Rich Results Test → paste a blog post URL
- [ ] GA4 Debug View → verify events firing (whatsapp_click, form_submit, martin_chat_start)
- [ ] Test WhatsApp flow end-to-end (CTA → WhatsApp app opens with pre-filled message)
- [ ] Test Martin chat → ask a question → confirm response
- [ ] Test contact form → submit → confirm email received
- [ ] Cross-browser: Chrome, Safari, Firefox (mobile + desktop)

---

## Launch Day (T-0)

### Step 1: Deploy to Cloud Run

```bash
# Build and push Docker image
gcloud builds submit --config=cloudbuild.yaml

# Verify Cloud Run service is healthy
gcloud run services describe skyride-web --region=us-central1
```

### Step 2: DNS Cutover

1. In your DNS provider (Cloudflare / Google Domains):
   - Update `skyride.city` A/AAAA records → Cloud Run IP
   - Add CNAME `www.skyride.city` → `skyride.city` (or set up www→non-www redirect)
   - TTL: Set to 300 (5min) before cutover, restore to 3600 after verified

2. Set up **www → non-www 301 redirect** in Cloudflare Page Rules or Cloud Run:
   - `https://www.skyride.city/*` → `https://skyride.city/$1` (301)

### Step 3: SSL Verification

```bash
# Verify SSL certificate
curl -vI https://skyride.city 2>&1 | grep -E "SSL|certificate|issuer"

# Verify HSTS header
curl -I https://skyride.city | grep -i strict-transport
```

### Step 4: WordPress Backup

1. Keep old WordPress site accessible at `old.skyride.city` for 30 days
2. DNS: Add A record for `old.skyride.city` → old WordPress server IP
3. Add `robots.txt` to old site with `Disallow: /` to prevent indexing

### Step 5: Google Search Console

1. **Verify ownership** of `skyride.city` in GSC (DNS TXT or HTML tag)
2. **Submit sitemap**: GSC → Sitemaps → Add `https://skyride.city/sitemap.xml`
3. **Request indexing** on 10 key pages via URL Inspection:
   - `https://skyride.city/` (homepage ES)
   - `https://skyride.city/en` (homepage EN)
   - `https://skyride.city/paseo-en-helicoptero-en-panama`
   - `https://skyride.city/vuelos-charter-en-panama`
   - `https://skyride.city/nuestra-flota`
   - `https://skyride.city/ruta/panama-contadora`
   - `https://skyride.city/ruta/panama-san-blas`
   - `https://skyride.city/destino/contadora`
   - `https://skyride.city/blog`
   - `https://skyride.city/guia-contadora`

### Step 6: Martin Backend CORS

Update Martin agent backend CORS whitelist to include:
```
https://skyride.city
```

Remove old WordPress domain from CORS if present.

### Step 7: GA4 Verification

1. Open GA4 Real-Time dashboard
2. Visit homepage on mobile + desktop
3. Confirm events flowing: `page_view`, `whatsapp_click`, etc.
4. Verify GTM container (GTM-W433GH2) is loading

### Step 8: Social Media

- Update Google Business Profile website URL → `https://skyride.city`
- Update Instagram bio link
- Update Facebook page URL
- Update TripAdvisor listing URL (if applicable)

---

## Post-Launch Monitoring (T+1 to T+7)

### Daily checks (first 7 days):

| Check | How | 
|-------|-----|
| Crawl errors | GSC → Pages → check for 404s, 5xx |
| Sitemap status | GSC → Sitemaps → status should be "Success" |
| Indexation progress | `site:skyride.city` in Google |
| PageSpeed scores | PageSpeed Insights on homepage |
| GA4 events | GA4 → Events → verify all firing |
| WhatsApp inquiries | Count incoming messages |
| Martin chat sessions | Check /api/chat logs |

### Weekly checks (first 90 days):

| Check | Tool |
|-------|------|
| Pages indexed | GSC → Pages |
| Core Web Vitals | GSC → Experience |
| Keyword rankings | GSC → Performance |
| Backlinks | GSC → Links |
| Conversion rate | GA4 → whatsapp_click / sessions |

### Key queries to track:

| ES Query | EN Query |
|----------|----------|
| vuelo charter panama | charter flight panama |
| paseo en helicóptero panamá | helicopter tour panama |
| vuelo privado panama contadora | private flight panama contadora |
| vuelo panama san blas | flight to san blas panama |
| vuelo charter panama costa rica | charter flight panama costa rica |

---

## Rollback Plan

If critical issues are discovered post-launch:

1. **DNS rollback**: Revert A/AAAA records to old WordPress server IP (propagation: 5-30 min depending on TTL)
2. Old WordPress is still running at `old.skyride.city`
3. No data loss risk — new site is static/serverless

---

## Environment Variables Required in Cloud Run

```
RESEND_API_KEY=re_xxxx          # Contact form email
CONTACT_EMAIL_TO=info@skyride.city
GEMINI_API_KEY=AIzaSyxxxx       # Martin AI chat
```

---

## Key URLs Reference

| Page | ES URL | EN URL |
|------|--------|--------|
| Homepage | skyride.city | skyride.city/en |
| Helicopter | skyride.city/paseo-en-helicoptero-en-panama | skyride.city/en/helicopter-rides |
| Charter | skyride.city/vuelos-charter-en-panama | skyride.city/en/charter-flights-panama |
| Fleet | skyride.city/nuestra-flota | skyride.city/en/our-fleet |
| Blog | skyride.city/blog | skyride.city/en/blog |
| Contact | skyride.city/contacto | skyride.city/en/contact |
| FAQ | skyride.city/preguntas-frecuentes | skyride.city/en/faq |
| Booking | skyride.city/reservar-con-martin | skyride.city/en/book-with-martin |
| Sitemap | skyride.city/sitemap.xml | — |
| Robots | skyride.city/robots.txt | — |
