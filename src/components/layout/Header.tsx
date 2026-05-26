import Image from "next/image";
import Link from "next/link";

import { asset } from "@/lib/asset";

/**
 * Legacy 1:1 — title block + two nav rows + FB icon, mirroring what
 * lovehope.org.tw/index.html prints. Title and subtitle are hard-coded
 * because the legacy site hard-codes them too; site.json only feeds the
 * footer.
 */

const NAV_ROW_1: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/news", label: "最新消息" },
  { href: "/about/founder", label: "關於薛伯輝先生" },
  { href: "/about", label: "認識薛伯輝基金會" },
  { href: "/programs", label: "愛與希望的慈善版圖" },
  { href: "/about/father-gan", label: "認識甘惠忠神父" },
];

// 文創小品 and 加入會員 have no destination on the legacy site (the legacy
// <a> tags simply lack href). Reproduce that with span instead of Link.
const NAV_ROW_2: ReadonlyArray<{ href: string | null; label: string }> = [
  { href: "/love-more", label: "真愛多多！系列活動" },
  { href: null, label: "文創小品" },
  { href: "/donate", label: "捐款與徵信" },
  { href: null, label: "加入會員" },
  { href: "/venue", label: "場地租借" },
  { href: "/links", label: "相關連結" },
];

const FB_URL = "https://www.facebook.com/LoveHopeF";

function NavItem({ item }: { item: { href: string | null; label: string } }) {
  const cls = "text-[#817C54] hover:text-[#8b0000] transition-colors";
  return item.href ? (
    <Link href={item.href} className={cls}>
      {item.label}
    </Link>
  ) : (
    <span className={`${cls} cursor-default`}>{item.label}</span>
  );
}

function NavRow({
  items,
  withFacebook,
}: {
  items: ReadonlyArray<{ href: string | null; label: string }>;
  withFacebook?: boolean;
}) {
  return (
    <div className="text-center text-[18px] leading-relaxed">
      {items.map((item, i) => (
        <span key={item.label}>
          <span className="px-[3px]">|</span>
          <NavItem item={item} />
          {i === items.length - 1 ? (
            <>
              {withFacebook ? (
                <>
                  {" "}
                  <a
                    href={FB_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Facebook 粉絲專頁"
                    className="inline-block align-text-bottom"
                  >
                    <Image
                      src={asset("/legacy/FB-picture.png")}
                      alt=""
                      width={20}
                      height={20}
                      className="inline align-text-bottom"
                    />
                  </a>
                </>
              ) : null}
              <span className="px-[3px]">|</span>
            </>
          ) : null}
        </span>
      ))}
    </div>
  );
}

export function Header() {
  return (
    <header className="mx-auto w-full max-w-[1000px] px-4 pt-2">
      {/* Inline span + <br> matches the legacy <font><b>…</b><br><font>…</font></font>
          structure so the gap between title and subtitle comes from the
          parent line-height (driven by the larger 30px inline span),
          not from a block-element margin. */}
      <h1 className="text-center leading-normal">
        <span className="text-[30px] font-bold text-[#8b0000]">
          一步一步向前行
        </span>
        <br />
        <span className="text-[24px] font-bold text-[#524741]">
          美濃文創中心-搖籃咖啡x惠如小屋
        </span>
      </h1>
      <nav aria-label="主導覽" className="mt-2 space-y-1">
        <NavRow items={NAV_ROW_1} />
        <NavRow items={NAV_ROW_2} withFacebook />
      </nav>
    </header>
  );
}
