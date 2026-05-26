/**
 * Public content API. Currently only exposes site identity / contact info
 * for the footer. More entities (news, events, programs) will be added when
 * those pages get ported from the legacy site.
 */
export type { ContentAdapter, SiteConfig } from "./types";
export { fileAdapter as content } from "./file";
