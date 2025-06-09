class SharedElements {
   getResetButton () {
        return cy.get('.oxd-button').contains('Reset')
    }
     getSearchButton () {
        return cy.get('.oxd-button').contains('Search')
    }
    getSaveButton () {
        return cy.get('.oxd-button').contains('Save')
    }
  
     getYesDeleteButton () {
        return cy.get('.oxd-button--label-danger').contains('Yes, Delete');
    }
     getDeleteSelectedButton () {
        return cy.get('.oxd-button').contains('Delete Selected');
    }

    getSuccessfullySavedToastMessage () {
        return cy.get('.oxd-text--toast-message',{ timeout: 5000 }).contains('Successfully Saved');
    }

    getSuccessfullyUpdatedToastMessage () {
        return cy.get('.oxd-text--toast-message',{ timeout: 5000 }).contains('Successfully Updated');
    }
    
    getSuccessfullyDeletedToastMessage () {
        return cy.get('.oxd-text--toast-message',{ timeout: 5000 }).contains('Successfully Deleted');
    }
    
     getNoRecordsFoundToastMessage () {
        return cy.get('.oxd-text--toast-message',{ timeout: 5000 }).contains('No Records Found');
    }

    getEditButton () {
        return cy.get('.oxd-icon.bi-pencil-fill')
    }

    getCharsExceedValidationMessage () {
        return cy.get('.oxd-text').contains('Should not exceed 70 characters')
    }

    getPhoneNumberValidationMessage () {
        return cy.get('.oxd-text').contains('Allows numbers and only + - / ( )')
    }

    getEmailValidationMessage () {
        return cy.get('.oxd-text').contains('Expected format: admin@example.com')
    }
 
 




};

export default SharedElements;