import LoginPage from '../support/pageObjects/LoginPage';
import AddUserPage from '../support/pageObjects/AddUserPage';
import DashboardPage from '../support/pageObjects/DashboardPage';
import PIMEmployeeListPage from '../support/pageObjects/PIMEmployeeListPage';
import SharedElements from '../support/pageObjects/SharedElements';
import { generateRandomString } from  '../support/utils/dataGenerator';
import PIMEmployeePersonalDetailsPage from '../support/pageObjects/PIMEmployeePersonalDetailsPage';


describe('Add,assign User,edit,delete Employee', () => {
  let users: UsersFixture; 
  let employeeData:EmployeeFixture;
  const loginPage = new LoginPage();
  const addUserPage = new AddUserPage();
  const dashboardPage = new DashboardPage();
  const pimEmployeeListPage = new PIMEmployeeListPage();
  const pimEmployeePersonalDetailsPage = new PIMEmployeePersonalDetailsPage();
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
    const pimEmployeeListPage = dashboardPage.navigateToPIMModule();  
    
    // 5. Wait for the PIM employee list API call and verify PIM page load
    cy.wait('@getEmployees').then((interception) => {
      expect(interception.response!.statusCode).to.eq(200);
      pimEmployeeListPage.verifyPageLoaded();   
    });  

    // 6. Click 'Add Employee Tab' button on the PIM page  top menu using its action method
    const addEmployeeTab = pimEmployeeListPage.getAddEmployeeNavTab ();
    addEmployeeTab.click();

    // 7. Verify the Add Employee page is loaded
    cy.url().should('include', '/pim/addEmployee');
    cy.contains('.oxd-text.oxd-text--h6.orangehrm-main-title', 'Add Employee').should('be.visible');


  });

  // Add Employee
  it('should fill out the Add Employee form and save it',() => {
    pimEmployeeListPage.fillBasicEmployeeForm();
    sharedElements.getSaveButton().click(); 
    sharedElements.getSuccessfullySavedToastMessage().should('be.visible'); 
    cy.url().should('match', /\/pim\/viewPersonalDetails\/empNumber\/\d+$/);
    pimEmployeePersonalDetailsPage.getPersonalDetailsPageTitle().should('be.visible');
    
  }) 

  // Create Login Details to Employee
  it('should create the login details to Employee', ()  =>{
    const randomUsername = `TestUser#${generateRandomString(5)}`;
    const randomPassword = `TestPassword${generateRandomString(5)}`;
    pimEmployeeListPage.fillBasicEmployeeForm();
    pimEmployeeListPage.getCreateLoginDetailsToggleButton().should('be.visible').click();
    addUserPage.getUserNameInput().type(randomUsername);
    addUserPage.getUserNameInput().should('have.value', randomUsername);
    addUserPage.getPasswordInput().type(randomPassword);
    addUserPage.getConfirmPasswordInput().type(randomPassword);
    addUserPage.getUserNameInput().should('have.value', randomUsername);

    sharedElements.getSaveButton().click();
    sharedElements.getSuccessfullySavedToastMessage().should('be.visible');

  });

  //Edit Employee
  it("should edit Employee personal details", () => {
      //1. add new Employee
      pimEmployeeListPage.fillBasicEmployeeForm()
      .then(({employeeId, firstName,lastName,middleName}) => {
        sharedElements.getSaveButton().click();
        sharedElements.getSuccessfullySavedToastMessage().should('be.visible');
        //2. after Employee successfully created, you'll be navigated to the Personal Details Page        cy.url().should('match', /\/pim\/viewPersonalDetails\/empNumber\/\d+$/);
        pimEmployeePersonalDetailsPage.getPersonalDetailsPageTitle().should('be.visible');
        //3. assert that Employee's first, middle, last name and ID are successfully poopulated 
        pimEmployeeListPage.getEmployeeFirtsName().should('have.value',firstName);
        pimEmployeeListPage.getEmployeeLastName().should('have.value',lastName);
        pimEmployeeListPage.getEmployeeMiddleName().should('have.value',middleName);
        //4. change Employee's Marital Status to "Other"
        pimEmployeePersonalDetailsPage.getMaritalStatus().click();
        cy.contains("Other").click();
        //5. Save the update
        sharedElements.getSaveButton().click()
        //6. Assert the update toast message
        sharedElements.getSuccessfullyUpdatedToastMessage().should('be.visible'); 

      }); 
    });
  
    
    // Delete Employee
  it('should delete the Employee from the list', () => {
    pimEmployeeListPage.fillBasicEmployeeForm().then(({employeeId}) => {
    sharedElements.getSaveButton().click(); 
    sharedElements.getSuccessfullySavedToastMessage().should('be.visible'); 
    
    cy.contains('Employee List').click()
    cy.url().should('include', '/pim/viewEmployeeList');

    pimEmployeeListPage.getEmployeeId().type(employeeId);
    sharedElements.getSearchButton().click();

    pimEmployeeListPage.getSelectCheckbox().click(); 
    sharedElements.getDeleteSelectedButton().click();
    sharedElements.getYesDeleteButton().click();

    sharedElements.getSuccessfullyDeletedToastMessage().should('be.visible'); 
    sharedElements.getNoRecordsFoundToastMessage().should('be.visible');

    });

  });
});
