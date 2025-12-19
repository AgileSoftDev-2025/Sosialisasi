Feature: View Content
  As a registered user
  I want to view the home page
  So that I can see the latest posts and updates

  Background:
    Given I am logged in as a user

  Scenario: Successfully view posts and sidebars on the dashboard
    When I navigate to the dashboard
    Then I should see the topic filters like "Sistem Informasi"
    And I should see the "Koneksi Untukmu" sidebar
    And I should see the "Postingan Terhangat" sidebar
    And I should see the post feed content