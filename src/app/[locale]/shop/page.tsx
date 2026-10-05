import type { Metadata } from "next";
import { ShopGrid } from "@/components/commerce/ShopGrid";
import { copy, pageSeo } from "@/content/copy";
import type { Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/content/products";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, path: "shop/", ...pageSeo.shop, image: images.bothBoxes.src });
}

export default async function Shop({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="wrap pb-24 pt-14 lg:pt-20">
      <h1 className="text-h1">{copy.shop.title[locale]}</h1>
      <p className="measure mt-4 text-lead text-muted">{copy.shop.lead[locale]}</p>
      <div className="mt-10">
        <ShopGrid />
      </div>
    </div>
  );
}
