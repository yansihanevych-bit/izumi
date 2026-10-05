"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArcArrow } from "@/components/ui/ArcArrow";
import { copy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";
import { hasFinePointer, useScene } from "@/lib/motion/core";
import { pageHref } from "@/lib/routes";

/**
 * Brewing experience (dark, continues from the tea story's hand-off).
 * A long pinned scene in three rounds: granules drop into a cup, water
 * fills it, a 3-minute ring closes, the colour deepens, steam and ripples
 * appear; the cup empties and refills twice more on the same granules.
 * Oversized "3 minutes / 3 brews" type slides across behind the cup;
 * 01/02/03 float in per round; the cup tilts toward the pointer.
 */
const CUP = { top: 52, bottom: 172, full: 66, rxTop: 58, rxBottom: 47 };
const COLORS = ["#e9dcc0", "#9a5a22", "#a8692b", "#b97d3c"];

export function BrewScene({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const k = copy.scenes.kinetic;
  const b = copy.scenes.brew;
  const steps = copy.home.ritualSteps;

  useScene(root, ({ gsap }, el) => {
    el.dataset.motion = "on";
    const stage = el.querySelector<HTMLElement>("[data-stage]")!;
    const liquid = stage.querySelector<SVGRectElement>("[data-liquid]")!;
    const surface = stage.querySelector<SVGEllipseElement>("[data-surface]")!;
    const ripples = stage.querySelector<SVGGElement>("[data-ripples]")!;
    const ring = stage.querySelector<SVGCircleElement>("[data-ring]")!;
    const clock = stage.querySelector<HTMLElement>("[data-clock]")!;

    // Liquid level 0..1 drives the rect, the surface ellipse and the ripples.
    const state = { level: 0, round: 0, mix: 0, minutes: 0 };
    const render = () => {
      const color = gsap.utils.interpolate(COLORS[0]!, COLORS[state.round + 1]!, state.mix) as string;
      const y = CUP.bottom - (CUP.bottom - CUP.full) * state.level;
      const rx = CUP.rxBottom + (CUP.rxTop - CUP.rxBottom) * ((CUP.bottom - y) / (CUP.bottom - CUP.top));
      liquid.setAttribute("y", String(y));
      liquid.setAttribute("fill", color);
      surface.setAttribute("cy", String(y));
      surface.setAttribute("rx", String(rx));
      surface.setAttribute("fill", color);
      surface.style.opacity = state.level > 0.04 ? "1" : "0";
      ripples.setAttribute("transform", `translate(100 ${y}) scale(${rx / 50} 1)`);
      ripples.style.opacity = state.level > 0.2 ? "1" : "0";
      const m = Math.floor(state.minutes);
      const s = Math.floor((state.minutes - m) * 60);
      clock.textContent = `${m}:${String(s).padStart(2, "0")}`;
    };

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: el, start: "top top", end: "+=440%", pin: stage, scrub: 0.7 },
      onUpdate: render,
    });

    // Kinetic type slides in opposite directions through the whole scene.
    tl.fromTo("[data-kin-a]", { xPercent: 10 }, { xPercent: -45, duration: 1 }, 0).fromTo("[data-kin-b]", { xPercent: -50 }, { xPercent: 5, duration: 1 }, 0);

    // Granules fall into the empty cup.
    tl.fromTo("[data-stage] [data-granule]", { y: -170, opacity: 0, rotate: 0 }, { y: 0, opacity: 1, rotate: 180, duration: 0.08, stagger: 0.004, ease: "power2.in" }, 0.02);

    const round = (i: number, start: number) => {
      const fillEnd = start + 0.08;
      const steepEnd = start + 0.22;
      tl.set(state, { round: i, mix: 0 }, start)
        .to(state, { level: 1, duration: 0.08, ease: "power1.out" }, start)
        .to(state, { mix: 1, duration: 0.16 }, fillEnd)
        .fromTo(ring, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.14 }, fillEnd)
        .fromTo(state, { minutes: 0 }, { minutes: 3, duration: 0.14 }, fillEnd)
        .fromTo(`[data-num='${i}']`, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.04, ease: "power3.out" }, start)
        .to(`[data-num='${i}']`, { yPercent: -60, opacity: 0, duration: 0.03 }, steepEnd + 0.02)
        .to("[data-stage] [data-steam]", { opacity: 1, duration: 0.03 }, fillEnd + 0.03)
        .to(`[data-round='${i}']`, { opacity: 1, y: 0, duration: 0.03 }, fillEnd)
        .to(`[data-round='${i}']`, { opacity: 0, y: -16, duration: 0.03 }, steepEnd + 0.02);
      if (i < 2) {
        // Poured out; the granules stay for the next round.
        tl.to("[data-stage] [data-steam]", { opacity: 0, duration: 0.02 }, steepEnd + 0.02).to(state, { level: 0.08, duration: 0.05, ease: "power2.in" }, steepEnd + 0.02);
      }
    };
    round(0, 0.1);
    round(1, 0.4);
    round(2, 0.7);
    tl.to("[data-steps] li", { opacity: 1, duration: 0.02, stagger: 0.12 }, 0.02);

    // Pointer: the cup turns in 3D toward the cursor.
    let off = () => {};
    if (hasFinePointer()) {
      const rx = gsap.quickTo("[data-tilt]", "rotationX", { duration: 1, ease: "power3.out" });
      const ry = gsap.quickTo("[data-tilt]", "rotationY", { duration: 1, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        ry((e.clientX / window.innerWidth - 0.5) * 26);
        rx((e.clientY / window.innerHeight - 0.5) * -18);
      };
      window.addEventListener("pointermove", move, { passive: true });
      off = () => window.removeEventListener("pointermove", move);
    }
    render();
    return () => {
      off();
      delete el.dataset.motion;
    };
  });

  return (
    <section ref={root} className="relative z-10 bg-roast text-paper" aria-labelledby="brew-title">
      {/* Static layout (no JS / reduced motion) */}
      <div data-static className="wrap grid items-center gap-12 py-24 lg:grid-cols-2">
        <div>
          <h2 id="brew-title" className="text-h2">
            {copy.home.ritualTitle[locale]}
          </h2>
          <ol className="mt-10 grid gap-4">
            {steps.map((s, i) => (
              <li key={i} className="flex items-baseline gap-5 font-serif text-[clamp(1.5rem,2.4vw,2.2rem)] leading-tight">
                <span className="w-6 font-sans text-sm text-paper/50">{i + 1}</span>
                {s[locale]}
              </li>
            ))}
          </ol>
          <Link href={pageHref(locale, "brewing")} className="btn mt-10 bg-paper text-roast hover:bg-husk">
            {copy.home.ritualCta[locale]}
          </Link>
        </div>
        <CupSvg className="mx-auto w-full max-w-sm" level={1} />
      </div>

      {/* Motion stage */}
      <div data-stage className="relative hidden h-[100svh] overflow-hidden">
        {/* Kinetic oversized type behind the cup */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-[2vh] whitespace-nowrap font-serif leading-[0.85]">
          <span data-kin-a className="text-outline block text-[clamp(6rem,17vw,16rem)]">
            {k.minutes[locale]} {k.minutes[locale]}
          </span>
          <span data-kin-b className="block text-[clamp(6rem,17vw,16rem)] text-paper/[0.07]">
            {k.brews[locale]} {k.brews[locale]}
          </span>
        </div>

        <div className="wrap relative grid h-full items-center gap-6 lg:grid-cols-[1fr_1.1fr_1fr]">
          {/* Left: steps light up */}
          <div className="max-lg:absolute max-lg:inset-x-4 max-lg:top-24">
            <p className="font-serif text-h3">{b.title[locale]}</p>
            <ol data-steps className="mt-6 grid gap-2 max-lg:hidden">
              {steps.map((s, i) => (
                <li key={i} className="text-paper/90 opacity-25">
                  {s[locale]}
                </li>
              ))}
            </ol>
          </div>

          {/* Centre: cup, timer ring, floating numbers */}
          <div className="relative mx-auto aspect-square w-[min(80vw,30rem)] [perspective:900px]">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="100" cy="100" r="96" fill="none" stroke="rgb(243 237 227 / 0.12)" strokeWidth="0.8" />
              <circle data-ring cx="100" cy="100" r="96" fill="none" stroke="#c9a173" strokeWidth="1.4" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
            </svg>
            <div data-tilt className="absolute inset-[12%] [transform-style:preserve-3d]">
              <CupSvg className="h-full w-full" level={0} interactive />
            </div>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                data-num={i}
                aria-hidden="true"
                className="absolute -right-[6%] -top-[4%] font-serif text-[clamp(4rem,9vw,8rem)] leading-none text-[#c9a173] opacity-0"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            ))}
            <p className="absolute -bottom-[2%] left-1/2 -translate-x-1/2 font-serif text-[clamp(2rem,3.4vw,3rem)] tabular-nums" aria-hidden="true">
              <span data-clock>0:00</span>
            </p>
          </div>

          {/* Right: what this round is */}
          <div className="relative min-h-24 max-lg:absolute max-lg:inset-x-4 max-lg:bottom-10">
            {b.rounds.map((r, i) => (
              <p key={i} data-round={i} className="absolute inset-x-0 top-0 translate-y-4 font-serif text-[clamp(1.6rem,2.4vw,2.3rem)] leading-tight opacity-0">
                {r[locale]}
              </p>
            ))}
            <Link href={pageHref(locale, "brewing")} className="btn pointer-events-auto absolute left-0 top-32 bg-paper text-roast hover:bg-husk max-lg:hidden">
              {copy.home.ritualCta[locale]}
              <ArcArrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Side-view cup. Liquid level and colour are driven from the scene. */
function CupSvg({ className, level, interactive }: { className?: string; level: number; interactive?: boolean }) {
  const y = CUP.bottom - (CUP.bottom - CUP.full) * level;
  const color = level ? COLORS[1] : COLORS[0];
  const granules = [
    [78, 166], [86, 169], [94, 167], [102, 170], [110, 166], [118, 169], [90, 163], [106, 163], [98, 165], [114, 163], [82, 162], [122, 166],
  ];
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="">
      <defs>
        <clipPath id={interactive ? "cup-in-live" : "cup-in-static"}>
          <path d="M44 52 H156 L147 160 Q145 172 130 172 H70 Q55 172 53 160 Z" />
        </clipPath>
        <linearGradient id="cup-glass" x1="0" x2="1">
          <stop offset="0" stopColor="#f3ede3" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#f3ede3" stopOpacity="0.04" />
          <stop offset="1" stopColor="#f3ede3" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {/* steam */}
      <g data-steam opacity={level ? 1 : 0}>
        {[82, 100, 118].map((x, i) => (
          <path
            key={x}
            className="steam-path"
            style={{ animationDelay: `${i * 0.8}s` }}
            d={`M${x} 46 C ${x - 9} 34, ${x + 9} 24, ${x} 12 S ${x - 7} -4, ${x} -14`}
            fill="none"
            stroke="#f3ede3"
            strokeOpacity="0.5"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        ))}
      </g>
      <g clipPath={`url(#${interactive ? "cup-in-live" : "cup-in-static"})`}>
        <rect data-liquid x="40" y={y} width="120" height="140" fill={color} />
        {granules.map(([gx, gy], i) => (
          <ellipse key={i} data-granule cx={gx} cy={gy} rx="3.4" ry="2.2" fill="#5a381c" />
        ))}
      </g>
      <ellipse data-surface cx="100" cy={y} rx="58" ry="5.5" fill={color} opacity={level ? 1 : 0} />
      <g data-ripples transform={`translate(100 ${y})`} opacity={level ? 1 : 0}>
        <ellipse className="ripple" rx="50" ry="4.4" fill="none" stroke="#f3ede3" strokeOpacity="0.55" strokeWidth="0.8" />
        <ellipse className="ripple" style={{ animationDelay: "1.3s" }} rx="50" ry="4.4" fill="none" stroke="#f3ede3" strokeOpacity="0.55" strokeWidth="0.8" />
      </g>
      {/* glass body + handle */}
      <path d="M44 52 H156 L147 160 Q145 172 130 172 H70 Q55 172 53 160 Z" fill="url(#cup-glass)" stroke="#f3ede3" strokeOpacity="0.7" strokeWidth="1.4" />
      <ellipse cx="100" cy="52" rx="56" ry="5.5" fill="none" stroke="#f3ede3" strokeOpacity="0.7" strokeWidth="1.4" />
      <path d="M153 74 C 182 74, 184 128, 148 128" fill="none" stroke="#f3ede3" strokeOpacity="0.7" strokeWidth="1.4" />
      <ellipse cx="100" cy="184" rx="70" ry="5" fill="#000" opacity="0.25" />
    </svg>
  );
}
