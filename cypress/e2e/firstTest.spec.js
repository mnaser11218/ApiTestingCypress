describe('test backend', () => {
  beforeEach('login', ()=>{
    // the fixture method will replace the response obj with the obj in tags.json 
   // cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/tags', {fixture: 'tags.json'})
    cy.intercept({method:'GET', path: 'tags'}, {fixture: 'tags.json'})
    cy.loginToApplication()

  })

  it.only('verify correct request and response',()=>{
    // first post an article then intercept the post requst

    // cy.intercept('POST', '**/articles', (req)=>{
    //     req.body.article.description = "This is a description 2"
    // }).as('postArticle')

    // here we are intercepting the post request to check the request and the response of the request"

    cy.intercept('POST', '**/articles', (req)=>{
      req.reply(res=>{
        console.log(res)
        expect(res.body.article.description).to.equal("this is a description")
      })
  }).as('postArticle')

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
  it.only('verify popular tags are displayed', ()=>{
    cy.log('we logged in')
    cy.get('[class="tag-list"]').should('contain', 'Cypress')
    .and('contain', 'automation')
    .and('contain', 'testing')
  })

  // test to like an article in the global feed 
it('testing like article display', ()=>{

  cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles/feed*', {"articles":[],"articlesCount":0} )

  cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles*', {fixture: 'articles.json'})

  // one way of testing button
  // cy.get('app-article-preview').then(article=>{
  //  cy.wrap(article).first().find('button').should('contain', 2)
  // cy.wrap(article[1]).find('button').should('contain', 5)
  // })

  // second way of testing 

  // cy.get('app-article-preview button').then(button=>{
  //   cy.wrap(button[0]).should('contain', '2')
  //   cy.wrap(button[1]).should('contain', '5')
  // })
  
// third way to test like count

cy.get('app-article-preview button').then(likeCount=> {
  expect(likeCount[0]).to.contain(2)
  expect(likeCount[1]).to.contain(5)
})

// cy.get('app-article-preview button').then(likeCount=>{
//   cy.wrap(likeCount[0]).click()
//   cy.wrap(likeCount[1]).click()
// })

cy.fixture('articles.json').then(file=>{
  const articleLink = file.articles[0].slug
  console.log(articleLink)
  file.articles[0].favoritesCount = 3;
  file.articles[1].favoritesCount = 6;

  cy.intercept('POST', 'https://conduit-api.bondaracademy.com/api/articles/'+articleLink+ '/favorite', file).as('art')
 // cy.get('app-article-preview button').eq(0).click()
  // cy.get('app-article-preview button').then(button=>{
  //   cy.wrap(button[0]).should('contain', 3)
  // })

})


// cy.get('app-article-preview button').eq(0).click().should('contain', 3)
// cy.get('app-article-preview button').eq(1).click().should('contain', 6)

// cy.get('app-article-preview button').eq(0).click().should('contain', 45)


})


})