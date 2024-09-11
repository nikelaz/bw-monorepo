import { test, expect } from '@playwright/test';
import { baseUrl } from './config';

const authFile = 'playwright/.auth/user.json';

test.use({ storageState: authFile });

test('/budget', async ({ page }) => {
  await page.goto(`${baseUrl}/budget`);
  await expect(page.locator('[class*="loader"]')).toHaveCount(0);
  await page.waitForTimeout(500);
  await expect(page).toHaveScreenshot();
});

test('/settings', async ({ page }) => {
  await page.goto(`${baseUrl}/settings`);
  await page.waitForTimeout(100);
  await expect(page).toHaveScreenshot();
});

test('/transactions', async ({ page }) => {
  await page.goto(`${baseUrl}/transactions`);
  await page.waitForTimeout(100);
  await expect(page).toHaveScreenshot();
});

test('/reporting', async ({ page }) => {
  await page.goto(`${baseUrl}/reporting`);
  await expect(page.locator('[class*="loader"]')).toHaveCount(0);
  await page.waitForTimeout(500);
  await expect(page).toHaveScreenshot();
});
