/**
 * Public content API. Every page should import from here, NOT from ./file.
 *
 * Phase A → ./file (file-system adapter)
 * Phase B → ./api  (HTTP adapter, swapped in here)
 */
export type {
  Article,
  BoardMember,
  ContentAdapter,
  LinkEntry,
  Program,
  ProgramListEntry,
  SiteConfig,
  TransparencyEntry,
} from "./types";

export { fileAdapter as content } from "./file";
