// cypress/support/pageObjects/LoginPage.ts

class LoginPage {
  url = '/web/index.php/auth/login'; // Base path after Cypress baseUrl

  getUsernameField() {
    return cy.get('input[name="username"]');
  }
  getPasswordField() {
    return cy.get('input[name="password"]');
  }
  getLoginButton() {
    return cy.get('button[type="submit"]');
  }
  getInvalidCredentialsErrorMessage() {
    return cy.contains('.oxd-alert-content-text', 'Invalid credentials');
  }
  getRequiredErrorMessage(field: 'username' | 'password') {
      // A more specific selector might be needed based on exact HTML for 'Required' text below fields.
      if (field === 'username') {
          // This selector is an example; you might need to inspect the HTML for exact match.
          return cy.get('input[name="username"]').closest('.oxd-input-group').find('.oxd-text--span');
      } else {
          // This selector is an example; you might need to inspect the HTML for exact match.
          return cy.get('input[name="password"]').closest('.oxd-input-group').find('.oxd-text--span');
      }
  }

  visit() {
    cy.visit(this.url);
  }

  login(username: string, password: string) {
    this.getUsernameField().type(username);
    this.getPasswordField().type(password);
    this.getLoginButton().click();
  }
}

export default LoginPage;