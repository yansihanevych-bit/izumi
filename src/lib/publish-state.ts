import { citySlugs } from "@/content/cities";
import { claims } from "@/content/facts";
import type { PublishState } from "./redirects";

/**
 * Derives what is live from content, so publishing is a content change,
 * not a code change.
 *
 * Stores are not imported yet (Phase 10). Until verified stores exist, no
 * city page is published and every /ua/shops/{city} 301s to the filtered
 * where-to-buy list.
 */
export function getPublishState(): PublishState {
  const verifiedStoreCities: string[] = []; // TODO(client): fill from verified stores

  return {
    benefitsPublished: claims.some(
      (c) => c.status === "approved" && c.evidence && c.risk !== "low",
    ),
    publishedCities: new Set(citySlugs.filter((s) => verifiedStoreCities.includes(s))),
  };
}
