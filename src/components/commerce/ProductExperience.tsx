"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "./store";
import { Price } from "./Price";
import { QuantityStepper } from "./QuantityStepper";
import { Packshot } from "@/components/media/Packshot";
import { copy } from "@/content/copy";
import { getProduct, getVariant } from "@/content/products";
import type { Image as ImageT, ProductSlug } from "@/content/types";
import { reveal, unitPrice } from "@/lib/content-guards";
import { toMajor, track } from "@/lib/analytics";

/**
 * Product gallery + sticky purchase panel. `?pack=` selects the variant as
 * UI state only (canonical never includes it).
 */
export function ProductExperience({ slug }: { slug: ProductSlug }) {
  const product = getProduct(slug)!;
  const { locale, currency, add, open } = useStore();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [variantId, setVariantId] = useState(() => getVariant(product, params.get("pack") ?? undefined).id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = getVariant(product, variantId);
  const sellable = unitPrice(variant, currency) !== undefined;
  const weight = reveal(variant.weightGrams);

  useEffect(() => {
    track("view_item", {
      currency,
      value: toMajor(unitPrice(variant, currency) ?? 0),
      items: [{ item_id: variant.sku, item_name: product.name.en, item_variant: variant.id, price: toMajor(unitPrice(variant, currency) ?? 0), quantity: 1 }],
    });
  }, [variant, currency, product.name.en]);

  const choose = (id: string) => {
    setVariantId(id);
    const q = new URLSearchParams(params.toString());
    q.set("pack", id);
    router.replace(`${pathname}?${q.toString()}`, { scroll: false });
  };

  // Gallery: the chosen pack first, then the product's photos.
  const gallery: ImageT[] = [variant.image, ...product.gallery.filter((g) => g.src !== variant.image.src)];
  const c = copy.product;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
      <section aria-label={c.gallery[locale]} className="-mx-[clamp(1rem,4vw,3rem)] lg:mx-0">
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[clamp(1rem,4vw,3rem)] lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-visible lg:px-0">
          {gallery.map((img, i) => (
            <li
              key={img.src}
              className={`tone-${product.tone} relative aspect-[4/5] w-[82vw] shrink-0 snap-center overflow-hidden rounded-[1.75rem] p-[9%] sm:w-[60vw] lg:w-auto ${i === 0 ? "lg:col-span-2" : "lg:p-[12%]"}`}
            >
              <Packshot image={img} locale={locale} priority={i === 0} sizes={i === 0 ? "(min-width:1024px) 52vw, 82vw" : "(min-width:1024px) 26vw, 82vw"} />
            </li>
          ))}
        </ul>
      </section>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <h1 className="text-h1">{product.name[locale]}</h1>
        <p className="mt-4 text-lead text-muted">{product.shortDescription[locale]}</p>

        <p className="mt-6 text-3xl tabular-nums">
          <Price variant={variant} quantity={qty} />
        </p>
        {weight !== undefined && (
          <p className="mt-1 text-sm text-muted">
            {c.weight[locale]}: {weight} {c.grams[locale]}
          </p>
        )}

        <fieldset className="mt-8">
          <legend className="mb-3 text-sm font-medium">{c.choosePack[locale]}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {product.variants.map((v) => {
              const checked = v.id === variant.id;
              return (
                <label
                  key={v.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-2.5 pr-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-spring ${
                    checked ? "border-roast bg-husk/60" : "border-line hover:border-roast/50"
                  }`}
                >
                  <input type="radio" name="pack" value={v.id} checked={checked} onChange={() => choose(v.id)} className="sr-only" />
                  <span className={`tone-${product.tone} relative block h-14 w-12 shrink-0 overflow-hidden rounded-lg`}>
                    <Image src={v.image.src} alt="" fill sizes="48px" className={`object-contain p-0.5 ${v.image.src.endsWith(".jpg") ? "blend" : ""}`} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.95rem] leading-tight">{v.name[locale]}</span>
                    <Price variant={v} className="block text-sm text-muted tabular-nums" />
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <QuantityStepper value={qty} onChange={(n) => setQty(Math.max(1, Math.min(20, n)))} locale={locale} />
          <button
            type="button"
            disabled={!sellable}
            onClick={(e) => {
              add({ slug: product.slug, variantId: variant.id, quantity: qty });
              setAdded(true);
              setTimeout(() => setAdded(false), 1600);
              open(e.currentTarget);
            }}
            className="btn btn-primary flex-1"
          >
            <span aria-live="polite">{added ? copy.cart.added[locale] : c.addToCart[locale]}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
