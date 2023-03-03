describe('hotel edit spec', () => {
  it('should show all the hotels', () => {
    //Arrange
    cy.loadAndVisit('/hotel-collection', [{ path: '/api/hotels' }]);

    cy.findAllByRole('button', {name: 'Edit hotel'}).then(
      ($buttons) => {
        $buttons[1].click();
    });

    cy.url().should('equal', 'http://localhost:8080/#/hotel-edit/2')
  });

  it('should update name whete if edits an hotel and click save', () => {
    //Arrange
     cy.loadAndVisit(
      '/hotel-collection',
      [
        { path: '/api/hotels', alias: 'loadHotels' },
        { path: '/api/hotels/2' },
        { path: '/api/cities' },
      ],
      () => {
        cy.findAllByRole('button', { name: 'Edit hotel' }).then(($buttons) => {
          $buttons[1].click();
        });
      }
    );
    cy.findByLabelText('Name').should('not.have.value', "")

    cy.findByLabelText('Name').clear().type("Updated hotel 2");

    cy.findByRole('button', {name: 'Save'}).click();

    cy.wait('@loadHotels');
    cy.findByText('Updated hotel 2');

  });
})
