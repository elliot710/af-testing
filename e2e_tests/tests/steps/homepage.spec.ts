import {Given, When, Then} from "@cucumber/cucumber";
import {expect} from "playwright/test";
import {getPage} from "./basepage.spec";


Given('User is on home page', {timeout: 2 * 5000}, async function () {
  await getPage().goto("https://amazon.com");
  });



When('User searches for a product', async function () {
  await getPage().locator("xpath=//input[@id='twotabsearchtextbox']").fill("Snickers");
  await getPage().locator("xpath=//input[@id='nav-search-submit-button']").click();

  //wait for sort_by_price_dropdown to be visible and actionable
  await getPage().waitForSelector("xpath=//span[text()='Sort by:']");
  expect(await getPage().locator("xpath=//span[text()='Sort by:']")).toBeVisible;

  //select food category so the displayed results are actually food
  
  await getPage().locator("xpath=//span[text()='Grocery & Gourmet Food']").click();
  await getPage().locator("xpath=//span[@id='a-autoid-0']").click();
  await getPage().locator("xpath=//a[@id='s-result-sort-select_1']").click();
  
  });

  

Then('The product is found successfully', async function () {
    //expect(await getPage().locator("xpath=//span[@class='a-size-base-plus a-color-base']").first()).toContainText("Snickers");
    //expect(await getPage().locator("xpath=div[@data-cel-widget='search_result_1']")).toBeVisible();
    //expect(await getPage().locator("xpath=a[@id='a-autoid-1-announce']")).toBeVisible();
    expect(await getPage().locator("xpath=(//button[@class='a-button-text'])[1]")).toContainText("Add to cart");
    

  });



Then('The product is displayed', async function () {
  
  await getPage().locator("xpath=(//button[@class='a-button-text'])[1]").click();
  
//button[@class='a-button-text']
  });