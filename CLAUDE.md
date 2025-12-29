# Project: nextjs-project-template

## Tech Stack

- Next.js 16 (App Router) + TypeScript 5.x strict mode
- React 19
- Tailwind CSS v4
- Biome (linter/formatter)
- pnpm (package manager)
- Bun (dev server runtime)

## Commands

- `pnpm dev` - 開発サーバー起動 (Bun)
- `pnpm build` - 本番ビルド
- `pnpm lint` - Biomeでチェック
- `pnpm lint:fix` - Biomeで自動修正
- `pnpm format` - コードフォーマット
- `pnpm typecheck` - 型チェック（変更後必ず実行）

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

- `src/app/` - ルーティング（ロジック最小限）
- `src/components/` - コンポーネント
- `.vscode/` - エディタ設定

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
