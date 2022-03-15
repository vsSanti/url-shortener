export class ObjectValidationError extends Error {
  constructor() {
    super('An error was thrown when validating an object.');
    this.name = 'ObjectValidationError';
  }
}
