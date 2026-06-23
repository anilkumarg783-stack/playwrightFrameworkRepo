import{expect, test} from "@playwright/test"
import testData from "../../testData/testData.json"
import login from "../../pages/login.page"
import home from "../../pages/home.page"
import lead from "../../pages/lead.page"
import searchGrid from "../../pages/searchGrid.page"
import logout from "../../pages/logout.page"

/**
 * @param {import ('@playwright/test').page} page
 */
let url=testData.url
let username=testData.username
let password=testData.password
let homeTitle=testData.homeTitle
let leadTitle=testData.leadTitle
let creatingNewLeadTitle=testData.creatingNewLeadTitle
let leadSalutation=testData.leadSalutation
let leadFirstName=testData.leadFirstName
let leadLastName=testData.leadLastName
let leadCompanyName=testData.leadCompanyName
let leadSearchForValue=testData.leadLastName
let leadSearchInValue=testData.leadSearchInValue
let updateLeadFirstName=testData.updateLeadFirstName
test("Create and Edit Lead", async({page})=>{
    await page.goto(url)
    let loginPage=new login(page)
    let homePage=new home(page)
    let leadspage=new lead(page)
    let searchSection=new searchGrid(page)
    let logoutpage=new logout(page)
 
  //login
await loginPage.loginToApplication(username,password)
  //User logged in successfully
        // await expect(homePage.homeText).toHaveText(homeTitle);
  //click on Leads menu
    await homePage.leadsMenu.click()
    // navigate to Leads screen
    await expect(await leadspage.leadLabel).toHaveText(leadTitle)
   //click on create Lead icon
   await leadspage.createLeadIcon.click()
   //verify create new lead page is displayed
   await expect(await leadspage.createNewLeadText).toHaveText(creatingNewLeadTitle)
   //Create lead
await leadspage.leadCreation(leadSalutation,leadFirstName,leadLastName,leadCompanyName)
   //verify lead saved the recoerd
    await expect(await leadspage.leadSavedSuccess).toContainText(leadLastName)
   //click on Leads menu
    await leadspage.leadMenuFromLeads.click()

    // search lead from last name
await searchSection.searchRecord(leadSearchForValue,leadSearchInValue)   
  
    //validate to serach the required lead
    await expect(await leadspage.leadFindRecord).toHaveText(leadLastName)
    //Editing the lead
    await leadspage.leadClickEditLink.click()
    //update Firstname
    await leadspage.leadUpdateFirstName.fill(updateLeadFirstName)
    await leadspage.leadUpdateSaveButton.click()
    //verify firstname field is updated successfully
    await expect(await leadspage.leadUpdateFindRecord).toHaveText(updateLeadFirstName)
    await logoutpage.logoutApplication()

})