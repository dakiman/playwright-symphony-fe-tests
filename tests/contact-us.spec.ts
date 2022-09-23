import ContactUsPage from "../pages/ContactUsPage";
import {expect, test} from "@playwright/test";
import FooterComponent from "../pages/FooterComponent";

let contactUsPage: ContactUsPage;
let footerComponent: FooterComponent;

test.beforeEach(async ({page}) => {
    contactUsPage = new ContactUsPage(page);
    footerComponent = new FooterComponent(page);
    await page.goto('https://symphony.is/contact-us');
    await footerComponent.clickAcceptCookiesButton();
})


test('Fill contact us form', async () => {
    await contactUsPage.fillNameInput('John Doe');
    await contactUsPage.fillEmailInput('test@test.com');
    await contactUsPage.fillCompanyNameInput('Test Company');
    await contactUsPage.fillContactNumberInput('123456789');
    await contactUsPage.fillMessageInput('This is a test message');
    await contactUsPage.checkTermsAndConditionsCheckbox();
    await contactUsPage.clickSubmitButton();

    let confirmationModalVisible = await contactUsPage.isConfirmationModalVisible();

    expect(confirmationModalVisible).toBeTruthy();
})