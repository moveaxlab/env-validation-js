import { parsePhoneNumberFromString } from 'libphonenumber-js/max';
import XRegExp from 'xregexp';
import { JSONData, TypeNames } from '../declarations';
import { StringType } from './StringType';

class PhoneType extends StringType {
  name(): TypeNames {
    return TypeNames.PHONE;
  }

  protected validateType(value: JSONData): boolean {
    const regex = XRegExp('^\\s*\\+(\\s*\\(?\\d\\)?-?)*\\s*$', 'x');

    if (!regex.test(value as string)) {
      return false;
    }

    const phone = parsePhoneNumberFromString(value as string);

    return phone ? phone.isValid() : false;
  }
}

export { PhoneType };
