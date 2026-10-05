"use client";

/**
 * Motion core. GSAP + plugins are loaded once, lazily, on the client.
 * Every scene goes through `useScene`, which:
 *  - skips entirely when the visitor prefers reduced motion (content stays
 *    fully readable in its static layout),
 *  - scopes selectors and cleans up with gsap.context on unmount/route change.
 */
import { useEffect, type RefObject } from "react";
import type { gsap as GSAP } from "gsap";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import type { SplitText as Split } from "gsap/SplitText";

export type Motion = { gsap: typeof GSAP; ScrollTrigger: typeof ST; SplitText: typeof Split };

let loading: Promise<Motion> | null = null;

export function loadMotion(): Promise<Motion> {
  if (!loading) {
    loading = Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/SplitText")]).then(
      ([g, s, t]) => {
        g.gsap.registerPlugin(s.ScrollTrigger, t.SplitText);
        g.gsap.defaults({ ease: "power3.out" });
        return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger, SplitText: t.SplitText };
      },
    );
  }
  return loading;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Run a GSAP scene scoped to `ref`. The setup may return an extra cleanup. */
export function useScene(
  ref: RefObject<HTMLElement | null>,
  setup: (m: Motion, root: HTMLElement) => void | (() => void),
  deps: unknown[] = [],
) {
  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    let extra: void | (() => void);
    let cancelled = false;

    loadMotion().then((m) => {
      if (cancelled) return;
      ctx = m.gsap.context(() => {
        extra = setup(m, root);
      }, root);
      // Fonts and images change layout after first paint.
      m.ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      if (typeof extra === "function") extra();
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
