"use client";

import { useEffect, useState } from "react";

/** Preview disclaimer, dismissible for this browser session. */
export function PreviewNote({ text, closeLabel }: { text: string; closeLabel: string }) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    try {
      if (sessionStorage.getItem("izumi_preview_note") === "0") setOpen(false);
    } catch {
      /* storage blocked: keep it visible */
    }
  }, []);
  if (!open) return null;
  return (
    <div role="note" className="fixed bottom-3 left-3 z-[70] flex max-w-[min(28rem,calc(100%-1.5rem))] items-start gap-3 rounded-2xl bg-spring px-4 py-2.5 text-[0.8125rem] leading-snug text-paper shadow-lg">
      <p>{text}</p>
      <button
        type="button"
        onClick={() => {
          setOpen(false);
          try {
            sessionStorage.setItem("izumi_preview_note", "0");
          } catch {
            /* ignore */
          }
        }}
        className="-mr-1 shrink-0 rounded-full px-2 text-base leading-none text-paper/80 hover:text-paper"
        aria-label={closeLabel}
      >
        ×
      </button>
    </div>
  );
}
