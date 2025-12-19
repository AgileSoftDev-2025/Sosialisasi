Feature: Manage Connections
  As a registered user
  I want to connect with other users
  So that I can expand my professional network

  # ... (Scenario 1 & 2 Pengirim tetap ada di atas) ...

  # Scenario 3: Menerima permintaan koneksi (Login sebagai Pilemon Unair)
  Scenario: Accept incoming connection request
    Given I am logged in as the receiver user
    Given I am on "/dashboard/notification"
    When I press the "Accept" button on the first request
    Then I should see a success message "Permintaan koneksi berhasil diterima"
