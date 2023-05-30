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
      if (!(key in err.schemaErrors)) {
        err.schemaErrors[key] = { errors: [] };
      }
      err.schemaErrors[key].errors = [
        ...err.schemaErrors[key].errors,
        new RuleError(
          'required',
          (requiredError.value as JSONDataObject)[key]
        ).toJSON(),
      ];
    }

    return err;
  }

  private schema: Map<string, ValidationError>;

  constructor(err: BaseError[], schemaErrors: Map<string, ValidationError>) {
    super(err);
    this.schema = schemaErrors;
  }

  toJSON(): ObjectErrorJSON {
    const res: ObjectSchemaErrorsJSON = {};

    // Get object errors
    for (const [key, value] of this.schema) {
      res[key] = value.toJSON();
    }

    return ObjectError.toLegacy({
      ...super.toJSON(),
      schemaErrors: { ...res },
    });
  }
}
