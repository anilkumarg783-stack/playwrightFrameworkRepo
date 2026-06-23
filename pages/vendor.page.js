/**
 * @param { import('@playwright/test').page} page
 */
class vendor {
    constructor(page){
        this.vendorLabel=page.locator('//a[@class="hdrLink" and text()="Vendors"]')
        this.createVendorIcon=page.locator('//img[@src="themes/softed/images/btnL3Add.gif"]')
        this.createNewVendorText=page.locator('//span[text()="Creating New Vendor"]')
        this.vendorName=page.locator('//input[@name="vendorname"]')
        this.vendorEmail=page.locator('//input[@name="email"]')
        this.vendorGLAccount=page.locator('//select[@name="glacct"]')
        this.vendorCategory=page.locator('//input[@name="category"]')
        this.vendorSaveButton=page.locator('(//input[@name="button" and @value="  Save  "])[1]')
        this.vendorSavedSuccess=page.locator('span.lvtHeaderText')
        this.vendorNewMenu=page.locator('(//a[@href="index.php?module=Vendors&action=index" and text()="Vendors"])[1]')
        this.vendorSearchValue=page.locator('(//a[@title="Vendors"])[1]')
        this.vendorRecordCheckbox=page.locator('(//input[@name="selected_id" and @type="checkbox"])[1]')
        this.vendorDeleteButton=page.locator('(//input[@class="crmbutton small delete"])[1]')
        this.vendorDeleteIcon=page.locator('(//a[text()="del"])[1]')
        this.vendorDeleteConfirmationMsg=page.locator('(//a[@href="index.php?module=Vendors&action=EditView&return_action=DetailView&parenttab=Inventory"])[1]')
        
    }

    async vendorCreation(venName,VenEmail,VenGLAccount,VenCetagory){
        await this.vendorName.fill(venName)
        await this.vendorEmail.fill(VenEmail)
        await this.vendorGLAccount.selectOption(VenGLAccount)
        await this.vendorCategory.fill(VenCetagory)
        await this.vendorSaveButton.click()
        // await this.vendorSavedSuccess
    }
   
    }

export default vendor