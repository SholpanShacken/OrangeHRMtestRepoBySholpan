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
        return cy.get('.oxd-text--toast-message').contains('Successfully Saved');
    }
    
    getSuccessfullyDeletedToastMessage () {
        return cy.get('.oxd-text--toast-message').contains('Successfully Deleted');
    }
    
     getNoRecordsFoundToastMessage () {
        return cy.get('.oxd-text--toast-message').contains('No Records Found');
    }







};

export default SharedElements;