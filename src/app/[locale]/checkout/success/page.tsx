import Link from "next/link";
import { copy } from "@/content/copy";
import { metadataFor, type LocaleProps } from "@/lib/page";
import { pageHref } from "@/lib/routes";

export const generateMetadata = metadataFor("checkout", "checkout/success/");

export default async function Success({ params }: LocaleProps) {
  const { locale } = await params;
  return (
    <div className="wrap pb-28 pt-20">
      <h1 className="text-h1">{copy.checkout.successTitle[locale]}</h1>
      <p className="measure mt-5 text-lead text-muted">{copy.checkout.successBody[locale]}</p>
      <Link href={pageHref(locale, "home")} className="btn btn-quiet mt-10">
        {copy.nav.home[locale]}
      </Link>
    </div>
  );
}
