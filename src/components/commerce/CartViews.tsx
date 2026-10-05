"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { lineItem, useStore } from "./store";
import { Price } from "./Price";
import { QuantityStepper } from "./QuantityStepper";
import { Packshot } from "@/components/media/Packshot";
import { copy } from "@/content/copy";
import { formatMoney } from "@/lib/content-guards";
import { contentMode } from "@/lib/env";
import { pageHref, productHref } from "@/lib/routes";
import { toMajor, track } from "@/lib/analytics";

/** Full-page cart (fallback for the drawer, e.g. when linked directly). */
export function CartPage() {
  const { locale, currency, lines, subtotal, setQuantity, remove } = useStore();
  const c = copy.cart;

  if (lines.length === 0) {
    return (
      <div className="mt-10">
        <p className="measure text-lead text-muted">{c.empty[locale]}</p>
        <Link href={pageHref(locale, "shop")} className="btn btn-primary mt-8">
          {c.toShop[locale]}
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
      <ul className="divide-y divide-line border-y border-line">
        {lines.map((line) => {
          const li = lineItem(line, currency);
          if (!li) return null;
          return (
            <li key={`${line.slug}-${line.variantId}`} className="flex gap-5 py-6">
              <Link href={productHref(locale, li.product.slug, li.variant.id)} className={`tone-${li.product.tone} relative block h-32 w-26 shrink-0 overflow-hidden rounded-2xl p-2`}>
                <Packshot image={li.variant.image} locale={locale} sizes="104px" />
              </Link>
              <div className="flex flex-1 flex-col justify-between gap-3">
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-serif text-2xl leading-tight">{li.product.name[locale]}</p>
                    <p className="text-muted">{li.variant.name[locale]}</p>
                  </div>
                  <Price variant={li.variant} quantity={line.quantity} className="tabular-nums" />
                </div>
                <div className="flex items-center gap-5">
                  <QuantityStepper size="sm" locale={locale} value={line.quantity} onChange={(n) => setQuantity(line.slug, line.variantId, n)} />
                  <button type="button" onClick={() => remove(line.slug, line.variantId)} className="link text-sm text-muted">
                    {c.remove[locale]}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <aside className="self-start rounded-[1.75rem] bg-husk p-7">
        <div className="flex items-baseline justify-between">
          <span>{c.subtotal[locale]}</span>
          <span className="text-2xl tabular-nums">{subtotal === undefined ? copy.product.unavailable[locale] : formatMoney(subtotal, currency, locale)}</span>
        </div>
        <p className="mt-1 text-sm text-muted">{c.shippingNote[locale]}</p>
        <Link href={pageHref(locale, "checkout")} className="btn btn-primary mt-6 w-full">
          {c.checkout[locale]}
        </Link>
      </aside>
    </div>
  );
}

/**
 * Checkout. The payment provider is not chosen yet (see blueprint §7.2), so
 * this collects nothing and places no order; it shows the summary and the
 * form the provider adapter will plug into.
 */
export function CheckoutForm() {
  const { locale, currency, lines, subtotal } = useStore();
  const c = copy.checkout;
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (lines.length === 0) return;
    const items = lines
      .map((l) => {
        const li = lineItem(l, currency);
        return li && { item_id: li.variant.sku, item_name: li.product.name.en, item_variant: li.variant.id, price: toMajor(li.price ?? 0), quantity: l.quantity };
      })
      .filter((x) => x !== undefined);
    track("begin_checkout", { currency, value: toMajor(subtotal ?? 0), items });
    // Fire once per visit to checkout.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (lines.length === 0) {
    return (
      <div className="mt-10">
        <p className="text-lead text-muted">{c.empty[locale]}</p>
        <Link href={pageHref(locale, "shop")} className="btn btn-primary mt-8">
          {copy.cart.toShop[locale]}
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
      <form
        className="grid gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          setTried(true);
        }}
      >
        <fieldset className="grid gap-4">
          <legend className="mb-2 font-serif text-h3">{c.contact[locale]}</legend>
          <label className="field">
            {c.name[locale]}
            <input name="name" autoComplete="name" required />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field">
              {c.email[locale]}
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label className="field">
              {c.phone[locale]}
              <input name="phone" type="tel" autoComplete="tel" required />
            </label>
          </div>
        </fieldset>
        <fieldset className="grid gap-4">
          <legend className="mb-2 font-serif text-h3">{c.address[locale]}</legend>
          <label className="field">
            {c.country[locale]}
            <select name="country" autoComplete="country" defaultValue="CZ">
              <option value="CZ">Česko</option>
              <option value="SK">Slovensko</option>
              <option value="PL">Polska</option>
              <option value="DE">Deutschland</option>
              <option value="AT">Österreich</option>
            </select>
          </label>
          <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
            <label className="field">
              {c.city[locale]}
              <input name="city" autoComplete="address-level2" required />
            </label>
            <label className="field">
              {c.zip[locale]}
              <input name="zip" autoComplete="postal-code" required />
            </label>
          </div>
          <label className="field">
            {c.street[locale]}
            <input name="street" autoComplete="street-address" required />
          </label>
        </fieldset>
        <div>
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            {c.pay[locale]}
          </button>
          {(tried || contentMode === "preview") && (
            <p role="status" className="mt-4 rounded-xl bg-blush px-4 py-3 text-sm">
              {c.notConnected[locale]}
            </p>
          )}
        </div>
      </form>

      <aside className="self-start rounded-[1.75rem] bg-husk p-7" aria-labelledby="summary">
        <h2 id="summary" className="text-h3">
          {c.summary[locale]}
        </h2>
        <ul className="mt-5 grid gap-3">
          {lines.map((l) => {
            const li = lineItem(l, currency);
            if (!li) return null;
            return (
              <li key={`${l.slug}-${l.variantId}`} className="flex justify-between gap-4">
                <span>
                  {li.product.name[locale]}, {li.variant.name[locale]} × {l.quantity}
                </span>
                <Price variant={li.variant} quantity={l.quantity} className="shrink-0 tabular-nums" />
              </li>
            );
          })}
        </ul>
        <div className="mt-5 flex items-baseline justify-between border-t border-line pt-4">
          <span>{copy.cart.subtotal[locale]}</span>
          <span className="text-2xl tabular-nums">{subtotal === undefined ? copy.product.unavailable[locale] : formatMoney(subtotal, currency, locale)}</span>
        </div>
        <Link href={pageHref(locale, "cart")} className="link mt-5 inline-block text-sm">
          {c.backToCart[locale]}
        </Link>
      </aside>
    </div>
  );
}
