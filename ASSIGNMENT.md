# Assignment

## Objective

Develop a user authentication system API using Node.js that includes user registration, login, and authentication functionalities. This assignment will test your skills in building RESTful APIs, interacting with databases, and implementing user authentication.

## Requirements

### Setup & Dependencies

Initialize a new Node.js project. \
Use Express.js as the web framework.\
Choose a database (MongoDB or any SQL database like PostgreSQL, MySQL). \
Use a package like bcrypt for password hashing and jsonwebtoken for generating tokens.

#### API'S

User Authentication API

Implement user registration (`POST /api/register`) with the following fields:\
Username (unique)\
Email (unique)\
Password (hashed)

Implement user login (`POST /api/login`) which Validates user credentials (username/email and password).
Generates a JWT token upon successful authentication.

Implement protected routes (`GET /api/profile`) that require authentication:\
Validate JWT token to grant access to the user's profile information.

## Database Models

Design and implement a user schema for your chosen database (e.g., MongoDB/Mongoose or SQL/Sequelize).
Define necessary CRUD operations (Create, Read) to interact with the user data.

## Security & Validation

Hash user passwords before storing them in the database.
Validate user input (e.g., email format, password strength) using middleware.
Implement error handling for various scenarios (e.g., duplicate usernames, invalid credentials).

## Additional Considerations

Use async/await for handling asynchronous operations.
Implement proper HTTP status codes and error responses.
Write clear and concise documentation for your API endpoints (e.g., using Swagger or Postman).
Deploy the API on a cloud platform (e.g., Heroku, AWS) and provide deployment instructions.

## Submission Guidelines

Fork this repository (provide the URL) to your GitHub account.
Complete the project within 72 hours.
Provide a README.md file with project documentation, including:
Project setup instructions.
Overview of technologies used.
Explanation of API endpoints and usage (e.g., with examples).
Deployment URL and any additional notes.

## Evaluation Criteria

Functionality: Does the API handle user registration, login, and authentication correctly?
Code Quality: Is the code well-structured, readable, and maintainable?
Security: Are passwords hashed securely? Is token-based authentication implemented correctly?
Error Handling & Testing: How robust is the error handling, and are there unit tests or integration tests?
Deployment: Is the API deployed and accessible as per instructions?

## Note

You may use any additional libraries or packages as needed.
Be prepared to explain your design decisions and any challenges faced during the interview.
Good luck with your assignment! We look forward to reviewing your submission.
