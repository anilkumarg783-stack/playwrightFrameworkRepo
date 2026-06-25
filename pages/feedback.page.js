import { expect } from "@playwright/test"

class feedback {
    constructor(page) {
        this.feedbackTitle = page.locator('//span[text()="Please send us your feedback to help improve the product."]')
        this.fbTypeSuggession = page.locator('//input[@value="suggestion"]')
        this.fbSummary = page.locator('//input[@name="subject"]')
        this.fbDescription = page.locator('//textarea[@name="description"]')
        this.fbEmail = page.locator('//input[@name="sender-email"]')
        this.fbVersion = page.locator('//select[@name="vtigerversion"]')
        this.fbSaveButton = page.locator('//input[@class="button save"]')
        this.fbSubmitSuccess = page.getByRole("heading", { name: 'Internal Server Error' })
    }

    async submitFeedback(fbSummary, fbDescription, fbEmail, fbVersion, fbSubmitSuccess) {
        await this.fbTypeSuggession.click()
        await this.fbSummary.fill(fbSummary)
        await this.fbDescription.fill(fbDescription)
        await this.fbEmail.fill(fbEmail)
        await this.fbVersion.selectOption(fbVersion)
        await this.fbSaveButton.click()
        await expect(await this.fbSubmitSuccess).toHaveText(fbSubmitSuccess)
    }
}
export default feedback