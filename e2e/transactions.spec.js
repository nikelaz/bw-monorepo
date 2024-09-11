// @ts-check
import { test, expect } from '@playwright/test';
import { baseUrl } from './config';
const authFile = 'playwright/.auth/user.json';

test.use({ storageState: authFile });

test('all main user interface elements are visible', async ({ page }) => {
  await page.goto(`${baseUrl}/transactions`);

  await expect(page.getByRole('heading', { name: 'Transactions' })).toBeVisible();

  // scales
  await expect(page.getByPlaceholder('Search Transactions')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Transactions' })).toBeVisible();
});
