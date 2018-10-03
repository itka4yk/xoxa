export class InvalidArgumentException extends Error {
  constructor(message) {
    super(message);
    this.name = 'Invalid Argument Exception';
  }
}