import Link from "next/link";
import { copy } from "@/content/copy";
import { organization } from "@/content/organization";
import { metadataFor, type LocaleProps } from "@/lib/page";
import { pageHref } from "@/lib/routes";

export const generateMetadata = metadataFor("delivery", "delivery/");

export default async function Delivery({ params }: LocaleProps) {
  const { locale } = await params;
  const c = copy.delivery;
  return (
    <div className="wrap pb-24 pt-14 lg:pt-20">
      <h1 className="text-h1">{c.title[locale]}</h1>
      <p className="measure mt-6 text-lead">{c.body[locale]}</p>
      <p className="mt-10 text-muted">
        {c.questions[locale]}{" "}
        <a className="link text-roast" href={`mailto:${organization.email}`}>
          {organization.email}
        </a>
      </p>
      <Link href={pageHref(locale, "faq")} className="btn btn-quiet mt-10">
        {copy.nav.faq[locale]}
      </Link>
    </div>
  );
}
