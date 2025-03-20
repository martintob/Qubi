describe('Admin UI Tests (with pre-registered user)', () => {

  let randomUser;

  // Function to generate random data with the prefix "MARTIN.TEST."
  const generateRandomData = () => {
    const randomNumber = Math.floor(Math.random() * 10000);
    const randomEmail = `MARTIN.TEST.${randomNumber}@example.com`;
    const randomPassword = `MARTIN.TEST.${randomNumber}123!`;
    const randomUserName = `MARTIN.TEST.${randomNumber}`;
    
    return {
      email: randomEmail,
      password: randomPassword,
      userName: randomUserName,
    };
  };

  before(() => {
    // Register a user once before all tests
    randomUser = generateRandomData();
    cy.request({
      method: 'POST',
      url: '/api/auth/register',
      body: {
        email: randomUser.email,
        password: randomUser.password,
        roles: ['ROLE_ADMIN'],
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(201); // Verify the user was created
      Cypress.env('userData', randomUser); // Store the user data in Cypress.env
    });

    // Wait for the registration to complete before proceeding with tests
    cy.wait(5000);
  });

  beforeEach(() => {
    const userData = Cypress.env('userData');
    // Log in globally for all tests
    cy.visit('https://club-administration.qa.qubika.com/#/auth/login');
    cy.get('.mb-3 > .input-group > .form-control').type(userData.email);
    cy.get(':nth-child(2) > .input-group > .form-control').type(userData.password);
    cy.get('.btn').click();

    // Ensure the session remains active
    cy.wait(3000); // Adjust wait time if needed
  });

  it('Should create a new Category and then a new Sub Category', function() {
    // Click the category navigation link
    cy.get(':nth-child(3) > .nav-link').click();

    // Click the button to create a new category
    cy.get('[style="position: absolute; right: 15px;"] > .btn').click();

    // Generate a random category name and enter it
    const randomNumber = Math.floor(Math.random() * 10000);
    const categoryName = `MARTIN.CATEGORY.${randomNumber}`;
    cy.get('#input-username').type(categoryName);  // Type the category name

    // Click the button to submit the category
    cy.get('button.btn.btn-primary.my-3').click();

    // Create a new subcategory
    cy.get('[style="position: absolute; right: 15px;"] > .btn').click();

    // Generate a random subcategory name and enter it
    const subCategoryName = `MARTIN.SUBCATEGORY.${randomNumber}`;
    cy.get('#input-username').type(subCategoryName);  // Type the subcategory name

    // Click the checkbox (force click if needed)
    cy.get('#customCheckMain').click({ force: true });

    // Click the dropdown to open it
    cy.get('.ng-arrow-wrapper').click();

    // Wait for the input field inside the dropdown to be visible
    cy.get('input[aria-autocomplete="list"]').should('be.visible').type(categoryName);

    // Wait for the item to appear and then select it (use `{enter}` to select the first match)
    cy.get('input[aria-autocomplete="list"]').type('{enter}');

    // Click the button to submit the subcategory
    cy.get('button.btn.btn-primary.my-3').click();
  });
});
