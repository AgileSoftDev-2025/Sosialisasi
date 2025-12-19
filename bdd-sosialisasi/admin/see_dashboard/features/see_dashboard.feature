@admin @dashboard
Feature: Melihat Dashboard Admin
  As an administrator
  I want to see an overview of user statistics and content metrics
  So that I can monitor the platform's growth and activity

  Background:
    Given I am logged in as an administrator

  Scenario: Admin successfully views the dashboard metrics
    When I am on "/admin/dashboard"
    # Validasi Header
    Then I should see "Dashboard Admin"
    And I should see "Selamat datang di panel admin SosialisaSI!"

    And I should see "TOTAL PENGGUNA"
    And I should see "Mahasiswa:"
    And I should see "Dosen:"

    And I should see "PENGGUNA AKTIF"
    And I should see "dari total pengguna"

    And I should see "TOTAL KONTEN"
    And I should see "KONTEN COMPETITION"
    And I should see "KONTEN PROJECT"
    
    And I should see "Telah disetujui"