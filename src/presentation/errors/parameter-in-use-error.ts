export class ParameterInUseError extends Error {
  constructor(property: string) {
    super(`The received ${property} is already in use.`);
    this.name = 'ParameterInUseError';
  }
}
