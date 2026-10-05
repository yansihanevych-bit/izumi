import Link from "next/link";
import type { Product } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { productHref } from "@/lib/routes";
import { Packshot } from "@/components/media/Packshot";
import { FromPrice } from "@/components/commerce/Price";
import { QuickAdd } from "@/components/commerce/QuickAdd";
import { ArcArrow } from "@/components/ui/ArcArrow";
import { Tilt } from "@/lib/motion/Tilt";
import { copy } from "@/content/copy";

/**
 * The panel takes the colour of the product's own packaging (blush Classic,
 * teal Ginger, sand for sets). On desktop the card tilts toward the pointer,
 * a soft light follows it, and the pack lifts out past the card's top edge.
 */
export function ProductCard({ product, locale, priority }: { product: Product; locale: Locale; priority?: boolean }) {
  const href = productHref(locale, product.slug);
  return (
    <article className="product-card group flex flex-col">
      <Tilt max={6} className="relative">
        <Link
          href={href}
          data-cursor="explore"
          className={`tone-${product.tone} card-panel relative block aspect-[4/5] rounded-[1.75rem]`}
        >
          <span aria-hidden="true" className="card-light absolute inset-0 rounded-[1.75rem]" />
          <span data-depth="1.8" className="absolute inset-[8%] block transition-[scale,translate] duration-700 ease-[var(--ease-out-quint)] group-hover:-translate-y-[9%] group-hover:scale-[1.1] group-hover:-rotate-3">
            <Packshot
              image={product.gallery[0]!}
              locale={locale}
              priority={priority}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className="drop-shadow-[0_26px_30px_rgb(51_36_26/0.18)] transition-[filter] duration-700 group-hover:drop-shadow-[0_40px_40px_rgb(51_36_26/0.3)]"
            />
          </span>
        </Link>
      </Tilt>
      <div data-reveal="meta" className="mt-5 flex flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-h3" data-split-skip>
            <Link href={href} className="hover:text-spring">
              {product.name[locale]}
            </Link>
          </h3>
          <FromPrice variants={product.variants} className="shrink-0 tabular-nums" />
        </div>
        <p className="mt-2 text-muted">{product.shortDescription[locale]}</p>
        <p className="mt-1 text-sm text-muted">
          {product.variants.length} {copy.shop.packs[locale]}
        </p>
        <div className="mt-5 flex items-center gap-3">
          <QuickAdd slug={product.slug} />
          <Link href={href} className="btn min-h-11 gap-2 px-3 text-sm">
            {copy.product.view[locale]}
            <ArcArrow />
          </Link>
        </div>
      </div>
    </article>
  );
}
