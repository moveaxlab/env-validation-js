import XRegExp from 'xregexp';
import { JSONData, TypeNames } from '../declarations';
import { StringType } from './StringType';

class UrlType extends StringType {
  name(): TypeNames {
    return TypeNames.URL;
  }

  protected validateType(value: JSONData): boolean {
    const regex = XRegExp(
      `
    ^
    # http:// or https:// or ftp:// or ftps://
    (?:http|ftp)s?://
    # domain...
    (?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\\.)+
    (?:[A-Z]{2,6}\\.?|[A-Z0-9-]{2,}\\.?)
    |
    # ...or ipv4
    \\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}
    |
    # ...or ipv6
    \\[?[A-F0-9]*:[A-F0-9:]+\\]?)
    # optional port
    (?::\\d+)?
    (?:/?|[/?]\\S+)
    $
    `,
      'xi'
    );

    return regex.test(value as string);
  }
}

export { UrlType };
