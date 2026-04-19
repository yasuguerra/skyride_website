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
];

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
    return [
      // WordPress 301 redirects (preserve SEO equity)
      { source: "/tienda", destination: "/nuestra-flota", permanent: true },
      { source: "/tienda/:path*", destination: "/nuestra-flota", permanent: true },
      { source: "/shop", destination: "/en/our-fleet", permanent: true },
      { source: "/shop/:path*", destination: "/en/our-fleet", permanent: true },
      { source: "/categoria-producto/:path*", destination: "/nuestra-flota", permanent: true },
      { source: "/product-category/:path*", destination: "/en/our-fleet", permanent: true },
      { source: "/paseo-en-helicoptero", destination: "/paseo-en-helicoptero-en-panama", permanent: true },
      { source: "/helicopter-ride", destination: "/en/helicopter-rides", permanent: true },
      { source: "/wp-content/:path*", destination: "/", permanent: true },
      { source: "/cart", destination: "/contacto", permanent: true },
      { source: "/checkout", destination: "/contacto", permanent: true },
      { source: "/my-account", destination: "/contacto", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);