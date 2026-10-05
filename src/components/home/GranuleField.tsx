"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion/core";

/**
 * A light canvas of buckwheat granules drifting around a centre point
 * (the hero cup). ~70 particles, paused when off-screen. Decorative only.
 */
export function GranuleField({ count = 70, className = "" }: { count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || prefersReducedMotion()) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#8a5a2e", "#a06a36", "#6f4522", "#b98149", "#5a381c"];
    type P = { a: number; r: number; speed: number; size: number; rot: number; spin: number; c: string; wobble: number };
    let parts: P[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let mx = 0;
    let my = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const R = Math.min(w, h) / 2;
      parts = Array.from({ length: count }, () => ({
        a: Math.random() * Math.PI * 2,
        r: R * (0.72 + Math.random() * 0.4),
        speed: (0.0006 + Math.random() * 0.0016) * (Math.random() < 0.5 ? -1 : 1),
        size: 2.2 + Math.random() * 3.6,
        rot: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.02,
        c: colors[Math.floor(Math.random() * colors.length)]!,
        wobble: Math.random() * 1000,
      }));
    };

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2 + mx * 18;
      const cy = h / 2 + my * 18;
      for (const p of parts) {
        p.a += p.speed;
        p.rot += p.spin;
        const r = p.r + Math.sin(t * 0.0008 + p.wobble) * 10;
        const x = cx + Math.cos(p.a) * r;
        const y = cy + Math.sin(p.a) * r * 0.82;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.beginPath();
        // Granules are short rounded cylinders: draw a small ellipse.
        ctx.ellipse(0, 0, p.size, p.size * 0.62, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting));
    io.observe(canvas);
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
