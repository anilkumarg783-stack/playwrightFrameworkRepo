import {expect, test} from "@playwright/test"
import testData from "../../testData/testData.json"
import login from "../../pages/login.page"
import home from "../../pages/home.page"
import opportunities from "../../pages/opportunities.page.js"
import searchGrid from "../../pages/searchGrid.page.js"
import logout from "../../pages/logout.page.js"

/**
 * @param {import ('@playwright/test').page} page
 */
let url=testData.url
let username=testData.username
let password=testData.password
let homeTitle=testData.homeTitle
let OppTitle=testData.OppTitle
let creatingNewOppTitle=testData.creatingNewOppTitle
let oppName=testData.oppName
let leadSource=testData.leadSource
let oppSearchForValue=testData.oppName
let oppSearchInValue=testData.oppSearchInValue
let updateOppName=testData.updateOppName
let UpdateOppSearchForValue=testData.updateOppName

test("Create and Edit Opportunities", async({page})=>{
let loginPage=new login(page)
let homePage=new home(page)
let opportunitiesPage=new opportunities(page)
let searchSection=new searchGrid(page)
let logoutPage=new logout(page)

await page.goto(url)
  await loginPage.loginToApplication(username,password)
await expect(await homePage.homeText).toHaveText(homeTitle);
await homePage.opportunitiesMenu.click()
await expect(await opportunitiesPage.opportunitiesLabel).toHaveText(OppTitle)
  await opportunitiesPage.oppCreation(page,oppName,leadSource)
// await expect(await opportunitiesPage.oppSavedSuccess).toContainText(oppName)
await homePage.opportunitiesMenu.click()
  await searchSection.searchRecord(page,oppSearchForValue,oppSearchInValue,oppName)
//    //validate to serach the required lead
// await expect(await opportunitiesPage.oppFindRecord).toHaveText(oppName)
await opportunitiesPage.oppClickEditLink.click()
// let updateOppName=testData.updateOppName
await opportunitiesPage.opportunityName.fill(updateOppName)
await opportunitiesPage.OppSaveButton.click()
await homePage.opportunitiesMenu.click()
   await searchSection.searchRecord(page,UpdateOppSearchForValue,oppSearchInValue,updateOppName)
await logoutPage.logoutApplication()
})