import { CheckoutForm } from "@/components/commerce/CartViews";
import { copy } from "@/content/copy";
import { metadataFor, type LocaleProps } from "@/lib/page";

export const generateMetadata = metadataFor("checkout", "checkout/");

export default async function Checkout({ params }: LocaleProps) {
  const { locale } = await params;
  return (
    <div className="wrap pb-24 pt-14">
      <h1 className="text-h1">{copy.checkout.title[locale]}</h1>
      <CheckoutForm />
    </div>
  );
}
