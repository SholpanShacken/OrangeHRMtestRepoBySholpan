// cypress/support/pageObjects/DashboardPage.ts

import PIMPage from './PIMPage'; // Make sure this import is at the top
import AdminPage from './AdminPage'; 
//import LeavePage from './LeavePage'; 

class DashboardPage {
    url = '/web/index.php/dashboard/index';

    getDashboardBreadcrumb() {
        return cy.contains('h6[data-v-7b563373]', 'Dashboard');
    }
    getTimeAtWorkWidget() {
        return cy.contains('p.oxd-text.oxd-text--p[data-v-7b563373]', 'Time at Work');
    }
    getMyActionsWidget() {
        return cy.contains('p.oxd-text.oxd-text--p[data-v-7b563373]', 'My Actions');
    }
    getQuickLaunchWidget() {
        return cy.contains('p.oxd-text.oxd-text--p[data-v-7b563373]', 'Quick Launch');
    }
    getBuzzLatestPostsWidget() {
        return cy.contains('p.oxd-text.oxd-text--p[data-v-7b563373]', 'Buzz Latest Posts');
    }
    getEmployeesOnLeaveTodayWidget() {
        return cy.contains('p.oxd-text.oxd-text--p[data-v-7b563373]', 'Employees on Leave Today');
    }
    getEmployeeDistributionBySubUnitWidget() {
        return cy.contains('p.oxd-text.oxd-text--p[data-v-7b563373]', 'Employee Distribution by Sub Unit');
    }
    getSidebar() {
        return cy.get('aside[data-v-5b6b3cf3]');
    }
    getSidebarSearchField() {
        return cy.get('input[data-v-1f99f73c]');
    }
    getAdminTab() {
        return cy.contains('span[data-v-7b563373]', 'Admin');
    }
    getPIMtab() {
        return cy.contains('span[data-v-7b563373]', 'PIM');
    }
    getLeaveTab() {
        return cy.contains('span[data-v-7b563373]', 'Leave');
    }
    getTimeTab() {
        return cy.contains('span[data-v-7b563373]', 'Time');
    }
    getRecruitmentTab() {
        return cy.contains('span[data-v-7b563373]', 'Recruitment');
    }
    getMyInfoTab() {
        return cy.contains('span[data-v-7b563373]', 'My Info');
    }
    getPerformanceTab() {
        return cy.contains('span[data-v-7b563373]', 'Performance');
    }
    getDirectoryTab() {
        return cy.contains('span[data-v-7b563373]', 'Directory');
    }
    getMaintenanceTab() {
        return cy.contains('span[data-v-7b563373]', 'Maintenance');
    }
    getClaimTab() {
        return cy.contains('span[data-v-7b563373]', 'Claim');
    }
    getCBuzzTab() {
        return cy.contains('span[data-v-7b563373]', 'Buzz');
    }

    visit() {
        cy.visit(this.url);
    }

    verifyDashboardLoaded() {
        cy.url().should('include', this.url);
        this.getSidebar().should('be.visible');
        this.getDashboardBreadcrumb().should('be.visible');
    }

    // --- Action/Navigation Methods ---

    navigateToPIMModule(): PIMPage {
        this.getPIMtab().click(); // Clicks the PIM tab using its getter
        return new PIMPage();     // Returns a new instance of the PIMPage
    }

    navigateToAdminModule(): AdminPage {
        this.getAdminTab().click();
        return new AdminPage();
    }

    // navigateToLeaveModule(): LeavePage {
    //     this.getLeaveTab().click();
    //     return new LeavePage();
    //}


}

export default DashboardPage;
