import { expect, test } from "@playwright/test"
import testData from "../../testData/testData.json"
import leadData from "../../testData/leadData.json"
import login from "../../pages/login.page"
import home from "../../pages/home.page"
import lead from "../../pages/lead.page"
import searchGrid from "../../pages/searchGrid.page"
import logout from "../../pages/logout.page"

/**
 * @param {import ('@playwright/test').page} page
 */
let url = testData.url
let username = testData.username
let password = testData.password
let searchForValue = leadData.leads[0].company
let searchInValue = leadData.find[0].searchInValue
let leadSearchHeadedTitle = leadData.find[0].leadSearchHeadedTitle

test("Mass Delete Leads", async ({ page }) => {

    let loginPage = new login(page)
    let homePage = new home(page)
    let leadspage = new lead(page)
    let searchSection = new searchGrid(page)
    let logoutpage = new logout(page)

    //Login
    await page.goto(url)
    await loginPage.loginToApplication(username, password)

    //Create Mutliple Leads
    await homePage.leadsMenu.click()
    for (const lead of leadData.leads) {
        await leadspage.createLeadIcon.click()
        await leadspage.leadCreation(lead.salutation, lead.firstName, lead.lastName, lead.company)
    }

    //Search Created Leads
    await leadspage.leadMenuFromLeads.click()
    await searchSection.searchRecord(searchForValue, searchInValue)
    await leadspage.leadSearchHeaderCnt.waitFor();
    const text = await leadspage.leadSearchHeaderText.innerText();
    expect(text).toContain(leadSearchHeadedTitle);

    //Select and Delete and Leads
    await leadspage.leadSelectAllCheckbox.click()
    page.once("dialog", async (dialog) => {
        console.log(await dialog.message())
        console.log(await dialog.type())
        await dialog.accept()
    })
    await leadspage.leadMassDeleteButton.click()
    let status = await leadspage.leadRecordCheckbox.innerText();
    await expect(status).toContain("No Lead Found !");

    //logout
    await logoutpage.logoutApplication()
})