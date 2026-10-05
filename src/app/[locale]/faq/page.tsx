import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { copy } from "@/content/copy";
import { faq, faqCategories } from "@/content/faq";
import { contentMode } from "@/lib/env";
import { metadataFor, type LocaleProps } from "@/lib/page";
import { pageHref } from "@/lib/routes";

export const generateMetadata = metadataFor("faq", "faq/");

export default async function Faq({ params }: LocaleProps) {
  const { locale } = await params;
  // Unconfirmed answers appear only in preview, and never in structured data.
  const visible = faq.filter((f) => f.status === "confirmed" || contentMode === "preview");
  const confirmedOnly = faq.filter((f) => f.status === "confirmed");

  return (
    <div className="wrap pb-24 pt-14 lg:pt-20">
      <h1 className="text-h1">{copy.faq.title[locale]}</h1>

      <div className="mt-14 grid gap-14">
        {faqCategories.map((cat) => {
          const items = visible.filter((f) => f.category === cat.id);
          if (!items.length) return null;
          return (
            <section key={cat.id} className="grid gap-6 lg:grid-cols-[16rem_1fr]" aria-labelledby={`faq-${cat.id}`}>
              <h2 id={`faq-${cat.id}`} className="text-h3">
                {cat.label[locale]}
              </h2>
              <div className="border-t border-roast">
                {items.map((f) => (
                  <details key={f.id} id={f.id} className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.15rem] font-medium [&::-webkit-details-marker]:hidden">
                      {f.question[locale]}
                      <span aria-hidden="true" className="mt-1 text-xl leading-none text-grain transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="measure pb-6 text-muted">
                      {f.answer[locale]}
                      {f.status === "todo" && <span className="ml-2 rounded bg-blush px-1.5 py-0.5 text-xs text-roast">TODO</span>}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-20 flex flex-wrap items-center gap-6 border-t border-line pt-10">
        <p className="font-serif text-h3">{copy.faq.more[locale]}</p>
        <Link href={pageHref(locale, "contacts")} className="btn btn-quiet">
          {copy.nav.contacts[locale]}
        </Link>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: confirmedOnly.map((f) => ({
            "@type": "Question",
            name: f.question[locale],
            acceptedAnswer: { "@type": "Answer", text: f.answer[locale] },
          })),
        }}
      />
    </div>
  );
}
