# nestjs-rest_postgres-graphql_mongo

A learning project consisting of 2 backend API parts:

- REST with Postgres DB and Sequelize ORM
- GraphQL with Mongo DB and TypeORM

## Description

This project is:

- based on [NestJS framework](https://github.com/nestjs/nest)
- inspired by a great `NestJS Zero to Hero` Udemy course by Ariel Weinberger:
  - [Udemy](https://www.udemy.com/course/nestjs-zero-to-hero/)
  - [github](https://github.com/arielweinberger/nestjs-course-task-management/tree/master): tasks app with Postgres-TypeORM
  - [github](https://github.com/arielweinberger/nestjs-course-gql-mongodb): education app with MongoDB-TypeOrm

## Installation

```bash
yarn install
```

## Running the app

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

In development mode a GraphQL Playground is available on `localhost:3000/graphql`.
