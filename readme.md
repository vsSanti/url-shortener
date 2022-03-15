# URL Shortener
This repository was created based on [my template for express applications](https://github.com/vsSanti/nodejs-express-template).

## Running locally
There're two different ways of running this project locally:
- Running `npm run dev`, which is going to run only the node server;
- Running `make build` and then `make up`, to run the project using `docker-compose`, which is perfect to run with databases.

> *They both listen to changes in code and reload the server when activated using nodemon.*

## Tests
There are two different types of tests done here, being unit and integration tests, both using Jest. The unit ones are specified with ending as `*.spec.ts` and the integration with `*.test.ts`.

To run the tests, you can choose one of the following scripts:
- `npm test`: run every test once;
- `npm run test:coverage`: run every test once but it will throw if coverage is bellow minimum threshold;
  - The threshold for this repo is 100%.
- `npm run test:integration`: runs integration tests in watch mode;
- `npm run test:unit`: runs unit tests in watch mode.