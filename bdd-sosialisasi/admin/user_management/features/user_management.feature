@admin @users
Feature: Manajemen Pengguna Komunitas
  As an admin
  I want to manage users (students and lecturers)
  So that I can moderate access and monitor user base

  Background:
    Given I am logged in as an administrator

  Scenario: Admin views the user list
    When I am on "/admin/user-management"
    Then I should see "Kelola Pengguna"
    And I should see "Daftar Pengguna"
    And I should see "Universitas" in the table header
    And I should see "Status" in the table header
    And I should see "Aksi (Aktif/Nonaktif)" in the table header

  Scenario: Admin filters users by Status (Role)
    When I am on "/admin/user-management"
    And I select "Mahasiswa" from "status-filter"
    Then I should see "Mahasiswa" in the user table
    And I should not see "Dosen" in the status column

  Scenario: Admin filters users by Active Status
    When I am on "/admin/user-management"
    And I select "true" from "isActive-filter"
    Then I should see "Aktif" in the user table option

  Scenario: Admin toggles user active status
    When I am on "/admin/user-management"
    And I toggle the status switch for "Pilemon Unair"
    Then I should see "Status Pilemon Unair diubah!"