import { all } from "cypress/types/bluebird";

class PIMEmployeePersonalDetailsPage {

   getPersonalDetailsPageTitle() {
      return cy.get('.oxd-text.oxd-text--h6.orangehrm-main-title').contains('Personal Details')
   };

   getMaritalStatus() {
      return cy.contains('.oxd-label', 'Marital Status').parents('.oxd-input-group').find('.oxd-icon');
   };

   getContactDetailsTab() {
      return cy.get('.orangehrm-tabs-item').contains('Contact Details');
   };

            

}  

export default PIMEmployeePersonalDetailsPage;