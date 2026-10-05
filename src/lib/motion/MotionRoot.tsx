"use client";

/**
 * Site-wide motion layer, mounted once in the locale layout:
 *  - Lenis smooth scroll driven by the GSAP ticker (keeps ScrollTrigger in sync),
 *  - heading reveals (line mask / per-character) on every route,
 *  - image mask reveals for [data-reveal="mask"],
 *  - magnetic buttons for .btn and [data-magnetic] on fine pointers.
 * Everything is skipped under prefers-reduced-motion.
 */
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { hasFinePointer, loadMotion, prefersReducedMotion } from "./core";

declare global {
  interface Window {
    __lenis?: { scrollTo: (t: number | HTMLElement, o?: { immediate?: boolean }) => void; stop: () => void; start: () => void };
  }
}

export function MotionRoot() {
  const pathname = usePathname();

  // Smooth scroll, created once.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let destroy: (() => void) | undefined;
    let cancelled = false;
    Promise.all([loadMotion(), import("lenis")]).then(([{ gsap, ScrollTrigger }, { default: Lenis }]) => {
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, anchors: { offset: -96 } });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      document.documentElement.classList.add("lenis");
      destroy = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        window.__lenis = undefined;
      };
    });
    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  // Per-route reveals and magnetic buttons.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    const cleanups: (() => void)[] = [];
    let cancelled = false;

    loadMotion().then(({ gsap, ScrollTrigger, SplitText }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        // Headings: line-mask reveal. Home hero handles its own wordmark.
        document.querySelectorAll<HTMLElement>("main h1:not([data-split-skip]), main h2:not([data-split-skip])").forEach((el) => {
          const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.05,
            stagger: 0.09,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
          cleanups.push(() => split.revert());
        });

        // Images revealed through a mask, with a slight counter-scale.
        document.querySelectorAll<HTMLElement>("[data-reveal='mask']").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(18% 12% 18% 12% round 2rem)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 1.75rem)",
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 95%", end: "top 45%", scrub: 0.8 },
            },
          );
          const img = el.querySelector("img");
          if (img) gsap.fromTo(img, { scale: 1.22 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "bottom top", scrub: true } });
        });

        // Card meta (name, price, actions) arrives just after its image.
        gsap.utils.toArray<HTMLElement>("[data-reveal='meta']").forEach((el) => {
          gsap.from(el.children, {
            y: 22,
            opacity: 0,
            duration: 0.9,
            stagger: 0.07,
            delay: 0.15,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        // Elements that drift at their own speed: data-speed="0.8" (slower) or "1.2" (faster).
        document.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
          const speed = parseFloat(el.dataset.speed ?? "1");
          gsap.to(el, {
            y: () => (1 - speed) * 220,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
          });
        });
      });

      // Magnetic buttons: pull toward the pointer within their box, spring back on leave.
      if (hasFinePointer()) {
        document.querySelectorAll<HTMLElement>(".btn, [data-magnetic]").forEach((el) => {
          const strength = parseFloat(el.dataset.magnetic ?? "0.28");
          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * strength);
            yTo((e.clientY - (r.top + r.height / 2)) * strength);
          };
          const leave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" });
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
            gsap.set(el, { x: 0, y: 0 });
          });
        });
      }

      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      cleanups.forEach((c) => c());
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
