import { test, expect } from '@playwright/test';
import { baseUrl } from './config';

test('/login', async ({ page }) => {
  await page.goto(baseUrl);
  await page.waitForTimeout(100);
  await expect(page).toHaveScreenshot();
});

test('/sign-up', async ({ page }) => {
  await page.goto(`${baseUrl}/sign-up`);
  await page.waitForTimeout(100);
  await expect(page).toHaveScreenshot();
});
