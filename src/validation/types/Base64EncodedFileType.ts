import XRegExp from 'xregexp';
import { JSONData, TypeNames } from '../declarations';
import { StringType } from './StringType';

class Base64EncodedFileType extends StringType {
  name(): TypeNames {
    return TypeNames.BASE64_ENCODED_FILE;
  }

  protected validateType(value: JSONData): boolean {
    const regex = XRegExp(
      `
    ^
    data:[a-z]+/[a-z]+;base64,
    (?:[A-Za-z0-9+/]{4})*
    (?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?
    $
    `,
      'x'
    );

    return regex.test(value as string);
  }
}

export { Base64EncodedFileType };
