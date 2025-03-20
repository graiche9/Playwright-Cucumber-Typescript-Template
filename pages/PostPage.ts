import { Page } from 'playwright';

export class PostPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  elements = {
    addButton: () => this.page.getByRole('link', {name: 'Add'}),
    titleInput: () => this.page.locator('input#id_title'),
    contentTextarea: () => this.page.locator('textarea#id_content'),
    saveButton: () => this.page.locator('input[name="_save"]'),
    createdPost: (title: string) => this.page.locator(`a[href*="/admin/myapp/post/"]:has-text("${title}")`).first(),
    errorMessage: () => this.page.locator('.errorlist')
  };

  async clickAddButton() {
    await this.elements.addButton().click();
  }

  async saisirTitre(title: string) {
    await this.elements.titleInput().fill(title);
  }

  async saisirContenu(content: string) {
    await this.elements.contentTextarea().fill(content);
  }

  async clickSaveButton() {
    await this.elements.saveButton().click();
  }

  async isPostCreated(title: string) {
    return await this.elements.createdPost(title).isVisible();
  }

  async getErrorMessage() {
    return await this.elements.errorMessage().textContent();
  }
}