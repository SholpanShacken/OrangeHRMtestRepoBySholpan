
/// <reference types="cypress" />
import LoginPage from '../support/pageObjects/LoginPage';
const loginPage = new LoginPage();

Cypress.Commands.add('createLogin', (username = 'Admin', password = 'admin123') => {
  loginPage.visit();
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('selectRandomDropdownItem', (dropdownSelector: string) => {
  cy.get(dropdownSelector).then($items => {
    if ($items.length === 0) {
      throw new Error(`No items found for selector: ${dropdownSelector}`);
    }
    const randomIndex = Math.floor(Math.random() * $items.length);
    cy.wrap($items[randomIndex]).click();
  });
});
