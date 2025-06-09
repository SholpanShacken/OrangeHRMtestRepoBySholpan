import LoginPage from '../support/pageObjects/LoginPage';
import DashboardPage from '../support/pageObjects/DashboardPage';
import AddUserPage from '../support/pageObjects/AddUserPage';
import SharedElements from '../support/pageObjects/SharedElements';

describe('User CRUD Test Suite', () => {
  let users: UsersFixture; 
  let employeeData:EmployeeFixture;
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();
  const addUserPage = new AddUserPage();
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
    // 3. Intercept the API call for employee list before navigating to Admin page
    cy.intercept('GET', 'web/index.php/api/v2/admin/users*').as('getUsers');
    dashboardPage.getAdminTab().click();
    cy.wait('@getUsers').then((interception) => {
      expect(interception.response!.statusCode).to.eq(200);
      cy.url().should('include', '/admin/viewSystemUsers');
    })
     // 4. Navigate to Admin using DashboardPage's action method
    const adminPage = dashboardPage.navigateToAdminModule();  
    
    // 5. Wait for the  API call and verify Admin page load
    cy.wait('@getUsers').then((interception) => {
      expect(interception.response!.statusCode).to.eq(200);
      adminPage.verifyPageLoaded();   
    }); 

     // 6. Click 'Add' button on the Admin page using its action method
    adminPage.getAddButton().click();  

    // // 7. Verify the Add  User page is loaded
    cy.url().should('include', '/admin/saveSystemUser');
    
  });
  
  it ('should add new user', () =>{
    addUserPage.fillBasicUserForm();
    sharedElements.getSuccessfullySavedToastMessage().should('be.visible');
  });

  it('should validate Username and Password for wrong number of characters',() => {
    //addUserPage.fillBasicUserForm();
    addUserPage.getUserRoleSelectDropdown().click();
    cy.contains('ESS').click();
    addUserPage.getStatusSelectDropdown().click();
    cy.contains('Enabled').click();
    addUserPage.getEmployeeNameAutocomplete().type("a");
    cy.wait(5000);
    cy.get('.oxd-autocomplete-dropdown').should('be.visible').first().click();
    addUserPage.getUserNameInput().click().type('Name');
    //cy.wait(5000);
    cy.contains('.oxd-text','Should be at least 5 characters').should('be.visible');
    addUserPage.getPasswordInput().click().type('Pass');
    //cy.wait(5000);
    cy.contains('.oxd-text','Should have at least 7 characters').should('be.visible');
    //cy.wait(5000);
    addUserPage.getConfirmPasswordInput().click().type('Pass');
    cy.contains('.oxd-text','Should have at least 7 characters').should('be.visible');
  });

  it('should validate required inputs',() => {
    addUserPage.getSaveButton().click();
    cy.contains('.oxd-label','User Role')
        .parents('.oxd-input-group')
        .contains('.oxd-text','Required').should('be.visible');
    cy.contains('.oxd-label','Employee Name')
        .parents('.oxd-input-group')
        .contains('.oxd-text','Required').should('be.visible');    
    cy.contains('.oxd-label','Status')
        .parents('.oxd-input-group')
        .contains('.oxd-text','Required').should('be.visible');    
    cy.contains('.oxd-label','Username')
        .parents('.oxd-input-group')
        .contains('.oxd-text','Required').should('be.visible');  
    cy.contains('.oxd-label','Password')
        .parents('.oxd-input-group')
        .contains('.oxd-text','Required').should('be.visible');      
   
  });

  it(('should delete the user'), () => {
    addUserPage.fillBasicUserForm()
    .then(({user}) => {
    sharedElements.getSuccessfullySavedToastMessage().should('be.visible');
    cy.url({ timeout: 5000 }).should('include', '/admin/viewSystemUsers');
    addUserPage.getUserNameInput().click({ timeout: 5000 }).type(user);
    sharedElements.getSearchButton().click();
    cy.get('.oxd-icon.bi-trash').click({ timeout: 5000 });
    cy.contains('.oxd-button--label-danger', 'Yes, Delete').click({ timeout: 5000 });
    sharedElements.getSuccessfullyDeletedToastMessage().should('be.visible');
    sharedElements.getNoRecordsFoundToastMessage().should('be.visible');
    });
      
  });
     
});   