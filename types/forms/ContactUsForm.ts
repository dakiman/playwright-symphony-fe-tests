export default interface ContactUsForm {
    name?: string;
    email: string;
    companyName?: string;
    contactNumber?: string;
    message: string;
    checkTermsAndConditions: boolean;
}