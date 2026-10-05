/**
 * Legacy URL migration (Tilda → Next.js).
 *
 * Runs in middleware so every legacy URL resolves in ONE hop with a real 301
 * (`skipTrailingSlashRedirect` is on; slash normalisation happens here too).
 * Incoming query params (utm_*, gclid, fbclid, …) are always preserved.
 *
 * UA, RU and EN existed on the old site and keep their language on the new
 * one. CS is new and has no legacy URLs.
 */
import { products } from "@/content/products";
import { citySlugs } from "@/content/cities";
import type { Locale } from "./i18n";
import { cityHref, pageHref, productHref } from "./routes";

export type PublishState = {
  /** Benefits goes live only after claims have documentary evidence. */
  benefitsPublished: boolean;
  /** City slugs that have at least one verified store. */
  publishedCities: ReadonlySet<string>;
};

export type RedirectResult = { status: 301; location: string } | { status: 410 };

type Target = string | { gone: true };
const GONE: Target = { gone: true };

const LEGACY_LOCALES: Locale[] = ["ua", "en", "ru"];

/** Lowercase, no trailing slash, no duplicate slashes. "/" stays "/". */
export function normalizePath(pathname: string): string {
  const p = pathname.replace(/\/{2,}/g, "/").toLowerCase();
  return p.length > 1 ? p.replace(/\/+$/, "") : p;
}

export function buildLegacyMap(state: PublishState): Map<string, Target> {
  const map = new Map<string, Target>();
  const add = (from: string, to: Target) => map.set(normalizePath(from), to);

  add("/", pageHref("ua", "home"));

  for (const l of LEGACY_LOCALES) {
    add(`/${l}/buy`, pageHref(l, "shop"));
    add(`/${l}/buy_old`, pageHref(l, "shop"));
    add(`/${l}/shops`, pageHref(l, "whereToBuy"));
    add(`/${l}/shops_old`, pageHref(l, "whereToBuy"));
    add(`/${l}/try`, `${pageHref(l, "whereToBuy")}?type=horeca`);
    for (const slug of citySlugs) {
      add(
        `/${l}/shops/${slug}`,
        state.publishedCities.has(slug) ? cityHref(l, slug) : `${pageHref(l, "whereToBuy")}?city=${slug}`,
      );
    }
  }

  /* Old Tilda slugs still linked from the contacts footer */
  add("/ua_izumi", pageHref("ua", "home"));
  add("/ua_procompani", pageHref("ua", "about"));
  add("/ua_kontaktu", pageHref("ua", "contacts"));
  add("/ua_korusnivlastuvosti", state.benefitsPublished ? pageHref("ua", "benefits") : pageHref("ua", "tea"));
  add("/ua_oplata_ta_dostavka", pageHref("ua", "delivery"));
  add("/ua_kartka_tovaru", pageHref("ua", "shop"));
  add("/privacypolicy", pageHref("ua", "privacy"));

  /* Payment return URLs */
  add("/payment", pageHref("ua", "checkout"));
  add("/order/payed", "/ua/checkout/success/");
  add("/declinepay", "/ua/checkout/failed/");

  /* Test / orphan Tilda pages */
  add("/testhomepage_izumi_v1", GONE);
  add("/testcardproductizumi_v1", GONE);
  add("/page25206568.html", GONE);
  add("/page38355488.html", GONE);

  /* Products: every Tilda product URL → product page with the variant selected */
  for (const product of products) {
    for (const variant of product.variants) {
      for (const legacy of variant.legacyPaths) {
        const locale: Locale = legacy.locale === "root" ? "ua" : legacy.locale;
        add(legacy.path, productHref(locale, product.slug, variant.id));
      }
    }
  }

  return map;
}

/** Merge target params over incoming ones (target wins on conflicts like `pack`). */
function withQuery(target: string, incoming: URLSearchParams): string {
  const [path = target, query = ""] = target.split("?");
  const params = new URLSearchParams(incoming);
  new URLSearchParams(query).forEach((v, k) => params.set(k, v));
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

const looksLikeFile = (pathname: string) => /\.[a-z0-9]+$/i.test(pathname);

export function resolveRedirect(url: URL, map: Map<string, Target>): RedirectResult | null {
  const target = map.get(normalizePath(url.pathname));

  if (target !== undefined) {
    if (typeof target !== "string") return { status: 410 };
    return { status: 301, location: withQuery(target, url.searchParams) };
  }

  if (!url.pathname.endsWith("/") && !looksLikeFile(url.pathname)) {
    return { status: 301, location: withQuery(`${url.pathname}/`, url.searchParams) };
  }

  return null;
}
