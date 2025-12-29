import type { RequestHandler } from 'msw'

// 各ハンドラーをここにインポートして集約
// import { userHandlers } from './user'

export const handlers: RequestHandler[] = [
  // ...userHandlers,
]
