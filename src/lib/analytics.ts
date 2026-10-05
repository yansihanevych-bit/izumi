/**
 * Analytics: GTM (GTM-KB2GCNL) is the single entry point. Meta Pixel
 * (1085364578468801) is configured inside GTM, not hardcoded, so both
 * platforms read the same dataLayer events.
 *
 * Event names and item shape follow GA4 ecommerce. Events are always pushed
 * to dataLayer; the GTM container itself only loads when analyticsEnabled.
 */
import type { Currency } from "./i18n";
import { analyticsEnabled } from "./env";

export const GTM_ID = "GTM-KB2GCNL";

export type AnalyticsItem = {
  item_id: string; // Tilda SKU, keeps continuity with historical data
  item_name: string;
  item_variant: string;
  price: number; // major units of `currency`, e.g. 189 or 7.9
  quantity: number;
  item_list_name?: string;
  index?: number;
};

export type EcommerceEvent =
  | "view_item_list"
  | "select_item"
  | "view_item"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "purchase";

type Payload = {
  currency: Currency;
  value: number;
  items: AnalyticsItem[];
  transaction_id?: string; // purchase only
  shipping?: number;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const toMajor = (minor: number) => minor / 100;

export { analyticsEnabled };

export function track(event: EcommerceEvent, payload: Payload) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  // GA4 recommends clearing the previous ecommerce object first.
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({ event, ecommerce: payload, attribution: readAttribution() });
}

/* ------------------------------------------------------------------ */
/* Attribution: utm_*, gclid, fbclid survive navigation and checkout   */
/* ------------------------------------------------------------------ */

const ATTR_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

export type Attribution = Partial<Record<(typeof ATTR_KEYS)[number], string>> & {
  landing_page?: string;
  captured_at?: string;
};

const FIRST = "izumi_attr_first";
const LAST = "izumi_attr_last";
const MAX_AGE_DAYS = 90;

/** Call once per page load (from the root layout client component). */
export function captureAttribution(url: URL) {
  const found: Attribution = {};
  for (const k of ATTR_KEYS) {
    const v = url.searchParams.get(k);
    if (v) found[k] = v;
  }
  if (Object.keys(found).length === 0) return;

  found.landing_page = url.pathname;
  found.captured_at = new Date().toISOString();

  if (!readCookie(FIRST)) writeCookie(FIRST, found); // first touch never overwritten
  writeCookie(LAST, found); // last touch always updated
}

export function readAttribution(): { first?: Attribution; last?: Attribution } {
  return { first: readCookie(FIRST), last: readCookie(LAST) };
}

function writeCookie(name: string, value: Attribution) {
  const maxAge = MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${maxAge}; Path=/; SameSite=Lax; Secure`;
}

function readCookie(name: string): Attribution | undefined {
  if (typeof document === "undefined") return undefined;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${name}=`))
    ?.slice(name.length + 1);
  if (!raw) return undefined;
  try {
    return JSON.parse(decodeURIComponent(raw)) as Attribution;
  } catch {
    return undefined;
  }
}
