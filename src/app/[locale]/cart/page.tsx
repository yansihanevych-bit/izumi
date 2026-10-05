import { CartPage } from "@/components/commerce/CartViews";
import { copy } from "@/content/copy";
import { metadataFor, type LocaleProps } from "@/lib/page";

export const generateMetadata = metadataFor("cart", "cart/");

export default async function Cart({ params }: LocaleProps) {
  const { locale } = await params;
  return (
    <div className="wrap pb-24 pt-14">
      <h1 className="text-h1">{copy.cart.title[locale]}</h1>
      <CartPage />
    </div>
  );
}
