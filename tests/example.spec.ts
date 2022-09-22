import {test, expect} from '@playwright/test';
import AboutUsPage from "../pages/AboutUsPage";
import CareersPage from "../pages/CareersPage";
import NavbarComponent from "../pages/NavbarComponent";
import JobOpening from "../types/JobOpening";
import {readFileAsJson, writeToFile} from "../utils/FileUtils";

let aboutUsPage: AboutUsPage;
let careersPage: CareersPage;
let navbarComponent: NavbarComponent;
let expectedMetaDetailsCategories: Array<string>;

test.beforeEach(async ({page}) => {
    aboutUsPage = new AboutUsPage(page);
    careersPage = new CareersPage(page);
    navbarComponent = new NavbarComponent(page);
    expectedMetaDetailsCategories = readFileAsJson('./data/metaDetailsCategories.json');
    await page.goto('https://symphony.is/');
})

test('Navigates to `About us` page and verifies the sidebar items', async ({page}) => {
    await navbarComponent.clickAboutUsNavButton();
    let metaDetailsCategories = await aboutUsPage.getMetaDetailsCategoriesContent();

    expect(metaDetailsCategories).toEqual(expectedMetaDetailsCategories);
})

test('Counts the number of open positions', async ({page}) => {
    await navbarComponent.clickCurrentOpenings();

    let jobs = await careersPage.getAllJobsTitleAndLocation();
    expect(jobs.length).toBe(87);
})

test('Retrieves all job openings titles and locations', async ({page}) => {
    await navbarComponent.clickCurrentOpenings();
    let jobOpenings: Array<JobOpening> = await careersPage.getAllJobsTitleAndLocation();

    writeToFile('./output/jobOpenings.txt', jobOpenings.map(job => `${job.title}, ${job.location}`));
})