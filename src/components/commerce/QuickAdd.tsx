"use client";

import { useState } from "react";
import { useStore } from "./store";
import { copy } from "@/content/copy";
import type { ProductSlug } from "@/content/types";
import { getProduct, getVariant } from "@/content/products";
import { unitPrice } from "@/lib/content-guards";

/** One-tap add of the default pack, used on cards. */
export function QuickAdd({ slug, className = "" }: { slug: ProductSlug; className?: string }) {
  const { add, open, locale, currency } = useStore();
  const [done, setDone] = useState(false);
  const product = getProduct(slug)!;
  const variant = getVariant(product, product.defaultVariantId);
  const sellable = unitPrice(variant, currency) !== undefined;

  return (
    <button
      type="button"
      disabled={!sellable}
      onClick={(e) => {
        add({ slug, variantId: variant.id, quantity: 1 });
        setDone(true);
        open(e.currentTarget);
        setTimeout(() => setDone(false), 1600);
      }}
      className={`btn btn-quiet min-h-11 px-5 text-sm disabled:opacity-50 ${className}`}
    >
      <span aria-live="polite">{done ? copy.cart.added[locale] : copy.product.addToCart[locale]}</span>
    </button>
  );
}
