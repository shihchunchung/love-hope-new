# ADR 0001 — Frontend Tech Stack

- Status: Accepted
- Date: 2026-05-26

## Context

舊站 lovehope.org.tw 是純靜態 HTML，使用 `<table>` + `<font>` 排版、
無 viewport meta、187 個中文檔名頁面、606 MB 未最佳化圖片。
重構需求：行動裝置可用、SEO 友善、內容可長期維護、未來接後端不重寫。

分階段策略：Phase A 純前端、檔案內容；Phase B 補後端 API + admin。

## Decision

採用以下技術棧建置 Phase A：

| 層 | 選擇 | 理由 |
|---|---|---|
| Meta-framework | **Next.js 16** (App Router) | RSC 適合「靜態為主、未來再動態化」的 gradient；生態最廣、AI 產出品質最高 |
| UI library | React 19.2 | Next.js 內建；雇人/AI 訓練資料量最大 |
| 語言 | TypeScript 5 strict | 與 Zod schema 型別整合，與未來後端 contract 共用 |
| 樣式 | Tailwind CSS v4 | token 化、不維護自訂 CSS；AI 產出穩定 |
| 元件庫 | shadcn/ui (base-nova) | code-owned，不是黑箱依賴；Radix a11y baseline |
| 內容（長文） | Markdown + frontmatter | 編輯友善、版控、未來轉資料庫容易 |
| 內容（結構化） | JSON | 嚴格用 Zod 驗證 |
| Schema | Zod 4 | 同一份 schema 推 TS type + 執行期驗證 |
| 套件管理 | pnpm | 磁碟省、workspace 支援好 |

## Consequences

**正面：**
- AI 寫 code 品質最穩定（React/Next/Tailwind/shadcn 是 AI 訓練主流組合）
- Phase B 接後端時，只需把 `src/lib/content/file.ts` 換成 `api.ts`，pages 不動
- 公開站可 SSG / ISR，效能與 SEO 顯著優於舊站
- 設計 token 集中於 `tokens.css`，品牌調整不用動元件

**負面 / 取捨：**
- Next.js 16 是新版本，部分 API（async `params`、`cacheLife`/`updateTag`）與訓練資料不同，需以 `node_modules/next/dist/docs/` 為準
- 鎖定 React 生態，未來若要改 Vue 需大幅重寫
- shadcn 元件在 `components/ui/`，需手動同步上游更新

## Out of scope (Phase B 再決定)

- 後端 API 語言（Go / Node / Python 之後再選）
- Admin Console 框架（Refine 候選）
- 資料庫 / 物件儲存 / 部署架構
- 金流串接、會員系統、活動報名
- 完整 i18n（schema 已預留 locale 概念，但不交付英文內容）
