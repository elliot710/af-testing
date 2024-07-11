import { Page, Locator } from "playwright";
import { expect } from "playwright/test";
import * as cartPageLoc from "../locators/cartpageloc.json";
import * as signInPageLoc from "../locators/signinpageloc.json";
import BasePage from "./basePage";
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { getPage } from "../../corelib/corelib.spec";



export default class SignIn extends BasePage{

    constructor(page:Page, log:ICreateAttachment) {
        
        super(page, log)
    }


    async checkPageTitle(pageName: string): Promise<boolean> {
        try {
          await this.page.waitForSelector(cartPageLoc.cartPageHeader.locator);
          const titleText = await this.page.locator(cartPageLoc.cartPageHeader.locator).innerText();
          return titleText.includes(pageName);
        } catch (error) {
          console.error('Error checking page title:', error);
          return false;
        }
      }

      async proceedToCheckout() {
        await this.page.locator(cartPageLoc.proceedToCheckoutButton.locator).click();
        await this.page.waitForSelector(signInPageLoc.signInPageHeader.locator);
        return new SignIn(getPage(),this.log);
    }

}

