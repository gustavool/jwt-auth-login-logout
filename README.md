# Auth JWT API

## Description

An API for user authentication with login and logout methods. The API can be used by the frontend to authenticate users and manage their access.
Was developed with Prisma ORM to connect to a Postgres database. Redis to store tokens temporarily. Docker and Docker compose to install all dependencies and run the API.

## Technologies used

- NodeJs
- Typescript
- Express
- Prisma ORM
- PostgreSQL
- Redis
- JWT - Json Web Token
- ESLint
- Prettier
- Docker
- Docker Compose

## Endpoints

| Name              | Method | Auth |      Endpoint |
| ----------------- | :----: | ---- | ------------: |
| Create an user    |  POST  |      |        /users |
| Get all users     |  GET   | [x]  |        /users |
| Get an user by ID |  GET   | [x]  |   /users/{id} |
| User login        |  POST  |      |  /users/login |
| User logout       |  POST  | [x]  | /users/logout |

## Getting started

### Clone this repository

`git clone https://github.com/gustavool/jwt-auth-login-logout.git`

### Run docker-compose

`docker-compose up`
