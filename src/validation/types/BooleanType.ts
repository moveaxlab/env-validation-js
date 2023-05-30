import { JSONData, TypeNames } from '../declarations';
import { Type } from './Type';

export class BooleanType extends Type {
  name(): TypeNames {
    return TypeNames.BOOLEAN;
  }

  protected validateType(value: JSONData): boolean {
    return Object(value) instanceof Boolean;
  }
}
