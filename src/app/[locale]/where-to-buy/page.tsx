import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CityFilter } from "@/components/content/CityFilter";
import { copy } from "@/content/copy";
import { organization } from "@/content/organization";
import { images } from "@/content/products";
import { metadataFor, type LocaleProps } from "@/lib/page";
import { pageHref } from "@/lib/routes";

export const generateMetadata = metadataFor("whereToBuy", "where-to-buy/");

export default async function WhereToBuy({ params }: LocaleProps) {
  const { locale } = await params;
  const c = copy.whereToBuy;
  return (
    <div className="wrap pb-24 pt-14 lg:pt-20">
      <h1 className="max-w-4xl text-h1">{c.title[locale]}</h1>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <section className="tone-blush grid gap-6 rounded-[1.75rem] p-8 sm:grid-cols-[1fr_9rem] sm:items-end">
          <div>
            <h2 className="text-h2">{c.onlineTitle[locale]}</h2>
            <p className="mt-4 max-w-sm text-lead">{c.onlineBody[locale]}</p>
            <Link href={pageHref(locale, "shop")} className="btn btn-primary mt-8">
              {copy.home.shop[locale]}
            </Link>
          </div>
          <div className="relative hidden aspect-[4/5] sm:block">
            <Image src={images.doyFront.src} alt="" fill sizes="9rem" className="object-contain" />
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-line p-8">
          <h2 className="text-h2">{c.offlineTitle[locale]}</h2>
          <p className="mt-4 max-w-md text-muted">{c.offlineBody[locale]}</p>
          <div className="mt-8">
            <Suspense>
              <CityFilter locale={locale} email={organization.email} />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  );
}
