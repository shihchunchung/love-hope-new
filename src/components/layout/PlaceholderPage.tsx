import Link from "next/link";

interface Props {
  title: string;
  description?: string;
  legacyHref?: string;
}

/**
 * Stub used by routes that exist in the nav but whose content hasn't
 * been migrated yet. Visible on production so the nav doesn't 404, but
 * makes the work-in-progress state explicit.
 */
export function PlaceholderPage({ title, description, legacyHref }: Props) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl font-semibold text-[color:var(--brand-red)] sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 text-base text-[color:var(--brand-warm)]">
          {description}
        </p>
      ) : null}

      <div className="mt-8 rounded-lg border border-dashed border-[color:var(--brand-line)] bg-[color:var(--brand-cream)] p-6 text-sm text-[color:var(--brand-warm)]">
        <p className="font-medium">頁面建置中</p>
        <p className="mt-2 leading-relaxed">
          這個頁面的內容仍在重新編輯與整理。原始資訊可在舊版網站查閱，
          或是回首頁瀏覽其他單元。
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-[color:var(--brand-red)] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[color:var(--brand-red-strong)]"
          >
            回首頁
          </Link>
          {legacyHref ? (
            <a
              href={legacyHref}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-[color:var(--brand-warm)]/40 px-4 py-2 text-xs font-medium text-[color:var(--brand-warm)] transition-colors hover:border-[color:var(--brand-red)] hover:text-[color:var(--brand-red)]"
            >
              查看舊版
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
