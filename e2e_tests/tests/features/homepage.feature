Feature: Search and Purchase on Amazon
  As a new Amazon user,
  I want to search for the cheapest Snickers and Skittles on the page,
  So that I can add them to my basket and check the basket total,
  And be redirected to the registration page on checkout without an account.

Scenario: To search for products on homepage
    Given User is on home page
    When User searches for Snickers
    Then The product Snickers is found and added to the cart
    When User searches for Skittles
    Then The product Skittles is found and added to the cart
    And The products are displayed in the basket