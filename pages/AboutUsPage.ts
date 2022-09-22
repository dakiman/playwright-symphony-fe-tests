import {Locator, Page} from "@playwright/test";

export default class AboutUsPage {
    private readonly page: Page;
    private readonly metaDetailsCategories: Locator;
    private readonly metaDetailsContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.metaDetailsCategories = page.locator('section > ul > li > strong');
        this.metaDetailsContainer = page.locator('.pageMetaDetails--list')
    }

    public async getMetaDetailsCategoriesContent(): Promise<Array<string>> {
        await this.metaDetailsContainer.waitFor();

        return this.metaDetailsCategories
            .evaluateAll(categories => categories.map(element => element.textContent));
    }
}