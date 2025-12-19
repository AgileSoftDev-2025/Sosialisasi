Feature: Account Login
  As an existing user,
  I want to log in to my account on the Sosialisasi application,
  So that I can access my dashboard.

  Scenario: Login with valid credentials
    Given I am on the login page "http://localhost:3000/auth/login"
    When I fill in "email" with "barimbingpilemon@gmail.com"
    And I fill in "password" with "Password123*"
    And I press "Login"
    Then I should be on "/dashboard/home"

  Scenario: Fail to login with incorrect password
    Given I am on the login page "http://localhost:3000/auth/login"
    When I fill in "email" with "barimbingpilemon@gmail.com"
    And I fill in "password" with "PasswordSalah123*"
    And I press "Login"
    Then I should see "Email or password incorrect"

  Scenario: Fail to login with unregistered email
    Given I am on the login page "http://localhost:3000/auth/login"
    When I fill in "email" with "budi@gmail.com"
    And I fill in "password" with "Password123*"
    And I press "Login"
    Then I should see "Email or password incorrect"

  Scenario: Fail to login because email format is invalid
    Given I am on the login page "http://localhost:3000/auth/login"
    When I fill in "email" with "barimbingpilemon"
    And I fill in "password" with "Password123*"
    And I press "Login"
    Then I should see "Email format not valid"