Feature: Edit Profile
  As a registered user
  I want to edit my profile information
  So that I can keep my account details up to date

  Background:
    Given I am logged in as a user
    And I am on "/dashboard/edit-profile"

  Scenario: Successfully update profile with valid information
    When I fill in "fullName" with "John Doe Updated"
    And I fill in "universitas" with "Universitas Maju"
    And I fill in "jurusan" with "Teknik Informatika"
    And I fill in "linkedinLink" with "https://linkedin.com/in/johnupdated"
    And I press "Simpan Perubahan"
    Then I should see "Profil berhasil diperbarui!"
    And I should be on "/dashboard/profile"

  Scenario: Update profile picture
    When I attach the file "profile_photo.jpg" to "profilePicture"
    And I press "Simpan Perubahan"
    Then I should see "Profil berhasil diperbarui!"
    And I should be on "/dashboard/profile"

  Scenario: Cancel profile editing
    When I fill in "fullName" with "Temporary Name"
    And I press "Batalkan"
    Then I should be on "/dashboard/profile"
    And I should see my original profile information

  Scenario: Update only specific fields
    When I fill in "fullName" with "Hanya Nama Saja"
    And I press "Simpan Perubahan"
    Then I should see "Profil berhasil diperbarui!"
    And I should be on "/dashboard/profile"

  Scenario: Fail to update with invalid LinkedIn URL format
    When I fill in "linkedinLink" with "linkedin-format-salah"
    And I press "Simpan Perubahan"
    Then I should see "URL LinkedIn tidak valid"

  Scenario: Upload invalid file format for profile picture
    When I attach the file "document.pdf" to "profilePicture"
    And I press "Simpan Perubahan"
    Then I should see "Invalid file"

