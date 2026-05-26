import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";

import { SiteConfigSchema } from "./schemas";
import type { ContentAdapter, SiteConfig } from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export const fileAdapter: ContentAdapter = {
  getSite: cache(async (): Promise<SiteConfig> => {
    const raw = await fs.readFile(
      path.join(CONTENT_ROOT, "data/site.json"),
      "utf8",
    );
    return SiteConfigSchema.parse(JSON.parse(raw));
  }),
};
