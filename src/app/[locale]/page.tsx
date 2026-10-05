import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Hero } from "@/components/home/Hero";
import { TeaStory } from "@/components/home/TeaStory";
import { BrewScene } from "@/components/home/BrewScene";
import { BuyScene, IntroScene, ProofScene, StoryScene, WhyScene } from "@/components/home/HomeScenes";
import { ArcArrow } from "@/components/ui/ArcArrow";
import { copy, pageSeo } from "@/content/copy";
import { images, products } from "@/content/products";
import { featuredReviewIds, videoReviews } from "@/content/reviews";
import type { Locale } from "@/lib/i18n";
import { pageHref } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, path: "", ...pageSeo.home, absoluteTitle: true, image: images.doyFront.src });
}

/**
 * Home: nine scenes, each with its own motion identity.
 *   hero (assembling wordmark, parting objects) → intro (oval mask, rides over hero)
 *   → tea story (pinned particle journey) → brew (pinned kinetic brewing)
 *   → why (horizontal track) → products (tilt cards) → story (crop opens to full bleed)
 *   → social proof (velocity marquee, masked portraits) → where to buy (parallax words)
 */
export default async function Home({ params }: Props) {
  const { locale } = await params;
  const featured = featuredReviewIds.map((id) => videoReviews.find((r) => r.id === id)!);

  return (
    <>
      <Hero locale={locale} />
      <IntroScene locale={locale} />
      <TeaStory locale={locale} />
      <BrewScene locale={locale} />
      <WhyScene locale={locale} />

      <section className="relative z-10 bg-paper pb-24 pt-8 lg:pb-32" aria-labelledby="home-products">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="home-products" className="text-h2">
              {copy.home.productsTitle[locale]}
            </h2>
            <Link href={pageHref(locale, "shop")} className="link inline-flex items-center gap-2 font-medium">
              {copy.nav.allProducts[locale]}
              <ArcArrow />
            </Link>
          </div>
          <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <StoryScene locale={locale} />
      <ProofScene locale={locale} people={videoReviews} featured={featured} />
      <BuyScene locale={locale} />
    </>
  );
}
