import { TypeNames } from '../validation/declarations';
import { Value } from '../types';
import { validate } from './validate';

function asInteger(
  name: string,
  value?: Value,
  rules: string | string[] = []
): number {
  const schema = {
    rules,
    type: TypeNames.INTEGER,
  };

  if (Number.isNaN(value as number)) {
    throw new Error(`Value given for variable ${name} is not valid.`);
  }

  if (value !== undefined) {
    value = Number(value);
  }

  return validate(name, schema, value) as number;
}

export { asInteger };
