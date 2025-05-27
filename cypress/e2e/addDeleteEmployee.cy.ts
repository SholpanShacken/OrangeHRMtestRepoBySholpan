import LoginPage from '../support/pageObjects/LoginPage';

describe('Add Employee', () => {
  let users: UsersFixture; 
  let employeeData:EmployeeFixture;


  before(() => {
    cy.fixture('users').then((loadedUsers: UsersFixture) => {
      users = loadedUsers;
      return cy.fixture('personalDetails');
    }).then((loadedEmployeeData: EmployeeFixture) => {
      employeeData = loadedEmployeeData;      
    });
    });

  beforeEach(() => {
      
    LoginPage.visit();
    cy.createLogin(users.validUser.username, users.validUser.password);
    cy.url().should('include', '/web/index.php/dashboard/index');
    cy.contains('Dashboard').should('be.visible');
    
    cy.visit('/web/index.php/dashboard/index');
    cy.url().should('include', '/dashboard/index');
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');
    
     
    cy.intercept('GET', 'web/index.php/api/v2/pim/employees*').as('getEmployees');
    cy.contains('span[data-v-7b563373]', 'PIM').click();
    cy.wait('@getEmployees').then((interception) => {
      expect(interception.response!.statusCode).to.eq(200);
      cy.url().should('include', '/pim/viewEmployeeList');
    })
        
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


  })

})
