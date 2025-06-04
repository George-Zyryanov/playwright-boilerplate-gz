import {BrowserContext, Locator, Page} from "@playwright/test";
import {WebActions} from "@lib/WebActions";

let webActions : WebActions;

export class SingleProductPage {
    readonly page: Page;
    readonly context: BrowserContext;

    // Product Information Locators
    readonly productInformationContainer: Locator;
    readonly productName: Locator;
    readonly productCategory: Locator;
    readonly productPrice: Locator;
    readonly productAvailability: Locator;
    readonly productCondition: Locator;
    readonly productBrand: Locator;

    constructor(page: Page, browserContext: BrowserContext) {
        this.page = page;
        this.context = browserContext;
        webActions = new WebActions(this.page, this.context);

        this.productInformationContainer = page.locator(".product-information");
        this.productName = this.productInformationContainer.locator("h2");
        this.productCategory = this.productInformationContainer.locator("p").filter({hasText: 'Category:'});
        this.productPrice = this.productInformationContainer.locator(".product-information > span > span");
        this.productAvailability = this.productInformationContainer.locator("p").filter({hasText: 'Availability:'});
        this.productCondition = this.productInformationContainer.locator("p").filter({hasText: 'Condition:'});
        this.productBrand = this.productInformationContainer.locator("p").filter({hasText: 'Brand:'});
    }
}