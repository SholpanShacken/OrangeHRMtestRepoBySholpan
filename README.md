
# Cypress Automation Framework (TypeScript)

This is a custom-built Cypress test automation framework written in TypeScript. It follows industry best practices, using the Page Object Model (POM) design pattern, fixtures for test data, and API intercepts to ensure reliable end-to-end testing.

## What This Project Covers

* Automated login flow
* Add new user (positive test)
* Validation of required fields
* Username/password field validation
* API intercepts for user and employee data
* Usage of fixtures and custom commands
* Assertions for UI and backend responses

## Project Structure

```
cypress/
  ├── e2e/                     # Test specs
  ├── fixtures/                # Static test data (users, employees)
  ├── support/
      ├── commands.ts          # Custom Cypress commands
      ├── pageObjects/         # Page Object classes (LoginPage, DashboardPage, etc.)
      └── e2e.ts               # Global test setup
cypress.config.ts              # Cypress configuration file
tsconfig.json                  # TypeScript settings
package.json                   # Dependencies and scripts
```

## How to Run the Tests

1. Clone the repo:

```
git clone https://github.com/your-username/new-cypress-framework.git
cd new-cypress-framework
```

2. Install dependencies:

```
npm install
```

3. Launch Cypress Test Runner:

```
npx cypress open
```

Or run tests in headless mode:

```
npx cypress run
```

## Tech Stack

* Cypress
* TypeScript
* Mocha + Chai (default Cypress test runner and assertion library)
* Page Object Model
* Fixtures and API mocking using `cy.intercept`

## Why I Built This

I built this framework from scratch to demonstrate my skills in modern web automation using Cypress. It reflects my understanding of test structure, reusable components, and real-world testing scenarios.

## Contact

Feel free to reach out if you have questions or want to connect:

**Sholpan**
Email: \[[sholpanshacken@gmail.com)]
LinkedIn: [https://linkedin.com/in/sholpanshacken](https://linkedin.com/in/sholpanshacken)

---

Let me know if you'd like help customizing the contact info or making this more tailored for a specific job application.
