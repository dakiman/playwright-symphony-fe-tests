import {Locator, Page} from "@playwright/test";

export default class NavbarComponent {
    private readonly page: Page;
    private readonly aboutUsNavButton: Locator;
    private readonly careersNavButton: Locator;
    private readonly currentOpeningsNavButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.aboutUsNavButton = page.locator('text=About Us');
        this.careersNavButton = page.locator('span:has-text("Careers")');
        this.currentOpeningsNavButton = page.locator('a[href="/careers#current-openings"]');
    }

    public async clickAboutUsNavButton(): Promise<void> {
        await this.aboutUsNavButton.click();
    }

    public async clickCurrentOpenings(): Promise<void> {
        await this.careersNavButton.hover();
        await this.currentOpeningsNavButton.click();
    }
}