import { expect, test } from '@playwright/test'

test.describe('Auth Pages', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
  })

  test('should display register page', async ({ page }) => {
    await page.goto('/register')
    await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible()
  })
})
