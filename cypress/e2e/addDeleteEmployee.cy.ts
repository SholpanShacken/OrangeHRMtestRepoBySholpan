import LoginPage from '../support/pageObjects/LoginPage';
import DashboardPage from '../support/pageObjects/DashboardPage';
import PIMPage from '../support/pageObjects/PIMPage';


describe('Add Employee', () => {
  let users: UsersFixture; 
  let employeeData:EmployeeFixture;
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();
  
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
    cy.intercept('GET', 'web/index.php/api/v2/pim/employees*').as('getEmployees');
    cy.contains('span[data-v-7b563373]', 'PIM').click();
    cy.wait('@getEmployees').then((interception) => {
      expect(interception.response!.statusCode).to.eq(200);
      cy.url().should('include', '/pim/viewEmployeeList');
    })
     // 4. Navigate to PIM using DashboardPage's action method
    // This method returns the PIMPage instance
    const pimPage = dashboardPage.navigateToPIMModule();  
    
    // 5. Wait for the PIM employee list API call and verify PIM page load
    cy.wait('@getEmployees').then((interception) => {
      expect(interception.response!.statusCode).to.eq(200);
      pimPage.verifyPageLoaded();   
    });  

    // 6. Click 'Add' button on the PIM page using its action method
    // This method should return the AddEmployeePage instance
    const addEmployeePage = pimPage.getAddButton ();  

    // // 7. Verify the Add Employee page is loaded
    // addEmployeePage.verifyPageLoaded();

    cy.contains('button', 'Add').click();
    cy.url().should('include', '/pim/addEmployee');
    cy.contains('h6[data-v-7b563373]', 'Add Employee').should('be.visible');


  });


  it('should fill out the Add Employee form and save it',() => {
    const employee = employeeData.newValidEmployee;
    
    cy.get('input[placeholder="First Name"]').type(employee.firstName);
    if (employee.middleName) { 
      cy.get('input[placeholder="Middle Name"]').type(employee.middleName);
    }
    cy.get('input[placeholder="Last Name"]').type(employee.lastName);
    
    //cy.contains('input[data-v-1f99f73c]', 'Employee Id').should('have.value');
    cy.contains('button[data-v-10d463b7]', 'Save').click(); 
    cy.contains('.oxd-text--toast-message', 'Successfully Saved').should('be.visible');

  }) 
  
  // clean up and delete the new user
  it('should delete the Employee from the list', () => {
     const employee = employeeData.newValidEmployee;

    cy.contains('Employee List').click();
    cy.contains('label', 'Employee Name') 
    .parents('.oxd-input-group')        
    .find('input[placeholder="Type for hints..."]') 
    .type(employee.firstName);

    cy.contains('button', 'Search').click();
    cy.get('input[type="checkbox"]').check({ force: true }); 
    cy.contains('button', 'Delete Selected').click();
    cy.contains('button', 'Yes, Delete').click();


  });

});