import type { z } from "zod";

import type { SiteConfigSchema } from "./schemas";

export type SiteConfig = z.infer<typeof SiteConfigSchema>;

export interface ContentAdapter {
  getSite(): Promise<SiteConfig>;
}
