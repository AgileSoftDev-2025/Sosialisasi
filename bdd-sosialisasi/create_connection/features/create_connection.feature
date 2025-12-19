Feature: Send Connection Request
  As a registered user
  I want to connect with other users
  So that I can expand my network

  Background:
    Given I am logged in as a user

  Scenario: Successfully send connection request from Feed
    Given I am on the dashboard
    When I click on a user's name in the post feed
    And I wait for the profile page to load
    And I press the "Berkoneksi" button
    Then I should see the button change to "Batalkan"