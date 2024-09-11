// @ts-check
import { test, expect } from '@playwright/test';
import { baseUrl } from './config';
const authFile = 'playwright/.auth/user.json';

test.use({ storageState: authFile });

test('all main user interface elements are visible', async ({ page }) => {
  await page.goto(`${baseUrl}/budget`);

  // sidebar navigation
  await expect(page.locator('[class*="sidebar-nav"]').first()).toBeVisible();

  // month switch
  await expect(page.getByRole('button', { name: 'calendar icon' })).toBeVisible();

  // new transaction buttons
  const transactionButtonsCount = await page.getByRole('button', { name: 'plus icon New Transaction' }).count();
  expect(transactionButtonsCount).toBe(2);

  // budget categories grid
  await expect(page.getByRole('cell', { name: 'Income', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Expenses', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Savings', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Debt', exact: true })).toBeVisible();

  // scales
  const scalesCount = await page.locator('._scale__progress_1au72_32').count();
  expect(scalesCount).toBe(2);

  // transactions grid
  await expect(page.getByPlaceholder('Search Transactions')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Transactions' })).toBeVisible();
});
