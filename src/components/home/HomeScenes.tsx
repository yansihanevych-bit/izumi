"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { copy } from "@/content/copy";
import { images } from "@/content/products";
import type { VideoReview } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { useScene } from "@/lib/motion/core";
import { pageHref } from "@/lib/routes";
import { ArcArrow } from "@/components/ui/ArcArrow";

/* ------------------------------------------------------------------ */
/* Product intro: the grain is revealed through a growing oval mask,   */
/* and rises over the hero.                                            */
/* ------------------------------------------------------------------ */
export function IntroScene({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const h = copy.home;

  useScene(root, ({ gsap }, el) => {
    gsap.fromTo(
      "[data-oval]",
      { clipPath: "ellipse(18% 12% at 50% 50%)" },
      { clipPath: "ellipse(50% 50% at 50% 50%)", ease: "none", scrollTrigger: { trigger: el, start: "top 85%", end: "center 55%", scrub: 0.6 } },
    );
    gsap.fromTo("[data-oval] img", { scale: 1.6, rotate: -14 }, { scale: 1, rotate: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
  });

  return (
    <section ref={root} className="relative z-10 -mt-[12svh] rounded-t-[2.5rem] bg-husk shadow-[0_-30px_60px_-40px_rgb(31_27_23/0.5)]">
      <div className="wrap grid items-center gap-10 py-24 md:grid-cols-2 lg:py-32">
        <div data-oval className="relative mx-auto aspect-[4/5] w-full max-w-[18rem] overflow-hidden rounded-full bg-paper md:max-w-md md:justify-self-start">
          <Image src={images.granules.src} alt={images.granules.alt[locale]} fill sizes="(min-width:768px) 28rem, 90vw" className="blend object-cover" />
        </div>
        <div>
          <h2 className="text-h2">{h.introTitle[locale]}</h2>
          <p className="measure mt-6 text-lead">{h.introBody[locale]}</p>
          <Link href={pageHref(locale, "tea")} className="link mt-8 inline-flex items-center gap-2 font-medium">
            {h.introCta[locale]}
            <ArcArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why IZUMI: a horizontal track on desktop, a stack on mobile.         */
/* ------------------------------------------------------------------ */
export function WhyScene({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const h = copy.home;
  const big = copy.scenes.whyBig;

  useScene(root, ({ gsap }, el) => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      el.dataset.motion = "on";
      const track = el.querySelector<HTMLElement>("[data-track]")!;
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
      });
      // Big numerals move faster than their panels: depth inside the track.
      gsap.utils.toArray<HTMLElement>("[data-big]").forEach((b) => {
        gsap.fromTo(b, { xPercent: 30 }, { xPercent: -30, ease: "none", scrollTrigger: { trigger: b.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
      });
      gsap.to("[data-why-progress]", { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: true } });
    });
    return () => {
      mm.revert();
      delete el.dataset.motion;
    };
  });

  return (
    <section ref={root} className="why relative z-10 overflow-hidden bg-paper" aria-labelledby="why-title">
      <div className="why-frame">
        <div className="wrap flex items-end justify-between gap-6 pt-24">
          <h2 id="why-title" className="text-h2 max-w-xl">
            {h.whyTitle[locale]}
          </h2>
          <div className="hidden h-px w-48 origin-left bg-line lg:block">
            <div data-why-progress className="h-px w-full origin-left scale-x-0 bg-roast" />
          </div>
        </div>
        <ol data-track className="wrap mt-12 grid gap-6 pb-24 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {h.why.map((w, i) => (
            <li
              key={w.title.en}
              className={`relative flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-[2rem] p-8 ${["tone-sand", "tone-blush", "tone-teal", "bg-roast text-paper"][i]}`}
            >
              <span data-big aria-hidden="true" className="pointer-events-none absolute -top-[0.08em] left-6 whitespace-nowrap font-serif text-[clamp(4rem,8.5vw,8.5rem)] leading-none opacity-90">
                {big[i]![locale]}
              </span>
              <h3 className="font-serif text-[clamp(1.9rem,2.6vw,2.6rem)] leading-tight" data-split-skip>
                {w.title[locale]}
              </h3>
              <p className={`mt-2 max-w-sm ${i === 3 ? "text-paper/75" : "text-muted"}`}>{w.body[locale]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Story: the photo opens from a crop to full bleed, text floats over.  */
/* ------------------------------------------------------------------ */
export function StoryScene({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const h = copy.home;

  useScene(root, ({ gsap }, el) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=140%", pin: true, scrub: 0.7 } });
    tl.fromTo("[data-frame]", { clipPath: "inset(16% 18% 16% 18% round 2.5rem)" }, { clipPath: "inset(0% 0% 0% 0% round 0rem)", ease: "none", duration: 1 }, 0)
      .fromTo("[data-frame] img", { scale: 1.35, xPercent: -6 }, { scale: 1.05, xPercent: 0, ease: "none", duration: 1.4 }, 0)
      .fromTo("[data-shade]", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.4)
      .fromTo("[data-story-text] > *", { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.5, ease: "power3.out" }, 0.55)
      .fromTo("[data-float-word]", { xPercent: 20 }, { xPercent: -25, ease: "none", duration: 1.4 }, 0);
  });

  return (
    <section ref={root} className="relative z-10 h-[100svh] overflow-hidden bg-sand text-paper" aria-labelledby="story-title">
      <div data-frame className="absolute inset-0 overflow-hidden">
        <Image src={images.lifestyle.src} alt={images.lifestyle.alt[locale]} fill sizes="100vw" className="object-cover object-[80%_50%]" />
        <div data-shade className="absolute inset-0 bg-gradient-to-t from-roast/85 via-roast/35 to-transparent" />
      </div>
      <p data-float-word aria-hidden="true" className="pointer-events-none absolute top-[12%] whitespace-nowrap font-serif text-[clamp(7rem,22vw,20rem)] leading-none text-paper/20">
        IZUMI IZUMI
      </p>
      <div data-story-text className="wrap absolute inset-x-0 bottom-0 grid gap-6 pb-16 md:grid-cols-[1fr_1.2fr] lg:pb-20">
        <h2 id="story-title" className="text-h2" data-split-skip>
          {h.storyTitle[locale]}
        </h2>
        <div>
          <p className="measure text-lead text-paper/90">{h.storyBody[locale]}</p>
          <Link href={pageHref(locale, "about")} className="btn mt-6 bg-paper text-roast hover:bg-husk">
            {h.storyCta[locale]}
            <ArcArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Social proof: two rows of names glide in opposite directions and     */
/* skew with scroll speed; portraits open through a mask.               */
/* ------------------------------------------------------------------ */
export function ProofScene({ locale, people, featured }: { locale: Locale; people: VideoReview[]; featured: VideoReview[] }) {
  const root = useRef<HTMLElement>(null);
  const h = copy.home;

  useScene(root, ({ gsap, ScrollTrigger }, el) => {
    const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
    const loops = rows.map((row, i) =>
      gsap.to(row, { xPercent: i % 2 ? 0 : -50, startAt: { xPercent: i % 2 ? -50 : 0 }, duration: 60, ease: "none", repeat: -1 }),
    );
    const skew = gsap.quickTo(rows, "skewX", { duration: 0.5, ease: "power3.out" });
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-14, 14, self.getVelocity() / -260);
        skew(v);
        loops.forEach((l) => l.timeScale(1 + Math.abs(v) * 0.6));
      },
    });
    gsap.utils.toArray<HTMLElement>("[data-portrait]").forEach((p, i) => {
      gsap.fromTo(p, { clipPath: "inset(100% 0% 0% 0% round 1.25rem)" }, { clipPath: "inset(0% 0% 0% 0% round 1.25rem)", duration: 1.2, ease: "expo.out", delay: i * 0.08, scrollTrigger: { trigger: p, start: "top 90%", once: true } });
    });
  });

  const names = people.map((p) => p.name[locale]);
  const half = Math.ceil(names.length / 2);
  const rowsData = [names.slice(0, half), names.slice(half)];

  return (
    <section ref={root} className="relative z-10 overflow-hidden bg-paper py-24 lg:py-32" aria-labelledby="home-proof">
      <div className="wrap grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <h2 id="home-proof" className="text-h2">
          {h.proofTitle[locale]}
        </h2>
        <p className="measure self-end text-lead text-muted">{h.proofBody[locale]}</p>
      </div>

      <div aria-hidden="true" className="mt-14 grid gap-2 font-serif text-[clamp(2.4rem,5vw,4.6rem)] leading-tight">
        {rowsData.map((row, i) => (
          <div key={i} className="overflow-hidden whitespace-nowrap">
            <div data-row className="inline-flex w-max">
              {[0, 1].map((dup) => (
                <span key={dup} className={`flex shrink-0 gap-10 pr-10 ${i % 2 ? "text-outline [--outline:rgb(51_36_26/0.55)]" : ""}`}>
                  {row.map((n) => (
                    <span key={n + dup}>{n}</span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ul className="wrap mt-14 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
        {featured.map((r) => (
          <li key={r.id}>
            <Link href={`${pageHref(locale, "reviews")}#${r.id}`} data-cursor="play" className="group block">
              <span data-portrait className="relative block aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-husk">
                <Image
                  src={`https://i.ytimg.com/vi/${r.youtubeId}/hqdefault.jpg`}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 22vw, 45vw"
                  className="object-cover grayscale-[40%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </span>
              <span className="mt-3 block font-medium">{r.name[locale]}</span>
              <span className="block text-sm text-muted">{r.role[locale]}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="wrap">
        <Link href={pageHref(locale, "reviews")} className="btn btn-quiet mt-10">
          {h.proofCta[locale]}
          <ArcArrow />
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Where to buy: oversized words drift at different speeds.            */
/* ------------------------------------------------------------------ */
export function BuyScene({ locale }: { locale: Locale }) {
  const h = copy.home;
  return (
    <section className="relative z-10 overflow-hidden border-t border-line bg-paper">
      <div aria-hidden="true" className="pointer-events-none select-none pt-16 font-serif leading-[0.85] text-roast/[0.08]">
        <p data-speed="0.7" className="whitespace-nowrap pl-[8vw] text-[clamp(5rem,14vw,13rem)]">
          {h.buyOnline[locale]}
        </p>
        <p data-speed="1.3" className="-mt-[2vw] whitespace-nowrap pl-[30vw] text-[clamp(5rem,14vw,13rem)]">
          {copy.nav.whereToBuy[locale]}
        </p>
      </div>
      <div className="wrap mt-10 grid gap-10 pb-24 md:grid-cols-[1fr_1fr_1fr]">
        <h2 className="text-h2">{h.buyTitle[locale]}</h2>
        <div>
          <h3 className="text-h3" data-split-skip>
            {h.buyOnline[locale]}
          </h3>
          <p className="mt-2 text-muted">{h.buyOnlineBody[locale]}</p>
          <Link href={pageHref(locale, "shop")} className="link mt-4 inline-flex items-center gap-2 font-medium">
            {h.shop[locale]}
            <ArcArrow />
          </Link>
        </div>
        <div>
          <h3 className="text-h3" data-split-skip>
            {h.buyOffline[locale]}
          </h3>
          <p className="mt-2 text-muted">{h.buyOfflineBody[locale]}</p>
          <Link href={pageHref(locale, "whereToBuy")} className="link mt-4 inline-flex items-center gap-2 font-medium">
            {copy.nav.whereToBuy[locale]}
            <ArcArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
