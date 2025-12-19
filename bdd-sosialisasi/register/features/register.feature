Feature: Account Registration
  As a new user,
  I want to register an account on the Sosialisasi application,
  So that I can log in and use its features.

  Scenario: Register account with valid data
    Given I am on "http://localhost:3000/auth/register"
    When I fill in "fullName" with "Pilemon Barimbing"
    And I fill in "email" with "pilemon.barimbing-2023@fst.unair.ac.id"
    And I select "Mahasiswa" from "status"
    And I fill in "password" with "Password123*"
    And I fill in "confirmPassword" with "Password123*"
    And I press "Next"
    Then I should see "Lengkapi Data Diri"
    When I attach the file "profilePicture.jpeg" to "profilePicture"
    And I fill in "jurusan" with "Sistem Informasi"
    And I fill in "universitas" with "Universitas Airlangga"
    And I fill in "linkedinLink" with "https://www.linkedin.com/in/pilemon-barimbing"
    And I press "Register"
    Then I should see "Register Success! Please check your email for activation."
    And I should be on "/auth/login"

  Scenario: Fail to register because full name is empty
    Given I am on "http://localhost:3000/auth/register"
    When I fill in "email" with "pilemon.barimbing-2023@fst.unair.ac.id"
    And I select "Mahasiswa" from "status"
    And I fill in "password" with "Password123*"
    And I fill in "confirmPassword" with "Password123*"
    And I press "Next"
    Then I should see "Please input your fullname"

  Scenario: Fail to register because email is already registered
    Given I am on "http://localhost:3000/auth/register"
    When I fill in "fullName" with "Pilemon Barimbing"
    And I fill in "email" with "barimbingpilemon@gmail.com"
    And I select "Dosen" from "status"
    And I fill in "password" with "Password123*"
    And I fill in "confirmPassword" with "Password123*"
    And I press "Next"
    Then I should see "Lengkapi Data Diri"
    When I attach the file "profilePicture.jpeg" to "profilePicture"
    And I fill in "jurusan" with "Teknik Komputer"
    And I fill in "universitas" with "Institut Teknologi Sepuluh Nopember"
    And I fill in "linkedinLink" with "https://www.linkedin.com/in/pilemon-barimbing"
    And I press "Register"
    Then I should see "Email sudah terdaftar"

  Scenario Outline: Fail to register due to invalid password format
    Given I am on "http://localhost:3000/auth/register"
    When I fill in "fullName" with "Pilemon Barimbing"
    And I fill in "email" with "pilemon.barimbing-2023@fst.unair.ac.id"
    And I select "Mahasiswa" from "status"
    And I fill in "password" with "123456"
    And I fill in "confirmPassword" with "123456"
    And I press "Next"
    Then I should see "<error_message>"

  Scenario: Fail to register because major/jurusan is empty
    Given I am on "http://localhost:3000/auth/register"
    When I fill in "fullName" with "Pilemon Barimbing"
    And I fill in "email" with "pilemon.barimbing-2023@fst.unair.ac.id"
    And I select "Mahasiswa" from "status"
    And I fill in "password" with "Password123*"
    And I fill in "confirmPassword" with "Password123*"
    And I press "Next"
    Then I should see "Lengkapi Data Diri"
    When I attach the file "profilePicture.jpeg" to "profilePicture"
    And I fill in "universitas" with "Universitas Airlangga"
    And I fill in "linkedinLink" with "https://www.linkedin.com/in/pilemon-barimbing"
    And I press "Register"
    Then I should see "Please input your major study"