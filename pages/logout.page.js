import { expect } from "@playwright/test"

class logout {
    constructor(page) {
        this.logoutIcon = page.locator('//img[contains(@src,"user.PNG")]')
        this.logoutLink = page.locator('//a[text()="Sign Out"]')
        this.loginbutton = page.locator('//div[@class="button"]')
    }

    async logoutApplication() {
        await this.logoutIcon.hover()
        await this.logoutLink.click()
        await expect(await this.loginbutton).toBeVisible()
    }
}
export default logout