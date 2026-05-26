import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "愛與希望的慈善版圖" };

export default function ProgramsPage() {
  return (
    <PlaceholderPage
      title="愛與希望的慈善版圖"
      description="基金會長期支持的公益機構、學校與服務對象。"
      legacyHref="https://www.lovehope.org.tw/%E6%84%9B%E8%88%87%E5%B8%8C%E6%9C%9B%E7%9A%84%E6%85%88%E5%96%84%E7%89%88%E5%9C%96.html"
    />
  );
}
