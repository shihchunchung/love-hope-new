import type { Metadata } from "next";

import { content } from "@/lib/content";

export const metadata: Metadata = { title: "相關連結" };

export default async function LinksPage() {
  const links = await content.getLinks();

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl font-semibold text-[color:var(--brand-red)] sm:text-4xl">
        相關連結
      </h1>
      <p className="mt-4 text-base text-[color:var(--brand-warm)]">
        基金會合作的夥伴機構與相關資源。
      </p>

      {links.length === 0 ? (
        <p className="mt-8 text-muted-foreground">尚未列出連結。</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {links.map((link) => (
            <li
              key={link.url}
              className="rounded-lg border border-[color:var(--brand-line)] p-4 transition-colors hover:border-[color:var(--brand-red)]"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="block"
              >
                <span className="font-medium text-foreground hover:text-[color:var(--brand-red)]">
                  {link.name}
                </span>
                {link.category ? (
                  <span className="ml-2 text-xs text-muted-foreground">
                    {link.category}
                  </span>
                ) : null}
                <span className="mt-1 block text-xs text-[color:var(--brand-olive)]">
                  {link.url} →
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
