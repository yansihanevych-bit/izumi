import { copy } from "@/content/copy";
import { organization } from "@/content/organization";
import type { Localized } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/** Legal documents are not written yet for CZ/EU sales; pages stay noindex until they are. */
export function LegalPage({ locale, title }: { locale: Locale; title: Localized }) {
  return (
    <div className="wrap pb-24 pt-14 lg:pt-20">
      <h1 className="text-h1">{title[locale]}</h1>
      <p className="measure mt-6 text-lead">{copy.legal.pending[locale]}</p>
      <p className="mt-8 text-muted">
        <a className="link text-roast" href={`mailto:${organization.email}`}>
          {organization.email}
        </a>
      </p>
    </div>
  );
}
