import {setDefaultTimeout, Before, After} from "@cucumber/cucumber";
import {Browser, BrowserContext, chromium, Page} from "playwright";

//globals
setDefaultTimeout(60 * 1000 * 3);

//init browser context
let browser:Browser;
let bCtx:BrowserContext;
let page:Page;

Before(async function () {
    browser = await chromium.launch({headless:false, channel:"chrome", args:["--start-maximized"]});
    bCtx = await browser.newContext({viewport:null, javaScriptEnabled:true});
    page = await bCtx.newPage();
    });

After(async function () {
    await page.close();
    await bCtx.close();
    await browser.close();
    });


//export hooks
export function getPage():Page{
    return page;
}