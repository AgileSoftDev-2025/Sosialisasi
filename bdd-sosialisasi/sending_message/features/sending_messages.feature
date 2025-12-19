Feature: Send Message
  As a registered user
  I want to send messages to other users
  So that I can communicate privately

  Background:
    Given I am logged in as "barimbingpilemon@gmail.com"

  Scenario: Successfully send a message to an existing conversation
    Given I am on "/dashboard/messages"
    When I select the conversation with "Pilemon Unair"
    And I type "Halo, apa kabar?" into the message input
    And I press the send button
    Then I should see "Halo, apa kabar?" in the chat history