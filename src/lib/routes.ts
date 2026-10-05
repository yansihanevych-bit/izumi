import type { Locale } from "./i18n";
import type { PageKey, ProductSlug } from "@/content/types";

/**
 * Single source of truth for URLs. Components call these helpers and never
 * build paths by hand. All internal URLs end with "/" (trailing-slash policy).
 */
const pagePath: Record<PageKey, string> = {
  home: "",
  shop: "shop/",
  tea: "tea/",
  brewing: "brewing/",
  benefits: "benefits/",
  about: "about/",
  reviews: "reviews/",
  whereToBuy: "where-to-buy/",
  faq: "faq/",
  delivery: "delivery/",
  contacts: "contacts/",
  privacy: "privacy/",
  offer: "offer/",
  returns: "returns/",
  cart: "cart/",
  checkout: "checkout/",
};

export const pageHref = (locale: Locale, page: PageKey) =>
  `/${locale}/${pagePath[page]}`;

/** `pack` is UI state only; canonical never includes it. */
export const productHref = (locale: Locale, slug: ProductSlug, pack?: string) =>
  `/${locale}/shop/${slug}/${pack ? `?pack=${encodeURIComponent(pack)}` : ""}`;

export const cityHref = (locale: Locale, citySlug: string) =>
  `/${locale}/where-to-buy/${citySlug}/`;

export const checkoutResultHref = (locale: Locale, result: "success" | "failed") =>
  `/${locale}/checkout/${result}/`;
