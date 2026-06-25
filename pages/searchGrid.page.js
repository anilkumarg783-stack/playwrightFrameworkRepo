import { expect } from "@playwright/test"
import testData from "../testData/testData.json"
import opportunities from "./opportunities.page"

class searchGrid {
    /**
     * 
     * @param {import('@playwright/test').page} page
     */
    constructor(page) {
        this.searchFor = page.locator('//input[@name="search_text" and @class="txtBox"]')
        this.searchIn = page.locator('(//select[@name="search_field" and @class="txtBox"])[1]')
        this.searchNowButton = page.locator('//input[@name="submit"]')

    }

    async searchRecord(searchForValue, searchInValue) {
        await this.searchFor.fill(searchForValue)
        await this.searchIn.selectOption(searchInValue)
        await this.searchNowButton.click()
    }

    async searchOppRecord(page, searchForValue, searchInValue, ExpOppName) {
        let OppModule = new opportunities(page)
        await this.searchFor.fill(searchForValue)
        await this.searchIn.selectOption(searchInValue)
        await this.searchNowButton.click()
    }
}
export default searchGrid