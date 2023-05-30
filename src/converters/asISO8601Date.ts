import { TypeNames } from '../declarations';
import { Value } from '../types';
import { validate } from './validate';

function asISO8601Date(
  name: string,
  value?: Value,
  rules: string | string[] = []
): string {
  const schema = {
    rules,
    type: TypeNames.ISO_8601_DATE,
  };

  return validate(name, schema, value, '') as string;
}

export { asISO8601Date };
