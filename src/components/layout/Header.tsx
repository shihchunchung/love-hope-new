import Link from "next/link";

import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Old-site navigation (11 items) preserved 1:1.
 * Split into two rows on desktop to mirror the legacy layout.
 */
const NAV_PRIMARY: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/news", label: "最新消息" },
  { href: "/about/founder", label: "關於薛伯輝先生" },
  { href: "/about", label: "認識薛伯輝基金會" },
  { href: "/programs", label: "愛與希望的慈善版圖" },
  { href: "/about/father-gan", label: "認識甘惠忠神父" },
];

const NAV_SECONDARY: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/love-more", label: "真愛多多！系列活動" },
  { href: "/cultural", label: "文創小品" },
  { href: "/donate", label: "捐款與徵信" },
  { href: "/membership", label: "加入會員" },
  { href: "/venue", label: "場地租借" },
  { href: "/links", label: "相關連結" },
];

function NavRow({
  items,
}: {
  items: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm">
      {items.map((link) => (
        <li
          key={link.href}
          className="relative after:absolute after:top-1/2 after:-right-2.5 after:-translate-y-1/2 after:text-[color:var(--brand-line)] after:content-['|'] last:after:hidden"
        >
          <Link
            href={link.href}
            className="text-[color:var(--brand-warm)] transition-colors hover:text-[color:var(--brand-red)]"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function Header() {
  const site = await content.getSite();

  return (
    <header className="border-b border-[color:var(--brand-line)] bg-background">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <Link
          href="/"
          className="group block text-center"
          aria-label={`${site.name} 首頁`}
        >
          <span
            className={cn(
              "font-serif text-3xl font-semibold tracking-wide text-[color:var(--brand-red)]",
              "transition-colors group-hover:text-[color:var(--brand-red-strong)]",
            )}
          >
            {site.tagline ?? "一步一步向前行"}
          </span>
          <span className="mt-1 block text-sm text-[color:var(--brand-warm)]">
            {site.name}
          </span>
        </Link>

        <nav aria-label="主導覽" className="mt-5 space-y-2">
          <NavRow items={NAV_PRIMARY} />
          <NavRow items={NAV_SECONDARY} />
          {site.social.facebook ? (
            <div className="flex justify-center">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook 粉絲專頁"
                className="text-[color:var(--brand-warm)] transition-colors hover:text-[color:var(--brand-red)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5 3.66 9.14 8.44 9.9v-7H7.9v-2.9h2.54v-2.2c0-2.5 1.5-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7A10 10 0 0 0 22 12.06c0-5.53-4.5-10.02-10-10.02Z" />
                </svg>
              </a>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
