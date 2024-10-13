describe('test backend', () => {
  beforeEach('login', ()=>{
    // the fixture method will replace the response obj with the obj in tags.json 
    cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/tags', {fixture: 'tags.json'})
    cy.loginToApplication()

  })

  it('verify correct request and response',()=>{
    // first post an article then intercept the post requst

    cy.intercept('POST', 'https://conduit-api.bondaracademy.com/api/articles/').as('postArticle')


    cy.contains('a', 'New Article').click()
    cy.get('[formcontrolname="title"]').type('this is a title')
    cy.get('[formcontrolname="description"]').type('this is a description')
    cy.get('[formcontrolname="body"]').type('this is a body')
    cy.get('[placeholder="Enter tags"]').type('this is a tag')
    cy.get('button').contains('Publish Article').click()

    cy.wait('@postArticle').then(xhr=>{
      expect(xhr.response.statusCode).to.equal(201)
      console.log(xhr)
      expect(xhr.request.body.article.body).to.equal('this is a body')
      expect(xhr.request.body.article.description).to.equal('this is a description')
      expect(xhr.request.body.article.tagList[0]).to.equal('this is a tag')
      expect(xhr.request.body.article.title).to.equal('this is a title')


      // expect(xhr.response)
    })
  })
  // test the custom tags from tags.json are displayed
  it('verify popular tags are displayed', ()=>{
    cy.log('we logged in')
    cy.get('[class="tag-list"]').should('contain', 'Cypress')
    .and('contain', 'automation')
    .and('contain', 'testing')
  })

  // test to like an article in the global feed 
it.only('testing like article display', ()=>{

  cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles/feed*', {"articles":[],"articlesCount":0} )

  cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles*', {fixture: 'articles.json'})


})

})