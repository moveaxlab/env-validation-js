import { ValidationErrorJSON } from '../declarations';
import { BaseError } from './BaseError';

export class ValidationError {
  errors: BaseError[];

  constructor(err: BaseError[]) {
    this.errors = err;
  }

  toJSON(): ValidationErrorJSON {
    return {
      errors: this.errors.map(err => err.toJSON()),
    };
  }
}
