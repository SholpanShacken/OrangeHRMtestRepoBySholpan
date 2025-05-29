import LoginPage from '../support/pageObjects/LoginPage';
import DashboardPage from '../support/pageObjects/DashboardPage';

describe('Add Employee', () => {
  let users: UsersFixture; 
  let employeeData:EmployeeFixture;
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();
  //const adminPage = new AdminPage();
  
  before(() => {
    cy.fixture('users').then((loadedUsers: UsersFixture) => {
      users = loadedUsers;
      return cy.fixture('personalDetails');
    }).then((loadedEmployeeData: EmployeeFixture) => {
      employeeData = loadedEmployeeData;      
    });
    });

  beforeEach(() => {
    // Setup for each test: Login and navigate to the Add Employee form  
    // 1. Visit Login Page and perform login
    loginPage.visit();
    cy.createLogin(users.validUser.username, users.validUser.password);

    // 2. Verify dashboard is loaded after successful login
    dashboardPage.verifyDashboardLoaded(); 
    // 3. Intercept the API call for employee list before navigating to PIM
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
    
  });
  
  it ('should ')


    














    
});   