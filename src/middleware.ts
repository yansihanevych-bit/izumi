import { NextResponse, type NextRequest } from "next/server";
import { buildLegacyMap, resolveRedirect } from "@/lib/redirects";
import { getPublishState } from "@/lib/publish-state";

const legacyMap = buildLegacyMap(getPublishState());

// Previews must never compete with izumitea.com in search.
const isProductionSite = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export function middleware(request: NextRequest) {
  const result = resolveRedirect(request.nextUrl, legacyMap);

  let response: NextResponse;
  if (!result) response = NextResponse.next();
  else if (result.status === 410) response = new NextResponse(null, { status: 410 });
  else response = NextResponse.redirect(new URL(result.location, request.url), 301);

  if (!isProductionSite) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon.ico|icon|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|woff2?)$).*)"],
};
