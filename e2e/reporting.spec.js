// @ts-check
import { test, expect } from '@playwright/test';
import { baseUrl } from './config';
const authFile = 'playwright/.auth/user.json';

test.use({ storageState: authFile });

test('all main user interface elements are visible', async ({ page }) => {
  await page.goto(`${baseUrl}/reporting`);

  await expect(page.getByRole('heading', { name: 'Reporting' })).toBeVisible();

  // scales
  const scalesCount = await page.locator('._scale__progress_1au72_32').count();
  expect(scalesCount).toBe(2);
});
