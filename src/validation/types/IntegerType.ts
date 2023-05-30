import { JSONData, TypeNames } from '../declarations';
import { Type } from './Type';

class IntegerType extends Type {
  name(): TypeNames {
    return TypeNames.INTEGER;
  }

  protected validateType(value: JSONData): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    return typeof value === 'number' && Number.isInteger(value);
  }
}

export { IntegerType };
