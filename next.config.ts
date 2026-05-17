import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://*.googletagmanager.com https://*.google-analytics.com https://*.googleadservices.com https://*.doubleclick.net https://*.clarity.ms https://*.instantfox.co",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://*.skyride.city https://*.googleusercontent.com https://*.google-analytics.com https://*.google.com https://*.google.com.pa https://*.doubleclick.net https://*.clarity.ms",
      "connect-src 'self' https://*.skyride.city https://*.google-analytics.com https://analytics.google.com https://*.google.com https://*.doubleclick.net https://*.clarity.ms https://*.googletagmanager.com",
      "font-src 'self'",
      "frame-src https://www.youtube.com https://www.googletagmanager.com",
    ].join("; "),
  },
];

// ─── Legacy EN fleet slug map ────────────────────────────────
// Legacy WordPress used English slugs under /en/producto/ (e.g. -passengers).
// New build uses shared Spanish slug under /en/product/.
const legacyEnFleetSlugMap: Record<string, string> = {
  "cessna-206-5-passengers": "cessna-206-5-pasajeros",
  "piper-azteca-5-passengers": "piper-azteca-5-pasajeros",
  "piper-saratoga-5-passengers": "piper-saratoga-5-pasajeros",
  "piper-cherokee-3-passengers": "piper-cherokee-3-pasajeros",
  "cessna-172-up-to-3-passengers": "cessna-172-hasta-3-pasajeros",
  "daher-kodiak-up-to-9-passengers": "daher-kodiak-hasta-9-pasajeros",
  "cessna-grand-caravan-12-passengers": "cessna-grand-caravan-12-pasajeros",
  "king-air-f90-6-passengers": "king-air-f90-6-pasajeros",
  "king-air-200-up-to-9-passengers": "king-air-200-hasta-9-pasajeros",
  "robinson-r44-3-passengers": "robinson-r44-3-pasajeros",
  "robinson-r66-4-passengers": "robinson-r66-4-pasajeros",
  "eurocopter-b3-as350-5-passengers": "eurocopter-b3-as350-5-pasajeros",
  "eurocopter-b4-ec130-6-passengers": "eurocopter-b4-ec130-6-pasajeros",
};

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "skyride.city" },
      { protocol: "https", hostname: "www.skyride.city" },
    ],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  async redirects() {
    const legacyEnFleetRedirects = Object.entries(legacyEnFleetSlugMap).flatMap(
      ([legacy, current]) => [
        { source: `/en/producto/${legacy}`, destination: `/en/product/${current}`, permanent: true },
        { source: `/en/product/${legacy}`, destination: `/en/product/${current}`, permanent: true },
      ],
    );

    return [
      // ─── Legacy EN blog index ────────────────────────────────
      { source: "/en/blog-2", destination: "/en/blog", permanent: true },
      { source: "/en/blog-2/:path*", destination: "/en/blog", permanent: true },

      // ─── Legacy EN homepage / charter page ───────────────────
      { source: "/en/sky-ride-charter-flights", destination: "/en", permanent: true },

      // ─── Service page legacy slugs ───────────────────────────
      { source: "/vuelos-charter", destination: "/vuelos-charter-en-panama", permanent: true },
      {
        source: "/alquiler-de-helicopteros-en-panama-todo-lo-que-necesitas-saber",
        destination: "/guia-helicopteros",
        permanent: true,
      },

      // ─── Catamaran / ferry products (no equivalent in new build) ─
      { source: "/producto/el-catamaran", destination: "/nuestra-flota", permanent: true },
      { source: "/producto/catamaran-valpar", destination: "/nuestra-flota", permanent: true },
      { source: "/producto/catamaran-zenith", destination: "/nuestra-flota", permanent: true },
      { source: "/producto/vuelos-charter", destination: "/vuelos-charter-en-panama", permanent: true },
      { source: "/en/producto/charter-flights", destination: "/en/charter-flights", permanent: true },
      { source: "/en/product/charter-flights", destination: "/en/charter-flights", permanent: true },

      // ─── EN fleet slug normalization (passengers → pasajeros) ─
      ...legacyEnFleetRedirects,

      // ─── Legacy /en/producto/ → /en/product/ ─────────────────
      { source: "/en/producto/:slug", destination: "/en/product/:slug", permanent: true },

      // ─── WordPress store / shop / categories ─────────────────
      { source: "/tienda", destination: "/nuestra-flota", permanent: true },
      { source: "/tienda/:path*", destination: "/nuestra-flota", permanent: true },
      { source: "/shop", destination: "/en/our-fleet", permanent: true },
      { source: "/shop/:path*", destination: "/en/our-fleet", permanent: true },
      { source: "/categoria-producto/:path*", destination: "/nuestra-flota", permanent: true },
      { source: "/product-category/:path*", destination: "/en/our-fleet", permanent: true },

      // ─── Generic legacy service URL redirects ────────────────
      { source: "/paseo-en-helicoptero", destination: "/paseo-en-helicoptero-en-panama", permanent: true },
      { source: "/helicopter-ride", destination: "/en/helicopter-rides", permanent: true },
      { source: "/en/helicopter-ride", destination: "/en/helicopter-rides", permanent: true },

      // ─── Old WordPress content pages (legacy slugs) ───────────
      {
        source: "/vuelos-a-contadora-descubre-el-paraiso-en-panama/:path*",
        destination: "/vuelo-privado-a-contadora",
        permanent: true,
      },
      {
        source: "/vuelos-privados-en-panama/:path*",
        destination: "/vuelos-charter-en-panama",
        permanent: true,
      },
      {
        source: "/vuelos-a-playa-tambor-la-forma-mas-rapida-de-llegar-al-paraiso/:path*",
        destination: "/vuelos-a-playa-tambor",
        permanent: true,
      },
      // ─── WordPress tour custom post type ─────────────────────
      { source: "/en/tour/:slug*", destination: "/en/helicopter-rides", permanent: true },

      // ─── Commerce / account routes (not used in marketplace) ─
      { source: "/cart", destination: "/contacto", permanent: true },
      { source: "/checkout", destination: "/contacto", permanent: true },
      { source: "/my-account", destination: "/contacto", permanent: true },
      { source: "/en/cart", destination: "/en/contact", permanent: true },
      { source: "/en/checkout", destination: "/en/contact", permanent: true },
      { source: "/en/my-account", destination: "/en/contact", permanent: true },

      // ─── Local SEO artifact ──────────────────────────────────
      { source: "/locations.kml", destination: "/contacto", permanent: true },

      // ─── WordPress infrastructure URLs ───────────────────────
      { source: "/wp-content/:path*", destination: "/", permanent: true },
      { source: "/wp-admin", destination: "/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/wp-includes/:path*", destination: "/", permanent: true },
      { source: "/wp-json", destination: "/", permanent: true },
      { source: "/wp-json/:path*", destination: "/", permanent: true },
      { source: "/xmlrpc.php", destination: "/", permanent: true },

      // ─── Legacy RSS feeds → blog index ───────────────────────
      { source: "/feed", destination: "/blog", permanent: true },
      { source: "/feed/:path*", destination: "/blog", permanent: true },
      { source: "/en/feed", destination: "/en/blog", permanent: true },
      { source: "/en/feed/:path*", destination: "/en/blog", permanent: true },

      // ─── WordPress per-post / author / category RSS feeds ────
      { source: "/:path*/feed", destination: "/blog", permanent: true },
      { source: "/:path*/feed/", destination: "/blog", permanent: true },

      // ─── WordPress author archives ────────────────────────────
      { source: "/author/:path*", destination: "/", permanent: true },
      { source: "/en/author/:path*", destination: "/en", permanent: true },

      // ─── WordPress search pages ───────────────────────────────
      { source: "/search/:path*", destination: "/", permanent: true },
      { source: "/en/search/:path*", destination: "/en", permanent: true },

      // ─── Route pages → destination pages (merged content) ────
      { source: "/ruta/panama-contadora", destination: "/vuelo-privado-a-contadora", permanent: true },
      { source: "/ruta/panama-san-blas", destination: "/guia-san-blas", permanent: true },
      { source: "/ruta/panama-bocas-del-toro", destination: "/guia-bocas-del-toro", permanent: true },
      { source: "/ruta/panama-costa-rica", destination: "/vuelo-privado-costa-rica", permanent: true },
      { source: "/ruta/panama-medellin", destination: "/vuelos-privados-a-medellin", permanent: true },
      { source: "/ruta/panama-david", destination: "/vuelo-privado-a-david-chiriqui", permanent: true },
      { source: "/ruta/panama-pedasi", destination: "/vuelo-privado-a-pedasi", permanent: true },
      { source: "/en/route/panama-contadora", destination: "/en/private-flight-to-contadora", permanent: true },
      { source: "/en/route/panama-san-blas", destination: "/en/san-blas-guide", permanent: true },
      { source: "/en/route/panama-bocas-del-toro", destination: "/en/bocas-del-toro-guide", permanent: true },
      { source: "/en/route/panama-costa-rica", destination: "/en/private-flight-costa-rica", permanent: true },
      { source: "/en/route/panama-medellin", destination: "/en/private-flights-to-medellin", permanent: true },
      { source: "/en/route/panama-david", destination: "/en/private-flight-to-david-panama", permanent: true },
      { source: "/en/route/panama-pedasi", destination: "/en/private-flight-to-pedasi", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);