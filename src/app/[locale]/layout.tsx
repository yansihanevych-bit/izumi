import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../globals.css";
import { StoreProvider } from "@/components/commerce/store";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PreviewNote } from "@/components/layout/PreviewNote";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@/components/seo/Analytics";
import { MotionRoot } from "@/lib/motion/MotionRoot";
import { Cursor } from "@/lib/motion/Cursor";
import { PageTransition } from "@/lib/motion/PageTransition";
import { copy } from "@/content/copy";
import { organization } from "@/content/organization";
import { contentMode, siteUrl } from "@/lib/env";
import { isLocale, localeMeta, locales, type Locale } from "@/lib/i18n";

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "IZUMI", template: "%s — IZUMI" },
  verification: { google: "LTCzYOyo8FGmfhvlHhQ9QN7Mrz_5LG-tzqSV4HPIaNs" },
};

export const viewport: Viewport = { themeColor: "#f3ede3" };

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <html lang={localeMeta[locale].htmlLang}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-roast px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {copy.skip[locale]}
        </a>
        <StoreProvider locale={locale}>
          <Header locale={locale} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
          <CartDrawer />
          {contentMode === "preview" && (
            <PreviewNote text={copy.preview[locale]} closeLabel={copy.nav.close[locale]} />
          )}
        </StoreProvider>
        <div className="grain" aria-hidden="true" />
        <MotionRoot />
        <PageTransition />
        <Cursor labels={{ view: copy.cursor.view[locale], explore: copy.cursor.explore[locale], play: copy.cursor.play[locale] }} />
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "IZUMI",
              url: `${siteUrl}/${locale}/`,
              email: organization.email,
              telephone: organization.phones[0]!.tel,
              sameAs: [organization.instagram],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "IZUMI",
              url: `${siteUrl}/${locale}/`,
              inLanguage: localeMeta[locale].htmlLang,
            },
          ]}
        />
        <Analytics />
      </body>
    </html>
  );
}
