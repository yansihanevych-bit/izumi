import Image from "next/image";
import Link from "next/link";
import { copy } from "@/content/copy";
import { images } from "@/content/products";
import { metadataFor, type LocaleProps } from "@/lib/page";
import { pageHref } from "@/lib/routes";

export const generateMetadata = metadataFor("tea", "tea/", images.cupTop.src);

const anchors = ["made-from", "process", "taste", "look", "caffeine"];

export default async function Tea({ params }: LocaleProps) {
  const { locale } = await params;
  const c = copy.tea;
  const asides = [images.granules, images.doyBack, null, images.cupTop, null];

  return (
    <>
      <section className="wrap grid items-center gap-10 pb-16 pt-14 lg:grid-cols-[1.2fr_1fr] lg:pt-20">
        <div>
          <h1 className="text-h1">{c.title[locale]}</h1>
          <p className="measure mt-6 text-lead text-muted">{c.lead[locale]}</p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <Image src={images.cupTop.src} alt={images.cupTop.alt[locale]} fill priority sizes="(min-width:1024px) 28rem, 90vw" className="object-contain" />
        </div>
      </section>

      <div className="wrap">
        {c.sections.map((s, i) => {
          const img = asides[i];
          return (
            <section key={anchors[i]} id={anchors[i]} className="grid scroll-mt-28 gap-6 border-t border-line py-12 md:grid-cols-[1fr_1.4fr_12rem] md:gap-10">
              <h2 className="text-h3">{s.title[locale]}</h2>
              <p className="measure text-lead">{s.body[locale]}</p>
              {img ? (
                <div className="relative hidden aspect-[4/5] overflow-hidden rounded-2xl bg-husk md:block">
                  <Image src={img.src} alt={img.alt[locale]} fill sizes="12rem" className={`object-contain ${img.src.includes("0005") ? "blend object-cover" : ""}`} />
                </div>
              ) : (
                <span className="hidden md:block" />
              )}
            </section>
          );
        })}
      </div>

      <section className="mt-12 bg-roast text-paper">
        <div className="wrap grid gap-8 py-20 md:grid-cols-[1fr_1.3fr]">
          <h2 className="text-h2">{c.whyTitle[locale]}</h2>
          <div>
            <p className="measure text-lead text-paper/85">{c.whyBody[locale]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={pageHref(locale, "shop")} className="btn bg-paper text-roast hover:bg-husk">
                {copy.home.shop[locale]}
              </Link>
              <Link href={pageHref(locale, "brewing")} className="btn border border-paper/30 text-paper hover:border-paper">
                {copy.home.ritualCta[locale]}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
