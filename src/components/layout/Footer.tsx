import Link from "next/link";
import { copy } from "@/content/copy";
import { organization } from "@/content/organization";
import { products } from "@/content/products";
import type { Locale } from "@/lib/i18n";
import { pageHref, productHref } from "@/lib/routes";
import { t } from "@/lib/t";

export function Footer({ locale }: { locale: Locale }) {
  const c = copy.nav;
  const cols = [
    {
      title: copy.footer.shop,
      links: [
        ...products.map((p) => [productHref(locale, p.slug), t(p.name, locale)] as const),
        [pageHref(locale, "shop"), c.allProducts[locale]] as const,
        [pageHref(locale, "whereToBuy"), c.whereToBuy[locale]] as const,
      ],
    },
    {
      title: copy.footer.learn,
      links: [
        [pageHref(locale, "tea"), c.whatIs[locale]] as const,
        [pageHref(locale, "brewing"), c.brewing[locale]] as const,
        [pageHref(locale, "about"), c.story[locale]] as const,
        [pageHref(locale, "reviews"), c.reviews[locale]] as const,
      ],
    },
    {
      title: copy.footer.help,
      links: [
        [pageHref(locale, "faq"), c.faq[locale]] as const,
        [pageHref(locale, "delivery"), c.delivery[locale]] as const,
        [pageHref(locale, "contacts"), c.contacts[locale]] as const,
        [pageHref(locale, "returns"), copy.legal.returns[locale]] as const,
        [pageHref(locale, "offer"), copy.legal.offer[locale]] as const,
        [pageHref(locale, "privacy"), copy.legal.privacy[locale]] as const,
      ],
    },
  ];

  return (
    <footer className="mt-auto bg-roast text-paper">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <p className="font-serif text-5xl font-semibold tracking-[0.14em]">IZUMI</p>
          <p className="mt-4 text-paper/75">{copy.footer.tagline[locale]}</p>
          <ul className="mt-6 grid gap-1 text-paper/85">
            <li>
              <a className="link" href={`mailto:${organization.email}`}>
                {organization.email}
              </a>
            </li>
            <li>
              <a className="link" href={`tel:${organization.phones[0]!.tel}`}>
                {organization.phones[0]!.display}
              </a>
            </li>
            <li>
              <a className="link" href={organization.instagram} rel="noopener" target="_blank">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        {cols.map((col) => (
          <nav key={col.title.en} aria-label={col.title[locale]}>
            <h2 className="font-sans text-sm font-medium text-paper/60">{col.title[locale]}</h2>
            <ul className="mt-4 grid gap-2.5">
              {col.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-paper/90 hover:text-paper hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="wrap flex flex-wrap justify-between gap-3 border-t border-paper/15 py-6 text-sm text-paper/55">
        <span>
          © {new Date().getFullYear()} IZUMI. {copy.footer.rights[locale]}
        </span>
      </div>
    </footer>
  );
}
