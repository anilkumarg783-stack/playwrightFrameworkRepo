import { expect, test } from "@playwright/test"
import testData from "../../testData/testData.json"
import login from "../../pages/login.page"
import home from "../../pages/home.page"
import vendor from "../../pages/vendor.page.js"
import searchGrid from "../../pages/searchGrid.page.js"
import logout from "../../pages/logout.page"

/**
 * @param {import ('@playwright/test').page} page
 */
let url = testData.url
let username = testData.username
let password = testData.password
let homeTitle = testData.homeTitle
let vendorText = testData.vendorText
let creatingNewVendorTitle = testData.creatingNewVendorTitle
let venName = testData.venName
let venEmail = testData.venEmail
let venGLAccount = testData.venGLAccount
let venCategory = testData.venCategory
let venSearchForValue = testData.venName
let venSearchInValue = testData.venSearchInValue

test("Create and Delete Vendor through the Delete Button", async ({ page }) => {
    page.on("dialog", async (dialog) => {
        console.log(await dialog.message())
        console.log(await dialog.type())
        await dialog.accept()
    })
    let loginPage = new login(page)
    let homePage = new home(page)
    let vendorPage = new vendor(page)
    let searchSection = new searchGrid(page)
    let logoutPage = new logout(page)

    //Login
    await page.goto(url)
    await loginPage.loginToApplication(username, password)
    await expect(await homePage.homeText).toHaveText(homeTitle)

    //Vendor Creation
    await homePage.moreMenu.hover()
    await homePage.moreVendorSubMenu.click()
    await expect(await vendorPage.vendorLabel).toHaveText(vendorText)
    await vendorPage.createVendorIcon.click()
    await expect(await vendorPage.createNewVendorText).toHaveText(creatingNewVendorTitle)
    await vendorPage.vendorCreation(venName, venEmail, venGLAccount, venCategory)
    await expect(await vendorPage.vendorSavedSuccess).toContainText(venName)

    //Search Record
    await vendorPage.vendorNewMenu.click()
    await searchSection.searchRecord(venSearchForValue, venSearchInValue)
    await expect(await vendorPage.vendorSearchValue).toHaveText(venName)

    //Delete Record
    await vendorPage.vendorRecordCheckbox.check()
    await vendorPage.vendorDeleteButton.click()
    await expect(await vendorPage.vendorRecordCheckbox).not.toBeVisible()

    //Logout
    await logoutPage.logoutApplication()
})