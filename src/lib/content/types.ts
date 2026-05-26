import type { z } from "zod";
import type {
  ArticleFrontmatterSchema,
  BoardListEntrySchema,
  BoardMemberFrontmatterSchema,
  LinkEntrySchema,
  ProgramFrontmatterSchema,
  ProgramListEntrySchema,
  SiteConfigSchema,
  TransparencyEntrySchema,
} from "./schemas";

export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>;
export type BoardMemberFrontmatter = z.infer<
  typeof BoardMemberFrontmatterSchema
>;
export type ProgramFrontmatter = z.infer<typeof ProgramFrontmatterSchema>;

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type TransparencyEntry = z.infer<typeof TransparencyEntrySchema>;
export type ProgramListEntry = z.infer<typeof ProgramListEntrySchema>;
export type BoardListEntry = z.infer<typeof BoardListEntrySchema>;
export type LinkEntry = z.infer<typeof LinkEntrySchema>;

/**
 * Article = frontmatter + rendered HTML body + reading metadata.
 * Stable across Phase A (file) and Phase B (api) — only the adapter implementation changes.
 */
export interface Article extends ArticleFrontmatter {
  bodyHtml: string;
  readingMinutes: number;
}

export interface BoardMember extends BoardMemberFrontmatter {
  bodyHtml: string;
}

export interface Program extends ProgramFrontmatter {
  bodyHtml: string;
}

/**
 * Public adapter contract. Phase B will swap the implementation
 * (file system → backend API) without changing this interface.
 */
export interface ContentAdapter {
  // Articles (news / events)
  listNews(): Promise<Article[]>;
  getNews(slug: string): Promise<Article | null>;
  listEvents(): Promise<Article[]>;
  getEvent(slug: string): Promise<Article | null>;

  // Board members
  listBoard(): Promise<BoardMember[]>;
  getBoardMember(slug: string): Promise<BoardMember | null>;

  // Programs
  listPrograms(): Promise<Program[]>;
  getProgram(slug: string): Promise<Program | null>;

  // Structured data
  getSite(): Promise<SiteConfig>;
  getTransparency(): Promise<TransparencyEntry[]>;
  getLinks(): Promise<LinkEntry[]>;
}
