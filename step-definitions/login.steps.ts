// features/step_definitions/loginSteps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { expect } from '@playwright/test';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Given('I open the login page', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  await loginPage.saisirUserName(username);
  await loginPage.saisirPassword(password);
  await loginPage.clickLoginButton();
});

Then('I should be redirected to the dashboard', async function () {
  await page.waitForLoadState('networkidle');
  console.log(" URL après login:", await page.url());
  const dashboardLink = await page.locator('a[href="/admin/"]');
  await expect(dashboardLink).toBeVisible({ timeout: 10000 });
  console.log(" Lien 'Django administration' détecté:", await dashboardLink.textContent());
  await browser.close();
});

// Then('I should see an error message', async function () {
//   const errorMessage = await loginPage.getErrorMessage();
//   expect(errorMessage).toContain('Invalid credentials');
//   await browser.close();
// });

