import { expect, test } from '@playwright/test';

test('redirects unauthenticated user to login and loads products remote after login', async ({ page }) => {
  const remoteRequests: Array<string> = [];

  page.on('request', (request) => {
    const url = request.url();

    if (url.includes('mf-manifest.json') || url.includes('remoteEntry.js') || url.includes('__federation_expose')) {
      remoteRequests.push(url);
    }
  });

  await page.goto('/products');

  await expect(page).toHaveURL(/\/login/);
  expect(remoteRequests).toHaveLength(0);

  await page.getByPlaceholder('e.g John').fill('Victor');
  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(page).toHaveURL(/\/products/);
  await expect(page.getByText(/products/i)).toBeVisible();

  expect(remoteRequests.length).toBeGreaterThan(0);
});
