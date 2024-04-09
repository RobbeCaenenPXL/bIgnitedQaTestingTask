describe('IBAN Frontend Component Existence', () => {
  beforeEach(() => {
    cy.visit('https://d2r3v7evrrggno.cloudfront.net');
    // Opens the IBAN section to reveal the dropdown and other controls
    cy.get('#\\/iban-header-button').click();
  });

  it('displays all necessary frontend components', () => {
    // Check if the IBAN dropdown exists
    cy.get('#\\/iban-0').should('exist');

    // Check if the IBAN generate button exists
    cy.get('#\\/iban-generate-button').should('exist');

    // Check if the IBAN amount input exists
    cy.get('#\\/iban-1').should('exist');

    // Check if the IBAN clear button exists
    cy.get('#\\/iban-1-clear-button').should('exist');

    // Check if the IBAN More/Less Info link exists
    cy.get('#iban').should('exist');

    // Click the generate button to reveal iban-text
    cy.get('#\\/iban-generate-button').click();

    // Check if iban-text exists (even if it's initially invisible)
    cy.get('#iban-text').should('exist');
  });
});


describe('IBAN Generator Tests', () => {
  beforeEach(() => {
    cy.visit('https://d2r3v7evrrggno.cloudfront.net');
    // Opens the IBAN section to reveal the dropdown and other controls
    cy.get('#\\/iban-header-button').click();
  });

  it('allows a country to be selected from the IBAN dropdown', () => {
    cy.get('#\\/iban-0').select('Belgium');
    // Confirm that 'Belgium' is now the selected value in the dropdown
    cy.get('#\\/iban-0').should('have.value', 'Belgium');
  });

  it('generates an IBAN number when a country is selected', () => {
    // Select Belgium from the dropdown
    cy.get('#\\/iban-0').select('Belgium');
    cy.get('#\\/iban-generate-button').click(); 
    // Validate that an IBAN number appears
    cy.get('#iban-text').should('not.be.empty').and((iban) => {
      expect(iban.text().trim()).to.match(/BE\d{2}\s?\d{4}\s?\d{4}\s?\d{4}/); // This regex needs to match the expected IBAN format
    });
  });

  it('generates multiple IBAN numbers if a quantity is specified', () => {
    // Actions to generate an IBAN first
    cy.get('#\\/iban-0').select('Belgium');
    cy.get('#\\/iban-1').type('3');
    cy.get('#\\/iban-generate-button').click();
    // Validate that the IBAN numbers apear 3 times exactly
    cy.get('#iban-text').invoke('text').should('match', /(BE\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?){3}/);
  });

  it('displays a copy button after generating an IBAN', () => {
    // Actions to generate an IBAN first
    cy.get('#\\/iban-0').select('Belgium');
    cy.get('#\\/iban-1').type('1'); // Type '1' to generate a single IBAN
    cy.get('#\\/iban-generate-button').click();
    // Check for the copy button inside the '#iban-text' box with the specific class
    cy.get('#iban-text').find('button.btn-copy').should('be.visible');
  });

  it('clears the amount field when the clear button is clicked', () => {
    // Interact with the amount input
    cy.get('#\\/iban-1').type('2'); // Typing '2' into the amount input
    cy.get('#\\/iban-1').should('have.value', '2'); // Verifying that '2' was entered
  
    // Click the clear button
    cy.get('#\\/iban-1-clear-button').click();
    // The field should be empty
    cy.get('#\\/iban-1').should('have.value', ''); 
  });

  it('toggles additional information when More/Less Info is clicked', () => {
    // Click the 'More info' link using its ID
    cy.get('#iban').click();
  
    // Verify that the additional information is now visible
    cy.get('#iban-collapseExample').should('be.visible').and('contain', 'The IBAN number is');
  
    // Optionally, confirm that the 'More info' text has changed to 'Less info'
    cy.get('#iban').should('contain', 'Less info');

    // Add a small wait between the clicks to allow time for the UI to update
    cy.wait(500); // Adjust the duration as needed

    // Click the 'Less info' link
    cy.get('#iban').click();
  
    // Check if the additional information box is hidden after clicking 'Less Info'
    cy.get('#iban-collapseExample').should('not.be.visible');
  
    // Verify that the text has changed back to 'More info'
    cy.get('#iban').should('contain', 'More info');
  });

  it('shows a toast message after copying the IBAN', () => {
    // Generate an IBAN first
    cy.get('#\\/iban-0').select('Belgium');
    cy.get('#\\/iban-generate-button').click();
    
    // Wait for the IBAN to be generated and the copy button to become visible
    cy.get('#iban-text').find('button.btn-copy').should('be.visible');
    
    // Click the copy button
    cy.get('#iban-text').find('button.btn-copy').click();
    cy.wait(500)
    // Check for the toast message alert after clicking the copy button
    cy.get('div.toast-success').contains('You successfully copied the content!')
      .should('be.visible');

  });
  
  
});
