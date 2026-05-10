import { expect, test } from '@playwright/test';

test('redirects unauthenticated user from products to login', async ({ page }) => {
  await page.goto('/products');

  // expect(true).toBe(true);
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
});
