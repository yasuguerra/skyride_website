import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);
const CANONICAL_HOST = "www.skyride.city";

// WordPress phantom page slugs that must 301 → homepage before intl middleware runs
const WP_PHANTOM_REDIRECTS = new Set([
  "/5113-2",
  "/5113-2/",
]);

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // Non-www → www redirect (fallback; also configure at Cloudflare level)
  if (host === "skyride.city" || host.startsWith("skyride.city:")) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, { status: 301 });
  }

  // WordPress phantom pages — redirect before next-intl can serve them as 200
  if (WP_PHANTOM_REDIRECTS.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, { status: 301 });
  }

  const response = intlMiddleware(request);

  // When behind Cloudflare + Cloud Run, next-intl generates hreflang Link
  // headers using the internal *.run.app hostname. Replace with canonical host.
  if (response && host.endsWith(".run.app")) {
    const linkHeader = response.headers.get("link");
    if (linkHeader) {
      response.headers.set("link", linkHeader.replaceAll(host, CANONICAL_HOST));
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except:
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /images, /favicon.ico, etc. (static files)
    "/((?!api|_next|images|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)",
  ],
};
