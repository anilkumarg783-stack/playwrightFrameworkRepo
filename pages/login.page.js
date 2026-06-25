
class login {
    constructor(page) {
        this.userName = page.locator('//input[@name="user_name"]')
        this.password = page.locator('//input[@name="user_password"]')
        this.loginButton = page.locator('#submitButton')
    }

    async loginToApplication(userName, password) {
        await this.userName.fill(userName)
        await this.password.fill(password)
        await this.loginButton.click()

    }
}
export default login