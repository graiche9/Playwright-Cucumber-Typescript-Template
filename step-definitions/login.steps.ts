// features/step_definitions/loginSteps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { expect } from '@playwright/test';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;


Given('Je navigue vers {string}', async function (env: string) {
  loginPage = new LoginPage(this.page);
  await loginPage.goto(env);
});

When('Je saisis l\'identifiant {string} dans le champs username', async function (username: string) {
  await loginPage.saisirUserName(username);
});

When('Je saisis le mot de passe {string} dans le champs password', async function (password: string) {
  await loginPage.saisirPassword(password);
});

When('Je clique sur le bouton de login', async function () {
  await loginPage.clickLoginButton();
});

Then('Je suis redirige vers la page d acceuil', async function () {
  await this.page.waitForLoadState('networkidle');
  console.log("URL après login:", await this.page.url());

  const dashboardLink = await this.page.locator('a[href="/admin/"]');
  await expect(dashboardLink).toBeVisible({ timeout: 10000 });

  console.log("Lien 'Django administration' détecté:", await dashboardLink.textContent());
});

Then('un message d erreur de connexion s affiche', async function () {
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain('Please enter the correct username and password for a staff account. Note that both fields may be case-sensitive.');
});
