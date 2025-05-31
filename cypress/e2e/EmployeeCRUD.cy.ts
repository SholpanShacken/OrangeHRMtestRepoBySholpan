import LoginPage from '../support/pageObjects/LoginPage';
import DashboardPage from '../support/pageObjects/DashboardPage';
import PIMPage from '../support/pageObjects/PIMPage';
import SharedElements from '../support/pageObjects/SharedElements';
import { generateRandomString } from  '../support/utils/dataGenerator';


describe('Add Employee', () => {
  let users: UsersFixture; 
  let employeeData:EmployeeFixture;
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();
  const pimPage = new PIMPage();
  const sharedElements = new SharedElements;
  const randomEmployeeId = `${generateRandomString(9)}`;
  
  before(() => {
    cy.fixture('users').then((loadedUsers: UsersFixture) => {
      users = loadedUsers;
      return cy.fixture('personalDetails');
    }).then((loadedEmployeeData: EmployeeFixture) => {
      employeeData = loadedEmployeeData;      
    });
    });

  beforeEach(() => {
    // 1. Visit Login Page and perform login
    loginPage.visit();
    cy.createLogin(users.validUser.username, users.validUser.password);

    // 2. Verify dashboard is loaded after successful login
    dashboardPage.verifyDashboardLoaded(); 
    // 3. Intercept the API call for employee list before navigating to PIM
    cy.intercept('GET', 'web/index.php/api/v2/pim/employees*').as('getEmployees');
    cy.contains('span[data-v-7b563373]', 'PIM').click();
    cy.wait('@getEmployees').then((interception) => {
      expect(interception.response!.statusCode).to.eq(200);
      cy.url().should('include', '/pim/viewEmployeeList');
    })
     // 4. Navigate to PIM page using DashboardPage's action method
    const pimPage = dashboardPage.navigateToPIMModule();  
    
    // 5. Wait for the PIM employee list API call and verify PIM page load
    cy.wait('@getEmployees').then((interception) => {
      expect(interception.response!.statusCode).to.eq(200);
      pimPage.verifyPageLoaded();   
    });  

    // 6. Click 'Add Employee Tab' button on the PIM page  top menu using its action method
    const addEmployeeTab = pimPage.getAddEmployeeNavTab ();
    addEmployeeTab.click();

    // 7. Verify the Add Employee page is loaded
    cy.url().should('include', '/pim/addEmployee');
    cy.contains('.oxd-text.oxd-text--h6.orangehrm-main-title', 'Add Employee').should('be.visible');


  });


  it('should fill out the Add Employee form and save it',() => {
    pimPage.fillBasicEmployeeFormAndReturn();
    sharedElements.getSaveButton().click(); 
    sharedElements.getSuccessfullySavedToastMessage().should('be.visible'); 

  }) 
  
  // clean up and delete the Employee
  it('should delete the Employee from the list', () => {
    pimPage.fillBasicEmployeeFormAndReturn();
    pimPage.getEmployeeId().type(randomEmployeeId);
    sharedElements.getSaveButton().click(); 

    sharedElements.getSuccessfullySavedToastMessage().should('be.visible'); 
    cy.contains('Employee List').click()

    cy.url().should('include', '/pim/viewEmployeeList');

    pimPage.getEmployeeId().type(randomEmployeeId);
    sharedElements.getSearchButton().click();

    pimPage.getSelectCheckbox().click(); 
    sharedElements.getDeleteSelectedButton().click();
    sharedElements.getYesDeleteButton().click();

    sharedElements.getSuccessfullyDeletedToastMessage().should('be.visible'); 
    sharedElements.getNoRecordsFoundToastMessage().should('be.visible');


  });

});