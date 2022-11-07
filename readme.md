# URL Shortener
> This repository was created based on [my template for express applications](https://github.com/vsSanti/nodejs-express-template) to develop the take-home assessment project for a position: an URL Shortener. There's a [`README`](https://github.com/vsSanti/nodejs-express-template/blob/master/readme.md) that explains a little bit about the code architecture.

## About the project
Long URLs aren't easy to email, tweet, or otherwise share. This project solves this issue for you: give us an URL and this piece of software is going to generate an alias for it. After that you can count on our services to redirect you to the correct place.

It was build with NodeJS as a REST API with [`express`](https://expressjs.com/) (one of the most popular web fremeworks for building this kind of applications), tested with [`jest`](https://jestjs.io/) and [`supertest`](https://github.com/visionmedia/supertest) and has data persisted on MongoDB with the help of [`mongoose`](https://mongoosejs.com/).

The repo also uses of [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) as code formatters and linters, as well as [`husky`](https://typicode.github.io/husky/) to call a hook to test the application before pushing commits to origin.

Lastly but not least, the aliases for the "long URLs" are generated at this point in time with [`nanoid`](https://github.com/ai/nanoid), `a tiny, secure, URL-friendly, unique string ID generator for JavaScript` as their documentation say. It may happen that two aliases are going to be duplicated, but there are 1 in 64<sup>8</sup> unique ones. So, the chance of this happening is very small.

> There were some features that I'd like to have implemented, but didn't have enough time. they are:
> - Creating a count of URL visits;
> - Passing an `alias` along with the `url` parameter, so users could create personalized short URLs.
> - Password protected short URLs;
> - Making the front end application with React;
>   - It was created statically and served from the `express` server.
> - API documentation with `Swagger`.

## Endpoints
The base URL for the API is `localhost:4000`.
- Web application (must be called in browser):
  - `/`: where users can create their short URLs;
- Short URL:
  - `POST /short-url`: calling this will craete a new short URL. It requires only a `url` string parameter to operate. It'll return the provided URL and the generated `alias`.
  - `GET /:alias`: is responsible for redirecting user to the correct URL given the `alias` provided.

## Running locally
There're two different ways of running this project locally:
- Running `npm run dev`, which is going to run only the node server;
  - This implies that you must setup your own `MongoDB` server, and configure its connection string on the [environment variables configuration file](./src/main/config/env.ts).
- Running `make build` and then `make up` or `make up-detached`, to run the project using `docker-compose`.
  - The make file serves just not to type `docker-compose something` every single time. So, if you don't have `make` installed, you can find what `make build` and `make run` does on [`Makefile`](./Makefile).

> *They both listen to changes in code and reload the server when activated using nodemon.*

## Testing
There are two different types of tests done here, being unit and integration tests, both using Jest. The unit ones are specified with ending as `*.spec.ts` and the integration with `*.test.ts`. For the integration tests, it was also used `supertest` to run an `express` server during tests.

To run the tests, you can choose one of the following scripts:
- `npm test`: run every test once;
- `npm run test:coverage`: run every test once but it will throw if coverage is bellow minimum threshold;
  - The threshold for this repo is 100%.
- `npm run test:integration`: runs integration tests in watch mode;
- `npm run test:unit`: runs unit tests in watch mode.
