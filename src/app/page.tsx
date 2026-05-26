import Link from "next/link";

import { ArticleCard } from "@/components/article/ArticleCard";
import { content } from "@/lib/content";

export default async function HomePage() {
  const [site, news] = await Promise.all([
    content.getSite(),
    content.listNews(),
  ]);
  const latest = news.slice(0, 3);

  return (
    <>
      <section className="bg-[color:var(--brand-cream)] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm tracking-widest text-[color:var(--brand-olive)]">
            {site.tagline}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[color:var(--brand-red)] sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-6 text-base text-[color:var(--brand-warm)] sm:text-lg">
            自 1996 年起，以「愛與希望」為核心，
            <br className="hidden sm:inline" />
            支持偏鄉早療、特殊教育、文化推廣與在地創生。
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/donate"
              className="rounded-full bg-[color:var(--brand-red)] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[color:var(--brand-red-strong)]"
            >
              支持我們
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-[color:var(--brand-warm)]/40 px-6 py-2.5 text-sm font-medium text-[color:var(--brand-warm)] transition-colors hover:border-[color:var(--brand-red)] hover:text-[color:var(--brand-red)]"
            >
              認識基金會
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            最新消息
          </h2>
          <Link
            href="/news"
            className="text-sm text-[color:var(--brand-olive)] hover:text-[color:var(--brand-red)]"
          >
            看全部 →
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="text-muted-foreground">尚無消息。</p>
        ) : (
          <ul className="grid gap-5 md:grid-cols-3">
            {latest.map((article) => (
              <li key={article.slug}>
                <ArticleCard article={article} hrefBase="/news" />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
