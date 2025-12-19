Feature: Delete Post
  As a post owner
  I want to delete my own post
  So that I can remove content I no longer want to show

  Background:
    Given I am logged in as "barimbingpilemon@gmail.com"

  Scenario: Successfully delete a post from profile page
    Given I am on "/dashboard/profile"
    And I have at least one post on my profile
    When I click the options menu (three dots) on the first post
    And I press the "Hapus" button
    Then the post should be removed from the list

    