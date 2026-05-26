import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root so Turbopack doesn't walk up the tree
    // and pick a stray lockfile in a parent directory.
    root: projectRoot,
  },
};

export default nextConfig;
