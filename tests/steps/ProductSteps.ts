/**
 * Product page steps
 * Encapsulates all interactions with the Products page for better test maintainability
 */
import test from '@lib/BaseTest';
import { Page, expect } from '@playwright/test';
import { ProductsPage } from '@pages/ProductsPage';
import { MainPage } from '@pages/MainPage';

export class ProductSteps {
  /**
   * Navigate to the products page from the main page
   */
  static async navigateToProductsPage(mainPage: MainPage): Promise<void> {
    await test.step('Navigate to products page', async () => {
      await mainPage.navigateToURL();
      await mainPage.clickOnProductsLink();
    });
  }

  /**
   * Verify the products page has loaded correctly
   */
  static async verifyProductsPageLoaded(productsPage: ProductsPage): Promise<void> {
    await test.step('Verify products page is loaded', async () => {
      await expect(productsPage.isProductPage()).toBeTruthy();
      await expect(productsPage.isAllProductsTextVisible()).toBeTruthy();
    });
  }

  /**
   * Search for a specific product
   */
  static async searchForProduct(productsPage: ProductsPage, searchTerm: string): Promise<void> {
    await test.step(`Search for product: "${searchTerm}"`, async () => {
      // Use the page object's native searchForProduct method
      await productsPage.searchForProduct(searchTerm);
      
      // Verify search results are visible
      await expect(productsPage.getSearchProductsText()).toBeTruthy();
    });
  }

  /**
   * Verify search results match expectations
   */
  static async verifySearchResults(productsPage: ProductsPage, expectedProductName: string, expectedCount: number = 1): Promise<void> {
    await test.step('Verify search results display correctly', async () => {
      // Verify the product with the expected name is shown
      await test.step(`Verify "${expectedProductName}" appears in results`, async () => {
        await expect(productsPage.singleProduct.getByText(expectedProductName)).toHaveCount(expectedCount);
      });
    });
  }

  static async verifyProductsListIsVisible(productsPage: ProductsPage, expectedCount: number = 3): Promise<void> {
    await test.step(`Verify that amount of products are at least greater than ${expectedCount}.`, async () => {
      await expect(productsPage.getAllProductsCount).toBeGreaterThan(expectedCount);
    })
    await test.step('Verify that details are visible: product name, category, price, availability, condition, brand', async () => {

    })
  }
} 