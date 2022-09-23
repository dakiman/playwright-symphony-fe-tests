import ContactUsPage from "../pages/ContactUsPage";
import {expect, test} from "@playwright/test";
import FooterComponent from "../pages/FooterComponent";
import ContactFormActions from "../actions/ContactFormActions";
import ContactUsForm from "../types/forms/ContactUsForm";
import {readFileAsJson} from "../utils/FileUtils";

let contactUsPage: ContactUsPage;
let footerComponent: FooterComponent;
let contactFormActions: ContactFormActions;
let defaultContactFormData: ContactUsForm;

test.beforeEach(async ({page}) => {
    contactUsPage = new ContactUsPage(page);
    footerComponent = new FooterComponent(page);
    contactFormActions = new ContactFormActions(page);
    defaultContactFormData = readFileAsJson('./data/defaultContactFormData.json');
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

test('Fill contact us form - action', async () => {
    await contactFormActions.fillContactForm({
        name: 'John Doe',
        email: 'test@test.com',
        companyName: 'Test Company',
        contactNumber: '123456789',
        message: 'This is a test message',
        checkTermsAndConditions: true
    })
    await contactUsPage.clickSubmitButton();

    let confirmationModalVisible = await contactUsPage.isConfirmationModalVisible();
    expect(confirmationModalVisible).toBeTruthy();
})

test('Fill contact us form - action with prebuilt data', async () => {
    await contactFormActions.fillContactForm(defaultContactFormData);
    await contactUsPage.clickSubmitButton();

    let confirmationModalVisible = await contactUsPage.isConfirmationModalVisible();
    expect(confirmationModalVisible).toBeTruthy();
})