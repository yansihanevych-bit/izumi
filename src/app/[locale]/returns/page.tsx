import { LegalPage } from "@/components/content/LegalPage";
import { copy } from "@/content/copy";
import { metadataFor, type LocaleProps } from "@/lib/page";

export const generateMetadata = metadataFor("returns", "returns/");

export default async function Page({ params }: LocaleProps) {
  const { locale } = await params;
  return <LegalPage locale={locale} title={copy.legal.returns} />;
}
