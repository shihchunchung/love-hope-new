import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "場地租借" };

export default function VenuePage() {
  return (
    <PlaceholderPage
      title="場地租借"
      description="愛的講堂、惠如美學教室與遇見輕食的場地租借資訊。"
      legacyHref="https://www.lovehope.org.tw/%E5%A0%B4%E5%9C%B0%E7%A7%9F%E5%80%9F.html"
    />
  );
}
