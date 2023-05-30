import XRegExp from 'xregexp';
import { JSONData, TypeNames } from '../declarations';
import { StringType } from './StringType';

class UuidType extends StringType {
  name(): TypeNames {
    return TypeNames.UUID;
  }

  protected validateType(value: JSONData): boolean {
    const regex = XRegExp(
      `
    ^
    [0-9A-F]{8}
    -
    [0-9A-F]{4}
    -
    4
    [0-9A-F]{3}
    -
    [89AB]
    [0-9A-F]{3}
    -
    [0-9A-F]{12}
    $
    `,
      'xi'
    );

    return regex.test(value as string);
  }
}

export { UuidType };
