# Admin UI Tests (with pre-registered user)

This test suite validates the Admin UI by performing actions such as registering a user, logging in, and creating categories and subcategories. 

A random user is registered once before all tests using the `generateRandomData` function, which generates a unique email, password, and username. This ensures no conflicts between test runs. 

The user data is stored using `Cypress.env('userData')` for use in the login process. 

The `beforeEach` hook logs in the user before each test to maintain an active session. 

The test involves navigating to the Admin UI, creating a new category, and then a new subcategory. This is done by interacting with the category and subcategory creation buttons, typing random names, and ensuring the correct actions are performed. 

The test also verifies that the newly created category is associated with the subcategory. 

Cypress commands like `cy.visit`, `cy.get`, `cy.request`, and `cy.wait` are used to interact with the UI and verify the expected behavior throughout the test.


