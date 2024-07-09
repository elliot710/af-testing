import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { Page } from "playwright";

export default class BasePage {

    protected page: Page;
    protected log:ICreateAttachment;

    constructor(page: Page, log:ICreateAttachment) {
        this.page = page;
        this.log=log;
    }
 
}
