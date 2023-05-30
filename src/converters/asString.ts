import { TypeNames } from '../declarations';
import { Value } from '../types';
import { validate } from './validate';

function asString(
  name: string,
  value?: Value,
  rules: string | string[] = []
): string {
  const schema = {
    rules,
    type: TypeNames.STRING,
  };

  return validate(name, schema, value, '') as string;
}

export { asString };
