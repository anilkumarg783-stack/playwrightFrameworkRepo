import { expect } from "@playwright/test"
import testData from "../testData/testData.json"
import opportunities from "./opportunities.page"



class searchGrid{
    /**
     * 
     * @param {import('@playwright/test').page} page
     */
    constructor(page){
        this.searchFor=page.locator('//input[@name="search_text" and @class="txtBox"]')
        this.searchIn=page.locator('(//select[@name="search_field" and @class="txtBox"])[1]')
        this.searchNowButton=page.locator('//input[@name="submit"]')

    }

    async searchRecord(page,searchForValue,searchInValue,ExpOppName){
        let OppModule=new opportunities(page)
        //await page.pause();
        this.searchFor.fill(searchForValue)
        this.searchIn.selectOption(searchInValue)
        this.searchNowButton.click()
        //validate to serach the required record
           //let oppName =testData.oppName
           let findRecord=await OppModule.oppFindRecord.textContent();
        await expect(findRecord).toContain(ExpOppName)
    }

        async search(searchForValue,searchInValue){
         this.searchFor.fill(searchForValue)
      this.searchIn.selectOption(searchInValue)
        this.searchNowButton.click()

}
}
export default searchGrid