// features/step_definitions/loginSteps.ts
/*import { Given, When, Then } from '@cucumber/cucumber';
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
})*/
import { Given, When, Then } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { PostPage } from '../pages/PostPage';
import { expect } from '@playwright/test';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let postPage: PostPage;
let randomTitle: string;
let randomContent: string;


When('je clique sur add', async function() {
    postPage = new PostPage(this.page)
    await postPage.clickAddButton();
});

// Vérifier si la valeur est "randomTitle", sinon utiliser la valeur fournie
When('je saisis le titre {string}', async function(s: string) {
    if (s.trim() === "randomTitle") {
        this.randomTitle = `Post-${Math.floor(Math.random() * 10000)}`;
        console.log(` Titre généré : ${this.randomTitle}`);
        await postPage.saisirTitre(this.randomTitle);
    } else {
        this.randomTitle = s; 
        await postPage.saisirTitre(s);
    }
});

// Vérifier si la valeur est "randomContent", sinon utiliser la valeur fournie
When('je saisis le contexte {string}', async function(s: string) {
    if (s === "randomContent") {
        randomContent = `Contenu-${Math.floor(Math.random() * 10000)}`;
        console.log(`Contenu généré : ${randomContent}`);
        await postPage.saisirContenu(randomContent);
    } else {
        await postPage.saisirContenu(s);
    }
});

When('je clique sur save', async function () {
    await postPage.clickSaveButton();
});

// Vérifier que le post a bien été créé avec le titre généré
Then('le post sera créé avec le titre {string}', async function(s: string) {
    const expectedTitle = s.trim() === "randomTitle" ? this.randomTitle : s; // Utilise le titre généré

    console.log(`Vérification du post avec le titre : ${expectedTitle}`);
    const isCreated = await postPage.isPostCreated(expectedTitle);
    expect(isCreated).toBe(true);
});

Then('un message d erreur s affiche', async function() {
    postPage = new PostPage(this.page);
    const errorMessage = await postPage.getErrorMessage();
    expect(errorMessage).toContain("This field is required.");
});


Given('je suis sur la page d acceuil et sur l environnement {string} et je saisis {string} et {string}', async function (s: string, s2: string, s3: string) {
    loginPage = new LoginPage(this.page);
    await loginPage.goto(s);
    await loginPage.saisirUserName(s2);
    await loginPage.saisirPassword(s3);
    await loginPage.clickLoginButton();
    console.log("Connexion réussie !");
})
