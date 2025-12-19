Feature: Membuat Konten
  As a registered user
  I want to be able to create new posts with text, categories, and images
  So that I can share information and projects with other users

  Background:
    Given I am logged in as a user
    And I am on "/dashboard/create-post"

  Scenario: Successfully creating a text-only post
    When I select the category "Project"
    And I enter "Ini adalah deskripsi proyek baru saya menggunakan Next.js" into the post description
    And I click the "Post" button
    Then I should see a success message "Post berhasil dibuat!"
    And The page should redirect to "/dashboard/home"

  Scenario: Successfully creating a post with an image
    When I select the category "Competition"
    And I enter "Info lomba hackathon nasional 2025" into the post description
    And I upload an image "test_image.png"
    Then I should see an image preview
    When I click the "Post" button
    Then I should see a success message "Post berhasil dibuat!"
    And The page should redirect to "/dashboard/home"

  Scenario: Failed to create post due to empty description
    When I select the category "All"
    And I leave the post description empty
    And I click the "Post" button
    Then I should see an error message "Deskripsi post tidak boleh kosong"
    And I should still be on "/dashboard/create-post"

  Scenario: Attempt to access create page while unauthenticated
    Given I am NOT logged in as a user
    When I try to access "/dashboard/create-post"
    Then The page should redirect to "/auth/login"