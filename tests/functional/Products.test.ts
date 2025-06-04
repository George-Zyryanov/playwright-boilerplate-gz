import test from '@lib/BaseTest'
import {expect} from "@playwright/test";
import { createTestMetadata } from '@lib/TestMetadata';
import { ProductSteps } from '../steps/ProductSteps';

test('Verify Products Page', createTestMetadata({
    testId: 'TC009',
    testName: 'Verify Products Search Functionality',
    description: 'Verifies that product search returns correct results and displays them properly',
    linkInTestManagementSys: 'https://testmanagement.example.com/testcase/TC009',
    priority: 'P1',
    author: 'George Zyryanov',
    linkToJiraTicket: 'https://jira.example.com/browse/JIRA-123',
    pageUnderTest: 'ProductsPage',
    featureUnderTest: 'ProductSearch'
}), async ({productsPage, mainPage}) =>{
    // Navigate to products page
    await ProductSteps.navigateToProductsPage(mainPage);
    
    // Verify products page loaded correctly
    await ProductSteps.verifyProductsPageLoaded(productsPage);
    
    // Search for product
    const searchTerm = "WRONG PRODUCT";
    await ProductSteps.searchForProduct(productsPage, searchTerm);
    
    // Verify search results
    await ProductSteps.verifySearchResults(productsPage, searchTerm);
})

test('Verify All Products and product detail page', createTestMetadata({
  testId: 'TC008',
  testName: 'Verify All Products and product detail page',
  description: 'Verify that detail detail is visible: product name, category, price, availability, condition, brand',
  linkInTestManagementSys: 'https://testmanagement.example.com/testcase/TC009',
  priority: 'P1',
  author: 'George Zyryanov',
  linkToJiraTicket: 'https://jira.example.com/browse/JIRA-123',
  pageUnderTest: 'ProductsPage',
  featureUnderTest: 'All Products Table'
}), async ({productsPage, mainPage}) => {
    // Navigate to products page
    await ProductSteps.navigateToProductsPage(mainPage)

    // Verify that home page is visible successfully
    await ProductSteps.verifyProductsPageLoaded(productsPage);



    // 6. The products list is visible
    // 7. Click on 'View Product' of first product
    // 8. User is landed to product detail page
    // 9. Verify that detail is visible: product name, category, price, availability, condition, brand
})

// export npm_config_ENV="qa"
// npm run test:single tests/functional/Products.test.ts 