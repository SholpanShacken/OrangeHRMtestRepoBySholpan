class LeavePage{
    url='/web/index.php/leave/viewLeaveList';
    getPIMBreadcrumb () {
        return cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').contains('Leave');
    }

    getApplyNavTab () {
        return cy.get('.oxd-topbar-body-nav-tab-item').contains('Apply');
    }
    
    getMyLeaveNavTab () {
        return cy.get('.oxd-topbar-body-nav-tab-item').contains('My Leave');
    }
    
    getEntitlementNavTab () {
        return cy.get('.oxd-topbar-body-nav-tab-item').contains('Entitlement');
    }
   
    getReportsNavTab () {
        return cy.get('.oxd-topbar-body-nav-tab-item').contains('Reports');
    }

    getConfigureNavTab () {
        return cy.get('.oxd-topbar-body-nav-tab-item').contains('Configure');
    }

    getLeaveListNavTab () {
        return cy.get('.oxd-topbar-body-nav-tab-item').contains('LeaveList');
    }

    getAssignLeaveNavTab () {
        return cy.get('.oxd-topbar-body-nav-tab-item').contains('Assign Leave');
    }

    getLeaveList () {
        return cy.get('.oxd-text.oxd-text--h5 oxd-table-filter-title').contains('Leave List');
    }

    getSearchButton () {
        return cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').contains('Search');
    }

    getResetButton () {
        return cy.get('.oxd-button.oxd-button--medium.oxd-button--ghost').contains('Search');
    }

    visit() {
        cy.visit(this.url);
    }
    
     verifyPageLoaded() {
        cy.url().should('include', this.url);
        this.getPIMBreadcrumb ().should('be.visible'); 
        this.getLeaveList().should('be.visible'); 
       
    }
   
}
export default LeavePage;
