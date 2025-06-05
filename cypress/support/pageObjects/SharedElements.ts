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

 




};

export default SharedElements;