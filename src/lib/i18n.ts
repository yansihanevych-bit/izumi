/**
 * Locales: ua, cs, ru, en.
 *
 * URL segment `ua` is kept from the current site (it is indexed), but the
 * language tag is `uk`: `ua` is a country code, not a language code.
 * Czech uses the correct language code `cs` in the URL.
 */
export const locales = ["ua", "cs", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ua";

export type Currency = "CZK" | "EUR";
export const currencies: readonly Currency[] = ["CZK", "EUR"];

export const localeMeta: Record<
  Locale,
  {
    htmlLang: string;
    hreflang: string;
    ogLocale: string;
    label: string;
    name: string;
    numberLocale: string;
    defaultCurrency: Currency;
  }
> = {
  ua: { htmlLang: "uk", hreflang: "uk", ogLocale: "uk_UA", label: "UA", name: "Українська", numberLocale: "uk-UA", defaultCurrency: "CZK" },
  cs: { htmlLang: "cs", hreflang: "cs", ogLocale: "cs_CZ", label: "CS", name: "Čeština", numberLocale: "cs-CZ", defaultCurrency: "CZK" },
  ru: { htmlLang: "ru", hreflang: "ru", ogLocale: "ru_RU", label: "RU", name: "Русский", numberLocale: "ru-RU", defaultCurrency: "CZK" },
  en: { htmlLang: "en", hreflang: "en", ogLocale: "en_US", label: "EN", name: "English", numberLocale: "en-GB", defaultCurrency: "EUR" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
