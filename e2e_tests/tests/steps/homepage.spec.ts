import {Given, When, Then} from "@cucumber/cucumber";
import {expect} from "playwright/test";
import {getPage} from "../../corelib/corelib.spec";


//I didn't really get if the goal was to test the condition or to write a fully fledged framework


let price = 0;

function convertStringToInt(str: string) {
  let num: number = parseInt(str);
  return num;
}


//it sucks, you know it and I know it
//but it's made to work, not to be pretty

Given('User is on home page', async function () {
  await getPage().goto("https://amazon.com");
  await getPage().waitForTimeout(5000);
  });



When('User searches for Snickers', async function () {
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


Then('The product Snickers is found and added to the cart', async function () {
  expect(await getPage().locator("xpath=(//button[@class='a-button-text'])[1]")).toContainText("Add to cart");
  //TODO fix this
  let snickers = await getPage().locator("xpath=(//span[@class='a-price-whole'])[3]").innerText();
  
  price =+ convertStringToInt(snickers);
  console.log("Snickers price is " + price)
  await getPage().locator("xpath=(//button[@class='a-button-text'])[1]").dblclick();
  await getPage().waitForTimeout(5000);
  });


Then('User searches for Skittles', async function () {
  await getPage().locator("xpath=//input[@id='twotabsearchtextbox']").fill("Skittles");
  await getPage().locator("xpath=//input[@id='nav-search-submit-button']").click();

  //wait for sort_by_price_dropdown to be visible and actionable
  await getPage().waitForSelector("xpath=//span[text()='Sort by:']");
  expect(await getPage().locator("xpath=//span[text()='Sort by:']")).toBeVisible;

  //select food category so the displayed results are actually food
  
  await getPage().locator("xpath=(//a[@data-routing='off']//span)[1]").click();
  await getPage().locator("xpath=//span[@id='a-autoid-0']").click();
  await getPage().locator("xpath=//a[@id='s-result-sort-select_1']").click();
  
  });

Then('The product Skittles is found and added to the cart', async function () {
  expect(await getPage().locator("xpath=(//button[@class='a-button-text'])[1]")).toContainText("Add to cart");
  //TODO update price
  let skittles = await getPage().locator("xpath=(//span[@class='a-price-whole'])[3]").innerText();

  console.log("Skittles price is " + convertStringToInt(skittles))
  price = price + convertStringToInt(skittles)+ 1;
  console.log("Combined price is " + price)
  await getPage().locator("xpath=(//button[@class='a-button-text'])[1]").click();
  await getPage().waitForTimeout(5000);
  });

Then('The products are displayed in the basket', async function () {
  await getPage().locator("xpath=//a[@id='nav-cart']").click();
  await getPage().waitForTimeout(5000);
  //check if price is correct
  let cartPrice = await getPage().locator("xpath=(//span[contains(@class,'a-color-price sc-price-container')]//span)[2]").innerText();
  let result = convertStringToInt(cartPrice.substring(1, 3));
  console.log("Cart price is " + result)
  //is item price equal to checkout price?
  expect(result).toEqual(price);

  await getPage().locator("xpath=(//input[@name='proceedToRetailCheckout'])").click();

  expect(await getPage().locator("xpath=//h1[@class='a-spacing-small']").innerText()).toContain("Sign in");
  

  });

  //now let's have fun with something real