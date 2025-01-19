// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('loginToApplication', ()=>{
    // modify to make headless authentication request
   // user credentials
    const userCredentials = {"user": 
        {
            "email": "mnaser11218@gmail.com",
            "password": "asd123"
            }
        }
        // making a post request to login with user credentials
        cy.request('POST', 'https://conduit-api.bondaracademy.com/api/users/login',userCredentials)
  .its('body').then(body=>{
    // store token and save it as an alias named token to call it in other files
    const token = body.user.token;
    cy.wrap(token).as('token')

    // once you have logged in, now store the token in the localstorage by using the onBeforeLoad method to stay logged in.
    cy.visit('/', {
        onBeforeLoad (win) {
            win.localStorage.setItem('jwtToken', token)
        }
    })
  })


})

Cypress.Commands.add('openHomePage', ()=>{
    cy.visit('/')
})