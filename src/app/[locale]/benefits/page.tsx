import { notFound } from "next/navigation";
import { getPublishState } from "@/lib/publish-state";

/**
 * Benefits is published only once claims have documentary evidence
 * (content/facts.ts). Until then the route 404s and is absent from the sitemap.
 */
export default function Benefits() {
  if (!getPublishState().benefitsPublished) notFound();
  return null;
}
