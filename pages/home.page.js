class home{
    constructor(page){
        this.leadsMenu=page.locator('//a[text()="Leads"]')
        this.opportunitiesMenu=page.locator('//a[@href="index.php?module=Potentials&action=index"]')
        this.homeText=page.locator('a.hdrLink')
        this.moreMenu=page.locator('//a[text()="More"]')
        this.moreVendorSubMenu=page.locator('//a[@href="index.php?module=Vendors&action=index"]')
        this.dashboardMenu=page.locator('//a[@href="index.php?module=Dashboard&action=index"]')
        this.documentMenu=page.locator('//a[@href="index.php?module=Documents&action=index"]')
        //test
        //testfetch
        // new changes
    }
}
export default home 
