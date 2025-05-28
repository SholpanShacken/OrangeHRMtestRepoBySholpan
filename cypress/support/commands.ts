
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