import { generateRandomEmail, generateRandomProvince } from '../utils/dataGenerator';
import { generateRandomPhoneNumber } from '../utils/dataGenerator';
import { generateRandomString } from '../utils/dataGenerator';
import {generateRandomCanadianPostalCode} from '../utils/dataGenerator';
import { generateRandomBCcity} from '../utils/dataGenerator';
import SharedElements from './SharedElements';

class PIMEEmployeeContactDetailsPage {

    getContactDetailsPageTitle() {
        return cy.get('.oxd-text.oxd-text--h6.orangehrm-main-title')
        .contains('Contact Details')
     };

     getAddressHeader() {
        return cy.get(".oxd-text").contains("Address")
     };

     getTelephoneHeader() {
        return cy.get(".oxd-text").contains("Telephone")
     };

     getEmailHeader() {
        return cy.get(".oxd-text").contains("Email")
     };

     getAttachmentsHeader() {
        return cy.get(".oxd-text").contains("Attachments")
     };

     getStreet1InputBox(){
        return cy.contains('.oxd-label', 'Street1')
        .parents('.oxd-input-group')
        .find('.oxd-input');
     };

     getStreet2InputBox(){
        return cy.contains('.oxd-label', 'Street2')
        .parents('.oxd-input-group')
        .find('.oxd-input');
     };

     getCityInputBox(){
        return cy.contains('.oxd-label', 'City')
        .parents('.oxd-input-group')
        .find('.oxd-input');
     };

     getStateProvinceInputBox(){
        return cy.contains('.oxd-label', 'State/Province')
        .parents('.oxd-input-group')
        .find('.oxd-input');
     };

     getZipPostalCodeInputBox(){
        return cy.contains('.oxd-label', 'Zip/Postal Code')
        .parents('.oxd-input-group')
        .find('.oxd-input');
     };

      getCountrySelectDropdown() {
        return cy.contains('label', 'Country')
                 .next('.oxd-select-text.oxd-select-text--active')
                 .find('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow');
    };

    getHomePhoneInputBox(){
        return cy.contains('.oxd-label', 'Home')
        .parents('.oxd-input-group')
        .find('.oxd-input');
    };

     getMobilePhoneInputBox(){
        return cy.contains('.oxd-label', 'Mobile')
        .parents('.oxd-input-group')
        .find('.oxd-input');
    };

     getWorkPhoneInputBox(){
        return cy.contains('.oxd-label', 'Work')
        .parents('.oxd-input-group')
        .find('.oxd-input');
    };

     getWorkEmailInputBox(){
        return cy.contains('.oxd-label', 'Work Email')
        .parents('.oxd-input-group')
        .find('.oxd-input');
    };

     getOtherEmailInputBox(){
        return cy.contains('.oxd-label', 'Other Email')
        .parents('.oxd-input-group')
        .find('.oxd-input');
    };

   fillContactDetailsForm(): Cypress.Chainable<{
         //   street1:string;
         //   street2:string;
           city:string;
           province:string;
           postalCode:string;
           homePhoneNumber:string;
           mobilePhoneNmberu:string;
           workPhoneNumber:string;
           workEmail:string;
           otherEmail:string;
       }> {
       const street1 = '222 Nelson Ave.';
       const street2 = '8854 Gordon Ave.';
       const randomCity =  generateRandomBCcity();
       const randomProvince =generateRandomProvince();
       const randomZIPcode = generateRandomCanadianPostalCode();
       const randomHomePhoneNumber = generateRandomPhoneNumber();
       const randomMobilePhoneNumber = generateRandomPhoneNumber ();
       const randomWorkPhoneNumber = generateRandomPhoneNumber ();
       const randomWorkEmail =generateRandomEmail ();
       const randomOtherEmail =generateRandomEmail ();
       const sharedElements = new SharedElements;
       

       this.getStreet1InputBox().click().type(street1);
       this.getStreet2InputBox().click().type(street2);
       this.getCityInputBox().click().type(randomCity);
       this.getStateProvinceInputBox().click().type(randomProvince);
       this.getZipPostalCodeInputBox().click().type(randomZIPcode);
       this.getCountrySelectDropdown().click().scrollIntoView().select('Canada');
       this.getHomePhoneInputBox().click().type(randomHomePhoneNumber);
       this.getMobilePhoneInputBox().click().type(randomMobilePhoneNumber);
       this.getWorkPhoneInputBox().click().type(randomWorkPhoneNumber);
       this.getWorkEmailInputBox().click().type(randomWorkEmail);
       this.getOtherEmailInputBox().click().type(randomOtherEmail);  
  
       sharedElements.getSaveButton().click();  
   
       return cy.wrap({
           city:randomCity,
           province:randomProvince,
           postalCode:randomZIPcode,
           homePhoneNumber:randomHomePhoneNumber,
           mobilePhoneNmberu:randomMobilePhoneNumber,
           workPhoneNumber:randomWorkPhoneNumber,
           workEmail:randomWorkEmail,
           otherEmail:randomOtherEmail,
       }); 
     }



}

export default PIMEEmployeeContactDetailsPage;