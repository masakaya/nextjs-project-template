import { expect, test } from '@playwright/test'

test.describe('Sample Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sample')
  })

  test('should display the page title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Sample Page' })).toBeVisible()
  })

  test('should display counter with initial value 0', async ({ page }) => {
    await expect(page.getByTestId('count')).toHaveText('0')
  })

  test('should increment counter when + button is clicked', async ({ page }) => {
    await page.getByTestId('increment').click()
    await expect(page.getByTestId('count')).toHaveText('1')
  })

  test('should decrement counter when - button is clicked', async ({ page }) => {
    await page.getByTestId('increment').click()
    await page.getByTestId('increment').click()
    await page.getByTestId('decrement').click()
    await expect(page.getByTestId('count')).toHaveText('1')
  })

  test('should reset counter when reset button is clicked', async ({ page }) => {
    await page.getByTestId('increment').click()
    await page.getByTestId('increment').click()
    await page.getByTestId('increment').click()
    await page.getByTestId('reset').click()
    await expect(page.getByTestId('count')).toHaveText('0')
  })
})
