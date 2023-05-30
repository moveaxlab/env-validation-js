import { JSONData, TypeErrorJSON, TypeNames } from '../declarations';
import { BaseError } from './BaseError';

export class TypeError extends BaseError {
  constructor(name: TypeNames, value: JSONData) {
    super(name, value);
  }

  toJSON(): TypeErrorJSON {
    return {
      name: 'type',
      value: this.value,
      params: [this.name],
    };
  }
}
