import {Page} from "@playwright/test";
import ContactUsPage from "../pages/ContactUsPage";
import ContactUsForm from "../types/forms/ContactUsForm";

export default class ContactFormActions {
    private readonly page: Page;
    private readonly contactUsPage: ContactUsPage;

    constructor(page: Page) {
        this.page = page;
        this.contactUsPage = new ContactUsPage(page);
    }

    public async fillContactForm(form: ContactUsForm): Promise<void> {
        await this.contactUsPage.fillNameInput(form.name);
        await this.contactUsPage.fillEmailInput(form.email);
        await this.contactUsPage.fillCompanyNameInput(form.companyName);
        await this.contactUsPage.fillContactNumberInput(form.contactNumber);
        await this.contactUsPage.fillMessageInput(form.message);
        if(form.checkTermsAndConditions)
            await this.contactUsPage.checkTermsAndConditionsCheckbox();
        // contactUsPage
        // await this.contactUsPage.clickSubmitButton();
    }
}