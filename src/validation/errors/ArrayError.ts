import { ArrayErrorJSON } from '../declarations';
import { BaseError } from './BaseError';
import { ValidationError } from './ValidationError';

export class ArrayError extends ValidationError {
  private elements: ValidationError[];

  constructor(err: BaseError[], elements: ValidationError[]) {
    super(err);
    this.elements = elements;
  }

  toJSON(): ArrayErrorJSON {
    return {
      ...super.toJSON(),
      elements_errors: this.elements.map(err => err.toJSON()),
    };
  }
}
