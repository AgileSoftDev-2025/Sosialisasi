@admin @content
Feature: Mengelola Konten Komunitas
  As an admin
  I want to filter and view community content
  So that I can moderate posts effectively

  Background:
    Given I am logged in as an administrator

  Scenario: Admin views the content list successfully
    When I am on "/admin/content-management"
    Then I should see "Kelola Konten"
    And I should see "Daftar Konten"
    And I should see "Konten" in the table header
    And I should see "Penulis" in the table header
    And I should see "Aksi" in the table header

  Scenario: Admin filters content by Category
    When I am on "/admin/content-management"
    And I select "Competition" from "kategori-filter"
    Then I should see "Competition" in the content table
    And I should not see "Project" in the content column

  Scenario: Admin filters content by Date Range
    When I am on "/admin/content-management"
    And I set the date "startDate-filter" to "2023-01-01"
    And I set the date "endDate-filter" to "2025-12-31"
    Then I should see "konten ditemukan"

  Scenario: Admin checks pagination
    When I am on "/admin/content-management"
    Then I should see "Menampilkan"
    And I should see button "1"
    And I should see button "→"