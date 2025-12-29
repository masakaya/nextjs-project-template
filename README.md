# nextjs-project-template

Next.js 16 + React 19 のプロジェクトテンプレートです。

## 必要な環境

- Node.js 22以上
- pnpm 9.12.3以上
- Bun（開発サーバー用）

## セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/masakaya/nextjs-project-template.git
cd nextjs-project-template

# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm dev
```

http://localhost:3000 でアプリケーションにアクセスできます。

## 利用可能なスクリプト

| コマンド | 説明 |
|---------|------|
| `pnpm dev` | 開発サーバーを起動 |
| `pnpm dev:mock` | モックモードで開発サーバーを起動 |
| `pnpm build` | プロダクションビルドを作成 |
| `pnpm start` | プロダクションサーバーを起動 |
| `pnpm lint` | Biomeでコードをチェック |
| `pnpm lint:fix` | Biomeでコードを自動修正 |
| `pnpm format` | コードをフォーマット |
| `pnpm typecheck` | TypeScriptの型チェック |
| `pnpm test` | Vitestでテストを実行 |
| `pnpm test:ui` | テストUIを起動 |
| `pnpm test:coverage` | カバレッジ付きでテストを実行 |
| `pnpm test:e2e` | Playwrightでe2eテストを実行 |
| `pnpm test:e2e:ui` | E2EテストUIを起動（ポート8080） |
| `pnpm test:e2e:debug` | E2Eテストをデバッグモードで実行 |
| `pnpm generate:api` | OpenAPI仕様からAPIクライアントを生成 |

## 技術スタック

- **フレームワーク**: Next.js 16
- **UIライブラリ**: React 19
- **スタイリング**: Tailwind CSS 4 + shadcn/ui
- **リンター/フォーマッター**: Biome
- **テスト**: Vitest, Playwright
- **パッケージマネージャー**: pnpm

## shadcn/ui コンポーネント追加

```bash
# コンポーネントを追加
pnpm dlx shadcn@latest add <component-name>

# 例: accordion を追加
pnpm dlx shadcn@latest add accordion

# 複数追加
pnpm dlx shadcn@latest add accordion alert checkbox

# 全コンポーネントを追加
pnpm dlx shadcn@latest add -a
```

利用可能なコンポーネント一覧: https://ui.shadcn.com/docs/components

## E2Eテストのセットアップ

Playwrightを使用したE2Eテストを実行する前に、ブラウザをインストールする必要があります。

```bash
# Playwrightブラウザをインストール（初回のみ）
pnpm exec playwright install

# Chromiumのみインストール（軽量）
pnpm exec playwright install chromium
```

### E2Eテストの実行

| コマンド | 説明 |
|---------|------|
| `pnpm test:e2e` | ヘッドレスでテスト実行 |
| `pnpm test:e2e:ui` | UIモードで実行（ポート8080） |
| `pnpm test:e2e:debug` | デバッグモードで実行（ローカルのみ） |

### テスト結果の確認

テスト失敗時はHTMLレポートで詳細を確認できます。

```bash
# HTMLレポートを表示（外部PCからアクセスする場合）
pnpm exec playwright show-report --host 0.0.0.0 --port 9323
```

`http://<サーバーIP>:9323` でレポートにアクセスし、失敗したテストの「Trace」タブでステップごとの操作・スクリーンショット・DOM状態を確認できます。

> **注意**: `--debug`モードはサーバー上でブラウザGUIを開くため、リモート環境では使用できません（ポートフォワードでも不可）。リモートデバッグにはHTMLレポートのトレース機能を使用してください。

## 外部PCからの開発サーバーアクセス

LAN内の別PCから開発サーバーにアクセスする場合、WebSocketの警告が表示されることがあります。`next.config.ts`の`allowedDevOrigins`にIPアドレスを追加してください。

```typescript
const nextConfig: NextConfig = {
  allowedDevOrigins: ['localhost', '192.168.1.14'], // アクセス元のIPを追加
}
```