import { generateRandomString } from '../utils/dataGenerator';

class AddUserPage {
    url ='/web/index.php/admin/saveSystemUser';
   
    getAddUserContainer() {
        return cy.get('.oxd-text.oxd-text--h6.orangehrm-main-title').contains ('Add User');

    }

    getStatusSelectArrow() {
        return cy.contains('.oxd-label', 'Status')
        .parents('.oxd-input-group')
        .find('.oxd-icon');
    } 
    

    getUserRoleSelectArrow() {
        return cy.contains('.oxd-label','User Role')
        .parents('.oxd-input-group')
        .find('.oxd-icon');
    } 

    getEmployeeNameAutocomplete() {
        return cy.get('.oxd-autocomplete-text-input');
    } 

    getUserNameInput() {
        return cy.contains('.oxd-label','Username')
        .parents('.oxd-input-group')
        .find('.oxd-input');
    } 

    getPasswordInput() {
        return cy.contains('.oxd-label', 'Password')
        .parents('.oxd-input-group')
        .find('.oxd-input');
    } 

    getConfirmPasswordInput() {
        return cy.contains('.oxd-label', 'Confirm Password')
        .parents('.oxd-input-group')
        .find('.oxd-input');
    } 

    getSaveButton () {
        return cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').contains('Save');
    }

     getCancelButton () {
        return cy.get('.oxd-button.oxd-button--medium.oxd-button--ghost').contains('Save');
    }

    visit () {
        cy.visit(this.url);
    }

    fillBasicUserFormAndReturnUsername(): Cypress.Chainable<string> {
    const randomUsername = `TestUser#${generateRandomString(5)}`;

    this.getUserRoleSelectArrow().click();
    cy.contains('ESS').click();
    this.getStatusSelectArrow().click();
    cy.contains('Enabled').click();
    this.getEmployeeNameAutocomplete().click().type('a');
    cy.wait(1000);
    cy.get('.oxd-autocomplete-dropdown').first().click();

    this.getUserNameInput().click().type(randomUsername);

    return cy.wrap(randomUsername); // wrap the value to use in Cypress chain
  }

 
};



export default AddUserPage;
