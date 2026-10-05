import Link from "next/link";
import { copy } from "@/content/copy";
import { metadataFor, type LocaleProps } from "@/lib/page";
import { pageHref } from "@/lib/routes";

export const generateMetadata = metadataFor("checkout", "checkout/failed/");

export default async function Failed({ params }: LocaleProps) {
  const { locale } = await params;
  return (
    <div className="wrap pb-28 pt-20">
      <h1 className="text-h1">{copy.checkout.failedTitle[locale]}</h1>
      <p className="measure mt-5 text-lead text-muted">{copy.checkout.failedBody[locale]}</p>
      <Link href={pageHref(locale, "checkout")} className="btn btn-primary mt-10">
        {copy.checkout.pay[locale]}
      </Link>
    </div>
  );
}
