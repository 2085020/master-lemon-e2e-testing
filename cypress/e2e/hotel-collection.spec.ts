import { HotelEntityApi } from '../../src/pods/hotel-collection/api';

describe('hotel collection spec', () => {
  it('should show all the hotels', () => {
    //Arrange
    cy.loadAndVisit('/hotel-collection', [{ path: '/api/hotels' }]);
    cy.findAllByRole('listitem').should('have.length', 10);
  });

  it('should show all the hotels por lo menos 1', () => {
    //Arrange
    cy.loadAndVisit('/hotel-collection', [{ path: '/api/hotels' }]);
    cy.findAllByRole('listitem').should('have.length.greaterThan', 0);
  });

  it('should show all the hotels por lo us intercept', () => {
    //Arrange
    cy.fixture('hotels').then((hotels) => {
      cy.intercept('GET', '/api/hotels', hotels).as('fetchHotels');
    });
    //ACT
    cy.visit('/hotel-collection');
    //Assert
    cy.wait('@fetchHotels');
    cy.findAllByRole('listitem').should('have.length', 2);
  });

  it('should show all the hotels por lo us intercept v2', () => {
    //Arrange
    cy.loadAndVisit('/hotel-collection', [
      { path: '/api/hotels', fixture: 'hotels.json' },
    ]);

    cy.findAllByRole('listitem').should('have.length', 2);
  });
});
