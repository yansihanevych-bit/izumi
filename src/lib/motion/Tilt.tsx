"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "./core";

/**
 * Pointer-driven tilt for cards and images. Children marked [data-depth]
 * shift further (packshots "lift" out of the card). Sets --mx/--my for
 * CSS-driven shading. No-op on touch and reduced motion.
 */
export function Tilt({
  children,
  className = "",
  max = 7,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  as?: "div" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    let raf = 0;
    const cur = { x: 0, y: 0 };
    const tgt = { x: 0, y: 0 };
    const depth = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"));

    const render = () => {
      cur.x += (tgt.x - cur.x) * 0.12;
      cur.y += (tgt.y - cur.y) * 0.12;
      el.style.transform = `perspective(900px) rotateX(${(-cur.y * max).toFixed(2)}deg) rotateY(${(cur.x * max).toFixed(2)}deg)`;
      el.style.setProperty("--mx", `${((cur.x + 1) * 50).toFixed(1)}%`);
      el.style.setProperty("--my", `${((cur.y + 1) * 50).toFixed(1)}%`);
      depth.forEach((d) => {
        const k = parseFloat(d.dataset.depth ?? "1");
        d.style.transform = `translate3d(${(cur.x * 14 * k).toFixed(1)}px, ${(cur.y * 14 * k).toFixed(1)}px, 0) rotate(${(cur.x * 3 * k).toFixed(2)}deg)`;
      });
      if (Math.abs(tgt.x - cur.x) > 0.001 || Math.abs(tgt.y - cur.y) > 0.001) raf = requestAnimationFrame(render);
      else raf = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tgt.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      tgt.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      kick();
    };
    const leave = () => {
      tgt.x = 0;
      tgt.y = 0;
      kick();
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);

  return (
    // @ts-expect-error — polymorphic ref is fine for these block elements
    <Tag ref={ref} className={`will-change-transform [transform-style:preserve-3d] ${className}`}>
      {children}
    </Tag>
  );
}
