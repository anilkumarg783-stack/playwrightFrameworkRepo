import { expect, test } from "@playwright/test"
import testData from "../../testData/testData.json"
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
let homeTitle = testData.homeTitle
let leadTitle = testData.leadTitle
let creatingNewLeadTitle = testData.creatingNewLeadTitle
let leadSalutation = testData.leadSalutation
let leadFirstName = testData.leadFirstName+Math.round(Math.random()*10)
// console.log(leadFirstName)
let leadLastName = testData.leadLastName+Math.round(Math.random()*10)
let leadCompanyName = testData.leadCompanyName
let leadSearchForValue = testData.leadLastName
let leadSearchInValue = testData.leadSearchInValue
let updateLeadFirstName = testData.updateLeadFirstName
test("Create and Edit Lead", async ({ page }) => {
  await page.goto(url)
  let loginPage = new login(page)
  let homePage = new home(page)
  let leadspage = new lead(page)
  let searchSection = new searchGrid(page)
  let logoutpage = new logout(page)

  //login
  await loginPage.loginToApplication(username, password)
  await expect(homePage.homeText).toHaveText(homeTitle);
  await homePage.leadsMenu.click()
  await expect(await leadspage.leadLabel).toHaveText(leadTitle)

  //Lead Creation
  await leadspage.createLeadIcon.click()
  await expect(await leadspage.createNewLeadText).toHaveText(creatingNewLeadTitle)
  await leadspage.leadCreation(leadSalutation, leadFirstName, leadLastName, leadCompanyName)
  await expect(await leadspage.leadSavedSuccess).toContainText(leadLastName)
  await leadspage.leadMenuFromLeads.click()

  // search lead from last name
  await searchSection.searchRecord(leadSearchForValue, leadSearchInValue)
  await expect(await leadspage.leadFindRecord).toHaveText(leadLastName)

  //Editing the lead
  await leadspage.leadClickEditLink.click()
  await leadspage.leadUpdateFirstName.fill(updateLeadFirstName)
  await leadspage.leadUpdateSaveButton.click()
  await expect(await leadspage.leadUpdateFindRecord).toHaveText(updateLeadFirstName)

  //logout
  await logoutpage.logoutApplication()
})