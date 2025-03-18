Feature: Login

  @valid
  Scenario: Successful login
    Given I open the login page
    When I login with username "testeur_integration" and password "testeur_qa"
    Then I should be redirected to the dashboard


