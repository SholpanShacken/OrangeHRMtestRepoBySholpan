import { generateRandomString } from '../utils/dataGenerator';

class AddUserPage {
    url ='/web/index.php/admin/saveSystemUser';
   
    getAddUserContainer() {
        return cy.get('.oxd-text.oxd-text--h6.orangehrm-main-title').contains ('Add User');

    }

    getStatusSelectDropdown() {
        return cy.contains('.oxd-label', 'Status')
        .parents('.oxd-input-group')
        .find('.oxd-icon');
    } 
    

    getUserRoleSelectDropdown() {
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
        return cy.get('.oxd-button.oxd-button--medium.oxd-button--ghost').contains('Cancel');
    }

    visit () {
        cy.visit(this.url);
    }

    fillBasicUserForm(): Cypress.Chainable<{
        user:string;
        password:string;
    }> {
    const randomUsername = generateRandomString(5);
    const randomPassword = generateRandomString(7);

    this.getUserRoleSelectDropdown().click();
    cy.contains('ESS').click();
    this.getStatusSelectDropdown().click();
    cy.contains('Enabled').click();
    this.getEmployeeNameAutocomplete().type("a");
    cy.wait(5000);
    cy.get('.oxd-autocomplete-dropdown').should('be.visible').first().click();
    this.getUserNameInput().click().type(randomUsername);
    this.getPasswordInput().click().type(randomPassword);
    this.getConfirmPasswordInput().click().type(randomPassword);
    this.getSaveButton().click();


    return cy.wrap({
        user:randomUsername,
        password: randomPassword
    }); 
  }

 
};



export default AddUserPage;
