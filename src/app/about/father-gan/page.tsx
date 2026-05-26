import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "認識甘惠忠神父" };

export default function FatherGanPage() {
  return (
    <PlaceholderPage
      title="認識甘惠忠神父"
      description="伯利恆早療暨融合教育中心推手 — 甘惠忠神父的服務歷程。"
      legacyHref="https://www.lovehope.org.tw/%E8%AA%8D%E8%AD%98%E7%94%98%E6%83%A0%E5%BF%A0%E7%A5%9E%E7%88%B6.html"
    />
  );
}
