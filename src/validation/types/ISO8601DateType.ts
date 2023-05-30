import moment from 'moment';
import { JSONData, TypeNames } from '../declarations';
import { StringType } from './StringType';

class ISO8601DateType extends StringType {
  name(): TypeNames {
    return TypeNames.ISO_8601_DATE;
  }

  protected validateType(value: JSONData): boolean {
    try {
      const m = moment(value as string, moment.ISO_8601);

      return m.isValid();
    } catch (e) {
      return false;
    }
  }
}

export { ISO8601DateType };
