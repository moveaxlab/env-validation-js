import { JSONData, NullableErrorJSON } from '../declarations';
import { BaseError } from './BaseError';

export class NullableError extends BaseError {
  constructor(value: JSONData) {
    super('nullable', value);
  }

  toJSON(): NullableErrorJSON {
    return {
      name: 'nullable',
      value: this.value,
      params: [],
    };
  }
}
