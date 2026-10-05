import type { MetadataRoute } from "next";
import { siteEnv, siteUrl } from "@/lib/env";

/** Previews are closed to crawlers so they never compete with izumitea.com. */
export default function robots(): MetadataRoute.Robots {
  if (siteEnv !== "production") return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/ua/cart/", "/cs/cart/", "/ru/cart/", "/en/cart/", "/*/checkout/"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
