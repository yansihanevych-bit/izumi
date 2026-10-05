"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { loadMotion, prefersReducedMotion } from "./core";

/**
 * Page transition: on an internal link click, a brown panel wipes up with the
 * IZUMI wordmark, the route changes underneath, then the panel lifts off
 * through a clip-path. Modified clicks, new tabs, downloads, hash links and
 * reduced motion all fall through to normal navigation.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const covering = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // Same page (hash or query only): let the browser/Next handle it.
      if (url.pathname === location.pathname) return;

      e.preventDefault();
      e.stopPropagation();
      if (covering.current) return;
      covering.current = true;

      loadMotion().then(({ gsap }) => {
        const p = panel.current;
        const w = word.current;
        if (!p || !w) return router.push(url.pathname + url.search + url.hash);
        gsap.set(p, { display: "grid", clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(w, { yPercent: 120 });
        gsap
          .timeline({ onComplete: () => router.push(url.pathname + url.search + url.hash) })
          .to(p, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "expo.inOut" })
          .to(w, { yPercent: 0, duration: 0.5, ease: "expo.out" }, "-=0.25");
      });
    };

    // Capture phase so we run before Next's Link handler.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // New route rendered: reveal it.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!covering.current) return;
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    loadMotion().then(({ gsap }) => {
      const p = panel.current;
      if (!p) return;
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(p, { display: "none" });
            covering.current = false;
          },
        })
        .to(word.current, { yPercent: -120, duration: 0.45, ease: "expo.in" }, 0.1)
        .to(p, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7, ease: "expo.inOut" }, 0.3);
    });
  }, [pathname]);

  return (
    <div ref={panel} aria-hidden="true" className="fixed inset-0 z-[90] hidden place-items-center bg-roast text-paper">
      <span className="overflow-hidden">
        <span ref={word} className="block font-serif text-[clamp(3rem,10vw,8rem)] font-medium tracking-[0.14em]">
          IZUMI
        </span>
      </span>
    </div>
  );
}
