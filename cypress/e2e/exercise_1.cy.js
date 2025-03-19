describe('Qubika Website Automation', () => {
  beforeEach(() => {
    // GIVEN the user visits the Qubika website
    cy.visit('https://www.qubika.com');
  });

  it('Validates Qubika website and performs actions on Contact Us form', () => {

    // GIVEN the user is on the Qubika website
    // WHEN the user checks the URL
    // THEN the URL should include 'qubika.com'
    cy.url().should('include', 'qubika.com'); 

    // WHEN the user accepts cookies
    // THEN the system should register the acceptance of cookies
    cy.get('.cky-notice-btn-wrapper > .cky-btn-accept').click();

    // GIVEN the user is on the homepage
    // WHEN the user looks for the logo
    // THEN the Qubika logo should be visible
    cy.get('.logo').should('be.visible');

    // WHEN the user clicks on the 'Contact us' button
    // THEN the system should open the contact form
    cy.get('.text-wrapper > .button').click();

    // GIVEN the contact form is displayed
    // WHEN the user checks the fields
    // THEN all the required fields should be visible
    cy.get('input[name="firstname"]').should('be.visible');
    cy.get('input[name="lastname"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="company"]').should('be.visible');
  
    // WHEN the user checks the dropdown options in 'Contact Type'
    // THEN the dropdown should contain the expected options
    cy.get('#contact_type-5e204c31-ede2-4976-a096-6919a081b2df')
      .find('option')
      .should('have.length', 5)
      .and('contain', 'Please Select')
      .and('contain', 'Interested in Qubika services')
      .and('contain', 'I want to offer my services to Qubika')
      .and('contain', 'Partnership proposal/request')
      .and('contain', 'Other');
    
    // WHEN the user scrolls to the "Message" field
    // THEN the message field should be visible on the page
    cy.get('#message-5e204c31-ede2-4976-a096-6919a081b2df')
      .scrollIntoView()
      .should('be.visible');

    // GIVEN the user sees the 'How did you hear about us' checkboxes
    // WHEN the user clicks on each checkbox
    // THEN the checkboxes should toggle between checked and unchecked state
    cy.get('label[for="how_did_you_hear_about_us_0-5e204c31-ede2-4976-a096-6919a081b2df"]').click().click();
    cy.get('label[for="how_did_you_hear_about_us_1-5e204c31-ede2-4976-a096-6919a081b2df"]').click().click();
    cy.get('label[for="how_did_you_hear_about_us_2-5e204c31-ede2-4976-a096-6919a081b2df"]').click().click();
    cy.get('label[for="how_did_you_hear_about_us_3-5e204c31-ede2-4976-a096-6919a081b2df"]').click().click();
    cy.get('label[for="how_did_you_hear_about_us_4-5e204c31-ede2-4976-a096-6919a081b2df"]').click().click();
    cy.get('label[for="newsletter_subscription-5e204c31-ede2-4976-a096-6919a081b2df"]').click().click();

    // WHEN the user checks if the 'Submit' button is visible and enabled
    // THEN the 'Submit' button should be visible and enabled for submission
    cy.get('input[type="submit"].hs-button.primary.large')
      .should('be.visible')
      .should('be.enabled');

    // WHEN the user clicks the 'Submit' button without filling any fields
    // THEN the system should display error messages for all mandatory fields
    cy.get('.hs-button').click();

    // GIVEN the user has not filled in required fields
    // WHEN the user focuses on an empty required field and then blurs it
    // THEN the system should display an error message for the field
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

    // WHEN the user enters a name into the "First name" field
    // THEN the field should update with the entered value
    cy.get('#firstname-5e204c31-ede2-4976-a096-6919a081b2df').type('Test name');

    // WHEN the user clicks the 'Submit' button
    // THEN the system should not submit the form until all required fields are filled
    cy.get('.hs-button').click();

    // GIVEN the "First name" field is filled with a value
    // WHEN the user clicks 'Submit' again
    // THEN the system should only display errors for the remaining empty fields
    cy.get('input[name="firstname"]')
      .parent()
      .find('label.hs-error-msg')
      .should('not.exist');

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

    // WHEN the user closes the contact form
    // THEN the contact form should not be visible
    cy.get('.modal-scroller > .icon-x').click();
    cy.get('input[name="firstname"]').should('not.be.visible');
    cy.get('input[name="lastname"]').should('not.be.visible');
    cy.get('input[name="email"]').should('not.be.visible');
    cy.get('input[name="company"]').should('not.be.visible');

    // WHEN the user reopens the contact form
    // THEN the "First name" field should retain the value entered earlier
    cy.get('.text-wrapper > .button').click();
    cy.get('#firstname-5e204c31-ede2-4976-a096-6919a081b2df')
      .should('have.value', 'Test name');
  });
});
