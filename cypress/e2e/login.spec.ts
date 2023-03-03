describe('Login specs', () => {
  it('visit login page', () => {
    cy.visit('/');
  });

  it('focus on name when click', () => {
    // ARRANGE

    // ACT
    cy.visit('/');
    cy.findByRole('textbox').click();
    // ASSERT
    cy.findByRole('textbox').should('have.focus');
  });

  it('window alert appear on error login', () => {
    // ARRANGE
    const user = 'admin';
    const password = '1234';
    cy.on('window:alert', cy.stub().as('alertStub'));
    // ACT
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Password').as('passwordInput');
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    // ASSERT
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.findByRole('button', { name: 'Login' }).click();
    cy.get('@alertStub').should(
      'have.been.calledWith',
      'invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.'
    );
  });

  it('on ok credentials should navigate to the following url', () => {
    // ARRANGE
    const user = 'admin';
    const password = 'test';

    // ACT
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Password').as('passwordInput');
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    // ASSERT
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.findByRole('button', { name: 'Login' }).click();

    cy.url().should('eq', 'http://localhost:8080/#/hotel-collection');
  });
});


