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
| `pnpm generate:api` | OpenAPI仕様からAPIクライアントを生成 |

## 技術スタック

- **フレームワーク**: Next.js 16
- **UIライブラリ**: React 19
- **スタイリング**: Tailwind CSS 4
- **リンター/フォーマッター**: Biome
- **テスト**: Vitest, Playwright
- **パッケージマネージャー**: pnpm