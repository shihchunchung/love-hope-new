import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/**
 * Static export targeting GitHub Pages at
 *   https://shihchunchung.github.io/love-hope-new/
 *
 * - `output: "export"` produces a fully static `out/` directory
 * - `basePath` / `assetPrefix` route through the /love-hope-new sub-path
 * - `images.unoptimized` is required because GH Pages has no image optimizer
 * - `trailingSlash` makes /news resolve to /news/index.html on Pages
 *
 * The base path is overridable via NEXT_PUBLIC_BASE_PATH so a future custom
 * domain (or local preview) can drop it without editing this file.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/love-hope-new";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
