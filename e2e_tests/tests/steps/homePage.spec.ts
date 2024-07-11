import { Given, When, Then} from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import {getPage} from "../../corelib/corelib.spec";
import HomePage from "../pages/homePage";
import * as homePageLoc from "../locators/homepageloc.json";
import * as signinPageLoc from "../locators/homepageloc.json";
import SignIn from "../pages/signIn";
import CartPage from "../pages/cartPage";

let homePage:HomePage;
let signIn:SignIn;
let cartPage:CartPage;

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
    const price = await homePage.findAndAddCheapestProduct(string);
    this.attach(`Added Snickers to cart with price: $${price}`);
    const subtotal = await homePage.getSubtotalPrice();
    expect(price).toBe(subtotal);
    await homePage.goToCart();

});

Then('The user is redirected to the registration',  async function () {
    cartPage = new CartPage(getPage(), this.attach);
    await cartPage.proceedToCheckout();

    signIn=new SignIn(getPage(), this.attach);
    const title = await signIn.getPageTitle();
    expect(title).toBe("sign in");
    this.attach(`Page title checked`);
});

When('User searches again for {string}', async function (string) {
    homePage=new HomePage(getPage(), this.attach);
    await homePage.searchForProduct(string);
    await homePage.sortResults();
    expect(await homePage.getSearchResults()).toBeTruthy(); //null check
});

Then('The product {string} is successfully found and added to the cart', async function (string) {
    homePage=new HomePage(getPage(), this.attach);
    const price = await homePage.findAndAddCheapestProduct(string);
    this.attach(`Added Snickers to cart with price: $${price}`);
    const subtotal = await homePage.getSubtotalPrice();
    expect(price).toBe(subtotal);
    await homePage.goToCart();  
});


Then('The user is redirected to the registration again',  async function () {

    cartPage = new CartPage(getPage(), this.attach);
    await cartPage.proceedToCheckout();

    signIn=new SignIn(getPage(), this.attach);
    const title = await signIn.getPageTitle();
    expect(title).toBe("Create account");
    this.attach(`fail test intentionally`);
    /*maybe it was a spelling mistake in the email
    but user is technically redirected to 
    [Sign in] page, not [Registration]*/
});
