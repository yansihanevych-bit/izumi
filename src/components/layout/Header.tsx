"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { useStore } from "@/components/commerce/store";
import { copy } from "@/content/copy";
import { images, products } from "@/content/products";
import { currencies, localeMeta, locales, type Locale } from "@/lib/i18n";
import { pageHref, productHref } from "@/lib/routes";
import { loadMotion, prefersReducedMotion } from "@/lib/motion/core";

type Panel = "shop" | "tea" | "lang" | null;

/** Same page in another language. */
function switchLocalePath(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  parts[1] = to;
  return parts.join("/") || `/${to}/`;
}

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}/`;
  const { count, open: openCart } = useStore();
  const [panel, setPanel] = useState<Panel>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const shopId = useId();
  const teaId = useId();
  const langId = useId();

  // Close any panel on route change, Esc, or click/focus outside.
  useEffect(() => setPanel(null), [pathname]);
  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    const onDown = (e: Event) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setPanel(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("focusin", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("focusin", onDown);
    };
  }, [panel]);

  // Transparent over the home hero; a compact floating bar once the page scrolls.
  const isHome = pathname === `/${locale}/` || pathname === `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
  const floating = scrolled || panel === "shop" || panel === "tea";

  // Mega menu: height + staggered items via GSAP (instant under reduced motion).
  const shopRef = useRef<HTMLDivElement>(null);
  const teaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const panes = [
      [shopRef.current, panel === "shop"],
      [teaRef.current, panel === "tea"],
    ] as const;
    if (prefersReducedMotion()) {
      panes.forEach(([el, open]) => {
        if (!el) return;
        el.style.height = open ? "auto" : "0px";
        el.inert = !open;
      });
      return;
    }
    loadMotion().then(({ gsap }) => {
      panes.forEach(([el, open]) => {
        if (!el) return;
        el.inert = !open;
        const items = el.querySelectorAll("[data-mm-item]");
        if (open) {
          gsap.to(el, { height: "auto", duration: 0.6, ease: "expo.out" });
          gsap.fromTo(items, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "expo.out", delay: 0.08 });
          gsap.fromTo(el.querySelectorAll("[data-mm-img]"), { scale: 0.6, rotate: -12 }, { scale: 1, rotate: 0, duration: 0.9, stagger: 0.06, ease: "expo.out", delay: 0.12 });
        } else {
          gsap.to(el, { height: 0, duration: 0.4, ease: "expo.inOut" });
        }
      });
    });
  }, [panel]);

  // Cart count bumps when it changes.
  const [bumpKey, setBumpKey] = useState(0);
  const prevCount = useRef(count);
  useEffect(() => {
    if (count !== prevCount.current) setBumpKey((k) => k + 1);
    prevCount.current = count;
  }, [count]);

  const toggle = (p: Panel) => setPanel((cur) => (cur === p ? null : p));
  const c = copy.nav;

  return (
    <>
    {/* Spacer: the bar is fixed, so inner pages reserve its height; the home hero sits underneath it. */}
    {!isHome && <div aria-hidden="true" className="h-16 lg:h-[4.5rem]" />}
    <header className="fixed inset-x-0 top-[var(--banner-h,0px)] z-40 transition-[top] duration-500">
      <div
        ref={barRef}
        className={`mx-auto transition-all duration-500 ease-[var(--ease-out-quint)] ${
          floating
            ? "mt-2 w-[calc(100%-1rem)] max-w-[86rem] rounded-[1.6rem] border border-line bg-paper/80 shadow-[0_18px_50px_-30px_rgb(31_27_23/0.55)] backdrop-blur-xl lg:mt-3"
            : `w-full rounded-none border border-transparent ${isHome ? "bg-transparent" : "bg-paper"}`
        }`}
      >
        <div className={`wrap flex items-center gap-6 transition-[height] duration-500 ${floating ? "h-14 lg:h-16" : "h-16 lg:h-[4.5rem]"}`}>
          <Link
            href={pageHref(locale, "home")}
            className={`origin-left font-serif text-[1.9rem] font-semibold leading-none tracking-[0.14em] text-roast transition-transform duration-500 ${floating ? "scale-[0.84]" : ""}`}
            aria-label="IZUMI"
          >
            IZUMI
          </Link>

          <nav aria-label={c.menu[locale]} className="ml-6 hidden flex-1 lg:block">
            <ul className="flex items-center gap-7 text-[0.975rem]">
              <li>
                <button
                  type="button"
                  aria-expanded={panel === "shop"}
                  aria-controls={shopId}
                  onClick={() => toggle("shop")}
                  className="flex items-center gap-1.5 py-2"
                >
                  {c.shop[locale]}
                  <Chevron open={panel === "shop"} />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  aria-expanded={panel === "tea"}
                  aria-controls={teaId}
                  onClick={() => toggle("tea")}
                  className="flex items-center gap-1.5 py-2"
                >
                  {c.tea[locale]}
                  <Chevron open={panel === "tea"} />
                </button>
              </li>
              <NavLink href={pageHref(locale, "about")} pathname={pathname}>
                {c.story[locale]}
              </NavLink>
              <NavLink href={pageHref(locale, "brewing")} pathname={pathname}>
                {c.brewing[locale]}
              </NavLink>
              <NavLink href={pageHref(locale, "whereToBuy")} pathname={pathname}>
                {c.whereToBuy[locale]}
              </NavLink>
              <NavLink href={pageHref(locale, "reviews")} pathname={pathname}>
                {c.reviews[locale]}
              </NavLink>
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <div className="relative hidden sm:block">
              <button
                type="button"
                aria-expanded={panel === "lang"}
                aria-controls={langId}
                aria-label={`${c.language[locale]}: ${localeMeta[locale].name}`}
                onClick={() => toggle("lang")}
                className="flex h-10 items-center gap-1 rounded-full px-3 text-sm font-medium"
              >
                {localeMeta[locale].label}
                <Chevron open={panel === "lang"} />
              </button>
              <ul
                id={langId}
                hidden={panel !== "lang"}
                className="pop absolute right-0 top-full mt-2 w-48 rounded-2xl border border-line bg-paper p-2 shadow-[0_18px_40px_-24px_rgb(31_27_23/0.45)]"
              >
                {locales.map((l) => (
                  <li key={l}>
                    <Link
                      href={switchLocalePath(pathname, l)}
                      hrefLang={localeMeta[l].hreflang}
                      lang={localeMeta[l].htmlLang}
                      aria-current={l === locale ? "true" : undefined}
                      className="flex justify-between rounded-xl px-3 py-2 text-sm hover:bg-husk aria-[current]:font-medium"
                    >
                      {localeMeta[l].name}
                      <span className="text-muted">{localeMeta[l].label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <CurrencySwitch className="hidden sm:inline-flex" />

            <button
              type="button"
              onClick={(e) => openCart(e.currentTarget)}
              data-magnetic="0.2"
              className="btn relative h-10 min-h-10 gap-2 rounded-full bg-roast px-4 text-sm font-medium text-paper hover:bg-spring"
            >
              <span>{copy.cart.open[locale]}</span>
              <span
                key={bumpKey}
                className={`grid h-6 min-w-6 place-items-center rounded-full bg-paper/15 px-1.5 tabular-nums ${bumpKey ? "bump" : ""}`}
                aria-label={`(${count})`}
              >
                {count}
              </span>
            </button>

            <button
              type="button"
              className="flex h-10 items-center rounded-full border border-line px-4 text-sm lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
            >
              {c.menu[locale]}
            </button>
          </div>
        </div>

        {/* Mega menu: Shop */}
        <div id={shopId} ref={shopRef} style={{ height: 0 }} className="overflow-hidden">
          <div className="wrap grid grid-cols-[1fr_1fr_1fr_14rem] gap-5 py-7">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={productHref(locale, p.slug)}
                data-mm-item
                className={`tone-${p.tone} group flex items-center gap-4 rounded-2xl p-4`}
              >
                <span data-mm-img className="relative block h-24 w-20 shrink-0 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Image
                    src={p.gallery[0]!.src}
                    alt=""
                    fill
                    sizes="80px"
                    className={`object-contain ${p.gallery[0]!.src.endsWith(".jpg") ? "blend" : ""}`}
                  />
                </span>
                <span>
                  <span className="block font-serif text-2xl leading-tight">{p.name[locale]}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {p.kind === "bundle" ? c.sets[locale] : p.shortDescription[locale]}
                  </span>
                </span>
              </Link>
            ))}
            <div data-mm-item className="flex flex-col justify-center gap-3 pl-2">
              <Link href={pageHref(locale, "shop")} className="link font-medium">
                {c.allProducts[locale]}
              </Link>
              <Link href={pageHref(locale, "delivery")} className="link text-sm text-muted">
                {c.delivery[locale]}
              </Link>
            </div>
          </div>
        </div>

        {/* Mega menu: Tea */}
        <div id={teaId} ref={teaRef} style={{ height: 0 }} className="overflow-hidden">
          <div className="wrap grid grid-cols-[1fr_1fr_16rem] items-center gap-10 py-7">
            <ul data-mm-item className="grid gap-3 font-serif text-[1.65rem] leading-tight">
              <li>
                <Link href={pageHref(locale, "tea")} className="hover:text-spring">
                  {c.whatIs[locale]}
                </Link>
              </li>
              <li>
                <Link href={`${pageHref(locale, "tea")}#taste`} className="hover:text-spring">
                  {c.taste[locale]}
                </Link>
              </li>
              <li>
                <Link href={pageHref(locale, "brewing")} className="hover:text-spring">
                  {c.brewing[locale]}
                </Link>
              </li>
              <li>
                <Link href={pageHref(locale, "faq")} className="hover:text-spring">
                  {c.faq[locale]}
                </Link>
              </li>
            </ul>
            <p data-mm-item className="measure text-muted">{copy.tea.lead[locale]}</p>
            <div data-mm-img className="relative aspect-square w-full">
              <Image src={images.cupTop.src} alt="" fill sizes="256px" className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      <MobileMenu locale={locale} pathname={pathname} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
    </>
  );
}

function NavLink({ href, pathname, children }: { href: string; pathname: string; children: React.ReactNode }) {
  const current = pathname.startsWith(href);
  return (
    <li>
      <Link
        href={href}
        aria-current={current ? "page" : undefined}
        className="py-2 decoration-grain underline-offset-[0.4em] hover:underline aria-[current=page]:underline"
      >
        {children}
      </Link>
    </li>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 3.5 5 7l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function CurrencySwitch({ className = "" }: { className?: string }) {
  const { currency, setCurrency, locale } = useStore();
  return (
    <div role="group" aria-label={copy.nav.currency[locale]} className={`h-10 items-center rounded-full border border-line p-1 ${className}`}>
      {currencies.map((cur) => (
        <button
          key={cur}
          type="button"
          aria-pressed={currency === cur}
          onClick={() => setCurrency(cur)}
          className="h-8 rounded-full px-3 text-xs font-medium tracking-wide text-muted aria-pressed:bg-husk aria-pressed:text-roast"
        >
          {cur === "CZK" ? "Kč" : "€"}
          <span className="sr-only"> {cur}</span>
        </button>
      ))}
    </div>
  );
}

function MobileMenu({
  locale,
  pathname,
  open,
  onClose,
}: {
  locale: Locale;
  pathname: string;
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const c = copy.nav;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const items: [string, string][] = [
    [pageHref(locale, "shop"), c.shop[locale]],
    [pageHref(locale, "tea"), c.tea[locale]],
    [pageHref(locale, "about"), c.story[locale]],
    [pageHref(locale, "brewing"), c.brewing[locale]],
    [pageHref(locale, "reviews"), c.reviews[locale]],
    [pageHref(locale, "whereToBuy"), c.whereToBuy[locale]],
    [pageHref(locale, "faq"), c.faq[locale]],
    [pageHref(locale, "contacts"), c.contacts[locale]],
  ];

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label={c.menu[locale]}
      className="menu-sheet m-0 h-dvh max-h-none w-full max-w-none flex-col bg-paper p-0 text-roast open:flex"
    >
      <div className="wrap flex h-16 items-center justify-between">
        <span className="font-serif text-[1.9rem] font-semibold tracking-[0.14em]">IZUMI</span>
        <button type="button" onClick={onClose} className="btn btn-quiet min-h-10 px-4 text-sm">
          {c.close[locale]}
        </button>
      </div>
      <nav className="wrap flex-1 overflow-y-auto pb-8 pt-4">
        <ul className="grid gap-1">
          {items.map(([href, label]) => (
            <li key={href}>
              <Link
                href={href}
                onClick={onClose}
                aria-current={pathname.startsWith(href) ? "page" : undefined}
                className="block py-1.5 font-serif text-[2.4rem] leading-tight aria-[current=page]:text-spring"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-5 border-t border-line pt-6">
          <div>
            <p className="mb-2 text-sm text-muted">{c.language[locale]}</p>
            <ul className="flex flex-wrap gap-2">
              {locales.map((l) => (
                <li key={l}>
                  <Link
                    href={switchLocalePath(pathname, l)}
                    hrefLang={localeMeta[l].hreflang}
                    lang={localeMeta[l].htmlLang}
                    onClick={onClose}
                    aria-current={l === locale ? "true" : undefined}
                    className="block rounded-full border border-line px-4 py-2 text-sm aria-[current]:border-roast aria-[current]:font-medium"
                  >
                    {localeMeta[l].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm text-muted">{c.currency[locale]}</p>
            <CurrencySwitch className="inline-flex" />
          </div>
        </div>
      </nav>
    </dialog>
  );
}
