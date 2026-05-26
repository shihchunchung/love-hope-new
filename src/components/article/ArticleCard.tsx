import Link from "next/link";

import type { Article } from "@/lib/content";

interface Props {
  article: Article;
  hrefBase: string;
}

const dateFormatter = new Intl.DateTimeFormat("zh-TW", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function ArticleCard({ article, hrefBase }: Props) {
  const href = `${hrefBase}/${article.slug}`;
  return (
    <article className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-[color:var(--brand-red)]">
      <Link href={href} className="block focus:outline-none">
        <time
          dateTime={article.publishedAt.toISOString()}
          className="text-xs text-muted-foreground"
        >
          {dateFormatter.format(article.publishedAt)}
        </time>
        <h3 className="mt-2 font-serif text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-[color:var(--brand-red)]">
          {article.title}
        </h3>
        {article.summary ? (
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
            {article.summary}
          </p>
        ) : null}
        {article.tags.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <li
                key={tag}
                className="rounded bg-[color:var(--brand-cream)] px-2 py-0.5 text-xs text-[color:var(--brand-warm)]"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </Link>
    </article>
  );
}
