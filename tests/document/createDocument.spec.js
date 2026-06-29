import { expect, test } from "@playwright/test"
import testData from "../../testData/testData.json"
import login from "../../pages/login.page"
import home from "../../pages/home.page"
import document from "../../pages/document.page"
import logout from "../../pages/logout.page"

/**
 * @param {(import "@playwright/test").page} page
 */
let url = testData.url
let username = testData.username
let password = testData.password
let homeTitle = testData.homeTitle
let documentLabel = testData.documentLabel

let newFolderTitleName = testData.newFolderTitleName
let documentAddFolderName = testData.documentAddFolderName
let documentDescriptionName = testData.documentDescriptionName
let documentPageText = testData.documentPageText
let documentName = testData.documentName
let documentImportFile = testData.documentImportFile

test("Document Creation @reg", async ({ page }) => {

    let loginPage = new login(page)
    let homePage = new home(page)
    let documentPage = new document(page)
    let logoutPage = new logout(page)

    //login
    await page.goto(url)
    await loginPage.loginToApplication(username, password)
    await expect(await homePage.homeText).toHaveText(homeTitle)

    //navigate to Quick Create COntact Page
    await homePage.documentMenu.click()
    let actualTitle = await documentPage.documentLabel.innerText()
    await expect(actualTitle).toContain(documentLabel)

    //creating new folder
    await documentPage.newFolderCreation(newFolderTitleName, documentAddFolderName, documentDescriptionName)

    //Creating Document
    await documentPage.documentCreation(documentName, documentImportFile, documentAddFolderName)

    //logout
    await logoutPage.logoutApplication()

})