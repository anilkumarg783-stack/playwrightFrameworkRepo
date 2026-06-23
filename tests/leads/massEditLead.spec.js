import{expect, test} from "@playwright/test"
import testData from "../../testData/testData.json"
import leadData from "../../testData/leadData.json"
import login from "../../pages/login.page"
import home from "../../pages/home.page"
import lead from "../../pages/lead.page"
import searchGrid from "../../pages/searchGrid.page"
// import logout from "../../pages/logout.page"

/**
 * @param {import ('@playwright/test').page} page
 */
let url=testData.url
let username=testData.username
let password=testData.password
// let searchForValue=leadData.leads.company
// let searchInValue=leadData.find.searchInValue

test("Mass Edit Leads", async({page})=>{
    await page.goto(url)
    let loginPage=new login(page)
    let homePage=new home(page)
    let leadspage=new lead(page)
    let searchSection=new searchGrid(page)
    // let logoutpage=new logout(page)
 
await loginPage.loginToApplication(username,password)
await homePage.leadsMenu.click()
for (const lead of leadData.twoRec){
await leadspage.createLeadIcon.click()
await leadspage.leadCreation(lead.salutation,lead.firstName,lead.lastName,lead.company)
} 

await leadspage.leadMenuFromLeads.click()
await searchSection.searchFor.fill("talisma")
await searchSection.searchIn.selectOption("Company")
await searchSection.searchNowButton.click()
await leadspage.leadSelectAllCheckbox.click()
await leadspage.leadMassEditButton.click()
await expect(await leadspage.leadMassEditTitle).toBeVisible()
await leadspage.leadMassEditFNCheckbox.click()
await leadspage.leadMassEditFirstName.fill("Kamesh")
// await leadspage.leadMassEditSaveButton.waitFor({state:'visible'});
// await page.waitForLoadState('networkidle');
await expect(await leadspage.leadMassEditButton).toBeEnabled()
await leadspage.leadMassEditButton.waitFor()
await leadspage.leadMassEditSaveButton.click() 
})