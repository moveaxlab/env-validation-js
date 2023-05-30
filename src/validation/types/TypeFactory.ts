import { LowLevelSpec, TypeNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import {
  ArrayType,
  Type,
  Base58Type,
  Base64EncodedFileType,
  Base64Type,
  BooleanType,
  EmailType,
  FloatType,
  IntegerType,
  ISO8601DateType,
  PhoneType,
  UrlType,
  UuidType,
  StringType,
  SequenceType,
  ObjectType,
} from './index';

export class TypeFactory {
  static make(spec: LowLevelSpec): Type {
    const type = this.types[spec.type];

    if (!type) {
      throw new SpecError(`TypeFactory: typename ${type} does not exist`);
    }

    return new type(spec);
  }

  private static types = {
    [TypeNames.ARRAY]: ArrayType,
    [TypeNames.OBJECT]: ObjectType,
    [TypeNames.STRING]: StringType,
    [TypeNames.SEQUENCE]: SequenceType,
    [TypeNames.BASE58]: Base58Type,
    [TypeNames.BASE64]: Base64Type,
    [TypeNames.BASE64_ENCODED_FILE]: Base64EncodedFileType,
    [TypeNames.BOOLEAN]: BooleanType,
    [TypeNames.EMAIL]: EmailType,
    [TypeNames.FLOAT]: FloatType,
    [TypeNames.INTEGER]: IntegerType,
    [TypeNames.ISO_8601_DATE]: ISO8601DateType,
    [TypeNames.PHONE]: PhoneType,
    [TypeNames.URL]: UrlType,
    [TypeNames.UUID]: UuidType,
  };
}
