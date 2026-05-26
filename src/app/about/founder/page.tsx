import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "關於薛伯輝先生" };

export default function FounderPage() {
  return (
    <PlaceholderPage
      title="關於薛伯輝先生"
      description="基金會的命名由來與薛伯輝先生的生平故事。"
      legacyHref="https://www.lovehope.org.tw/%E9%97%9C%E6%96%BC%E8%96%9B%E4%BC%AF%E8%BC%9D%E5%85%88%E7%94%9F.html"
    />
  );
}
