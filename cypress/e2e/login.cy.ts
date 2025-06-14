// cypress/e2e/login.cy.ts

/// <reference types="cypress" />

import LoginPage from '../support/pageObjects/LoginPage';

describe('OrangeHRM Login Page Tests', () => {
  const loginPage = new LoginPage();

  // Before each test, visit the login page
  beforeEach(() => {
    loginPage.visit();
  });

  it('should allow a user to log in with valid credentials using custom command', () => {
    // Load the 'validUser' data from users.json fixture
    cy.fixture('users').then((users) => {
      // Use the data from the fixture
      cy.createLogin(users.validUser.username, users.validUser.password);
    });

    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });

  it('should display an error for invalid credentials using Page Object', () => {
    // Load the 'invalidUser' data from users.json fixture
    cy.fixture('users').then((users) => {
      // Use the data from the fixture with LoginPage's login method
      loginPage.login(users.invalidUser.username, users.invalidUser.password);
    });

    loginPage.getInvalidCredentialsErrorMessage().should('be.visible').and('contain.text', 'Invalid credentials');
  });

  it('should display required error messages for empty fields', () => {
    // This test doesn't use user data, so it remains unchanged
    loginPage.getLoginButton().click();
    loginPage.getRequiredErrorMessage('username').should('be.visible');
    loginPage.getRequiredErrorMessage('password').should('be.visible');
  });
});