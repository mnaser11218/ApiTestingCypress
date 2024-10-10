describe('test backend', () => {
  beforeEach('login', ()=>{
    cy.loginToApplication()

  })

  it.only('verify correct request and response',()=>{
    // first post an article then intercept the post requst
    cy.contains('a', 'New Article').click()
    cy.get('[formcontrolname="title"]').type('this is a title')
  })

})