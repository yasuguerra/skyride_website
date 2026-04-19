# Sky Ride Panama — Website

Bilingual (ES/EN) marketing site for **Sky Ride Panama** — premium private aviation, charter flights, helicopter tours, and exclusive routes.

Built with **Next.js 16 (App Router + Turbopack)**, **TypeScript**, **Tailwind CSS 4**, and **next-intl**. Deployed on **Google Cloud Run** with **Vertex AI (Gemini)** powering the Martin chat assistant.

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 |
| i18n | next-intl (ES default, EN under `/en/`) |
| Content | Markdown via gray-matter |
| Email | Resend |
| AI chat | Vertex AI Gemini 2.0 Flash |
| Deploy | Google Cloud Run + Cloud Build |
| Tests | Playwright (Chromium + mobile) |
| Analytics | GTM + GA4 + Microsoft Clarity |

## Local development

```powershell
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

## Build & preview

```powershell
npm run build
npm run start
```

## E2E tests

```powershell
npx playwright test              # all 68 tests
npx playwright test --ui         # interactive mode
npx playwright show-report       # view last HTML report
```

## Deployment (Google Cloud Run)

Deploys are driven by [`cloudbuild.yaml`](cloudbuild.yaml). To trigger a deploy:

```powershell
gcloud builds submit --config cloudbuild.yaml `
  --substitutions=_REGION=us-central1,_GA4_ID=G-XXXXXXXXXX,_CLARITY_ID=xxxxxxxxxx
```

Secrets (`RESEND_API_KEY`, `VERTEX_AI_PROJECT`) are resolved at runtime via **Secret Manager**.

### Smoke-test a deployment

```powershell
./scripts/smoke-test.ps1 -BaseUrl https://www.skyride.city
```

## Project structure

```
src/
  app/
    [locale]/               # ES/EN routes (localePrefix: as-needed)
      [...slug]/page.tsx    # Catch-all for 100+ content pages
      page.tsx              # Homepage
      layout.tsx            # Root layout w/ fonts + analytics
    api/
      chat/route.ts         # Vertex AI Gemini endpoint
      contact/route.ts      # Resend email endpoint
  components/
    pages/                  # Page templates (fleet, charter, blog, booking…)
    layout/                 # Header, Footer
    ui/                     # MartinChat, WhatsAppButton, StickyMobileCTA
    seo/                    # JsonLd schemas, Breadcrumbs
    analytics/              # GTM/GA4/Clarity wiring
  content/blog/             # ES (21) + EN (10) blog markdown
  data/                     # slug-map, navigation, fleet, routes, seo
  i18n/                     # next-intl routing config
  lib/                      # analytics helpers, blog loader, schemas
e2e/                        # Playwright test suites (7 files, 68 tests)
docs/PRD_website_rebuild.md # Product requirements
cloudbuild.yaml             # GCP Cloud Build pipeline
Dockerfile                  # Multi-stage for Cloud Run
```

## Environment variables

See [`.env.example`](.env.example). Key vars:

- `NEXT_PUBLIC_GTM_ID` — Google Tag Manager
- `NEXT_PUBLIC_GA4_ID` — GA4 measurement ID
- `NEXT_PUBLIC_CLARITY_ID` — Microsoft Clarity
- `RESEND_API_KEY` — Contact form email
- `VERTEX_AI_PROJECT` — GCP project for Martin chat
- `VERTEX_AI_LOCATION` — default `us-central1`
- `VERTEX_AI_MODEL` — default `gemini-2.0-flash`

On Cloud Run, Vertex AI auth uses **Application Default Credentials** from the metadata server — no key needed.

## License

Proprietary — © Sky Ride Panama.
