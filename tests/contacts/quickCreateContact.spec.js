import { expect, test } from "@playwright/test"
import testData from "../../testData/testData.json"
import login from "../../pages/login.page"
import home from "../../pages/home.page"
import quickContact from "../../pages/quickContact.page"
import logout from "../../pages/logout.page"

/**
 * @param {(import "@playwright/test").page} page
 */

let url = testData.url
let username = testData.username
let password = testData.password
let homeTitle = testData.homeTitle
let qcContact = testData.qcContact+Math.round(Math.random()*10)
let qcContactPageText = testData.qcContactPageText
let qcContactFirstName = testData.qcContactFirstName
let qcContactLastName = testData.qcContactLastName
let qcContactEmail = testData.qcContactEmail
let qcContactAssignedTo = testData.qcContactAssignedTo

test("Quick create Contact", async ({ page }) => {

    let loginPage = new login(page)
    let homePage = new home(page)
    let logoutPage = new logout(page)
    let quickContactPage = new quickContact(page)

    //login
    await page.goto(url)
    await loginPage.loginToApplication(username, password)
    await expect(await homePage.homeText).toHaveText(homeTitle)

    //navigate to Quick Create COntact Page
    await homePage.quickCreate.selectOption(qcContact)
    let actualTitle = await quickContactPage.qcContactPageTitle.innerText()
    await expect(actualTitle).toContain(qcContactPageText)

    //smbit quick create contact form
    await quickContactPage.qcContactCreation(qcContactFirstName, qcContactLastName, qcContactEmail, qcContactAssignedTo)

    //verify quick contact creation
    let successMessage = await quickContactPage.contactSubmitSuccess.innerText()
    await expect(successMessage).toContain(qcContactFirstName)

    //logout
    await logoutPage.logoutApplication()
})