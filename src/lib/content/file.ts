import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";

import matter from "gray-matter";
import readingTime from "reading-time";
import type { ZodType } from "zod";

import { renderMarkdown } from "./markdown";
import {
  ArticleFrontmatterSchema,
  BoardListSchema,
  BoardMemberFrontmatterSchema,
  LinksListSchema,
  ProgramFrontmatterSchema,
  ProgramListSchema,
  SiteConfigSchema,
  TransparencyListSchema,
} from "./schemas";
import type {
  Article,
  BoardMember,
  ContentAdapter,
  LinkEntry,
  Program,
  SiteConfig,
  TransparencyEntry,
} from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

async function readDir(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && e.name.endsWith(".md"))
      .filter((e) => !e.name.startsWith("_")) // _example.md, drafts
      .map((e) => path.join(dir, e.name));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function readJson<T>(
  relPath: string,
  schema: ZodType<T>,
): Promise<T> {
  const raw = await fs.readFile(path.join(CONTENT_ROOT, relPath), "utf8");
  return schema.parse(JSON.parse(raw));
}

async function readArticleFile(file: string): Promise<Article> {
  const raw = await fs.readFile(file, "utf8");
  const { data, content } = matter(raw);
  const front = ArticleFrontmatterSchema.parse(data);
  const bodyHtml = await renderMarkdown(content);
  return {
    ...front,
    bodyHtml,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

async function readBoardMemberFile(file: string): Promise<BoardMember> {
  const raw = await fs.readFile(file, "utf8");
  const { data, content } = matter(raw);
  const front = BoardMemberFrontmatterSchema.parse(data);
  const bodyHtml = await renderMarkdown(content);
  return { ...front, bodyHtml };
}

async function readProgramFile(file: string): Promise<Program> {
  const raw = await fs.readFile(file, "utf8");
  const { data, content } = matter(raw);
  const front = ProgramFrontmatterSchema.parse(data);
  const bodyHtml = await renderMarkdown(content);
  return { ...front, bodyHtml };
}

function compareArticleDesc(a: Article, b: Article): number {
  return b.publishedAt.getTime() - a.publishedAt.getTime();
}

async function loadArticleList(subdir: string): Promise<Article[]> {
  const dir = path.join(CONTENT_ROOT, subdir);
  const files = await readDir(dir);
  const items = await Promise.all(files.map(readArticleFile));
  return items
    .filter((a) => a.status === "published")
    .sort(compareArticleDesc);
}

async function loadArticleBySlug(
  subdir: string,
  slug: string,
): Promise<Article | null> {
  const all = await loadArticleList(subdir);
  return all.find((a) => a.slug === slug) ?? null;
}

/**
 * Adapter: Phase A — file-based.
 * Each method is wrapped in React.cache() so multiple components in the same
 * render tree (e.g. layout + page) read the disk only once per request.
 */
export const fileAdapter: ContentAdapter = {
  listNews: cache(() => loadArticleList("news")),
  getNews: cache((slug: string) => loadArticleBySlug("news", slug)),
  listEvents: cache(() => loadArticleList("events")),
  getEvent: cache((slug: string) => loadArticleBySlug("events", slug)),

  listBoard: cache(async (): Promise<BoardMember[]> => {
    const files = await readDir(path.join(CONTENT_ROOT, "board"));
    const items = await Promise.all(files.map(readBoardMemberFile));
    return items
      .filter((m) => m.active)
      .sort((a, b) => a.order - b.order);
  }),
  getBoardMember: cache(async (slug: string): Promise<BoardMember | null> => {
    const all = await fileAdapter.listBoard();
    return all.find((m) => m.slug === slug) ?? null;
  }),

  listPrograms: cache(async (): Promise<Program[]> => {
    const files = await readDir(path.join(CONTENT_ROOT, "programs"));
    const items = await Promise.all(files.map(readProgramFile));
    return items
      .filter((p) => p.active)
      .sort((a, b) => a.order - b.order);
  }),
  getProgram: cache(async (slug: string): Promise<Program | null> => {
    const all = await fileAdapter.listPrograms();
    return all.find((p) => p.slug === slug) ?? null;
  }),

  getSite: cache(
    (): Promise<SiteConfig> => readJson("data/site.json", SiteConfigSchema),
  ),
  getTransparency: cache(
    (): Promise<TransparencyEntry[]> =>
      readJson("data/transparency.json", TransparencyListSchema),
  ),
  getLinks: cache(
    (): Promise<LinkEntry[]> => readJson("data/links.json", LinksListSchema),
  ),
};

// Re-export structured-data schemas the adapter doesn't directly need elsewhere
// but consumers may want to validate against (e.g. legacy import script).
export { BoardListSchema, ProgramListSchema };
