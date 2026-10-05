"use client";

/**
 * Cart + currency state.
 *
 * Lines store only {slug, variantId, quantity}. Names and prices are always
 * read from the content layer, so a stale price saved in the browser can
 * never reach an order.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getProduct, getVariant } from "@/content/products";
import type { ProductSlug } from "@/content/types";
import { localeMeta, type Currency, type Locale } from "@/lib/i18n";
import { unitPrice } from "@/lib/content-guards";
import { toMajor, track, captureAttribution } from "@/lib/analytics";

export type CartLine = { slug: ProductSlug; variantId: string; quantity: number };

type Store = {
  locale: Locale;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  lines: CartLine[];
  count: number;
  subtotal: number | undefined;
  add: (line: CartLine) => void;
  setQuantity: (slug: ProductSlug, variantId: string, quantity: number) => void;
  remove: (slug: ProductSlug, variantId: string) => void;
  isOpen: boolean;
  open: (opener?: HTMLElement | null) => void;
  close: () => void;
};

const StoreContext = createContext<Store | null>(null);

const CART_KEY = "izumi_cart_v1";
const CURRENCY_KEY = "izumi_currency";
const MAX_QTY = 20;

function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function safeWrite(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked: cart lives for this page view only */
  }
}

export function lineItem(line: CartLine, currency: Currency) {
  const product = getProduct(line.slug);
  if (!product) return undefined;
  const variant = getVariant(product, line.variantId);
  const price = unitPrice(variant, currency);
  return { product, variant, price };
}

export function StoreProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(localeMeta[locale].defaultCurrency);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    const saved = safeRead<CartLine[]>(CART_KEY, []);
    setLines(saved.filter((l) => getProduct(l.slug)));
    const c = safeRead<Currency | null>(CURRENCY_KEY, null);
    if (c === "CZK" || c === "EUR") setCurrencyState(c);
    hydrated.current = true;
    captureAttribution(new URL(window.location.href));
  }, []);

  useEffect(() => {
    if (hydrated.current) safeWrite(CART_KEY, lines);
  }, [lines]);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    safeWrite(CURRENCY_KEY, c);
  }, []);

  const analyticsItem = useCallback(
    (line: CartLine) => {
      const li = lineItem(line, currency);
      if (!li) return undefined;
      return {
        item_id: li.variant.sku,
        item_name: li.product.name.en,
        item_variant: li.variant.id,
        price: toMajor(li.price ?? 0),
        quantity: line.quantity,
      };
    },
    [currency],
  );

  const add = useCallback(
    (line: CartLine) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.slug === line.slug && l.variantId === line.variantId);
        if (existing) {
          return prev.map((l) =>
            l === existing ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + line.quantity) } : l,
          );
        }
        return [...prev, { ...line, quantity: Math.min(MAX_QTY, line.quantity) }];
      });
      const item = analyticsItem(line);
      if (item) track("add_to_cart", { currency, value: item.price * item.quantity, items: [item] });
    },
    [analyticsItem, currency],
  );

  const setQuantity = useCallback((slug: ProductSlug, variantId: string, quantity: number) => {
    setLines((prev) =>
      prev.map((l) =>
        l.slug === slug && l.variantId === variantId ? { ...l, quantity: Math.max(1, Math.min(MAX_QTY, quantity)) } : l,
      ),
    );
  }, []);

  const remove = useCallback(
    (slug: ProductSlug, variantId: string) => {
      const line = lines.find((l) => l.slug === slug && l.variantId === variantId);
      const item = line && analyticsItem(line);
      if (item) track("remove_from_cart", { currency, value: item.price * item.quantity, items: [item] });
      setLines((prev) => prev.filter((l) => !(l.slug === slug && l.variantId === variantId)));
    },
    [lines, analyticsItem, currency],
  );

  const open = useCallback(
    (el?: HTMLElement | null) => {
      opener.current = el ?? (document.activeElement as HTMLElement | null);
      setOpen(true);
      const items = lines.map(analyticsItem).filter((x) => x !== undefined);
      track("view_cart", { currency, value: items.reduce((s, i) => s + i.price * i.quantity, 0), items });
    },
    [lines, analyticsItem, currency],
  );

  const close = useCallback(() => {
    setOpen(false);
    // Return focus to whatever opened the drawer.
    requestAnimationFrame(() => opener.current?.focus());
  }, []);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal: number | undefined = 0;
    for (const l of lines) {
      count += l.quantity;
      const li = lineItem(l, currency);
      if (li?.price === undefined) subtotal = undefined;
      else if (subtotal !== undefined) subtotal += li.price * l.quantity;
    }
    return { count, subtotal };
  }, [lines, currency]);

  const value = useMemo<Store>(
    () => ({ locale, currency, setCurrency, lines, count, subtotal, add, setQuantity, remove, isOpen, open, close }),
    [locale, currency, setCurrency, lines, count, subtotal, add, setQuantity, remove, isOpen, open, close],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
