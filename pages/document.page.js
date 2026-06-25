import { expect } from "@playwright/test"

class document {
    constructor(page) {
        this.documentLabel = page.locator('//a[@class="hdrLink" and text()="Documents"]')
        this.documentPageTitle = page.getByText('Create Contact')
        this.documentAddFolderButton = page.locator('//input[@value="Add Folder"]')
        this.documentAddFolderTitle = page.getByText('#editfolder_info')
        this.documentAddFolderName = page.locator('//input[@name="folderName"]')
        this.documentDescriptionName = page.locator('//input[@name="folderDesc"]')
        this.documentAddFolderSaveButton = page.locator('//input[@class="crmbutton small save"]')
        this.createDocumentIcon = page.locator('//img[@src="themes/softed/images/btnL3Add.gif"]')
        this.createNewDocumentText = page.locator('//span[text()="Creating New Document"]')
        this.documentName = page.locator('//input[@name="notes_title"]')
        this.documentChooseFileName = page.locator('#filename_I__')
        this.documentFolderName = page.locator('//select[@name="folderid"]')
        this.documentSaveButton = page.locator('(//input[@class="crmbutton small save" and @value="  Save  "])[1]')
        this.documentSaveSuccess = page.locator('span.dvHeaderText')

    }

    async newFolderCreation(newFolderTitleName, documentAddFolderName, documentDescriptionName) {
        await this.documentAddFolderButton.click()
        await this.documentAddFolderName.fill(documentAddFolderName)
        await this.documentDescriptionName.fill(documentDescriptionName)
        await this.documentAddFolderSaveButton.click()
    }

    async documentCreation(documentName, documentImportFile, documentAddFolderName) {
        await this.createDocumentIcon.click()
        let docPageText = await this.createNewDocumentText.innerText()
        await this.documentName.fill(documentName)
        await this.documentChooseFileName.setInputFiles(documentImportFile)
        await this.documentFolderName.selectOption(documentAddFolderName)
        await this.documentSaveButton.click()
        let saveSuccessMsg = await this.documentSaveSuccess.innerText()
        await expect(saveSuccessMsg).toContain(documentName)
        await this.createDocumentIcon.click()
    }

}
export default document