describe('home page', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', {fixture: 'sampleorders.json'})
    cy.visit('http://localhost:3000/')
  })


  it('Should have a title of Burrito Builder', () => {
    cy.get('h1').contains('Burrito Builder')
  })

  it('Should see several orders already place', () => {
    cy.get('.order')
    .should('have.length', 3)
    .first().contains('Pat')
    cy.get('.order').last().contains('Alex')
  })
})