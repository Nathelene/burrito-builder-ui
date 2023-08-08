describe('dashboard', () => {

beforeEach(() => {
  cy.intercept("GET","http://localhost:3001/api/v1/orders", {
    statusCode: 200,
    fixture:"order"
  }).as('order')
  cy.visit("http://localhost:3000/")
})


  
it('should display order form title and previous orders on page load', () => {
   cy.wait("@order")
   cy.get(".App").contains("h1", "Burrito Builder")
     .get("form").should("be.visible")
     .get("section").should("be.visible")
     .get("section").children().contains('h3', 'Pat')
     .get("section").children().contains('li', 'beans')
     .get("section").children().contains('li', 'lettuce')
     .get("section").children().contains('li', 'carnitas')
     .get("section").children().contains('li', 'queso fresco')
     .get("section").children().contains('li', 'jalapeno')
  })

  it('should display order as its being built and add it on submit', () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      body: {
        name: 'Jen',
        ingredients: ['beans','lettuce']
      }
    }).as('POST')
    cy.wait("@order")
    cy.get(".App")
      .get("form").find('[name="name"]').type('Jen')
      .get("form").find('[name="beans"]').click()
      .get("form").find('[name="lettuce"]').click()
      .get(".submit-order").click()
    cy.wait('@POST')
      .get("section").children().should("have.length", 2)
      .get("section").children().last().contains("h3", "Jen").should("be.visible")
      .get("section").children().last().contains("li", "beans").should("be.visible")
      .get("section").children().last().contains("li", "lettuce").should("be.visible")
   })

   it('An order cannot be submitted without a name and at least one ingredient', () => {
    cy.wait("@order")
    cy.get(".App")
      .get(".submit-order").click()
      .get("section").children().should("have.length", "1")
      .get("form").find('[name="beans"]').click()
      .get(".submit-order").click()
      .get("section").children().should("have.length", "1")
   })

  
})