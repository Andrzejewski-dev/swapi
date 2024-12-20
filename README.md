# Star Wars API

## Description

Welcome to Star Wars API, your gateway to the Star Wars universe! This open API provides access to data on characters, planets, starships, species, and more from the galaxy far, far away. It's easy to get started—just make simple HTTP GET requests to retrieve data in JSON format. No authentication is required, so feel free to explore and integrate this API into your projects. Be sure to check out the rate limits and formatting options to enhance your experience.

## Run in docker

```bash
$ docker compose up
```

## REST API documentation

Swagger is available here: http://localhost:8080/api

## Project setup

```bash
$ npm install
```
and fill envrioment variables
```bash
$ cp .env.example .env
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
