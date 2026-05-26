import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "真愛多多！系列活動" };

export default function LoveMorePage() {
  return (
    <PlaceholderPage
      title="真愛多多！系列活動"
      description="伯利恆早療暨融合教育中心興建計畫、年度紀錄與愛心夥伴。"
      legacyHref="https://www.lovehope.org.tw/%E7%9C%9F%E6%84%9B%E5%A4%9A%E5%A4%9A%E7%B3%BB%E5%88%97%E6%B4%BB%E5%8B%95.html"
    />
  );
}
