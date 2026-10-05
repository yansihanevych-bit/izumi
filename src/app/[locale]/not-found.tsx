"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { copy } from "@/content/copy";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { pageHref } from "@/lib/routes";

export default function NotFound() {
  const seg = usePathname()?.split("/")[1] ?? "";
  const locale = isLocale(seg) ? seg : defaultLocale;
  return (
    <div className="wrap pb-28 pt-20">
      <h1 className="text-h1">{copy.notFound.title[locale]}</h1>
      <p className="measure mt-5 text-lead text-muted">{copy.notFound.body[locale]}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href={pageHref(locale, "shop")} className="btn btn-primary">
          {copy.nav.shop[locale]}
        </Link>
        <Link href={pageHref(locale, "home")} className="btn btn-quiet">
          {copy.nav.home[locale]}
        </Link>
      </div>
    </div>
  );
}
