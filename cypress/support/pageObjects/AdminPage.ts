class AdminPage {
    url = '/web/index.php/admin/viewSystemUsers';
    getSystemUsers () {
        return cy.get('.oxd-table-filter').contains('System Users');
    }

    getUserName() {
        return cy.get('.oxd-input.oxd-input--active').contains('Username')
    } 

    getUserRoleSelectInput() {
        return cy.get('.oxd-select-text-input').contains('Select')
    }

    getStatuselectArrow(labelText: string) {
        return cy.contains('label', 'Status')
                 .next('.oxd-select-text.oxd-select-text--active')
                 .find('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow');
    } 

    getEmployeeName() {
        return cy.get('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow');
    } 

    getRecords () {
        return cy.get('input[placeholder="Type for hints..."]');
    }

    geStatusSelectArrow() {
        return cy.get('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow');
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

 

    //  // An action method to click the Add button and transition to the next page object
    // clickAddUser(): AddUserPage {
    //     this.getAddButton().click();
    //     return new AddUserPage(); // Returns an instance of the new page
    // }
 

}
export default AdminPage;