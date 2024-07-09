import { Given, When, Then} from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import {getPage} from "../../corelib/corelib.spec";
import HomePage from "../pages/homePage";

let homePage:HomePage;


Given('User is on home page', async function () {
    this.attach(`User is on home page....!`);
    homePage=new HomePage(getPage(), this.attach);
});

When('User searches for {string}', async function (string) {
    homePage=new HomePage(getPage(), this.attach);
    await homePage.searchForProduct(string);
    await homePage.sortResults();
    expect(await homePage.getSearchResults()).toBeTruthy(); //null check
    
});

Then('The product {string} is found and added to the cart', async function (string) {
    homePage=new HomePage(getPage(), this.attach);


});

When('User searches again for {string}', async function (string) {
    
});

Then('The product {string} is successfully found and added to the cart', async function (string) {
    
});

Then('The products are displayed in the basket', async () => {
    
});

Then('Fail last step intentionally',  async function () {
    expect(1).toBe(2);
});
