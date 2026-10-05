import type { Localized } from "@/content/types";
import type { Locale } from "./i18n";

/** Pick the string for the current locale. */
export const t = <T,>(value: Localized<T>, locale: Locale): T => value[locale];
