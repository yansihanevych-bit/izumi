import type { Metadata } from "next";
import { pageSeo } from "@/content/copy";
import type { PageKey } from "@/content/types";
import type { Locale } from "./i18n";
import { buildMetadata } from "./seo";

export type LocaleProps = { params: Promise<{ locale: Locale }> };

/** generateMetadata for a simple page keyed in pageSeo. */
export const metadataFor =
  (key: PageKey, path: string, image?: string) =>
  async ({ params }: LocaleProps): Promise<Metadata> => {
    const { locale } = await params;
    return buildMetadata({ locale, path, ...pageSeo[key], image });
  };
