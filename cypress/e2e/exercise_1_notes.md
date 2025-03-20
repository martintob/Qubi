# Qubika Website Automation

This project automates the tests for the Qubika **Contact Us** form. The tests ensure that various elements are visible, interactive, and handle user input correctly. It also tests form validation and submission logic. 

The tests are written using **Cypress**, a JavaScript-based end-to-end testing framework. 

The test script begins by visiting the Qubika website before each test (`beforeEach` block). 

The main test (`it`) validates the website and performs actions on the Contact Us form by checking if various form fields (e.g., firstname, lastname, email, company) are visible, ensuring dropdown options contain expected values, and interacting with the form elements like checkboxes and the submit button. 

Additionally, the tests check if error messages are displayed when the required fields are left blank and the user tries to submit the form. 

The tests also validate that the correct error message appears for each required field. 
