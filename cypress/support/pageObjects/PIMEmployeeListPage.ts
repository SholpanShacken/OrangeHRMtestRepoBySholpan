import { generateRandomString } from '../utils/dataGenerator';
class PIMEmployeeListPage {
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

    getCreateLoginDetailsToggleButton () {
        return cy.contains('.user-form-header', 'Create Login Details')
        .parents()
        .find('.oxd-switch-input')
    }

    getEmployeeFirtsName () {
        return cy.get('input[placeholder="First Name"]');
    }

    getEmployeeMiddleName () {
        return cy.get('input[placeholder="Middle Name"]');
    }

     getEmployeeLastName () {
        return cy.get('input[placeholder="Last Name"]');        
    }

     
    visit() {
        cy.visit(this.url);
    }  
    
    fillBasicEmployeeForm(): Cypress.Chainable<{
        employeeId: string;
        firstName: string;
        middleName:string;
        lastName:string; }> {
            const randomEmployeeId= generateRandomString(5);
            return cy.fixture('personalDetails').then((data) => {
            const employee = data.newValidEmployee;
            this.getEmployeeFirtsName().type(employee.firstName);
            if (employee.middleName) {
                this.getEmployeeMiddleName().type(employee.middleName);
            };
            this.getEmployeeLastName().type(employee.lastName);
            this.getEmployeeId().clear().type(randomEmployeeId);

            return cy.wrap({
                employeeId: randomEmployeeId,
                firstName: employee.firstName,
                lastName: employee.lastName,
                middleName: employee.middleName

            });
            
        
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
export default PIMEmployeeListPage;