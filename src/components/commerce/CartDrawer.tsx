"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { lineItem, useStore } from "./store";
import { Price } from "./Price";
import { QuantityStepper } from "./QuantityStepper";
import { Packshot } from "@/components/media/Packshot";
import { copy } from "@/content/copy";
import { formatMoney } from "@/lib/content-guards";
import { pageHref, productHref } from "@/lib/routes";

/**
 * Cart drawer on a native <dialog>: the browser handles the focus trap, Esc,
 * and making the rest of the page inert. Side panel on desktop, bottom sheet
 * on mobile.
 */
export function CartDrawer() {
  const { locale, currency, lines, subtotal, isOpen, close, setQuantity, remove } = useStore();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      onClose={close}
      onClick={(e) => e.target === ref.current && close()}
      aria-labelledby="cart-title"
      className="cart-drawer m-0 ml-auto h-full max-h-none w-full max-w-md flex-col bg-paper p-0 text-roast backdrop:bg-ink/40 open:flex max-sm:mt-auto max-sm:h-[88dvh] max-sm:max-w-none max-sm:rounded-t-3xl"
    >
      <div className="flex items-center justify-between border-b border-line px-6 py-5">
        <h2 id="cart-title" className="text-h3">
          {copy.cart.title[locale]}
        </h2>
        <button type="button" onClick={close} className="btn btn-quiet min-h-10 px-4 text-sm">
          {copy.nav.close[locale]}
        </button>
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-start justify-center gap-6 px-6">
          <p className="measure text-muted">{copy.cart.empty[locale]}</p>
          <Link href={pageHref(locale, "shop")} onClick={close} className="btn btn-primary">
            {copy.cart.toShop[locale]}
          </Link>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
            {lines.map((line) => {
              const li = lineItem(line, currency);
              if (!li) return null;
              return (
                <li key={`${line.slug}-${line.variantId}`} className="flex gap-4 py-5">
                  <Link
                    href={productHref(locale, li.product.slug, li.variant.id)}
                    onClick={close}
                    className={`tone-${li.product.tone} relative block h-24 w-20 shrink-0 overflow-hidden rounded-xl p-1`}
                  >
                    <Packshot image={li.variant.image} locale={locale} sizes="80px" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium leading-tight">{li.product.name[locale]}</p>
                        <p className="text-sm text-muted">{li.variant.name[locale]}</p>
                      </div>
                      <Price variant={li.variant} quantity={line.quantity} className="shrink-0 tabular-nums" />
                    </div>
                    <div className="flex items-center justify-between">
                      <QuantityStepper
                        size="sm"
                        locale={locale}
                        value={line.quantity}
                        onChange={(n) => setQuantity(line.slug, line.variantId, n)}
                      />
                      <button
                        type="button"
                        className="link text-sm text-muted"
                        onClick={() => remove(line.slug, line.variantId)}
                      >
                        {copy.cart.remove[locale]}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-line px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span>{copy.cart.subtotal[locale]}</span>
              <span className="text-xl font-medium tabular-nums">
                {subtotal === undefined ? copy.product.unavailable[locale] : formatMoney(subtotal, currency, locale)}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">{copy.cart.shippingNote[locale]}</p>
            <Link href={pageHref(locale, "checkout")} onClick={close} className="btn btn-primary mt-5 w-full">
              {copy.cart.checkout[locale]}
            </Link>
          </div>
        </>
      )}
    </dialog>
  );
}
