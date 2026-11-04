/**
 * Canonical public origin of the site, used for metadataBase, sitemap.xml
 * and robots.txt. Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL (set this when a custom domain is attached)
 *   2. VERCEL_PROJECT_PRODUCTION_URL (system env var provided by Vercel)
 *   3. The known production deployment
 * It never falls back to localhost, so production SEO URLs stay correct even
 * when no environment variable is configured.
 */
const PRODUCTION_URL = "https://car-psi-inky.vercel.app";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelHost) return `https://${vercelHost.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;

  return PRODUCTION_URL;
}

export const SITE_URL = resolveSiteUrl();
