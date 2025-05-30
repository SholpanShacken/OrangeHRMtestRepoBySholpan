// cypress/support/index.d.ts

// Existing Cypress Chainable declaration is here:
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in to OrangeHRM.
     * @param username - The username to use (defaults to 'Admin').
     * @param password - The password to use (defaults to 'admin123').
     * @example
     * @param dropdownSelector - selector for dropdown items
     * 
     * cy.createLogin();
     * cy.createLogin('testuser', 'password123');
     */
    createLogin(username?: string, password?: string): Chainable<any>;
    selectRandomDropdownItem(dropdownSelector: string): Chainable<Element>;
  }
}

// Defined structure of users.json fixture
interface User {
  username: string;
  password: string;
}

interface UsersFixture {
  validUser: User;
  invalidUser: User;
  anotherValidUser?: User;  
  lockedOutUser?: User;    
}

interface Employee {
  firstName:string,
  middleName?:string,
  lastName:string,
  otherId?:string,
  driversLicense: string,
  licenseExpDay:string,
  nationality:string,
  maritalStatus:string,
  dateOfBirth:string,
  gender:string
}

interface EmployeeFixture {
  [key: string]: Employee;
}

interface EmployeeFixture extends Employee {
}