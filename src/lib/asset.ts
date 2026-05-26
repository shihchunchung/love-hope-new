/**
 * basePath-aware helper for static asset URLs.
 *
 * Next.js 16 auto-applies the configured basePath to `<Link>` and to
 * `_next/static/*`, but does NOT apply it to `next/image` src or to raw
 * `<img>` tags pointing into `public/`. This helper closes that gap.
 *
 * The value mirrors next.config.ts:
 *   basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/love-hope-new"
 *
 * For Next.js to inline NEXT_PUBLIC_* into the client bundle, the env
 * variable must be available at build time. We expose it via the
 * `env` field in next.config.ts.
 */

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalised}`;
}
