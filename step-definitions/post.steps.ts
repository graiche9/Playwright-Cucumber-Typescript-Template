// features/step_definitions/loginSteps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { PostPage } from '../pages/PostPage';
import { expect } from '@playwright/test';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let postPage: PostPage;

Given('je suis sur la page d acceuil', async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    postPage = new PostPage(page);
    await loginPage.goto();
    await loginPage.saisirUserName('testeur_integration');
    await loginPage.saisirPassword('testeur_qa');
    await loginPage.clickLoginButton();
    console.log("Connexion réussie !");
});

When('je clique sur add', async function() {
    await postPage.clickAddButton();
});

When('je saisis le titre {string}', async function(s: string) {
    await postPage.saisirTitre(s);
});

When('je saisis le contexte {string}', async function (s: string) {
    await postPage.saisirContenu(s);
});

When('je clique sur save', async function () {
    await postPage.clickSaveButton();
});

Then('le post sera créé avec le titre {string}', async function(s: string) {
    const isCreated = await postPage.isPostCreated(s);
    expect(isCreated).toBe(true);
    await browser.close();
})

Then('un message d erreur s affiche', async function() {
    const errorMessage = await postPage.getErrorMessage();
    expect(errorMessage).toContain("This field is required.");
    await browser.close();
})





