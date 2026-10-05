/** Build-time switches. All default to the safe "preview" behaviour. */

/** "production" hides every TODO(client) value; anything else shows it. */
export const contentMode: "preview" | "production" =
  process.env.NEXT_PUBLIC_CONTENT_MODE === "production" ? "production" : "preview";

/** Only the real production domain may be indexed. */
export const siteEnv: "preview" | "production" =
  process.env.NEXT_PUBLIC_SITE_ENV === "production" ? "production" : "preview";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://izumi-tea.vercel.app").replace(/\/$/, "");

/** GTM (GTM-KB2GCNL) is the live container: never load it from a preview. */
export const analyticsEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "1";
