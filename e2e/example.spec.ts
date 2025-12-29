import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Create Next App/)
})

test('can navigate to page', async ({ page }) => {
  await page.goto('/')
  // ページ固有のテストを追加
})
