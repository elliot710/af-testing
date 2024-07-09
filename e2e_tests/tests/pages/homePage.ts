import { Page, Locator } from "playwright";
import { expect } from "playwright/test";
import * as homePageLoc from "../locators/homepageloc.json";

import BasePage from "./basePage";
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class HomePage extends BasePage{

    constructor(page:Page, log:ICreateAttachment) {
        
        super(page, log)
    }
    
    async searchForProduct(str:string) {
        
        await this.page.fill(homePageLoc.searchBox.locator, str);
        await this.page.keyboard.press('Enter');
        
    }

    async getSearchResults(){
        await this.page.waitForSelector(homePageLoc.searchResults.locator);
        const locators = this.page.locator(homePageLoc.searchResults.locator);
        const count = await locators.count()
        console.log("Found ", count , " search results.");

        // Create an array to store all result locators
        const resultLocators: Locator[] = [];

        for (let i = 0; i < count; i++) {
            resultLocators.push(locators.nth(i));
        }

        return resultLocators;
    }

    async sortResults(){
        await this.page.waitForSelector(homePageLoc.searchResults.locator);
        await this.page.locator(homePageLoc.selectFoodCategory.locator).click();

        await this.page.waitForSelector(homePageLoc.sortBy.locator);
        await this.page.locator(homePageLoc.expandSortSelector.locator).click();
        await this.page.locator(homePageLoc.sortPriceLowHigh.locator).click();
    }

    
    async convertStringToInt(str: string) {
        let num: number = parseInt(str);
        return num;
      }
}

