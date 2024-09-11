import { test as setup } from '@playwright/test';
const authFile = 'playwright/.auth/user.json';
import { baseUrl } from './config';

setup('authenticate', async ({ page }) => {
  await page.goto(baseUrl);

  await page.getByLabel('Email').fill('testuser@budgetwarden.com');
  await page.getByLabel('Password').fill('123qwerty');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(`${baseUrl}/budget`);

  await page.context().storageState({ path: authFile });
});
