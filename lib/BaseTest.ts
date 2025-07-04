import { TestInfo, test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { ElementsPage } from '@pages/ElementsPage';
import { AlertsFrameWindowsPage } from '@pages/AlertsFrameWindowsPage';
import { WidgetsPage } from '@pages/WidgetsPage';
import { InteractionsPage } from '@pages/InteractionsPage';
import { MainPage } from '@pages/MainPage';
import { ProductsPage} from '@pages/ProductsPage';
import { SingleProductPage } from '@pages/SingleProductPage';
import { WebActions } from '@lib/WebActions';

const test = baseTest.extend<{
    webActions: WebActions;
    loginPage: LoginPage;
    elementsPage: ElementsPage;
    alertsFrameWindowsPage: AlertsFrameWindowsPage;
    widgetsPage: WidgetsPage;
    interactionsPage: InteractionsPage;
    productsPage: ProductsPage;
    mainPage: MainPage;
    singleProductPage: SingleProductPage;
    testInfo: TestInfo;
}>({
    webActions: async ({ page, context }, use) => {
        await use(new WebActions(page, context));
    },
    loginPage: async ({ page, context }, use) => {
        await use(new LoginPage(page, context));
    },
    elementsPage: async ({ page, context }, use) => {
        await use(new ElementsPage(page, context));
    },
    alertsFrameWindowsPage: async ({ page, context }, use) => {
        await use(new AlertsFrameWindowsPage(page, context));
    },
    widgetsPage: async ({ page, context }, use) => {
        await use(new WidgetsPage(page, context));
    },
    interactionsPage: async ({ page, context }, use) => {
        await use(new InteractionsPage(page, context));
    },
    mainPage: async ({page, context}, use) => {
        await use(new MainPage(page, context));
    },
    productsPage: async({page, context}, use) => {
        await use(new ProductsPage(page, context));
    },
    singleProductPage: async({page, context}, use) => {
        await use(new SingleProductPage(page, context));
    }
})

export default test;