import { JSONData, TypeNames } from '../declarations';
import { Type } from './Type';

interface ValueIterable {
  [Symbol.iterator]: (...args: unknown[]) => unknown; // TODO: avoid this
}

export class SequenceType extends Type {
  isNull(value: JSONData): boolean {
    return super.isNull(value) || value === [[]];
  }

  name(): TypeNames {
    return TypeNames.SEQUENCE;
  }

  protected validateType(value: JSONData): boolean {
    if (this.isNull(value)) {
      return false;
    }

    return typeof (value as ValueIterable)[Symbol.iterator] === 'function';
  }
}
