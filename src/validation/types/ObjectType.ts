import {
  JSONData,
  JSONDataObject,
  LowLevelSpec,
  LowLevelSpecObject,
  TypeNames,
} from '../declarations';
import { NullableError } from '../errors/NullableError';
import { ObjectError } from '../errors/ObjectError';
import { ValidationError } from '../errors/ValidationError';
import { Type, TypeFactory } from './index';
import { TypeError } from '../errors/TypeError';
import { BaseError } from '../errors/BaseError';

export class ObjectType extends Type {
  schema?: { [key: string]: Type };

  protected nestedValidation: boolean = false;

  constructor(spec: LowLevelSpec) {
    super(spec);

    if ('schema' in spec) {
      this.nestedValidation = true;
      const objectSpec = this.spec as LowLevelSpecObject;

      this.schema = Object.keys(objectSpec.schema).reduce(
        (res, key) => {
          res[key] = TypeFactory.make(objectSpec.schema[key]);

          return res;
        },
        {} as { [key: string]: Type }
      );
    }
  }

  name(): TypeNames {
    return TypeNames.OBJECT;
  }

  validate(value: JSONData): void {
    if (!this.nestedValidation) {
      return super.validate(value);
    } else {
      if (this.isNull(value)) {
        if (!this.nullable) {
          throw new ObjectError(
            [new NullableError(value)],
            new Map<string, ValidationError>()
          );
        }
      } else {
        if (!this.validateType(value)) {
          throw new ObjectError(
            [new TypeError(this.name(), value)],
            new Map<string, ValidationError>()
          );
        }
        const objectSchema = this.schema as { [key: string]: Type };
        const objectRuleErrors: BaseError[] = this.validateRules(value);
        const schemaErrors = new Map<string, ValidationError>();
        const objectValue = value as JSONDataObject;

        for (const key of Object.keys(objectSchema)) {
          if (key in objectValue) {
            try {
              objectSchema[key].validate(objectValue[key]);
            } catch (e) {
              schemaErrors.set(key, e as ValidationError);
            }
          }
        }

        if (objectRuleErrors.length > 0 || schemaErrors.size > 0) {
          throw new ObjectError([...objectRuleErrors], schemaErrors);
        }
      }
    }
  }

  protected validateType(value: JSONData): boolean {
    return (
      value instanceof Object &&
      typeof value === 'object' &&
      !Array.isArray(value)
    );
  }
}
