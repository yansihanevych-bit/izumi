"use client";

import { copy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";

export function QuantityStepper({
  value,
  onChange,
  locale,
  label,
  size = "md",
}: {
  value: number;
  onChange: (n: number) => void;
  locale: Locale;
  label?: string;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-9" : "h-12";
  const w = size === "sm" ? "w-9" : "w-11";
  return (
    <div
      role="group"
      aria-label={label ?? copy.cart.quantity[locale]}
      className={`inline-flex ${h} items-center rounded-full border border-line`}
    >
      <button
        type="button"
        className={`${w} ${h} grid place-items-center rounded-full text-lg disabled:opacity-35`}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label={copy.cart.decrease[locale]}
      >
        −
      </button>
      <output key={value} className="bump min-w-6 text-center tabular-nums" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className={`${w} ${h} grid place-items-center rounded-full text-lg disabled:opacity-35`}
        onClick={() => onChange(value + 1)}
        disabled={value >= 20}
        aria-label={copy.cart.increase[locale]}
      >
        +
      </button>
    </div>
  );
}
