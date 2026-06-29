import { expect, test } from "@playwright/test"
import testData from "../../testData/testData.json"
import login from "../../pages/login.page"
import home from "../../pages/home.page"
import opportunities from "../../pages/opportunities.page.js"
import searchGrid from "../../pages/searchGrid.page.js"
import logout from "../../pages/logout.page.js"

/**
 * @param {import ('@playwright/test').page} page
 */
let url = testData.url
let username = testData.username
let password = testData.password
let homeTitle = testData.homeTitle
let OppTitle = testData.OppTitle
let creatingNewOppTitle = testData.creatingNewOppTitle
let oppName = testData.oppName
let leadSource = testData.leadSource
let oppSearchForValue = testData.oppName
let oppSearchInValue = testData.oppSearchInValue
let updateOppName = testData.updateOppName
let UpdateOppSearchForValue = testData.updateOppName

test("Create and Edit Opportunities @reg", async ({ page }) => {
  let loginPage = new login(page)
  let homePage = new home(page)
  let opportunitiesPage = new opportunities(page)
  let searchSection = new searchGrid(page)
  let logoutPage = new logout(page)

  //Login
  await page.goto(url)
  await loginPage.loginToApplication(username, password)
  await expect(await homePage.homeText).toHaveText(homeTitle);
  await homePage.opportunitiesMenu.click()
  await expect(await opportunitiesPage.opportunitiesLabel).toHaveText(OppTitle)

  //Opportunity Creation
  await opportunitiesPage.oppCreation(page, oppName, leadSource)
  await expect(await opportunitiesPage.oppSavedSuccess).toContainText(oppName)
  await homePage.opportunitiesMenu.click()

  //Search Record
  await searchSection.searchOppRecord(page, oppSearchForValue, oppSearchInValue, oppName)
  await expect(await opportunitiesPage.oppFindRecord).toHaveText(oppName)

  //Editing Lead
  await opportunitiesPage.oppClickEditLink.click()
  await opportunitiesPage.opportunityName.fill(updateOppName)
  await opportunitiesPage.OppSaveButton.click()
  await homePage.opportunitiesMenu.click()

  //search Updated Record
  await searchSection.searchOppRecord(page, UpdateOppSearchForValue, oppSearchInValue, updateOppName)
  await expect(await opportunitiesPage.oppFindRecord).toHaveText(updateOppName)

  //Logout
  await logoutPage.logoutApplication()
})