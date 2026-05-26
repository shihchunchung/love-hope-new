import Image from "next/image";

import { asset } from "@/lib/asset";
import { content } from "@/lib/content";

/**
 * Legacy 1:1 footer block, present on every page of the original site:
 *
 *   80px spacer
 *   bottom2.png  (1000px wide decorative band)
 *   contact line in 微軟正黑體 16px #898989:
 *     地址 · 電話 · 傳真 · 服務信箱
 *     郵政劃撥 帳號 · 戶名
 */
export async function Footer() {
  const site = await content.getSite();
  return (
    <footer className="mx-auto w-full max-w-[1000px] px-4">
      <div className="h-20" aria-hidden="true" />
      <Image
        src={asset("/legacy/bottom2.png")}
        alt=""
        width={1000}
        height={80}
        className="block h-auto w-full"
      />
      <div className="py-6 text-center text-[16px] leading-relaxed text-[#898989]">
        <p>
          地址: {site.address}
          {"　"}
          電話:{" "}
          <a
            href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`}
            className="text-[#817C54] hover:text-[#8b0000]"
          >
            {site.phone}
          </a>
          {site.fax ? `　傳真: ${site.fax}` : null}
          {"　"}
          服務信箱:{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-[#817C54] hover:text-[#8b0000]"
          >
            {site.email}
          </a>
        </p>
        <p>
          郵政劃撥{"　"}帳號: {site.postalAccount.number}
          {"　"}戶名: {site.postalAccount.name}
        </p>
      </div>
    </footer>
  );
}
