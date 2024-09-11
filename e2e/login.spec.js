// @ts-check
import { test, expect } from '@playwright/test';
import { baseUrl } from './config';

test('login page has form fields', async ({ page }) => {
  await page.goto(baseUrl);

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
});

test('displays an error when invalid details are entered', async ({ page }) => {
  await page.goto(baseUrl);

  await page.getByLabel('Email').fill('doesnotexist@bw.com');
  await page.getByLabel('Password').fill('invalidpassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('The provided user details are').click();
});

test('redirects to dashboard when valid details are entered', async ({ page }) => {
  await page.goto(baseUrl);

  await page.getByLabel('Email').fill('testuser@budgetwarden.com');
  await page.getByLabel('Password').fill('123qwerty');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(`${baseUrl}/budget`);
});
