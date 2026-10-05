"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { cities } from "@/content/cities";
import { copy } from "@/content/copy";
import { contentMode } from "@/lib/env";
import type { Locale } from "@/lib/i18n";

/**
 * City filter. Old /shops/{city} and /try URLs land here with ?city= or
 * ?type=. No stockist is verified yet, so every city shows the empty state
 * that points to online ordering.
 */
export function CityFilter({ locale, email }: { locale: Locale; email: string }) {
  const params = useSearchParams();
  const initial = params.get("city") ?? "";
  const [city, setCity] = useState(cities.some((c) => c.slug === initial) ? initial : "");
  const c = copy.whereToBuy;
  const sorted = [...cities].sort((a, b) => a.name[locale].localeCompare(b.name[locale], locale === "ua" ? "uk" : locale));

  return (
    <div>
      <label className="field max-w-sm">
        {c.cityFilter[locale]}
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">—</option>
          {sorted.map((ct) => (
            <option key={ct.slug} value={ct.slug}>
              {ct.name[locale]}
            </option>
          ))}
        </select>
      </label>
      {city && (
        <p role="status" className="mt-5 rounded-xl bg-husk px-4 py-3">
          {c.cityEmpty[locale]}
        </p>
      )}
      <a href={`mailto:${email}`} className="link mt-6 inline-block font-medium">
        {c.writeUs[locale]}
      </a>
      {contentMode === "preview" && (
        <div className="mt-10 rounded-xl border border-dashed border-grain p-4 text-sm text-muted">
          <p>{c.previewCities[locale]}</p>
          <p className="mt-2">{sorted.map((ct) => ct.name[locale]).join(", ")}</p>
        </div>
      )}
    </div>
  );
}
