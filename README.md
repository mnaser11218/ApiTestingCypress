# 🚀 Cypress E2E API Tests

Welcome to the **Cypress E2E API Tests** repository! This project contains a collection of tests designed to ensure smooth interactions with the 
 [Conduit Academy](https://conduit.bondaracademy.com/) website and backend API. Using Cypress, we verify functionalities such as logging in, creating articles, checking response statuses, and interacting with the global feed. Let’s dive in!

---
# 📖 Table of Contents

- 🔧 [**Test Setup**](#-test-setup)
- 🧪 [**Tests**](#-tests)
  - ✔️ [**Verify Correct Request and Response**](#-verify-correct-request-and-response)
  - 🏷️ [**Verify Popular Tags are Displayed**](#-verify-popular-tags-are-displayed)
  - ❤️ [**Test Like Article Display**](#-test-like-article-display)
  - 🗑️ [**Delete a New Article in Global Feed**](#-delete-a-new-article-in-global-feed)
- 📁 [**Test Data**](#-test-data)
- ⚙️ [**Prerequisites**](#-prerequisites)
- 🔑 [**Custom Cypress Command for Login**](#-custom-cypress-command-for-login)

---

### How it Works:
- **🔧 Test Setup** - This section covers the environment setup and configurations before running the tests.
- **🧪 Tests** - The tests section lists the key tests to ensure proper functionality and data validation.
  - **✔️ Verify Correct Request and Response**: Ensures the request and response match expectations.
  - **🏷️ Verify Popular Tags**: Ensures that popular tags are correctly displayed on the page.
  - **❤️ Test Like Article Display**: Verifies that the like button functionality works as expected.
  - **🗑️ Delete Article**: Demonstrates the creation and deletion of an article using the API.
- **📁 Test Data** - Contains information about required test data files.
- **⚙️ Prerequisites** - Explains what you need to set up before running the tests.
- **🔑 Custom Cypress Command for Login** - Describes how to create and use a custom login command.
---

## 🔧 Test Setup

Before running the tests, the following setup is executed:

- **Login**: A custom headless login function automatically handles logging into the application.
- **Intercept API Calls**: Intercepts the API call to the tags endpoint and replaces the response with data from a fixture (`tags.json`).
- **Intercept POST Articles**: Intercepts the POST request for creating articles and verifies both the request and response to ensure the correct data flow with data from a fixture ('articles.json').


---

## 🧪 Tests

### ✔️ Verify Correct Request and Response when POSTING a new article Using the Intercept Method

This test ensures that the article creation flow works as expected:

- **Intercepts** the POST request when creating an article.
- **Submits** a new article with a title, description, body, and tags.
- **Verifies** that the request and response contain the correct data, including the status code and article details.


https://github.com/user-attachments/assets/15ff7697-1aac-4cbb-ba7b-62862c751020

---

### 🏷️ Verify Popular Tags are Displayed 

This test ensures that the popular tags from the `tags.json` fixture are correctly displayed on the page.

- What’s tested? Popular tags like **Cypress**, **Automation**, and **Testing** should be visible on the page.


https://github.com/user-attachments/assets/e112292f-50dc-4e25-bbb0-cb9648028e5f


---

### ❤️ Test Like Article Display

This test checks the functionality of the "like" button on articles in the global feed using the intercept, and fixture method to update like count:

- **Verifies** that the like count is displayed correctly.
- **Ensures** that clicking the like button updates the like count.
  
> **Additional Notes**: The fixture is updated with a new like count to simulate interaction.




https://github.com/user-attachments/assets/94153d36-2fe6-4dde-a0eb-a329a25174ad


---

### 🗑️ Delete a New Article in Global Feed

This test sequence demonstrates how to:

- Create an article via an API request.
- Verify its creation.
- Delete the article and confirm it is no longer visible in the global feed.


https://github.com/user-attachments/assets/5498ad51-9ae4-4303-badd-9240f7e86656


---

## 📁 Test Data

- **`tags.json`**: A fixture containing a list of popular tags for testing tag display functionality.
- **`articles.json`**: A fixture containing a list of articles with like counts and other relevant details for testing article interactions.
<img width="1065" alt="Screenshot 2025-01-20 at 12 59 37 PM" src="https://github.com/user-attachments/assets/82646e7d-3bb7-44f2-a687-fd7bcf4afb11" />

---

## ⚙️ Prerequisites

Before running these tests, ensure you have the following:

- **Cypress**: Ensure Cypress is installed and set up in your project.
- **API URL & Token**: Provide a valid API URL and authentication token via environment variables.
  
  Example (`cypress.json`):
  ```json
  {
    "env": {
      "apiURL": "https://your-api-url.com",
      "token": "your-auth-token"
    }
  }
  ```

> **Tip**: Don't forget to configure the authentication token for the login process!

---

## 🔑 Custom Cypress Command for Login

### 📖 Overview

The **`loginToApplication`** command automates the process of logging into the app. It sends a POST request with user credentials, stores the returned JWT token, and saves it to `localStorage` for persistent login across tests.
<img width="958" alt="Screenshot 2025-01-20 at 1 00 31 PM" src="https://github.com/user-attachments/assets/a1a6c67c-d140-4797-ac43-9af49d6bf085" />

### 🚀 How It Works

- **User Credentials**: These are fetched securely from Cypress environment variables (e.g., `Cypress.env("username")` and `Cypress.env("password")`).
- **POST Request**: A POST request is sent to `/api/users/login` to authenticate the user.
- **Token Storage**: Upon a successful login, we store the JWT token as an alias using `cy.wrap(token).as('token')` for easy access in the other tests.
- **LocalStorage**: The JWT token is stored in `localStorage` to keep the user logged in during the test execution.

### 🎯 How to Use

After adding this custom command, you can easily call `cy.loginToApplication()` in your tests to handle login automatically before each test.

Example: Add it to your `beforeEach` hook to ensure login before each test:

```javascript
beforeEach('Login to Application', () => {
  cy.loginToApplication();
});
```

This ensures every test starts with the user logged in, so you don’t have to write repetitive login code in every test case.

### ⭐ Benefits

- **Cleaner Code**: Abstracting the login process into a custom command makes tests cleaner and more maintainable.
- **Faster Execution**: Automating login saves time, speeding up your test execution.
- **Easy Maintenance**: If the login process changes, just update the command, and all tests will be updated automatically.

---

## ✨ License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Contributors

A big thank you to all contributors! Feel free to open issues or submit pull requests. :octocat:

---

### Fun Section: Animated Badge Demo! ✨


![Cypress](https://img.shields.io/badge/Cypress-Test%20Automation-4A6F78.svg)

---
