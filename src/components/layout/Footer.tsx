import { content } from "@/lib/content";

export async function Footer() {
  const site = await content.getSite();

  return (
    <footer className="mt-auto border-t border-border bg-[color:var(--brand-cream)] py-10 text-sm text-[color:var(--brand-warm)]">
      <div className="mx-auto max-w-6xl space-y-3 px-6">
        <div className="font-serif text-lg text-[color:var(--brand-red)]">
          {site.name}
        </div>

        <dl className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
          <div className="flex gap-2">
            <dt className="text-muted-foreground">地址</dt>
            <dd>{site.address}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted-foreground">電話</dt>
            <dd>
              <a
                href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`}
                className="hover:text-[color:var(--brand-red)]"
              >
                {site.phone}
              </a>
            </dd>
          </div>
          {site.fax ? (
            <div className="flex gap-2">
              <dt className="text-muted-foreground">傳真</dt>
              <dd>{site.fax}</dd>
            </div>
          ) : null}
          <div className="flex gap-2">
            <dt className="text-muted-foreground">服務信箱</dt>
            <dd>
              <a
                href={`mailto:${site.email}`}
                className="hover:text-[color:var(--brand-red)]"
              >
                {site.email}
              </a>
            </dd>
          </div>
          <div className="flex gap-2 sm:col-span-2">
            <dt className="text-muted-foreground">郵政劃撥</dt>
            <dd>
              帳號 {site.postalAccount.number}　戶名 {site.postalAccount.name}
            </dd>
          </div>
        </dl>

        {site.social.facebook ? (
          <div className="pt-2">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-[color:var(--brand-red)]"
            >
              Facebook 粉絲專頁 →
            </a>
          </div>
        ) : null}
      </div>
    </footer>
  );
}
