// @ts-check
import { test, expect } from '@playwright/test';
import { baseUrl } from './config';
import crypto from 'crypto';
const uuid = crypto.randomBytes(64).toString('hex').substr(0, 4);

test('can be navigated to from login page', async ({ page }) => {
  await page.goto(baseUrl);

  // Navigate to sign up page
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.waitForURL(`${baseUrl}/sign-up`);
});

test('form fields are visible', async ({ page }) => {
  await page.goto(`${baseUrl}/sign-up`);

  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('First Name')).toBeVisible();
  await expect(page.getByLabel('Last Name')).toBeVisible();
  await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Repeat Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});

test('repeat password validation works correctly', async ({ page }) => {
  await page.goto(`${baseUrl}/sign-up`);

  await page.getByLabel('Email').fill(`testusere2e${uuid}@test.com`);
  await page.getByLabel('First Name').fill('TestUser');
  await page.getByLabel('Last Name').fill('TestUser');
  await page.getByLabel('Password', { exact: true }).fill('testpassword123');
  await page.getByLabel('Repeat Password').fill('testpass');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByText('The two passwords do not match')).toBeVisible();
});

test.describe.serial("test new user experience", () => {
  test('can create a user successfully', async ({ page }) => {
    await page.goto(`${baseUrl}/sign-up`);

    // Successfull signup
    await page.getByLabel('Email').fill(`testusere2e${uuid}@test.com`);
    await page.getByLabel('First Name').fill('TestUser');
    await page.getByLabel('Last Name').fill('TestUser');
    await page.getByLabel('Password', { exact: true }).fill('testpassword123');
    await page.getByLabel('Repeat Password').fill('testpassword123');
    await page.getByRole('button', { name: 'Sign up' }).click();

    // Login
    await page.waitForURL(`${baseUrl}/login`);
    await page.getByLabel('Email').fill(`testusere2e${uuid}@test.com`);
    await page.getByLabel('Password').fill('testpassword123');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('new user experience elements/budget items are visible', async ({ page }) => {
    // Login with the newly created user
    await page.goto(`${baseUrl}/login`);
    await page.getByLabel('Email').fill(`testusere2e${uuid}@test.com`);
    await page.getByLabel('Password').fill('testpassword123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL(`${baseUrl}/budget`);

    // months switch is visible
    await expect(page.getByRole('button', { name: 'calendar icon' })).toBeVisible();

    // Income Expenses Debt and Savings tables are visible
    await expect(page.getByRole('cell', { name: 'Income', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Salary' }).getByRole('textbox')).toBeVisible();
    await expect(page.getByRole('button', { name: 'plus icon New Income' })).toBeVisible();

    await expect(page.getByRole('cell', { name: 'Expenses', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Fun & Entertainment' }).getByRole('textbox')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Personal Care' }).getByRole('textbox')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Utilities' }).getByRole('textbox')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Miscellaneous' }).getByRole('textbox')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Housing' }).getByRole('textbox')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Food' }).getByRole('textbox')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Insurance' }).getByRole('textbox')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Giving' }).getByRole('textbox')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Health & Fitness' }).getByRole('textbox')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Transportation' }).getByRole('textbox')).toBeVisible();
    await expect(page.getByRole('button', { name: 'plus icon New Category' })).toBeVisible();

    await expect(page.getByRole('cell', { name: 'Debt', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'plus icon New Loan' })).toBeVisible();

    await expect(page.getByRole('cell', { name: 'Savings', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Emergency Fund' }).getByRole('textbox')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Retirement' }).getByRole('textbox')).toBeVisible();
    await expect(page.getByRole('button', { name: 'plus icon New Fund' })).toBeVisible();
  });
});
