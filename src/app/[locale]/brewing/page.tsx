import Image from "next/image";
import Link from "next/link";
import { copy } from "@/content/copy";
import { brewing } from "@/content/facts";
import { images } from "@/content/products";
import { reveal } from "@/lib/content-guards";
import { metadataFor, type LocaleProps } from "@/lib/page";
import { pageHref } from "@/lib/routes";

export const generateMetadata = metadataFor("brewing", "brewing/", images.spoon.src);

export default async function Brewing({ params }: LocaleProps) {
  const { locale } = await params;
  const c = copy.brewing;
  const p = c.params;
  const dose = reveal(brewing.doseGrams);
  const temp = reveal(brewing.temperatureC);

  const glance: [string, string][] = [
    [`${dose?.min}–${dose?.max} ${copy.product.grams[locale]}`, p.dose[locale]],
    [`${reveal(brewing.waterMl)} ${p.ml[locale]}`, p.water[locale]],
    [`${temp?.min}–${temp?.max} °C`, p.temp[locale]],
    [`${reveal(brewing.steepMinutes)} ${p.min[locale]}`, p.time[locale]],
    [`${p.upTo[locale]} ${reveal(brewing.maxInfusions)}`, p.brews[locale]],
  ];

  return (
    <>
      <section className="wrap pb-12 pt-14 lg:pt-20">
        <h1 className="text-h1">{c.title[locale]}</h1>
        <p className="measure mt-6 text-lead text-muted">{c.lead[locale]}</p>

        <h2 className="sr-only">{c.paramsTitle[locale]}</h2>
        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
          {glance.map(([v, label]) => (
            <div key={label} className="bg-paper px-5 py-6">
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="block font-serif text-[clamp(2rem,3.4vw,2.9rem)] leading-none">{v}</span>
                <span className="mt-2 block text-sm text-muted">{label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap grid gap-12 pb-24 pt-8 lg:grid-cols-[1.3fr_1fr]">
        <ol className="grid gap-0">
          {c.steps.map((s, i) => (
            <li key={s.title.en} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line py-8">
              <span className="font-serif text-[2.6rem] leading-none text-grain tabular-nums" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="text-h3">{s.title[locale]}</h3>
                <p className="measure mt-2 text-muted">{s.body[locale]}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="relative hidden lg:block">
          <div className="sticky top-28">
            <div className="relative aspect-square w-full">
              <Image src={images.cupTop.src} alt={images.cupTop.alt[locale]} fill sizes="34vw" className="object-contain" />
            </div>
            <div className="relative -mt-16 ml-[30%] w-[70%]">
              <Image src={images.spoon.src} alt={images.spoon.alt[locale]} width={images.spoon.width} height={images.spoon.height} sizes="24vw" className="h-auto w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap flex flex-wrap items-center justify-between gap-6 py-14">
          <p className="font-serif text-h3">{copy.home.productsTitle[locale]}</p>
          <Link href={pageHref(locale, "shop")} className="btn btn-primary">
            {copy.home.shop[locale]}
          </Link>
        </div>
      </section>
    </>
  );
}
