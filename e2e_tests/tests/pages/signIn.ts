import { Page, Locator } from "playwright";
import { expect } from "playwright/test";
import * as signinpageloc from "../locators/signinpageloc.json";

import BasePage from "./basePage";
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";



export default class SignIn extends BasePage{

    constructor(page:Page, log:ICreateAttachment) {
        
        super(page, log)
    }


    async checkPageTitle(pageName: string): Promise<boolean> {
        try {
          await this.page.waitForSelector(signinpageloc.signInPageHeader.locator);
          const titleText = await this.page.locator(signinpageloc.signInPageHeader.locator).innerText();
          expect(titleText).toContain(pageName);
          console.log('Page Title:', titleText);
          return titleText.includes(pageName);
        } catch (error) {
          console.error('Error checking page title:', error);
          return false;
        }
      }

}

