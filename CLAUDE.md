# Project: nextjs-project-template

## Tech Stack

- Next.js 16 (App Router) + TypeScript 5.x strict mode
- React 19
- Tailwind CSS v4 + shadcn/ui
- Biome (linter/formatter)
- Vitest + Playwright + MSW (testing)
- pnpm (package manager)
- Bun (dev server runtime)

## Commands

- `pnpm dev` - 開発サーバー起動 (Bun)
- `pnpm dev:mock` - MSWモック有効で起動
- `pnpm build` - 本番ビルド
- `pnpm lint` - Biomeでチェック
- `pnpm lint:fix` - Biomeで自動修正
- `pnpm typecheck` - 型チェック（変更後必ず実行）
- `pnpm test` - ユニットテスト実行
- `pnpm test:e2e` - E2Eテスト実行
- `pnpm generate:api` - OpenAPI型生成

## Code Style Rules

このプロジェクトは `biome.json` に準拠しています。

### Biome設定の概要

- **インデント**: スペース2つ
- **行幅**: 100文字
- **クォート**: シングルクォート
- **セミコロン**: 不要時は省略
- **トレイリングカンマ**: ES5互換

### Lintルール

- 未使用のインポート・変数はエラー
- `const`を優先使用
- `any`型は警告
- 非nullアサーション(`!`)は警告

### 自動修正

コミット前に以下を実行:

```bash
pnpm lint:fix
```

CI/CDでも自動修正が実行され、修正があれば自動コミットされます。

## Directory Structure

- `src/app/` - ルーティングのみ（ロジック最小限）
- `src/components/ui/` - shadcn/uiコンポーネント
- `src/components/features/` - 機能別コンポーネント
- `src/hooks/` - カスタムフック
- `src/lib/` - ユーティリティ関数
- `src/lib/api/` - APIクライアント
- `src/types/` - 共通型定義
- `src/mocks/` - MSWハンドラー
- `src/api/generated/` - OpenAPI生成コード（編集禁止）
- `e2e/` - E2Eテスト

## UI実装ルール

- UIコンポーネントはshadcn/ui (`src/components/ui/`) を優先使用
- 新規UIが必要な場合は、まずshadcn/uiに該当コンポーネントがないか確認
- カスタムが必要な場合はshadcn/uiを拡張して使用
- `cn()` でTailwindクラス名を結合
- コンポーネント追加: `pnpm dlx shadcn@latest add <component-name>`

## Design System

- CSS変数のみ使用（ハードコード色禁止）
- ダークモード: `dark:` プレフィックス対応
- スペーシング: Tailwind標準スケール (4, 8, 12, 16, 24, 32)
- アイコン: Lucide React

## Testing

- ユニットテスト: Vitest + Testing Library
- E2Eテスト: Playwright
- APIモック: MSW (`src/mocks/handlers/`)
- テストファイルは対象ファイルと同じディレクトリに `.test.ts(x)` で配置

## Git Workflow

作業開始前に必ずmainブランチの最新コミットを取り込むこと:

```bash
git fetch origin
git merge origin/main
```

Push後も最新を取り込んでから次の作業を行うこと:

```bash
git pull origin <current-branch>
git fetch origin
git merge origin/main
```

コンフリクトが発生した場合は解消してからコミットする。

## Important Rules

- **作業前にmainブランチを取り込む**（コンフリクト防止）
- 変更後は必ず `pnpm typecheck` を実行
- コードスタイルは `biome.json` に従う
- ESモジュールを使用（CommonJS禁止）
- named export優先（default exportはページのみ）
- API型は `src/api/generated/` から自動生成されたものを使用
- フォームバリデーションはZod + React Hook Form
- `src/api/generated/` は編集禁止（自動生成）
