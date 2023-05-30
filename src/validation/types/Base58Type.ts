import { JSONData, TypeNames } from '../declarations';
import { StringType } from './StringType';

class Base58Type extends StringType {
  name(): TypeNames {
    return TypeNames.BASE58;
  }

  protected validateType(value: JSONData): boolean {
    return /^[1-9A-HJ-NP-Za-km-z]+$/.test(value as string);
  }
}

export { Base58Type };
