import { TypeNames } from '../declarations';
import { Value } from '../types';
import { validate } from './validate';

function asFloat(
  name: string,
  value?: Value,
  rules: string | string[] = []
): number {
  const schema = {
    rules,
    type: TypeNames.FLOAT,
  };

  if (Number.isNaN(value as number)) {
    throw new Error(`Value given for variable ${name} is not valid.`);
  }

  if (value !== undefined) {
    value = Number(value);
  }

  return validate(name, schema, value) as number;
}

export { asFloat };
