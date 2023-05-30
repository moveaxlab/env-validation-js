import {
  JSONDataObject,
  ObjectErrorJSON,
  ObjectSchemaErrorsJSON,
  RuleErrorJSON,
} from '../declarations';
import { BaseError } from './BaseError';
import { ValidationError } from './ValidationError';
import { RuleError } from './RuleError';

export class ObjectError extends ValidationError {
  private static toLegacy(err: ObjectErrorJSON): ObjectErrorJSON {
    const requiredError = err.errors.find(x => x.name === 'required') as
      | RuleErrorJSON
      | undefined;
    if (!requiredError) {
      return err;
    }

    err.errors = err.errors.filter(x => x.name !== 'required');

    for (const key of requiredError.params!) {
      if (!(key in err.schema_errors)) {
        err.schema_errors[key] = { errors: [] };
      }
      err.schema_errors[key].errors = [
        ...err.schema_errors[key].errors,
        new RuleError(
          'required',
          (requiredError.value as JSONDataObject)[key]
        ).toJSON(),
      ];
    }

    return err;
  }

  private schema: Map<string, ValidationError>;

  // eslint-disable-next-line camelcase
  constructor(err: BaseError[], schema_errors: Map<string, ValidationError>) {
    super(err);
    // eslint-disable-next-line camelcase
    this.schema = schema_errors;
  }

  toJSON(): ObjectErrorJSON {
    const res: ObjectSchemaErrorsJSON = {};

    // Get object errors
    for (const [key, value] of this.schema) {
      res[key] = value.toJSON();
    }

    return ObjectError.toLegacy({
      ...super.toJSON(),
      schema_errors: { ...res },
    });
  }
}
