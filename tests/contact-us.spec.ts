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
let invalidEmails: Array<string>;
let validEmails: Array<string>;

test.beforeAll(async () => {
    defaultContactFormData = readFileAsJson('./data/defaultContactFormData.json');
    invalidEmails = readFileAsJson('./data/invalidEmails.json');
    validEmails = readFileAsJson('./data/validEmails.json');
});

test.beforeEach(async ({page}) => {
    contactUsPage = new ContactUsPage(page);
    footerComponent = new FooterComponent(page);
    contactFormActions = new ContactFormActions(page);
    await page.goto('https://symphony.is/contact-us');
    await footerComponent.clickAcceptCookiesButton();
})

test('Send valid contact form message', async () => {
    await contactFormActions.fillContactForm(defaultContactFormData);
    await contactUsPage.clickSubmitButton();

    let confirmationModalVisible = await contactUsPage.isConfirmationModalVisible();
    expect(confirmationModalVisible).toBeTruthy();
})

validEmails.forEach(email => {
    test(`Send valid contact form message with valid email ${email}`, async () => {
        await contactFormActions.fillContactForm({...defaultContactFormData, email});
        await contactUsPage.clickSubmitButton();

        let confirmationModalVisible = await contactUsPage.isConfirmationModalVisible();
        expect(confirmationModalVisible).toBeTruthy();
    })
})

test('Send contact form message without agreeing to terms and conditions', async () => {
    await contactFormActions.fillContactForm({...defaultContactFormData, checkTermsAndConditions: false});
    await contactUsPage.clickSubmitButton();

    let validationMessageVisible = await contactUsPage.isValidationMessageVisible();
    expect(validationMessageVisible).toBeTruthy();

    let validationMessageText = await contactUsPage.getValidationMessageContent();
    expect(validationMessageText).toContain('Please accept the Terms and Conditions before submitting the message');
})

test('Send contact form message without email', async () => {
    await contactFormActions.fillContactForm({...defaultContactFormData, email: ''});
    await contactUsPage.clickSubmitButton();

    let validationMessageVisible = await contactUsPage.isValidationMessageVisible();
    expect(validationMessageVisible).toBeTruthy();

    let validationMessageText = await contactUsPage.getValidationMessageContent();
    expect(validationMessageText).toContain('Please fill out the required field: email');
})

invalidEmails.forEach(email => {
    test(`Send contact form message with invalid email ${email}`, async () => {
        await contactFormActions.fillContactForm({...defaultContactFormData, email});
        await contactUsPage.clickSubmitButton();

        let validationMessageVisible = await contactUsPage.isValidationMessageVisible();
        expect(validationMessageVisible).toBeTruthy();

        let validationMessageText = await contactUsPage.getValidationMessageContent();
        expect(validationMessageText).toContain('Please use the correct email format');
    })
})

test('Send contact form message without message', async () => {
    await contactFormActions.fillContactForm({...defaultContactFormData, message: ''});
    await contactUsPage.clickSubmitButton();

    let validationMessageVisible = await contactUsPage.isValidationMessageVisible();
    expect(validationMessageVisible).toBeTruthy();

    let validationMessageText = await contactUsPage.getValidationMessageContent();
    expect(validationMessageText).toContain('Please fill out the required field: message');
})

test('Send contact form message without name', async () => {
    await contactFormActions.fillContactForm({...defaultContactFormData, name: ''});
    await contactUsPage.clickSubmitButton();

    let confirmationModalVisible = await contactUsPage.isConfirmationModalVisible();
    expect(confirmationModalVisible).toBeTruthy();
})

test('Send contact form message without company name', async () => {
    await contactFormActions.fillContactForm({...defaultContactFormData, companyName: ''});
    await contactUsPage.clickSubmitButton();

    let confirmationModalVisible = await contactUsPage.isConfirmationModalVisible();
    expect(confirmationModalVisible).toBeTruthy();
})

test('Send contact form message without contact number', async () => {
    await contactFormActions.fillContactForm({...defaultContactFormData, contactNumber: ''});
    await contactUsPage.clickSubmitButton();

    let confirmationModalVisible = await contactUsPage.isConfirmationModalVisible();
    expect(confirmationModalVisible).toBeTruthy();
})

