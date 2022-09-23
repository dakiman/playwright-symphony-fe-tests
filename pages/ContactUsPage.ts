import {Locator, Page} from "@playwright/test";

export default class ContactUsPage {
    private readonly page: Page;
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly companyNameInput: Locator;
    private readonly contactNumberInput: Locator;
    private readonly messageInput: Locator;
    private readonly termsAndConditionsCheckbox: Locator;
    private readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('input[name="name"]');
        this.emailInput = page.locator('input[name="email"]');
        this.companyNameInput = page.locator('input[name="company name"]');
        this.contactNumberInput = page.locator('input[name="contactNumber"]');
        this.messageInput = page.locator('textarea[name="message"]');
        this.termsAndConditionsCheckbox = page.locator('.leaveAMessage--footer-checkbox-icon');
        this.submitButton = page.locator('text=Submit');
    }

    public async fillNameInput(name: string): Promise<void> {
        await this.nameInput.fill(name);
    }

    public async fillEmailInput(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    public async fillCompanyNameInput(companyName: string): Promise<void> {
        await this.companyNameInput.fill(companyName);
    }

    public async fillContactNumberInput(contactNumber: string): Promise<void> {
        await this.contactNumberInput.fill(contactNumber);
    }

    public async fillMessageInput(message: string): Promise<void> {
        await this.messageInput.fill(message);
    }

    public async checkTermsAndConditionsCheckbox(): Promise<void> {
        await this.termsAndConditionsCheckbox.click();
    }

    public async clickSubmitButton(): Promise<void> {
        await this.submitButton.click();
    }
}