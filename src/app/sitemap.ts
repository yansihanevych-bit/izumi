import type { MetadataRoute } from "next";
import { pageSeo } from "@/content/copy";
import { products } from "@/content/products";
import type { PageKey } from "@/content/types";
import { siteUrl } from "@/lib/env";
import { localeMeta, locales } from "@/lib/i18n";
import { pageHref, productHref } from "@/lib/routes";

/** Only indexable pages, generated from the content layer. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const alternates = (build: (l: (typeof locales)[number]) => string) => ({
    languages: Object.fromEntries(locales.map((l) => [localeMeta[l].hreflang, `${siteUrl}${build(l)}`])),
  });

  for (const key of Object.keys(pageSeo) as PageKey[]) {
    if (pageSeo[key].indexability !== "index") continue;
    for (const l of locales) entries.push({ url: `${siteUrl}${pageHref(l, key)}`, alternates: alternates((x) => pageHref(x, key)) });
  }
  for (const p of products) {
    if (p.seo.indexability !== "index") continue;
    for (const l of locales) entries.push({ url: `${siteUrl}${productHref(l, p.slug)}`, alternates: alternates((x) => productHref(x, p.slug)) });
  }
  return entries;
}
