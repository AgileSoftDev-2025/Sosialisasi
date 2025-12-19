Feature: Create Comment
  As a registered user
  I want to leave comments on posts
  So that I can discuss topics with other users

  Background:
    Given I am logged in as a user
    And I am on "/dashboard"

  Scenario: Successfully create a new comment
    When I press the comment icon on the first post
    And I fill in the comment area with "Wah, infonya sangat bermanfaat kak! Terimakasih."
    And I press "Send"
    Then I should see "Wah, infonya sangat bermanfaat kak! Terimakasih."
    And I should see "Pilemon Barimbing Baru"
    
  Scenario: Comment button should be disabled when input is empty
    When I press the comment icon on the first post
    And I fill in the comment area with ""
    Then I should not see an active "Send" button