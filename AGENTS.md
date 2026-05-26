# love-hope-new — AI 工作約定

> 本檔（AGENTS.md）由 CLAUDE.md 透過 `@AGENTS.md` 直接引用。
> 任何 AI 開始工作前，必須先讀完本檔。

## 1. 專案目標

財團法人薛伯輝基金會的全新前端。Phase A：純靜態網站，內容來自 `content/`。
Phase B（未來）：補後端 API、後台 admin、捐款金流；目前先不要實作。

## 2. 技術棧（不要替換）

- Next.js 16 (App Router)、React 19.2、TypeScript strict
- Tailwind CSS v4、shadcn/ui（base-nova、neutral）
- Content: Markdown + frontmatter（長文）+ JSON（資料），全部用 Zod 驗證
- 表單: react-hook-form + Zod（之後才會用到）
- 套件管理: pnpm

## 3. 寫法強制

- **預設 React Server Component**；需要 hooks、事件、瀏覽器 API 才加 `'use client'`
- **不要直接 `fetch` 或 `fs` 讀內容**；一律呼叫 `import { content } from "@/lib/content"`
- 狀態：本地 `useState`；跨頁狀態用 URL search params；**不要引入 Redux/Zustand/Jotai**
- **不要引入新的 UI lib**；缺元件用 `pnpm dlx shadcn@latest add <name>`
- 樣式只用 Tailwind class + `src/styles/tokens.css` 的 CSS 變數；**不要 inline `style={{}}`**
- Next 16 的 `params` / `searchParams` 都是 `Promise`，記得 `await`

## 4. 目錄不可動

- `src/lib/content/types.ts` 的 `ContentAdapter` 介面（Phase B 換實作不換簽章）
- `src/styles/tokens.css` 的 token 名稱
- `content/` 由人類維護，AI 不要直接增刪內容檔
- `components/ui/` 由 shadcn 產出，不要手改
- `node_modules/`、`.next/`、`pnpm-lock.yaml`

## 5. PR / commit 前必過

```
pnpm typecheck   # tsc --noEmit
pnpm lint        # eslint
pnpm build       # next build
```

`lefthook` 已設定 pre-commit 自動跑 typecheck + lint + format。

## 6. 命名與檔案

- 路由用 kebab-case 英文 slug，**不要中文 URL**（舊站 SEO 透過 redirect 處理）
- Component 檔名 PascalCase；utility 檔名 kebab-case
- Schema 命名後綴 `Schema`，infer 出來的 type 不加後綴
- 一個 component 一檔；inline 子 component 限定於同檔內使用時可

## 7. 不要做的事

- 不要動 `package.json` 的 dependencies 區段而不說
- 不要刪除既有檔案（除非明確被要求）
- 不要把 secret / API key 寫死在 source
- 不要為了「修 build」而 `// @ts-ignore` 或 `eslint-disable-next-line` 過多；先問
- 不要建文檔 `.md` 在專案根（`docs/adr/` 以外），除非被要求
