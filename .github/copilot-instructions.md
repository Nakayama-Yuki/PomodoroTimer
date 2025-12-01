# PomodoroTimer プロジェクト開発ガイド

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
- npm から pnpm への最近の移行

### ビルドコマンド

```bash
pnpm dev               # 開発サーバー起動（Next.js 16ではTurbopackがデフォルト）
pnpm build             # プロダクションビルド
pnpm lint              # ESLintチェック
```

### スタイリングアプローチ

- Tailwind CSS v4 を PostCSS と併用
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

### 最近の改善

- README で`useEffect`の代替案調査に言及
- Next.js 16 および React 19 の最新版に更新
- Tailwind CSS v4 への移行

## 主要依存関係

- Next.js 16.0.6（Turbopack デフォルト）
- React 19.2.0（TypeScript 対応）
- Tailwind CSS 4.1.17
- ESLint（Next.js 設定）

このプロジェクトで作業する際は、タイマーの状態管理ロジックに焦点を当て、日本語 UI の一貫性を保つことを重視してください。
