describe('dashboard', () => {

beforeEach(() => {
  cy.intercept("GET","http://localhost:3001/api/v1/orders", {
    statusCode: 200,
    fixture:"order"
  } )
  cy.visit("http://localhost:3000/")
})


  it('should display order form title and previous orders on page load', () => {
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
})