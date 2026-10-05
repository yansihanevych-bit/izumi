"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { GranuleField } from "./GranuleField";
import { copy } from "@/content/copy";
import { images } from "@/content/products";
import type { Locale } from "@/lib/i18n";
import { hasFinePointer, useScene } from "@/lib/motion/core";
import { pageHref } from "@/lib/routes";
import { ArcArrow } from "@/components/ui/ArcArrow";

export { ArcArrow };

/**
 * Hero. The wordmark assembles letter by letter, the cup turns slowly and
 * floats, the pack drifts in front of it, both follow the pointer, and on
 * scroll they part ways while the next section rides up over the hero.
 */
export function Hero({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const h = copy.home;

  useScene(root, ({ gsap, SplitText }, el) => {
    const word = el.querySelector<HTMLElement>("[data-word]")!;
    const split = SplitText.create(word, { type: "chars" });

    // 1. Load: letters fly in from scattered positions and settle.
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(split.chars, {
      yPercent: () => gsap.utils.random(-140, 140),
      xPercent: () => gsap.utils.random(-60, 60),
      rotate: () => gsap.utils.random(-40, 40),
      opacity: 0,
      filter: "blur(12px)",
      duration: 1.6,
      stagger: { each: 0.07, from: "random" },
    })
      .from("[data-cup]", { scale: 0.7, rotate: -60, opacity: 0, duration: 2 }, 0.1)
      .from("[data-pack]", { yPercent: 40, rotate: 10, opacity: 0, duration: 1.6 }, 0.5)
      .from("[data-sub]", { y: 30, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.9)
      .from("[data-field]", { opacity: 0, duration: 2 }, 0.8);

    // 2. Idle: the cup slowly turns; cup and pack float on different rhythms.
    gsap.to("[data-cup-spin]", { rotate: 360, duration: 90, ease: "none", repeat: -1 });
    gsap.to("[data-cup-float]", { y: -14, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to("[data-pack-float]", { y: -22, rotate: -2.5, duration: 4.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.6 });

    // 3. Pointer: cup and pack lean against each other for depth.
    let off = () => {};
    if (hasFinePointer()) {
      const cx = gsap.quickTo("[data-cup-mouse]", "x", { duration: 1.1 });
      const cy = gsap.quickTo("[data-cup-mouse]", "y", { duration: 1.1 });
      const px = gsap.quickTo("[data-pack-mouse]", "x", { duration: 0.8 });
      const py = gsap.quickTo("[data-pack-mouse]", "y", { duration: 0.8 });
      const pr = gsap.quickTo("[data-pack-mouse]", "rotate", { duration: 0.8 });
      const move = (e: PointerEvent) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        cx(x * -36);
        cy(y * -26);
        px(x * 54);
        py(y * 40);
        pr(x * 6);
      };
      window.addEventListener("pointermove", move, { passive: true });
      off = () => window.removeEventListener("pointermove", move);
    }

    // 4. Pin the hero without spacing so the next section rides up over it.
    gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", pin: true, pinSpacing: false } });

    // 5. Scroll: elements part ways, the headline scales down, the hero dims
    // as the next section slides over it.
    const st = { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 };
    gsap.to("[data-cup-scroll]", { xPercent: 28, yPercent: -34, rotate: 50, scale: 1.15, ease: "none", scrollTrigger: st });
    gsap.to("[data-pack-scroll]", { xPercent: -70, yPercent: 60, rotate: -18, ease: "none", scrollTrigger: st });
    gsap.to(word, { scale: 0.82, yPercent: -30, transformOrigin: "left bottom", ease: "none", scrollTrigger: st });
    gsap.to("[data-sub-wrap]", { yPercent: -60, opacity: 0, ease: "none", scrollTrigger: { ...st, end: "60% top" } });
    gsap.to("[data-dim]", { opacity: 0.55, ease: "none", scrollTrigger: st });

    return () => {
      off();
      split.revert();
    };
  });

  return (
    <section ref={root} className="relative h-[100svh] min-h-[40rem] overflow-hidden bg-paper" aria-labelledby="hero-title">
      <div className="relative h-full">
        <div className="wrap relative grid h-full items-end pb-12 pt-24 lg:grid-cols-[1.05fr_1fr] lg:pb-16">
          <div className="relative z-10 order-2 lg:order-1">
            <h1 id="hero-title" data-split-skip>
              <span
                data-word
                className="block whitespace-nowrap font-serif text-display font-medium leading-[0.8] tracking-[0.04em] text-roast"
              >
                IZUMI
              </span>
            </h1>
            <div data-sub-wrap>
              <p data-sub className="mt-6 font-serif text-h1 leading-[1.02]">
                {h.heroTitle[locale]}
              </p>
              <p data-sub className="measure mt-5 text-lead text-muted">
                {h.heroLead[locale]}
              </p>
              <div data-sub className="mt-8 flex flex-wrap gap-3">
                <Link href={pageHref(locale, "shop")} className="btn btn-primary">
                  {h.shop[locale]}
                  <ArcArrow />
                </Link>
                <Link href={pageHref(locale, "tea")} className="btn btn-quiet">
                  {h.discover[locale]}
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 top-16 order-1 mx-auto aspect-square w-[min(92vw,30rem)] lg:relative lg:inset-auto lg:top-auto lg:-mr-[10%] lg:w-[110%] lg:max-w-none lg:self-center">
            <div data-field className="absolute -inset-[14%]">
              <GranuleField className="h-full w-full" />
            </div>
            <div data-cup-scroll className="absolute inset-0">
              <div data-cup-mouse className="absolute inset-0">
                <div data-cup-float className="absolute inset-0">
                  <div data-cup className="absolute inset-0">
                    <div data-cup-spin data-cursor="view" className="absolute inset-0">
                      <Image
                        src={images.cupTop.src}
                        alt={images.cupTop.alt[locale]}
                        fill
                        priority
                        sizes="(min-width:1024px) 55vw, 92vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div data-pack-scroll className="absolute -bottom-[6%] left-[2%] w-[42%] lg:left-[4%]">
              <div data-pack-mouse>
                <div data-pack-float>
                  <div data-pack className="drop-shadow-[0_34px_40px_rgb(51_36_26/0.3)]">
                    <Image
                      src={images.doyFront.src}
                      alt={images.doyFront.alt[locale]}
                      width={images.doyFront.width}
                      height={images.doyFront.height}
                      priority
                      sizes="(min-width:1024px) 24vw, 40vw"
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-dim aria-hidden="true" className="pointer-events-none absolute inset-0 bg-roast opacity-0" />
      </div>
    </section>
  );
}
