import LoginPage from '../support/pageObjects/LoginPage';
import AddUserPage from '../support/pageObjects/AddUserPage';
import DashboardPage from '../support/pageObjects/DashboardPage';
import PIMPage from '../support/pageObjects/PIMPage';
import SharedElements from '../support/pageObjects/SharedElements';
import { generateRandomString } from  '../support/utils/dataGenerator';


describe('Add Employee', () => {
  let users: UsersFixture; 
  let employeeData:EmployeeFixture;
  const loginPage = new LoginPage();
  const addUserPage = new AddUserPage();
  const dashboardPage = new DashboardPage();
  const pimPage = new PIMPage();
  const sharedElements = new SharedElements;
  
  
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

  // Add Employee
  it('should fill out the Add Employee form and save it',() => {
    pimPage.fillBasicEmployeeForm();
    sharedElements.getSaveButton().click(); 
    sharedElements.getSuccessfullySavedToastMessage().should('be.visible'); 

  }) 

  // Add Login Details
  it('should create the login details to new Employee', ()  =>{
    const randomUsername = `TestUser#${generateRandomString(5)}`;
    const randomPassword = `TestPassword${generateRandomString(5)}`;
    pimPage.fillBasicEmployeeForm();
    pimPage.getCreateLoginDetailsToggleButton().should('be.visible').click();
    addUserPage.getUserNameInput().type(randomUsername);
    addUserPage.getUserNameInput().should('have.value', randomUsername);
    addUserPage.getPasswordInput().type(randomPassword);
    addUserPage.getConfirmPasswordInput().type(randomPassword);
    addUserPage.getUserNameInput().should('have.value', randomUsername);

    sharedElements.getSaveButton().click();
    sharedElements.getSuccessfullySavedToastMessage().should('be.visible');

  });
  
  // Delete Employee
  it('should delete the Employee from the list', () => {
    pimPage.fillBasicEmployeeForm().then((employeeId) => {
    sharedElements.getSaveButton().click(); 
    sharedElements.getSuccessfullySavedToastMessage().should('be.visible'); 
    
    cy.contains('Employee List').click()
    cy.url().should('include', '/pim/viewEmployeeList');

    pimPage.getEmployeeId().type(employeeId);
    sharedElements.getSearchButton().click();

    pimPage.getSelectCheckbox().click(); 
    sharedElements.getDeleteSelectedButton().click();
    sharedElements.getYesDeleteButton().click();

    sharedElements.getSuccessfullyDeletedToastMessage().should('be.visible'); 
    sharedElements.getNoRecordsFoundToastMessage().should('be.visible');

    });

  });

});