Feature: Search and Purchase on Amazon
  As a new Amazon user,
  I want to search for the cheapest Snickers and Skittles on the page,
  So that I can add them to my basket and check the basket total,
  And be redirected to the registration page on checkout without an account.

Scenario: To search for products on homepage
    Given User is on home page
    When User searches for a product
    Then The product is found successfully
    And The product is displayed