import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const processor = remark().use(remarkGfm).use(remarkHtml, { sanitize: false });

export async function renderMarkdown(source: string): Promise<string> {
  const file = await processor.process(source);
  return String(file);
}
