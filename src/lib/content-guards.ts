import { contentMode } from "./env";
import type { ClientValue, Price, ProductVariant } from "@/content/types";
import { localeMeta, type Currency, type Locale } from "./i18n";

/** Value to render, or undefined when a `todo` value must stay hidden (production). */
export function reveal<T>(v: ClientValue<T>): T | undefined {
  if (v.status === "confirmed") return v.value;
  return contentMode === "preview" ? v.value : undefined;
}

export const isProvisional = (v: ClientValue<unknown>) => v.status === "todo";

/** Minor units for the chosen currency, or undefined when not sellable. */
export function unitPrice(variant: ProductVariant, currency: Currency): number | undefined {
  const p: Price | undefined = reveal(variant.price);
  return p?.[currency];
}

export function formatMoney(minor: number, currency: Currency, locale: Locale): string {
  return new Intl.NumberFormat(localeMeta[locale].numberLocale, {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "CZK" ? 0 : 2,
    maximumFractionDigits: currency === "CZK" ? 0 : 2,
  }).format(minor / 100);
}
