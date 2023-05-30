import XRegExp from 'xregexp';
import { JSONData, TypeNames } from '../declarations';
import { StringType } from './StringType';

class Base64Type extends StringType {
  name(): TypeNames {
    return TypeNames.BASE64;
  }

  protected validateType(value: JSONData): boolean {
    const regex = XRegExp(
      `
    ^
    (?:[A-Za-z0-9+/]{4})*
    (?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?
    $
    `,
      'x'
    );

    return regex.test(value as string);
  }
}

export { Base64Type };
