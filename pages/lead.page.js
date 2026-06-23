class lead{
    constructor(page){
        this.leadLabel=page.locator('//a[@class="hdrLink" and text()="Leads"]')
        this.leadMenuFromLeads=page.locator('//a[@href="index.php?module=Leads&action=index"]')
        this.createLeadIcon=page.locator('//img[@src="themes/softed/images/btnL3Add.gif"]')
        this.createNewLeadText=page.locator('//span[text()="Creating New Lead"]')
        this.leadSalutation=page.locator('//select[@name="salutationtype"]')
        this.leadFirstName=page.locator('//input[@name="firstname"]')
        this.leadLastName=page.locator('//input[@name="lastname"]')
        this.leadCompanyName=page.locator('//input[@name="company"]')
        this.leadSaveButton=page.locator('(//input[@name="button" and @value="  Save  "])[1]')
        this.leadSavedSuccess=page.locator('span.dvHeaderText')
        this.leadFindRecord=page.locator('(//a[@title="Leads"])[1]')
        this.leadClickEditLink=page.locator('//a[text()="edit"]')
        this.leadUpdateFirstName=page.locator('//input[@name="firstname"]')
        this.leadUpdateSaveButton=page.locator('(//input[@type="submit"])[1]')
        this.leadUpdateFindRecord=page.locator('(//a[@title="Leads"])[2]')
        this.leadSelectAllCheckbox=page.locator('//input[@name="selectall"]')
        this.leadSelectIdCheckbox=page.locator('//input[@name="selected_id"]')
        this.leadMassEditButton=page.locator('(//input[@class="crmbutton small edit" and @value="Mass Edit"])[1]')
        this.leadMassEditTitle=page.locator('//td[@class="layerPopupHeading" and text()="Mass Edit - Records Fields"]')
        this.leadMassEditFNCheckbox=page.locator('//input[@name="firstname_mass_edit_check"]')
        this.leadMassEditFirstName=page.locator('//input[@name="firstname"]')
        this.leadMassEditSaveButton=page.locator('//input[@class="crmbutton small save"]')
        this.leadMassDeleteButton=page.locator('(//input[@class="crmbutton small delete"])[1]')

    }

    async leadCreation(leadSalutation,leadFirstName,leadLastName,leadCompanyName){
        await this.leadSalutation.selectOption(leadSalutation)
        await this.leadFirstName.fill(leadFirstName)
        await this.leadLastName.fill(leadLastName)
        await this.leadCompanyName.fill(leadCompanyName)
        await this.leadSaveButton.click()
    }
}
export default lead