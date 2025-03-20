describe('Qubika Website Automation', () => {
  // Before each test, navigate to the Qubika website
  beforeEach(() => {
    cy.visit('https://www.qubika.com');
  });

  it('Validates Qubika website and performs actions on Contact Us form', () => {
    // Check if the URL contains 'qubika.com'
    cy.url().should('include', 'qubika.com'); 

    // Accept the cookie notice
    cy.get('.cky-notice-btn-wrapper > .cky-btn-accept').click();

    // Check if the Qubika logo is visible
    cy.get('.logo').should('be.visible'); 

    // Click on the 'Contact Us' button
    cy.get('.text-wrapper > .button').click();

    // Verify if the Contact Us form fields are visible
    cy.get('input[name="firstname"]').should('be.visible');
    cy.get('input[name="lastname"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="company"]').should('be.visible');

    // Verify the options available in the 'Contact Type' dropdown
    cy.get('#contact_type-5e204c31-ede2-4976-a096-6919a081b2df')
      .find('option')
      .should('have.length', 5)
      .and('contain', 'Please Select')
      .and('contain', 'Interested in Qubika services')
      .and('contain', 'I want to offer my services to Qubika')
      .and('contain', 'Partnership proposal/request')
      .and('contain', 'Other');

    // Verify if the message field is visible and scroll it into view
    cy.get('#message-5e204c31-ede2-4976-a096-6919a081b2df')
      .scrollIntoView()
      .should('be.visible');

    // Click on each 'How did you hear about us?' checkbox (simulate user selection)
    cy.get('label[for="how_did_you_hear_about_us_0-5e204c31-ede2-4976-a096-6919a081b2df"]').click().click();
    cy.get('label[for="how_did_you_hear_about_us_1-5e204c31-ede2-4976-a096-6919a081b2df"]').click().click();
    cy.get('label[for="how_did_you_hear_about_us_2-5e204c31-ede2-4976-a096-6919a081b2df"]').click().click();
    cy.get('label[for="how_did_you_hear_about_us_3-5e204c31-ede2-4976-a096-6919a081b2df"]').click().click();
    cy.get('label[for="how_did_you_hear_about_us_4-5e204c31-ede2-4976-a096-6919a081b2df"]').click().click();

    // Subscribe to the newsletter (simulate user action)
    cy.get('label[for="newsletter_subscription-5e204c31-ede2-4976-a096-6919a081b2df"]').click().click();

    // Check if the submit button is visible and enabled
    cy.get('input[type="submit"].hs-button.primary.large')
      .should('be.visible')
      .should('be.enabled');

    // Click the submit button (first attempt)
    cy.get('.hs-button').click();

    // Focus and blur the required fields to trigger validation
    cy.get('input[name="firstname"]').focus().blur();
    cy.get('label.hs-error-msg').should('contain.text', 'Please complete this required field.');
    cy.get('input[name="lastname"]').focus().blur();
    cy.get('label.hs-error-msg').should('contain.text', 'Please complete this required field.');
    cy.get('input[name="email"]').focus().blur();
    cy.get('label.hs-error-msg').should('contain.text', 'Please complete this required field.');
    cy.get('input[name="company"]').focus().blur();
    cy.get('label.hs-error-msg').should('contain.text', 'Please complete this required field.');
    cy.get('#contact_type-5e204c31-ede2-4976-a096-6919a081b2df').focus().blur();
    cy.get('label.hs-error-msg').should('contain.text', 'Please complete this required field.');
    cy.get('textarea[name="message"]').focus().blur();
    cy.get('label.hs-error-msg').should('contain.text', 'Please complete this required field.');

    // Enter a valid first name and submit the form
    cy.get('#firstname-5e204c31-ede2-4976-a096-6919a081b2df').type('Test name');
    cy.get('.hs-button').click();

    // Verify that the error message for the first name is no longer present
    cy.get('input[name="firstname"]')
      .parent()
      .find('label.hs-error-msg')
      .should('not.exist');

    // Repeat validation for the remaining fields (lastname, email, etc.)
    cy.get('input[name="lastname"]').focus().blur();
    cy.get('label.hs-error-msg').should('contain.text', 'Please complete this required field.');
    cy.get('input[name="email"]').focus().blur();
    cy.get('label.hs-error-msg').should('contain.text', 'Please complete this required field.');
    cy.get('input[name="company"]').focus().blur();
    cy.get('label.hs-error-msg').should('contain.text', 'Please complete this required field.');
    cy.get('#contact_type-5e204c31-ede2-4976-a096-6919a081b2df').focus().blur();
    cy.get('label.hs-error-msg').should('contain.text', 'Please complete this required field.');
    cy.get('textarea[name="message"]').focus().blur();
    cy.get('label.hs-error-msg').should('contain.text', 'Please complete this required field.');

    // Close the modal that contains the form
    cy.get('.modal-scroller > .icon-x').click();

    // Verify that the form fields are no longer visible after closing the modal
    cy.get('input[name="firstname"]').should('not.be.visible');
    cy.get('input[name="lastname"]').should('not.be.visible');
    cy.get('input[name="email"]').should('not.be.visible');
    cy.get('input[name="company"]').should('not.be.visible');

    // Reopen the form and check if the first name value persists
    cy.get('.text-wrapper > .button').click();
    cy.get('#firstname-5e204c31-ede2-4976-a096-6919a081b2df')
      .should('have.value', 'Test name');
  });
});
