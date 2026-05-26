import { z } from "zod";

/**
 * Long-form Markdown content (frontmatter) ------------------------------------
 * Used by: content/news, content/events, content/board, content/programs
 */

export const ArticleFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().optional(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  cover: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]).default("published"),
  legacyUrl: z.string().optional(),
});

export const BoardMemberFrontmatterSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  title: z.string().min(1),
  photo: z.string().optional(),
  order: z.number().int().nonnegative(),
  active: z.boolean().default(true),
});

export const ProgramFrontmatterSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(["care", "education", "culture", "other"]),
  region: z.string().optional(),
  cover: z.string().optional(),
  order: z.number().int().nonnegative().default(0),
  active: z.boolean().default(true),
});

/**
 * Structured JSON data --------------------------------------------------------
 * Used by: content/data/*.json
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
      instagram: z.url().optional(),
      youtube: z.url().optional(),
    })
    .partial(),
});

export const TransparencyEntrySchema = z.object({
  year: z.number().int(),
  type: z.enum([
    "donor-list",
    "financial-report",
    "program-report",
    "license",
    "other",
  ]),
  title: z.string(),
  file: z.string(),
  publishedAt: z.coerce.date().optional(),
});
export const TransparencyListSchema = z.array(TransparencyEntrySchema);

export const ProgramListEntrySchema = z.object({
  slug: z.string(),
  name: z.string(),
  category: z.enum(["care", "education", "culture", "other"]),
  region: z.string().optional(),
  cover: z.string().optional(),
  order: z.number().int().nonnegative().default(0),
});
export const ProgramListSchema = z.array(ProgramListEntrySchema);

export const BoardListEntrySchema = z.object({
  slug: z.string(),
  name: z.string(),
  title: z.string(),
  photo: z.string().optional(),
  order: z.number().int().nonnegative(),
  active: z.boolean().default(true),
});
export const BoardListSchema = z.array(BoardListEntrySchema);

export const LinkEntrySchema = z.object({
  name: z.string(),
  url: z.url(),
  category: z.string().optional(),
});
export const LinksListSchema = z.array(LinkEntrySchema);
