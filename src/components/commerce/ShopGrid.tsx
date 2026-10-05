"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { useStore } from "./store";
import { copy } from "@/content/copy";
import { products } from "@/content/products";
import { unitPrice } from "@/lib/content-guards";
import { toMajor, track } from "@/lib/analytics";

type Filter = "all" | "tea" | "bundle";
type Sort = "default" | "asc" | "desc";

export function ShopGrid() {
  const { locale, currency } = useStore();
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("default");
  const c = copy.shop;

  const minPrice = (slug: string) => {
    const p = products.find((x) => x.slug === slug)!;
    const prices = p.variants.map((v) => unitPrice(v, currency)).filter((x): x is number => x !== undefined);
    return prices.length ? Math.min(...prices) : Number.POSITIVE_INFINITY;
  };

  const list = useMemo(() => {
    const filtered = products.filter((p) => filter === "all" || p.kind === filter);
    if (sort === "default") return filtered;
    return [...filtered].sort((a, b) => (sort === "asc" ? 1 : -1) * (minPrice(a.slug) - minPrice(b.slug)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sort, currency]);

  useEffect(() => {
    track("view_item_list", {
      currency,
      value: 0,
      items: list.map((p, index) => {
        const v = p.variants.find((x) => x.id === p.defaultVariantId)!;
        return {
          item_id: v.sku,
          item_name: p.name.en,
          item_variant: v.id,
          price: toMajor(unitPrice(v, currency) ?? 0),
          quantity: 1,
          item_list_name: "shop",
          index,
        };
      }),
    });
  }, [list, currency]);

  const filters: [Filter, string][] = [
    ["all", c.filterAll[locale]],
    ["tea", c.filterTea[locale]],
    ["bundle", c.filterSets[locale]],
  ];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
        <div role="group" aria-label={c.filterAll[locale]} className="flex gap-2">
          {filters.map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
              className="rounded-full border border-line px-4 py-2 text-sm aria-pressed:border-roast aria-pressed:bg-roast aria-pressed:text-paper"
            >
              {label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-sm">
          <span className="text-muted">{c.sort[locale]}</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-10 rounded-full border border-line bg-transparent px-4"
          >
            <option value="default">{c.sortDefault[locale]}</option>
            <option value="asc">{c.sortPriceAsc[locale]}</option>
            <option value="desc">{c.sortPriceDesc[locale]}</option>
          </select>
        </label>
      </div>
      <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <ProductCard key={p.slug} product={p} locale={locale} priority={i < 3} />
        ))}
      </div>
    </>
  );
}
