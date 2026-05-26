import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "捐款與徵信" };

export default function DonatePage() {
  return (
    <PlaceholderPage
      title="捐款與徵信"
      description="捐款方式、年度捐款人名冊、財務報表與政府補助案明細。"
      legacyHref="https://www.lovehope.org.tw/%E6%8D%90%E6%AC%BE%E6%96%B9%E5%BC%8F.html"
    />
  );
}
