# Pull Request Management System (MERN Stack)

## Overview

This project implements a **Pull Request Management System** using the **MERN stack** (MongoDB, Express, React, Node.js). It allows users to create, review, approve, and reject pull requests in a collaborative software development environment.

## Features

- **User Authentication & Authorization**: Users can sign up, log in, and authenticate using JWT-based token.
- **Role-based Access Control**: Roles include Admin, Reviewer, and Developer.
- **Pull Request Management**: Users can create, view, update, and delete pull requests.
- **Commenting & Reviewing**: Users can comment on pull requests and submit reviews.
- **Approval System**: Users can approve or reject pull requests.

## Technologies Used

- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Project Setup

- **Prerequisites**
  you must have npm and node js on your machine. For installing this [Node js](https://nodejs.org/en/download)
  you must have mongodb Compass on your machine. For installing this [Mongo Db Compass](https://www.mongodb.com/try/download/community)

- **git clone**
  now clone this project `git clone https://github.com/yadavritik467/pull-request-management-system-backend.git`

  now open your terminal and type `cd pull-request-management-system-backend`
  now install all necessary dependencies use `npm install `

  now create .env file in the root directory and create this variable and put the value

  ```
  PORT=
  MONGO_URL=
  JWT_SECRET=

  ```

  now run the server for production use `npm start` and for development use `npm run dev`

## Usage Example

**For Auth**

- sign up as new user using this api `http://localhost:4500/api/v1/signup`

response : [Image](./screenshots/1.png)

- login user using this api `http://localhost:4500/api/v1/login`

response : [Image](./screenshots/2.png)

**Pull Request**

- create pull request using this post api `http://localhost:4500/api/v1/pull-requests`
  response : [Image](./screenshots/3.png)

- get all pull request using this get api `http://localhost:4500/api/v1/pull-requests`
  response : [Image](./screenshots/4.png)

  - 67a1e510c014b183caf9778a is pull request id

- get single Pull Request using this api `http://localhost:4500/api/v1/pull-requests/67a1e510c014b183caf9778a`
  response : [Image](./screenshots/10.png)

- update single pull request using this put api `http://localhost:4500/api/v1/pull-requests/67a1e510c014b183caf9778a`
  response : [Image](./screenshots/12.png)

- delete single pull request using this delete api `http://localhost:4500/api/v1/pull-requests/67a1e510c014b183caf9778a`
  response : [Image](./screenshots/11.png)

**Add comment**

- add comment using this api `http://localhost:4500/api/v1/pull-requests/67a1e510c014b183caf9778a/comment`
  response : [Image](./screenshots/9.png)
- All comment using this get api `http://localhost:4500/api/v1/pull-requests/67a1e510c014b183caf9778a/comment`
  response : [Image](./screenshots/5.png)

**Approvals**

- Add Approval using this post api `http://localhost:4500/api/v1/pull-requests/67a1e510c014b183caf9778a/approvals`
  response : [Image](./screenshots/7.png)

- All Approvals from a pull request using this get api `http://localhost:4500/api/v1/pull-requests/67a1e510c014b183caf9778a/approvals`
  response : [Image](./screenshots/6.png)

  - pull request status will be rejected if the any approver's status is rejected
    response : [Image](./screenshots/8.png)

  - pull request status will be rejected if the any approver's status is rejected
    response : [Image](./screenshots/8.png)

## Challenges & Design Decisions

- **Challenge 1: Role-based Authorization**
  `To enforce role-based access, JWTs are used to store the user's role, which is checked in middleware to determine access rights for each route.`

- **Challenge 2: Handling Complex Relationships**
  `The system uses references between collections (e.g., pull requests to users) to manage and display related data in a clean and scalable way.`

### Key Highlights:

- **Authentication**: The use of JWT ensures secure login and role-based authorization.
- **API Endpoints**: Clearly separated by resource (Pull Requests, Reviews,User ,Approvals).
- **Setup Instructions**: Easy-to-follow steps for setting backend.
- **Usage Examples**: Provides API example endpoints for better clarity.
