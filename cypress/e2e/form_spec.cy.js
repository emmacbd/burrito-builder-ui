import OrderForm from "../../src/components/OrderForm/OrderForm"

describe('form input', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', { fixture: 'sampleorders.json' })
    cy.visit('http://localhost:3000/')
  })

  it('should display 3 orders on load', () => {
    cy.get('.order')
      .should('have.length', 3)
      .first().contains('Pat')
    cy.get('.order').last().contains('Alex')
  })

  it('Should see order form on page page', () => {
    cy.get('input[type="text"]')
    cy.get('button[name="beans"]')
    cy.get('button[name="steak"]')
    cy.get('button[name="carnitas"]')
    cy.get('button[name="sofritas"]')
    cy.get('button[name="lettuce"]')
    cy.get('button[name="queso fresco"]')
    cy.get('button[name="pico de gallo"]')
    cy.get('button[name="hot sauce"]')
    cy.get('button[name="guacamole"]')
    cy.get('button[name="jalapenos"]')
    cy.get('button[name="cilantro"]')
    cy.get('button[name="sour cream"]')
    cy.get('.order-submit')

  })

  it('Should throw an error if user tries to submit order without filling out name', () => {
    cy.get('button[name="queso fresco"]').click()
    cy.get('button[name="steak"]').click()
    cy.get('.order-submit').click()
    cy.get('.error-message').contains('Please Add Name to Your Order!')
    
  })


  it('Should be able to submit an order after filling out form and clicking submit order button', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', { fixture: 'order.json' })
    cy.get('input[type="text"]')
      .type('Tina Belcher')
      .should('have.value', 'Tina Belcher')
    cy.get('button[name="queso fresco"]').click()
    cy.get('button[name="steak"]').click()
    cy.get('.order-submit').click()
    cy.get('.order').last().contains('Tina Belcher')
  })


})


