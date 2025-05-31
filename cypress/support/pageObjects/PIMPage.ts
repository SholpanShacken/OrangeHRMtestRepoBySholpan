import { generateRandomString } from '../utils/dataGenerator';
class PIMPage {
    url = '/web/index.php/pim/viewEmployeeList';
    getPIMBreadcrumb () {
        return cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').contains('PIM');
    }
    getEmployeeFilters () {
        return cy.get('.oxd-table-filter').contains('Employee Information');
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
     getAddEmployeeNavTab () {
        return cy.get('.oxd-topbar-body-nav-tab-item').contains('Add Employee');
    }
     getReportsNavTab () {
        return cy.get('.oxd-topbar-body-nav-tab-item').contains('Reports');
    }
    getConfigurationNavTab () {
        return cy.get('.oxd-topbar-body-nav-tab-item').contains('Configuration');
    }
    getEmployeeListTable () {
        return cy.get('.oxd-table.orangehrm-employee-list');
    }

    getEmployeeId() {
        return cy.contains('.oxd-label', 'Employee Id')
        .parents('.oxd-input-group')
        .find('.oxd-input');
    } 
    
    getSelectCheckbox () {
        return cy.get('.oxd-table-card-cell-checkbox')
    }
   
    visit() {
        cy.visit(this.url);
    }  
    
    fillBasicEmployeeFormAndReturn(): Cypress.Chainable<string> {
        const randomEmployeeId= `${generateRandomString(9)}`;
        return cy.fixture('personalDetails').then((data) => {
            const employee = data.newValidEmployee;
            cy.get('input[placeholder="First Name"]').type(employee.firstName);
            if (employee.middleName) {
                cy.get('input[placeholder="Middle Name"]').type(employee.middleName);
            };
            cy.get('input[placeholder="Last Name"]').type(employee.lastName);
            cy.contains('.oxd-label', 'Employee Id')
            .parents('.oxd-input-group')
            .find('.oxd-input',{timeout:1000}).clear();

            return cy.wrap(randomEmployeeId);
        
        });
    
     };


    // A method to verify this page has loaded correctly
    verifyPageLoaded() {
        cy.url().should('include', this.url);
        this.getEmployeeFilters().should('be.visible'); // Check a prominent element
        this.getAddButton().should('be.visible'); // Ensure the Add button is there
        this.getRecords().should('be.visible'); // Ensure the records counter is there
    }

 

    // // An action method to click the Add button and transition to the next page object
    // clickAddEmployee(): AddEmployeePage {
    //     this.getAddButton().click();
    //     return new AddEmployeePage(); // Returns an instance of the new page
    // }
 

}
export default PIMPage;