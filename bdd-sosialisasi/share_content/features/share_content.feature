Feature: Membagikan Konten
  As a registered user
  I want to be able to share content by copying its unique link
  So that I can easily distribute the content to others

  Background:
    Given I am logged in as a user
    And A content with ID "690cac004495e10c6b03c220" exists and is displayed

  Scenario: Successfully copy content link from the Home Page feed
    When I am on "/dashboard/home"
    And I press the "Share" button for content with ID "690cac004495e10c6b03c220"
    Then I should see "Link copied to clipboard!"
    And The clipboard content should be "{BASE_URL}/dashboard/post/690cac004495e10c6b03c220"

  Scenario: Successfully copy content link from the Single Post Page
    When I am on "/dashboard/post/690cac004495e10c6b03c220"
    And I press the "Share" button
    Then I should see "Link copied to clipboard!"
    And The clipboard content should be "{BASE_URL}/dashboard/post/690cac004495e10c6b03c220"
