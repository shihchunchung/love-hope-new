import type { Metadata } from "next";

import { ArticleCard } from "@/components/article/ArticleCard";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "最新消息",
};

export default async function NewsIndexPage() {
  const news = await content.listNews();

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          最新消息
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          基金會所有公開的訊息與報告。
        </p>
      </header>

      {news.length === 0 ? (
        <p className="text-muted-foreground">目前沒有任何消息。</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2">
          {news.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} hrefBase="/news" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
