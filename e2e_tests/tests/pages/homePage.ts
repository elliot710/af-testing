import { Page, Locator } from "playwright";
import { expect } from "playwright/test";
import * as homePageLoc from "../locators/homepageloc.json";

import BasePage from "./basePage";
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";

interface SearchResult {
    productName: string;
    price: any;
    addToCartLocator: Locator;
}

export default class HomePage extends BasePage{

    constructor(page:Page, log:ICreateAttachment) {
        
        super(page, log)
    }

    
    
    async searchForProduct(str:string) {
        
        await this.page.fill(homePageLoc.searchBox.locator, str);
        await this.page.keyboard.press('Enter');
        
    }

    async getSubtotalPrice() {
        
        await this.page.waitForSelector(homePageLoc.subtotalValueOnSearch.locator);
        const sub = await this.page.locator(homePageLoc.subtotalValueOnSearch.locator).innerText();
        const price = parseFloat(sub.replace('$', '').replace(',', ''));
        console.log("Subtotal price: ", price);

        return price;
    }

    async goToCart() {
        
        await this.page.waitForSelector(homePageLoc.goToCartButton.locator);
        await this.page.locator(homePageLoc.goToCartButton.locator).click();
    }


    async getSearchResults(): Promise<SearchResult[]> {
        await this.page.waitForSelector(homePageLoc.searchResults.locator);
        const locators = this.page.locator(homePageLoc.searchResults.locator);
        const count = await locators.count()
        console.log("Found ", count , " search results.");

        const results: SearchResult[] = [];

        for (let i = 0; i < count; i++) {
            const productLocator = locators.nth(i);
            
            const productNameLocator = productLocator.locator(homePageLoc.productName.locator);
            const priceLocator = productLocator.locator(homePageLoc.productPrice.locator);
            const addToCartLocator = productLocator.locator(homePageLoc.addToCartButton.locator);

            // Check for the presence of each required locator
            const hasProductName = await productNameLocator.count() > 0;
            const hasPrice = await priceLocator.count() > 0;
            const hasAddToCart = await addToCartLocator.count() > 0;

            if (hasProductName && hasPrice && hasAddToCart) {
                const productName = await productNameLocator.innerText();
                const priceText = await priceLocator.innerText();
                const addToCartLocator = productLocator.locator(homePageLoc.addToCartButton.locator);

            // Convert price text to number
            const price = parseFloat(priceText.replace('$', '').replace(',', ''));

            results.push({
                productName,
                price,
                addToCartLocator
            });
        }
    }
    if (results.length > 0) {
        console.log("Available products: ", results.length)
        for (let i = 0; i < results.length; i++) {
            console.log(`${i + 1}. ${results[i].productName} - $${results[i].price}`);
        }
    } else {
        console.log("No valid search results found.");
    }
        return results;
    }


    async findAndAddCheapestProduct(productNameToMatch: string) {
        const results = await this.getSearchResults();
        let cheapestProduct: { locator: Locator, price: number } | null = null;
    
        for (const result of results) {
            // Check if the product name matches the specified name
            if (result.productName.toLowerCase().includes(productNameToMatch.toLowerCase())) {
                const price = result.price;
    
                if (cheapestProduct === null || price < cheapestProduct.price) {
                    cheapestProduct = { locator: result.addToCartLocator, price };
                }
            }
        }
    
        if (cheapestProduct) {
            console.log(`Cheapest matching product found at $${cheapestProduct.price}`);
            await cheapestProduct.locator.click();
            console.log('Added to cart successfully.');
        } else {
            console.log(`No suitable product found for "${productNameToMatch}".`);
        }

        return cheapestProduct?.price;
    }

    async sortResults(){
        await this.page.waitForSelector(homePageLoc.searchResults.locator);
        await this.page.locator(homePageLoc.selectFoodCategory.locator).nth(0).click();

        await this.page.waitForSelector(homePageLoc.sortBy.locator);
        await this.page.locator(homePageLoc.expandSortSelector.locator).click();
        await this.page.locator(homePageLoc.sortPriceLowHigh.locator).click();
    }

}

