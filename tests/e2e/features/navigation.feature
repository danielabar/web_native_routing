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

  Scenario Outline: Direct page access
    When I visit the "<page>" page directly
    Then I should see "<expectedContent>"
    And the URL should be "<url>"

    Examples:
      | page    | expectedContent             | url      |
      | home    | Welcome to Web Native Routing | /        |
      | about   | About This Project          | /about   |
      | contact | Get In Touch                | /contact |

  Scenario: Browser navigation controls
    Given I visit the home page
    When I click the "About" navigation link
    And the URL should be "/about"
    And I click the "Contact" navigation link
    And the URL should be "/contact"
    When I use browser back
    Then I should see "About This Project"
    And the URL should be "/about"
    When I use browser back
    Then I should see "Welcome to Web Native Routing"
    And the URL should be "/"
    When I use browser forward
    Then I should see "About This Project"
    And the URL should be "/about"
    # When I check the router debug information
