class quickContact {
    constructor(page) {
        this.qcContactPageTitle = page.getByText('Create Contact')
        this.qcContactFirstName = page.locator('//input[@name="firstname"]')
        this.qcContactLastName = page.locator('(//input[@name="lastname" and @class="detailedViewTextBox"])[1]')
        this.qcContactEmail = page.locator('(//input[@name="email" and @class="detailedViewTextBox"])[1]')
        this.qcContactAssignedTo = page.locator('(//select[@name="assigned_user_id" and @class="small"])[1]')
        this.qcContactSaveButton = page.locator('//input[@class="crmbutton small save" and @title="Save [Alt+S]"]')
        this.contactSubmitSuccess = page.locator('//span[@class="dvHeaderText"]')
    }
    async qcContactCreation(qcContactFirstName, qcContactLastName, qcContactEmail, qcContactAssignedTo) {
        await this.qcContactFirstName.fill(qcContactFirstName)
        await this.qcContactLastName.fill(qcContactLastName)
        await this.qcContactEmail.fill(qcContactEmail)
        await this.qcContactAssignedTo.selectOption(qcContactAssignedTo)
        await this.qcContactSaveButton.click()
    }
}
export default quickContact