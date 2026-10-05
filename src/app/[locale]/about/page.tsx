import Image from "next/image";
import Link from "next/link";
import { copy } from "@/content/copy";
import { images } from "@/content/products";
import { contentMode } from "@/lib/env";
import { metadataFor, type LocaleProps } from "@/lib/page";
import { pageHref } from "@/lib/routes";

export const generateMetadata = metadataFor("about", "about/", images.lifestyle.src);

export default async function About({ params }: LocaleProps) {
  const { locale } = await params;
  const c = copy.about;
  const s = c.sections;
  const chapters = [
    { ...s.origin, img: images.granules },
    { ...s.product, img: images.doyBack },
    { ...s.process, img: images.classicSticks },
    { ...s.philosophy, img: null },
    { ...s.today, img: images.bothBoxes },
  ];

  return (
    <>
      <section className="wrap pb-16 pt-14 lg:pt-20">
        <h1 className="max-w-4xl text-h1">{c.title[locale]}</h1>
        <p className="measure mt-6 text-lead text-muted">{c.lead[locale]}</p>
        {contentMode === "preview" && (
          <p className="measure mt-8 rounded-xl border border-dashed border-grain px-4 py-3 text-sm text-muted">{c.foundingTodo[locale]}</p>
        )}
      </section>

      <div className="relative aspect-[1680/432] w-full overflow-hidden bg-sand max-md:aspect-[16/9]">
        <Image src={images.lifestyle.src} alt={images.lifestyle.alt[locale]} fill priority sizes="100vw" className="object-cover object-right" />
      </div>

      <ol className="wrap py-16 lg:py-24">
        {chapters.map((ch, i) => (
          <li key={ch.title.en} className="grid gap-8 border-t border-line py-12 md:grid-cols-[4rem_1fr_1.2fr_14rem] md:gap-10">
            <span className="font-serif text-2xl text-grain tabular-nums" aria-hidden="true">
              {i + 1}
            </span>
            <h2 className="text-h2">{ch.title[locale]}</h2>
            <p className="measure text-lead">{ch.body[locale]}</p>
            {ch.img ? (
              <div className="relative aspect-[4/5] w-40 overflow-hidden rounded-2xl bg-husk md:w-full">
                <Image src={ch.img.src} alt={ch.img.alt[locale]} fill sizes="14rem" className={`object-contain ${ch.img.src.includes("0005") ? "blend object-cover" : ""}`} />
              </div>
            ) : (
              <span className="hidden md:block" />
            )}
          </li>
        ))}
      </ol>

      <section className="bg-husk">
        <div className="wrap flex flex-wrap items-center justify-between gap-6 py-14">
          <p className="font-serif text-h3">{copy.home.proofTitle[locale]}</p>
          <Link href={pageHref(locale, "reviews")} className="btn btn-quiet">
            {copy.home.proofCta[locale]}
          </Link>
        </div>
      </section>
    </>
  );
}
