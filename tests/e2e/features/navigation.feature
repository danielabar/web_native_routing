Feature: Web Native Routing Navigation
  As a user navigating the website
  I want seamless routing between pages
  So that I can access all content and functionality

  Scenario: Sequential navigation through all pages
    Given I visit the home page
    Then I should see "Welcome to Web Native Routing"
    And the URL should be "/"
    When I click the "About" navigation link
    Then I should see "About This Project"
    And the URL should be "/about"
    When I click the "Contact" navigation link
    Then I should see "Get In Touch"
    And the URL should be "/contact"
    When I interact with the contact form
    Then the contact form should be functional
