import test, { expect } from '@playwright/test';

test('opens product detail page from products list', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('e.g. Victor').fill('Victor');
  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(page).toHaveURL(/\/products/);
  await expect(page.getByText('Aurex Infinite')).toBeVisible();

  await page.getByText('Aurex Infinite').click();

  await expect(page).toHaveURL(/\/products\/1/);
  await expect(page.getByRole('heading', { name: 'Aurex Infinite' })).toBeVisible();
});
