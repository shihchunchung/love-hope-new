import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { content } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const dateFormatter = new Intl.DateTimeFormat("zh-TW", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export async function generateStaticParams() {
  const news = await content.listNews();
  return news.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await content.getNews(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await content.getNews(slug);

  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="border-b border-border pb-6">
        <time
          dateTime={article.publishedAt.toISOString()}
          className="text-sm text-muted-foreground"
        >
          {dateFormatter.format(article.publishedAt)}　·　約 {article.readingMinutes} 分鐘
        </time>
        <h1 className="mt-3 font-serif text-3xl font-semibold leading-snug text-[color:var(--brand-red)] sm:text-4xl">
          {article.title}
        </h1>
        {article.summary ? (
          <p className="mt-4 text-base text-[color:var(--brand-warm)]">
            {article.summary}
          </p>
        ) : null}
      </header>

      <div
        className="prose prose-zinc mt-8 max-w-none prose-headings:font-serif prose-headings:text-foreground prose-a:text-[color:var(--brand-olive)] hover:prose-a:text-[color:var(--brand-red)]"
        dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
      />
    </article>
  );
}
