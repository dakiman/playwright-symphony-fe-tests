import {Locator} from "@playwright/test";

export default abstract class BasePageObject {
    protected async isElementVisible(locator: Locator): Promise<boolean> {
        try {
            await locator.waitFor({state: 'visible', timeout: 8000});
            return true;
        } catch (e) {
            return false;
        }
    }
}