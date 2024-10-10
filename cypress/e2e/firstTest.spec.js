describe('test backend', () => {
  beforeEach('login', ()=>{
    cy.loginToApplication()

  })

  it.only('verify correct request and response',()=>{
    // first post an article then intercept the post requst

    cy.intercept('POST', 'https://conduit-api.bondaracademy.com/api/articles/').as('postArticle')


    cy.contains('a', 'New Article').click()
    cy.get('[formcontrolname="title"]').type('this is a title')
    cy.get('[formcontrolname="description"]').type('this is a description')
    cy.get('[formcontrolname="body"]').type('this is a body')
    cy.get('[placeholder="Enter tags"]').type('this is a tag')
    cy.get('button').contains('Publish Article').click()
    cy.wait('@postArticle')
    cy.get('@postArticle').then(xhr=>{
      expect(xhr.response.statusCode).to.equal(201)
      // expect(xhr.response)
    })
  })

})