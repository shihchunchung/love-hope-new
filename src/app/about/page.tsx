import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "認識薛伯輝基金會" };

export default function AboutPage() {
  return (
    <PlaceholderPage
      title="認識薛伯輝基金會"
      description="基金會緣起、宗旨、簡史與董事會。"
      legacyHref="https://www.lovehope.org.tw/%E7%B7%A3%E8%B5%B7.html"
    />
  );
}
