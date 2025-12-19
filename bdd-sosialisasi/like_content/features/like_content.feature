Feature: Like/Unlike Konten
  As a registered user
  I want to be able to like and unlike content
  So that I can show my appreciation and engagement with the posts in the feed

  Background:
    Given A content with ID "690cac004495e10c6b03c220" exists and is displayed
    Given I am logged in as a user
    When I am on "/dashboard/home"

  Scenario: Successfully liking content
    And I check the initial like count for "690cac004495e10c6b03c220"
    When I click the heart icon for content with ID "690cac004495e10c6b03c220"
    Then The heart icon for "690cac004495e10c6b03c220" should be "red" and "solid"
    And The like count for "690cac004495e10c6b03c220" should be increased by 1

  Scenario: Successfully unliking content 
    When I click the heart icon for content with ID "690cac004495e10c6b03c220"
    Then The heart icon for "690cac004495e10c6b03c220" should be "red" and "solid"
    
    And I check the initial like count for "690cac004495e10c6b03c220"
    When I click the heart icon for content with ID "690cac004495e10c6b03c220"
    Then The heart icon for "690cac004495e10c6b03c220" should be "regular" and "grey"
    And The like count for "690cac004495e10c6b03c220" should be decreased by 1

  Scenario: Attempt to like content while unauthenticated
    Given I am NOT logged in as a user
    When I am on "/dashboard"
    And I check the initial like count for "690cac004495e10c6b03c220"
    When I attempt to click the heart icon for content with ID "690cac004495e10c6b03c220"
    Then The page should redirect to "/auth/login"
    And The like count for "690cac004495e10c6b03c220" should remain 0