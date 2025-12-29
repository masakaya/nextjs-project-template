# Next.js プロジェクトテンプレート実装指示

## 概要

個人開発向けのNext.js 15プロジェクトテンプレートを構築してください。

## 技術スタック

- **ランタイム**: Node.js 22 + Bun（開発時）
- **パッケージマネージャ**: pnpm
- **バージョン管理**: mise
- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript 5.x (strict mode)
- **Linter/Formatter**: Biome
- **テスト**: Vitest + Testing Library + MSW + Playwright
- **UI**: Tailwind CSS v4 + shadcn/ui + Lucide Icons
- **API型生成**: @hey-api/openapi-ts
- **フォーム**: React Hook Form + Zod

---

## Phase 1: プロジェクト初期化

### 1.1 Next.jsプロジェクト作成

```bash
pnpm create next-app@latest my-app --typescript --tailwind --eslint --app --src-dir
cd my-app
```

### 1.2 mise.toml作成

プロジェクトルートに`mise.toml`を作成：

```toml
[tools]
node = "22"
bun = "latest"

[hooks]
postinstall = 'corepack enable && corepack prepare pnpm@latest --activate'

[settings]
experimental = true

[env]
_.path = ['{{config_root}}/node_modules/.bin']
```

### 1.3 package.json更新

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "packageManager": "pnpm@9.12.3",
  "engines": {
    "node": ">=22"
  },
  "scripts": {
    "dev": "bun --bun next dev",
    "dev:mock": "NEXT_PUBLIC_MOCK_ENABLED=true bun --bun next dev",
    "dev:remote": "next dev -H 0.0.0.0",
    "build": "next build",
    "start": "next start",
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write .",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui-host=0.0.0.0 --ui-port=8080",
    "test:e2e:debug": "playwright test --debug",
    "generate:api": "openapi-ts"
  }
}
```

---

## Phase 2: Biome設定（ESLint置き換え）

### 2.1 Biomeインストール

```bash
pnpm add -D @biomejs/biome
pnpm biome init
```

### 2.2 ESLint削除

```bash
rm -f eslint.config.mjs .eslintrc* .eslintignore
pnpm remove eslint eslint-config-next @eslint/eslintrc
```

### 2.3 biome.json作成

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedImports": "error",
        "noUnusedVariables": "error"
      },
      "style": {
        "useConst": "error",
        "noNonNullAssertion": "warn"
      },
      "suspicious": {
        "noExplicitAny": "warn"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded",
      "trailingCommas": "es5"
    }
  },
  "files": {
    "ignore": [
      "node_modules",
      ".next",
      "out",
      "dist",
      "public/mockServiceWorker.js",
      "src/api/generated"
    ]
  }
}
```

### 2.4 VSCode設定

`.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome",
  "editor.codeActionsOnSave": {
    "source.organizeImports.biome": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[json]": {
    "editor.defaultFormatter": "biomejs.biome"
  }
}
```

`.vscode/extensions.json`:

```json
{
  "recommendations": [
    "biomejs.biome",
    "bradlc.vscode-tailwindcss",
    "oven.bun-vscode"
  ]
}
```

---

## Phase 3: TypeScript設定強化

### 3.1 tsconfig.json更新

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [
      { "name": "next" }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

---

## Phase 4: shadcn/ui初期化

### 4.1 初期化

```bash
pnpm dlx shadcn@latest init
```

選択肢：
- Style: Default
- Base color: Neutral
- CSS variables: Yes

### 4.2 基本コンポーネント追加

```bash
pnpm dlx shadcn@latest add button card dialog form input label tabs toast
```

### 4.3 Lucideアイコン確認

shadcn/uiが自動でlucide-reactをインストールするが、なければ：

```bash
pnpm add lucide-react
```

---

## Phase 5: テスト環境構築

### 5.1 Vitest + Testing Library

```bash
pnpm add -D vitest @vitejs/plugin-react vite-tsconfig-paths
pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
pnpm add -D jsdom @types/node
```

`vitest.config.mts`:

```typescript
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules',
        '.next',
        'e2e',
        'src/api/generated',
        '**/*.d.ts',
        '**/*.config.*',
      ],
    },
  },
})
```

`vitest.setup.ts`:

```typescript
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
```

### 5.2 MSW（Mock Service Worker）

```bash
pnpm add -D msw
npx msw init ./public --save
```

ディレクトリ構成を作成：

`src/mocks/handlers/index.ts`:

```typescript
import type { RequestHandler } from 'msw'

// 各ハンドラーをここにインポートして集約
// import { userHandlers } from './user'

export const handlers: RequestHandler[] = [
  // ...userHandlers,
]
```

`src/mocks/browser.ts`:

```typescript
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

`src/mocks/server.ts`:

```typescript
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

`src/mocks/index.ts`:

```typescript
export async function initMocks() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  if (typeof window === 'undefined') {
    const { server } = await import('./server')
    server.listen({ onUnhandledRequest: 'bypass' })
  } else {
    const { worker } = await import('./browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }
}
```

`vitest.setup.ts`を更新：

```typescript
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from '@/mocks/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => {
  cleanup()
  server.resetHandlers()
})
afterAll(() => server.close())
```

### 5.3 Playwright

```bash
pnpm add -D @playwright/test
npx playwright install
```

`playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
})
```

`e2e/example.spec.ts`:

```typescript
import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Next.js/)
})

test('can navigate to page', async ({ page }) => {
  await page.goto('/')
  // ページ固有のテストを追加
})
```

---

## Phase 6: OpenAPI型生成

### 6.1 インストール

```bash
pnpm add -D @hey-api/openapi-ts
```

### 6.2 設定ファイル

`openapi-ts.config.ts`:

```typescript
import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: './openapi.json', // または OpenAPI仕様のURL
  output: 'src/api/generated',
  plugins: [
    '@hey-api/typescript',
    '@hey-api/sdk',
    'zod',
  ],
})
```

### 6.3 .gitignore更新

```
# OpenAPI generated
src/api/generated/
```

---

## Phase 7: ディレクトリ構成

以下の構成でディレクトリを作成：

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── (auth)/
│       ├── login/
│       │   └── page.tsx
│       └── register/
│           └── page.tsx
├── components/
│   ├── ui/                 # shadcn/ui (自動生成)
│   └── features/           # 機能別コンポーネント
│       └── .gitkeep
├── hooks/
│   └── .gitkeep
├── lib/
│   ├── utils.ts            # shadcn/ui (自動生成)
│   └── api/
│       └── .gitkeep
├── types/
│   └── index.ts
├── mocks/
│   ├── handlers/
│   │   └── index.ts
│   ├── browser.ts
│   ├── server.ts
│   └── index.ts
└── api/
    └── generated/          # OpenAPI生成 (.gitignore)
```

---

## Phase 8: CLAUDE.md作成

プロジェクトルートに`CLAUDE.md`を作成：

```markdown
# Project: MyApp

## Tech Stack
- Next.js 15 (App Router) + TypeScript 5.x strict mode
- Tailwind CSS v4 + shadcn/ui
- Biome (linter/formatter)
- Vitest + Playwright + MSW

## Commands
- `pnpm dev` - 開発サーバー起動 (Bun)
- `pnpm dev:mock` - MSWモック有効で起動
- `pnpm build` - 本番ビルド (Node.js)
- `pnpm test` - テスト実行
- `pnpm lint` - Biomeでlint
- `pnpm typecheck` - 型チェック（変更後必ず実行）

## Code Style
- ES modules使用（CommonJS禁止）
- named export優先（default exportはページのみ）
- 新規UIコンポーネントは `src/components/ui/` に配置
- `cn()` でTailwindクラス名を結合

## Design System
- CSS変数のみ使用（ハードコード色禁止）
- ダークモード: `dark:` プレフィックス対応
- スペーシング: Tailwind標準スケール (4, 8, 12, 16, 24, 32)
- フォント: Inter (欧文) + Noto Sans JP (日本語)
- アイコン: Lucide React

## Directory Structure
- `src/app/` - ルーティングのみ（ロジック最小限）
- `src/components/ui/` - shadcn/uiコンポーネント
- `src/components/features/` - 機能別コンポーネント
- `src/hooks/` - カスタムフック
- `src/lib/` - ユーティリティ、APIクライアント
- `src/mocks/` - MSWハンドラー
- `src/api/generated/` - OpenAPI生成コード（編集禁止）

## Important Rules
- 変更後は必ず `pnpm typecheck` を実行
- コンポーネントはRadix UI経由でshadcn/uiを使用
- API型は `src/api/generated/` から自動生成されたものを使用
- フォームバリデーションはZod + React Hook Form
- APIモックは `src/mocks/handlers/` に定義（MSW）
- テストファイルは対象ファイルと同じディレクトリに `.test.ts(x)` で配置
```

---

## Phase 9: GitHub Actions（オプション）

`.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup mise
        uses: jdx/mise-action@v2

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm typecheck

      - name: Unit tests
        run: pnpm test --run

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup mise
        uses: jdx/mise-action@v2

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run E2E tests
        run: pnpm test:e2e

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

---

## 完了チェックリスト

- [ ] Phase 1: プロジェクト初期化 + mise.toml + package.json
- [ ] Phase 2: Biome設定（ESLint削除）
- [ ] Phase 3: TypeScript設定強化
- [ ] Phase 4: shadcn/ui初期化 + 基本コンポーネント
- [ ] Phase 5: Vitest + MSW + Playwright設定
- [ ] Phase 6: OpenAPI型生成設定
- [ ] Phase 7: ディレクトリ構成作成
- [ ] Phase 8: CLAUDE.md作成
- [ ] Phase 9: GitHub Actions（オプション）

## 動作確認

```bash
# 開発サーバー起動
pnpm dev

# Lint実行
pnpm lint

# 型チェック
pnpm typecheck

# ユニットテスト
pnpm test

# E2Eテスト
pnpm test:e2e
```
