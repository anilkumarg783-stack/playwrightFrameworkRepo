import { expect } from "@playwright/test"
import testData from "../testData/testData.json"

class opportunities {
    constructor(page) {
        this.opportunitiesLabel = page.locator('//a[@class="hdrLink" and text()="Opportunities"]')
        this.createOpportunitiesIcon = page.locator('//img[@src="themes/softed/images/btnL3Add.gif"]')
        this.createNewOpportunitiesText = page.locator('//span[text()="Creating New Opportunity"]')
        this.opportunityName = page.locator('//input[@name="potentialname"]')
        this.opportunityClickRelatedToIcon = page.locator('(//img[@src="themes/softed/images/select.gif"])[1]')
        this.popupItems = page.locator('[id="1"]')
        this.oppleadSource = page.locator('//select[@name="leadsource"]')
        this.OppSaveButton = page.locator('(//input[@name="button" and @value="  Save  "])[1]')
        this.oppSavedSuccess = page.locator('span.dvHeaderText')
        // this.oppFindRecord=page.locator('(//a[@title="Opportunities"])[1]')
        this.oppFindRecord = page.locator('//a[@title="Opportunities"]').first()
        this.oppClickEditLink = page.locator('//a[text()="edit"]')
        this.UpdateOppName = page.locator('//input[@name="potentialname"]')
        this.oppUpdateFindRecord = page.locator('(//a[@title="Opportunities"])[1]')

    }
    async oppCreation(page, oppName, leadSource) {
        await this.createOpportunitiesIcon.click()
        // await this.expect(await this.opportunitiesPage.createNewOpportunitiesText).toHaveText(testData.creatingNewOppTitle)
        await this.opportunityName.fill(oppName)
        let [win] = await Promise.all([
            page.waitForEvent('popup'),
            this.opportunityClickRelatedToIcon.click()
        ]);
        await win.locator('[id="1"]').click();
        await this.oppleadSource.selectOption(leadSource)
        await this.OppSaveButton.click()
        let oppNameNew = testData.oppName
        let ActOppName = await this.oppSavedSuccess.innerText();
        await expect(ActOppName).toContain(oppNameNew);
    }

}
export default opportunities