import { expect, test } from "@playwright/test"
import testData from "../../testData/testData.json"
import login from "../../pages/login.page"
import home from "../../pages/home.page"
import feedback from "../../pages/feedback.page"
import logout from "../../pages/logout.page"

/**
 * @param {import ("@playwright/test").page} page
 */

let url = testData.url
let username = testData.username
let password = testData.password
let homeTitle = testData.homeTitle
let fbPageTitle = testData.fbPageTitle
let fbSummary = testData.fbSummary
let fbDescription = testData.fbDescription
let fbEmail = testData.fbEmail
let fbVersion = testData.fbVersion
let fbSubmitSuccess = testData.fbSubmitSuccess

test("Submit Feedback Form @smoke", async ({ page }) => {

    let loginPage = new login(page)
    let homePage = new home(page)
    let logoutPage = new logout(page)
    //login
    await page.goto(url)
    await loginPage.loginToApplication(username, password)
    await expect(await homePage.homeText).toHaveText(homeTitle)

    //Navigating to Feedback Form
    await homePage.infoIcon.hover()
    let [win] = await Promise.all([
        page.waitForEvent('popup'),
        homePage.feedbackLink.click()
    ]);

    await win.waitForLoadState('load')
    let feedbackPage = new feedback(win)
    let feedbackTitle = await feedbackPage.feedbackTitle.innerText()
    await expect(feedbackTitle).toContain(fbPageTitle)

    //fill feedback form
    console.log(`fb summary-${fbSummary} fbDescription ${fbDescription} fbEmail ${fbEmail} fbVersion ${fbVersion} fbSubmitSuccess ${fbSubmitSuccess}`)
    await feedbackPage.submitFeedback(fbSummary, fbDescription, fbEmail, fbVersion, fbSubmitSuccess)

    //Logout
    await logoutPage.logoutApplication()

})