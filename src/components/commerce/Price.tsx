"use client";

import { useStore } from "./store";
import { formatMoney } from "@/lib/content-guards";
import type { ProductVariant } from "@/content/types";
import { unitPrice } from "@/lib/content-guards";
import { copy } from "@/content/copy";

/** Price in the visitor's chosen currency. Renders "price coming soon" when not sellable. */
export function Price({ variant, quantity = 1, className }: { variant: ProductVariant; quantity?: number; className?: string }) {
  const { currency, locale } = useStore();
  const p = unitPrice(variant, currency);
  if (p === undefined) return <span className={className}>{copy.product.unavailable[locale]}</span>;
  return (
    <span className={className} data-provisional={variant.price.status === "todo" || undefined}>
      {formatMoney(p * quantity, currency, locale)}
    </span>
  );
}

/** Lowest price across variants, for cards. */
export function FromPrice({ variants, className }: { variants: ProductVariant[]; className?: string }) {
  const { currency, locale } = useStore();
  const prices = variants.map((v) => unitPrice(v, currency)).filter((p): p is number => p !== undefined);
  if (prices.length === 0) return <span className={className}>{copy.product.unavailable[locale]}</span>;
  const min = Math.min(...prices);
  return (
    <span className={className}>
      {variants.length > 1 ? `${copy.product.from[locale]} ` : ""}
      {formatMoney(min, currency, locale)}
    </span>
  );
}
