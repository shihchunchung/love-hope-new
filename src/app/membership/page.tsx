import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "加入會員" };

export default function MembershipPage() {
  return (
    <PlaceholderPage
      title="加入會員"
      description="會員制度與報名方式（建置中）。"
    />
  );
}
