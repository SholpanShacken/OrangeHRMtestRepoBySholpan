import LoginPage from '../support/pageObjects/LoginPage';
import DashboardPage from '../support/pageObjects/DashboardPage';
import PIMEmployeeListPage from '../support/pageObjects/PIMEmployeeListPage';
import SharedElements from '../support/pageObjects/SharedElements';
import PIMEEmployeeContactDetailsPage from "../support/pageObjects/PIMEmployeeContactDetailsPage";
import PIMEmployeePersonalDetailsPage from '../support/pageObjects/PIMEmployeePersonalDetailsPage';
import { generateRandomInvalidPhoneNumber,generateRandomString } from '../support/utils/dataGenerator';

describe('Validate Employee contact details inputs', () => {
      let users: UsersFixture; 
      let employeeData:EmployeeFixture;
      const loginPage = new LoginPage();
      const dashboardPage = new DashboardPage()
      const pimEmployeeListPage = new PIMEmployeeListPage();
      const sharedElements = new SharedElements;
      const pimEmployeePersonalDetailsPage = new PIMEmployeePersonalDetailsPage();
      const pimEmployeeContactDetailsPage = new PIMEEmployeeContactDetailsPage;

    before(() => {cy.fixture('users').then((loadedUsers: UsersFixture) => {
        users = loadedUsers;
        return cy.fixture('personalDetails');})
        .then((loadedEmployeeData: EmployeeFixture) => {
             employeeData = loadedEmployeeData;
            });
       });

    beforeEach(() => {
        loginPage.visit();
        cy.createLogin(users.validUser.username, users.validUser.password);
        dashboardPage.verifyDashboardLoaded();
        cy.intercept('GET', 'web/index.php/api/v2/pim/employees*').as('getEmployees');
        cy.get('.oxd-text').contains('PIM').click();
        cy.wait('@getEmployees').then((interception) => {
            expect(interception.response!.statusCode).to.eq(200);
            cy.url().should('include', '/pim/viewEmployeeList');
        })
    
        const pimEmployeeListPage = dashboardPage.navigateToPIMModule();
        cy.wait('@getEmployees').then((interception) => {
            expect(interception.response!.statusCode).to.eq(200);
            pimEmployeeListPage.verifyPageLoaded();
        });  

        const addEmployeeTab = pimEmployeeListPage.getAddEmployeeNavTab ();
        addEmployeeTab.click();

        cy.url().should('include', '/pim/addEmployee');
        cy.contains('.oxd-text.oxd-text--h6.orangehrm-main-title', 'Add Employee').should('be.visible');
    });
        
    it('should fill out valid contact details',() => {
        pimEmployeeListPage.fillBasicEmployeeForm();
        sharedElements.getSaveButton().click();
        sharedElements.getSuccessfullySavedToastMessage().should('be.visible');
        cy.url().should('match', /empNumber\/\d+$/);
        pimEmployeePersonalDetailsPage.getPersonalDetailsPageTitle().should('be.visible');
        cy.get('.orangehrm-tabs-wrapper').should('be.visible'); 
        pimEmployeePersonalDetailsPage.getContactDetailsTab().click();        
        pimEmployeeContactDetailsPage.fillContactDetailsForm();
        sharedElements.getSaveButton().click();
        sharedElements.getSuccessfullyUpdatedToastMessage().should('be.visible');
    });

       it('should validate inputs',() => {
        pimEmployeeListPage.fillBasicEmployeeForm();
        sharedElements.getSaveButton().click();
        sharedElements.getSuccessfullySavedToastMessage().should('be.visible');
        cy.url().should('match', /empNumber\/\d+$/);
        pimEmployeePersonalDetailsPage.getPersonalDetailsPageTitle().should('be.visible');
        cy.get('.orangehrm-tabs-wrapper').should('be.visible'); 
        pimEmployeePersonalDetailsPage.getContactDetailsTab().click();        
        //velidations and assertions
        pimEmployeeContactDetailsPage.getStreet1InputBox()
        .click().type(generateRandomString(71));
        sharedElements.getCharsExceedValidationMessage().should('be.visible');

        pimEmployeeContactDetailsPage.getStreet2InputBox()
        .click().type(generateRandomString(71));
         sharedElements.getCharsExceedValidationMessage().should('be.visible');

        pimEmployeeContactDetailsPage.getStateProvinceInputBox()
        .click().type(generateRandomString(71));
         sharedElements.getCharsExceedValidationMessage().should('be.visible');

        pimEmployeeContactDetailsPage.getZipPostalCodeInputBox()
        .click().type(generateRandomString(71));
         sharedElements.getCharsExceedValidationMessage().should('be.visible');

        pimEmployeeContactDetailsPage.getHomePhoneInputBox()
        .click().type(generateRandomInvalidPhoneNumber());
        sharedElements.getPhoneNumberValidationMessage().should('be.visible');

        pimEmployeeContactDetailsPage.getMobilePhoneInputBox()
        .click().type(generateRandomInvalidPhoneNumber());
        sharedElements.getPhoneNumberValidationMessage().should('be.visible');

        pimEmployeeContactDetailsPage.getWorkPhoneInputBox()
        .click().type(generateRandomInvalidPhoneNumber());
        sharedElements.getPhoneNumberValidationMessage().should('be.visible');

        pimEmployeeContactDetailsPage.getWorkEmailInputBox()
        .click().type(generateRandomString(10));
        sharedElements.getEmailValidationMessage().should('be.visible');

         pimEmployeeContactDetailsPage.getOtherEmailInputBox()
        .click().type(generateRandomString(10));
        sharedElements.getEmailValidationMessage().should('be.visible');   
    
    
    
    
    
    
    });

















});