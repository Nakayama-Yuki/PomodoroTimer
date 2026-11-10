<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PomodoroTimer 開発ガイド

## プロジェクト概要

Next.js 16、React 19、TypeScript、Tailwind CSS v4 で構築された日本語のポモドーロタイマーアプリです。集中時間と休憩時間のデュアルタイマーシステムで、プリセット時間オプションを提供します。

## アーキテクチャとパターン

### コンポーネント構造

- **ページコンポーネント** (`src/app/page.tsx`): React hooks で集中/休憩サイクルを管理するメインタイマーロジック
- **表示コンポーネント** (`src/components/TimerDisplay.tsx`): 視覚的状態インジケーター付きデュアルタイマーのレンダリング
- **ボタンコンポーネント** (`src/components/button.tsx`): スタート、ストップ、リセットボタンの個別エクスポート

### 状態管理パターン

React hooks で特定の状態変数を使用:

```tsx
const [focusTime, setFocusTime] = useState(1500); // デフォルト25分
const [restTime, setRestTime] = useState(300); // デフォルト5分
const [isRunning, setIsRunning] = useState(false);
const [isFocus, setIsFocus] = useState(true); // 集中/休憩の切り替え
```

### タイマーロジック

- `useEffect`内で`setInterval`を使用、適切なクリーンアップ実装
- タイマーがゼロになると集中/休憩モードを自動切り替え
- セレクト値読み取りに DOM 操作を使用（`document.getElementById`）
- 時間フォーマット関数: `formatTime(seconds: number): string`

## 開発ワークフロー

### 依存関係管理

- パッケージマネージャーに`pnpm`を使用
- Dependabot で月次更新を設定（マイナー/パッチのみ）

### ビルドコマンド

```bash
pnpm dev               # 開発サーバー起動（Next.js 16ではTurbopackがデフォルト）
pnpm build             # プロダクションビルド
pnpm lint              # ESLintチェック
pnpm test:e2e          # Playwright E2E（先に pnpm build を実行）
```

### スタイリングアプローチ

- Tailwind CSS v4 を `next.config.ts` の `@tailwindcss/turbopack` ローダーで処理
- タイマー状態に基づく条件スタイリング: アクティブタイマーに`border-dashed border-green-500`
- Flexbox レイアウトによるレスポンシブデザイン

## プロジェクト固有の規則

### 言語と UI

- **日本語 UI**: ユーザー向けテキストはすべて日本語
- 時間オプション: 集中 25/15/30 分、休憩 5/10/15 分
- ボタンテキスト: "スタート"、"ストップ"、"リセット"

### ファイル構成

- TypeScript パスエイリアス: `@/*`は`./src/*`にマップ
- コンポーネント props インターフェースはインライン定義
- 単一ファイル内でのボタン個別エクスポート

## 主要依存関係

- Next.js 16（Turbopack デフォルト）
- React 19（TypeScript 対応）
- Tailwind CSS v4
- ESLint（`eslint.config.mjs` の Next.js・React Hooks・TypeScript プラグイン）

このプロジェクトで作業する際は、タイマーの状態管理ロジックに焦点を当て、日本語 UI の一貫性を保つことを重視してください。

## 指示書の管理

プロジェクト固有の開発ルールはこのファイルで管理・更新してください。依存バージョンと実行可能なコマンドは `package.json`、設定値は各設定ファイルを参照してください。

セットアップと使い方は [README.md](README.md) を参照。実装・設定・コマンドを変更した場合は関連する説明も更新する。
