import { JSONData, TypeNames } from '../declarations';
import { SequenceType } from './SequenceType';

export class StringType extends SequenceType {
  name(): TypeNames {
    return TypeNames.STRING;
  }

  isNull(value: JSONData): boolean {
    return super.isNull(value) || value === '';
  }

  protected validateType(value: JSONData): boolean {
    return Object(value) instanceof String;
  }
}
