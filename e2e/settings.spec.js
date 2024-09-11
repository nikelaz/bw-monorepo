// @ts-check
import { test, expect } from '@playwright/test';
import { baseUrl } from './config';
const authFile = 'playwright/.auth/user.json';

test.use({ storageState: authFile });

test('all main user interface elements are visible', async ({ page }) => {
  await page.goto(`${baseUrl}/settings`);

  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Preferences' })).toBeVisible();
  await expect(page.getByText('Theme')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^LightDarkchevron down icon$/ }).getByRole('combobox')).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'High Contrast' })).toBeVisible();
  await expect(page.getByText('Currency')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'User Details' })).toBeVisible();
  await expect(page.getByText('First Name')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^First Name$/ }).getByRole('textbox')).toBeVisible();
  await expect(page.getByText('Last Name')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Last Name$/ }).getByRole('textbox')).toBeVisible();
  await expect(page.getByRole('button', { name: 'lock icon Change Password' })).toBeVisible();

  await page.getByRole('button', { name: 'lock icon Change Password' }).click();
});
