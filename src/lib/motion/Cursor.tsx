"use client";

import { useEffect, useRef, useState } from "react";
import { hasFinePointer, prefersReducedMotion } from "./core";

/**
 * Desktop cursor: a small dot that trails the pointer with inertia.
 *  - over links/buttons: grows into a ring,
 *  - over [data-cursor="view"] / [data-cursor="explore"]: shows a label.
 * Native cursor stays for text fields. Not rendered on touch or reduced motion.
 */
type Mode = "dot" | "link" | "label";

export function Cursor({ labels }: { labels: { view: string; explore: string; play: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("dot");
  const [label, setLabel] = useState("");
  const labelsRef = useRef(labels);
  labelsRef.current = labels;

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;
    let visible = false;

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      if (ref.current) ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible && ref.current) {
        visible = true;
        pos.x = e.clientX;
        pos.y = e.clientY;
        ref.current.style.opacity = "1";
      }
      const el = e.target as Element | null;
      const tagged = el?.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        const kind = tagged.dataset.cursor as keyof typeof labels;
        setMode("label");
        setLabel(labelsRef.current[kind] ?? "");
        return;
      }
      if (el?.closest("input, textarea, select")) {
        setMode("dot");
        if (ref.current) ref.current.style.opacity = "0";
        return;
      }
      if (ref.current && visible) ref.current.style.opacity = "1";
      setMode(el?.closest("a, button, summary, label, [role='button']") ? "link" : "dot");
    };
    const onLeave = () => {
      visible = false;
      if (ref.current) ref.current.style.opacity = "0";
    };
    const onDown = () => ref.current?.classList.add("is-down");
    const onUp = () => ref.current?.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <div ref={ref} aria-hidden="true" className="cursor" data-mode={mode} style={{ opacity: 0 }}>
      <span className="cursor-body">
        <span className="cursor-label">{label}</span>
      </span>
    </div>
  );
}
