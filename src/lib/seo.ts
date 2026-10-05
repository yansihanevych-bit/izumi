import type { Metadata } from "next";
import type { Indexability, Localized } from "@/content/types";
import { localeMeta, locales, type Locale } from "./i18n";
import { siteEnv, siteUrl } from "./env";

type Input = {
  locale: Locale;
  /** Path without the locale prefix, e.g. "shop/izumi-classic/" or "" for home. */
  path: string;
  title: Localized;
  description: Localized;
  indexability: Indexability;
  image?: string;
  /** Home uses the plain title; other pages get the "— IZUMI" suffix via the template. */
  absoluteTitle?: boolean;
};

export function buildMetadata({ locale, path, title, description, indexability, image, absoluteTitle }: Input): Metadata {
  const url = (l: Locale) => `${siteUrl}/${l}/${path}`;
  const languages = Object.fromEntries(locales.map((l) => [localeMeta[l].hreflang, url(l)]));
  const index = siteEnv === "production" && indexability === "index";

  return {
    title: absoluteTitle ? { absolute: title[locale] } : title[locale],
    description: description[locale],
    alternates: {
      canonical: url(locale),
      languages: { ...languages, "x-default": url("ua") },
    },
    openGraph: {
      type: "website",
      siteName: "IZUMI",
      locale: localeMeta[locale].ogLocale,
      url: url(locale),
      title: title[locale],
      description: description[locale],
      images: image ? [{ url: image }] : undefined,
    },
    robots: index ? { index: true, follow: true } : { index: false, follow: siteEnv === "production" },
  };
}
