
# Cypress Backend Testing: Conduit API

Welcome to this **Cypress Backend Testing** project! 🚀  
This project is a hands-on example of how to use **Cypress** to automate the testing of backend functionality in a web application. In particular, we’re going to work with the **Conduit API**, a simple API for testing out CRUD operations (Create, Read, Update, Delete) and other real-world backend scenarios.

In this project, we focus on verifying API requests, mocking responses, simulating user actions, and validating UI updates after API interactions. It's a great way to practice integrating backend and frontend testing.


## 🧪 Test Scenarios

### Here's what we're testing in this project:

#### 1. **Verify Correct Request and Response**

In this test, we make sure that when we post a new article:

- The **POST /articles** request is intercepted.
- We validate the request body and ensure the server’s response is correct.
- The article’s **title**, **description**, **body**, and **tags** are thoroughly checked.

#### 2. **Check the Article Like Counts**

This test verifies that when we view articles, the like counts are displayed correctly:

- We mock the `GET /articles` response using a fixture (`articles.json`).
- We ensure that the like counts for each article match what is returned from the API.

#### 3. **Test the Like Button Functionality**

In this test, we simulate a user liking an article:

- We intercept the `POST /articles/:slug/favorite` request and ensure the like count increases by 1 after clicking the like button.
- After interacting with the UI, we validate that the UI reflects the updated like count.

#### 4. **Test Like on the Second Article**

This test specifically targets the second article on the feed to ensure the like functionality works for different articles:

- Similar to the previous test, but we focus on the second article.
  
#### 5. **Intercepting POST Requests for Articles**

Here we intercept a **POST /articles** request to test how we can modify the request body before it’s sent. We simulate various article-related actions while checking for proper data handling.

---

## 📜 Cypress Test Code Breakdown

### 1. **Login (`beforeEach` hook)**

To start off every test, we log into the application. We use **Cypress custom commands** to simulate the login action, which is customized for your app.

We also use `cy.intercept()` to mock the `GET /tags` API response with data from the `tags.json` fixture, which ensures we’re working with predefined data for consistency across tests.

### 2. **Intercepting API Requests**

The magic of Cypress lies in its ability to intercept and modify API requests. In our tests, we use `cy.intercept()` to:

- Modify the request body before it’s sent to the server.
- Modify the response body to match expected test scenarios.
- Check that the frontend UI updates according to the response.

For example, in the **POST /articles** test, we intercept the request to change the article description before the request gets sent and validate the server’s response.

### 3. **Fixture Files**

In the `cypress/fixtures/` folder, we store mock data such as `tags.json` and `articles.json`:

- These mock files simulate realistic responses from the API, making it easier to run tests without relying on a live server.
- They help us simulate different API states, like empty article feeds or articles with varying like counts.

### 4. **Assertions**

Assertions play a critical role in verifying that the request and response are correct:

- We use Cypress’ built-in assertion library to validate the API responses.
- For example: `expect(res.body.article.description).to.equal("This is a description 2")`.

---
## 🛠 Project Setup

---


### Prerequisites

Before you get started, make sure you have the following installed:

- **Node.js** (preferably v14 or above)
- **npm** (you’ll use this to install dependencies)
- **Cypress** (of course, it’s our main tool here!)

### Installation

1. Clone this repo to your local machine:
   ```bash
   git clone https://github.com/your-repository-name/cypress-backend-testing.git
   ```

2. Navigate into the project folder:
   ```bash
   cd cypress-backend-testing
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```

4. If Cypress isn’t installed, you can manually install it:
   ```bash
   npm install cypress --save-dev
   ```

5. Finally, launch Cypress with the following command:
   ```bash
   npx cypress open
   ```


## 🏃‍♀️ Running the Tests

To run the tests locally:

1. Make sure your backend server (API) is running locally at `http://localhost:3000` or wherever your API is hosted.
2. Start Cypress in interactive mode by running:
   ```bash
   npx cypress open
   ```

3. You can also run the tests headlessly (without the UI) with:
   ```bash
   npx cypress run
   ```

---

## 🛠 Troubleshooting

If you run into issues, here are a couple of common scenarios:

- **Missing `.next` build directory**:  
   If you’re using a Next.js app, be sure to run `next build` before starting your app in production mode.

- **API Server not Accessible**:  
   Ensure that your API is running locally on the correct port (usually `3000`). If you're running a mock server, check that it's correctly set up to handle the requests.

---

## 🔒 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more details.

---

Feel free to fork this repo and customize it to your own backend testing needs. Happy testing! 🎉

---

```

---
