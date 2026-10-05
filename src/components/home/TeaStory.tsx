"use client";

import Image from "next/image";
import { useRef } from "react";
import { copy } from "@/content/copy";
import { images } from "@/content/products";
import type { Locale } from "@/lib/i18n";
import { useScene } from "@/lib/motion/core";

/**
 * Immersive product story, one long pinned scene:
 *   grain (camera zooms in) → granules stream out and build a mountain ridge
 *   → they pour into the pack → out of the pack into the cup → water fills,
 *   colour deepens to amber, steam rises → a dark circle grows from the cup
 *   and becomes the next (dark) section.
 *
 * Without motion (no JS, reduced motion) the same five steps render as a
 * plain illustrated list.
 */

// Scroll phases as fractions of the scene's progress.
const PH = { zoomEnd: 0.18, ridgeIn: [0.18, 0.36], packIn: [0.42, 0.54], pour: [0.62, 0.76], end: 0.94 } as const;
const STEP_WINDOWS: [number, number][] = [
  [0, 0.17],
  [0.2, 0.39],
  [0.42, 0.59],
  [0.62, 0.79],
  [0.82, 0.95],
];

export function TeaStory({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const c = copy.scenes.teaStory;

  useScene(root, ({ gsap }, el) => {
    el.dataset.motion = "on";
    const stage = el.querySelector<HTMLElement>("[data-stage]")!;
    const canvas = el.querySelector<HTMLCanvasElement>("canvas")!;
    const ctx = canvas.getContext("2d")!;
    const mm = gsap.matchMedia();

    // ---------- particles ----------
    type P = { o: number; size: number; rot: number; c: string; p0: [number, number]; p1: [number, number]; p2: [number, number]; p3: [number, number] };
    let parts: P[] = [];
    let W = 0;
    let H = 0;
    let box = { x: 0, y: 0, w: 0, h: 0 };
    const colors = ["#8a5a2e", "#a06a36", "#6f4522", "#b98149", "#5a381c", "#94622f"];

    const ridgeY = (x01: number) => {
      // Two peaks, matches the SVG path below (viewBox 0 0 100 60).
      const peaks = [
        [0, 52],
        [0.18, 30],
        [0.34, 40],
        [0.55, 8],
        [0.72, 30],
        [0.86, 22],
        [1, 46],
      ];
      for (let i = 0; i < peaks.length - 1; i++) {
        const [xa, ya] = peaks[i]!;
        const [xb, yb] = peaks[i + 1]!;
        if (x01 >= xa! && x01 <= xb!) return ya! + ((yb! - ya!) * (x01 - xa!)) / (xb! - xa!);
      }
      return 52;
    };

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = stage.clientWidth;
      H = stage.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const wide = W >= 1024;
      box = wide ? { x: W * 0.42, y: H * 0.12, w: W * 0.52, h: H * 0.76 } : { x: W * 0.06, y: H * 0.1, w: W * 0.88, h: H * 0.5 };
      const cx = box.x + box.w / 2;
      const cy = box.y + box.h / 2;
      const n = wide ? 620 : 360;
      const pack = { w: Math.min(box.w, box.h) * 0.34, h: Math.min(box.w, box.h) * 0.46 };
      const cupR = Math.min(box.w, box.h) * 0.2;
      parts = Array.from({ length: n }, () => {
        const a = Math.random() * Math.PI * 2;
        const rr = Math.sqrt(Math.random());
        const x01 = Math.random();
        const ry = ridgeY(x01) / 60;
        const depth = Math.random() ** 1.6 * (1 - ry) * 0.9;
        return {
          o: Math.random() * 0.55,
          size: 2 + Math.random() * (wide ? 3.6 : 2.8),
          rot: Math.random() * Math.PI,
          c: colors[Math.floor(Math.random() * colors.length)]!,
          p0: [cx + Math.cos(a) * rr * 60, cy + Math.sin(a) * rr * 60],
          p1: [box.x + x01 * box.w, box.y + (ry + depth) * box.h],
          p2: [cx + (Math.random() - 0.5) * pack.w, cy + (Math.random() - 0.5) * pack.h],
          p3: [cx + Math.cos(a) * rr * cupR, cy + Math.sin(a) * rr * cupR],
        };
      });
    };

    const ease = gsap.parseEase("power3.inOut");
    const seg = (p: number, s: number, e: number, o: number) => ease(gsap.utils.clamp(0, 1, ((p - s) / (e - s)) * 1.7 - o));
    const lerp = (a: [number, number], b: [number, number], t: number): [number, number] => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

    const draw = (p: number) => {
      ctx.clearRect(0, 0, W, H);
      if (p < 0.1 || p > 0.84) return;
      const now = performance.now() * 0.001;
      for (const q of parts) {
        let pos: [number, number];
        let alpha = 1;
        if (p < PH.ridgeIn[0]) pos = q.p0;
        else if (p < PH.packIn[0]) pos = lerp(q.p0, q.p1, seg(p, PH.ridgeIn[0], PH.ridgeIn[1], q.o));
        else if (p < PH.pour[0]) pos = lerp(q.p1, q.p2, seg(p, PH.packIn[0], PH.packIn[1], q.o));
        else pos = lerp(q.p2, q.p3, seg(p, PH.pour[0], PH.pour[1], q.o));

        alpha *= gsap.utils.clamp(0, 1, (p - 0.1) / 0.08);
        if (p > 0.54 && p < 0.62) alpha *= 0.25 + 0.75 * Math.abs((p - 0.58) / 0.04);
        alpha *= 1 - gsap.utils.clamp(0, 1, (p - 0.76) / 0.06);

        // A little life while resting on the ridge.
        const wob = p > PH.ridgeIn[1] && p < PH.packIn[0] ? Math.sin(now * 2 + q.o * 20) * 1.2 : 0;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = q.c;
        ctx.beginPath();
        ctx.ellipse(pos[0], pos[1] + wob, q.size, q.size * 0.62, q.rot + p * 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    // ---------- timeline ----------
    mm.add({ wide: "(min-width: 1024px)", narrow: "(max-width: 1023px)" }, (m) => {
      layout();
      const wide = m.conditions?.wide;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: wide ? "+=520%" : "+=420%",
          pin: stage,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onRefresh: layout,
        },
      });
      const at = (t: number) => t; // timeline positions are progress fractions (total duration 1)

      // Steps: each text comes in and leaves in its window.
      el.querySelectorAll<HTMLElement>("[data-step]").forEach((s, i) => {
        const [a, b] = STEP_WINDOWS[i]!;
        const lines = s.querySelectorAll("[data-line]");
        if (i > 0) tl.fromTo(lines, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.04, stagger: 0.01 }, at(a));
        if (i < 4) tl.to(lines, { yPercent: -110, opacity: 0, duration: 0.03, stagger: 0.008 }, at(b - 0.02));
        tl.to(`[data-dot="${i}"]`, { scale: 1, backgroundColor: "#33241a", duration: 0.02 }, at(a));
        if (i < 4) tl.to(`[data-dot="${i}"]`, { scale: 0.55, backgroundColor: "rgba(51,36,26,0.25)", duration: 0.02 }, at(b));
      });

      // 1. Camera moves into the grain.
      tl.fromTo("[data-grain]", { scale: 1, rotate: 0 }, { scale: 3.4, rotate: 18, duration: PH.zoomEnd }, 0)
        .to("[data-grain]", { opacity: 0, filter: "blur(8px)", duration: 0.05 }, 0.16)
        // 2. Ridge line draws while granules build the mountain.
        .fromTo("[data-ridge]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.16 }, 0.2)
        .fromTo("[data-alt]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.05 }, 0.3)
        .to("[data-mountain]", { opacity: 0, duration: 0.05 }, 0.44)
        .to("[data-bg]", { backgroundColor: "#e6d9c4", duration: 0.2 }, 0.18)
        // 3. The pack rises; the granules disappear into it.
        .fromTo("[data-pack]", { yPercent: 70, opacity: 0, rotate: 8 }, { yPercent: 0, opacity: 1, rotate: 0, duration: 0.12 }, 0.42)
        .to("[data-bg]", { backgroundColor: "#ebd3c6", duration: 0.14 }, 0.42)
        // 4. Pack tips over and leaves; cup arrives; granules pour; water fills.
        .to("[data-pack]", { rotate: -28, xPercent: -40, yPercent: -60, opacity: 0, duration: 0.1 }, 0.6)
        .fromTo("[data-cup]", { scale: 0.55, opacity: 0, rotate: -40 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.1 }, 0.6)
        .to("[data-bg]", { backgroundColor: "#f3ede3", duration: 0.14 }, 0.6)
        .fromTo("[data-water]", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(36% at 50% 50%)", duration: 0.14 }, 0.66)
        .fromTo("[data-ripple]", { scale: 0.3, opacity: 0 }, { scale: 1.4, opacity: 0.5, duration: 0.08, stagger: 0.03 }, 0.7)
        .to("[data-ripple]", { opacity: 0, duration: 0.04 }, 0.84)
        // 5. Pale water deepens to amber, steam rises.
        .fromTo("[data-water]", { backgroundColor: "rgba(241,230,200,0.85)" }, { backgroundColor: "rgba(201,135,58,0)", duration: 0.12 }, 0.8)
        .fromTo("[data-steam]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.08 }, 0.82)
        .to("[data-cup]", { scale: 1.12, duration: 0.14 }, 0.82)
        // Hand-off: a dark circle grows from the cup into the next section.
        .fromTo("[data-handoff]", { clipPath: "circle(0% at 70% 50%)" }, { clipPath: "circle(150% at 70% 50%)", duration: 0.06, ease: "power2.in" }, PH.end);

      if (!wide) tl.set("[data-handoff]", { clipPath: "circle(0% at 50% 35%)" }, 0);

      const tick = () => draw(tl.progress());
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    });

    return () => {
      mm.revert();
      delete el.dataset.motion;
    };
  });

  return (
    <section ref={root} className="tea-story relative z-10 bg-paper" aria-labelledby="tea-story-title">
      <h2 id="tea-story-title" data-split-skip className="sr-only">
        {c.title[locale]}
      </h2>

      {/* Static layout (no JS / reduced motion) */}
      <ol data-static className="wrap grid gap-10 py-20 md:grid-cols-5">
        {c.steps.map((s, i) => (
          <li key={i}>
            <span className="font-serif text-2xl text-grain">{i + 1}</span>
            <p className="mt-2 font-serif text-h3">{s.title[locale]}</p>
            <p className="mt-2 text-muted">{s.body[locale]}</p>
          </li>
        ))}
      </ol>

      {/* Motion stage */}
      <div data-stage className="relative hidden h-[100svh] overflow-hidden">
        <div data-bg className="absolute inset-0 bg-paper" />

        <div className="absolute inset-y-[12%] right-[6%] w-[52%] max-lg:inset-x-[6%] max-lg:bottom-auto max-lg:top-[10%] max-lg:h-[50%] max-lg:w-auto">
          {/* 1. grain */}
          <div data-grain className="absolute inset-[18%]">
            <Image src={images.granules.src} alt="" fill sizes="40vw" className="blend rounded-full object-cover" />
          </div>
          {/* 2. mountain */}
          <div data-mountain className="absolute inset-0">
            <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              <path
                data-ridge
                d="M0 52 L18 30 L34 40 L55 8 L72 30 L86 22 L100 46"
                fill="none"
                stroke="#33241a"
                strokeWidth="0.35"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset="1"
              />
            </svg>
            <p data-alt className="absolute left-[55%] top-[2%] -translate-x-1/2 -translate-y-full font-serif text-[clamp(2rem,5vw,4.5rem)] leading-none opacity-0">
              {copy.scenes.whyBig[0]![locale]}
            </p>
          </div>
          {/* 3. pack */}
          <div data-pack className="absolute inset-x-[33%] inset-y-[10%] opacity-0">
            <Image src={images.doyFront.src} alt="" fill sizes="20vw" className="object-contain drop-shadow-[0_30px_40px_rgb(51_36_26/0.3)]" />
          </div>
          {/* 4–5. cup */}
          <div data-cup className="absolute inset-[6%] opacity-0">
            <Image src={images.cupTop.src} alt="" fill sizes="40vw" className="object-contain" />
            <div data-water className="absolute inset-0 rounded-full mix-blend-multiply" style={{ clipPath: "circle(0% at 50% 50%)" }} />
            {[0, 1, 2].map((i) => (
              <span key={i} data-ripple className="absolute inset-[30%] rounded-full border border-paper/70 opacity-0" />
            ))}
            <svg data-steam viewBox="0 0 100 100" className="absolute -top-[30%] left-1/2 h-[60%] w-[50%] -translate-x-1/2 opacity-0" aria-hidden="true">
              {[30, 50, 70].map((x, i) => (
                <path
                  key={x}
                  className="steam-path"
                  style={{ animationDelay: `${i * 0.7}s` }}
                  d={`M${x} 100 C ${x - 12} 80, ${x + 12} 60, ${x} 40 S ${x - 10} 10, ${x} 0`}
                  fill="none"
                  stroke="#33241a"
                  strokeOpacity="0.28"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ))}
            </svg>
          </div>
        </div>

        <canvas aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />

        {/* Step texts */}
        <div className="wrap pointer-events-none absolute inset-0 flex items-center max-lg:items-end max-lg:pb-14">
          <div className="relative w-full max-w-xl lg:w-[38%]">
            {c.steps.map((s, i) => (
              <div key={i} data-step className={`${i === 0 ? "relative" : "absolute inset-x-0 top-0"}`}>
                <span className="block overflow-hidden">
                  <span data-line className="block font-sans text-sm tabular-nums text-muted" style={i === 0 ? undefined : { opacity: 0 }}>
                    {String(i + 1).padStart(2, "0")} / 05
                  </span>
                </span>
                <span className="mt-3 block overflow-hidden">
                  <span data-line className="block font-serif text-[clamp(2.4rem,5.2vw,4.8rem)] leading-[0.98]" style={i === 0 ? undefined : { opacity: 0 }}>
                    {s.title[locale]}
                  </span>
                </span>
                <span className="mt-4 block overflow-hidden">
                  <span data-line className="block max-w-sm text-lead text-muted" style={i === 0 ? undefined : { opacity: 0 }}>
                    {s.body[locale]}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <ol aria-hidden="true" className="absolute right-6 top-1/2 grid -translate-y-1/2 gap-3 max-lg:hidden">
          {c.steps.map((_, i) => (
            <li key={i} data-dot={i} className="h-2.5 w-2.5 rounded-full bg-roast/25" style={{ transform: `scale(${i === 0 ? 1 : 0.55})` }} />
          ))}
        </ol>

        <div data-handoff aria-hidden="true" className="absolute inset-0 bg-roast" style={{ clipPath: "circle(0% at 70% 50%)" }} />
      </div>
    </section>
  );
}
