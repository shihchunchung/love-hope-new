import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "文創小品" };

export default function CulturalPage() {
  return (
    <PlaceholderPage
      title="文創小品"
      description="基金會合作藝術家、出版品與公益商品（建置中）。"
    />
  );
}
