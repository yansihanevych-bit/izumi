import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductExperience } from "@/components/commerce/ProductExperience";
import { ProductCard } from "@/components/commerce/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { copy } from "@/content/copy";
import { brewing } from "@/content/facts";
import { getProduct, products } from "@/content/products";
import { reveal } from "@/lib/content-guards";
import { siteUrl } from "@/lib/env";
import { locales, type Locale } from "@/lib/i18n";
import { pageHref, productHref } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale; product: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => locales.flatMap((locale) => products.map((p) => ({ locale, product: p.slug })));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, product: slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return buildMetadata({ locale, path: `shop/${p.slug}/`, ...p.seo, image: p.gallery[0]!.src, absoluteTitle: true });
}

export default async function ProductPage({ params }: Props) {
  const { locale, product: slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const c = copy.product;

  const b = brewing;
  const brewingText = `${reveal(b.doseGrams)?.min}–${reveal(b.doseGrams)?.max} ${c.grams[locale]}, ${reveal(b.waterMl)} ${copy.brewing.params.ml[locale]}, ${reveal(b.temperatureC)?.min}–${reveal(b.temperatureC)?.max} °C, ${reveal(b.steepMinutes)} ${copy.brewing.params.min[locale]}`;

  const details: [string, string | undefined][] = [
    [c.taste[locale], reveal(product.taste)?.[locale]],
    [c.aroma[locale], reveal(product.aroma)?.[locale]],
    [c.ingredients[locale], reveal(product.ingredients)?.[locale]],
    [c.brewing[locale], product.kind === "tea" ? brewingText : undefined],
  ];

  const url = `${siteUrl}${productHref(locale, product.slug)}`;

  return (
    <div className="wrap pb-24 pt-8 lg:pt-12">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href={pageHref(locale, "home")} className="hover:text-roast">
              {copy.nav.home[locale]}
            </Link>
            <span aria-hidden="true" className="ml-2">/</span>
          </li>
          <li>
            <Link href={pageHref(locale, "shop")} className="hover:text-roast">
              {copy.nav.shop[locale]}
            </Link>
            <span aria-hidden="true" className="ml-2">/</span>
          </li>
          <li aria-current="page" className="text-roast">
            {product.name[locale]}
          </li>
        </ol>
      </nav>

      <Suspense>
        <ProductExperience slug={product.slug} />
      </Suspense>

      <section className="mt-24 grid gap-12 border-t border-roast pt-10 lg:grid-cols-[1fr_1.25fr]">
        <div>
          <h2 className="text-h2">{c.details[locale]}</h2>
          <p className="measure mt-6 text-lead">{product.description[locale]}</p>
        </div>
        <dl className="grid content-start sm:grid-cols-2">
          {details
            .filter((d): d is [string, string] => Boolean(d[1]))
            .map(([k, v]) => (
              <div key={k} className="border-t border-line py-5 sm:pr-8">
                <dt className="text-sm text-muted">{k}</dt>
                <dd className="mt-1 font-serif text-[1.6rem] leading-snug">{v}</dd>
              </div>
            ))}
        </dl>
      </section>

      <section className={`tone-${product.tone} mt-20 rounded-[2rem] px-[clamp(1.25rem,5vw,4rem)] py-14`}>
        <h2 className="text-h3">{c.why[locale]}</h2>
        <p className="mt-4 max-w-3xl font-serif text-[clamp(1.6rem,2.8vw,2.5rem)] leading-snug">{product.story[locale]}</p>
      </section>

      <section className="mt-24" aria-labelledby="related">
        <h2 id="related" className="text-h2">
          {c.related[locale]}
        </h2>
        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {product.related.map((s) => (
            <ProductCard key={s} product={getProduct(s)!} locale={locale} />
          ))}
        </div>
      </section>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name[locale],
            description: product.description[locale],
            image: product.gallery.map((g) => g.src),
            brand: { "@type": "Brand", name: "IZUMI" },
            sku: product.variants[0]!.sku,
            url,
            // Offers are emitted only for confirmed prices, never for TODO(client) values.
            ...(() => {
              const offers = product.variants
                .filter((v) => v.price.status === "confirmed")
                .flatMap((v) =>
                  (["CZK", "EUR"] as const).map((cur) => ({
                    "@type": "Offer",
                    sku: v.sku,
                    priceCurrency: cur,
                    price: ((v.price.status === "confirmed" ? v.price.value[cur] : 0) / 100).toFixed(2),
                    url: `${url}?pack=${v.id}`,
                  })),
                );
              return offers.length ? { offers } : {};
            })(),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: copy.nav.home[locale], item: `${siteUrl}${pageHref(locale, "home")}` },
              { "@type": "ListItem", position: 2, name: copy.nav.shop[locale], item: `${siteUrl}${pageHref(locale, "shop")}` },
              { "@type": "ListItem", position: 3, name: product.name[locale], item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
