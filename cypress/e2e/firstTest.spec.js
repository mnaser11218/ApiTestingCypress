describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  it.only('Login to application ', ()=>{
    cy.loginToApplication()
  })
})