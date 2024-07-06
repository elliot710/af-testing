import { Page } from "playwright";
import { Expect } from "playwright/test";

export default class HomePage{

    page:Page;

    constructor(page:Page){
        this.page = page;
    }

    
}