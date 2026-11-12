# ポモドーロタイマー

集中と休憩の時間を設定できる Web ベースのポモドーロタイマーアプリケーションです。

## 機能

- ⏰ カスタマイズ可能な集中時間（15 分、25 分、30 分）
- 🛌 カスタマイズ可能な休憩時間（5 分、10 分、15 分）
- 🎯 集中時間と休憩時間の自動切り替え
- ⏯️ スタート・ストップ・リセット機能
- 📱 レスポンシブデザイン
- 🎨 シンプルで使いやすいユーザーインターフェース
- 🔄 リアルタイムタイマー表示（MM:SS 形式）
- 👁️ 現在アクティブな時間の視覚的インジケーター

## スクリーンショット

タイマーは現在実行中の時間（集中または休憩）を緑色の点線ボーダーでハイライト表示します。

## 技術スタック

- **フレームワーク**: Next.js 16
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **Runtime**: React 19
- **パッケージマネージャー**: pnpm

## インストールと実行

### 必要環境

- Node.js LTS（CI は `node@lts` を使用）
- pnpm

### セットアップ

1. リポジトリをクローンします：

```bash
git clone https://github.com/Nakayama-Yuki/PomodoroTimer.git
cd PomodoroTimer
```

2. 依存関係をインストールします：

```bash
pnpm install
```

3. 開発サーバーを起動します：

```bash
pnpm dev
```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## 利用可能なスクリプト

- `pnpm dev` - Turbopack を使用した開発サーバーを起動
- `pnpm build` - プロダクション用にビルド
- `pnpm start` - プロダクションサーバーを起動
- `pnpm lint` - ESLint でコードをチェック

## 検証

```bash
pnpm lint
pnpm exec playwright install --with-deps chromium
pnpm build
pnpm test:e2e
# UI モード
pnpm test:e2e:ui
```

Playwright は `pnpm start` で本番サーバーを起動するため、事前ビルドが必要です。有効なブラウザは Chromium。設定は [playwright.config.ts](playwright.config.ts)、テストは [tests/pomodoro.spec.ts](tests/pomodoro.spec.ts) を参照してください。

## 使い方

1. **時間設定**: 集中時間と休憩時間をドロップダウンから選択します
2. **開始**: 「スタート」ボタンをクリックしてタイマーを開始します
3. **一時停止**: 実行中は「ストップ」ボタンで一時停止できます
4. **リセット**: 「リセット」ボタンでタイマーを初期状態に戻します
5. **自動切り替え**: 集中時間が終了すると自動的に休憩時間に切り替わります

## プロジェクト構造

```
src/
├── app/
│   ├── page.tsx          # メインタイマーコンポーネント
│   ├── layout.tsx        # アプリケーションレイアウト
│   └── globals.css       # グローバルスタイル
└── components/
    ├── TimerDisplay.tsx  # タイマー表示コンポーネント
    └── button.tsx        # ボタンコンポーネント（Start, Stop, Reset）
```

## コンポーネント詳細

### TimerDisplay

- 集中時間と休憩時間の選択 UI
- タイマーの視覚的表示
- アクティブな時間のハイライト表示

### Button Components

- `StartButton`: タイマー開始
- `StopButton`: タイマー一時停止
- `ResetButton`: タイマーリセット

## 改善予定

- [ ] useEffect を使わない実装の検討
- [ ] 音声通知機能の追加
- [ ] セッション履歴の保存
- [ ] ダークモードの実装
- [ ] PWA 対応
- [ ] タスク管理機能の統合

## 開発ルール

開発時の指示は [AGENTS.md](AGENTS.md) を参照してください。依存バージョンと実行可能なスクリプトは [package.json](package.json) を正とします。

## 型チェック

```bash
pnpm typecheck
```

`next typegen` でルート型と `next-env.d.ts` を生成し、`tsc --noEmit` で型を検証します。CI でもビルド前に同じコマンドを実行します。
