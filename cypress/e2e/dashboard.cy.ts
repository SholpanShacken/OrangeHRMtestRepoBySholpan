
/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" /> // Ensure this line points to your .d.ts file

import LoginPage from '../support/pageObjects/LoginPage';

describe('Dashboard Page Content Check', () => {
  let users: UsersFixture; // <-- ADD THE TYPE ANNOTATION HERE

  before(() => {
    cy.fixture('users').then((loadedUsers: UsersFixture) => { // <-- OPTIONAL: Add type here too for clarity
      users = loadedUsers;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
    cy.createLogin(users.validUser.username, users.validUser.password);
    cy.url().should('include', '/dashboard/index');
    cy.contains('Dashboard').should('be.visible');
  });

  it('should verify the presence of the "Time at Work" widget', () => {
    cy.contains('p.oxd-text.oxd-text--p[data-v-7b563373]', 'Time at Work').should('be.visible');
  });

  it('should verify the presence of the "My Actions" widget', () => {
    cy.contains('p.oxd-text.oxd-text--p[data-v-7b563373]', 'My Actions').should('be.visible');
  });

  it('should verify the presence of the "Quick Launch" widget', () => {
    cy.contains('p.oxd-text.oxd-text--p[data-v-7b563373]', 'Quick Launch').should('be.visible');
  });

    it('should verify the presence of the "Buzz Latest Posts" widget', () => {
    cy.contains('p.oxd-text.oxd-text--p[data-v-7b563373]', 'Buzz Latest Posts').should('be.visible');
  });

  it('should verify the presence of the "Employees on Leave Today" widget', () => {
    cy.contains('p.oxd-text.oxd-text--p[data-v-7b563373]', 'Employees on Leave Today').should('be.visible');
  });

  it('should verify the presence of the "Employee Distribution by Sub Unit" widget', () => {
    cy.contains('p.oxd-text.oxd-text--p[data-v-7b563373]', 'Employee Distribution by Sub Unit').should('be.visible');
  });
  
   it('should verify the presence of the sidebar', () => {
    cy.get('aside[data-v-5b6b3cf3]').should('be.visible');
  });

   it('should verify the presence of the Search bar on the sidepanel', () => {
    cy.get('input[data-v-1f99f73c]').should('be.visible');
  });

   it('should verify the presence of the Admin tab on the sidepanel', () => {
    cy.contains('span[data-v-7b563373]', 'Admin').should('be.visible');
  });

  it('should verify the presence of the PIM tab on the sidepanel', () => {
     cy.contains('span[data-v-7b563373]', 'PIM').should('be.visible');
  });

  it('should verify the presence of the Leave tab on the sidepanel', () => {
     cy.contains('span[data-v-7b563373]', 'Leave').should('be.visible');
  });

  it('should verify the presence of the Time tab on the sidepanel', () => {
     cy.contains('span[data-v-7b563373]', 'Time').should('be.visible');
  });

  it('should verify the presence of the Recruitment tab on the sidepanel', () => {
     cy.contains('span[data-v-7b563373]', 'Recruitment').should('be.visible');
  });

  it('should verify the presence of the My Info tab on the sidepanel', () => {
     cy.contains('span[data-v-7b563373]', 'My Info').should('be.visible');
  });

  it('should verify the presence of the Performance tab on the sidepanel', () => {
     cy.contains('span[data-v-7b563373]', 'Performance').should('be.visible');
  });

  it('should verify the presence of the Dashboard tab on the sidepanel', () => {
     cy.contains('span[data-v-7b563373]', 'Dashboard').should('be.visible');
  });

  it('should verify the presence of the Directory tab on the sidepanel', () => {
     cy.contains('span[data-v-7b563373]', 'Directory').should('be.visible');
  });

  it('should verify the presence of the Maintenance tab on the sidepanel', () => {
     cy.contains('span[data-v-7b563373]', 'Maintenance').should('be.visible');
  });

  it('should verify the presence of the Claim tab on the sidepanel', () => {
     cy.contains('span[data-v-7b563373]', 'Claim').should('be.visible');
  });

  it('should verify the presence of the Buzz tab on the sidepanel', () => {
     cy.contains('span[data-v-7b563373]', 'Buzz').should('be.visible');
  });



















});