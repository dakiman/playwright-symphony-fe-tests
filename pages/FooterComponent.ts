import {Locator, Page} from "@playwright/test";

export default class FooterComponent {
    private readonly page: Page;
    private readonly acceptCookiesButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.acceptCookiesButton = page.locator('text=Agree & Continue');
    }

    public async clickAcceptCookiesButton(): Promise<void> {
        await this.acceptCookiesButton.click();
    }
}