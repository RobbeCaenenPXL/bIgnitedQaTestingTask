describe('BIS Frontend Component Existence', () => {
  beforeEach(() => {
    cy.visit('https://d2r3v7evrrggno.cloudfront.net');
    // Opens the BIS section to reveal the dropdown and other controls
    cy.get('#\\/bis-header-button').click();
  });

  it('displays all necessary frontend components for BIS generation', () => {
    // Check if the Gender Known radio button exists
    cy.get('input[type="radio"][id="\\/bis-yes-0"]').should('exist');

    // Check if the Birthdate Known radio button exists
    cy.get('input[type="radio"][id="\\/bis-yes-1"]').should('exist');

    // Check if the date input exists
    cy.get('#\\/bis-2').should('exist');

    // Check if the generate button exists
    cy.get('#\\/bis-generate-button').should('exist');

    // Check if the clear button for the date input exists
    cy.get('#\\/bis-2-clear-button').should('exist');

    // Check if the More/Less Info link exists
    cy.get('#bis').should('exist');

    // Optionally, click the generate button to reveal BIS text and check if it exists
    cy.get('#\\/bis-generate-button').click();
    cy.get('#bis-text').should('exist');

    // Add checks for any other specific BIS section components as necessary
  });
});

describe('BIS Number Generation', () => {
  beforeEach(() => {
    cy.visit('https://d2r3v7evrrggno.cloudfront.net');
    // Open the BIS section to reveal the controls
    cy.get('#\\/bis-header-button').click();


  });

  it('generates a BIS number when the date is known and gender is known', () => {
    // Check the 'Yes' radio button for isGenderKnown
    cy.wait(500);
    cy.get('input[type="radio"][id="\\/bis-yes-0"]').check(); 
    // Check the 'Yes' radio button for isBirthdateKnown
    cy.get('input[type="radio"][id="\\/bis-yes-1"]').check(); 
    // Enter a known date
    cy.get('#\\/bis-2').type('1980-01-01');   
    // Click the generate button
    cy.get('#\\/bis-generate-button').click();
    // Validate that a BIS number appears and follows the expected pattern
    cy.get('#bis-text').should('not.be.empty');
});


    it('generates a BIS number when the date is unknown but gender is known', () => {
      cy.wait(500);
      cy.get('input[type="radio"][id="\\/bis-yes-0"]').check();
      cy.get('input[type="radio"][id="\\/bis-no-1"]').check();
      // No need to enter a date since it's unknown
      cy.get('#\\/bis-generate-button').click();
      cy.get('#bis-text').should('not.be.empty');
    });

    it('generates a BIS number when the date is known but gender is unknown', () => {
      cy.wait(500);
      cy.get('input[type="radio"][id="\\/bis-no-0"]').check();
      cy.get('input[type="radio"][id="\\/bis-yes-1"]').check();
      cy.get('#\\/bis-2').type('1980-01-01');
      cy.get('#\\/bis-generate-button').click();
      cy.get('#bis-text').should('not.be.empty');
    });

    it('generates a BIS number when both date and gender are unknown', () => {
      cy.wait(500);
      cy.get('input[type="radio"][id="\\/bis-no-0"]').check();
      cy.get('input[type="radio"][id="\\/bis-no-1"]').check();
      // No need to enter a date since it's unknown
      cy.get('#\\/bis-generate-button').click();
      cy.get('#bis-text').should('not.be.empty');
    });

    it('clears the amount field when the clear button is clicked', () => {
      cy.wait(200);
      // Interact with the amount input, assuming it's similar to the IBAN section
      cy.get('#\\/bis-3').type('2');
      cy.get('#\\/bis-3').should('have.value', '2');
      // Click the clear button, adjust if the BIS section has a different setup
      cy.wait(500);
      cy.get('#\\/bis-3-clear-button').click();
      // The field should be empty
      cy.get('#\\/bis-3').should('have.value', '');
    });

    it('clears the date field when the date clear button is clicked', () => {
      cy.wait(200);
      
      // Assuming a setup where you need to select a specific condition before entering a date
      // For instance, if the date should be known and gender should be known/unknown
      // These conditions might affect whether the date field is enabled
      cy.get('input[type="radio"][id="\\/bis-yes-0"]').check(); // Gender is known
      cy.get('input[type="radio"][id="\\/bis-yes-1"]').check(); // Birthdate is known
      
      // Enter a known date
      cy.get('#\\/bis-2').type('1980-01-01');
    
      // Ensure the date is entered correctly
      cy.get('#\\/bis-2').should('have.value', '1980-01-01');

      cy.wait(500);
    
      // Click the clear button associated with the date input field
      // Update the selector to target the clear button for the date input
      cy.get('#\\/bis-2-clear-button').click();
    
      // Verify the date input field is cleared
      cy.get('#\\/bis-2').should('have.value', '');
    });

    // Additional test for checking the disabled state of the date input when isBirthdateKnown is 'No'
    it('disables the date input when the birthdate is not known', () => {
      cy.wait(500);
      cy.get('input[type="radio"][id="\\/bis-no-1"]').check();
      cy.get('#\\/bis-2').should('be.disabled');
    });

    it('displays a copy button after generating a BIS number', () => {
      cy.wait(200);
      // Replace with the actions specific to generating a single BIS number
      cy.get('#\\/bis-generate-button').click();
      // Check for the copy button inside the '#bis-text' container with the specific class
      cy.get('#bis-text').find('button.btn-copy').should('be.visible');
    });

    it('shows a toast message after copying the BIS number', () => {
      cy.wait(200);
      // Generate a BIS number first
      cy.get('#\\/bis-generate-button').click();
    
      // Wait for the BIS number to be generated and the copy button to become visible
      cy.get('#bis-text').find('button.btn-copy').should('be.visible');
      
      // Click the copy button
      cy.get('#bis-text').find('button.btn-copy').click();
      cy.wait(500) // Adjust the wait as necessary for your application's behavior
    
      // Check for the toast message alert after clicking the copy button
      cy.get('div.toast-success').contains('You successfully copied the content!')
        .should('be.visible');
    });

    it('toggles additional information when More/Less Info is clicked', () => {
      cy.wait(200);
      // Click the 'More info' link using its ID
      // Update the selector if the BIS section uses a different one
      cy.get('#bis').click();
      // Verify that the additional information is now visible
      // Update the content check to reflect BIS specific info
      cy.get('#bis-collapseExample').should('be.visible').and('contain', 'The BIS number derives');
      // Optionally, confirm that the 'More info' text has changed to 'Less info'
      cy.get('#bis').should('contain', 'Less info');
      cy.wait(500); // Allow time for the UI to update
      // Click the 'Less info' link
      cy.get('#bis').click();
      // Check if the additional information box is hidden after clicking 'Less Info'
      cy.get('#bis-collapseExample').should('not.be.visible');
      // Verify that the text has changed back to 'More info'
      cy.get('#bis').should('contain', 'More info');
    });

    it('does not generate a BIS number if isBirthdateKnown is true but no birth date is filled in', () => {
      // Click the radio button to set isBirthdateKnown to 'Yes'
      cy.get('input[type="radio"][id="\\/bis-yes-1"]').check();
      
      // Assuming that clicking the generate button without entering a date should result in no BIS number
      cy.get('#\\/bis-generate-button').click();
    
      // Check that #bis-text is empty or displays a placeholder message indicating no number has been generated
      // Depending on how your application indicates that a number has not been generated, you might check for:
      // - An empty field
      // - Placeholder text
      // - An error message within the field
      cy.get('#bis-text').should('be.empty');
    });
    
  });
  


