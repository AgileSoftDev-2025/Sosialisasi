Feature: Receive Message
  As a registered user
  I want to read messages sent by others
  So that I can see incoming communications

  Scenario: Successfully receive and view a new message
    Given "Pilemon Barimbing Baru" sends me a message "Halo, ini tes pesan masuk otomatis"
    Given I am logged in as "pebemarolop@gmail.com"
    When I am on "/dashboard/messages"
    And I select the conversation with "Pilemon Barimbing Baru"
    Then I should see "Halo, ini tes pesan masuk otomatis"