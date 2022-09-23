import {Locator, Page} from "@playwright/test";
import JobOpening from "../types/dto/JobOpening";

export default class CareersPage {
    private readonly page: Page;
    private readonly jobOpeningsCards: Locator;
    private readonly jobOpeningContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.jobOpeningsCards = page.locator('.currentOpenings--job')
        this.jobOpeningContainer = page.locator('.currentOpenings--jobs');
    }

    public async getJobOpeningsCount(): Promise<number> {
        return this.jobOpeningsCards.count();
    }

    public async getAllJobsTitleAndLocation(): Promise<Array<JobOpening>> {
        await this.jobOpeningContainer.waitFor();

        return (await this.jobOpeningsCards.evaluateAll(cards => {
            return cards.map(card => {
                let title = card.querySelector('.currentOpenings--job-title').textContent;
                let location = card.querySelector('.currentOpenings--job-locationWrapper').textContent;
                return {title, location}
            })
        }))
    }
}

