import { z } from "zod";

/**
 * Site-wide contact / identity info shown in the footer.
 * Mirrors what the legacy index.html prints in its footer cell.
 */
export const SiteConfigSchema = z.object({
  name: z.string(),
  shortName: z.string().optional(),
  tagline: z.string().optional(),
  address: z.string(),
  phone: z.string(),
  fax: z.string().optional(),
  email: z.email(),
  postalAccount: z.object({
    number: z.string(),
    name: z.string(),
  }),
  social: z
    .object({
      facebook: z.url().optional(),
    })
    .partial(),
});
