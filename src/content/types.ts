/**
 * Content model. Components never hardcode copy, prices or facts: everything
 * comes from typed content in src/content/*, CMS-ready (each type maps 1:1 to
 * a future CMS collection).
 */
import type { Currency, Locale } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

/** Every user-facing string exists in all four languages. */
export type Localized<T = string> = Record<Locale, T>;

/**
 * A value the client has not confirmed yet.
 *
 * In preview (NEXT_PUBLIC_CONTENT_MODE !== "production") `todo` values render
 * with their provisional value; in production they are filtered out by
 * lib/content-guards.ts. This is how TODO(client) lives in content instead
 * of leaking into components.
 */
export type ClientValue<T> =
  | { status: "confirmed"; value: T; source: string }
  | { status: "todo"; value?: T; note: string };

export const confirmed = <T>(value: T, source: string): ClientValue<T> => ({
  status: "confirmed",
  value,
  source,
});
export const todo = <T>(note: string, value?: T): ClientValue<T> => ({
  status: "todo",
  value,
  note,
});

/** Prices are set per currency (no FX conversion), in minor units. */
export type Price = Record<Currency, number>;

export type Image = {
  src: string;
  alt: Localized;
  width: number;
  height: number;
};

/* ------------------------------------------------------------------ */
/* Page / SEO                                                          */
/* ------------------------------------------------------------------ */

export type Indexability = "index" | "noindex" | "unpublished";

export type PageKey =
  | "home"
  | "shop"
  | "tea"
  | "brewing"
  | "benefits"
  | "about"
  | "reviews"
  | "whereToBuy"
  | "faq"
  | "delivery"
  | "contacts"
  | "privacy"
  | "offer"
  | "returns"
  | "cart"
  | "checkout";

export type Seo = {
  title: Localized;
  description: Localized;
  indexability: Indexability;
};

/* ------------------------------------------------------------------ */
/* Commerce                                                            */
/* ------------------------------------------------------------------ */

export type PackType = "doy" | "stick" | "bundle";

/**
 * `root` = Tilda's unprefixed /tproduct/... duplicates (UA content).
 */
export type LegacyPath = { path: string; locale: "ua" | "en" | "ru" | "root" };

export type ProductVariant = {
  /** `?pack=` UI state. Never a separate indexable URL. */
  id: string;
  /** Tilda SKU, kept for order history and analytics continuity. */
  sku: string;
  name: Localized;
  packType: PackType;
  weightGrams: ClientValue<number>;
  price: ClientValue<Price>;
  image: Image;
  legacyPaths: LegacyPath[];
};

export type ProductSlug = "izumi-classic" | "izumi-ginger" | "mix-pack";

export type Product = {
  slug: ProductSlug;
  kind: "tea" | "bundle";
  /** Pack colour drives the product's panel colour (information, not decoration). */
  tone: "blush" | "teal" | "sand";
  name: Localized;
  shortDescription: Localized;
  description: Localized;
  ingredients: ClientValue<Localized>;
  taste: ClientValue<Localized>;
  aroma: ClientValue<Localized>;
  story: Localized;
  gallery: Image[];
  variants: ProductVariant[];
  defaultVariantId: string;
  related: ProductSlug[];
  seo: Seo;
};

/* ------------------------------------------------------------------ */
/* Claims                                                              */
/* ------------------------------------------------------------------ */

export type Claim = {
  id: string;
  text: Partial<Localized>;
  risk: "low" | "medium" | "high" | "critical";
  status: "approved" | "pending-evidence" | "removed";
  evidence?: { document: string; checkedBy: string; checkedAt: string };
  removedReason?: string;
};

/* ------------------------------------------------------------------ */
/* Brewing                                                             */
/* ------------------------------------------------------------------ */

export type BrewingParameters = {
  doseGrams: ClientValue<{ min: number; max: number }>;
  waterMl: ClientValue<number>;
  temperatureC: ClientValue<{ min: number; max: number }>;
  steepMinutes: ClientValue<number>;
  maxInfusions: ClientValue<number>;
};

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export type FaqCategory =
  | "product"
  | "brewing"
  | "ingredients"
  | "storage"
  | "purchasing"
  | "other";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: Localized;
  answer: Localized;
  status: "confirmed" | "todo";
};

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

export type VideoReview = {
  id: string;
  /** Names in Cyrillic (ua/ru) and Latin (cs/en). */
  name: Localized;
  role: Localized;
  youtubeId: string;
  /** Group for the editorial layout. */
  field: "music" | "sport" | "media" | "fashion" | "wellness" | "public";
};

/* ------------------------------------------------------------------ */
/* Where to buy                                                        */
/* ------------------------------------------------------------------ */

export type City = { slug: string; name: Localized };

export type Store = {
  id: string;
  type: "retail" | "horeca" | "online";
  name: string;
  citySlug?: string;
  addresses: string[];
  verification:
    | { status: "verified"; checkedAt: string }
    | { status: "unverified"; importedFrom: string };
};

/* ------------------------------------------------------------------ */
/* Organization                                                        */
/* ------------------------------------------------------------------ */

export type Organization = {
  brand: string;
  legalName: string;
  registryCode: string;
  address: Localized;
  phones: { display: string; tel: string; messengers: string[] }[];
  email: string;
  instagram: string;
};
