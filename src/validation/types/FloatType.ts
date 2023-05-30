import { JSONData, TypeNames } from '../declarations';
import { Type } from './Type';

class FloatType extends Type {
  name(): TypeNames {
    return TypeNames.FLOAT;
  }

  protected validateType(value: JSONData): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    return typeof value === 'number' && !Number.isNaN(value);
  }
}

export { FloatType };
