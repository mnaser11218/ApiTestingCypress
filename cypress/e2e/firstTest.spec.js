describe('test backend', () => {
  beforeEach('login', ()=>{
    // the fixture method will replace the response obj with the obj in tags.json 
   // cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/tags', {fixture: 'tags.json'})
    cy.intercept({method:'GET', path: 'tags'}, {fixture: 'tags.json'})
  //cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/tags', {fixture: 'tags.json'})
    cy.loginToApplication()

  })



  it.only('verify correct request and response',()=>{
    // first post an article then intercept the post requst

    // cy.intercept('POST', '**/articles', (req)=>{
    //     req.body.article.description = "This is a description 2"
    // }).as('postArticle')

    // here we are intercepting the post request to check the request and the response of the request"
    // you must intercept before performing the action, sequence is: first intercept, then action, then assertions. 

    cy.intercept('POST', '**/articles', (req)=>{
      // req.body.article.description = "This is a description 2";

      req.reply(res=>{
        console.log(res)

        expect(res.body.article.description).to.equal("This is a description")
        res.body.article.description = "This is a description 2";

      })
  }).as('postArticles')

    cy.contains('a', 'New Article').click()
    cy.get('[formcontrolname="title"]').type('this is a title')
    cy.get('[formcontrolname="description"]').type('This is a description')
    cy.get('[formcontrolname="body"]').type('this is a body')
    cy.get('[placeholder="Enter tags"]').type('this is a tag')
    cy.get('button').contains('Publish Article').click()

    cy.wait('@postArticles').then(xhr=>{
      expect(xhr.response.statusCode).to.equal(201)
      console.log(xhr)
      expect(xhr.request.body.article.body).to.equal('this is a body')
      expect(xhr.response.body.article.description).to.equal('This is a description 2')
      expect(xhr.request.body.article.tagList[0]).to.equal('this is a tag')
      expect(xhr.request.body.article.title).to.equal('this is a title')


      // expect(xhr.response)
    })
  })


  //test the custom tags from tags.json are displayed
  it('verify popular tags are displayed', ()=>{
    cy.log('we logged in')
    cy.get('[class="tag-list"]').should('contain', 'Cypress')
    .and('contain', 'automation')
    .and('contain', 'testing')
  })

// test to like an article in the global feed 
 it('testing like article display', ()=>{

  cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles/feed*', {"articles":[],"articlesCount":0} )

  cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles*', {fixture: 'articles.json'})

//   // one way of testing button
  // cy.get('app-article-preview').then(article=>{
  //  cy.wrap(article).first().find('button').should('contain', 3)
  // cy.wrap(article[1]).find('button').should('contain', 5)
  // })

 cy.get('app-article-list button').then(buttonList=>{
expect(buttonList[0]).to.contain('3')
expect(buttonList[1]).to.contain('5')
})
 
//   // second way of testing 

//   // cy.get('app-article-preview button').then(button=>{
//   //   cy.wrap(button[0]).should('contain', '2')
//   //   cy.wrap(button[1]).should('contain', '5')
//   // })
  
// // third way to test like count

// cy.get('app-article-preview button').then(likeCount=> {
//   expect(likeCount[0]).to.contain(3)
//   expect(likeCount[1]).to.contain(5)
// })

// // cy.get('app-article-preview button').then(likeCount=>{
// //   cy.wrap(likeCount[0]).click()
// //   cy.wrap(likeCount[1]).click()
// // })

cy.fixture('articles.json').then(file=>{
  const articleLink = file.articles[1].slug
  console.log(articleLink)
  
  file.articles[1].favoritesCount = 6;

  cy.intercept('POST', 'https://conduit-api.bondaracademy.com/api/articles/'+articleLink+ '/favorite', file).as('art')
 
  })
  cy.get('app-article-preview button').eq(1).click().should('contain', '6')

 })
})
// it('testing like article functionality', ()=>{

//   // first intercept get request to articles with articles.json
//   cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles*', {fixture: 'articles.json'})

//   // test article 1 in article contains like number
//     cy.get('app-article-preview button').then(button=>{
//       cy.wrap(button[0]).should('contain',3 )
//     })
//   // use fixture method to update the articles file 
//       // store article link
//       // update favorites count by one
//       // intercept post request to article/link/favorite with updated file
//     cy.fixture('articles.json').then(file=>{
//       const articleLink = file.articles[0].slug
//       file.articles[0].favoritesCount = 4;
//       cy.intercept('POST', 'https://conduit-api.bondaracademy.com/api/articles/' + articleLink + '/favorite', file).as('art')
//     })
//       // get button, click and it should contain updated number

//     cy.get('app-article-preview button').eq(0).click().should('contain', 4)
// })

// // test liking the second article

// it('testing like second article functionality', ()=>{
//   //intercept a get request for the articles 
//   cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles*', {fixture: 'articles'})
//   // check the second article has the correct like amount
//   cy.get('app-article-preview button').eq(1).should('contain', 5)
//   // using the fixture method, update the articles file to increase the like amount
//   cy.fixture('articles.json').then(file=>{
//    const urlLink = file.articles[1].slug;
//    console.log("url link: " + urlLink)
//    file.articles[1].favoritesCount = 6;
//          // store the url of the specific article
//       // intercept a post request to the endpoint url 
//       // click on button of second article 
//       // check if the second article like amount is updated. 

//    cy.intercept('POST', 'https://conduit-api.bondaracademy.com/api/articles/' + urlLink + '/favorite')
//    cy.get('app-article-preview button').eq(1).click().should('contain', 6)

//   })


// })



// it('testing cy intercept article post request', ()=>{
//   cy.intercept('POST', '**/articles', (req)=>{

//   })


// })

