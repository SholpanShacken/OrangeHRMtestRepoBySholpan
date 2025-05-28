class AdminPage {
    url = '/web/index.php/admin/viewSystemUsers';
    getSystemUsers () {
        return cy.get('.oxd-table-filter').contains('System Users');
    }
    getRecords () {
        return cy.get ('.oxd-text.oxd-text--span').contains ('Records')
    }
    getResetButton () {
        return cy.get('button[type="reset"]').contains('Reset')
    }
     getSearchButton () {
        return cy.get('button[type="submit"]').contains('Search')
    }
    getAddButton () {
        return cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary').contains('Add');
    }
    getUserListTable () {
        return cy.get('.oxd-table-decorator-card');
    }
    getSelectCheckbox () {
        return cy.get ('.oxd-icon.bi-check.oxd-checkbox-input-icon');
    }
    getSelectAllCheckbox () {
        return cy.get ('.oxd-icon.bi-dash.oxd-checkbox-input-icon');
    }
    visit() {
        cy.visit(this.url);
    }  


    // A method to verify this page has loaded correctly
    verifyPageLoaded() {
        cy.url().should('include', this.url);
        this.getSystemUsers().should('be.visible'); // Check a prominent element
        this.getAddButton().should('be.visible'); // Ensure the Add button is there
        this.getRecords().should('be.visible'); // Ensure the records counter is there
    }

 

    // // An action method to click the Add button and transition to the next page object
    // clickAddEmployee(): AddEmployeePage {
    //     this.getAddButton().click();
    //     return new AddEmployeePage(); // Returns an instance of the new page
    // }
 

}
export default AdminPage;